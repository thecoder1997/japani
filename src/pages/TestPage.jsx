

import { useState } from "react";
import TestHiragana from "../components/TestHiragana";
import TestKatakana from "../components/TestKatakana";

export default function TestPage() {
  const [mode, setMode] = useState("hiragana");

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kana Test</h1>

      <div className="inline-flex rounded-xl overflow-hidden shadow mb-6">
        <button
          onClick={() => setMode("hiragana")}
          className={`px-4 py-2 ${mode === "hiragana" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
        >
          Hiragana Test
        </button>
        <button
          onClick={() => setMode("katakana")}
          className={`px-4 py-2 ${mode === "katakana" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
        >
          Katakana Test
        </button>
      </div>

      {mode === "hiragana" ? <TestHiragana /> : <TestKatakana />}
    </div>
  );
}
