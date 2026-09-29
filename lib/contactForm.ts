export const contactLimits = {
  name: { min: 2, max: 100 },
  email: { max: 200 },
  company: { max: 120 },
  message: { min: 10, max: 5000 },
} as const;

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export type ContactField = keyof ContactFormData;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  formData: ContactFormData
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = formData.name.trim();
  const email = formData.email.trim();
  const company = formData.company.trim();
  const message = formData.message.trim();

  if (name.length < contactLimits.name.min) {
    errors.name = "Please enter at least 2 characters.";
  } else if (name.length > contactLimits.name.max) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter an email address like name@example.com.";
  } else if (email.length > contactLimits.email.max) {
    errors.email = "Email must be 200 characters or fewer.";
  }

  if (company.length > contactLimits.company.max) {
    errors.company = "Company must be 120 characters or fewer.";
  }

  if (message.length < contactLimits.message.min) {
    errors.message = "Please enter at least 10 characters.";
  } else if (message.length > contactLimits.message.max) {
    errors.message = "Message must be 5,000 characters or fewer.";
  }

  return errors;
}
