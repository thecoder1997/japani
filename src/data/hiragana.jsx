
import React from "react";
const BASE = [
  { char: "あ", romaji: "a", type: "base", testable: true },
  { char: "い", romaji: "i", type: "base", testable: true },
  { char: "う", romaji: "u", type: "base", testable: true },
  { char: "え", romaji: "e", type: "base", testable: true },
  { char: "お", romaji: "o", type: "base", testable: true },

  { char: "か", romaji: "ka", type: "base", testable: true },
  { char: "き", romaji: "ki", type: "base", testable: true },
  { char: "く", romaji: "ku", type: "base", testable: true },
  { char: "け", romaji: "ke", type: "base", testable: true },
  { char: "こ", romaji: "ko", type: "base", testable: true },

  { char: "さ", romaji: "sa", type: "base", testable: true },
  { char: "し", romaji: "shi", alt: ["si"], type: "base", testable: true },
  { char: "す", romaji: "su", type: "base", testable: true },
  { char: "せ", romaji: "se", type: "base", testable: true },
  { char: "そ", romaji: "so", type: "base", testable: true },

  { char: "た", romaji: "ta", type: "base", testable: true },
  { char: "ち", romaji: "chi", alt: ["ti"], type: "base", testable: true },
  { char: "つ", romaji: "tsu", alt: ["tu"], type: "base", testable: true },
  { char: "て", romaji: "te", type: "base", testable: true },
  { char: "と", romaji: "to", type: "base", testable: true },

  { char: "な", romaji: "na", type: "base", testable: true },
  { char: "に", romaji: "ni", type: "base", testable: true },
  { char: "ぬ", romaji: "nu", type: "base", testable: true },
  { char: "ね", romaji: "ne", type: "base", testable: true },
  { char: "の", romaji: "no", type: "base", testable: true },

  { char: "は", romaji: "ha", type: "base", testable: true },
  { char: "ひ", romaji: "hi", type: "base", testable: true },
  { char: "ふ", romaji: "fu", alt: ["hu"], type: "base", testable: true },
  { char: "へ", romaji: "he", type: "base", testable: true },
  { char: "ほ", romaji: "ho", type: "base", testable: true },

  { char: "ま", romaji: "ma", type: "base", testable: true },
  { char: "み", romaji: "mi", type: "base", testable: true },
  { char: "む", romaji: "mu", type: "base", testable: true },
  { char: "め", romaji: "me", type: "base", testable: true },
  { char: "も", romaji: "mo", type: "base", testable: true },

  { char: "や", romaji: "ya", type: "base", testable: true },
  { char: "ゆ", romaji: "yu", type: "base", testable: true },
  { char: "よ", romaji: "yo", type: "base", testable: true },

  { char: "ら", romaji: "ra", type: "base", testable: true },
  { char: "り", romaji: "ri", type: "base", testable: true },
  { char: "る", romaji: "ru", type: "base", testable: true },
  { char: "れ", romaji: "re", type: "base", testable: true },
  { char: "ろ", romaji: "ro", type: "base", testable: true },

  { char: "わ", romaji: "wa", type: "base", testable: true },
  { char: "を", romaji: "wo", alt: ["o"], type: "base", testable: true },

  { char: "ん", romaji: "n", alt: ["nn"], type: "base", testable: true },
];

// Dakuten / Handakuten
const VOICED = [
  { char: "が", romaji: "ga", type: "voiced", testable: true },
  { char: "ぎ", romaji: "gi", type: "voiced", testable: true },
  { char: "ぐ", romaji: "gu", type: "voiced", testable: true },
  { char: "げ", romaji: "ge", type: "voiced", testable: true },
  { char: "ご", romaji: "go", type: "voiced", testable: true },

  { char: "ざ", romaji: "za", type: "voiced", testable: true },
  { char: "じ", romaji: "ji", alt: ["zi"], type: "voiced", testable: true },
  { char: "ず", romaji: "zu", type: "voiced", testable: true },
  { char: "ぜ", romaji: "ze", type: "voiced", testable: true },
  { char: "ぞ", romaji: "zo", type: "voiced", testable: true },

  { char: "だ", romaji: "da", type: "voiced", testable: true },
  { char: "ぢ", romaji: "ji", alt: ["di"], type: "voiced", testable: true },
  { char: "づ", romaji: "zu", alt: ["du"], type: "voiced", testable: true },
  { char: "で", romaji: "de", type: "voiced", testable: true },
  { char: "ど", romaji: "do", type: "voiced", testable: true },

  { char: "ば", romaji: "ba", type: "voiced", testable: true },
  { char: "び", romaji: "bi", type: "voiced", testable: true },
  { char: "ぶ", romaji: "bu", type: "voiced", testable: true },
  { char: "べ", romaji: "be", type: "voiced", testable: true },
  { char: "ぼ", romaji: "bo", type: "voiced", testable: true },

  { char: "ぱ", romaji: "pa", type: "voiced", testable: true },
  { char: "ぴ", romaji: "pi", type: "voiced", testable: true },
  { char: "ぷ", romaji: "pu", type: "voiced", testable: true },
  { char: "ぺ", romaji: "pe", type: "voiced", testable: true },
  { char: "ぽ", romaji: "po", type: "voiced", testable: true },
];

// Small kana (not testable)
const SMALL = [
  { char: "ぁ", romaji: "a", type: "small", testable: false },
  { char: "ぃ", romaji: "i", type: "small", testable: false },
  { char: "ぅ", romaji: "u", type: "small", testable: false },
  { char: "ぇ", romaji: "e", type: "small", testable: false },
  { char: "ぉ", romaji: "o", type: "small", testable: false },
  { char: "ゃ", romaji: "ya", type: "small", testable: false },
  { char: "ゅ", romaji: "yu", type: "small", testable: false },
  { char: "ょ", romaji: "yo", type: "small", testable: false },
  { char: "ゎ", romaji: "wa", type: "small", testable: false },
  { char: "っ", romaji: "small tsu", type: "small", testable: false },
];

export const HIRAGANA_ALL = [...BASE, ...VOICED, ...SMALL];
export const HIRAGANA_TESTABLE = HIRAGANA_ALL.filter((x) => x.testable);
