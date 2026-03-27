'use client';

import { useState } from 'react';

/**
 * Main Markdown to PDF converter component
 * 
 * This component provides a complete user interface for:
 * - Markdown text input with syntax highlighting placeholder
 * - File upload functionality for .md files
 * - PDF conversion via API endpoint
 * - Responsive design with modern UI/UX
 * 
 * Uses React hooks for state management and handles all user interactions
 * including form validation, file reading, and PDF download.
 */
export default function Home() {
  // State for storing markdown content from user input or file upload
  const [markdown, setMarkdown] = useState('');
  // Loading state to show conversion progress and prevent duplicate requests
  const [isConverting, setIsConverting] = useState(false);

  /**
   * Handles the conversion of markdown content to PDF
   * 
   * Process flow:
   * 1. Validate markdown input is not empty
   * 2. Send POST request to /api/convert endpoint
   * 3. Handle successful response by creating download link
   * 4. Handle errors with user-friendly messages
   * 5. Clean up resources and reset loading state
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
      // Step 1: Start conversion job
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown }),
      });

      if (response.ok) {
        // Debug: Check response content
        const responseText = await response.text();
        console.log('Response text:', responseText);

        let jobData;
        try {
          jobData = JSON.parse(responseText);
        } catch (e) {
          console.error('Failed to parse JSON:', e);
          console.error('Response was:', responseText);
          alert('Invalid response from server');
          setIsConverting(false);
          return;
        }

        const jobId = jobData.jobId;

        // Step 2: Poll for job completion
        const pollForCompletion = async () => {
          try {
            const statusResponse = await fetch(`/api/pdf-status?id=${jobId}`);
            const statusData = await statusResponse.json();

            if (statusData.status === 'completed') {
              // Step 3: Download the completed PDF
              const downloadResponse = await fetch(`/api/pdf-download?id=${jobId}`);
              const blob = await downloadResponse.blob();

              // Create temporary URL for blob to enable download
              const url = window.URL.createObjectURL(blob);
              // Create hidden anchor element for programmatic download
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              a.download = 'converted.pdf';
              // Trigger download and clean up resources
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url); // Free memory
              document.body.removeChild(a); // Remove temporary element
              setIsConverting(false);
            } else if (statusData.status === 'expired') {
              alert('PDF conversion job expired. Please try again.');
              setIsConverting(false);
            } else {
              // Still processing, poll again after 2 seconds
              setTimeout(pollForCompletion, 2000);
            }
          } catch (error) {
            console.error('Error checking job status:', error);
            alert('Error checking PDF conversion status');
            setIsConverting(false);
          }
        };

        // Start polling
        setTimeout(pollForCompletion, 2000);

      } else {
        // Parse error response and show detailed error message
        const errorData = await response.json();
        const errorMessage = errorData.details ?
          `${errorData.error}: ${errorData.details}` :
          errorData.error || 'Failed to start PDF conversion';
        alert(errorMessage);
        setIsConverting(false);
      }
    } catch (error) {
      // Log technical error for debugging and show user-friendly message
      console.error('Error converting to PDF:', error);
      alert('Error converting to PDF');
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
            placeholder="Enter your markdown here or upload a file...&#10;&#10;# Heading&#10;## Subheading&#10;&#10;- List item 1&#10;- List item 2&#10;&#10;**Bold text** and *italic text*&#10;&#10;[Link](https://example.com)&#10;&#10;```javascript&#10;// Code block&#10;console.log('Hello World');&#10;```"
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
