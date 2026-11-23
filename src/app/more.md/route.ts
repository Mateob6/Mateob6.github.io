import { recognitionMd, markdownResponse } from "@/lib/markdown";

// Plain-text copy of the page for AI agents (linked from the page's <link rel="alternate" type="text/markdown">)
export const dynamic = "force-static";

export async function GET() {
  return markdownResponse(recognitionMd("en"));
}
