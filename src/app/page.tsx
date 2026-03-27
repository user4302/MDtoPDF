'use client';

import { useState } from 'react';

/**
 * Main Markdown to PDF converter component
 * Provides UI for markdown input, file upload, and PDF conversion
 */
export default function Home() {
  const [markdown, setMarkdown] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  /**
   * Handles the conversion of markdown content to PDF
   * Sends markdown to API endpoint and downloads the resulting PDF
   */
  const handleConvertToPdf = async () => {
    if (!markdown.trim()) {
      alert('Please enter some markdown content');
      return;
    }

    setIsConverting(true);
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'converted.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Failed to convert to PDF');
      }
    } catch (error) {
      console.error('Error converting to PDF:', error);
      alert('Error converting to PDF');
    } finally {
      setIsConverting(false);
    }
  };

  /**
   * Handles file upload for markdown files (.md)
   * Reads file content and updates the markdown state
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/markdown') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdown(content);
      };
      reader.readAsText(file);
    } else if (file && file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdown(content);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a markdown file (.md)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Markdown to PDF Converter</h1>
          <p className="text-gray-600">Convert your markdown files to PDF instantly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Markdown Input</h2>
              <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-colors">
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
              placeholder="Enter your markdown here or upload a file..."
              className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              onClick={handleConvertToPdf}
              disabled={isConverting || !markdown.trim()}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isConverting ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
            <div className="h-96 p-4 border border-gray-300 rounded-lg overflow-auto bg-gray-50">
              {markdown ? (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-mono text-sm">{markdown}</pre>
                </div>
              ) : (
                <div className="text-gray-400 text-center mt-32">
                  Your markdown preview will appear here...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-blue-500 text-3xl mb-3">📝</div>
            <h3 className="font-semibold text-gray-800 mb-2">Easy Input</h3>
            <p className="text-gray-600 text-sm">Type directly or upload markdown files</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-green-500 text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Fast Conversion</h3>
            <p className="text-gray-600 text-sm">Instant PDF generation with high quality</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-purple-500 text-3xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">Clean Output</h3>
            <p className="text-gray-600 text-sm">Professional-looking PDFs every time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
