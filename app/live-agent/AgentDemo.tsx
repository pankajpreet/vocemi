"use client";

import Script from "next/script";

type AgentDemoProps = {
  agentId: string;
  name: string;
  description: string;
};

export default function AgentDemo({ agentId, name, description }: AgentDemoProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold mb-3">{name}</h1>
      <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      <p className="text-sm text-gray-400">
        Click the widget in the bottom-right corner to start a live conversation.
      </p>

      <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>

      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
      />
    </section>
  );
}
