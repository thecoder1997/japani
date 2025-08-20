
import React from "react";
const BASE = [
  { char: "ア", romaji: "a", type: "base", testable: true },
  { char: "イ", romaji: "i", type: "base", testable: true },
  { char: "ウ", romaji: "u", type: "base", testable: true },
  { char: "エ", romaji: "e", type: "base", testable: true },
  { char: "オ", romaji: "o", type: "base", testable: true },

  { char: "カ", romaji: "ka", type: "base", testable: true },
  { char: "キ", romaji: "ki", type: "base", testable: true },
  { char: "ク", romaji: "ku", type: "base", testable: true },
  { char: "ケ", romaji: "ke", type: "base", testable: true },
  { char: "コ", romaji: "ko", type: "base", testable: true },

  { char: "サ", romaji: "sa", type: "base", testable: true },
  { char: "シ", romaji: "shi", alt: ["si"], type: "base", testable: true },
  { char: "ス", romaji: "su", type: "base", testable: true },
  { char: "セ", romaji: "se", type: "base", testable: true },
  { char: "ソ", romaji: "so", type: "base", testable: true },

  { char: "タ", romaji: "ta", type: "base", testable: true },
  { char: "チ", romaji: "chi", alt: ["ti"], type: "base", testable: true },
  { char: "ツ", romaji: "tsu", alt: ["tu"], type: "base", testable: true },
  { char: "テ", romaji: "te", type: "base", testable: true },
  { char: "ト", romaji: "to", type: "base", testable: true },

  { char: "ナ", romaji: "na", type: "base", testable: true },
  { char: "ニ", romaji: "ni", type: "base", testable: true },
  { char: "ヌ", romaji: "nu", type: "base", testable: true },
  { char: "ネ", romaji: "ne", type: "base", testable: true },
  { char: "ノ", romaji: "no", type: "base", testable: true },

  { char: "ハ", romaji: "ha", type: "base", testable: true },
  { char: "ヒ", romaji: "hi", type: "base", testable: true },
  { char: "フ", romaji: "fu", alt: ["hu"], type: "base", testable: true },
  { char: "ヘ", romaji: "he", type: "base", testable: true },
  { char: "ホ", romaji: "ho", type: "base", testable: true },

  { char: "マ", romaji: "ma", type: "base", testable: true },
  { char: "ミ", romaji: "mi", type: "base", testable: true },
  { char: "ム", romaji: "mu", type: "base", testable: true },
  { char: "メ", romaji: "me", type: "base", testable: true },
  { char: "モ", romaji: "mo", type: "base", testable: true },

  { char: "ヤ", romaji: "ya", type: "base", testable: true },
  { char: "ユ", romaji: "yu", type: "base", testable: true },
  { char: "ヨ", romaji: "yo", type: "base", testable: true },

  { char: "ラ", romaji: "ra", type: "base", testable: true },
  { char: "リ", romaji: "ri", type: "base", testable: true },
  { char: "ル", romaji: "ru", type: "base", testable: true },
  { char: "レ", romaji: "re", type: "base", testable: true },
  { char: "ロ", romaji: "ro", type: "base", testable: true },

  { char: "ワ", romaji: "wa", type: "base", testable: true },
  { char: "ヲ", romaji: "wo", alt: ["o"], type: "base", testable: true },

  { char: "ン", romaji: "n", alt: ["nn"], type: "base", testable: true },
];

// Dakuten / Handakuten
const VOICED = [
  { char: "ガ", romaji: "ga", type: "voiced", testable: true },
  { char: "ギ", romaji: "gi", type: "voiced", testable: true },
  { char: "グ", romaji: "gu", type: "voiced", testable: true },
  { char: "ゲ", romaji: "ge", type: "voiced", testable: true },
  { char: "ゴ", romaji: "go", type: "voiced", testable: true },

  { char: "ザ", romaji: "za", type: "voiced", testable: true },
  { char: "ジ", romaji: "ji", alt: ["zi"], type: "voiced", testable: true },
  { char: "ズ", romaji: "zu", type: "voiced", testable: true },
  { char: "ゼ", romaji: "ze", type: "voiced", testable: true },
  { char: "ゾ", romaji: "zo", type: "voiced", testable: true },

  { char: "ダ", romaji: "da", type: "voiced", testable: true },
  { char: "ヂ", romaji: "ji", alt: ["di"], type: "voiced", testable: true },
  { char: "ヅ", romaji: "zu", alt: ["du"], type: "voiced", testable: true },
  { char: "デ", romaji: "de", type: "voiced", testable: true },
  { char: "ド", romaji: "do", type: "voiced", testable: true },

  { char: "バ", romaji: "ba", type: "voiced", testable: true },
  { char: "ビ", romaji: "bi", type: "voiced", testable: true },
  { char: "ブ", romaji: "bu", type: "voiced", testable: true },
  { char: "ベ", romaji: "be", type: "voiced", testable: true },
  { char: "ボ", romaji: "bo", type: "voiced", testable: true },

  { char: "パ", romaji: "pa", type: "voiced", testable: true },
  { char: "ピ", romaji: "pi", type: "voiced", testable: true },
  { char: "プ", romaji: "pu", type: "voiced", testable: true },
  { char: "ペ", romaji: "pe", type: "voiced", testable: true },
  { char: "ポ", romaji: "po", type: "voiced", testable: true },
];

// Small + marks
const SMALL = [
  { char: "ァ", romaji: "a", type: "small", testable: false },
  { char: "ィ", romaji: "i", type: "small", testable: false },
  { char: "ゥ", romaji: "u", type: "small", testable: false },
  { char: "ェ", romaji: "e", type: "small", testable: false },
  { char: "ォ", romaji: "o", type: "small", testable: false },
  { char: "ャ", romaji: "ya", type: "small", testable: false },
  { char: "ュ", romaji: "yu", type: "small", testable: false },
  { char: "ョ", romaji: "yo", type: "small", testable: false },
  { char: "ヮ", romaji: "wa", type: "small", testable: false },
  { char: "ッ", romaji: "small tsu", type: "small", testable: false },
];

const MARKS = [{ char: "ー", romaji: "long vowel", type: "mark", testable: false }];

export const KATAKANA_ALL = [...BASE, ...VOICED, ...SMALL, ...MARKS];
export const KATAKANA_TESTABLE = KATAKANA_ALL.filter((x) => x.testable);
