import { NextRequest, NextResponse } from 'next/server';

/**
 * Status endpoint for checking PDF conversion progress
 * 
 * This endpoint allows clients to check the status of background PDF jobs
 * 
 * @param request - Next.js request object with job ID in query params
 * @returns Status information about the PDF conversion job
 */
export async function GET(request: NextRequest) {
  try {
    // Extract job ID from query parameters
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('id');

    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    // In a real implementation, you would check a database or storage
    // For now, return a mock status based on job ID pattern
    const jobAge = Date.now() - parseInt(jobId.split('-')[1]);
    
    let status = 'processing';
    if (jobAge > 30000) { // 30 seconds
      status = 'completed';
    }
    if (jobAge > 60000) { // 1 minute
      status = 'expired';
    }

    return NextResponse.json({
      jobId,
      status,
      message: status === 'completed' ? 'PDF generation completed' : 
               status === 'expired' ? 'Job expired' : 
               'PDF generation in progress',
      downloadUrl: status === 'completed' ? `/.netlify/functions/pdf-download?id=${jobId}` : null
    });

  } catch (error) {
    console.error('Error checking PDF status:', error);
    return NextResponse.json({ 
      error: 'Failed to check job status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
