import React from 'react';
import Link from 'next/link';
// Asumsi Anda menggunakan path @/ (absolut) yang disarankan
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiUserCircle, BiSolidGraduation } from 'react-icons/bi';

export default function AkademikPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="py-16 md:py-20 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          <h2 className="text-3xl font-semibold text-slate-700 text-center mb-12">
            Pilih Kelas
          </h2>

          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">

            {/* --- KARTU KELAS 5 --- */}
            {/* PERBAIKAN: 
              Kelas layout (w-full, md:w-5/12) dan styling (bg-white, shadow, dll.) 
              dipindahkan langsung ke komponen <Link>.
              'no-underline' ditambahkan untuk memastikan teks tidak bergaris bawah.
            */}
            <Link 
              href="/akademik/kelas-5"
              className="w-full md:w-5/12 bg-white p-8 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 no-underline"
            >
              {/* <div> ini sekarang hanya sebagai pembungkus konten, bukan layout */}
              <div>
                <BiUserCircle size={60} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-semibold text-slate-800 mb-2">Kelas 5</h3>
                <p className="text-slate-500">Kurikulum Merdeka dan K13</p>
              </div>
            </Link>

            {/* --- KARTU KELAS 6 --- */}
            {/* PERBAIKAN: Struktur yang sama diterapkan di sini */}
            <Link 
              href="/akademik/kelas-6"
              className="w-full md:w-5/12 bg-white p-8 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 no-underline"
            >
              <div>
                <BiSolidGraduation size={60} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-semibold text-slate-800 mb-2">Kelas 6</h3>
                <p className="text-slate-500">Kurikulum Merdeka dan K13</p>
              </div>
            </Link>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// --- KODE DUPLIKAT DI BAWAH INI TELAH DIHAPUS ---