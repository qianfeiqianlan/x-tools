/**
 * 在线文本对比 - 双输入区 + 结果区；差异高亮（新增绿、删除红、相同灰）；即时对比；清空/交换/复制
 */
import { useMemo } from "react";
import { useTextDiffStore } from "../store";
import { computeDiff } from "../lib/diff";
import { Button } from "@/components/Button";
import { CopyButton } from "@/components/CopyButton";

function diffToText(lines: { type: string; text: string }[]): string {
  return lines.map((l) => (l.type === "add" ? "+ " : l.type === "remove" ? "- " : "  ") + l.text).join("\n");
}

export function TextDiffPage() {
  const { textA, setTextA, textB, setTextB } = useTextDiffStore();

  const diffResult = useMemo(() => computeDiff(textA, textB), [textA, textB]);

  function handleClearA() {
    setTextA("");
  }
  function handleClearB() {
    setTextB("");
  }
  function handleSwap() {
    setTextA(textB);
    setTextB(textA);
  }

  const displayLines = diffResult;
  const copyText = diffToText(displayLines);

  return (
    <div className="flex h-full flex-col p-4 md:p-6">
      <h2 className="mb-4 text-lg font-bold text-[var(--text)]">在线文本对比</h2>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Button variant="secondary" onClick={handleClearA}>
          清空 A
        </Button>
        <Button variant="secondary" onClick={handleClearB}>
          清空 B
        </Button>
        <Button variant="secondary" onClick={handleSwap}>
          交换 A/B
        </Button>
        {(displayLines.length > 0) && <CopyButton text={copyText} label="复制差异" />}
      </div>
      <div className="grid flex-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-[var(--text-secondary)]">文本 A</label>
          <textarea
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            placeholder="粘贴或输入文本 A"
            className="min-h-[160px] flex-1 rounded border border-[var(--border)] bg-[var(--input-bg)] p-3 font-mono-code text-[var(--text)] placeholder-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none"
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-[var(--text-secondary)]">文本 B</label>
          <textarea
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            placeholder="粘贴或输入文本 B"
            className="min-h-[160px] flex-1 rounded border border-[var(--border)] bg-[var(--input-bg)] p-3 font-mono-code text-[var(--text)] placeholder-[var(--text-secondary)] focus:border-[var(--accent)] focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
      {(displayLines.length > 0) && (
        <div className="mt-4 flex flex-col">
          <div className="mb-1 flex items-center justify-between">
            <label className="text-sm text-[var(--text-secondary)]">差异结果</label>
            <CopyButton text={copyText} label="复制" />
          </div>
          <pre className="min-h-[120px] overflow-auto rounded border border-[var(--border)] bg-[var(--input-bg)] p-3 font-mono-code text-sm">
            {displayLines.map((line, i) => (
              <div
                key={i}
                className={`border-l-2 pl-2 ${
                  line.type === "add"
                    ? "border-[var(--success)] bg-green-500/10 dark:bg-green-500/20"
                    : line.type === "remove"
                    ? "border-[var(--error)] bg-red-500/10 dark:bg-red-500/20"
                    : "border-transparent text-[var(--text-secondary)]"
                }`}
              >
                <span className="select-none text-[var(--text-secondary)]">
                  {line.type === "add" ? "+ " : line.type === "remove" ? "- " : "  "}
                  {line.lineA != null ? `${line.lineA} ` : ""}
                  {line.lineB != null && line.type !== "remove" ? `${line.lineB} ` : ""}
                </span>
                {line.text || " "}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
