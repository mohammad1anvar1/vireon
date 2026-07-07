import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session = searchParams.get('session');
  if (!session) return NextResponse.json({ error: 'Missing session' }, { status: 400 });
  const { data: purchase } = await supabase.from('purchases').select('download_url, report_storage_path').eq('stripe_session_id', session).maybeSingle();
  if (!purchase) return NextResponse.json({ error: 'Failed to find purchase' }, { status: 404 });
  if (purchase.download_url) return NextResponse.redirect(purchase.download_url);
  return NextResponse.json({ message: 'Report being prepared. Check your email.' }, { status: 200 });
}
