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
 * Status endpoint for PDF conversion jobs
 * 
 * This endpoint allows clients to check the conversion progress of background PDF jobs
 * 
 * @param request - Next.js request object with job ID in query params
 * @returns Status information or error
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
        error: 'PDF job not found',
        jobId,
        status: 'not_found'
      }, { status: 404 });
    }

    const jobData = JSON.parse(fs.readFileSync(jobFile, 'utf8'));

    if (!jobData) {
      return NextResponse.json({
        error: 'PDF job not found',
        jobId,
        status: 'not_found'
      }, { status: 404 });
    }

    // Check job age for expiration
    const jobAge = Date.now() - jobData.createdAt;

    let status = 'processing';
    let downloadUrl = null;

    // For demo purposes, check if job is old enough to be "completed"
    if (jobAge > 30000) { // 30 seconds
      status = 'completed';
      downloadUrl = `/api/pdf-download?id=${jobId}`;
    }
    if (jobAge > 60000) { // 1 minute
      status = 'expired';
      downloadUrl = null;
    }

    return NextResponse.json({
      jobId,
      status,
      downloadUrl,
      createdAt: jobData.createdAt,
      age: jobAge
    });

  } catch (error) {
    console.error('Error checking PDF status:', error);
    return NextResponse.json({
      error: 'Failed to check PDF status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
