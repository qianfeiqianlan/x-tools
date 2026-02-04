/**
 * 按行 diff：LCS 思想，输出 add/remove/same，带行号
 */
import type { DiffLine } from "../types";

function lcsLines(a: string[], b: string[]): number[][] {
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array(n + 1)
    .fill(0)
    .map(() => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp;
}

function backtrack(
  a: string[],
  b: string[],
  dp: number[][],
  i: number,
  j: number
): DiffLine[] {
  if (i === 0 && j === 0) return [];
  if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
    return [
      ...backtrack(a, b, dp, i - 1, j - 1),
      { type: "same" as const, text: a[i - 1], lineA: i, lineB: j },
    ];
  }
  if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
    return [
      ...backtrack(a, b, dp, i, j - 1),
      { type: "add" as const, text: b[j - 1], lineB: j },
    ];
  }
  if (i > 0) {
    return [
      ...backtrack(a, b, dp, i - 1, j),
      { type: "remove" as const, text: a[i - 1], lineA: i },
    ];
  }
  return [];
}

export function computeDiff(textA: string, textB: string): DiffLine[] {
  const linesA = textA.split("\n");
  const linesB = textB.split("\n");
  const dp = lcsLines(linesA, linesB);
  return backtrack(linesA, linesB, dp, linesA.length, linesB.length);
}
