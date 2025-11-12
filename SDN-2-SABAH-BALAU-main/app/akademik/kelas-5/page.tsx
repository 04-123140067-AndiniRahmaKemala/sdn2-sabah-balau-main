import React from 'react';
import Link from 'next/link';
// Gunakan path absolut '@/' untuk impor (ini adalah praktik terbaik Next.js)
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Impor ikon-ikon yang diperlukan
import { BiCalculator, BiGlobe, BiArrowBack } from 'react-icons/bi';

export default function Kelas5Page() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="py-16 md:py-20 flex-grow">
        <div className="container mx-auto px-4">
          
          {/* Judul Halaman */}
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          <h2 className="text-3xl font-semibold text-slate-700 text-center mb-12">
            Kelas 5: Pilih Mata Pelajaran
          </h2>

          {/* Wrapper untuk Kartu Pelajaran */}
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">

            {/* Kartu Matematika */}
            {/* Desain kartu ini (ikon besar, teks tengah) disamakan 
              dengan desain "Pilih Kelas" Anda untuk konsistensi.
            */}
            <Link 
              href="/akademik/kelas-5/matematika" // Path ke halaman "Pilih Bab" MTK
              className="w-full md:w-5/12 bg-white p-8 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 no-underline"
            >
              <div>
                <BiCalculator size={60} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-semibold text-slate-800 mb-2">Matematika (MTK)</h3>
                <p className="text-slate-500">Bilangan Bulat dan Bilangan Desimal, Pengukuran per Kuantitas, Volume.</p>
              </div>
            </Link>

            {/* Kartu Bahasa Inggris */}
            <Link 
              href="/akademik/kelas-5/bahasa-inggris" // Path ke halaman "Pilih Bab" B.Ing
              className="w-full md:w-5/12 bg-white p-8 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 no-underline"
            >
              <div>
                <BiGlobe size={60} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-semibold text-slate-800 mb-2">Bahasa Inggris</h3>
                <p className="text-slate-500">Listening, Speaking, Reading, dan Writing.</p>
              </div>
            </Link>

          </div>

          {/* Tombol Kembali (Navigasi) */}
          <div className="text-center mt-12">
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