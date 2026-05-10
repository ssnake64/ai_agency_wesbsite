import { NextResponse } from 'next/server';

// V1: log the lead to the server console.
// V2: persist to Supabase or forward to Formspree / a CRM.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, source } = body ?? {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
    }

    console.log('[contact]', {
      at: new Date().toISOString(),
      source: source ?? 'contact_form',
      email,
      name: name ?? null,
      message: message ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }
}
