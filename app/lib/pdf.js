import PDFDocument from 'pdfkit';

export function generateReportPDF(order) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 60, bottom: 60, left: 60, right: 60 } });
    const chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const W = doc.page.width - 120;

    // Header
    doc.rect(0, 0, doc.page.width, 90).fill('#0a0a0f');
    doc.font('Helvetica-Bold').fontSize(22).fillColor('#e8ff3c').text('VIREON', 60, 28, { continued: true });
    doc.font('Helvetica').fontSize(22).fillColor('#ffffff').text('  AI Intelligence');
    doc.font('Helvetica').fontSize(10).fillColor('#888888').text('INTELLIGENCE REPORT', 60, 60);

    // Title
    doc.font('Helvetica-Bold').fontSize(18).fillColor('#0a0a0f').text(order.productName, 60, 120);
    doc.font('Helvetica').fontSize(10).fillColor('#555').text(`Order: ${order.orderNumber}  |  ${order.customerEmail}`, 60, 145);

    // Divider
    doc.moveTo(60, 165).lineTo(doc.page.width - 60, 165).strokeColor('#e8ff3c').lineWidth(2).stroke();

    // Summary
    doc.font('Helvetica-Bold').fontSize(13).fillColor('#0a0a0f').text('Executive Summary', 60, 185);
    doc.font('Helvetica').fontSize(10.5).fillColor('#333')
      .text('This report has been generated for your organisation based on the intelligence package purchased. The analysis represents VIREON\'s AI-driven market synthesis, delivering actionable strategic intelligence calibrated to your industry context.', 60, 205, { width: W, lineGap: 4 });

    // Details box
    doc.rect(60, 310, W, 100).fillAndStroke('#f5f5f0', '#e0e0e0');
    doc.font('Helvetica-Bold').fontSize(10).fillColor('#0a0a0f').text('ORDER DETAILS', 75, 324);
    const details = [
      ['Product', order.productName],
      ['Order Number', order.orderNumber],
      ['Customer', order.customerEmail],
      ['Amount Paid', `£${(order.amountTotal / 100).toFixed(2)}`],
      ['Date', new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })],
    ];
    details.forEach(([label, value], i) => {
      const y = 342 + i * 13;
      doc.font('Helvetica-Bold').fontSize(9).fillColor('#888').text(label.toUpperCase(), 75, y, { continued: true });
      doc.font('Helvetica').fontSize(9).fillColor('#333').text(`   ${value}`);
    });

    // Footer
    const footerY = doc.page.height - 60;
    doc.moveTo(60, footerY - 10).lineTo(doc.page.width - 60, footerY - 10).strokeColor('#ddd').lineWidth(0.5).stroke();
    doc.font('Helvetica').fontSize(8).fillColor('#aaa')
      .text(`VIREON AI · vireonai.uk · ${order.orderNumber} · ${new Date().toISOString()}`, 60, footerY, { align: 'center', width: W });

    doc.end();
  });
}
