import TrackedLink from "@/components/start/TrackedLink";
import { auditBookingUrl } from "@/lib/bookingUrls";

export default function AuditLink({
  placement,
  className,
  children,
}: {
  placement: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <TrackedLink
      href={auditBookingUrl(placement)}
      event="audit_click"
      properties={{ placement }}
      external
      className={className}
    >
      {children}
    </TrackedLink>
  );
}
