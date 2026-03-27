import { NextRequest, NextResponse } from 'next/server';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

/**
 * API endpoint for converting markdown content to PDF
 * @param request - Next.js request object containing markdown content in JSON body
 * @returns PDF file as response or error message
 */
export async function POST(request: NextRequest) {
  try {
    const { markdown } = await request.json();

    if (!markdown) {
      return NextResponse.json({ error: 'Markdown content is required' }, { status: 400 });
    }

    // Convert markdown to HTML
    const html = marked(markdown);

    // Create HTML document with styling
    const htmlDocument = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: white;
          }
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
          p { margin-bottom: 16px; }
          ul, ol { padding-left: 2em; margin-bottom: 16px; }
          li { margin-bottom: 4px; }
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

    // Launch Puppeteer
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ]
      });
    } catch (error) {
      console.error('Failed to launch browser:', error);
      return NextResponse.json({ error: 'Failed to initialize PDF generation' }, { status: 500 });
    }

    const page = await browser.newPage();

    // Set content and wait for it to load
    await page.setContent(htmlDocument, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    await browser.close();

    // Return PDF as response
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="converted.pdf"'
      }
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
