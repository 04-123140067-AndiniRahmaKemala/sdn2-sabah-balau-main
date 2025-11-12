"use client";
import React from 'react';
// Impor komponen yang sudah dipisah
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero'; // <-- 1. Impor file Hero.js
// Impor ikon-ikon
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineLocationMarker,
  HiOutlineAcademicCap,
  HiOutlineUsers,
  HiOutlineBookOpen
} from 'react-icons/hi';

// Komponen Visi & Misi
const VisiMisi = () => {
  return (
    <section className="pt-12 pb-12 lg:pt-16 lg:pb-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-slate-800 text-center mb-16">
          Membentuk Masa Depan Berkarakter
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <div>
            <img 
              src="/Dokumentasi/mengajar.png" 
              alt="Guru mengajar di kelas"
              className="w-full h-full object-cover rounded-xl shadow-xl"
            />
          </div>
          <div className="flex flex-col space-y-8">
            {/* Kartu Visi */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-4 rounded-full">
                <HiOutlineOfficeBuilding size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">Visi Kami</h3>
                <p className="text-slate-600 leading-relaxed">
                  Visi kami ialah mewujudkan pendidikan yang berkarakter sesuai dengan tumbuh kembang peserta didik. Dengan pendidikan diarahkan untuk membentuk pribadi yang tertib, disiplin, santun, dan berakhlak mulia, serta memiliki keimanan dan ketakwaan yang kuat. Selain itu, pendidikan ini bertujuan untuk menghasilkan peserta didik yang unggul dalam prestasi akademik maupun non-akademik, mampu bersaing dalam ujian sekolah dan berbagai kompetisi, serta memiliki keterampilan hidup yang mendukung kemandirian di masa depan. Penguasaan ilmu pengetahuan dan teknologi menjadi fokus utama, seiring dengan pembentukan kepribadian yang religius dan aktif dalam pengembangan diri.
                </p>
              </div>
            </div>
            {/* Kartu Misi */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-4 rounded-full">
                <HiOutlineAcademicCap size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">Misi Kami</h3>
                <p className="text-slate-600 leading-relaxed">
                  Misi kami ialah menyajikan ilmu pengetahuan yang selaras dengan perkembangan ilmu dan teknologi. Dengan indikator menciptakan warga sekolah yang disiplin, bertanggung jawab, dan berakhlak mulia, meningkatkan kualitas pendidik dengan kualifikasi akademik yang sesuai, menyelenggarakan proses pembelajaran yang berkualitas dan menyenangkan, serta menyajikan materi pelajaran yang kritis dan relevan dengan kemajuan zaman.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const statsData = [
    { id: 1, icon: <HiOutlineUsers size={40} />, number: '204', label: 'Siswa Aktif' },
    { id: 2, icon: <HiOutlineAcademicCap size={40} />, number: '10', label: 'Guru & Staf' },
    { id: 3, icon: <HiOutlineBookOpen size={40} />, number: '8', label: 'Ruang Kelas' },
    { id: 4, icon: <HiOutlineOfficeBuilding size={40} />, number: '12', label: 'Sarana & Prasarana' },
  ];

  return (
    <section className="pt-12 pb-12 lg:pt-16 lg:pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white p-8 rounded-xl shadow-xl text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="text-blue-600 mb-4 inline-block">{stat.icon}</div>
              <h3 className="text-5xl font-bold text-slate-800 mb-2">{stat.number}</h3>
              <p className="text-lg text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Komponen Lokasi (Peta)
const Lokasi = () => {
  return (
    <section className="pt-5 pb-20 lg:pt-5 lg:pb-24 bg-white">
      <div className="container mx-auto px-5">
        <h2 className="text-4xl font-bold text-slate-800 text-center mb-16">
          Lokasi SDN 2 Sabah Balau
        </h2>
        <div className="max-w-4xl mx-auto h-[450px] rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.307001761941!2d105.34948867586702!3d-5.370064053728012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40ddf5e8933775%3A0xd32e4bdb7f777c6b!2sSD%20N%202%20SABAH%20BALAU!5e0!3m2!1sid!2sid!4v1762516476965!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi SDN 2 Sabah Balau"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

// Komponen Utama Halaman Beranda
const Beranda = () => {
  return (
    <div className="font-poppins bg-gray-50 text-slate-800">
      {/* 1. Impor Navbar */}
      <Navbar />
      
      {/* 2. Konten Halaman */}
      <Hero />
      <VisiMisi />
      <Stats />
      <Lokasi />
      
      {/* 3. Impor Footer */}
      <Footer />
    </div>
  );
};

export default Beranda;