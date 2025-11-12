"use client"; // Wajib agar localStorage dan state React aktif di sisi client

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BiArrowBack, BiCheckCircle, BiXCircle } from "react-icons/bi";

// === DATA KUIS BAB 7: Menghitung Luas Berbagai Bangun Datar ===
const quizQuestions = [
  {
    question: "1. Rumus untuk menghitung luas persegi adalah ...",
    options: ["p × l", "s × s", "1/2 × a × t"],
    correctAnswer: "s × s",
  },
  {
    question: "2. Sebuah persegi panjang memiliki panjang 8 cm dan lebar 5 cm. Luasnya adalah ...",
    options: ["13 cm²", "20 cm²", "40 cm²"],
    correctAnswer: "40 cm²",
  },
  {
    question: "3. Rumus luas segitiga adalah ...",
    options: ["a × t", "1/2 × a × t", "a + t"],
    correctAnswer: "1/2 × a × t",
  },
  {
    question: "4. Sebuah segitiga memiliki alas 10 cm dan tinggi 6 cm. Luasnya adalah ...",
    options: ["30 cm²", "60 cm²", "16 cm²"],
    correctAnswer: "30 cm²",
  },
  {
    question: "5. Rumus untuk menghitung luas lingkaran adalah ...",
    options: ["π × r × r", "2 × π × r", "π × d"],
    correctAnswer: "π × r × r",
  },
  {
    question: "6. Sebuah lingkaran memiliki jari-jari 7 cm. Luasnya adalah ...",
    options: ["154 cm²", "44 cm²", "49 cm²"],
    correctAnswer: "154 cm²",
  },
  {
    question: "7. Sebuah jajar genjang memiliki alas 12 cm dan tinggi 8 cm. Luasnya adalah ...",
    options: ["96 cm²", "48 cm²", "80 cm²"],
    correctAnswer: "96 cm²",
  },
  {
    question: "8. Rumus luas trapesium adalah ...",
    options: ["1/2 × (a + b) × t", "a × t", "p × l"],
    correctAnswer: "1/2 × (a + b) × t",
  },
  {
    question: "9. Sebuah trapesium memiliki sisi sejajar 10 cm dan 6 cm serta tinggi 4 cm. Luasnya adalah ...",
    options: ["32 cm²", "64 cm²", "40 cm²"],
    correctAnswer: "32 cm²",
  },
  {
    question: "10. Bangun datar yang memiliki empat sisi sama panjang dan empat sudut siku-siku adalah ...",
    options: ["Persegi", "Jajar genjang", "Trapesium"],
    correctAnswer: "Persegi",
  },
];

// === LOCALSTORAGE KEYS ===
const localStorageKey_Answers = "quiz_mtk_6_7_answers";
const localStorageKey_Score = "quiz_mtk_6_7_score";

export default function MateriMatematikaKelas6Bab7Page() {
  const videoEmbedUrl =
    "https://www.youtube.com/embed/yVWvXynzG-w?si=tbigRu5LeKYknVX5";
  const videoTitle = "Materi Bab 7: Menghitung Luas Berbagai Bangun Datar";

  // === STATE MANAGEMENT ===
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // === LOAD LOCAL DATA ON CLIENT ===
  useEffect(() => {
    setIsClient(true);
    const savedAnswers = localStorage.getItem(localStorageKey_Answers);
    const savedScore = localStorage.getItem(localStorageKey_Score);
    if (savedAnswers) setSelectedAnswers(JSON.parse(savedAnswers));
    if (savedScore) setScore(JSON.parse(savedScore));
  }, []);

  // === SYNC TO LOCALSTORAGE ===
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
    if (score !== null) return;
    setSelectedAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score !== null) return;
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

  if (!isClient) return null; // Hindari SSR error

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
            {/* Video Section */}
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

            {/* === BAGIAN KUIS === */}
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
