import React from 'react';
// Impor komponen Navbar dan Footer
import Navbar from '@/components/Navbar'; // Menggunakan path alias
import Footer from '@/components/Footer'; // Menggunakan path alias

// Data untuk kartu fasilitas (Tetap sama)
const facilitiesData = [
  { imgSrc: "/Dokumentasi/R.KEPSEK.png", alt: "Ruang Kepala Sekolah", title: "Ruang Kepala Sekolah" },
  { imgSrc: "/Dokumentasi/R.KELAS.png", alt: "Ruang Kelas", title: "Ruang Kelas" },
  { imgSrc: "/Dokumentasi/UKS.png", alt: "Ruang UKS", title: "Ruang UKS" },
  { imgSrc: "/Dokumentasi/mushola.png", alt: "Mushola", title: "Mushola" },
  { imgSrc: "/Dokumentasi/LAPANGAN1.png", alt: "Lapangan Olahraga", title: "Lapangan Olahraga" },
  { imgSrc: "/Dokumentasi/perpustakaan2.png", alt: "Perpustakaan", title: "Perpustakaan" },
  { imgSrc: "/Dokumentasi/PARKIRAN.png", alt: "Area Parkir", title: "Area Parkir" },
  { imgSrc: "/Dokumentasi/toilet.png", alt: "Toilet Siswa", title: "Toilet Siswa" },
  { imgSrc: "/Dokumentasi/WESTAFEL.png", alt: "Tempat Cuci Tangan", title: "Westafel" },
];

// Komponen Kartu (Dibuat responsif)
const FacilityCard = ({ imgSrc, alt, title }) => (
  <div className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col h-full">
    <img
      src={imgSrc}
      alt={alt}
      // PERUBAHAN: Tinggi gambar lebih kecil di HP (h-56), dan lebih besar di desktop (md:h-64)
      className="w-full h-56 md:h-64 object-cover"
    />
    {/* PERUBAHAN: Padding lebih kecil di HP (p-4), dan lebih besar di desktop (md:p-5) */}
    <div className="p-4 md:p-5 flex-grow">
      {/* PERUBAHAN: Ukuran font judul lebih kecil di HP (text-lg), dan lebih besar di desktop (md:text-xl) */}
      <h5 className="text-lg md:text-xl font-semibold text-slate-800 mb-1">
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
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main>
        {/* Section Fasilitas */}
        {/* PERUBAHAN: Padding lebih kecil di HP (py-10), dan lebih besar di desktop (md:py-16) */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            
            {/* Judul Halaman */}
            {/* PERUBAHAN: Ukuran font judul lebih kecil di HP (text-3xl), margin-bottom lebih kecil (mb-10) */}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10 md:mb-12">
              Fasilitas Pendukung Belajar
            </h2>

            {/* Grid untuk Kartu Fasilitas */}
            {/* PERUBAHAN: 
              - 'grid-cols-1' (Eksplisit 1 kolom di HP)
              - 'gap-6' (Jarak antar kartu lebih kecil di HP)
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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