"use client"; // Wajib agar localStorage dan state React aktif di sisi client

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BiArrowBack, BiCheckCircle, BiXCircle } from "react-icons/bi";

// === DATA KUIS BAB 9: Kecepatan ===
const quizQuestions = [
  {
    question: "1. Rumus kecepatan adalah ...",
    options: ["Jarak × Waktu", "Jarak ÷ Waktu", "Waktu ÷ Jarak"],
    correctAnswer: "Jarak ÷ Waktu",
  },
  {
    question: "2. Satuan kecepatan dalam SI adalah ...",
    options: ["km/jam", "m/s", "cm/detik"],
    correctAnswer: "m/s",
  },
  {
    question: "3. Jika jarak 120 km ditempuh dalam waktu 3 jam, maka kecepatannya adalah ...",
    options: ["30 km/jam", "40 km/jam", "60 km/jam"],
    correctAnswer: "40 km/jam",
  },
  {
    question: "4. Sebuah mobil menempuh 200 km dalam waktu 4 jam. Kecepatannya adalah ...",
    options: ["50 km/jam", "100 km/jam", "25 km/jam"],
    correctAnswer: "50 km/jam",
  },
  {
    question: "5. Jika kecepatan 60 km/jam dan waktu 2 jam, maka jarak yang ditempuh adalah ...",
    options: ["120 km", "30 km", "100 km"],
    correctAnswer: "120 km",
  },
  {
    question: "6. Jika jarak 150 km dan kecepatan 50 km/jam, waktu tempuhnya adalah ...",
    options: ["2 jam", "3 jam", "4 jam"],
    correctAnswer: "3 jam",
  },
  {
    question: "7. Sepeda bergerak dengan kecepatan 10 m/s selama 120 detik. Jarak yang ditempuh adalah ...",
    options: ["1.200 m", "12.000 m", "1.000 m"],
    correctAnswer: "1.200 m",
  },
  {
    question: "8. Mobil A melaju dengan kecepatan 80 km/jam, mobil B 60 km/jam. Mobil mana yang lebih cepat?",
    options: ["Mobil A", "Mobil B", "Sama cepat"],
    correctAnswer: "Mobil A",
  },
  {
    question: "9. Jika jarak 360 km ditempuh dalam 6 jam, maka kecepatan rata-ratanya adalah ...",
    options: ["60 km/jam", "30 km/jam", "90 km/jam"],
    correctAnswer: "60 km/jam",
  },
  {
    question: "10. Jika waktu tempuh 5 jam dan kecepatan 72 km/jam, maka jarak yang ditempuh adalah ...",
    options: ["300 km", "350 km", "360 km"],
    correctAnswer: "360 km",
  },
];

// === LOCALSTORAGE KEYS ===
const localStorageKey_Answers = "quiz_mtk_6_9_answers";
const localStorageKey_Score = "quiz_mtk_6_9_score";

export default function MateriMatematikaKelas6Bab9Page() {
  const videoEmbedUrl = "https://www.youtube.com/embed/kw5WkDYiIkw?si=hTbVTyOauna9Az-2";
  const videoTitle = "Materi Bab 9: Kecepatan";

  // === STATE ===
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // === LOAD LOCAL DATA ===
  useEffect(() => {
    setIsClient(true);
    const savedAnswers = localStorage.getItem(localStorageKey_Answers);
    const savedScore = localStorage.getItem(localStorageKey_Score);
    if (savedAnswers) setSelectedAnswers(JSON.parse(savedAnswers));
    if (savedScore) setScore(JSON.parse(savedScore));
  }, []);

  // === SAVE TO LOCALSTORAGE ===
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
                    Skor Anda (tersimpan di perangkat ini): {score} / {quizQuestions.length}
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
