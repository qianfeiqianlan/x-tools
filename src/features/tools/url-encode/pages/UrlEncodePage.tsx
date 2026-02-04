/**
 * URL 编解码 - 输入区 + 操作区 + 结果区；Encode/Decode 切换，输入即自动处理，一键复制、清空、交换
 */
import { useCallback, useEffect } from "react";
import { useUrlEncodeStore } from "../store";
import { Button } from "@/components/Button";
import { CopyButton } from "@/components/CopyButton";

function encodeUrl(s: string): string {
  try {
    return encodeURIComponent(s);
  } catch {
    return s;
  }
}

function decodeUrl(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export function UrlEncodePage() {
  const { mode, setMode, input, setInput, result, setResult } = useUrlEncodeStore();

  const transform = useCallback(() => {
    if (mode === "encode") setResult(encodeUrl(input));
    else setResult(decodeUrl(input));
  }, [mode, input, setResult]);

  useEffect(() => {
    transform();
  }, [transform]);

  function handleClear() {
    setInput("");
    setResult("");
  }

  function handleSwap() {
    setInput(result);
    setResult(input);
  }

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <h2 className="mb-4 text-lg font-bold text-[var(--text)]">URL 编解码</h2>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-sm text-[var(--text-secondary)]">模式：</span>
        <button
          type="button"
          onClick={() => setMode("encode")}
          className={`rounded px-3 py-1.5 text-sm ${
            mode === "encode"
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--border)] text-[var(--text)] hover:opacity-90"
          }`}
        >
          Encode
        </button>
        <button
          type="button"
          onClick={() => setMode("decode")}
          className={`rounded px-3 py-1.5 text-sm ${
            mode === "decode"
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--border)] text-[var(--text)] hover:opacity-90"
          }`}
        >
          Decode
        </button>
        <Button variant="secondary" onClick={handleClear} className="ml-2">
          清空
        </Button>
        <Button variant="secondary" onClick={handleSwap}>
          交换
        </Button>
      </div>
      <div className="grid flex-1 gap-4 md:grid-cols-2 md:grid-rows-1">
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-[var(--text-secondary)]">输入</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入或粘贴待编码/解码的文本"
            className="min-h-[120px] flex-1 rounded border border-[var(--border)] bg-[var(--input-bg)] p-3 font-mono-code text-[var(--text)] placeholder-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col">
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm text-[var(--text-secondary)]">结果</label>
            <CopyButton text={result} disabled={!result} />
          </div>
          <textarea
            readOnly
            value={result}
            placeholder="结果将在此显示"
            className="min-h-[120px] flex-1 rounded border border-[var(--border)] bg-[var(--input-bg)] p-3 font-mono-code text-[var(--text)] placeholder-[var(--text-secondary)]"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
