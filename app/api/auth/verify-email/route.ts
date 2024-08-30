import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, code } = await request.json();
  
  try {
    const verificationCode = await prisma.verificationCode.findFirst({
      where: { 
        email,
        code,
      },
      include: { user: true },
    });
    
    if (!verificationCode) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    if (verificationCode.expiresAt < new Date()) {
      await prisma.verificationCode.delete({
        where: { id: verificationCode.id },
      });
      return NextResponse.json({ error: "Verification code has expired", expired: true }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: verificationCode.userId },
      data: { emailVerified: true },
    });

    await prisma.verificationCode.delete({
      where: { id: verificationCode.id },
    });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}