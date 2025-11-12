import React from 'react';
import Link from 'next/link';
// Menggunakan path absolut '@/' (dari root proyek) adalah praktik terbaik
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiArrowBack } from 'react-icons/bi';

const matematikaBab = [
  { id: "Bab 1", nama: "Simetri", href: "/materi/kelas-6/matematika/bab1" },
  { id: "Bab 2", nama: "Simbol dan Kalimat Matematika", href: "/materi/kelas-6/matematika/bab2" },
  { id: "Bab 3", nama: "Perkalian Pecahan", href: "/materi/kelas-6/matematika/bab3" },
  { id: "Bab 4", nama: "Pembagian Pecahan", href: "/materi/kelas-6/matematika/bab4" },
  { id: "Bab 5", nama: "Kelipatan dan Perbandingan", href: "/materi/kelas-6/matematika/bab5" },
  { id: "Bab 6", nama: "Pembagian Pecahan", href: "/materi/kelas-6/matematika/bab6" }, 
  { id: "Bab 7", nama: "Menghitung Luas Berbagai Bangun Datar", href: "/materi/kelas-6/matematika/bab7" },
  { id: "Bab 8", nama: "Urutan dan Kombinasi", href: "/materi/kelas-6/matematika/bab8" },
  { id: "Bab 9", nama: "Kecepatan", href: "/materi/kelas-6/matematika/bab9" },
  { id: "Bab 10", nama: "Volume", href: "/materi/kelas-6/matematika/bab10" },
];

export default function Matematika6Page() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      {/* PERBAIKAN: Padding (py) dikecilkan untuk HP */}
      <main className="py-10 md:py-16 flex-grow">
        <div className="container mx-auto px-4">
          
          {/* Judul Halaman */}
          {/* PERBAIKAN: Ukuran font dikecilkan untuk HP (text-3xl) */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          {/* PERBAIKAN: Ukuran font dikecilkan untuk HP (text-2xl) dan margin-bottom (mb-10) */}
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 text-center mb-10 md:mb-12">
            Matematika Kelas 6: Pilih Bab Materi
          </h2>

          {/* Wrapper untuk Daftar Bab (Pusat, lebar terbatas) */}
          <div className="max-w-3xl mx-auto">
            {/* Styling List Group dengan Tailwind */}
            <div className="flex flex-col rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              {matematikaBab.map((bab) => (
                <Link 
                  key={bab.id}
                  href={bab.href}
                  // PERBAIKAN: Padding (p) dikecilkan untuk HP (p-3)
                  className="block p-3 md:p-4 border-b border-gray-200 text-slate-700 no-underline transition-all duration-200 hover:bg-gray-50 hover:text-blue-600 last:border-b-0"
                >
                  <strong className="text-slate-800">{bab.id}.</strong> {bab.nama}
                </Link>
              ))}
            </div>
          </div>

          {/* Tombol Kembali (Navigasi) */}
          {/* PERBAIKAN: Margin-top (mt) dikecilkan untuk HP (mt-8) */}
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/akademik/kelas-6" // Link kembali ke halaman "Pilih Pelajaran" Kelas 6
              className="inline-flex items-center px-6 py-2 border border-slate-300 text-slate-600 rounded-full font-semibold hover:bg-slate-50 transition-all duration-200"
            >
              <BiArrowBack className="mr-2" />
              Kembali ke Pilih Pelajaran
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}