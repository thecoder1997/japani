
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function RowTest() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowChars } = location.state || { rowChars: [] };

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [missCounts, setMissCounts] = useState({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (rowChars.length > 0) {
      const allChars = rowChars.flatMap((char) => Array(4).fill(char));
      setQuestions(shuffle(allChars));
    }
  }, [rowChars]);

  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  const handleSubmit = (e) => {
    e.preventDefault();
    const current = questions[currentIndex];
    const isCorrect = answer.trim().toLowerCase() === current.romaji;

    if (!isCorrect) {
      setMissCounts((prev) => ({ ...prev, [current.char]: (prev[current.char] || 0) + 1 }));
    }

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setFeedback({ correct: isCorrect, correctAnswer: current.romaji });
    setShowNext(true);

    setTimeout(() => {
      setAnswer("");
      setFeedback(null);
      setShowNext(false);

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        setFinished(true);
      }
    }, 900);
  };

  const bounceVariant = { animate: { scale: [1, 1.1, 1], transition: { duration: 0.35 } } };
  const shakeVariant = { animate: { x: [0, -8, 8, -8, 8, 0], transition: { duration: 0.35 } } };
  const feedbackVariant = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.25 } }, exit: { opacity: 0, y: -10, transition: { duration: 0.25 } } };
  const charSlideVariant = { initial: { x: 80, opacity: 0 }, animate: { x: 0, opacity: 1, transition: { duration: 0.35 } }, exit: { x: -80, opacity: 0, transition: { duration: 0.35 } } };

  if (questions.length === 0) {
    return <div className="text-center mt-10 text-gray-600">No row data found.</div>;
  }

  const total = questions.length;
  const accuracy = total === 0 ? 0 : Math.round((score / total) * 100);
  const mostMissed = Object.entries(missCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Row Test</h1>

      <div className="h-40 flex items-center justify-center mb-6 overflow-hidden w-40 mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={
              feedback
                ? feedback.correct
                  ? { ...charSlideVariant, ...bounceVariant }
                  : { ...charSlideVariant, ...shakeVariant }
                : charSlideVariant
            }
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-7xl sm:text-8xl font-bold"
          >
            {questions[currentIndex].char}
          </motion.div>
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
        <motion.input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`border px-3 py-2 rounded text-lg outline-none w-48 sm:w-64 ${
            feedback ? (feedback.correct ? "border-green-500" : "border-red-500") : "border-gray-300"
          }`}
          autoFocus
          disabled={showNext}
          variants={feedback ? (feedback.correct ? bounceVariant : shakeVariant) : {}}
          animate="animate"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500" disabled={showNext}>
          Submit
        </button>
      </form>

      <AnimatePresence>
        {feedback && (
          <motion.div
            key="feedback"
            variants={feedbackVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`mt-4 text-center text-lg font-semibold ${feedback.correct ? "text-green-600" : "text-red-600"}`}
          >
            {feedback.correct ? "✅ Correct!" : `❌ Wrong! Correct answer: ${feedback.correctAnswer}`}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 text-center text-gray-700">Question {currentIndex + 1} / {total}</div>
      <div className="text-center text-gray-600">Score: {score}</div>

      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          >
            <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} exit={{ scale: 0.98 }} transition={{ duration: 0.15 }} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h3 className="text-xl font-bold">Session summary</h3>
              <p className="mt-1 text-gray-600">Great work! Here\'s how you did:</p>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-indigo-50 p-3">
                  <div className="text-2xl font-extrabold text-indigo-700">{accuracy}%</div>
                  <div className="text-sm text-indigo-700/80">Accuracy</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-2xl font-extrabold text-slate-800">{score}</div>
                  <div className="text-sm text-slate-600">Correct</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="text-2xl font-extrabold text-slate-800">{total - score}</div>
                  <div className="text-sm text-slate-600">Missed</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium text-slate-700">Most missed</div>
                {mostMissed.length === 0 ? (
                  <div className="mt-2 text-sm text-slate-600">Nice! Nothing stood out.</div>
                ) : (
                  <ul className="mt-2 text-sm text-slate-700 space-y-1">
                    {mostMissed.map(([char, count]) => (
                      <li key={char} className="flex items-center justify-between rounded border px-3 py-2">
                        <span className="text-lg font-bold">{char}</span>
                        <span className="text-slate-600">{count} miss{count > 1 ? 'es' : ''}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 flex items-center justify-end gap-2">
                <button onClick={() => navigate('/')} className="inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Back to charts</button>
                <button onClick={() => { setFinished(false); setCurrentIndex(0); setScore(0); setMissCounts({}); setQuestions(shuffle(rowChars.flatMap((c) => Array(4).fill(c)))); }} className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">Retry</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
