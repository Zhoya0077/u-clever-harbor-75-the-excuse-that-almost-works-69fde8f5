// The Excuse That Almost Works — one-line entry writer.
// Writes the excuse to $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output)
// and prints it to stdout.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry, the lift broke with me inside it and maintenance says I'm technically still at work";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);

// Self-checking gate: re-read what was written and verify it against the
// competition's gate (1-140 chars, one line, at most 20 words) before exiting.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the entry");
}
if (written.length < 1 || written.length > 140) {
  throw new Error(`entry is ${written.length} chars, outside the 1-140 gate`);
}
if (written.includes("\n")) {
  throw new Error("entry must be a single line");
}
const wordCount = written.trim().split(/\s+/).length;
if (wordCount > 20) {
  throw new Error(`entry is ${wordCount} words, over the 20-word limit`);
}
console.log(`gate ok: ${written.length} chars, ${wordCount} words, 1 line`);
