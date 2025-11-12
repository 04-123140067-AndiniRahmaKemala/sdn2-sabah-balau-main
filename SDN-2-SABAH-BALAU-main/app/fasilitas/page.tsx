import React from 'react';
// Impor komponen Navbar dan Footer
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Data untuk kartu fasilitas
// (Saya mengambil ini dari kode fasilitas.html Anda)
const facilitiesData = [
  {
    imgSrc: "/Dokumentasi/R.KEPSEK.png",
    alt: "Ruang Kepala Sekolah",
    title: "Ruang Kepala Sekolah",
  },
  {
    imgSrc: "/Dokumentasi/R.KELAS.png",
    alt: "Ruang Kelas",
    title: "Ruang Kelas",
  },
  {
    imgSrc: "/Dokumentasi/UKS.png",
    alt: "Ruang UKS",
    title: "Ruang UKS",
  },
  {
    imgSrc: "/Dokumentasi/mushola.png",
    alt: "Mushola",
    title: "Mushola",
  },
  {
    imgSrc: "/Dokumentasi/LAPANGAN1.png",
    alt: "Lapangan Olahraga",
    title: "Lapangan Olahraga",
  },
  {
    imgSrc: "/Dokumentasi/perpustakaan2.png",
    alt: "Perpustakaan",
    title: "Perpustakaan",
  },
  {
    imgSrc: "/Dokumentasi/PARKIRAN.png",
    alt: "Area Parkir",
    title: "Area Parkir",
  },
  {
    imgSrc: "/Dokumentasi/toilet.png",
    alt: "Toilet Siswa",
    title: "Toilet Siswa",
  },
  {
    imgSrc: "/Dokumentasi/WESTAFEL.png",
    alt: "Tempat Cuci Tangan",
    title: "Westafel",
  },
];

// Komponen Kartu (dibuat terpisah agar rapi)
// Ini menerjemahkan style .facility-card Anda ke Tailwind
const FacilityCard = ({ imgSrc, alt, title }) => (
  <div className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col h-full">
    <img
      src={imgSrc}
      alt={alt}
      className="w-full h-64 object-cover" // Sesuai dengan height: 250px & object-fit: cover
    />
    <div className="p-5 flex-grow">
      <h5 className="text-xl font-semibold text-slate-800 mb-1">
        {title}
      </h5>
      <p className="text-sm text-slate-500">
        SDN 2 Sabah Balau
      </p>
    </div>
  </div>
);

// Komponen Halaman Fasilitas (default export)
export default function FasilitasPage() {
  return (
    // Latar belakang abu-abu muda, font dan warna diatur dari layout.tsx
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main>
        {/* Section Fasilitas */}
        <section className="pt-8 pb-10 md:pt-12 md:pb-16">
          <div className="container mx-auto px-4">
            
            {/* Judul Halaman */}
            <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">
              Fasilitas Pendukung Belajar
            </h2>

            {/* Grid untuk Kartu Fasilitas */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {facilitiesData.map((facility) => (
                <FacilityCard
                  key={facility.title}
                  imgSrc={facility.imgSrc}
                  alt={facility.alt}
                  title={facility.title}
                />
              ))}
            </div>
            
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}