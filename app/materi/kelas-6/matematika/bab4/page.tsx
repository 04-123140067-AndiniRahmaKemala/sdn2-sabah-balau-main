"use client"; // wajib agar React state & localStorage berfungsi di client

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BiArrowBack, BiCheckCircle, BiXCircle } from "react-icons/bi";

/**
 * BAB 4: Pembagian Pecahan
 * - Soal disesuaikan dengan materi pembagian pecahan & pecahan campuran.
 */
const quizQuestions = [
  {
    question: "1. Hasil dari 1/2 ÷ 1/3 adalah ...",
    options: ["1/6", "3/2", "2/3"],
    correctAnswer: "3/2",
  },
  {
    question: "2. Hasil dari 3/4 ÷ 1/2 adalah ...",
    options: ["3/8", "3/2", "1/2"],
    correctAnswer: "3/2",
  },
  {
    question: "3. Hasil dari 2/5 ÷ 2 adalah ...",
    options: ["1/5", "2/10", "4/5"],
    correctAnswer: "1/5",
  },
  {
    question: "4. Hasil dari 6 ÷ 3/2 adalah ...",
    options: ["4", "9", "3"],
    correctAnswer: "4",
  },
  {
    question: "5. Hasil dari 5/6 ÷ 5/3 adalah ...",
    options: ["1/2", "5/9", "3/6"],
    correctAnswer: "1/2",
  },
  {
    question: "6. Hasil dari 2 1/2 ÷ 1/2 adalah ...",
    options: ["4", "5", "3"],
    correctAnswer: "5",
  },
  {
    question: "7. Hasil dari 3/8 ÷ 3 adalah ...",
    options: ["1/8", "1/6", "3/24"],
    correctAnswer: "1/8",
  },
  {
    question: "8. Hasil dari 4 ÷ 2/3 adalah ...",
    options: ["6", "8/3", "3/2"],
    correctAnswer: "6",
  },
  {
    question: "9. Hasil dari 2/3 ÷ 4/9 adalah ...",
    options: ["3/2", "1/6", "1/3"],
    correctAnswer: "3/2",
  },
  {
    question:
      "10. 3/4 kue dibagi rata untuk 3 anak. Setiap anak mendapat ...",
    options: ["1/4", "1/3", "1/6"],
    correctAnswer: "1/4",
  },
];

// localStorage keys yang unik untuk BAB 4
const localStorageKey_Answers = "quiz_mtk_6_4_answers";
const localStorageKey_Score = "quiz_mtk_6_4_score";

export default function MateriMatematikaKelas6Bab4Page() {
  // Ganti URL & judul video sesuai materi Bab 4 jika ada
  const videoEmbedUrl =
    "https://www.youtube.com/embed/jIzpIse7iyU?si=QSLao2R5AI_EU834"; // placeholder, silakan ganti jika ada video Bab 4
  const videoTitle = "Materi Bab 4: Pembagian Pecahan";

  // --- STATE ---
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isClient, setIsClient] = useState(false); // mencegah hydration error

  // Hanya muat data dari localStorage di client untuk menghindari hydration mismatch
  useEffect(() => {
    setIsClient(true);
    const savedAnswers = localStorage.getItem(localStorageKey_Answers);
    const savedScore = localStorage.getItem(localStorageKey_Score);
    if (savedAnswers) setSelectedAnswers(JSON.parse(savedAnswers));
    if (savedScore) setScore(JSON.parse(savedScore));
  }, []);

  // Simpan jawaban ke localStorage setiap berubah (client only)
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(localStorageKey_Answers, JSON.stringify(selectedAnswers));
  }, [selectedAnswers, isClient]);

  // Simpan skor ke localStorage setiap berubah (client only)
  useEffect(() => {
    if (!isClient || score === null) return;
    localStorage.setItem(localStorageKey_Score, JSON.stringify(score));
  }, [score, isClient]);

  // --- HANDLER ---
  const handleAnswerChange = (qIndex, answer) => {
    if (score !== null) return; // tidak bisa mengubah setelah submit
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: answer }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score !== null) return; // cegah submit ulang
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
    if (isClient) {
      localStorage.removeItem(localStorageKey_Answers);
      localStorage.removeItem(localStorageKey_Score);
    }
  };

  // Cegah render saat SSR agar tidak terjadi hydration error
  if (!isClient) return null;

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
            {videoTitle}
          </h2>

          {/* Konten */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
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

            {/* --- KUIS --- */}
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

                      const safeOption = option.replace(/[^a-zA-Z0-9]/g, "");
                      const optionId = `q${qIndex}_opt${optIndex}_${safeOption}`;

                      return (
                        <div
                          key={`opt-${qIndex}-${optIndex}-${safeOption}`}
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
