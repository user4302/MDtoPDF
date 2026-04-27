import { NextRequest, NextResponse } from 'next/server';
import { mockPdfContent } from '@/lib/mock-pdf';

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

    // Use mock PDF content from dedicated file

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
