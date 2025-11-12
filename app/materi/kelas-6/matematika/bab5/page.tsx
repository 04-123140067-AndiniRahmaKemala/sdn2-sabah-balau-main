"use client"; // wajib agar React state & localStorage berfungsi di client

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BiArrowBack, BiCheckCircle, BiXCircle } from "react-icons/bi";

// === DATA KUIS BAB 5: Kelipatan dan Perbandingan ===
const quizQuestions = [
  {
    question: "1. Kelipatan persekutuan terkecil (KPK) dari 4 dan 6 adalah ...",
    options: ["8", "12", "24"],
    correctAnswer: "12",
  },
  {
    question: "2. Faktor persekutuan terbesar (FPB) dari 18 dan 24 adalah ...",
    options: ["3", "6", "12"],
    correctAnswer: "6",
  },
  {
    question: "3. Jika 2 : 5 = x : 20, maka nilai x adalah ...",
    options: ["4", "6", "8"],
    correctAnswer: "8",
  },
  {
    question: "4. Perbandingan uang Rina dan Dini adalah 2 : 3. Jika uang Dini Rp30.000, maka uang Rina adalah ...",
    options: ["Rp10.000", "Rp20.000", "Rp25.000"],
    correctAnswer: "Rp20.000",
  },
  {
    question: "5. KPK dari 8 dan 12 adalah ...",
    options: ["16", "24", "36"],
    correctAnswer: "24",
  },
  {
    question: "6. FPB dari 20 dan 50 adalah ...",
    options: ["5", "10", "20"],
    correctAnswer: "10",
  },
  {
    question: "7. 3 banding 9 sama dengan ...",
    options: ["1 : 2", "1 : 3", "2 : 3"],
    correctAnswer: "1 : 3",
  },
  {
    question: "8. KPK dari 9 dan 12 adalah ...",
    options: ["18", "24", "36"],
    correctAnswer: "36",
  },
  {
    question: "9. Perbandingan panjang tali 4 m dan 10 m dapat disederhanakan menjadi ...",
    options: ["1 : 2", "2 : 3", "2 : 5"],
    correctAnswer: "2 : 5",
  },
  {
    question: "10. FPB dari 15, 25, dan 35 adalah ...",
    options: ["3", "4", "5"],
    correctAnswer: "5",
  },
];

// === LOCALSTORAGE KEYS ===
const localStorageKey_Answers = "quiz_mtk_6_5_answers";
const localStorageKey_Score = "quiz_mtk_6_5_score";

export default function MateriMatematikaKelas6Bab5Page() {
  const videoEmbedUrl =
    "https://www.youtube.com/embed/-zaNnBwbBkA?si=lY3knFfI7LxOaPu9";
  const videoTitle = "Materi Bab 5: Kelipatan dan Perbandingan";

  // === STATE ===
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isClient, setIsClient] = useState(false); // mencegah hydration error

  // === LOAD DATA LOCALSTORAGE SAAT CLIENT MOUNT ===
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
    if (score !== null) return; // tidak bisa ubah setelah disubmit
    setSelectedAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score !== null) return; // hindari submit ulang
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

  // === CEGAH HYDRATION ERROR ===
  if (!isClient) return null;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="py-10 md:py-16 flex-grow">
        <div className="container mx-auto px-4">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Pusat Akademik Siswa
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 text-center mb-10 md:mb-12">
            {videoTitle}
          </h2>

          {/* Wrapper */}
          <div className="max-w-4xl mx-auto">
            {/* Video */}
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

              {/* Tombol dan Skor */}
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

              {score !== null && (
                <div className="mt-6 p-4 rounded-md bg-blue-50 border border-blue-200">
                  <p className="font-semibold text-blue-800 text-lg">
                    Skor Anda (tersimpan di perangkat ini): {score} /{" "}
                    {quizQuestions.length}
                  </p>
                </div>
              )}
            </form>

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
