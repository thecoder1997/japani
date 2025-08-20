




import Raect,{ useState } from "react";
import HiraganaChart from "../components/HiraganaChart";
import KatakanaChart from "../components/KatakanaChart";

export default function ChartPage() {
  const [tab, setTab] = useState("hiragana");

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Kana Charts</h1>

      <div className="inline-flex rounded-xl overflow-hidden shadow mb-6">
        <button
          onClick={() => setTab("hiragana")}
          className={`px-4 py-2 ${tab === "hiragana" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
        >
          Hiragana
        </button>
        <button
          onClick={() => setTab("katakana")}
          className={`px-4 py-2 ${tab === "katakana" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
        >
          Katakana
        </button>
      </div>

      {tab === "hiragana" ? <HiraganaChart /> : <KatakanaChart />}
    </div>
  );
}
