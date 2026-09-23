export function paragraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function steps(text: string): string[] | null {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 2 || !lines.every((line) => /^\d+\.\s/.test(line))) return null;
  return lines.map((line) => line.replace(/^\d+\.\s/, ""));
}
