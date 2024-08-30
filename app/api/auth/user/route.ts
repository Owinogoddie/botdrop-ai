import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  
  if (!sessionId) {
    return NextResponse.json(null);
  }

  try {
    const { session, user } = await lucia.validateSession(sessionId);

    if (!session) {
      return NextResponse.json(null);
    }

    return NextResponse.json(user); // Return the user data if the session is valid
  } catch (error) {
    console.error("Session validation error:", error);
    return NextResponse.json(null); // Return null if any error occurs during session validation
  }
}
