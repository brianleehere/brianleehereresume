import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const RESUME = `Brian Lee brianjunelee@gmail.com | (408) 205-2495 | linkedin.com/in/brianjunelee/
Product leader with 12+ years at Snap, Meta, YouTube, and Chainlink. Scaled Snap from 107M to 363M DAU while building infrastructure for hypergrowth (200→6,000 employees). Drove $63M ARR at Chainlink, shipping 254+ features across 23 teams. Currently building AI products and advising NVIDIA Inception startups.

WORK EXPERIENCE

AMI SOCIAL - Co-Founder (2026 - Present), San Francisco, CA
Building an LLM-powered social health app that helps people build deeper, more meaningful relationships through AI-driven insights and personalized connection strategies. 2x founder.

Future Proof Homes - AI / ML Advisor (July 2024 - Present), San Francisco, CA
Drive AI product strategy leveraging frontier models (Claude, Llama) through prototyping (Lovable, Replit) and customer validation; accepted into NVIDIA's Inception program for top AI startups. Advise 0-to-1 development for private AI assistant hardware, integrating local LLMs and open-source automation to deliver privacy-first smart home experiences.

Chainlink Labs - Product Operations Manager (Sep 2022 - July 2024), New York, NY
Drove $63M ARR in Data Feeds by directing CI/CD pipeline implementations, achieving first-ever 100% SLA adherence. Created operating systems and quarterly planning frameworks across 23+ cross-functional teams, shipping 254+ features. Led 3 global 0-to-1 product launches generating $2.5M in first-year revenue. Accelerated product delivery by 27% and reduced cross-team blockers by 50%. Built product operations infrastructure integrating JIRA, Salesforce, and BigQuery. Scaled Product Operations team 3x.

Snap Inc. - Technical Program Manager (Apr 2017 - Sep 2022), Los Angeles, CA
First TPM at Snapchat; promoted 6 times in 5 years. Enabled 107M DAU increase through 1,400+ A/B tests and 162+ product OKRs. Saved $36M in infrastructure costs via hackathon. Managed AI/ML-powered A/B testing console coaching 1,100+ employees. Scaled systems from 200 to 6,000+ employees. Reduced experiment velocity friction by 34%.

Earlier at Snap: Release Management Engineer (Jul 2016 - May 2017) managing bi-weekly releases for 500+ features. Product Analyst (Apr 2015 - Jul 2016) leading redesign of support.snapchat.com (1M+ daily visitors), reducing escalations by 96%.

YouTube - Policy Operations Associate (Oct 2014 - Mar 2015), San Bruno, CA
Promoted to Privacy Point-of-Contact within three months. Created 6 global review tools impacting 67,000+ support tickets.

Facebook (Meta) - User Operations Specialist (Oct 2013 - Oct 2014), Menlo Park, CA
Filed the most operational improvements from a 10-person team. Enforced trust and safety policy for 1.28B+ users.

EDUCATION
University of California - San Diego, BA Political Science - International Relations
Robert T. Matsui Fellowship, Order of Omega Honor Society, President's Volunteer Service Award

SKILLS
Agile, Scrum, A/B Experimentation, JIRA (Architecture, JQL, configurations, scripting), SQL, Sketch, Figma, CSS, HTML, Adobe Illustrator, Photoshop, Git, Google Analytics

INTERESTS
AI, Blockchain products, Tech policy, E-commerce, building culture & community`;

const SYSTEM_PROMPT = `You are a helpful assistant that answers questions about Brian Lee's professional background. Be concise, warm, and specific. Only answer based on the provided resume context. If asked something not covered in the resume, politely say you can only speak to what's in Brian's professional background.

Here is Brian's resume:

${RESUME}`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === "your-api-key-here") {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const client = new Anthropic({ apiKey });

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
