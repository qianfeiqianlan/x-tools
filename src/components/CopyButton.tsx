/**
 * 一键复制按钮 - 复制后微提示约 1 秒
 */
import { useState } from "react";
import { Button } from "./Button";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
  disabled?: boolean;
};

export function CopyButton({ text, label = "复制", className = "", disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text || disabled) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant="primary"
        onClick={handleCopy}
        disabled={disabled}
        className={className}
      >
        {copied ? "已复制" : label}
      </Button>
      {copied && (
        <span
          className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white dark:bg-slate-200 dark:text-slate-900"
          role="status"
        >
          复制成功
        </span>
      )}
    </div>
  );
}
