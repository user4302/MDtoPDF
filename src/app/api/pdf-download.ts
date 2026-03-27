import { NextRequest, NextResponse } from 'next/server';

/**
 * Download endpoint for completed PDF files
 * 
 * This endpoint provides download access to completed PDF files
 * 
 * @param request - Next.js request object with job ID in query params
 * @returns PDF file as downloadable response or error
 */
export async function GET(request: NextRequest) {
  try {
    // Extract job ID from query parameters
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('id');

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    // In a real implementation, you would retrieve the PDF from storage
    // For now, return a mock PDF or error
    const jobAge = Date.now() - parseInt(jobId.split('-')[1]);
    
    if (jobAge < 30000) { // Less than 30 seconds
      return NextResponse.json({ 
        error: 'PDF not ready yet',
        jobId,
        status: 'processing'
      }, { status: 202 });
    }

    if (jobAge > 60000) { // More than 1 minute
      return NextResponse.json({ 
        error: 'PDF expired or not found',
        jobId,
        status: 'expired'
      }, { status: 404 });
    }

    // Mock PDF content for demonstration
    const mockPdfContent = `%PDF-1.4
1 0 obj
<<
/Length 44
/Filter /FlateDecode
>>
stream
5 0 obj
<</Type /Page
/Parent 2 0 R
/Contents 3 0 R
/MediaBox [0 0 612 792]
/Resources 2 0 R
/Font <</Type /Font
/Subtype /Type1
/BaseFont /Helvetica
/Encoding /WinAnsiEncoding
>>
endobj
2 0 obj
<</Type /Page
/Parent 3 0 R
/Resources 4 0 R
/Contents 5 0 R
>>
endobj
xref
0 7
0000000000 65535 f 
0000000015 00000 n 
0000000301 00000 n 
trailer
<<
/Size 302
/Root 1 0 R
startxref
%%EOF`;

    return new NextResponse(Buffer.from(mockPdfContent), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="converted-${jobId}.pdf"`
      }
    });

  } catch (error) {
    console.error('Error downloading PDF:', error);
    return NextResponse.json({ 
      error: 'Failed to download PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
