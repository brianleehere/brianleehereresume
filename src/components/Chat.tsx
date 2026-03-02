"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "What's Brian's experience with AI?",
  "Tell me about AMI SOCIAL",
  "What did Brian do at Snap?",
  "How has Brian scaled teams?",
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMessage: Message = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMessage];
      setMessages([...newMessages, { role: "assistant", content: "" }]);
      setInput("");
      setIsStreaming(true);

      abortRef.current = new AbortController();

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) throw new Error("Failed to send message");
        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Process complete SSE lines from the buffer
          const parts = buffer.split("\n");
          // Keep the last part as it may be incomplete
          buffer = parts.pop() || "";

          for (const line of parts) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;

            const payload = trimmed.slice(6);
            if (payload === "[DONE]") continue;

            try {
              const parsed = JSON.parse(payload);
              if (parsed.text) {
                fullText += parsed.text;
                const snapshot = fullText;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: snapshot,
                  };
                  return updated;
                });
              }
            } catch {
              // partial JSON, will be handled in next chunk
            }
          }
        }

        // Process any remaining buffer
        if (buffer.trim().startsWith("data: ")) {
          const payload = buffer.trim().slice(6);
          if (payload !== "[DONE]") {
            try {
              const parsed = JSON.parse(payload);
              if (parsed.text) {
                fullText += parsed.text;
                const snapshot = fullText;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: snapshot,
                  };
                  return updated;
                });
              }
            } catch {
              // ignore
            }
          }
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
          };
          return updated;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming]
  );

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-card)">
        {/* Messages area */}
        <div className="h-[400px] overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <p className="text-sm text-(--color-text-secondary)">
                Ask me anything about Brian&apos;s background
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {STARTERS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-full border border-(--color-border) px-4 py-2 text-sm text-(--color-text-secondary) transition-colors hover:border-(--color-accent) hover:text-(--color-accent)"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-(--color-chat-user) text-(--color-chat-user-text)"
                        : "bg-(--color-chat-bg) text-(--color-text)"
                    }`}
                  >
                    {msg.content || (
                      <span className="inline-block animate-pulse">
                        Thinking...
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-(--color-border) p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Brian's experience..."
              disabled={isStreaming}
              className="flex-1 rounded-xl border border-(--color-border) bg-(--color-bg) px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-secondary) focus:border-(--color-accent) focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="rounded-xl bg-(--color-accent) px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-(--color-accent-hover) disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
