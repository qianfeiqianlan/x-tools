/**
 * JSON 格式化 - 输入区 + 操作区 + 结果区；格式化/压缩/校验；结果区格式化视图/压缩视图；精准错误提示；复制/下载
 */
import { useJsonFormatStore } from "../store";
import { Button } from "@/components/Button";
import { CopyButton } from "@/components/CopyButton";
import type { JsonError } from "../types";

function tryParseJson(str: string): { data: unknown; error: JsonError } {
  if (!str.trim()) return { data: null, error: null };
  try {
    const data = JSON.parse(str);
    return { data, error: null };
  } catch (e) {
    const err = e as Error;
    const match = err.message.match(/position (\d+)/i) || err.message.match(/at line (\d+)/i);
    const line = match ? parseInt(match[1], 10) : undefined;
    return {
      data: null,
      error: { message: err.message, line },
    };
  }
}

function formatJson(obj: unknown): string {
  return JSON.stringify(obj, null, 2);
}

function compressJson(obj: unknown): string {
  return JSON.stringify(obj);
}

export function JsonFormatPage() {
  const {
    input,
    setInput,
    output,
    setOutput,
    viewMode,
    setViewMode,
    error,
    setError,
  } = useJsonFormatStore();

  function handleFormat() {
    const { data, error: e } = tryParseJson(input);
    setError(e);
    if (data !== null) {
      setOutput(formatJson(data));
    }
  }

  function handleCompress() {
    const { data, error: e } = tryParseJson(input);
    setError(e);
    if (data !== null) {
      setOutput(compressJson(data));
    }
  }

  function handleValidate() {
    const { error: e } = tryParseJson(input);
    setError(e);
    if (!e) setOutput("校验通过，JSON 格式正确。");
    else setOutput("");
  }

  function handleDownload() {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  let displayOutput = output;
  if (output && (output.startsWith("{") || output.startsWith("["))) {
    try {
      const parsed = JSON.parse(output);
      displayOutput = viewMode === "compressed" ? compressJson(parsed) : formatJson(parsed);
    } catch {
      displayOutput = output;
    }
  }

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <h2 className="mb-4 text-lg font-bold text-[var(--text)]">JSON 格式化</h2>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Button variant="primary" onClick={handleFormat}>
          格式化
        </Button>
        <Button variant="secondary" onClick={handleCompress}>
          压缩
        </Button>
        <Button variant="secondary" onClick={handleValidate}>
          校验
        </Button>
        {output && (
          <>
            <span className="text-sm text-[var(--text-secondary)]">结果：</span>
            <button
              type="button"
              onClick={() => setViewMode("formatted")}
              className={`rounded px-3 py-1.5 text-sm ${
                viewMode === "formatted"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--border)] text-[var(--text)]"
              }`}
            >
              格式化视图
            </button>
            <button
              type="button"
              onClick={() => setViewMode("compressed")}
              className={`rounded px-3 py-1.5 text-sm ${
                viewMode === "compressed"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--border)] text-[var(--text)]"
              }`}
            >
              压缩视图
            </button>
            <CopyButton text={displayOutput} />
            <Button variant="secondary" onClick={handleDownload}>
              下载 JSON
            </Button>
          </>
        )}
      </div>
      {error && (
        <p className="mb-2 text-sm text-[var(--error)]" role="alert">
          {error.line != null ? `第 ${error.line} 行附近：` : ""}
          {error.message}
        </p>
      )}
      <div className="grid flex-1 gap-4 md:grid-cols-1">
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-[var(--text-secondary)]">输入</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="粘贴或输入 JSON"
            className="min-h-[160px] flex-1 rounded border border-[var(--border)] bg-[var(--input-bg)] p-3 font-mono-code text-[var(--text)] placeholder-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col">
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm text-[var(--text-secondary)]">结果</label>
            {displayOutput && <CopyButton text={displayOutput} />}
          </div>
          <textarea
            readOnly
            value={displayOutput}
            placeholder="格式化或压缩后的结果"
            className="min-h-[160px] flex-1 rounded border border-[var(--border)] bg-[var(--input-bg)] p-3 font-mono-code text-[var(--text)] placeholder-[var(--text-secondary)]"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
