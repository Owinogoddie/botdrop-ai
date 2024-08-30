'use server'
import { cookies } from "next/headers"
import { generateCodeVerifier, generateState } from "arctic"
import { google } from "@/lib/auth"

export const getGoogleOauthConsentUrl = async () => {
    try {
        const state = generateState()
        const codeVerifier = generateCodeVerifier()

        cookies().set('codeVerifier', codeVerifier, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })
        cookies().set('state', state, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })

        const authUrl = await google.createAuthorizationURL(state, codeVerifier, {
            scopes: ['email', 'profile']
        })
        return { success: true, url: authUrl.toString() }

    } catch (error) {
        return { success: false, error: 'Something went wrong' }
    }
}