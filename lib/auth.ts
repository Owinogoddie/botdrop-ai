import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Google, GitHub } from 'arctic'
import { cookies } from 'next/headers'
import prisma from './db'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        name: 'auth-cookie',
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    }
})
export type Auth = typeof lucia
export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.NEXT_PUBLIC_URL + '/api/auth/google/callback'
)
export const github = new GitHub(
    process.env.GITHUB_CLIENT_ID!,
    process.env.GITHUB_CLIENT_SECRET!,
    {
      redirectURI: `${process.env.NEXT_PUBLIC_URL}/api/auth/github/callback`
    }
  );
// export async function generatePasswordResetToken(userId: string): Promise<string> {
//     const token = generateRandomString(40)
//     await prisma.passwordResetToken.create({
//       data: {
//         id: token,
//         userId: userId,
//         expiresAt: new Date(Date.now() + 1000 * 60 * 60) // 1 hour from now
//       }
//     })
//     return token
//   }

// export async function validatePasswordResetToken(token: string): Promise<string | null> {
//     const storedToken = await prisma..findUnique({
//       where: { id: token }
//     })
//     if (!storedToken) return null
//     if (!isWithinExpiration(storedToken.expiresAt.getTime())) {
//       await prisma.passwordResetToken.delete({ where: { id: token } })
//       return null
//     }
//     return storedToken.userId
//   }

 
  
export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null
    if (!sessionId) {
        return null
    }
    const { session, user } = await lucia.validateSession(sessionId)
    try {
        if (session && session.fresh) {
            // refreshing their session cookie
            const sessionCookie = await lucia.createSessionCookie(session.id)
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }
        if (!session) {
            const sessionCookie = await lucia.createBlankSessionCookie()
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }

    } catch (error) {

    }
    const dbUser = await prisma.user.findUnique({
        where: {
            id: user?.id
        },
        select: {
            name: true,
            email: true,
            picture: true
        }
    })
    return dbUser
}

export function generateVerificationCode(length: number = 6): string {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
