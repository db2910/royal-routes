import { resend } from "./resend"

// Email configuration for better deliverability
export const EMAIL_CONFIG = {
  from: {
    name: "Royal Routes Rwanda",
    email: "info@royalroutestours.com"
  },
  replyTo: "support@royalroutestours.com",
  headers: {
    "X-Priority": "3",
    "X-MSMail-Priority": "Normal",
    "Importance": "normal",
    "X-Mailer": "Royal Routes Website",
    "List-Unsubscribe": "<mailto:unsubscribe@royalroutestours.com>",
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click"
  }
}

// Improved email sending function with better authentication
export async function sendAuthenticatedEmail({
  to,
  subject,
  html,
  text,
  replyTo = EMAIL_CONFIG.replyTo,
  headers = {}
}: {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
  headers?: Record<string, string>
}) {
  try {
    const result = await resend.emails.send({
      from: `${EMAIL_CONFIG.from.name} <${EMAIL_CONFIG.from.email}>`,
      to,
      subject,
      html,
      text,
      replyTo,
      headers: {
        ...EMAIL_CONFIG.headers,
        ...headers
      }
    })

    console.log("Email sent successfully:", result)
    return { success: true, emailId: result }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error }
  }
}

// Function to validate email addresses
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Function to sanitize email content
export function sanitizeEmailContent(content: string): string {
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
}
