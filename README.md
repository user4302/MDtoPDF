# Markdown to PDF Converter

A web-based tool that converts Markdown files to PDF format with clean, professional styling. Built with Next.js and deployable on Netlify.

## Features

- 📝 **Easy Input**: Type markdown directly or upload .md files
- ⚡ **Fast Conversion**: Instant PDF generation with high quality
- 🎨 **Clean Output**: Professional-looking PDFs with proper styling
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **Netlify Ready**: Optimized for Netlify deployment

## Getting Started

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Netlify

### Automatic Deployment

1. Push your code to a GitHub repository
2. Connect your repository to Netlify
3. Netlify will automatically detect the Next.js app and deploy it

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `.next` folder to Netlify

## Configuration

The project includes a `netlify.toml` configuration file that handles:
- Next.js build settings
- Function routing for API endpoints
- Puppeteer compatibility for serverless functions

## Technology Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **PDF Generation**: Puppeteer
- **Markdown Parsing**: Marked.js
- **Deployment**: Netlify

## API Endpoint

The application uses a POST endpoint at `/api/convert` that:
- Accepts JSON with markdown content
- Converts markdown to HTML
- Generates PDF using Puppeteer
- Returns PDF file for download

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Puppeteer Documentation](https://pptr.dev/) - learn about PDF generation
- [Marked.js Documentation](https://marked.js.org/) - learn about markdown parsing
- [Netlify Documentation](https://docs.netlify.com/) - learn about deployment

## Contributing

Your feedback and contributions are welcome! Feel free to submit issues and enhancement requests.
