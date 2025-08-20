import React from "react";
import WriteTestCore from "./WriteTestCore";
import { KATAKANA_TESTABLE } from "../data/katakana";

export default function WriteKatakana() {
  return <WriteTestCore title="Write Katakana" pool={KATAKANA_TESTABLE} mode="page" scriptLabel="Katakana" />;
}

