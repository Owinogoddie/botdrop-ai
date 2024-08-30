
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();
const supabaseClient = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    // Delete from Prisma database
    const deletedFile = await prisma.uploadedFile.delete({
      where: { id },
    });

    // Delete from Supabase vector store
    await supabaseClient
      .from('documents')
      .delete()
      .match({ metadata: { userId: deletedFile.userId, websiteId: deletedFile.websiteId } });

    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}