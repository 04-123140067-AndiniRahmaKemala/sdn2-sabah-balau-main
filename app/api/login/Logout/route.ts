import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true });
  // hapus cookie login
  res.cookies.set('sb_admin', '', { path: '/', maxAge: 0 });
  return res;
}
