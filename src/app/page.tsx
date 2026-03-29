'use client';

import { useState } from 'react';
import { marked } from 'marked';

/**
 * Home component for the Markdown to PDF Converter application
 * 
 * Features:
 * - Markdown text input with syntax highlighting placeholder
 * - File upload support for .md files
 * - Client-side PDF conversion using browser's native print functionality
 * - Responsive design with modern UI/UX
 * - Error handling and user feedback
 * 
 * Uses React hooks for state management and handles all user interactions
 * including form validation, file reading, and print-based PDF generation.
 */
export default function Home() {
  // State for storing markdown content from user input or file upload
  const [markdown, setMarkdown] = useState('');
  // Loading state to show conversion progress and prevent duplicate requests
  const [isConverting, setIsConverting] = useState(false);

  /**
   * Converts markdown content to PDF using browser's native print functionality
   * 
   * Process:
   * 1. Validate markdown input is not empty
   * 2. Convert markdown to HTML using API endpoint
   * 3. Create isolated iframe for print rendering
   * 4. Apply print-specific CSS with page styling and numbering
   * 5. Trigger browser print dialog for PDF generation
   * 6. Clean up iframe and reset loading state
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
        body: JSON.stringify({ markdown }),
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
      iframe.style.width = '800px';
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

      // Step 3: Apply pagedjs styles and create preview
      const contentElement = iframeDoc.body;
      contentElement.style.width = '800px';
      contentElement.style.backgroundColor = 'white';
      contentElement.style.padding = '40px 20px';
      contentElement.style.boxSizing = 'border-box';
      contentElement.innerHTML = `
        <style>
          @page {
            size: A4;
            margin: 20mm 15mm 20mm 15mm;
          }
          p, li, h1, h2, h3 {
            break-inside: avoid;
          }
          body {
            font-family: 'Inter', system-ui, sans-serif;
            line-height: 1.6;
          }
          @page {
            @bottom-right {
              content: "Page " counter(page) " of " counter(pages);
              font-size: 9pt;
              color: #666;
            }
          }
        </style>
        ${htmlContent}
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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Markdown to PDF Converter</h1>
          <p className="text-gray-600">Convert your markdown files to PDF instantly</p>
        </div>

        {/* Input Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200">
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
            placeholder="Enter your markdown here or upload a file...&#10;&#10;# Heading&#10;## Subheading&#10;&#10;- List item 1&#10;- List item 2&#10;&#10;**Bold text** and *italic text*&#10;&#10;[Link](https://example.com)&#10;&#10;```javascript &#10;// Code block&#10;console.log('Hello World');&#10;```"
            className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50/50"
          />
          <button
            onClick={handleConvertToPdf}
            disabled={isConverting || !markdown.trim()}
            className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none"
          >
            {isConverting ? 'Converting...' : 'Convert to PDF'}
          </button>
        </div >

        {/* Features Section */}
        < div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6" >
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
        </div >
      </div >
    </div >
  );
}
