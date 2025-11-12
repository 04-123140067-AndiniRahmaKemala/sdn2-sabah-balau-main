import React from 'react';
import Link from 'next/link';
// Gunakan path absolut '@/' untuk impor (ini adalah praktik terbaik Next.js)
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Impor ikon-ikon yang diperlukan
import { BiCalculator, BiGlobe, BiArrowBack } from 'react-icons/bi';

// (Asumsi ini adalah file: app/akademik/kelas-5/page.tsx)
export default function Kelas5Page() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      {/* PERUBAHAN: Padding (py) dikecilkan untuk HP */}
      <main className="py-10 md:py-16 flex-grow">
        <div className="container mx-auto px-4">
          
          {/* Judul Halaman */}
          {/* PERUBAHAN: Ukuran font dikecilkan untuk HP (text-3xl) */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          {/* PERUBAHAN: Ukuran font dikecilkan untuk HP (text-2xl) */}
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 text-center mb-10 md:mb-12">
            Kelas 5: Pilih Mata Pelajaran
          </h2>

          {/* Wrapper untuk Kartu Pelajaran */}
          {/* PERUBAHAN: Jarak (gap) dikecilkan untuk HP (gap-6) */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl mx-auto">

            {/* Kartu Matematika */}
            <Link 
              href="/akademik/kelas-5/matematika"
              // PERUBAHAN: Padding (p) dikecilkan untuk HP (p-6)
              className="w-full md:w-5/12 bg-white p-6 md:p-8 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 no-underline"
            >
              <div>
                {/* PERUBAHAN: Ukuran ikon dikecilkan untuk HP (size={48}) */}
                <BiCalculator size={48} className="text-blue-600 mx-auto mb-4 md:size={60}" />
                {/* PERUBAHAN: Ukuran font dikecilkan untuk HP (text-2xl) */}
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-2">Matematika (MTK)</h3>
                {/* PERUBAHAN: Ukuran font dikecilkan untuk HP (text-sm) */}
                <p className="text-sm md:text-base text-slate-500">Bilangan Bulat dan Bilangan Desimal, Pengukuran per Kuantitas, Volume.</p>
              </div>
            </Link>

            {/* Kartu Bahasa Inggris */}
            <Link 
              href="/akademik/kelas-5/bahasa-inggris"
              // PERUBAHAN: Padding (p) dikecilkan untuk HP (p-6)
              className="w-full md:w-5/12 bg-white p-6 md:p-8 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 no-underline"
            >
              <div>
                {/* PERUBAHAN: Ukuran ikon dikecilkan untuk HP (size={48}) */}
                <BiGlobe size={48} className="text-blue-600 mx-auto mb-4 md:size={60}" />
                {/* PERUBAHAN: Ukuran font dikecilkan untuk HP (text-2xl) */}
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-2">Bahasa Inggris</h3>
                {/* PERUBAHAN: Ukuran font dikecilkan untuk HP (text-sm) */}
                <p className="text-sm md:text-base text-slate-500">Listening, Speaking, Reading, dan Writing.</p>
              </div>
            </Link>

          </div>

          {/* Tombol Kembali (Navigasi) */}
          {/* PERUBAHAN: Margin atas (mt) dikecilkan untuk HP */}
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/akademik" // Link kembali ke halaman "Pilih Kelas"
              className="inline-flex items-center px-6 py-2 border border-slate-300 text-slate-600 rounded-full font-semibold hover:bg-slate-50 transition-all duration-200"
            >
              <BiArrowBack className="mr-2" />
              Kembali ke Pilih Kelas
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}