// import { auth } from "@/lib/auth";
// import { cookies } from "next/headers";

// export async function getServerSideUser() {
//   const authRequest = auth.handleRequest({ cookies });
//   const session = await authRequest.validate();
//   if (!session) {
//     return null;
//   }
//   return session.user;
// }