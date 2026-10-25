import { Flame, PawPrint, ShieldCheck, Sparkles, type LucideProps } from "lucide-react";
import type { IndustryIcon as IconKey } from "@/lib/industryContent";

const icons = {
  insurance: ShieldCheck,
  medspa: Sparkles,
  hvac: Flame,
  vet: PawPrint,
} satisfies Record<IconKey, React.ComponentType<LucideProps>>;

export default function IndustryIcon({ icon, ...props }: { icon: IconKey } & LucideProps) {
  const Icon = icons[icon];
  return <Icon aria-hidden {...props} />;
}
