import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiArrowBack } from 'react-icons/bi';

// Data untuk daftar bab Bahasa Inggris Kelas 5
const bahasaInggrisBab = [
  { id: "Bab 1", nama: "The Curry is Spicy", href: "/materi/kelas-5/b-inggris/bab1" },
  { id: "Bab 2", nama: "I Drink a Glass of Milk", href: "/materi/kelas-5/b-inggris/bab2" },
  { id: "Bab 3", nama: "How Much Do the Apples Cost?", href: "/materi/kelas-5/b-inggris/bab3" },
  { id: "Bab 4", nama: "I Have a Stomachache", href: "/materi/kelas-5/b-inggris/bab4" },
  { id: "Bab 5", nama: "What a Nice Shirt", href: "/materi/kelas-5/b-inggris/bab5" },
  { id: "Bab 6", nama: "She Listens to Music with Her Ears", href: "/materi/kelas-5/b-inggris/bab6" },
  { id: "Bab 7", nama: "The Tiger is Big, but the Cat is Small", href: "/materi/kelas-5/b-inggris/bab7" },
  { id: "Bab 8", nama: "The Rabbit is Smaller than the Goat", href: "/materi/kelas-5/b-inggris/bab8" },
  { id: "Bab 9", nama: "The Giraffe is the Tallest Animal on Earth", href: "/materi/kelas-5/b-inggris/bab9" },
  { id: "Bab 10", nama: "Indonesia Independence Day is on August 17th", href: "/materi/kelas-5/b-inggris/bab10" },
];

export default function BahasaInggris5Page() {
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
            Bahasa Inggris Kelas 5: Pilih Bab Materi
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              {bahasaInggrisBab.map((bab) => (
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
              href="/akademik/kelas-5" 
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