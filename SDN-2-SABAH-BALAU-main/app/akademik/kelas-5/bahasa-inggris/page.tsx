import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiArrowBack } from 'react-icons/bi';

// Data untuk daftar bab Bahasa Inggris Kelas 5
const bahasaInggrisBab = [
  { id: "Bab 1", nama: "The Curry is Spicy", href: "/materi/bing5/bing5-bab-1" },
  { id: "Bab 2", nama: "I Drink a Glass of Milk", href: "/materi/bing5/bing5-bab-2" },
  { id: "Bab 3", nama: "How Much Do the Apples Cost?", href: "/materi/bing5/bing5-bab-3" },
  { id: "Bab 4", nama: "I Have a Stomachache", href: "/materi/bing5/bing5-bab-4" },
  { id: "Bab 5", nama: "What a Nice Shirt", href: "/materi/bing5/bing5-bab-5" },
  { id: "Bab 6", nama: "She Listens to Music with Her Ears", href: "/materi/bing5/bing5-bab-6" },
  { id: "Bab 7", nama: "The Tiger is Big, but the Cat is Small", href: "/materi/bing5/bing5-bab-7" },
  { id: "Bab 8", nama: "The Rabbit is Smaller than the Goat", href: "/materi/bing5/bing5-bab-8" },
  { id: "Bab 9", nama: "The Giraffe is the Tallest Animal on Earth", href: "/materi/bing5/bing5-bab-9" },
  { id: "Bab 10", nama: "Indonesia Independence Day is on August 17th", href: "/materi/bing5/bing5-bab-10" },
];

export default function BahasaInggris5Page() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="py-16 md:py-20 flex-grow">
        <div className="container mx-auto px-4">
          
          {/* Judul Halaman */}
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          {/* PERUBAHAN: Judul diubah */}
          <h2 className="text-3xl font-semibold text-slate-700 text-center mb-12">
            Bahasa Inggris Kelas 5: Pilih Bab Materi
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              {/* PERUBAHAN: Map ke data bahasa inggris */}
              {bahasaInggrisBab.map((bab) => (
                <Link 
                  key={bab.id}
                  href={bab.href}
                  className="block p-4 border-b border-gray-200 text-slate-700 no-underline transition-all duration-200 hover:bg-gray-50 hover:text-blue-600 last:border-b-0"
                >
                  <strong className="text-slate-800">{bab.id}.</strong> {bab.nama}
                </Link>
              ))}
            </div>
          </div>

          {/* Tombol Kembali (Link kembali ke halaman "Pilih Pelajaran") */}
          <div className="text-center mt-12">
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