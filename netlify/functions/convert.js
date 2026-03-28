const { marked } = require('marked');
const puppeteer = require('puppeteer');

// Simple in-memory storage for testing (not for production)
const pdfStorage = new Map();

/**
 * Synchronous function for converting markdown content to PDF
 * 
 * This endpoint handles direct PDF conversion:
 * 1. Generates PDF immediately
 * 2. Returns PDF buffer directly for download
 * 
 * @param event - Netlify event object containing markdown content
 * @param context - Netlify context object
 * @returns PDF response or error response
 */
exports.handler = async function (event, context) {
  console.log('=== FUNCTION CALLED ===');

  try {
    // Parse JSON body and extract markdown content
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ error: 'Request body is required' })
      };
    }

    const { markdown } = JSON.parse(event.body);
    console.log('Parsed markdown length:', markdown.length);

    // Validate required input
    if (!markdown) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ error: 'Markdown content is required' })
      };
    }

    // Generate PDF immediately
    console.log('Starting PDF generation...');
    const pdfBuffer = await generatePdfSync(markdown);
    console.log('PDF generation completed, buffer length:', pdfBuffer?.length || 'undefined');

    if (!pdfBuffer) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({ error: 'Failed to generate PDF - no buffer returned' })
      };
    }

    // Return PDF directly for download
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="converted.pdf"',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true
    };

  } catch (error) {
    console.error('Error generating PDF:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        error: 'Failed to generate PDF',
        details: error.message || 'Unknown error'
      })
    };
  }
}

/**
 * Synchronous PDF generation function
 * This runs immediately and returns the PDF buffer
 */
async function generatePdfSync(markdown) {
  try {
    console.log('Starting PDF generation...');

    // Convert markdown to HTML using marked library
    const html = marked(markdown);

    // Create complete HTML document with GitHub-flavored styling
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
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--disable-gpu',
          '--disable-extensions',
          '--single-process', // Important for serverless
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--disable-features=VizDisplayCompositor',
          '--timeout=60000'
        ],
        timeout: 60000,
        protocolTimeout: 60000
      });
    } catch (error) {
      console.error('Failed to launch browser:', error);
      throw error;
    }

    if (!browser) {
      console.error('Browser launch failed');
      throw new Error('Browser launch failed');
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
      },
      timeout: 60000 // PDF generation timeout
    });

    // Clean up browser instance to free memory
    await browser.close();

    console.log('PDF generation completed successfully');

    // Return the PDF buffer for the main function to use
    return pdfBuffer;

  } catch (error) {
    console.error('Error generating PDF:', error);
    console.error('Error details:', error.message || 'Unknown error');
    throw error; // Re-throw to let the main function handle it
  }
}
