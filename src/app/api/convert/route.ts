import { NextRequest, NextResponse } from "next/server";
import { marked } from "marked";
import { createHtmlDocument } from "@/lib/html-template";

/**
 * API endpoint for converting markdown content to HTML
 *
 * This endpoint handles markdown-to-HTML conversion for client-side PDF generation:
 * 1. Converts markdown to HTML with GitHub-flavored styling
 * 2. Returns HTML content with embedded CSS for PDF generation
 * 3. Client handles PDF generation using jsPDF and html2canvas
 *
 * @param request - Next.js request object containing markdown content
 * @returns HTML response with styling for client-side PDF generation
 */
export async function POST(request: NextRequest) {
  try {
    // Parse JSON body and extract markdown content
    const { markdown, pageBreaksEnabled = true } = await request.json();

    // Validate required input
    if (!markdown) {
      return NextResponse.json(
        { error: "Markdown content is required" },
        { status: 400 },
      );
    }

    // Preprocess markdown to ensure --- is treated as horizontal rule
    // Add blank line before --- when it's directly after text to prevent Setext heading interpretation
    const processedMarkdown = markdown.replace(/([^\n])\n---/g, '$1\n\n---');
    
    // Convert markdown to HTML using marked library
    let html = await marked(processedMarkdown);
    
    // Preprocess HTML to ensure --- becomes hr instead of heading
    // Replace any h2 or h1 that might be created from --- with proper hr
    html = html.replace(/<h[12][^>]*>---<\/h[12]>/gi, '<hr>');
    
    // Also handle Setext-style headings where --- becomes underline for text
    // Look for patterns like: <h2>text</h2> followed by <p>---</p>
    html = html.replace(/<\/h[12]>\s*<p>---<\/p>/gi, '</h$1><hr>');
    
    // Preprocess HTML to prevent page breaks between descriptions and lists
    // Merge <p>**Description:**...</p> with following <ul> elements
    html = html.replace(/<p>\*\*Description:\*\*([^<]+)<\/p>\s*<ul>/gi, '<div class="milestone-section"><p><strong>Description:</strong>$1</p><ul>');
    
    // Close the milestone-section div after the list
    html = html.replace(/(<\/ul>)(\s*<p>\*\*Payment:\*\*[^<]+<\/p>)/gi, '$1</div>$2');
    
    // Also handle any remaining paragraph-to-list transitions that might cause breaks
    html = html.replace(/<\/p>\s*<ul>/g, '</p><ul class="continue-list">');
    html = html.replace(/<\/p>\s*<ol>/g, '</p><ol class="continue-list">');

    // Create complete HTML document with GitHub-flavored styling optimized for PDF
    const htmlDocument = createHtmlDocument(html, pageBreaksEnabled);

    // Return JSON with HTML content for client-side PDF generation
    return NextResponse.json({
      html: htmlDocument,
    });
  } catch (error) {
    console.error("Error converting markdown to HTML:", error);
    return NextResponse.json(
      {
        error: "Failed to convert markdown to HTML",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
