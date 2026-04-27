import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

    // Check if we have the job in file system storage

    const tempDir = path.join('/tmp', 'pdf-jobs');
    const jobFile = path.join(tempDir, `${jobId}.json`);

    if (!fs.existsSync(jobFile)) {
      return NextResponse.json({
        error: 'PDF not found or still processing',
        jobId,
        status: 'not_found'
      }, { status: 404 });
    }

    const jobData = JSON.parse(fs.readFileSync(jobFile, 'utf8'));

    if (!jobData) {
      return NextResponse.json({
        error: 'PDF not found or still processing',
        jobId,
        status: 'not_found'
      }, { status: 404 });
    }

    // Check job age for expiration
    const jobAge = Date.now() - jobData.createdAt;

    if (jobAge > 60000) { // More than 1 minute
      return NextResponse.json({
        error: 'PDF expired or not found',
        jobId,
        status: 'expired'
      }, { status: 404 });
    }

    if (jobAge < 30000) { // Less than 30 seconds
      return NextResponse.json({
        error: 'PDF still processing',
        jobId,
        status: 'processing'
      }, { status: 202 });
    }

    // Return the actual PDF
    const pdfBuffer = Buffer.from(jobData.pdf, 'base64');
    return new NextResponse(new Uint8Array(pdfBuffer), {
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
