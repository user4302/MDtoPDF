import { NextRequest, NextResponse } from 'next/server';

// Type definition for our PDF job storage
interface PdfJob {
  pdf: Buffer;
  status: 'processing' | 'completed';
  createdAt: number;
}

// Type definition for global storage extension
declare global {
  var pdfStorage: Map<string, PdfJob> | undefined;
}

/**
 * API endpoint for converting markdown content to PDF
 * 
 * This endpoint handles asynchronous PDF conversion:
 * 1. Returns success response immediately with job ID
 * 2. Processes PDF generation in background
 * 3. Client can check status later
 * 
 * @param request - Next.js request object containing markdown content
 * @returns Success response with job ID
 */
export async function POST(request: NextRequest) {
  try {
    // Parse JSON body and extract markdown content
    const { markdown } = await request.json();

    // Validate required input
    if (!markdown) {
      return NextResponse.json({ error: 'Markdown content is required' }, { status: 400 });
    }

    // Generate PDF immediately
    console.log('About to call generatePdfSync...');
    const pdfBuffer = await generatePdfSync(markdown);
    console.log('generatePdfSync returned, buffer length:', pdfBuffer?.length || 'undefined');

    if (!pdfBuffer) {
      return NextResponse.json({
        error: 'Failed to generate PDF - no buffer returned'
      }, { status: 500 });
    }

    // Return PDF directly for download
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="converted.pdf"'
      }
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({
      error: 'Failed to generate PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * Immediate PDF generation function
 * This runs synchronously and blocks the response
 */
async function generatePdfSync(markdown: string) {
  try {
    console.log('🚀 Starting PDF generation');
    console.log('📝 Input markdown length:', markdown.length);
    console.log('📝 Input markdown preview:', markdown.substring(0, 100) + '...');

    // Import dependencies dynamically to avoid blocking
    console.log('📦 Importing dependencies...');
    const { marked } = await import('marked');
    const puppeteer = await import('puppeteer');
    console.log('✅ Dependencies imported successfully');

    // Convert markdown to HTML using marked library
    console.log('🔄 Converting markdown to HTML...');
    const html = await marked(markdown);
    console.log('✅ HTML conversion completed');
    console.log('📄 Generated HTML length:', html.length);
    console.log('📄 Generated HTML preview:', html.substring(0, 200) + '...');

    // Create complete HTML document with GitHub-flavored styling
    console.log('🎨 Creating HTML document with styling...');
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
    console.log('🌐 Launching Puppeteer browser...');
    let browser;
    try {
      const puppeteerModule = puppeteer as any;
      console.log('🔧 Browser launch args configured');
      browser = await puppeteerModule.launch({
        headless: 'new', // Use new headless mode
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
          '--disable-features=VizDisplayCompositor', // Fix for PDF generation
          '--timeout=60000'         // Increase timeout
        ],
        timeout: 60000, // 60 second timeout for browser launch
        protocolTimeout: 60000 // Protocol timeout
      });
      console.log('✅ Browser launched successfully');
    } catch (error) {
      console.error('❌ Failed to launch browser:', error);
      throw error;
    }

    if (!browser) {
      console.error('❌ Browser launch failed - browser is null');
      throw new Error('Browser launch failed');
    }

    // Create new page for PDF generation
    console.log('📄 Creating new page...');
    const page = await browser.newPage();
    console.log('✅ Page created successfully');

    // Set HTML content and wait for all resources to load
    console.log('📝 Setting HTML content...');
    await page.setContent(htmlDocument, { waitUntil: 'networkidle0' });
    console.log('✅ HTML content set successfully');

    // Generate PDF with A4 format and professional margins
    console.log('📊 Generating PDF...');
    const pdfArrayBuffer = await page.pdf({
      format: 'A4',              // Standard paper size
      printBackground: true,     // Include background colors and images
      margin: {
        top: '20mm',    // Top margin
        right: '20mm',  // Right margin
        bottom: '20mm', // Bottom margin
        left: '20mm'    // Left margin
      },
      timeout: 60000 // PDF generation timeout
    });
    console.log('✅ PDF generated successfully');
    console.log('📏 PDF buffer length:', pdfArrayBuffer.length);
    console.log('📏 PDF buffer type:', typeof pdfArrayBuffer);

    // Clean up browser instance to free memory
    console.log('🧹 Cleaning up browser...');
    await browser.close();
    console.log('✅ Browser cleanup completed');

    console.log('🎉 PDF generation completed successfully');

    // Return the PDF buffer for the main function to use
    return pdfArrayBuffer;

    // PDF generation completed successfully

  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    console.error('❌ Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack available');
    throw error; // Re-throw to let the main function handle it
  }
}
