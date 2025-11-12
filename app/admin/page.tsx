"use client"; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// PERBAIKAN: Mengganti semua ikon 'bi' (Bootstrap) menjadi 'hi' (Heroicons)
import { 
  HiViewGrid,             // Pengganti BiGridFill
  HiExternalLink,         // Pengganti BiBoxArrowUpRight
  HiLogout,               // Pengganti BiBoxArrowLeft
  HiUserCircle,           // Pengganti BiPersonBadgeFill
  HiAcademicCap,          // Pengganti BiMortarboardFill
  HiCalculator,           // Pengganti BiCalculator
  HiGlobe,                // Pengganti BiGlobe
  HiSave,                 // Pengganti BiSave
  HiArrowLeft             // Pengganti BiArrowBack
} from 'react-icons/hi'; // PERBAIKAN: Mengimpor dari 'react-icons/hi'

// --- DATABASE MATERI SEMENTARA ---
const dataAkademik = {
  '5': {
    'Matematika': {
      'Bab 1': { nama: 'Bilangan Bulat dan Bilangan Desimal', youtube: '' },
      'Bab 2': { nama: 'Pengukuran per Kuantitas Unit', youtube: '' },
      'Bab 3': { nama: 'Perkalian Bilangan Desimal', youtube: '' },
      'Bab 4': { nama: 'Kekongruenan dan Sudut Bangun Datar', youtube: '' },
      'Bab 5': { nama: 'Pembagian Bilangan Desimal', youtube: '' },
      'Bab 6': { nama: 'Volume', youtube: '' },
      'Bab 7': { nama: 'Kelipatan dan Faktor', youtube: '' },
      'Bab 8': { nama: 'Pecahan', youtube: '' }
    },
    'Bahasa Inggris': {
      'Bab 1': { nama: 'The Curry is Spicy', youtube: '' },
      'Bab 2': { nama: 'I Drink a Glass of Milk', youtube: '' },
      'Bab 3': { nama: 'How Much Do the Apples Cost?', youtube: '' },
      'Bab 4': { nama: 'I Have Stomachache', youtube: '' },
      'Bab 5': { nama: 'What a Nice Shirt!', youtube: '' },
      'Bab 6': { nama: 'She Listens to Music with Her Ears', youtube: '' },
      'Bab 7': { nama: 'The Tiger is Big, but the Cat is Small', youtube: '' },
      'Bab 8': { nama: 'The Rabit is Smaller than the Goat', youtube: '' },
      'Bab 9': { nama: 'The Giraffe is the Tallest Animal on Earth', youtube: '' },
      'Bab 10': { nama: 'Indonesia Independence Day is on August 17th', youtube: '' }
    }
  },
  '6': {
    'Matematika': {
      'Bab 1': { nama: 'Simetri', youtube: '' },
      'Bab 2': { nama: 'Simbol dan Kalimat Matematika', youtube: '' },
      'Bab 3': { nama: 'Perkalian Pecahan', youtube: '' },
      'Bab 4': { nama: 'Pembagian Pecahan', youtube: '' },
      'Bab 5': { nama: 'Kelipatan dan Perbandingan', youtube: '' },
      'Bab 6': { nama: 'Pembagian Pecahan', youtube: '' },
      'Bab 7': { nama: 'Menghitung Luas Berbagai Bangun Datar', youtube: '' },
      'Bab 8': { nama: 'Urutan dan Kombinasi', youtube: '' },
      'Bab 9': { nama: 'Kecepatan', youtube: '' },
      'Bab 10': { nama: 'Volume', youtube: '' }
    },
    'Bahasa Inggris':{
      'Bab 1': { nama: 'I Ate Hamburger Yesterday', youtube: '' },
      'Bab 2': { nama: 'I Went to the Zoo Last Week', youtube: '' },
      'Bab 3': { nama: 'I was in Lombok Last Week', youtube: '' },
      'Bab 4': { nama: 'I was Happy Yesterday', youtube: '' },
      'Bab 5': { nama: 'Where did You Go Yesterday?', youtube: '' },
      'Bab 6': { nama: 'My Holiday Experience', youtube: '' },
      'Bab 7': { nama: 'I Will Go to Bandung', youtube: '' },
      'Bab 8': { nama: 'My Mother will Bake a Cake Tomorrow', youtube: '' },
      'Bab 9': { nama: 'Made Wants to be a Pilot', youtube: '' },
      'Bab 10': { nama: 'I Want to be a Teacher', youtube: '' }
    }
  }
};
// ------------------------------------

// Komponen Sidebar (Menu Kiri)
const Sidebar = () => (
  <aside className="flex h-screen w-64 flex-col overflow-y-auto bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-8 text-white">
    <Link href="/" className="flex items-center space-x-2">
      {/* Path ke logo (pastikan /logo.png ada di folder /public) */}
      <Image src="/Dokumentasi/logo.png" alt="Logo Sekolah" width={40} height={40} />
      <span className="text-xl font-bold">Admin Panel</span>
    </Link>

    <div className="mt-8 flex flex-1 flex-col justify-between">
      <ul className="flex flex-col space-y-2">
        <li>
          <Link href="/admin" className="flex items-center rounded-lg bg-white px-4 py-3 text-blue-600 font-semibold shadow">
            <HiViewGrid className="mr-3" size={20} /> {/* <-- IKON DIPERBARUI */}
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/akademik" className="flex items-center rounded-lg px-4 py-3 text-white/80 transition-all hover:bg-white/10 hover:text-white">
            <HiExternalLink className="mr-3" size={20} /> {/* <-- IKON DIPERBARUI */}
            Lihat Situs
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/" className="flex items-center rounded-lg px-4 py-3 text-red-300 transition-all hover:bg-red-500 hover:text-white">
            <HiLogout className="mr-3" size={20} /> {/* <-- IKON DIPERBARUI */}
            Logout
          </Link>
        </li>
      </ul>
    </div>
  </aside>
);

// Komponen Utama Halaman Dashboard
export default function AdminPage() {
  const router = useRouter();

const [isCheckingAuth, setIsCheckingAuth] = useState(true);
const [view, setView] = useState('pilih-kelas');
const [currentKelas, setCurrentKelas] = useState(null);
const [currentPelajaran, setCurrentPelajaran] = useState(null);
const [currentBab, setCurrentBab] = useState(null);
const [currentBabData, setCurrentBabData] = useState(null);
const [youtubeLink, setYoutubeLink] = useState('');

useEffect(() => {
  // Tunggu sampai kode dijalankan di sisi browser
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setIsCheckingAuth(false); // user ditemukan → lanjut render dashboard
    }
  }
}, [router]);

// Kalau masih mengecek auth, jangan render dashboard dulu
if (isCheckingAuth) {
  return <div className="p-10 text-center text-slate-600">Memeriksa sesi login...</div>;
}


  const handleKelasClick = (kelas) => {
    setCurrentKelas(kelas);
    setView('pilih-pelajaran');
  };

  const handlePelajaranClick = (pelajaran) => {
    setCurrentPelajaran(pelajaran);
    setView('pilih-bab');
  };

  const handleBabClick = (babKey, babData) => {
    setCurrentBab(babKey);
    setCurrentBabData(babData);
    setYoutubeLink(babData.youtube); 
    setView('form-materi');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dataAkademik[currentKelas][currentPelajaran][currentBab].youtube = youtubeLink;
    alert(`Perubahan tersimpan!\nBab "${currentBab}" sekarang menggunakan link:\n${youtubeLink}`);
    setView('pilih-bab');
  };

  const getBabList = () => {
    if (currentKelas && currentPelajaran && dataAkademik[currentKelas] && dataAkademik[currentKelas][currentPelajaran]) {
      return Object.entries(dataAkademik[currentKelas][currentPelajaran]);
    }
    return [];
  };

  return (
    <div className="flex bg-gray-50 text-slate-800">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto h-screen">
        
        <h1 className="text-4xl font-bold text-slate-800">Dashboard Admin</h1>
        <p className="text-slate-500 mt-1">Selamat datang, admin. Kelola konten website dari sini.</p>
        
        <hr className="my-6" />

        <div className="rounded-xl bg-white p-6 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">Kelola Materi Pembelajaran</h2>
          
          {/* Tampilan Pilih Kelas */}
          <section id="pilih-kelas" style={{ display: view === 'pilih-kelas' ? 'block' : 'none' }}>
            <h5 className="text-xl font-semibold mb-4">Langkah 1: Pilih Kelas</h5>
            <div className="grid md:grid-cols-2 gap-6">
              <div 
                className="card-admin"
                onClick={() => handleKelasClick('5')}
              >
                <HiUserCircle size={48} className="text-blue-600 mb-3" /> {/* <-- IKON DIPERBARUI */}
                <h3 className="text-2xl font-semibold">Kelas 5</h3>
              </div>
              <div 
                className="card-admin"
                onClick={() => handleKelasClick('6')}
              >
                <HiAcademicCap size={48} className="text-blue-600 mb-3" /> {/* <-- IKON DIPERBARUI */}
                <h3 className="text-2xl font-semibold">Kelas 6</h3>
              </div>
            </div>
          </section>

          {/* Tampilan Pilih Pelajaran */}
          <section id="pilih-pelajaran" style={{ display: view === 'pilih-pelajaran' ? 'block' : 'none' }}>
            <h5 className="text-xl font-semibold mb-4">Langkah 2: Pilih Mata Pelajaran (Kelas {currentKelas})</h5>
            <div className="grid md:grid-cols-2 gap-6">
              <div 
                className="card-admin-list"
                onClick={() => handlePelajaranClick('Matematika')}
              >
                <HiCalculator size={24} className="text-blue-600 mr-3" /> {/* <-- IKON DIPERBARUI */}
                <h4 className="text-lg font-semibold">Matematika (MTK)</h4>
              </div>
              <div 
                className="card-admin-list"
                onClick={() => handlePelajaranClick('Bahasa Inggris')}
              >
                <HiGlobe size={24} className="text-blue-600 mr-3" /> {/* <-- IKON DIPERBARUI */}
                <h4 className="text-lg font-semibold">Bahasa Inggris</h4>
              </div>
            </div>
            <button 
              className="btn-kembali"
              onClick={() => setView('pilih-kelas')}
            >
              <HiArrowLeft className="mr-1" /> {/* <-- IKON DIPERBARUI */}
              Kembali
            </button>
          </section>

			<section id="pilih-bab" style={{ display: view === 'pilih-bab' ? 'block' : 'none' }}>
				<h5 className="text-xl font-semibold mb-4">Langkah 3: Pilih Bab yang Ingin Diubah</h5>
				<div className="row">
					<div className="col-lg-8">
						<div className="max-w-2xl"> {/* <-- Tambahkan wrapper max-w-2xl di sini */}
							<div className="flex flex-col rounded-lg shadow-lg border border-gray-200 overflow-hidden">
								
								{/* PERBAIKAN: Menggunakan type assertion untuk mengatasi error Vercel */}
								{getBabList().map(([babKey, babObject]) => { 
									// Menetapkan tipe babObject agar memiliki properti 'nama' dan 'youtube'
									const bab = babObject as { nama: string, youtube: string }; 
									
									return (
										<div 
											key={babKey}
											className="flex items-center p-4 border-b border-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-blue-600"
											// Meneruskan objek bab yang sudah diketahui tipenya
											onClick={() => handleBabClick(babKey, bab)} 
										>
											<strong className="text-slate-800">{babKey}.</strong>
											<span className="ml-2">{bab.nama}</span> 
										</div>
									);
								})}
							</div>
						</div> {/* <-- Tutup div max-w-2xl */}
					</div>
				</div>
				<button 
					className="btn-kembali"
					onClick={() => setView('pilih-pelajaran')}
				>
					<HiArrowLeft className="mr-1" />
					Kembali
				</button>
			</section>

          {/* Tampilan Form Materi */}
          <section id="form-materi" style={{ display: view === 'form-materi' ? 'block' : 'none' }}>
            <h5 className="text-xl font-semibold mb-2">Langkah 4: Masukkan Link YouTube Baru</h5>
            <h6 className="text-slate-500 font-normal mb-4">
              Materi: {currentBab} - {currentBabData?.nama}
            </h6>
            
            <form onSubmit={handleSubmit} className="max-w-2xl">
              <div className="mb-4">
                <label htmlFor="youtube-link" className="block text-sm font-medium text-slate-700 mb-1">Link Video YouTube:</label>
                <input 
                  type="url" 
                  id="youtube-link" 
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" 
                  placeholder="https://www.youtube.com/embed/..." 
                  required 
                />
                <div className="text-xs text-slate-500 mt-1">Pastikan link menggunakan format "embed".</div>
              </div>
              
              <button 
                type="submit" 
                className="btn-simpan"
              >
                <HiSave className="mr-2" /> {/* <-- IKON DIPERBARUI */}
                Simpan Perubahan
              </button>
              <button 
                type="button" 
                className="btn-kembali ml-3"
                onClick={() => setView('pilih-bab')}
              >
                <HiArrowLeft className="mr-1" /> {/* <-- IKON DIPERBARUI */}
                Kembali
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
