import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  const { email, verificationCode, newPassword } = await request.json();
  console.log(email)
  
  if (!email || !verificationCode || !newPassword) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const code = await prisma.verificationCode.findFirst({
      where: {
        email,
        code: verificationCode,
        type: 'PASSWORD_RESET',
        expiresAt: { gt: new Date() },
      },
    });

    if (!code) {
      return NextResponse.json({ error: "Invalid or expired verification code" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);

    await prisma.user.update({
      where: { email },
      data: { hashedPassword },
    });

    await prisma.verificationCode.delete({ where: { id: code.id } });

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}