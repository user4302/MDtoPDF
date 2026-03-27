import { NextRequest, NextResponse } from 'next/server';
import { marked } from 'marked';
import puppeteer from 'puppeteer';
import fs from 'fs';

/**
 * API endpoint for converting markdown content to PDF
 * 
 * This endpoint handles the complete conversion process:
 * 1. Parses markdown input using marked library
 * 2. Creates styled HTML document with GitHub-style CSS
 * 3. Uses Puppeteer to generate PDF from HTML
 * 4. Returns PDF file as downloadable response
 * 
 * @param request - Next.js request object containing markdown content in JSON body
 * @returns PDF file as response or error message with appropriate status code
 */
export async function POST(request: NextRequest) {
  try {
    // Parse JSON body and extract markdown content
    const { markdown } = await request.json();

    // Validate required input
    if (!markdown) {
      return NextResponse.json({ error: 'Markdown content is required' }, { status: 400 });
    }

    // Convert markdown to HTML using marked library
    const html = marked(markdown);

    // Create complete HTML document with GitHub-flavored styling
    // This ensures the PDF has professional typography and layout
    const htmlDocument = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
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
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;

    // Launch Puppeteer with serverless-compatible configuration
    // Use bundled Chromium that comes with puppeteer
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true, // Run in headless mode for server environments
        args: [
          '--no-sandbox',           // Required for running in containers/Linux
          '--disable-setuid-sandbox', // Additional sandbox security
          '--disable-dev-shm-usage',  // Prevent memory issues in Docker
          '--disable-accelerated-2d-canvas', // Reduce GPU dependency
          '--no-first-run',          // Skip first-run setup
          '--disable-gpu',           // Disable GPU acceleration
          '--disable-extensions',     // Disable browser extensions
          '--disable-background-timer-throttling', // Prevent timing issues
          '--disable-backgrounding-occluded-windows', // Windows compatibility
          '--disable-renderer-backgrounding', // Prevent background rendering
        ],
        timeout: 30000 // 30 second timeout for browser launch
      });
    } catch (error) {
      console.error('Failed to launch browser:', error);
      return NextResponse.json({
        error: 'Failed to initialize PDF generation. This might be due to missing Chromium binaries on Windows.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

    // Create new page for PDF generation
    const page = await browser.newPage();

    // Set HTML content and wait for all resources to load
    // networkidle0 ensures no more than 0 network connections for 500ms
    await page.setContent(htmlDocument, { waitUntil: 'networkidle0' });

    // Generate PDF with A4 format and professional margins
    const pdfBuffer = await page.pdf({
      format: 'A4',              // Standard paper size
      printBackground: true,     // Include background colors and images
      margin: {
        top: '20mm',    // Top margin
        right: '20mm',  // Right margin
        bottom: '20mm', // Bottom margin
        left: '20mm'    // Left margin
      }
    });

    // Clean up browser instance to free memory
    await browser.close();

    // Return PDF as downloadable file response
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',                      // PDF MIME type
        'Content-Disposition': 'attachment; filename="converted.pdf"' // Trigger download
      }
    });

  } catch (error) {
    // Global error handler for any unexpected errors during conversion
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
