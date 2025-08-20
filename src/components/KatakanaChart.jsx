
import React from "react";


import { KATAKANA_ALL } from "../data/katakana";

const Section = ({ title, items }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
      {items.map((k) => (
        <div key={k.char} className="p-3 border rounded text-center">
          <div className="text-2xl">{k.char}</div>
          <div className="text-gray-500 text-sm">{k.romaji}</div>
        </div>
      ))}
    </div>
  </div>
);

export default function KatakanaChart() {
  const base = KATAKANA_ALL.filter((x) => x.type === "base");
  const voiced = KATAKANA_ALL.filter((x) => x.type === "voiced");
  const small = KATAKANA_ALL.filter((x) => x.type === "small");
  const marks = KATAKANA_ALL.filter((x) => x.type === "mark");

  return (
    <div>
      <Section title="Base (ごじゅうおん)" items={base} />
      <Section title="Dakuten & Handakuten" items={voiced} />
      <Section title="Small Kana (not testable)" items={small} />
      <Section title="Marks" items={marks} />
    </div>
  );
}