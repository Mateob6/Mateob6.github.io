import { llmsTxt, markdownResponse } from "@/lib/markdown";

// /llms.txt — index of the site for AI agents (llmstxt.org)
export const dynamic = "force-static";

export async function GET() {
  return markdownResponse(await llmsTxt(), "text/plain");
}
