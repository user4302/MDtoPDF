'use client';

import { useState } from 'react';

/**
 * Home component for the Markdown to PDF Converter application
 * 
 * Features:
 * - Markdown text input with syntax highlighting placeholder
 * - File upload support for .md files
 * - Client-side PDF conversion using browser's native print functionality
 * - Responsive print styling with consistent text sizing across all paper sizes
 * - Professional typography using print-optimized CSS with relative units
 * - Responsive design with modern UI/UX
 * - Error handling and user feedback
 * - Draft watermark toggle functionality
 * 
 * Uses React hooks for state management and handles all user interactions
 * including form validation, file reading, and print-based PDF generation with
 * responsive typography that scales properly across different paper sizes.
 */
export default function Home() {
  // State for storing markdown content from user input or file upload
  const [markdown, setMarkdown] = useState('');
  // Loading state to show conversion progress and prevent duplicate requests
  const [isConverting, setIsConverting] = useState(false);
  // Toggle for enabling/disabling page breaks
  const [pageBreaksEnabled, setPageBreaksEnabled] = useState(true);
  // Toggle for enabling/disabling draft watermark
  const [draftEnabled, setDraftEnabled] = useState(false);

  /**
   * Converts markdown content to PDF using browser's native print functionality
   * 
   * Process:
   * 1. Validate markdown input is not empty
   * 2. Convert markdown to HTML using API endpoint
   * 3. Create isolated iframe for print rendering
   * 4. Apply responsive print-specific CSS with relative units (pt) for consistent text sizing
   * 5. Add comprehensive print styling for all markdown elements
   * 6. Add draft watermark if enabled
   * 7. Trigger browser print dialog for PDF generation
   * 8. Clean up iframe and reset loading state
   * 
   * Features:
   * - Responsive text sizing using print media queries
   * - Consistent typography across all paper sizes (A4, A3, Tabloid, etc.)
   * - Proper page breaks and element separation
   * - Professional print styling with headers, code blocks, tables
   * - Optional diagonal "DRAFT" watermark
   * 
   * @returns Promise<void> - No return value, handles side effects
   */
  const handleConvertToPdf = async () => {
    // Early validation to prevent empty submissions
    if (!markdown.trim()) {
      alert('Please enter some markdown content');
      return;
    }

    // Set loading state to disable button and show progress
    setIsConverting(true);
    try {
      // Step 1: Convert markdown to HTML using API
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown, pageBreaksEnabled, draftEnabled }),
      });

      // Check if response is OK before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server returned an error:", errorText);
        throw new Error(`Server error: ${response.status}`);
      }

      const { html: htmlContent } = await response.json();

      // Step 2: Create isolated iframe for completely separate DOM context
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.left = '-9999px';
      iframe.style.top = '-9999px';
      iframe.style.width = '100%';
      iframe.style.height = 'auto';
      iframe.style.border = 'none';
      iframe.style.visibility = 'hidden';
      iframe.style.pointerEvents = 'none';
      document.body.appendChild(iframe);

      // Wait for iframe to load
      await new Promise(resolve => {
        iframe.onload = resolve;
        setTimeout(resolve, 100);
      });

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        throw new Error('Failed to access iframe document');
      }

      // Write the HTML content to iframe
      iframeDoc.open();
      iframeDoc.write(htmlContent);
      iframeDoc.close();

      // Step 3: Apply print-specific CSS with responsive sizing
      const contentElement = iframeDoc.body;
      contentElement.style.backgroundColor = 'white';
      contentElement.style.margin = '0';
      contentElement.style.padding = '0';
      contentElement.style.boxSizing = 'border-box';
      contentElement.innerHTML = `
        <style>
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
              content: "${draftEnabled ? 'DRAFT' : ''}";
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 120pt;
              font-weight: bold;
              color: #000;
              opacity: 0.5;
              z-index: -1;
              pointer-events: none;
              white-space: nowrap;
            }
            
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
        </style>
        <div class="markdown-container">
          ${htmlContent}
        </div>
      `;

      // Step 4: Trigger print dialog
      setTimeout(() => {
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }, 500);

    } catch (error) {
      // Log technical error for debugging and show user-friendly message
      console.error('Error converting to PDF:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error converting to PDF';
      alert(errorMessage);
    } finally {
      setIsConverting(false);
    }
  };

  /**
   * Handles file upload for markdown files (.md)
   * 
   * Supports both:
   * - Files with MIME type 'text/markdown'
   * - Files with .md extension (fallback for systems without proper MIME type)
   * 
   * Process:
   * 1. Validate file type and extension
   * 2. Use FileReader API to read file as text
   * 3. Update markdown state with file content
   * 4. Show error for unsupported file types
   * 
   * @param event - File input change event containing selected file
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Primary check: proper MIME type for markdown files
    if (file && file.type === 'text/markdown') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdown(content);
      };
      reader.readAsText(file);
    } // Fallback check: .md extension for systems without MIME type support
    else if (file && file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdown(content);
      };
      reader.readAsText(file);
    } else {
      // User feedback for unsupported file types
      alert('Please upload a markdown file (.md)');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Markdown to PDF Converter</h1>
          <p className="text-gray-600">Convert your markdown files to PDF instantly</p>
        </div>

        {/* Main Content Area with Flex Layout */}
        <div className="flex gap-6">
          {/* Input Section */}
          <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Markdown Input</h2>
              <label className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">
                Upload .md file
                <input
                  type="file"
                  accept=".md,text/markdown"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder={`Enter your markdown here or upload a file...

# Heading
## Subheading

- List item 1
- List item 2

**Bold text** and *italic text*

[Link](https://example.com)

\`\`\`javascript 
// Code block
console.log('Hello World');
\`\`\`${pageBreaksEnabled ? `

--- PAGE BREAKS ---

For page breaks, use any of these methods:

1. Standard HTML: <div style="page-break-after: always;"></div>

2. Clean CSS class: <div class="page-break"></div>

3. Horizontal rule: --- (will be treated as page break)

Example:
## End of Section 1
This is the last sentence of the first page.

<div class="page-break"></div>

## Start of Section 2
This will start at the top of Page 2.` : `

--- HORIZONTAL RULES ---

Use --- to create visible horizontal lines between sections.`}${draftEnabled ? `

--- DRAFT WATERMARK ---

Draft watermark is enabled. "DRAFT" will appear diagonally across all pages in the PDF.` : ''}`}
              className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50/50"
            />
            <button
              onClick={handleConvertToPdf}
              disabled={isConverting || !markdown.trim()}
              className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none"
            >
              {isConverting ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>

          {/* Control Panel */}
          <div className="w-64 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200 h-fit">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>

            {/* Page Break Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="page-breaks" className="text-sm font-medium text-gray-700">
                  Page Breaks
                </label>
                <button
                  id="page-breaks"
                  onClick={() => setPageBreaksEnabled(!pageBreaksEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${pageBreaksEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pageBreaksEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                {pageBreaksEnabled
                  ? 'Page breaks enabled. Use ---, <div class="page-break"></div>, or HTML style for page breaks.'
                  : 'Page breaks disabled. --- will create horizontal lines instead.'
                }
              </p>
            </div>

            {/* Draft Toggle */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="draft" className="text-sm font-medium text-gray-700">
                  Draft Watermark
                </label>
                <button
                  id="draft"
                  onClick={() => setDraftEnabled(!draftEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${draftEnabled ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${draftEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                {draftEnabled
                  ? 'Draft watermark enabled. "DRAFT" will appear diagonally across pages.'
                  : 'Draft watermark disabled.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="font-semibold text-gray-800 mb-2">Easy Input</h3>
            <p className="text-gray-600 text-sm">Type directly or upload markdown files</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Fast Conversion</h3>
            <p className="text-gray-600 text-sm">Instant PDF generation with high quality</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">Clean Output</h3>
            <p className="text-gray-600 text-sm">Professional-looking PDFs every time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
