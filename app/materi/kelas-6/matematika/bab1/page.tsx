"use client"; // PENTING: Mengubah ini menjadi Client Component untuk kuis

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Menggunakan path alias '@/
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiArrowBack, BiCheckCircle, BiXCircle } from 'react-icons/bi';

// --- DATA KUIS UNTUK BAB 1 MTK KELAS 6 (BARU) ---
const quizQuestions = [
  {
    question: "1. Garis yang membagi bangun datar menjadi dua bagian yang sama persis disebut garis...",
    options: ["Diagonal", "Simetri", "Keliling"],
    correctAnswer: "Simetri"
  },
  {
    question: "2. Berapa jumlah simetri lipat pada bangun persegi?",
    options: ["2", "4", "Tak Terhingga"],
    correctAnswer: "4"
  },
  {
    question: "3. Berapa jumlah simetri lipat pada bangun persegi panjang?",
    options: ["2", "4", "1"],
    correctAnswer: "2"
  },
  {
    question: "4. Simetri putar adalah banyaknya putaran yang dapat dilakukan pada bangun datar sehingga menempati posisi semula, kecuali putaran...",
    options: ["90°", "180°", "360°"],
    correctAnswer: "360°"
  },
  {
    question: "5. Bangun berikut yang tidak memiliki simetri lipat adalah...",
    options: ["Segitiga Sama Sisi", "Jajar Genjang", "Trapesium Sama Kaki"],
    correctAnswer: "Jajar Genjang"
  },
  {
    question: "6. Bangun yang memiliki simetri putar tingkat 4 adalah...",
    options: ["Persegi", "Segitiga Sama Sisi", "Belah Ketupat"],
    correctAnswer: "Persegi"
  },
  {
    question: "7. Jumlah simetri lipat pada lingkaran adalah...",
    options: ["Satu", "Empat", "Tak Terhingga"],
    correctAnswer: "Tak Terhingga"
  },
  {
    question: "8. Tingkat simetri putar terendah yang dimiliki bangun datar adalah...",
    options: ["0", "1", "2"],
    correctAnswer: "2"
  },
  {
    question: "9. Berapa jumlah simetri lipat pada bangun belah ketupat?",
    options: ["2", "4", "1"],
    correctAnswer: "2"
  },
  {
    question: "10. Bangun datar yang tidak memiliki simetri putar adalah...",
    options: ["Trapesium Sembarang", "Trapesium Sama Kaki", "Persegi Panjang"],
    correctAnswer: "Trapesium Sembarang"
  }
];

// Kunci unik untuk localStorage (Diubah untuk MTK KELAS 6 BAB 1)
const localStorageKey_Answers = 'quiz_mtk_6_1_answers';
const localStorageKey_Score = 'quiz_mtk_6_1_score';
// ------------------------------------

export default function MateriMtk6Bab1Page() {
  
  // Link YouTube untuk Bab 1
  const videoEmbedUrl = "https://www.youtube.com/embed/KNggJHGjD4s?si=ArFIIJpCspTuZzkg";
  const videoTitle = "Materi Bab 1: Simetri";

  // --- STATE UNTUK KUIS ---
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isClient, setIsClient] = useState(false); // Untuk mengatasi error Hydration

  // --- LOGIKA LOCALSTORAGE ---
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
      {/* Padding responsif */}
      <main className="py-10 md:py-16 flex-grow">
        <div className="container mx-auto px-4">
          
          {/* Judul Halaman */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 text-center mb-10 md:mb-12">
            Simetri 
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
                href="/akademik/kelas-6/matematika" // Link kembali ke halaman "Pilih Bab"
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