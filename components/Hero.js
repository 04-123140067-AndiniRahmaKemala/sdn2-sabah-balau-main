"use client";
import React, { useState, useEffect } from 'react';

const Hero = () => {
  const fullText = "Selamat Datang";
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timerId = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 150);
      return () => clearTimeout(timerId);
    }
  }, [typedText]);

  return (
    <header 
      // PERBAIKAN 1: Mengganti 'h-screen min-h-[700px]' menjadi 'min-h-screen'
      // Ini membuat tingginya pas 100% tinggi layar, tapi bisa tumbuh jika perlu.
      className="relative min-h-screen w-full flex items-center justify-start text-white"
      style={{ backgroundImage: `url('/Dokumentasi/gapura.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 container mx-auto px-4 md:pl-16">
        <div className="max-w-xl">
          
          {/* PERBAIKAN 2: Ukuran font HP diubah ke text-4xl */}
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            {typedText}
            <span className="inline-block animate-pulse w-2 md:w-3 h-10 md:h-14 bg-white ml-2"></span>
          </h2>

          {/* PERBAIKAN 3: Ukuran font HP diubah ke text-2xl agar lebih kecil dari judul */}
          <h2 className="text-2xl md:text-4xl font-semibold mb-6">
            SD Negeri 2 Sabah Balau
          </h2>
          
          {/* PERBAIKAN 4: Font HP diubah ke text-base dan text-justify hanya di desktop */}
          <p className="text-base md:text-lg text-white/90 leading-relaxed md:text-justify">
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