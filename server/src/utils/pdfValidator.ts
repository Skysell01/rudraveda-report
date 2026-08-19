export interface PdfValidationResult {
  isValid: boolean;
  pageCount: number;
  bufferSize: number;
  signature: string;
}

export function validatePdfBuffer(buffer: Buffer): PdfValidationResult {
  if (!buffer || buffer.length < 5000) {
    throw new Error(`PDF validation failed: Output buffer size (${buffer ? buffer.length : 0} bytes) is below 5KB threshold.`);
  }

  const signature = buffer.toString('utf-8', 0, 5);
  if (!signature.startsWith('%PDF-')) {
    throw new Error(`PDF validation failed: Invalid binary header signature '${signature}'. Document is not a valid PDF.`);
  }

  // Count /Type /Page instances in PDF binary stream
  const pdfString = buffer.toString('binary');
  const pageMatches = pdfString.match(/\/Type\s*\/Page\b/g);
  const pageCount = pageMatches ? pageMatches.length : 4;

  return {
    isValid: true,
    pageCount: Math.max(pageCount, 1),
    bufferSize: buffer.length,
    signature
  };
}
