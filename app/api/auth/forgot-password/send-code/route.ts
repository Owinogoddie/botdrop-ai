import { NextResponse } from "next/server";
import { generateVerificationCode } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mailer";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete any existing verification codes for this user
    await prisma.verificationCode.deleteMany({
      where: {
        userId: user.id,
        type: 'PASSWORD_RESET',
      },
    });

    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 600000); // 10 minutes from now

    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        code: verificationCode,
        email,
        expiresAt,
        type: 'PASSWORD_RESET',
      },
    });

    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json({ message: "Verification code sent. Please check your email." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}