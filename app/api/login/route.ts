import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SECRET_KEY = process.env.JWT_SECRET || 'rahasia-super-aman';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Cek user di tabel admin, bukan di Auth bawaan Supabase
    const { data: dataUser, error } = await supabase
      .from('admin')
      .select('*')
      .eq('username', username.trim())
      .single();

    if (error || !dataUser) {
      return NextResponse.json({ success: false, message: 'Username tidak ditemukan' });
    }

    if (dataUser.password !== password) {
      return NextResponse.json({ success: false, message: 'Password salah' });
    }

    // Buat JWT token
    const token = jwt.sign(
      {
        id: dataUser.id,
        username: dataUser.username,
        nama: dataUser.nama,
        role: dataUser.role,
      },
      SECRET_KEY,
      { expiresIn: '7d' }
    );

    const res = NextResponse.json({
      success: true,
      message: 'Login berhasil',
      user: {
        id: dataUser.id,
        username: dataUser.username,
        nama: dataUser.nama,
        role: dataUser.role,
      },
    });

  res.cookies.set('admin_token', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'none',  // ubah dari 'lax'
    secure: process.env.NODE_ENV === 'production', // wajib true saat deploy
    maxAge: 7 * 24 * 60 * 60,
});


    return res;
  } catch (err) {
    console.error('Error di API login:', err);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan pada server' });
  }
}
