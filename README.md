# Markdown to PDF Converter 📄

A modern web-based tool that converts Markdown files to professional PDF format with clean styling and instant processing. Built with Next.js and optimized for serverless deployment.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.2.2-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black.svg)
![React](https://img.shields.io/badge/React-19.2.4-blue.svg)

## 🚀 Live Demo

Try the live application: **https://user4302-mdtopdf.netlify.app/**

## Features ✨

- 📝 **Easy Input**: Type markdown directly or upload .md files with drag-and-drop support
- ⚡ **Fast Conversion**: Instant PDF generation with high-quality rendering
- 🎨 **Clean Output**: Professional-looking PDFs with GitHub-flavored styling
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🚀 **Serverless Ready**: Optimized for Netlify and other serverless platforms
- 🔒 **Secure Processing**: Client-side validation with server-side conversion
- 🎯 **User-Friendly**: Modern glassmorphism UI with intuitive controls

## Tech Stack / Built With 🛠️

![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black) ![React](https://img.shields.io/badge/React-19.2.4-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC) ![Puppeteer](https://img.shields.io/badge/Puppeteer-24.40.0-green) ![Marked](https://img.shields.io/badge/Marked-17.0.5-yellow)

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **Backend**: Next.js API Routes with serverless functions
- **PDF Generation**: Puppeteer with Windows/Linux compatibility
- **Markdown Parsing**: Marked.js with GitHub-flavored syntax
- **Deployment**: Netlify with automatic optimization

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Git for version control

## Installation 📥

```bash
# Clone the repository
git clone https://gitlab.com/user4302_Projects/coding/next-js/mdtopdf.git

# Navigate to project directory
cd mdtopdf

# Install dependencies
npm install

# Copy environment variables if needed
cp .env.example .env.local
```

## Usage / Quick Start ⚡

### Development Mode

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Basic Usage

1. **Direct Input**: Type or paste markdown content in the text area
2. **File Upload**: Click "Upload .md file" to select markdown files
3. **Convert**: Click "Convert to PDF" to generate and download your PDF
4. **Preview**: The tool supports all common markdown syntax including:
   - Headers (# ## ###)
   - Lists (ordered and unordered)
   - Code blocks and inline code
   - Links and images
   - Tables and blockquotes

## Project Structure 📂

```
src/
└── app/
    ├── api/
    │   └── convert/
    │       └── route.ts      # PDF conversion API endpoint
    ├── globals.css           # Global styles with Tailwind
    ├── layout.tsx            # Root layout component
    └── page.tsx              # Main converter UI
public/                      # Static assets
.gitignore                   # Git ignore patterns
CHANGELOG.md                 # Version history
eslint.config.mjs           # ESLint configuration
netlify.toml                # Netlify deployment config
next.config.ts              # Next.js configuration
package.json                # Dependencies and scripts
postcss.config.mjs          # PostCSS configuration
tsconfig.json               # TypeScript configuration
```

## Configuration 🔧

### Environment Variables

No environment variables required for basic functionality. All configuration is handled through Next.js config files.

### Netlify Configuration

The `netlify.toml` file includes:
- Next.js build settings and optimization
- Serverless function routing
- Puppeteer compatibility for serverless environments

### Customization

- **Styling**: Modify `src/app/globals.css` for theme changes
- **PDF Options**: Update `src/app/api/convert/route.ts` for PDF formatting
- **UI Components**: Edit `src/app/page.tsx` for interface changes

## Development / Running Locally 🏗️

```bash
# Development server with hot reload
npm run dev

# Lint code for issues
npm run lint

# Type checking
npx tsc --noEmit

# Build for production testing
npm run build
npm start
```

## Testing 🧪

```bash
# Run tests (when implemented)
npm test

# Test coverage (when implemented)
npm run test:coverage
```

*Note: Test suite is planned for future releases*

## Building for Production 🏭

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start

# Export static files (if needed)
npm run export
```

## Deployment 🚀

### Netlify (Recommended)

1. Push code to GitLab repository
2. Connect repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy automatically or manually

### Manual Deployment

```bash
# Build application
npm run build

# Deploy .next folder to your hosting provider
```

## Contributing 🤝

We welcome contributions! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Merge Request on GitLab

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Add meaningful comments to complex logic
- Test your changes before submitting

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md)

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)

## Support & Contact 👋

For questions, bugs, features, or security issues:
- **Open an issue on GitLab**: https://gitlab.com/user4302_Projects/coding/next-js/mdtopdf/-/issues
- **Merge Requests**: https://gitlab.com/user4302_Projects/coding/next-js/mdtopdf/-/merge_requests

No email or direct support provided. All support is handled through GitLab Issues.

## Acknowledgments 🙏

- [Next.js](https://nextjs.org/) - React framework
- [Puppeteer](https://pptr.dev/) - Headless browser automation
- [Marked.js](https://marked.js.org/) - Markdown parser
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Netlify](https://netlify.com/) - Serverless hosting platform
