// Vercel serverless function — turns a free-form voice/text trip request into
// structured JSON via the Claude API. Requires ANTHROPIC_API_KEY to be set as
// a Vercel project environment variable (dashboard, or `vercel env add`).
// Without it, this endpoint returns 501 and the client falls back to a local
// rule-based parser (see itinerary.js's itinLocalParse) — the feature still
// works, just less flexibly, with zero setup.
import Anthropic from "@anthropic-ai/sdk";

const EXTRACT_TRIP_TOOL = {
  name: "extract_trip",
  description: "Record the structured trip constraints extracted from a wine-country visitor's request.",
  input_schema: {
    type: "object",
    properties: {
      date: { type: "string", description: "ISO date YYYY-MM-DD the trip is for. Resolve relative phrases ('this Saturday', 'tomorrow', 'next Friday') against today's date." },
      startTime: { type: "string", description: "24h HH:MM the visitor wants to start. Default '10:00' if unspecified." },
      endTime: { type: "string", description: "24h HH:MM the visitor wants to be done by. Default '17:00' if unspecified." },
      valley: { type: "string", enum: ["Napa", "Sonoma", "Both"], description: "Which valley, or 'Both' if unspecified or the visitor wants either." },
      numStops: { type: "integer", minimum: 1, maximum: 6, description: "How many wineries to visit. Default 3 if unspecified." },
      dogs: { type: "boolean", description: "true only if the visitor mentions bringing a dog/dogs/puppy along." },
      kids: { type: "boolean", description: "true only if the visitor mentions bringing kids, a baby, toddler, or infant along." },
      partySize: { type: "integer", minimum: 1, maximum: 20, description: "Number of people in the group. Default 2 if unspecified." },
      mustInclude: {
        type: "array", items: { type: "string" },
        description: "kebab-case best-guess slugs (e.g. 'opus-one') for any wineries the visitor explicitly named. Never invent wineries the visitor didn't mention.",
      },
      exclude: { type: "array", items: { type: "string" }, description: "kebab-case slugs for any wineries the visitor explicitly wants to avoid." },
      budgetPerPerson: { type: "number", description: "A per-person dollar budget for tasting fees if the visitor mentioned one, else omit." },
      startLocation: { type: "string", description: "A named Napa/Sonoma town the visitor said they're starting from or staying in, else omit." },
      notes: { type: "string", description: "Any other relevant preference in one short sentence, else empty string." },
    },
    required: ["date", "startTime", "endTime", "valley", "numStops", "dogs", "kids", "partySize", "mustInclude", "exclude", "notes"],
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" });
    return;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(501).json({ error: "ANTHROPIC_API_KEY is not configured on this deployment" });
    return;
  }
  const { prompt, today } = req.body || {};
  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    res.status(400).json({ error: "prompt (string) is required" });
    return;
  }

  const todayStr = typeof today === "string" && /^\d{4}-\d{2}-\d{2}$/.test(today) ? today : new Date().toISOString().slice(0, 10);

  try {
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: `You convert a wine-country visitor's spoken or typed trip request into structured trip constraints by calling the extract_trip tool exactly once. Today's date is ${todayStr}. Use the tool's field descriptions and defaults for anything the visitor didn't specify.`,
      tools: [EXTRACT_TRIP_TOOL],
      tool_choice: { type: "tool", name: "extract_trip" },
      messages: [{ role: "user", content: prompt.slice(0, 2000) }],
    });

    const toolUse = message.content.find((b) => b.type === "tool_use");
    if (!toolUse) {
      res.status(502).json({ error: "model did not return structured output" });
      return;
    }
    res.status(200).json(toolUse.input);
  } catch (err) {
    console.error("[parse-itinerary]", err);
    res.status(502).json({ error: "LLM request failed" });
  }
}
