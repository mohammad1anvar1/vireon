// Generates a simple HTML report buffer (pdfkit incompatible with Next.js/Turbopack)
// Returns a Buffer containing the HTML report
export function generateReportPDF(order) {
  const amount = `£${(order.amountTotal / 100).toFixed(2)}`;
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>VIREON Report ${order.orderNumber}</title>
<style>
  body { font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #333; }
  .header { background: #0a0a0f; color: white; padding: 32px; margin: -40px -40px 40px; }
  .logo { font-size: 28px; } .logo span { color: #e8ff3c; }
  .title { font-size: 28px; margin: 0 0 8px; color: #0a0a0f; }
  .meta { color: #666; margin: 0 0 32px; }
  .divider { border: none; border-top: 3px solid #e8ff3c; margin: 24px 0; }
  .box { background: #f5f5f0; border: 1px solid #e0e0e0; padding: 24px; border-radius: 4px; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 8px 0; font-size: 14px; }
  td:first-child { color: #888; width: 40%; }
  td:last-child { font-weight: 600; }
  .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #eee; font-size: 12px; color: #aaa; text-align: center; }
</style>
</head>
<body>
  <div class="header">
    <div class="logo"><span>VIREON</span> AI Intelligence</div>
  </div>
  <h1 class="title">${order.productName}</h1>
  <p class="meta">Order ${order.orderNumber} &nbsp;·&nbsp; ${date}</p>
  <hr class="divider">
  <h2 style="font-size:16px;margin:0 0 16px;">Order Confirmation</h2>
  <div class="box">
    <table>
      <tr><td>Product</td><td>${order.productName}</td></tr>
      <tr><td>Order Number</td><td>${order.orderNumber}</td></tr>
      <tr><td>Customer</td><td>${order.customerEmail}</td></tr>
      <tr><td>Amount Paid</td><td>${amount}</td></tr>
      <tr><td>Date</td><td>${date}</td></tr>
    </table>
  </div>
  <p style="margin-top:32px;line-height:1.8;">Your intelligence report has been processed. 
  The full report content will be delivered according to the product specifications. 
  Please retain this confirmation for your records.</p>
  <div class="footer">VIREON AI · vireonai.uk · ${order.orderNumber}</div>
</body>
</html>`;

  return Promise.resolve(Buffer.from(html, 'utf8'));
}
