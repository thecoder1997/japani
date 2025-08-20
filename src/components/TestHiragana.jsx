
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { HIRAGANA_TESTABLE } from "../data/hiragana";
import { FaVolumeUp } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

export default function TestHiragana() {
  return <KanaTest title="Test Your Hiragana" pool={HIRAGANA_TESTABLE} />;
}

function speak(char, rate = 0.9) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(char);
  u.lang = "ja-JP";
  u.rate = rate;
  u.pitch = 1.05;
  window.speechSynthesis.speak(u);
}

function KanaTest({ title, pool }) {
  const list = useMemo(() => pool, [pool]);
  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [rate, setRate] = useState(0.9);

  const pick = () => list[Math.floor(Math.random() * list.length)];

  useEffect(() => {
    const c = pick();
    setCurrent(c);
  }, [list]);

  const check = () => {
    if (!current) return;
    const val = input.trim().toLowerCase();
    const answers = [current.romaji, ...(current.alt || [])].map((x) => x.toLowerCase());
    const ok = answers.includes(val);

    setAttempts((a) => a + 1);
    if (ok) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
      setMessage("✅ Correct!");
    } else {
      setStreak(0);
      setMessage(`❌ ${current.char} = "${current.romaji}"`);
    }
    setInput("");
    setShowHint(false);
    setCurrent(pick());
  };

  const skip = () => {
    setMessage("⏭️ Skipped");
    setInput("");
    setShowHint(false);
    setCurrent(pick());
  };

  const onKey = (e) => {
    if (e.key === "Enter") check();
  };

  if (!current) return null;

  const progressPct = attempts === 0 ? 0 : Math.min(100, Math.round((score / attempts) * 100));

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <div>Accuracy: <span className="font-medium text-gray-800">{progressPct}%</span></div>
          <div>Streak: <span className="font-medium text-gray-800">{streak}</span></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-3">{title}</h2>

      <div className="flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.char}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-7xl sm:text-8xl font-bold"
          >
            {current.char}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          onClick={() => speak(current.char, rate)}
          className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 hover:bg-indigo-50"
        >
          <FaVolumeUp className="mr-2" /> Listen
        </button>
        <button
          onClick={() => setShowHint((v) => !v)}
          className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
        >
          {showHint ? 'Hide hint' : 'Show hint'}
        </button>
        <button
          onClick={skip}
          className="inline-flex items-center rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Skip
        </button>
      </div>

      {showHint && (
        <div className="mt-2 text-center text-gray-600">Hint: starts with "{current.romaji[0]}"</div>
      )}

      <div className="mt-3 flex items-center justify-center gap-3">
        <label className="text-sm">Speed</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
        />
        <span className="text-sm">{rate.toFixed(1)}x</span>
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKey}
        className="border p-3 w-full rounded mt-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        placeholder="Type romaji (e.g., a, ka, shi)…"
        autoFocus
      />

      <button
        onClick={check}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded mt-3"
      >
        Submit
      </button>

      <div className="mt-4 text-lg">{message}</div>
      <div className="mt-2 text-sm text-gray-600">
        Score: <span className="font-semibold">{score}</span> / {attempts}
      </div>
    </div>
  );
}



// export default function TestHiragana() {
//   const [score, setScore] = useState(0);
//   const [input, setInput] = useState("");
//   const [current, setCurrent] = useState(hiragana[Math.floor(Math.random() * hiragana.length)]);
//   const [message, setMessage] = useState("");

//   const checkAnswer = () => {
//     if (input.trim().toLowerCase() === current.romaji) {
//       setScore(score + 1);
//       setMessage("✅ Correct!");
//     } else {
//       setMessage(`❌ Wrong! It was "${current.romaji}"`);
//     }
//     setInput("");
//     setCurrent(hiragana[Math.floor(Math.random() * hiragana.length)]);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 border rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Test Your Hiragana</h2>
//       <div className="text-6xl font-bold mb-4 text-center">{current.char}</div>
//       <input
//         type="text"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         className="border p-2 w-full rounded mb-4"
//         placeholder="Type romaji..."
//       />
//       <button
//         onClick={checkAnswer}
//         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
//       >
//         Submit
//       </button>
//       <div className="mt-4 text-lg">{message}</div>
//       <div className="mt-2">Score: {score}</div>
//     </div>
//   );
// }
