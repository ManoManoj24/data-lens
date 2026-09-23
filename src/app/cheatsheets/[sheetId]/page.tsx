import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheatsheetBody } from "@/components/CheatsheetSheets";
import { cheatsheets } from "@/data/cheatsheets";

export function generateStaticParams() {
  return cheatsheets.map((sheet) => ({ sheetId: sheet.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ sheetId: string }> }): Promise<Metadata> {
  const { sheetId } = await params;
  const sheet = cheatsheets.find((item) => item.id === sheetId);
  return { title: sheet ? `${sheet.title} cheatsheet` : "Cheatsheet" };
}

export default async function CheatsheetPage({ params }: { params: Promise<{ sheetId: string }> }) {
  const { sheetId } = await params;
  if (!cheatsheets.some((sheet) => sheet.id === sheetId)) notFound();
  return <CheatsheetBody id={sheetId} />;
}
