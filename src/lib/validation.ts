import { ContactFormData, ContactFormErrors } from "@/types";

/**
 * Validates a single user chat prompt.
 */
export function validateChatMessage(text: string): { isValid: boolean; error?: string; sanitized: string } {
  if (!text || typeof text !== "string") {
    return { isValid: false, error: "Please enter a message.", sanitized: "" };
  }

  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return { isValid: false, error: "Your message cannot be empty.", sanitized: "" };
  }

  if (trimmed.length > 2000) {
    return {
      isValid: false,
      error: "Message is too long. Please keep questions under 2,000 characters.",
      sanitized: trimmed.slice(0, 2000),
    };
  }

  return { isValid: true, sanitized: trimmed };
}

/**
 * Validates the contact form fields.
 */
export function validateContactForm(data: ContactFormData): {
  isValid: boolean;
  errors: ContactFormErrors;
} {
  const errors: ContactFormErrors = {};

  // Name validation
  if (!data.name || !data.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (data.name.trim().length > 80) {
    errors.name = "Name cannot exceed 80 characters.";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !data.email.trim()) {
    errors.email = "Please provide an email address.";
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = "Please provide a valid email address (e.g. name@example.com).";
  }

  // Subject validation
  if (!data.subject || !data.subject.trim()) {
    errors.subject = "Please enter a subject.";
  } else if (data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  } else if (data.subject.trim().length > 120) {
    errors.subject = "Subject cannot exceed 120 characters.";
  }

  // Message validation
  if (!data.message || !data.message.trim()) {
    errors.message = "Please write your message.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters so we can understand your note.";
  } else if (data.message.trim().length > 2000) {
    errors.message = "Message cannot exceed 2,000 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Encodes contact details into a mailto link with encoded subject and body.
 */
export function buildMailtoUrl(data: ContactFormData, ownerEmail: string): string {
  const subject = encodeURIComponent(`[BloomWell AI] ${data.subject.trim()}`);
  const body = encodeURIComponent(
    `Hello Mahi,\n\nName: ${data.name.trim()}\nEmail: ${data.email.trim()}\n\nMessage:\n${data.message.trim()}\n\n---\nSent from BloomWell AI Contact Form`
  );
  return `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
}
