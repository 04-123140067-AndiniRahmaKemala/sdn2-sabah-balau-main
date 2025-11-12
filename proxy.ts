import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Sama dengan yang kamu pakai di route login
const SECRET_KEY = process.env.JWT_SECRET || 'rahasia-super-aman';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  // Jika belum login dan coba akses /admin
  if (!token && request.nextUrl.pathname.startsWith('/admin')) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Jika ada token → verifikasi
  if (token) {
    try {
      jwt.verify(token, SECRET_KEY);
      return NextResponse.next();
    } catch (err) {
      console.error('Token tidak valid atau sudah kedaluwarsa:', err);
      const res = NextResponse.redirect(new URL('/login', request.url));
      res.cookies.delete('admin_token');
      return res;
    }
  }

  return NextResponse.next();
}

// Terapkan untuk semua route /admin/*
export const config = {
  matcher: ['/admin/:path*'],
};
