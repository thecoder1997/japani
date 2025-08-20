import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function useCanvasDrawing({ width = 320, height = 320, lineWidth = 14 }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]); // Array of stroke arrays: [{x,y}[]]
  const [currentStroke, setCurrentStroke] = useState([]);

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    redraw();
  }, [width, height]);

  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#111827"; // slate-900
    ctx.lineWidth = lineWidth;

    strokes.forEach((stroke) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });

    if (currentStroke.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
      for (let i = 1; i < currentStroke.length; i++) {
        ctx.lineTo(currentStroke[i].x, currentStroke[i].y);
      }
      ctx.stroke();
    }
    ctx.restore();
  };

  useEffect(() => {
    redraw();
  }, [strokes, currentStroke]);

  const pointerPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX ?? (e.touches && e.touches[0]?.clientX)) - rect.left;
    const y = (e.clientY ?? (e.touches && e.touches[0]?.clientY)) - rect.top;
    return { x, y };
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    const { x, y } = pointerPos(e);
    setIsDrawing(true);
    setCurrentStroke([{ x, y }]);
  };

  const onPointerMove = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = pointerPos(e);
    setCurrentStroke((s) => [...s, { x, y }]);
  };

  const endStroke = () => {
    if (currentStroke.length > 0) {
      setStrokes((all) => [...all, currentStroke]);
      setCurrentStroke([]);
    }
    setIsDrawing(false);
  };

  const clear = () => {
    setStrokes([]);
    setCurrentStroke([]);
  };

  const undo = () => {
    setStrokes((all) => all.slice(0, -1));
  };

  const getCanvasElement = () => canvasRef.current;

  return {
    canvasRef,
    onPointerDown,
    onPointerMove,
    onPointerUp: endStroke,
    onPointerLeave: endStroke,
    clear,
    undo,
    getCanvasElement,
    redraw,
  };
}

function computeIoUSimilarity(userCanvas, targetChar, options = {}) {
  const size = options.size || 128;
  const threshold = options.threshold || 0.15;

  // Create offscreen canvases
  const make = () => {
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    return c;
  };
  const a = make();
  const b = make();

  // Draw user image scaled to size
  const ctxA = a.getContext("2d");
  ctxA.fillStyle = "#ffffff";
  ctxA.fillRect(0, 0, size, size);
  ctxA.drawImage(userCanvas, 0, 0, size, size);

  // Draw target glyph centered
  const ctxB = b.getContext("2d");
  ctxB.fillStyle = "#ffffff";
  ctxB.fillRect(0, 0, size, size);
  ctxB.fillStyle = "#000000";
  ctxB.textAlign = "center";
  ctxB.textBaseline = "middle";
  ctxB.font = `${Math.floor(size * 0.78)}px system-ui, -apple-system, Segoe UI, Roboto, Noto Sans JP, Meiryo, Helvetica, Arial, sans-serif`;
  ctxB.fillText(targetChar, size / 2, size / 2);

  const imgA = ctxA.getImageData(0, 0, size, size).data;
  const imgB = ctxB.getImageData(0, 0, size, size).data;

  let intersection = 0;
  let union = 0;
  for (let i = 0; i < imgA.length; i += 4) {
    const aOn = imgA[i + 3] > 20 && (imgA[i] < 200 || imgA[i + 1] < 200 || imgA[i + 2] < 200);
    const bOn = imgB[i + 3] > 20 && (imgB[i] < 200 || imgB[i + 1] < 200 || imgB[i + 2] < 200);
    if (aOn && bOn) intersection++;
    if (aOn || bOn) union++;
  }
  const iou = union === 0 ? 0 : intersection / union;
  return { ok: iou >= threshold, iou };
}

export default function WriteTestCore({
  title,
  pool,
  mode = "page", // "page" | "modal"
  onClose,
  scriptLabel = "Hiragana",
}) {
  const list = useMemo(() => pool, [pool]);
  const [current, setCurrent] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null); // { ok, iou }
  const [showHint, setShowHint] = useState(false);
  const [autoCheck, setAutoCheck] = useState(true);
  const [lineWidth, setLineWidth] = useState(14);

  const pick = () => list[Math.floor(Math.random() * list.length)];

  useEffect(() => {
    if (!current && list.length > 0) setCurrent(pick());
  }, [list]);

  const drawing = useCanvasDrawing({ width: 320, height: 320, lineWidth });

  if (!current) return null;

  const progressPct = attempts === 0 ? 0 : Math.min(100, Math.round((score / attempts) * 100));

  const submit = () => {
    const canvasEl = drawing.getCanvasElement();
    let ok = false;
    let iou = 0;
    if (autoCheck) {
      const res = computeIoUSimilarity(canvasEl, current.char, { size: 128, threshold: 0.18 });
      ok = res.ok;
      iou = res.iou;
    }
    setAttempts((a) => a + 1);
    setFeedback({ ok, iou });
  };

  const next = (forceCorrect = false) => {
    if (forceCorrect || (feedback && feedback.ok)) {
      setScore((s) => s + 1);
    }
    setFeedback(null);
    setShowHint(false);
    drawing.clear();
    setCurrent(pick());
  };

  const content = (
    <div className="w-full">
      <div className="mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <div>Accuracy: <span className="font-medium text-gray-800">{progressPct}%</span></div>
          <div>Score: <span className="font-medium text-gray-800">{score}</span> / {attempts}</div>
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold mb-2">{title}</h2>
      <div className="text-gray-600 mb-3">Write the {scriptLabel} for: <span className="font-semibold text-gray-900">{current.romaji}</span></div>

      <div className="flex flex-col items-center gap-3">
        <div className="relative select-none">
          <canvas
            ref={drawing.canvasRef}
            onPointerDown={drawing.onPointerDown}
            onPointerMove={drawing.onPointerMove}
            onPointerUp={drawing.onPointerUp}
            onPointerLeave={drawing.onPointerLeave}
            className="rounded-lg border border-gray-300 bg-white touch-none"
          />
          {showHint && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-8xl text-gray-300/60">
              {current.char}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button onClick={drawing.undo} className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Undo</button>
          <button onClick={drawing.clear} className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Clear</button>
          <button onClick={() => setShowHint((v) => !v)} className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-slate-200 hover:bg-slate-50">{showHint ? "Hide hint" : "Show outline"}</button>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 ml-2">
            <span>Pen</span>
            <input type="range" min="6" max="24" step="2" value={lineWidth} onChange={(e) => setLineWidth(parseInt(e.target.value))} />
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 ml-2">
            <input type="checkbox" checked={autoCheck} onChange={(e) => setAutoCheck(e.target.checked)} />
            <span>Auto-check (beta)</span>
          </label>
        </div>

        {!feedback && (
          <button onClick={submit} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded">Submit</button>
        )}

        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="w-full sm:w-auto">
              {autoCheck ? (
                <div className={`rounded-lg border p-3 ${feedback.ok ? "border-green-400 bg-green-50" : "border-amber-400 bg-amber-50"}`}>
                  <div className="font-semibold">{feedback.ok ? "✅ Looks good!" : "⚠️ Not a close match"}</div>
                  <div className="text-sm text-gray-700">Similarity (IoU): {(feedback.iou * 100).toFixed(0)}%</div>
                  {!feedback.ok && (
                    <div className="mt-2 text-sm text-gray-600">Tip: Try centering your character and using the outline hint.</div>
                  )}
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => next(true)} className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500">Mark Correct</button>
                    <button onClick={() => next(false)} className="inline-flex items-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700">Next</button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border p-3 bg-slate-50">
                  <div className="text-sm text-gray-700">Self-check enabled. Compare with the answer and choose:</div>
                  <div className="mt-2 text-6xl font-bold text-center">{current.char}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => next(true)} className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500">I got it</button>
                    <button onClick={() => next(false)} className="inline-flex items-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700">Next</button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (mode === "modal") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-semibold">{title}</div>
            <button onClick={onClose} className="rounded-md px-2 py-1 text-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Close</button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-6">
      {content}
    </div>
  );
}

