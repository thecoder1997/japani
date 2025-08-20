import React from "react";
import WriteTestCore from "./WriteTestCore";
import { HIRAGANA_TESTABLE } from "../data/hiragana";

export default function WriteHiragana() {
  return <WriteTestCore title="Write Hiragana" pool={HIRAGANA_TESTABLE} mode="page" scriptLabel="Hiragana" />;
}

