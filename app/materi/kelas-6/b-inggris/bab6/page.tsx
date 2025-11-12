"use client"; // PENTING: Mengubah ini menjadi Client Component untuk kuis

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Menggunakan path alias '@/
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiArrowBack, BiCheckCircle, BiXCircle } from 'react-icons/bi';

// --- DATA KUIS UNTUK BAB 6 B. INGGRIS KELAS 6 (BARU) ---
const quizQuestions = [
  {
    question: "1. A text about past holidays is called a ... text.",
    options: ["Procedure", "Narrative", "Recount"],
    correctAnswer: "Recount"
  },
  {
    question: "2. When writing about a holiday, you mainly use the ... Tense.",
    options: ["Present", "Future", "Past"],
    correctAnswer: "Past"
  },
  {
    question: "3. The past tense of 'buy' (membeli) adalah...",
    options: ["buyed", "bought", "buyt"],
    correctAnswer: "bought"
  },
  {
    question: "4. The past tense of 'swim' (berenang) adalah...",
    options: ["swimmed", "swam", "swum"],
    correctAnswer: "swam"
  },
  {
    question: "5. 'Last summer' is a time marker that tells us about the...",
    options: ["Action", "Time", "Location"],
    correctAnswer: "Time"
  },
  {
    question: "6. I ... many souvenirs from the trip. (Past Tense of 'buy')",
    options: ["buy", "bought", "buyed"],
    correctAnswer: "bought"
  },
  {
    question: "7. My family and I ... to the mountain. (Past Tense of 'go')",
    options: ["go", "goes", "went"],
    correctAnswer: "went"
  },
  {
    question: "8. A recount text usually focuses on who, what, where, and when. (True/False)",
    options: ["True", "False"],
    correctAnswer: "True"
  },
  {
    question: "9. We say 'I was happy' when describing a past feeling. 'Was' is the past form of...",
    options: ["am", "do", "will"],
    correctAnswer: "am"
  },
  {
    question: "10. What is the correct question form to ask about a past location?",
    options: ["Where are you going?", "Where do you go?", "Where did you go?"],
    correctAnswer: "Where did you go?"
  }
];

// Kunci unik untuk localStorage (Diubah untuk BING KELAS 6 BAB 6)
const localStorageKey_Answers = 'quiz_bing_6_6_answers';
const localStorageKey_Score = 'quiz_bing_6_6_score';
// ------------------------------------

export default function MateriBing6Bab6Page() {
  
  const videoEmbedUrl = "https://www.youtube.com/embed/tYU2RQOlb4Y";
  const videoTitle = "Materi Bab 6: My Holiday Experience";

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
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 text-center mb-10 md:mb-12">
            My Holiday Experience
          </h2>

          <div className="max-w-4xl mx-auto">
            
            <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4">
              Video Pembelajaran
            </h3>
            
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
                href="/akademik/kelas-6/bahasa-inggris" // Link kembali ke halaman "Pilih Bab"
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