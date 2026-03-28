/**
 * Status endpoint for checking PDF conversion progress
 * 
 * This endpoint allows clients to check the status of background PDF jobs
 * 
 * @param event - Netlify event object with job ID in query params
 * @param context - Netlify context object
 * @returns Status information about the PDF conversion job
 */
exports.handler = async function (event, context) {
  try {
    // Extract job ID from query parameters
    const jobId = event.queryStringParameters.id;

    if (!jobId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Job ID is required' })
      };
    }

    // Check if we have the job in storage
    // Note: This would need to be shared across functions in production
    const jobAge = Date.now() - parseInt(jobId.split('-')[1]);

    let status = 'processing';
    let downloadUrl = null;

    // For demo purposes, check if job is old enough to be "completed"
    if (jobAge > 30000) { // 30 seconds
      status = 'completed';
      downloadUrl = `/.netlify/functions/pdf-download?id=${jobId}`;
    }
    if (jobAge > 60000) { // 1 minute
      status = 'expired';
      downloadUrl = null;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        jobId,
        status,
        message: status === 'completed' ? 'PDF generation completed' :
          status === 'expired' ? 'Job expired' :
            'PDF generation in progress',
        downloadUrl: status === 'completed' ? `/.netlify/functions/pdf-download?id=${jobId}` : null
      })
    };

  } catch (error) {
    console.error('Error checking PDF status:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to check job status',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}
