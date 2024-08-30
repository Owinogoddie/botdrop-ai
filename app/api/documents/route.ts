import { NextResponse } from 'next/server';
import prisma from '@/lib/db';


export async function GET() {
  try {
    const documents = await prisma.uploadedFile.findMany({
      orderBy: { uploadedAt: 'desc' },
    });
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}



