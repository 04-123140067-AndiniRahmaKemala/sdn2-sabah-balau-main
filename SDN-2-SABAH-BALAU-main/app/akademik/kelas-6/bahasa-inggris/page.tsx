import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiArrowBack } from 'react-icons/bi';

// Data untuk daftar bab Bahasa Inggris Kelas 6 (dari admin.html Anda)
const bahasaInggrisBab = [
  { id: "Bab 1", nama: "I Ate Hamburger Yesterday", href: "/materi/bing6/bing6-bab1" },
  { id: "Bab 2", nama: "I Went to the Zoo Last Week", href: "/materi/bing6/bing6-bab2" },
  { id: "Bab 3", nama: "I was in Lombok Last Week", href: "/materi/bing6/bing6-bab3" },
  { id: "Bab 4", nama: "I was Happy Yesterday", href: "/materi/bing6/bing6-bab4" },
  { id: "Bab 5", nama: "Where did You Go Yesterday?", href: "/materi/bing6/bing6-bab5" },
  { id: "Bab 6", nama: "My Holiday Experience", href: "/materi/bing6/bing6-bab6" },
  { id: "Bab 7", nama: "I Will Go to Bandung", href: "/materi/bing6/bing6-bab7" },
  { id: "Bab 8", nama: "My Mother will Bake a Cake Tomorrow", href: "/materi/bing6/bing6-bab8" },
  { id: "Bab 9", nama: "Made Wants to be a Pilot", href: "/materi/bing6/bing6-bab9" },
  { id: "Bab 10", nama: "I Want to be a Teacher", href: "/materi/bing6/bing6-bab10" },
];

export default function BahasaInggris6Page() {
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
            Bahasa Inggris Kelas 6: Pilih Bab Materi
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col rounded-lg shadow-xl border border-gray-200 overflow-hidden">
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

          {/* Tombol Kembali (Navigasi) */}
          <div className="text-center mt-12">
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