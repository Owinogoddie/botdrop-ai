import { NextRequest, NextResponse } from 'next/server';
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACEHUB_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2"
});

const supabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;
    const websiteId = formData.get('websiteId') as string;

    if (!file || !userId || !websiteId) {
      return NextResponse.json({ error: 'Missing file, userId, or websiteId' }, { status: 400 });
    }

    let documents;

    // Process the file content based on its type
    if (file.type === 'application/pdf') {
      const loader = new WebPDFLoader(file);
      documents = await loader.load();
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'application/msword') {
      const buffer = await file.arrayBuffer();
      
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
      // const loader = new DocxLoader(new Uint8Array(buffer));
      // documents = await loader.load();
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      documents = jsonData.map((row: any) => ({
        pageContent: JSON.stringify(row),
        metadata: { userId, websiteId }
      }));
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    // Add metadata to documents if not already added
    documents = documents.map(doc => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        userId,
        websiteId,
      }
    }));

    try {
      await SupabaseVectorStore.fromDocuments(
        documents,
        embeddings,
        {
          client: supabaseClient,
          tableName: "documents",
          queryName: "match_documents",
        }
      );

      // Save file information to Prisma database
      await prisma.uploadedFile.create({
        data: {
          fileName: file.name,
          userId,
          websiteId,
        },
      });

      return NextResponse.json({ success: true, message: 'File processed and stored successfully' });
    } catch (error) {
      console.error('Error storing documents:', error);
      return NextResponse.json({ error: 'Failed to store documents' }, { status: 500 });
    }
  } catch (error) {
    console.error('Processing error:', error);
    return NextResponse.json({ error: 'An error occurred during processing' }, { status: 500 });
  }
}