import { homeServices, type ServiceIcon } from "@/lib/homeContent";
import Reveal from "./Reveal";

function ServiceGlyph({ icon }: { icon: ServiceIcon }) {
  switch (icon) {
    case "circle":
      return <div className="w-[22px] h-[22px] rounded-full border-[3px] border-brand" />;
    case "square":
      return <div className="w-5 h-5 rounded-[5px] bg-[#1F8F5F]" />;
    case "diamond":
      return <div className="w-4 h-4 bg-[#C97A12] rotate-45" />;
    case "target":
      return (
        <div className="w-[22px] h-[22px] rounded-full border-[3px] border-[#8B4FD1] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#8B4FD1]" />
        </div>
      );
    case "bars":
      return (
        <div className="flex items-end gap-[3px] h-[22px]">
          <div className="w-[5px] h-[10px] bg-[#2C6FB0] rounded-[1px]" />
          <div className="w-[5px] h-[18px] bg-[#2C6FB0] rounded-[1px]" />
          <div className="w-[5px] h-[14px] bg-[#2C6FB0] rounded-[1px]" />
        </div>
      );
    case "refresh":
      return (
        <div className="relative w-[22px] h-[22px]">
          <div className="absolute left-0 top-0 w-[15px] h-[15px] rounded-full border-[3px] border-[#D14F87]" />
          <div className="absolute right-0 bottom-0 w-[15px] h-[15px] rounded-full bg-[#D14F87] opacity-[0.35]" />
        </div>
      );
  }
}

export default function Services() {
  return (
    <section id="services" className="bg-sand py-20 md:py-[100px] scroll-mt-16">
      <div className="max-w-[1180px] mx-auto px-6 md:px-8">
        <Reveal className="max-w-[620px] mx-auto mb-12 md:mb-14 text-center">
          <div className="text-[13px] font-bold text-brand uppercase tracking-[0.06em] mb-3">
            Services
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-ink m-0 mb-3.5">
            Voice AI, built around your workflow
          </h2>
          <p className="text-[16.5px] text-ink/60 leading-[1.6] m-0">
            Comprehensive solutions, deployed one workflow at a time.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {homeServices.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.1}>
              <div className="bg-white border border-ink/10 rounded-2xl p-[30px] h-full transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-14px_rgba(22,24,28,0.18)]">
                <div
                  className="w-11 h-11 rounded-[11px] flex items-center justify-center mb-5"
                  style={{ background: service.tint }}
                >
                  <ServiceGlyph icon={service.icon} />
                </div>
                <h3 className="font-display text-[17px] font-bold text-ink m-0 mb-2">
                  {service.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink/60 m-0">
                  {service.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
