/**
 * Isolated Iframe Print Engine for Smart Invoice Builder
 * Bypasses screen CSS conflicts, Chrome transform scale bugs, and media query issues.
 */
export const printInvoice = (): void => {
  // Locate the active invoice A4 element rendered on screen
  const invoiceElement = document.querySelector('.invoice-a4-page') as HTMLElement;
  
  if (!invoiceElement) {
    window.print();
    return;
  }

  // Create an isolated hidden iframe for printing
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    document.body.removeChild(iframe);
    return;
  }

  // Copy all stylesheet links and style tags from current document
  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((s) => s.outerHTML)
    .join('\n');

  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Invoice Document</title>
        ${styles}
        <style>
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-a4-page {
            box-shadow: none !important;
            border: none !important;
            margin: 0 auto !important;
            width: 210mm !important;
            max-width: 210mm !important;
            min-height: 297mm !important;
            padding: 15mm !important;
            transform: none !important;
            background: #ffffff !important;
            box-sizing: border-box !important;
            page-break-after: avoid;
            page-break-inside: avoid;
          }
        </style>
      </head>
      <body>
        ${invoiceElement.outerHTML}
      </body>
    </html>
  `);
  doc.close();

  // Allow styles and images to render in iframe before invoking print
  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (e) {
      console.error('Iframe print error:', e);
      window.print();
    } finally {
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1000);
    }
  }, 250);
};
