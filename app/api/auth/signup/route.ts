import { NextResponse } from "next/server";
import { generateVerificationCode } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/mailer";
import prisma from "@/lib/db";
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 600000); // 10 minutes from now

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        verificationCode: {
          create: {
            code: verificationCode,
            email,
            expiresAt,
          },
        },
      },
    });

    // Send verification email
    await sendVerificationEmail(email, verificationCode);

    return NextResponse.json({ message: "User created. Please check your email for the verification code." }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}