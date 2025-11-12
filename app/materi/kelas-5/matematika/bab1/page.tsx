"use client"; // PENTING: Mengubah ini menjadi Client Component untuk kuis

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Menggunakan path alias '@/
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiArrowBack, BiCheckCircle, BiXCircle } from 'react-icons/bi';

// --- DATA KUIS UNTUK BAB 1 MTK KELAS 5 (BARU) ---
const quizQuestions = [
  {
    question: "1. Angka -25 dibaca sebagai...",
    options: ["Dua puluh lima", "Negatif dua puluh lima", "Positif dua lima"],
    correctAnswer: "Negatif dua puluh lima"
  },
  {
    question: "2. Manakah bilangan yang nilainya paling besar?",
    options: ["-10", "-5", "3"],
    correctAnswer: "3"
  },
  {
    question: "3. Hasil dari 8 + (-5) adalah...",
    options: ["3", "-3", "13"],
    correctAnswer: "3"
  },
  {
    question: "4. Hasil dari (-4) - (2) adalah...",
    options: ["-2", "2", "-6"],
    correctAnswer: "-6"
  },
  {
    question: "5. Bentuk desimal dari pecahan 1/4 adalah...",
    options: ["0.25", "0.5", "0.4"],
    correctAnswer: "0.25"
  },
  {
    question: "6. Lawan dari bilangan 15 adalah...",
    options: ["15", "0", "-15"],
    correctAnswer: "-15"
  },
  {
    question: "7. 7.5 + 2.5 = ...",
    options: ["9.0", "10.0", "9.5"],
    correctAnswer: "10.0"
  },
  {
    question: "8. Bilangan yang terletak di antara -1 dan 1 adalah...",
    options: ["-2", "0", "2"],
    correctAnswer: "0"
  },
  {
    question: "9. 1.25 dibaca sebagai...",
    options: ["Satu koma dua lima", "Satu dua lima", "Satu koma dua puluh lima"],
    correctAnswer: "Satu koma dua lima"
  },
  {
    question: "10. 10 - (-5) = ...",
    options: ["5", "15", "-5"],
    correctAnswer: "15"
  }
];

// Kunci unik untuk localStorage (Diubah untuk MTK Bab 1)
const localStorageKey_Answers = 'quiz_mtk_5_1_answers';
const localStorageKey_Score = 'quiz_mtk_5_1_score';
// ------------------------------------

export default function MateriMtk5Bab1Page() {
  
  // Link YouTube untuk Bab 1
  const videoEmbedUrl = "https://www.youtube.com/embed/tJEUsbICIqw?si=epc3W9WxPFCPT_lw";
  const videoTitle = "Materi Bab 1: Bilangan Bulat dan Bilangan Desimal";

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