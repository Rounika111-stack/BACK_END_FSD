import { Router } from 'express';
import nodemailer from 'nodemailer';
import { validateContact } from '../middleware/validateContact.js';

const router = Router();

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

router.post('/', validateContact, async (req, res) => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_EMAIL,
    CONTACT_TO,
    CONTACT_FROM,
  } = process.env;

  const targetEmail = CONTACT_EMAIL || CONTACT_TO || 'rouni.tiwari2013@gmail.com';
  const fromEmail = CONTACT_FROM || (SMTP_USER ? `Portfolio Contact <${SMTP_USER}>` : `Portfolio Contact <no-reply@rounikatiwari.dev>`);

  // Check if SMTP credentials are configured
  const isSmtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

  if (!isSmtpConfigured) {
    console.warn('[Contact API] SMTP credentials not set. Returning clear configuration response.');
    return res.status(503).json({
      status: 'unconfigured',
      message: 'SMTP credentials are not configured on the server. Please contact Rounika directly at rouni.tiwari2013@gmail.com.',
      contactEmail: targetEmail,
    });
  }

  try {
    const port = Number(SMTP_PORT || 587);
    const secure = SMTP_SECURE === 'true' || port === 465;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: fromEmail,
      to: targetEmail,
      replyTo: `${req.contact.name} <${req.contact.email}>`,
      subject: `[Portfolio Contact] ${req.contact.subject}`,
      text: `New message from portfolio contact form:\n\nName: ${req.contact.name}\nEmail: ${req.contact.email}\nSubject: ${req.contact.subject}\n\nMessage:\n${req.contact.message}\n`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e1e1e; line-height: 1.6; background-color: #faf9f7; border-radius: 8px; border: 1px solid #e7e5e0;">
          <h2 style="margin-top: 0; color: #1e1e1e; font-size: 20px; border-bottom: 1px solid #e0ddd7; padding-bottom: 12px;">New Portfolio Message</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; color: #76746e; font-size: 13px; width: 80px;">From:</td>
              <td style="padding: 6px 0; font-weight: 600;">${escapeHtml(req.contact.name)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #76746e; font-size: 13px;">Email:</td>
              <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(req.contact.email)}" style="color: #8c6d4d;">${escapeHtml(req.contact.email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #76746e; font-size: 13px;">Subject:</td>
              <td style="padding: 6px 0;">${escapeHtml(req.contact.subject)}</td>
            </tr>
          </table>
          <div style="background-color: #ffffff; border: 1px solid #e5e2da; border-radius: 6px; padding: 16px;">
            <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #2a2a2a;">${escapeHtml(req.contact.message)}</p>
          </div>
          <p style="margin-top: 24px; font-size: 11px; color: #9c9991; text-align: center;">Sent from Rounika Tiwari Portfolio Website</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      status: 'success',
      message: 'Thank you! Your message has been sent successfully.',
    });
  } catch (error) {
    console.error('[Contact API] Failed to send email via SMTP:', error.message);
    return res.status(500).json({
      status: 'error',
      message: 'Unable to deliver message through email service right now. Please reach out directly at rouni.tiwari2013@gmail.com.',
    });
  }
});

export default router;
