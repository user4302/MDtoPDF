/**
 * HTML template with GitHub-flavored styling optimized for PDF generation
 * @param html - The converted HTML content from markdown
 * @param pageBreaksEnabled - Whether page breaks are enabled
 * @returns Complete HTML document string
 */
export function createHtmlDocument(html: string, pageBreaksEnabled: boolean = true): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Base typography and layout styles */
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          background: white;
          font-size: 14px;
        }
        /* Heading styles with consistent hierarchy */
        h1, h2, h3, h4, h5, h6 {
          margin-top: 24px;
          margin-bottom: 16px;
          font-weight: 600;
          line-height: 1.25;
        }
        h1 { font-size: 2em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
        h3 { font-size: 1.25em; }
        h4 { font-size: 1em; }
        h5 { font-size: 0.875em; }
        h6 { font-size: 0.85em; color: #6a737d; }
        /* Paragraph and list spacing */
        p { margin-bottom: 16px; }
        ul, ol { padding-left: 2em; margin-bottom: 16px; }
        li { margin-bottom: 4px; }
        /* Inline and block code styling */
        code {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
          background-color: #f6f8fa;
          border-radius: 3px;
          font-size: 85%;
          margin: 0;
          padding: 0.2em 0.4em;
        }
        pre {
          background-color: #f6f8fa;
          border-radius: 6px;
          font-size: 85%;
          line-height: 1.45;
          overflow: auto;
          padding: 16px;
          margin-bottom: 16px;
        }
        pre code {
          background-color: transparent;
          border: 0;
          display: inline;
          line-height: inherit;
          margin: 0;
          max-width: auto;
          overflow: visible;
          padding: 0;
          word-wrap: normal;
        }
        /* Blockquote and table styling */
        blockquote {
          border-left: 4px solid #dfe2e5;
          padding: 0 16px;
          color: #6a737d;
          margin: 0 0 16px 0;
        }
        table {
          border-spacing: 0;
          border-collapse: collapse;
          margin-bottom: 16px;
          width: 100%;
        }
        table th, table td {
          border: 1px solid #dfe2e5;
          padding: 6px 13px;
        }
        table th {
          background-color: #f6f8fa;
          font-weight: 600;
        }
        table tr:nth-child(2n) {
          background-color: #f6f8fa;
        }
        /* Link and media styling */
        a {
          color: #0366d6;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        /* Horizontal rule styling */
        hr {
          border: none;
          border-top: 1px solid #eaecef;
          height: 1px;
          margin: 24px 0;
        }
        /* Print-specific optimizations */
        @media print {
          body { font-size: 12pt; }
          h1 { font-size: 18pt; }
          h2 { font-size: 16pt; }
          h3 { font-size: 14pt; }
          
          /* Universal rule: prevent ALL automatic page breaks */
          * {
            page-break-before: auto !important;
            break-before: auto !important;
            page-break-after: auto !important;
            break-after: auto !important;
            page-break-inside: auto !important;
            break-inside: auto !important;
          }
          
          /* Then explicitly prevent breaks where we don't want them */
          h1, h2, h3, h4, h5, h6, p, ul, ol, li, blockquote, table, pre, code {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-before: avoid !important;
            break-before: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          
          /* Specifically prevent page breaks before and after headings */
          h1, h2, h3, h4, h5, h6 {
            page-break-before: avoid !important;
            break-before: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          
          /* Allow nested lists to stay together */
          ul, ol {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          li {
            page-break-inside: avoid;
            break-inside: avoid;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          
          /* Prevent page breaks in milestone sections */
          .milestone-section {
            page-break-inside: avoid;
            break-inside: avoid;
            page-break-before: auto;
            break-before: auto;
            page-break-after: auto;
            break-after: auto;
          }
          
          /* Keep connected lists together */
          .continue-list {
            page-break-before: avoid;
            break-before: avoid;
            margin-top: -8px;
          }
          
          /* Page break styles - only explicit breaks work */
          .page-break {
            display: ${pageBreaksEnabled ? "block" : "none"};
            page-break-after: ${pageBreaksEnabled ? "always" : "auto"} !important;
            break-after: ${pageBreaksEnabled ? "page" : "auto"} !important;
            page-break-before: auto !important;
            break-before: auto !important;
          }
          
          div[style*="page-break-after: always"] {
            display: ${pageBreaksEnabled ? "block" : "none"};
            page-break-after: ${pageBreaksEnabled ? "always" : "auto"} !important;
            break-after: ${pageBreaksEnabled ? "page" : "auto"} !important;
            page-break-before: auto !important;
            break-before: auto !important;
          }
          
          hr {
            border: ${pageBreaksEnabled ? "none" : "1px solid #eaecef"};
            break-after: ${pageBreaksEnabled ? "page" : "auto"} !important;
            page-break-after: ${pageBreaksEnabled ? "always" : "auto"} !important;
            margin: ${pageBreaksEnabled ? "0" : "24px 0"};
            height: ${pageBreaksEnabled ? "0" : "1px"};
            page-break-before: auto !important;
            break-before: auto !important;
          }
        }
      </style>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `;
}
