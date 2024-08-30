
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import prisma from '@/lib/db';

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HUGGINGFACEHUB_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2"
});

const supabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const { userId, websiteId, questions } = await request.json();

  try {
    const documents = questions.map((qa: { question: string; answer: string }) => ({
      pageContent: `Question: ${qa.question} - Answer: ${qa.answer}`,
      metadata: { 
        question: qa.question,
        answer: qa.answer,
        userId,
        websiteId,
      }
    }));
console.log(documents)
    await SupabaseVectorStore.fromDocuments(
      documents,
      embeddings,
      {
        client: supabaseClient,
        tableName: "documents",
        queryName: "match_documents",
      }
    );

    // Save Q&A to Prisma database
    await prisma.qA.createMany({
      data: questions.map((qa: { question: string; answer: string }) => ({
        question: qa.question,
        answer: qa.answer,
        userId,
        websiteId,
      })),
    });

    return NextResponse.json({ message: 'Q&A added successfully' });
  } catch (error) {
    console.error('Error adding Q&A:', error);
    return NextResponse.json({ message: 'Error adding Q&A' }, { status: 500 });
  }
}