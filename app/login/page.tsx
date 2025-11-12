"use client"; // PENTING: Halaman ini interaktif (menggunakan state dan form)

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Hook untuk navigasi
import Image from 'next/image'; // Komponen Next.js untuk gambar
import { BiArrowBack } from 'react-icons/bi';

export default function LoginPage() {
  // State untuk menyimpan data input form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // State untuk menampilkan pesan error
  const [error, setError] = useState('');
  
  const router = useRouter(); // Inisialisasi router

  // Fungsi yang dijalankan saat form disubmit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Hentikan form agar tidak me-reload halaman
    setError(''); // Bersihkan error sebelumnya

    try {
      // 4. Kirim data ke backend API (/api/login)
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // 6. Cek balasan dari server
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        // JIKA SUKSES:
        alert('Login berhasil! Mengarahkan ke dashboard...');
        // Arahkan ke halaman admin (Pastikan halaman /admin ada)
        router.push('/admin'); 

      } else {
        // JIKA GAGAL:
        setError(data.message); // Tampilkan pesan error dari server
      }
    } catch (error) {
      // Jika server tidak terjangkau (Vercel mati, dll)
      setError('Tidak dapat terhubung ke server. Coba lagi.');
    }
  };

  return (
    // Wrapper utama: Menggunakan Tailwind untuk menengahkan form di layar
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      
      {/* Kartu Login: Sesuai dengan style .login-container Anda */}
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        
        {/* Header Kartu */}
        <div className="mb-6 text-center">
          <Image
            src="/Dokumentasi/logo.png" // PASTIKAN path ini benar di folder /public/
            alt="Logo SDN 2 Sabah Balau"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h2 className="mt-3 text-3xl font-bold text-slate-800">Login Admin</h2>
          <p className="text-slate-500">Gunakan akun admin untuk masuk</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit}>
          {/* Input Username */}
          <div className="mb-4">
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-800"
              required
            />
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <label 
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-slate-800"
              required
            />
          </div>

          {/* Menampilkan pesan error jika ada */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Tombol Submit */}
          <button 
            type="submit" 
            className="w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-lg font-medium text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>

        {/* Link Kembali ke Beranda */}
        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-sm text-slate-500 hover:text-blue-600 transition-colors no-underline"
          >
            <BiArrowBack className="inline -mt-1 mr-1" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
