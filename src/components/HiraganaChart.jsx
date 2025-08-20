
import React from "react";
import { HIRAGANA_ALL } from "../data/hiragana";
import KatakanaChart from "./KatakanaChart";

const Section = ({ title, items }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
      {items.map((h) => (
        <div key={h.char} className="p-3 border rounded text-center">
          <div className="text-2xl">{h.char}</div>
          <div className="text-gray-500 text-sm">{h.romaji}</div>
        </div>
      ))}
    </div>
  </div>
);

export default function HiraganaChart() {
  const base = HIRAGANA_ALL.filter((x) => x.type === "base");
  const voiced = HIRAGANA_ALL.filter((x) => x.type === "voiced");
  const small = HIRAGANA_ALL.filter((x) => x.type === "small");

  return (
    <div>
      <Section title="Base (ごじゅうおん)" items={base} />
      <Section title="Dakuten & Handakuten" items={voiced} />
      <Section title="Small Kana (not testable)" items={small} />
      <div>
        <KatakanaChart/>
      </div>
    </div>
  );
}