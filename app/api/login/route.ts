import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const SECRET_KEY = process.env.JWT_SECRET || 'rahasia-super-aman';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: 'Username dan password harus diisi',
      });
    }

    const { data: dataUser, error: dbError } = await supabase
      .from('admin')
      .select('*')
      .eq('username', username.trim())
      .maybeSingle();

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json({
        success: false,
        message: 'Kesalahan pada database',
      });
    }

    if (!dataUser) {
      return NextResponse.json({
        success: false,
        message: 'Username tidak ditemukan',
      });
    }

    if (dataUser.password !== password.trim()) {
      return NextResponse.json({
        success: false,
        message: 'Password salah',
      });
    }

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
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (err) {
    console.error('Error API login:', err);
    return NextResponse.json({
      success: false,
      message: 'Terjadi kesalahan server',
    });
  }
}
