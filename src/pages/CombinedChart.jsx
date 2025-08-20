

import React, { useState, useMemo } from "react";
import { FaVolumeUp } from "react-icons/fa";
import { HIRAGANA_ALL } from "../data/hiragana";
import { KATAKANA_ALL } from "../data/katakana";
import { useNavigate } from "react-router-dom";

const ROWS = [
  ["a", "i", "u", "e", "o"],
  ["ka", "ki", "ku", "ke", "ko"],
  ["sa", "shi", "su", "se", "so"],
  ["ta", "chi", "tsu", "te", "to"],
  ["na", "ni", "nu", "ne", "no"],
  ["ha", "hi", "fu", "he", "ho"],
  ["ma", "mi", "mu", "me", "mo"],
  ["ya", "yu", "yo"],
  ["ra", "ri", "ru", "re", "ro"],
  ["wa", "wo"],
  ["n"],
  ["ga", "gi", "gu", "ge", "go"],
  ["za", "ji", "zu", "ze", "zo"],
  ["da", "di", "du", "de", "do"],
  ["ba", "bi", "bu", "be", "bo"],
  ["pa", "pi", "pu", "pe", "po"],
];

const CombinedChart = () => {
  const navigate = useNavigate();
  const [speechRate, setSpeechRate] = useState(0.9);

  const speakJapanese = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = speechRate;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const hiraganaMap = useMemo(() => new Map(HIRAGANA_ALL.map((c) => [c.romaji, c])), []);
  const katakanaMap = useMemo(() => new Map(KATAKANA_ALL.map((c) => [c.romaji, c])), []);

  const startRowTestFromMap = (row, dataMap) => {
    const rowChars = row.map((romaji) => dataMap.get(romaji)).filter(Boolean);
    navigate("/row-test", { state: { rowChars } });
  };

  const Section = ({ title, dataMap }) => (
    <section className="my-8">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600 mb-4">
        {title}
      </h2>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-stretch gap-3">
          {ROWS.map((row, idx) => (
            <div key={idx} className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
              {row.map((romaji) => {
                const charData = dataMap.get(romaji);
                if (!charData) return null;
                return (
                  <div
                    key={romaji}
                    className="flex flex-col items-center rounded-xl p-3 md:p-4 bg-white shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-indigo-200 transition"
                    style={{ minWidth: "120px" }}
                  >
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none">{charData.char}</div>
                    <div className="text-base sm:text-lg md:text-xl text-gray-600 mt-1">{charData.romaji}</div>
                    <button
                      onClick={() => speakJapanese(charData.char)}
                      className="mt-1 inline-flex items-center justify-center text-indigo-600 hover:text-indigo-500"
                      aria-label={`Play pronunciation for ${charData.char}`}
                    >
                      <FaVolumeUp />
                    </button>
                  </div>
                );
              })}
              <div className="flex items-center justify-center">
                <button
                  className="inline-flex items-center rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500"
                  onClick={() => startRowTestFromMap(row, dataMap)}
                >
                  Test row
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex flex-col items-center gap-3">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">Master Hiragana & Katakana</h1>
        <p className="text-center text-gray-600 max-w-2xl">Adjust the playback speed and tap the speaker to hear each character. Test yourself by rows when you\'re ready.</p>
        <div className="flex items-center gap-4 mt-2">
          <label htmlFor="rate" className="font-semibold text-sm sm:text-base">Speed:</label>
          <input
            id="rate"
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={speechRate}
            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
          />
          <span className="text-sm sm:text-base">{speechRate.toFixed(1)}x</span>
        </div>
      </div>

      <Section title="Hiragana Chart" dataMap={hiraganaMap} />
      <Section title="Katakana Chart" dataMap={katakanaMap} />
    </div>
  );
};

export default CombinedChart;