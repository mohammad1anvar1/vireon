export async function sendReportToCustomer({ order, pdfBuffer, downloadUrl }) {
  if (!process.env.RESEND_API_KEY) {
    console.log('No RESEND_API_KEY — skipping customer email');
    return;
  }
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    to: order.customerEmail,
    subject: `Your VIREON Report — ${order.orderNumber}`,
    html: `<p>Your report <strong>${order.productName}</strong> is ready. Order: ${order.orderNumber}</p>`,
  });
}

export async function sendAdminNotification({ order }) {
  if (!process.env.RESEND_API_KEY) {
    console.log('No RESEND_API_KEY — skipping admin email');
    return;
  }
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
    to: process.env.ADMIN_EMAIL || 'admin@vireonai.uk',
    subject: `[VIREON] New Purchase — ${order.orderNumber}`,
    html: `<p>New purchase: ${order.productName} — ${order.customerEmail}</p>`,
  });
}
