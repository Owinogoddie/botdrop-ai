import { NextRequest, NextResponse } from 'next/server';
import { google, github } from '@/lib/auth';
import { generateState, generateCodeVerifier } from 'arctic';

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } }
): Promise<NextResponse> {
  const provider = params.provider;

  if (provider !== 'google' && provider !== 'github') {
    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
  }

  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  try {
    let url;
    if (provider === 'google') {
      url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ['profile', 'email']
      });
    } else {
      url = await github.createAuthorizationURL(state);
    }

    // Set the state and codeVerifier in cookies
    const response = NextResponse.json({ url: url.toString() });
    response.cookies.set(`${provider}_oauth_state`, state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
    });
    if (provider === 'google') {
      response.cookies.set(`${provider}_code_verifier`, codeVerifier, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 10, // 10 minutes
      });
    }

    return response;
  } catch (error) {
    console.error(`${provider} authorization URL creation error:`, error);
    return NextResponse.json({ error: 'Failed to create authorization URL' }, { status: 500 });
  }
}