"use client"; // wajib agar state & localStorage berfungsi

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BiArrowBack, BiCheckCircle, BiXCircle } from 'react-icons/bi';

// --- DATA KUIS: Bab 2 - Simbol dan Kalimat Matematika ---
const quizQuestions = [
  {
    question: "1. Pilih simbol yang tepat untuk melengkapi: 7 … 5",
    options: ["<", ">", "="],
    correctAnswer: ">"
  },
  {
    question: "2. Pilih simbol yang tepat untuk melengkapi: 12 … 12",
    options: ["<", ">", "="],
    correctAnswer: "="
  },
  {
    question: "3. Pilih simbol yang tepat untuk melengkapi: 9 … 14",
    options: ["<", ">", "="],
    correctAnswer: "<"
  },
  {
    question: "4. Kalimat '18 − 6 = 12' adalah …",
    options: ["Benar", "Salah", "Bukan kalimat matematika"],
    correctAnswer: "Benar"
  },
  {
    question: "5. Kalimat '5 + 3 = 10' adalah …",
    options: ["Benar", "Salah", "Bukan kalimat matematika"],
    correctAnswer: "Salah"
  },
  {
    question: "6. Kalimat 'x + 4 = 10' termasuk …",
    options: ["Kalimat terbuka", "Kalimat tertutup", "Bukan kalimat matematika"],
    correctAnswer: "Kalimat terbuka"
  },
  {
    question: "7. Simbol yang tepat untuk 'tidak sama dengan' adalah …",
    options: ["≈", "≠", "≤"],
    correctAnswer: "≠"
  },
  {
    question: "8. Simbol yang tepat untuk 'lebih dari atau sama dengan' adalah …",
    options: ["≥", "<", "≤"],
    correctAnswer: "≥"
  },
  {
    question: "9. Manakah kalimat yang benar?",
    options: ["15 ≤ 12", "15 ≥ 12", "15 < 12"],
    correctAnswer: "15 ≥ 12"
  },
  {
    question: "10. Bentuk simbol dari kalimat: 'Bilangan 20 lebih kecil dari 25' adalah …",
    options: ["20 > 25", "20 = 25", "20 < 25"],
    correctAnswer: "20 < 25"
  }
];

// Kunci unik untuk localStorage (khusus Bab 2 Matematika Kelas 6)
const localStorageKey_Answers = 'quiz_mtk_6_2_answers';
const localStorageKey_Score   = 'quiz_mtk_6_2_score';

export default function MateriMatematikakelas6page() {
  const videoEmbedUrl = "https://www.youtube.com/embed/rCccAUxOtcM?si=IEpqLdsrY0Do8qN9";
  const videoTitle = "Materi Bab 2: Simbol dan Kalimat Matematika";

  // --- STATE UNTUK KUIS ---
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedAnswers = localStorage.getItem(localStorageKey_Answers);
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    }
    return {};
  });

  const [score, setScore] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedScore = localStorage.getItem(localStorageKey_Score);
      return savedScore ? JSON.parse(savedScore) : null;
    }
    return null;
  });

  const [showAnswers, setShowAnswers] = useState(false);

  // --- SINKRONISASI LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem(localStorageKey_Answers, JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  useEffect(() => {
    if (score !== null) {
      localStorage.setItem(localStorageKey_Score, JSON.stringify(score));
    }
  }, [score]);

  // --- HANDLER ---
  const handleAnswerChange = (questionIndex, answer) => {
    // hanya boleh diubah sebelum dinilai
    if (score === null) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionIndex]: answer
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score !== null) return; // mencegah submit ulang

    let newScore = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) newScore++;
    });
    setScore(newScore);
    setShowAnswers(false);
  };

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
      <main className="py-16 md:py-20 flex-grow">
        <div className="container mx-auto px-4">

          {/* Judul Halaman */}
          <h1 className="text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          <h2 className="text-3xl font-semibold text-slate-700 text-center mb-12">
            Simbol dan Kalimat Matematika
          </h2>

          {/* Wrapper Konten */}
          <div className="max-w-4xl mx-auto">

            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Video Pembelajaran
            </h3>

            {/* Video */}
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

            {/* --- BAGIAN KUIS --- */}
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
                      let labelClass = "text-slate-700"; // default

                      if (showAnswers) {
                        if (isCorrect) labelClass = "text-green-600 font-bold";
                        if (isSelected && !isCorrect) labelClass = "text-red-600 line-through";
                      }

                      const optionId = `q${index}_${option.replace(/\s+/g, '')}`;

                      return (
                        <div key={option} className="flex items-center">
                          <input
                            type="radio"
                            id={optionId}
                            name={`question_${index}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswerChange(index, option)}
                            disabled={score !== null}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label
                            htmlFor={optionId}
                            className={`ml-3 block text-sm font-medium ${labelClass}`}
                          >
                            {option}
                            {showAnswers && isCorrect && (
                              <BiCheckCircle className="inline ml-2 text-green-600" />
                            )}
                            {showAnswers && isSelected && !isCorrect && (
                              <BiXCircle className="inline ml-2 text-red-600" />
                            )}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Tombol Aksi */}
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
                  <>
                    <button
                      type="button"
                      onClick={() => setShowAnswers(!showAnswers)}
                      className="px-6 py-2 border border-slate-300 text-slate-700 rounded-md font-semibold hover:bg-slate-50 transition-all"
                    >
                      {showAnswers ? "Sembunyikan Jawaban" : "Lihat Kunci Jawaban"}
                    </button>
                    <button
                      type="button"
                      onClick={handleResetQuiz}
                      className="px-6 py-2 border border-transparent text-red-600 rounded-md font-semibold hover:bg-red-50 transition-all"
                    >
                      Ulangi Kuis
                    </button>
                  </>
                )}
              </div>

              {/* Skor */}
              {score !== null && (
                <div className="mt-6 p-4 rounded-md bg-blue-50 border border-blue-200">
                  <p className="font-semibold text-blue-800 text-lg">
                    Skor Anda (tersimpan di perangkat ini): {score} / {quizQuestions.length}
                  </p>
                </div>
              )}
            </form>
            {/* --- AKHIR BAGIAN KUIS --- */}

            {/* Tombol Kembali */}
            <div className="text-center mt-12">
              <Link
                href="/akademik/kelas-6/matematika"
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
