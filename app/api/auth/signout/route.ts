import { NextResponse } from "next/server";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
    
    if (!sessionId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
  
    try {
      const { session, user } = await lucia.validateSession(sessionId);
      
      if (!session) {
        return NextResponse.json({ error: "Invalid session" }, { status: 401 });
      }
  
      await lucia.invalidateSession(session.id);
      
      const sessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  
      return NextResponse.json({ message: "Signed out successfully" });
    } catch (error) {
      console.error("Sign out error:", error);
      return NextResponse.json({ error: "An error occurred during sign out" }, { status: 500 });
    }
  }
  