"use client"; // PENTING: Mengubah ini menjadi Client Component untuk kuis

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// Menggunakan path alias '@/
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiArrowBack, BiCheckCircle, BiXCircle } from 'react-icons/bi';

// --- DATA KUIS UNTUK BAB 1 ---
const quizQuestions = [
  {
    question: "1. The curry is ... It has a lot of chili.",
    options: ["Sweet", "Salty", "Spicy"],
    correctAnswer: "Spicy"
  },
  {
    question: "2. Sugar tastes ...",
    options: ["Sweet", "Sour", "Spicy"],
    correctAnswer: "Sweet"
  },
  {
    question: "3. Lemons taste ...",
    options: ["Salty", "Sour", "Sweet"],
    correctAnswer: "Sour"
  },
  {
    question: "4. I am thirsty. I want to ...",
    options: ["Eat", "Drink", "Smell"],
    correctAnswer: "Drink"
  },
  {
    question: "5. I am hungry. I want to ...",
    options: ["Eat", "Drink", "See"],
    correctAnswer: "Eat"
  },
  {
    question: "6. 'I drink a glass of milk'. What is 'milk' in Indonesian?",
    options: ["Jus", "Susu", "Air"],
    correctAnswer: "Susu"
  },
  {
    question: "7. What taste is salt?",
    options: ["Sweet", "Spicy", "Salty"],
    correctAnswer: "Salty"
  },
  {
    question: "8. 'The coffee is bitter.' What does 'bitter' mean?",
    options: ["Manis", "Pahit", "Asam"],
    correctAnswer: "Pahit"
  },
  {
    question: "9. We use our ... to smell the food.",
    options: ["Nose", "Eyes", "Ears"],
    correctAnswer: "Nose"
  },
  {
    question: "10. We use our ... to taste the food.",
    options: ["Hand", "Tongue", "Nose"],
    correctAnswer: "Tongue"
  }
];

// Kunci unik untuk localStorage
const localStorageKey_Answers = 'quiz_bing_5_1_answers';
const localStorageKey_Score = 'quiz_bing_5_1_score';

export default function MateriBing5Bab1Page() {
  const videoEmbedUrl = "https://www.youtube.com/embed/cD3qeE7GULI?si=hD0MsKH8wJJlqKbb";
  const videoTitle = "Materi Bab 1: The Curry is Spicy";

  // --- STATE UNTUK KUIS ---
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    // Coba muat jawaban tersimpan dari localStorage saat pertama kali render
    if (typeof window !== 'undefined') {
      const savedAnswers = localStorage.getItem(localStorageKey_Answers);
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    }
    return {};
  });
  
  const [score, setScore] = useState(() => {
    // Coba muat skor tersimpan
    if (typeof window !== 'undefined') {
      const savedScore = localStorage.getItem(localStorageKey_Score);
      return savedScore ? JSON.parse(savedScore) : null;
    }
    return null;
  });

  const [showAnswers, setShowAnswers] = useState(false);

  // --- EFEK LOCALSTORAGE ---
  // Menyimpan jawaban setiap kali berubah
  useEffect(() => {
    localStorage.setItem(localStorageKey_Answers, JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  // Menyimpan skor setiap kali berubah
  useEffect(() => {
    if (score !== null) {
      localStorage.setItem(localStorageKey_Score, JSON.stringify(score));
    }
  }, [score]);
  
  // Fungsi untuk menangani perubahan radio button
  const handleAnswerChange = (questionIndex, answer) => {
    // Hanya izinkan perubahan jika kuis belum dinilai
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
    if (score !== null) return; // Mencegah submit ulang

    let newScore = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore); // Set skornya
    setShowAnswers(false); // Sembunyikan jawaban jika sebelumnya terlihat
  };

  // Fungsi untuk mereset kuis
  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setScore(null);
    setShowAnswers(false);
    localStorage.removeItem(localStorageKey_Answers);
    localStorage.removeItem(localStorageKey_Score);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="py-10 md:py-16 flex-grow">
        <div className="container mx-auto px-4">
          
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
                      let labelClass = "text-slate-700"; // Default
                      
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
                            disabled={score !== null} // Nonaktifkan setelah disubmit
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label 
                            htmlFor={`q${index}_${option}`}
                            className={`ml-3 block text-sm font-medium ${labelClass}`}
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
              
              {/* Tombol Submit dan Tampilan Skor */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {score === null && (
                  <button 
                    type="submit" 
                    className="px-6 py-2 border border-transparent bg-blue-600 text-white rounded-md font-semibold shadow-sm hover:bg-blue-700 transition-all"
                  >
                    Kirim Jawaban
                  </button>
                )}
                
                {/* Tombol Lihat/Sembunyikan Kunci Jawaban (muncul setelah submit) */}
                {score !== null && (
                  <button 
                    type="button" 
                    onClick={() => setShowAnswers(!showAnswers)}
                    className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md font-semibold hover:bg-slate-50 transition-all"
                  >
                    {showAnswers ? "Sembunyikan Jawaban" : "Lihat Kunci Jawaban"}
                  </button>
                )}
                
                {/* Tombol Reset Kuis */}
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

              {/* Tampilan Skor (muncul setelah submit) */}
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
                href="/akademik/kelas-5/bahasa-inggris" // Link kembali ke halaman "Pilih Bab"
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