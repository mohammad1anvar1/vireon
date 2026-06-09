import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM || 'VIREON AI <reports@vireonai.uk>';
const ADMIN = process.env.ADMIN_EMAIL || 'admin@vireonai.uk';

export async function sendReportToCustomer({ order, pdfBuffer, downloadUrl }) {
  const amount = `£${(order.amountTotal / 100).toFixed(2)}`;
  await resend.emails.send({
    from: FROM,
    to: order.customerEmail,
    subject: `Your VIREON Report is Ready — ${order.orderNumber}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff;">
        <div style="background:#0a0a0f;padding:28px 36px;">
          <span style="font-size:22px;font-weight:bold;color:#e8ff3c;">VIREON</span>
          <span style="font-size:22px;color:#fff;"> AI Intelligence</span>
        </div>
        <div style="padding:36px;">
          <p style="font-size:22px;font-weight:bold;color:#0a0a0f;margin:0 0 6px;">Your report is ready.</p>
          <p style="color:#666;margin:0 0 28px;">Order ${order.orderNumber} · ${amount}</p>
          <p style="color:#333;line-height:1.7;margin:0 0 28px;">
            Your <strong>${order.productName}</strong> report is attached to this email 
            and available via the download link below.
          </p>
          <a href="${downloadUrl}" style="display:inline-block;background:#0a0a0f;color:#e8ff3c;
            padding:14px 32px;text-decoration:none;font-weight:bold;border-radius:3px;
            letter-spacing:0.05em;">DOWNLOAD YOUR REPORT →</a>
          <p style="font-size:12px;color:#999;margin:24px 0 0;">
            Link expires in 72 hours. Report also attached to this email.
          </p>
        </div>
        <div style="background:#f9f9f6;padding:20px 36px;border-top:1px solid #eee;">
          <p style="font-size:11px;color:#aaa;margin:0;text-align:center;">
            VIREON AI · vireonai.uk · ${order.orderNumber}
          </p>
        </div>
      </div>`,
    attachments: [{
      filename: `VIREON-Report-${order.orderNumber}.pdf`,
      content: pdfBuffer.toString('base64'),
    }],
  });
}

export async function sendAdminNotification({ order }) {
  const amount = `£${(order.amountTotal / 100).toFixed(2)}`;
  await resend.emails.send({
    from: FROM,
    to: ADMIN,
    subject: `[VIREON] New Purchase — ${order.orderNumber} — ${amount}`,
    html: `
      <div style="font-family:monospace;padding:32px;background:#f0f0f0;">
        <div style="background:#fff;border-left:4px solid #e8ff3c;padding:24px;max-width:480px;">
          <p style="font-size:18px;font-weight:bold;margin:0 0 16px;">💰 New VIREON Purchase</p>
          <table style="font-size:13px;color:#333;">
            <tr><td style="padding:3px 16px 3px 0;color:#888;">Order</td><td style="font-weight:600;">${order.orderNumber}</td></tr>
            <tr><td style="padding:3px 16px 3px 0;color:#888;">Customer</td><td style="font-weight:600;">${order.customerEmail}</td></tr>
            <tr><td style="padding:3px 16px 3px 0;color:#888;">Product</td><td style="font-weight:600;">${order.productName}</td></tr>
            <tr><td style="padding:3px 16px 3px 0;color:#888;">Amount</td><td style="font-weight:600;">${amount}</td></tr>
            <tr><td style="padding:3px 16px 3px 0;color:#888;">Session</td><td style="font-weight:600;">${order.sessionId}</td></tr>
          </table>
        </div>
      </div>`,
  });
}
