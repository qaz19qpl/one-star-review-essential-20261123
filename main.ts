// One-Star Review of Something Essential
// make.fun bounty u-0xb3e689-one-star-review-of-something-essential-c7234629
//
// Writes a single-line, deadpan one-star review of gravity (an everyday
// essential) to /output/entry.txt. Deterministic: no network, no clock,
// no randomness. The review is a fixed string, so every run produces
// byte-identical output.

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const REVIEW =
  "Gravity holds the entire planet together and still cannot keep my phone from landing face-down on concrete.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

function main(): void {
  // The gate requires 1-160 characters, a single line, not only whitespace.
  if (REVIEW.length < 1 || REVIEW.length > 160) {
    throw new Error(`review is ${REVIEW.length} characters, must be 1-160`);
  }
  if (REVIEW.includes("\n") || REVIEW.trim().length === 0) {
    throw new Error("review must be a single non-blank line");
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: the gate counts every character in the file.
  writeFileSync(OUTPUT_PATH, REVIEW, "utf8");
  // Files under /output must be world-readable: the grader collects them
  // as a different user.
  chmodSync(OUTPUT_PATH, 0o644);

  // Verify what was actually written before reporting success.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== REVIEW) {
    throw new Error("verification failed: /output/entry.txt differs from the review");
  }

  console.log(`Wrote ${REVIEW.length}-character review to ${OUTPUT_PATH}`);
}

main();
