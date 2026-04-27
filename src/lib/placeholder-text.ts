/**
 * Generate placeholder text for the markdown textarea based on feature settings
 * @param pageBreaksEnabled - Whether page breaks are enabled
 * @param draftEnabled - Whether watermark is enabled
 * @param watermarkText - The watermark text to display
 * @param multipleDraftEnabled - Whether multiple watermarks should be used
 * @returns Complete placeholder text string
 */
export function generatePlaceholderText({
  pageBreaksEnabled = true,
  draftEnabled = false,
  watermarkText = 'DRAFT',
  multipleDraftEnabled = false
}: {
  pageBreaksEnabled?: boolean;
  draftEnabled?: boolean;
  watermarkText?: string;
  multipleDraftEnabled?: boolean;
}): string {
  const baseText = `Enter your markdown here or upload a file...

# Heading
## Subheading

- List item 1
- List item 2

**Bold text** and *italic text*

[Link](https://example.com)

\`\`\`javascript 
// Code block
console.log('Hello World');
\`\`\``;

  const pageBreakText = pageBreaksEnabled ? `

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

Use --- to create visible horizontal lines between sections.`;

  const watermarkSection = draftEnabled ? `

--- WATERMARK ---

Watermark is enabled. "${watermarkText}" will appear diagonally across all pages in the PDF.${multipleDraftEnabled ? `

Multiple small "${watermarkText}" texts will repeat across the page instead of a single large text.` : ''}` : '';

  return baseText + pageBreakText + watermarkSection;
}
