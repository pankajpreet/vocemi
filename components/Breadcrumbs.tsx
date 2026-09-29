import Link from "next/link";
import { BreadcrumbStructuredData } from "@/components/StructuredData";

interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail plus matching BreadcrumbList markup. The last crumb is the current page. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <BreadcrumbStructuredData items={trail} />
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-[13px] text-ink/45 mb-8"
      >
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <span key={crumb.path} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-ink/70">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="hover:text-brand transition-colors">
                  {crumb.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
