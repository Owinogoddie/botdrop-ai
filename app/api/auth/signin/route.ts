import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth";
import * as context from "next/headers";
import prisma from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.hashedPassword || !user.emailVerified) {
      return NextResponse.json({ error: "Invalid Credentials!" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid Credentials!" }, { status: 401 });
    }

    // successfully login
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    context.cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    console.log("set cookie success");

    return NextResponse.json({ success: "Cookie set" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}