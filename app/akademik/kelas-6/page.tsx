import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiCalculator, BiGlobe, BiArrowBack } from 'react-icons/bi';

export default function Kelas6Page() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="py-16 md:py-20 flex-grow">
        <div className="container mx-auto px-4">
          
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          {/* PERUBAHAN: Judul diubah ke Kelas 6 */}
          <h2 className="text-3xl font-semibold text-slate-700 text-center mb-12">
            Kelas 6: Pilih Mata Pelajaran
          </h2>

          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">

            {/* Kartu Matematika */}
            <Link 
              href="/akademik/kelas-6/matematika" // PERUBAHAN: Link ke pelajaran kelas 6
              className="w-full md:w-5/12 bg-white p-8 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 no-underline"
            >
              <div>
                <BiCalculator size={60} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-semibold text-slate-800 mb-2">Matematika (MTK)</h3>
                <p className="text-slate-500">Simetri, Pembagian Pecahan, Kecepatan, Volume, Urutan dan Kombinasi.</p>
              </div>
            </Link>

            {/* Kartu Bahasa Inggris */}
            <Link 
              href="/akademik/kelas-6/bahasa-inggris" // PERUBAHAN: Link ke pelajaran kelas 6
              className="w-full md:w-5/12 bg-white p-8 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 no-underline"
            >
              <div>
                <BiGlobe size={60} className="text-blue-600 mx-auto mb-4" />
                <h3 className="text-3xl font-semibold text-slate-800 mb-2">Bahasa Inggris</h3>
                <p className="text-slate-500">Narrative Text, Grammar, dan Conversation.</p>
              </div>
            </Link>

          </div>

          {/* Tombol Kembali (Link tetap sama) */}
          <div className="text-center mt-12">
            <Link 
              href="/akademik" 
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