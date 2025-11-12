"use client"; // PENTING: Mengubah ini menjadi Client Component untuk kuis

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Menggunakan path alias '@/
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiArrowBack, BiCheckCircle, BiXCircle } from 'react-icons/bi';

// --- DATA KUIS UNTUK BAB 2 MTK KELAS 5 (BARU) ---
const quizQuestions = [
  {
    question: "1. Jika 5 apel beratnya 1.5 kg, berapa berat rata-rata per apel?",
    options: ["0.3 kg", "0.5 kg", "3 kg"],
    correctAnswer: "0.3 kg"
  },
  {
    question: "2. Sebuah mobil menempuh 120 km dalam 2 jam. Berapa km per jam kecepatannya?",
    options: ["60 km/jam", "120 km/jam", "240 km/jam"],
    correctAnswer: "60 km/jam"
  },
  {
    question: "3. 'Kepadatan penduduk' diukur dengan...",
    options: ["Jumlah orang per km²", "Jumlah km² per orang", "Jumlah orang saja"],
    correctAnswer: "Jumlah orang per km²"
  },
  {
    question: "4. Jika sebuah keran mengalirkan 30 liter air dalam 5 menit, berapa debit air per menit?",
    options: ["5 liter/menit", "6 liter/menit", "150 liter/menit"],
    correctAnswer: "6 liter/menit"
  },
  {
    question: "5. Luas sawah 500 m² dan menghasilkan 250 kg padi. Berapa hasil panen per m²?",
    options: ["2 kg/m²", "0.5 kg/m²", "5 kg/m²"],
    correctAnswer: "0.5 kg/m²"
  },
  {
    question: "6. Sebuah bus berisi 40 orang. Total berat penumpang adalah 2.000 kg. Berapa berat rata-rata per orang?",
    options: ["40 kg", "50 kg", "60 kg"],
    correctAnswer: "50 kg"
  },
  {
    question: "7. Harga 3 buku tulis adalah Rp 9.000. Berapa harga per buku tulis?",
    options: ["Rp 3.000", "Rp 9.000", "Rp 27.000"],
    correctAnswer: "Rp 3.000"
  },
  {
    question: "8. Yang BUKAN merupakan contoh pengukuran per kuantitas unit adalah...",
    options: ["Kecepatan (km/jam)", "Tinggi badan (cm)", "Debit (liter/detik)"],
    correctAnswer: "Tinggi badan (cm)"
  },
  {
    question: "9. Sebuah cat (1 kaleng) dapat menutupi dinding seluas 10 m². Jika dindingnya 30 m², berapa kaleng cat yang dibutuhkan?",
    options: ["1 kaleng", "3 kaleng", "10 kaleng"],
    correctAnswer: "3 kaleng"
  },
  {
    question: "10. Kepadatan penduduk A adalah 100 orang/km². Kepadatan penduduk B adalah 150 orang/km². Manakah yang lebih padat?",
    options: ["Kota A", "Kota B", "Sama padat"],
    correctAnswer: "Kota B"
  }
];

// Kunci unik untuk localStorage (Diubah untuk MTK Bab 2)
const localStorageKey_Answers = 'quiz_mtk_5_2_answers';
const localStorageKey_Score = 'quiz_mtk_5_2_score';
// ------------------------------------

export default function MateriMtk5Bab2Page() {
  
  // Link YouTube untuk Bab 2
  const videoEmbedUrl = "https://www.youtube.com/embed/1mXFTsA_fNE";
  const videoTitle = "Materi Bab 2: Pengukuran per Kuantitas Unit";

  // --- STATE UNTUK KUIS (Diambil dari referensi) ---
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isClient, setIsClient] = useState(false); // Untuk mengatasi error Hydration

  // --- LOGIKA LOCALSTORAGE (Diambil dari referensi) ---
  useEffect(() => {
    setIsClient(true);
    const savedAnswers = localStorage.getItem(localStorageKey_Answers);
    const savedScore = localStorage.getItem(localStorageKey_Score);
    
    if (savedAnswers) setSelectedAnswers(JSON.parse(savedAnswers));
    if (savedScore) setScore(JSON.parse(savedScore));
  }, []); 

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(localStorageKey_Answers, JSON.stringify(selectedAnswers));
    }
  }, [selectedAnswers, isClient]);

  useEffect(() => {
    if (isClient && score !== null) {
      localStorage.setItem(localStorageKey_Score, JSON.stringify(score));
    }
  }, [score, isClient]);
  
  // Fungsi untuk menangani perubahan radio button
  const handleAnswerChange = (questionIndex, answer) => {
    if (score === null) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionIndex]: answer
      });
    }
  };

  // Fungsi saat form kuis disubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (score !== null) return; 

    let newScore = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowAnswers(false);
  };

  // Fungsi untuk mereset kuis
  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setScore(null);
    setShowAnswers(false);
    localStorage.removeItem(localStorageKey_Answers);
    localStorage.removeItem(localStorageKey_Score);
  };
  // ------------------------------------

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="py-10 md:py-16 flex-grow">
        <div className="container mx-auto px-4">
          
          {/* Judul Halaman */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 text-center mb-10 md:mb-12">
            {videoTitle}
          </h2>

          {/* Wrapper Konten (Pusat, lebar terbatas) */}
          <div className="max-w-4xl mx-auto">
            
            <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4">
              Video Pembelajaran
            </h3>
            
            {/* Kontainer Video Responsif (Rasio 16:9) */}
            <div className="aspect-video w-full mb-10 rounded-lg shadow-xl overflow-hidden border border-gray-200">
              <iframe
                src={videoEmbedUrl}
                title={`Video Pembelajaran: ${videoTitle}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {/* --- BAGIAN KUIS (BARU) --- */}
            <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4">
              Uji Pemahaman (10 Soal)
            </h3>
            
            <form 
              onSubmit={handleSubmit}
              className="p-4 md:p-6 border rounded-lg shadow-lg bg-white"
            >
              {quizQuestions.map((q, index) => (
                <div key={index} className="mb-6 pb-4 border-b last:border-b-0">
                  <p className="font-semibold text-lg mb-3 text-gray-900">
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option) => {
                      const isCorrect = q.correctAnswer === option;
                      const isSelected = selectedAnswers[index] === option;
                      let labelClass = "text-gray-900"; // Teks hitam
                      
                      if (showAnswers) {
                        if (isCorrect) labelClass = "text-green-600 font-bold";
                        if (isSelected && !isCorrect) labelClass = "text-red-600 line-through";
                      }

                      return (
                        <div key={option} className="flex items-center">
                          <input
                            type="radio"
                            id={`q${index}_${option}`}
                            name={`question_${index}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswerChange(index, option)}
                            disabled={score !== null} 
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label 
                            htmlFor={`q${index}_${option}`}
                            className={`ml-3 block text-base font-medium ${labelClass}`}
                          >
                            {option}
                            {showAnswers && isCorrect && <BiCheckCircle className="inline ml-2 text-green-600" />}
                            {showAnswers && isSelected && !isCorrect && <BiXCircle className="inline ml-2 text-red-600" />}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {score === null && (
                  <button 
                    type="submit" 
                    className="px-6 py-2 border border-transparent bg-blue-600 text-white rounded-md font-semibold shadow-sm hover:bg-blue-700 transition-all"
                  >
                    Kirim Jawaban
                  </button>
                )}
                
                {score !== null && (
                  <button 
                    type="button" 
                    onClick={() => setShowAnswers(!showAnswers)}
                    className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md font-semibold hover:bg-slate-50 transition-all"
                  >
                    {showAnswers ? "Sembunyikan Jawaban" : "Lihat Kunci Jawaban"}
                  </button>
                )}
                
                {score !== null && (
                  <button 
                    type="button" 
                    onClick={handleResetQuiz}
                    className="px-6 py-2 border border-transparent text-red-600 rounded-md font-semibold hover:bg-red-50 transition-all"
                  >
                    Ulangi Kuis
                  </button>
                )}
              </div>

              {score !== null && (
                <div className="mt-6 p-4 rounded-md bg-blue-50 border border-blue-200">
                  <p className="font-semibold text-blue-800 text-lg">
                    Skor Anda (tersimpan di perangkat ini): {score} / {quizQuestions.length}
                  </p>
                </div>
              )}
            </form>
            {/* --- AKHIR BAGIAN KUIS --- */}


            {/* Tombol Kembali (Navigasi) */}
            <div className="text-center mt-8 md:mt-12">
              <Link 
                href="/akademik/kelas-5/matematika" // Link kembali ke halaman "Pilih Bab"
                className="inline-flex items-center px-6 py-2 border border-slate-300 text-slate-600 rounded-full font-semibold hover:bg-slate-50 transition-all duration-200"
              >
                <BiArrowBack className="mr-2" />
                Kembali ke Pilih Bab
              </Link>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}