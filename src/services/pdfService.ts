import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface GeneratePdfOptions {
  element: HTMLElement;
  filename?: string;
  onProgress?: (message: string) => void;
}

export const generatePdfFromElement = async ({
  element,
  filename = 'invoice.pdf',
  onProgress,
}: GeneratePdfOptions): Promise<{ success: boolean; error?: string }> => {
  try {
    if (onProgress) onProgress('Generating PDF...');

    // Temporarily reset inline CSS transform for 1:1 crisp canvas capture
    const originalTransform = element.style.transform;
    element.style.transform = 'none';

    // Render high-res canvas at scale 2
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF',
    });

    // Restore preview transform
    element.style.transform = originalTransform;

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Initialize A4 PDF (210mm x 297mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);

    return { success: true };
  } catch (err: unknown) {
    console.error('PDF generation error:', err);
    return {
      success: false,
      error: 'Unable to generate the PDF. Please try again.',
    };
  }
};
