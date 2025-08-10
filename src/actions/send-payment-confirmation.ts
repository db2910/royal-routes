"use server"

import { resend, DEFAULT_FROM_EMAIL, ADMIN_EMAIL } from "@/src/lib/resend"

interface SendPaymentConfirmationProps {
  bookingId: string
  customerName: string
  customerEmail: string
  itemName: string
  type: string
  total: number
  deposit: number
}

export async function sendPaymentConfirmation({ 
  bookingId, 
  customerName, 
  customerEmail, 
  itemName, 
  type, 
  total, 
  deposit 
}: SendPaymentConfirmationProps) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error("RESEND_API_KEY is not defined")
    return {
      success: false,
      error: "Email service not configured",
      emailSent: false,
      message: "Payment confirmed, but email notifications are not configured.",
    }
  }

  try {
    console.log(`Sending payment confirmation emails for booking ${bookingId}...`)

    const confirmedAt = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    })

    // Create customer payment confirmation email
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Confirmed - Royal Routes</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #001934 0%, #B8860B 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🏔️ Royal Routes</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Payment Confirmed!</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #001934; margin-top: 0;">Dear ${customerName},</h2>
          <p>Great news! Your payment for your <strong>${type} booking</strong> has been confirmed.</p>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #4caf50;">
            <h3 style="margin-top: 0; color: #2e7d32;">✅ Booking Details</h3>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Item:</strong> ${itemName}</p>
            <p><strong>Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
            <p><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
            <p><strong>Deposit Paid:</strong> $${deposit.toFixed(2)}</p>
            <p><strong>Balance Due:</strong> $${(total - deposit).toFixed(2)}</p>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ffc107;">
            <h3 style="margin-top: 0; color: #856404;">🚀 What happens next?</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Your booking is now confirmed and secured</li>
              <li>Our team will contact you within <strong>24 hours</strong> with next steps</li>
              <li>We'll arrange the final details for your ${type}</li>
              <li>You'll receive all necessary information for your adventure</li>
            </ul>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #ddd;">
            <h3 style="margin-top: 0; color: #001934;">📞 Need assistance?</h3>
            <p style="margin: 5px 0;">Phone: +250 788 123 456</p>
            <p style="margin: 5px 0;">Email: info@royalroutes.com</p>
            <p style="margin: 5px 0;">WhatsApp: +250 788 123 456</p>
          </div>
          
          <p style="margin-top: 30px;">Thank you for choosing Royal Routes!<br><strong>The Royal Routes Team</strong></p>
          
          <p style="color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            Payment confirmed on ${confirmedAt}
          </p>
        </div>
      </body>
      </html>
    `

    // Create admin confirmation email
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Payment Confirmed - Admin Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #001934 0%, #B8860B 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">🏔️ Royal Routes</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Payment Confirmed - Admin Notification</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #001934; margin-top: 0;">Payment Confirmed</h2>
          <p>A booking payment has been confirmed by an admin.</p>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2e7d32;">📋 Booking Details</h3>
            <p><strong>Booking ID:</strong> ${bookingId}</p>
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Customer Email:</strong> ${customerEmail}</p>
            <p><strong>Item:</strong> ${itemName}</p>
            <p><strong>Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
            <p><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
            <p><strong>Deposit Paid:</strong> $${deposit.toFixed(2)}</p>
            <p><strong>Balance Due:</strong> $${(total - deposit).toFixed(2)}</p>
          </div>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1565c0;"><strong>✅ Confirmed:</strong> ${confirmedAt}</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send customer confirmation
    console.log("Sending customer payment confirmation...")
    const customerResult = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: customerEmail,
      subject: `✅ Payment Confirmed - Your ${type} booking with Royal Routes`,
      html: customerEmailHtml,
    })

    console.log("Customer email sent:", customerResult)

    // Send admin notification
    console.log("Sending admin notification...")
    const adminResult = await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `✅ Payment Confirmed - Booking ${bookingId} (${customerName})`,
      html: adminEmailHtml,
    })

    console.log("Admin email sent:", adminResult)

    return {
      success: true,
      customerEmailId: customerResult,
      adminEmailId: adminResult,
      emailSent: true,
      message: "Payment confirmation emails sent successfully.",
    }
  } catch (error) {
    console.error("Payment confirmation email error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send confirmation emails",
      emailSent: false,
      message: "Payment confirmed, but confirmation emails could not be sent.",
    }
  }
}
