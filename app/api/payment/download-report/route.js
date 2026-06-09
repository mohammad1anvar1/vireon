import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session') || searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
    }

    const { data: purchase, error } = await supabase
      .from('purchases')
      .select('download_url')
      .eq('stripe_session_id', sessionId)
      .maybeSingle();

    if (error) {
      console.error('Download lookup error:', error);
      return NextResponse.json({ error: 'Failed to find purchase' }, { status: 500 });
    }

    if (!purchase?.download_url) {
      return NextResponse.json({ error: 'Download not found' }, { status: 404 });
    }

    return NextResponse.redirect(purchase.download_url);
  } catch (err) {
    console.error('Download report error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
