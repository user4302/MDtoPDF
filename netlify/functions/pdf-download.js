/**
 * Download endpoint for completed PDF files
 * 
 * This endpoint provides download access to completed PDF files
 * 
 * @param event - Netlify event object with job ID in query params
 * @param context - Netlify context object
 * @returns PDF file as downloadable response or error
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

    // In a real implementation, you would retrieve the PDF from storage
    // For now, return a mock PDF or error
    const jobAge = Date.now() - parseInt(jobId.split('-')[1]);

    if (jobAge < 30000) { // Less than 30 seconds
      return {
        statusCode: 202,
        body: JSON.stringify({
          error: 'PDF not ready yet',
          jobId,
          status: 'processing'
        })
      };
    }

    if (jobAge > 60000) { // More than 1 minute
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'PDF expired or not found',
          jobId,
          status: 'expired'
        })
      };
    }

    // Retrieve PDF from filesystem storage
    const fs = require('fs');
    const path = require('path');

    const filePath = path.join('/tmp', 'pdf-storage', `${jobId}.pdf`);

    if (fs.existsSync(filePath)) {
      const pdfBuffer = fs.readFileSync(filePath);

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="converted-${jobId}.pdf"`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: pdfBuffer.toString('base64'),
        isBase64Encoded: true
      };
    } else {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        body: JSON.stringify({
          error: 'PDF not found or still processing',
          jobId,
          status: 'processing'
        })
      };
    }

  } catch (error) {
    console.error('Error downloading PDF:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to download PDF',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}
