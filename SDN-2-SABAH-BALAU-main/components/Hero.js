"use client";
import React, { useState, useEffect } from 'react';

const Hero = () => {
  // Teks lengkap yang ingin kita ketik
  const fullText = "Selamat Datang";
  
  // State untuk menyimpan teks yang sedang tampil (yang sedang diketik)
  const [typedText, setTypedText] = useState('');

  // useEffect akan berjalan untuk menganimasikan teks
  useEffect(() => {
    // Cek jika teks yang tampil belum sama dengan teks lengkap
    if (typedText.length < fullText.length) {
      
      // Atur timer untuk menambah satu huruf
      const timerId = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 150); // Kecepatan ketik

      // Membersihkan timer
      return () => clearTimeout(timerId);
    }
  }, [typedText]); // Jalankan efek ini setiap kali 'typedText' berubah

  return (
    <header 
      className="relative h-screen min-h-[700px] w-full flex items-center justify-start text-white"
      style={{ backgroundImage: `url('/Dokumentasi/gapura.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* PERBAIKAN 2: Tambahkan 'md:pl-16' untuk menggeser konten ke kanan di desktop */}
      <div className="relative z-10 container mx-auto px-4 md:pl-16">
        <div className="max-w-xl">
          
          {/* PERBAIKAN 1: Ukuran font diubah ke 'md:text-6xl' dan 'min-h' dihapus */}
          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            {typedText}
            {/* Kursor berkedip (tingginya disesuaikan) */}
            <span className="inline-block animate-pulse w-2 md:w-3 h-10 md:h-14 bg-white ml-2"></span>
          </h2>

          <h2 className="text-3xl md:text-4xl font-semibold mb-6">SD Negeri 2 Sabah Balau</h2>
          
          {/* PERBAIKAN 3: Tambahkan 'text-justify' untuk rata kiri-kanan */}
          <p className="text-lg text-white/90 leading-relaxed text-justify">
            Berdiri sejak 31 Januari 1982 berdasarkan SK Pendirian
            Pemerintah Daerah. Terletak di Desa Sabah Balau, Kecamatan Tanjung Bintang,
            Kabupaten Lampung Selatan, sekolah ini telah berkembang dengan mengimplementasikan
            Kurikulum Merdeka dan Kurikulum 2013. Berlandaskan visi “Mewujudkan pendidikan
            berkarakter yang sesuai dengan tumbuh kembang anak”, SDN 2 Sabah Balau berkomitmen
            memberikan layanan pendidikan dasar berkualitas dan berwawasan kebhinekaan global.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Hero;