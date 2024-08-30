// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import { cookies } from "next/headers";

// export async function POST(request: Request) {
//   const authRequest = auth.handleRequest({ request, cookies });
//   const session = await authRequest.validate();
//   if (!session) {
//     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//   }
//   await auth.invalidateSession(session.sessionId);
//   authRequest.setSession(null);
//   return NextResponse.json({ message: "Signed out successfully" });
// }