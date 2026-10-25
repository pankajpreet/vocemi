import Reveal from "@/components/home/Reveal";

interface SectionIntroProps {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionIntro({
  eyebrow,
  title,
  sub,
  align = "center",
  dark = false,
  as: Heading = "h2",
  className = "",
}: SectionIntroProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={`${centered ? "max-w-[660px] mx-auto text-center" : "max-w-[660px]"} mb-12 md:mb-14 ${className}`}
    >
      <div
        className={`text-[13px] font-bold uppercase tracking-[0.06em] mb-3 ${
          dark ? "text-brand-light" : "text-brand"
        }`}
      >
        {eyebrow}
      </div>
      <Heading
        className={`font-display text-3xl md:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.1] m-0 ${
          sub ? "mb-3.5" : ""
        } ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </Heading>
      {sub && (
        <p
          className={`text-[16.5px] leading-[1.6] m-0 ${centered ? "mx-auto" : ""} max-w-[560px] ${
            dark ? "text-white/65" : "text-ink/65"
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
