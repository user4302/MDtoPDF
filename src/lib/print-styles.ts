/**
 * Generate print-optimized CSS styles for PDF generation
 * @param draftEnabled - Whether watermark is enabled
 * @param multipleDraftEnabled - Whether multiple watermarks should be used
 * @param watermarkText - The watermark text to display
 * @param pageBreaksEnabled - Whether page breaks are enabled
 * @returns Complete CSS string for print styles
 */
export function generatePrintStyles({
  draftEnabled = false,
  multipleDraftEnabled = false,
  watermarkText = 'DRAFT',
  pageBreaksEnabled = true
}: {
  draftEnabled?: boolean;
  multipleDraftEnabled?: boolean;
  watermarkText?: string;
  pageBreaksEnabled?: boolean;
}): string {
  return `
    @media print {
      @page {
        margin: 1in;
      }
      
      body {
        font-size: 12pt;
        line-height: 1.5;
        color: #000;
        font-family: 'Inter', system-ui, sans-serif;
      }
      
      body:after {
        content: "${draftEnabled ? (multipleDraftEnabled ? '' : watermarkText) : ''}";
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: ${watermarkText.length > 15 ? '60pt' : watermarkText.length > 10 ? '80pt' : watermarkText.length > 5 ? '100pt' : '120pt'};
        font-weight: bold;
        color: #000;
        opacity: 0.1;
        z-index: -1;
        pointer-events: none;
        white-space: nowrap;
        transform-origin: center;
        letter-spacing: ${watermarkText.length > 10 ? '-2pt' : '0pt'};
      }
      
      ${multipleDraftEnabled && draftEnabled ? `
      /* Unified watermark grid system */
      .watermark-grid {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
      }
      
      .watermark-item {
        position: absolute;
        font-size: 24pt;
        font-weight: bold;
        color: #000;
        opacity: 0.1;
        transform: rotate(-45deg);
        white-space: nowrap;
        pointer-events: none;
        z-index: -1;
      }
      
      /* Ensure watermark prints properly */
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      ` : ''}
      
      .markdown-container {
        width: 100%;
        max-width: none;
        margin: 0;
        padding: 0;
      }
      
      p, li, h1, h2, h3, h4, h5, h6 {
        break-inside: avoid;
      }
      
      h1 { font-size: 24pt; margin-bottom: 12pt; }
      h2 { font-size: 18pt; margin-bottom: 10pt; }
      h3 { font-size: 14pt; margin-bottom: 8pt; }
      h4 { font-size: 12pt; margin-bottom: 6pt; }
      h5 { font-size: 11pt; margin-bottom: 6pt; }
      h6 { font-size: 10pt; margin-bottom: 6pt; }
      
      p { margin-bottom: 8pt; }
      ul, ol { margin-bottom: 8pt; padding-left: 20pt; }
      li { margin-bottom: 4pt; }
      
      pre {
        background: #f5f5f5;
        padding: 8pt;
        border-radius: 4pt;
        font-size: 10pt;
        line-height: 1.4;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      
      code {
        background: #f0f0f0;
        padding: 2pt 4pt;
        border-radius: 2pt;
        font-size: 10pt;
      }
      
      blockquote {
        border-left: 3pt solid #ddd;
        padding-left: 12pt;
        margin: 8pt 0;
        font-style: italic;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 8pt;
      }
      
      th, td {
        border: 1pt solid #ddd;
        padding: 6pt;
        text-align: left;
      }
      
      th {
        background: #f5f5f5;
        font-weight: bold;
      }
      
      /* Page break styles */
      .page-break {
        display: ${pageBreaksEnabled ? 'block' : 'none'};
        page-break-after: ${pageBreaksEnabled ? 'always' : 'auto'};
        break-after: ${pageBreaksEnabled ? 'page' : 'auto'};
      }
      
      div[style*="page-break-after: always"] {
        display: ${pageBreaksEnabled ? 'block' : 'none'};
        page-break-after: ${pageBreaksEnabled ? 'always' : 'auto'};
        break-after: ${pageBreaksEnabled ? 'page' : 'auto'};
      }
      
      hr {
        border: ${pageBreaksEnabled ? 'none' : '1px solid #eaecef'};
        break-after: ${pageBreaksEnabled ? 'page' : 'auto'};
        page-break-after: ${pageBreaksEnabled ? 'always' : 'auto'};
        margin: ${pageBreaksEnabled ? '0' : '24px 0'};
        height: ${pageBreaksEnabled ? '0' : '1px'};
      }
    }
    
    @page {
      @bottom-right {
        content: "Page " counter(page) " of " counter(pages);
        font-size: 9pt;
        color: #666;
      }
    }
  `;
}
