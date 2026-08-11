import { CalendarCheck, MessageSquareReply, Phone, Workflow } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { capabilities, type CapabilityIcon } from "@/lib/startContent";

const icons: Record<CapabilityIcon, typeof Phone> = {
  phone: Phone,
  calendar: CalendarCheck,
  followup: MessageSquareReply,
  automate: Workflow,
};

const iconColors: Record<CapabilityIcon, string> = {
  phone: "#3B54F4",
  calendar: "#1F8F5F",
  followup: "#C97A12",
  automate: "#8B4FD1",
};

export default function Capabilities() {
  return (
    <section className="max-w-[860px] mx-auto px-6 py-14 md:py-20">
      <h2 className="font-display text-[28px] md:text-4xl font-extrabold tracking-[-0.025em] text-ink m-0 mb-3">
        What an AI employee does
      </h2>
      <p className="text-[16px] text-ink/60 leading-[1.6] m-0 mb-9 max-w-[520px]">
        Not a phone tree. It holds a real conversation and finishes the job.
      </p>

      <div className="grid sm:grid-cols-2 gap-[18px]">
        {capabilities.map((cap, i) => {
          const Icon = icons[cap.icon];
          return (
            <Reveal key={cap.title} delay={i * 0.1}>
              <div className="bg-white border border-ink/10 rounded-2xl p-6 md:p-7 h-full transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-14px_rgba(22,24,28,0.18)]">
                <div
                  className="w-11 h-11 rounded-[11px] flex items-center justify-center mb-5"
                  style={{ background: cap.tint }}
                >
                  <Icon size={20} style={{ color: iconColors[cap.icon] }} />
                </div>
                <h3 className="font-display text-[17px] font-bold text-ink m-0 mb-2">
                  {cap.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                  {cap.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
