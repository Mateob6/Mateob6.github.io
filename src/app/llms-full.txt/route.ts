import { llmsFullTxt, markdownResponse } from "@/lib/markdown";

// /llms-full.txt — the whole site (English) in one plain-text file
export const dynamic = "force-static";

export async function GET() {
  return markdownResponse(await llmsFullTxt(), "text/plain");
}
