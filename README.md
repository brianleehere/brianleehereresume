# brianleehere.com

A personal portfolio site with an AI-powered chatbot, built end-to-end with [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and the [Anthropic API](https://docs.anthropic.com/en/docs/api-reference).

**Live site:** [brianleehere.com](https://brianleehere.com)

---

## What This Is

A clean, responsive personal site with one differentiating feature: a conversational AI chatbot at the bottom of the page that answers questions about my professional background in real time. Visitors can ask things like *"What did Brian do at Snap?"* or *"Tell me about AMI SOCIAL"* and get specific, context-aware responses powered by Claude.

The entire project — frontend, API integration, deployment — was built in a single afternoon using Claude Code from the terminal.

---

## How It Works

**Frontend:** Next.js (App Router) + Tailwind CSS. Dark/light mode, scroll animations, fully responsive. Sections for About, Experience, Current Work, and the chatbot.

**Chatbot Backend:** An API route at `/api/chat` sends visitor messages to Claude Sonnet 4.5 via the Anthropic API. My resume is injected as system prompt context, scoping responses to my actual background. Responses stream in real time.

**Infrastructure:** Deployed on Vercel with a custom domain via Namecheap DNS. Environment variables handle API key management securely — nothing sensitive touches the repo.

---

## The Build Process

This wasn't a drag-and-drop site builder project. The entire workflow ran through the terminal:

1. **Scaffolded** a Next.js project via Claude Code with a single natural-language prompt
2. **Iterated** on design, layout, and content through conversational commands — describing changes in plain English, reviewing in the browser, refining
3. **Integrated** the Anthropic API with streaming response handling
4. **Debugged** authentication, environment variables, and deployment configuration in real time
5. **Deployed** to Vercel, connected GitHub for version control, and configured DNS for the custom domain

Total time from empty directory to live production site: **~3 hours**.

---

## Product Observations From the Build

Building with Claude Code gave me firsthand perspective on the developer experience. A few things I noticed:

**What works well:**
- The human-in-the-loop permission model builds trust — you see every command before it runs and can course-correct in real time
- The iteration loop (describe → build → preview → refine) felt fast and intuitive
- API integration was smooth — streaming responses worked out of the box with minimal configuration

**Where there's room to improve:**
- Interactive terminal commands (like `gh auth login`) can't run through Claude Code, forcing you into a separate terminal window. This breaks flow, especially for less technical users
- Claude Code doesn't adapt to the user's experience level. A first-time builder and a senior engineer get the same explanations. Adaptive onboarding — even a simple "how technical are you?" at the start — would make the tool more accessible
- There's no prompt to set API spending limits during setup. As Claude Code reaches less technical users, a guardrail nudge ("want to set a cost cap?") would prevent accidental overages

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| AI | Anthropic API (Claude Sonnet 4.5) |
| Hosting | Vercel |
| Domain | Namecheap |
| Builder | Claude Code |

---

## About Me

**Brian Lee** — Product leader with 12+ years at Snap, Meta, YouTube, and Chainlink Labs. Currently a 2x founder building [AMI SOCIAL](https://brianleehere.com), an LLM-powered social health app, while advising AI startups. I build at the intersection of AI, product operations, and scalable systems.

---

## Run It Locally

```bash
git clone https://github.com/brianleehere/brianleehereresume.git
cd brianleehereresume
npm install
```

Create a `.env.local` file:

```
ANTHROPIC_API_KEY=your_key_here
```

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000).

---

*Built with Claude Code. Powered by the Anthropic API.*
