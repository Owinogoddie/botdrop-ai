// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import { cookies } from "next/headers";

// export async function GET(request: Request) {
//   const authRequest = auth.handleRequest({ request, cookies });
//   const session = await authRequest.validate();
//   if (!session) {
//     return NextResponse.json(null);
//   }
//   return NextResponse.json(session.user);
// }