"use client"; // Wajib agar localStorage & state React berfungsi di sisi client

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BiArrowBack, BiCheckCircle, BiXCircle } from "react-icons/bi";

// === DATA KUIS BAB 8: Urutan dan Kombinasi ===
const quizQuestions = [
  {
    question: "1. Banyak cara menyusun huruf A, B, dan C secara berurutan adalah ...",
    options: ["3", "6", "9"],
    correctAnswer: "6",
  },
  {
    question: "2. Jika ada 4 orang yang berdiri dalam satu barisan, banyak susunannya adalah ...",
    options: ["16", "24", "12"],
    correctAnswer: "24",
  },
  {
    question: "3. Permutasi dari 3 huruf A, B, dan C adalah ...",
    options: ["ABC, ACB, BAC, BCA, CAB, CBA", "AB, AC, BC", "A, B, C"],
    correctAnswer: "ABC, ACB, BAC, BCA, CAB, CBA",
  },
  {
    question: "4. Banyak cara memilih 2 siswa dari 4 siswa (A, B, C, D) adalah ...",
    options: ["4", "6", "8"],
    correctAnswer: "6",
  },
  {
    question: "5. Dari angka 1, 2, 3, banyak cara menyusun dua angka yang berbeda adalah ...",
    options: ["3", "6", "9"],
    correctAnswer: "6",
  },
  {
    question: "6. Jika kita memiliki 5 buku dan ingin memilih 2 buku, banyak pilihannya adalah ...",
    options: ["10", "20", "5"],
    correctAnswer: "10",
  },
  {
    question: "7. Banyak susunan berbeda dari huruf-huruf pada kata 'ABC' adalah ...",
    options: ["3", "6", "9"],
    correctAnswer: "6",
  },
  {
    question: "8. Banyak cara memilih 3 dari 5 siswa untuk tugas kelompok adalah ...",
    options: ["5", "10", "15"],
    correctAnswer: "10",
  },
  {
    question: "9. Jika ada 4 kursi dan 2 orang, banyak cara duduknya adalah ...",
    options: ["6", "8", "12"],
    correctAnswer: "12",
  },
  {
    question: "10. Banyak cara mengatur 3 siswa untuk berdiri dalam barisan adalah ...",
    options: ["3", "6", "9"],
    correctAnswer: "6",
  },
];

// === LOCALSTORAGE KEYS ===
const localStorageKey_Answers = "quiz_mtk_6_8_answers";
const localStorageKey_Score = "quiz_mtk_6_8_score";

export default function MateriMatematikaKelas6Bab8Page() {
  const videoEmbedUrl =
    "https://www.youtube.com/embed/ALnK4qapceQ?si=FtfQSee8pS9Vt9Ml";
  const videoTitle = "Materi Bab 8: Urutan dan Kombinasi";

  // === STATE ===
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isClient, setIsClient] = useState(false); // Mencegah hydration error

  // === LOAD LOCAL DATA ===
  useEffect(() => {
    setIsClient(true);
    const savedAnswers = localStorage.getItem(localStorageKey_Answers);
    const savedScore = localStorage.getItem(localStorageKey_Score);
    if (savedAnswers) setSelectedAnswers(JSON.parse(savedAnswers));
    if (savedScore) setScore(JSON.parse(savedScore));
  }, []);

  // === SIMPAN LOCALSTORAGE ===
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(localStorageKey_Answers, JSON.stringify(selectedAnswers));
  }, [selectedAnswers, isClient]);

  useEffect(() => {
    if (!isClient || score === null) return;
    localStorage.setItem(localStorageKey_Score, JSON.stringify(score));
  }, [score, isClient]);

  // === HANDLERS ===
  const handleAnswerChange = (index, answer) => {
    if (score !== null) return; // Tidak bisa ubah setelah submit
    setSelectedAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score !== null) return; // Hindari submit ulang
    let newScore = 0;
    quizQuestions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) newScore++;
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

  if (!isClient) return null; // Hindari error SSR

  // === UI ===
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="py-10 md:py-16 flex-grow">
        <div className="container mx-auto px-4">
          {/* === HEADER === */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 text-center mb-10 md:mb-12">
            {videoTitle}
          </h2>

          {/* === KONTEN === */}
          <div className="max-w-4xl mx-auto">
            {/* === VIDEO === */}
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

            {/* === KUIS === */}
            <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-4">
              Uji Pemahaman (10 Soal)
            </h3>

            <form
              onSubmit={handleSubmit}
              className="p-4 md:p-6 border rounded-lg shadow-lg bg-white"
            >
              {quizQuestions.map((q, qIndex) => (
                <div
                  key={`question-${qIndex}`}
                  className="mb-6 pb-4 border-b last:border-b-0"
                >
                  <p className="font-semibold text-lg mb-3 text-gray-900">
                    {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => {
                      const isCorrect = q.correctAnswer === option;
                      const isSelected = selectedAnswers[qIndex] === option;
                      let labelClass = "text-slate-700";

                      if (showAnswers) {
                        if (isCorrect) labelClass = "text-green-600 font-bold";
                        if (isSelected && !isCorrect)
                          labelClass = "text-red-600 line-through";
                      }

                      const optionId = `q${qIndex}_opt${optIndex}`;
                      return (
                        <div
                          key={`${qIndex}-${optIndex}-${option}`}
                          className="flex items-center"
                        >
                          <input
                            type="radio"
                            id={optionId}
                            name={`question_${qIndex}`}
                            value={option}
                            checked={!!isSelected}
                            onChange={() => handleAnswerChange(qIndex, option)}
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

              {/* === TOMBOL & SKOR === */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {score === null && (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-all"
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
                      className="px-6 py-2 text-red-600 rounded-md font-semibold border border-transparent hover:bg-red-50 transition-all"
                    >
                      Ulangi Kuis
                    </button>
                  </>
                )}
              </div>

              {/* === SKOR === */}
              {score !== null && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="font-semibold text-blue-800 text-lg">
                    Skor Anda (tersimpan di perangkat ini): {score} /{" "}
                    {quizQuestions.length}
                  </p>
                </div>
              )}
            </form>

            {/* === KEMBALI === */}
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
