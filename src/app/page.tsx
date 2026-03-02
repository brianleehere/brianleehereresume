import Chat from "@/components/Chat";
import ProfilePicture from "@/components/ProfilePicture";
import FadeIn from "@/components/FadeIn";
import { User, Rocket, Briefcase, MessageCircle } from "lucide-react";

const EXPERIENCE = [
  {
    company: "AMI SOCIAL",
    role: "Co-Founder",
    period: "2026 - Present",
    location: "San Francisco, CA",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    description:
      "Building an LLM-powered social health app that helps people build deeper, more meaningful relationships through AI-driven insights and personalized connection strategies.",
    highlights: [],
  },
  {
    company: "Future Proof Homes",
    role: "AI / ML Advisor",
    period: "July 2024 - Present",
    location: "San Francisco, CA",
    badge: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    description:
      "Driving AI product strategy leveraging frontier models (Claude, Llama) through prototyping and customer validation. Accepted into NVIDIA's Inception program for top AI startups.",
    highlights: [
      "Advising 0-to-1 development for private AI assistant hardware",
      "Integrating local LLMs and open-source automation for privacy-first smart home experiences",
    ],
  },
  {
    company: "Chainlink Labs",
    role: "Product Operations Manager",
    period: "Sep 2022 - July 2024",
    location: "New York, NY",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    description:
      "Founding Product Operations leader driving cross-functional execution across 23+ teams.",
    highlights: [
      "Drove $63M ARR in Data Feeds with first-ever 100% SLA adherence",
      "Shipped 254+ features through quarterly planning frameworks",
      "Led 3 global 0-to-1 product launches generating $2.5M first-year revenue",
      "Accelerated product delivery by 27%, reduced cross-team blockers by 50%",
      "Scaled Product Operations team 3x",
    ],
  },
  {
    company: "Snap Inc.",
    role: "Technical Program Manager",
    period: "Apr 2015 - Sep 2022",
    location: "Los Angeles, CA",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    description:
      "First TPM at Snapchat. Promoted 6 times in 5 years across Product Analyst, Release Management, and TPM roles.",
    highlights: [
      "Enabled 107M DAU increase through 1,400+ A/B tests and 162+ product OKRs",
      "Saved $36M in infrastructure costs via cost-savings hackathon",
      "Managed AI/ML-powered A/B testing console, coaching 1,100+ employees",
      "Scaled systems infrastructure from 200 to 6,000+ employees",
      "Reduced experiment velocity friction by 34%",
    ],
  },
  {
    company: "YouTube",
    role: "Policy Operations Associate",
    period: "Oct 2014 - Mar 2015",
    location: "San Bruno, CA",
    badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    description:
      "Promoted to Privacy Point-of-Contact within three months. Created 6 global review tools impacting 67,000+ support tickets.",
    highlights: [],
  },
  {
    company: "Meta (Facebook)",
    role: "User Operations Specialist",
    period: "Oct 2013 - Oct 2014",
    location: "Menlo Park, CA",
    badge: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
    description:
      "Filed the most operational improvements from a 10-person team. Enforced trust and safety policy at scale for 1.28B+ users.",
    highlights: [],
  },
];

const STATS = [
  { value: "12+", label: "Years in Product & Ops" },
  { value: "6,000+", label: "Employees Scaled" },
  { value: "$63M", label: "ARR Driven" },
  { value: "254+", label: "Features Shipped" },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="px-6 pb-4 pt-20">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <ProfilePicture />
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-(--color-text) sm:text-6xl">
              Brian Lee
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="whitespace-nowrap text-xl leading-relaxed text-(--color-text-secondary)">
              Product leader building at the intersection of{" "}
              <span className="font-medium text-(--color-accent)">AI</span> and{" "}
              <span className="font-medium text-(--color-accent)">
                operations
              </span>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-4">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="rounded-2xl border border-(--color-border) bg-(--color-card) p-8">
              <div className="mb-5 flex items-center gap-2.5">
                <User size={18} className="text-(--color-accent)" />
                <h2 className="text-base font-medium tracking-widest uppercase text-(--color-text-secondary)">
                  About
                </h2>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-(--color-text-secondary)">
                <p>
                  12+ years in product and operations at{" "}
                  <span className="text-(--color-text)">Snap</span>,{" "}
                  <span className="text-(--color-text)">Meta</span>,{" "}
                  <span className="text-(--color-text)">YouTube</span>, and{" "}
                  <span className="text-(--color-text)">Chainlink Labs</span>.
                </p>
                <p>
                  Currently a 2x founder building{" "}
                  <span className="text-(--color-text)">AMI SOCIAL</span>, an
                  LLM-powered social health app, while advising AI startups
                  including those in NVIDIA&apos;s Inception program.
                </p>
                <p>
                  UC San Diego alum. Robert T. Matsui Fellow. Passionate about
                  AI, building culture & community, and shipping products that
                  matter.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map((stat, i) => (
                  <FadeIn key={stat.label} delay={i * 100}>
                    <div className="rounded-xl bg-(--color-bg-secondary) p-4 text-center">
                      <div className="text-2xl font-bold text-(--color-stat)">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs text-(--color-text-secondary)">
                        {stat.label}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Current Work */}
      <section className="px-6 py-5">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="rounded-2xl border border-(--color-border) bg-(--color-card) p-8">
              <div className="mb-5 flex items-center gap-2.5">
                <Rocket size={18} className="text-(--color-accent)" />
                <h2 className="text-base font-medium tracking-widest uppercase text-(--color-text-secondary)">
                  Current Work
                </h2>
              </div>
              <div className="space-y-6">
                <FadeIn delay={100}>
                  <div className="rounded-xl border border-(--color-border) bg-(--color-bg-secondary) p-5">
                    <div className="mb-1 flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-(--color-text)">
                        AMI SOCIAL
                      </h3>
                      <span className="rounded-full bg-(--color-accent)/10 px-3 py-0.5 text-xs font-medium text-(--color-accent)">
                        Co-Founder
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-(--color-text-secondary)">
                      Building an LLM-powered social health app that helps
                      people build deeper, more meaningful relationships through
                      AI-driven insights and personalized connection strategies.
                    </p>
                  </div>
                </FadeIn>
                <FadeIn delay={200}>
                  <div className="rounded-xl border border-(--color-border) bg-(--color-bg-secondary) p-5">
                    <div className="mb-1 flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-(--color-text)">
                        AI Startup Advisory
                      </h3>
                      <span className="rounded-full bg-(--color-accent)/10 px-3 py-0.5 text-xs font-medium text-(--color-accent)">
                        Advisor
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-(--color-text-secondary)">
                      Advising AI startups on product strategy, leveraging
                      frontier models like Claude and Llama. Working with
                      companies in NVIDIA&apos;s Inception program on 0-to-1
                      product development.
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experience */}
      <section className="px-6 py-5">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="rounded-2xl border border-(--color-border) bg-(--color-card) p-8">
              <div className="mb-5 flex items-center gap-2.5">
                <Briefcase size={18} className="text-(--color-accent)" />
                <h2 className="text-base font-medium tracking-widest uppercase text-(--color-text-secondary)">
                  Experience
                </h2>
              </div>
              <div className="space-y-8">
                {EXPERIENCE.map((exp, i) => (
                  <FadeIn key={exp.company + exp.role} delay={i * 80}>
                    <div>
                      <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-lg px-3 py-1 text-sm font-semibold ${exp.badge}`}
                          >
                            {exp.company}
                          </span>
                          <span className="text-sm text-(--color-text-secondary)">
                            {exp.role}
                          </span>
                        </div>
                        <span className="text-sm text-(--color-text-secondary)">
                          {exp.period}
                        </span>
                      </div>
                      <p className="mb-2 text-xs text-(--color-text-secondary)">
                        {exp.location}
                      </p>
                      <p className="text-sm leading-relaxed text-(--color-text-secondary)">
                        {exp.description}
                      </p>
                      {exp.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {exp.highlights.map((h, j) => (
                            <li
                              key={j}
                              className="text-sm leading-relaxed text-(--color-text-secondary)"
                            >
                              <span className="mr-2 text-(--color-accent)">
                                -
                              </span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Chat */}
      <section className="px-6 pt-5 pb-20">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <div className="rounded-2xl border border-(--color-border) bg-(--color-card) p-8">
              <div className="mb-2 flex items-center gap-2.5">
                <MessageCircle size={18} className="text-(--color-accent)" />
                <h2 className="text-base font-medium tracking-widest uppercase text-(--color-text-secondary)">
                  Ask Me Anything
                </h2>
              </div>
              <p className="mb-5 text-sm text-(--color-text-secondary)">
                Curious about my background? Chat with an AI that knows my
                resume.
              </p>
              <Chat />
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
