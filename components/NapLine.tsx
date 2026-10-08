import TrackedLink from "@/components/start/TrackedLink";
import { siteConfig } from "@/lib/config";

/**
 * Visible name, service area, phone, and email. No street address.
 * `emailPlacement` is only the existing email_clicked placement.
 */
export default function NapLine({
  className = "",
  linkClassName = "",
  emailPlacement,
}: {
  className?: string;
  linkClassName?: string;
  emailPlacement: string;
}) {
  const { email, phoneDisplay, phoneTel } = siteConfig.contact;

  return (
    <p className={className}>
      Vocemi
      <span aria-hidden="true"> · </span>
      {siteConfig.serviceArea}
      <span aria-hidden="true"> · </span>
      <a href={`tel:${phoneTel}`} className={linkClassName}>
        {phoneDisplay}
      </a>
      <span aria-hidden="true"> · </span>
      <TrackedLink
        href={`mailto:${email}`}
        event="email_clicked"
        properties={{ placement: emailPlacement }}
        className={linkClassName}
      >
        {email}
      </TrackedLink>
    </p>
  );
}

export function ProfileLinks({
  className = "",
  linkClassName = "",
}: {
  className?: string;
  linkClassName?: string;
}) {
  return (
    <div className={className}>
      <a
        href={siteConfig.social.googleBusiness}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        Google Business Profile
      </a>
      <a
        href={siteConfig.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        LinkedIn
      </a>
    </div>
  );
}
