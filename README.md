# Markdown to PDF Converter 📄

A modern web-based tool that converts Markdown files to professional PDF format with clean styling and instant processing. Built with Next.js and optimized for serverless deployment.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.1.0-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black.svg)
![React](https://img.shields.io/badge/React-19.2.4-blue.svg)

## 🚀 Live Demo

Try the live application: **https://user4302-mdtopdf.netlify.app/**

## Features ✨

- 📝 **Easy Input**: Type markdown directly or upload .md files with drag-and-drop support
- ⚡ **Fast Conversion**: Instant PDF generation using browser's native print dialog with responsive typography
- 🎨 **Clean Output**: Professional-looking PDFs with GitHub-flavored styling
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🚀 **Client-Side Processing**: No server dependencies, works entirely in your browser
- 🔒 **Secure Processing**: Complete privacy - your data never leaves your computer
- 🎯 **User-Friendly**: Modern glassmorphism UI with intuitive controls and toggle settings
- 📄 **Page Break Control**: Toggle page breaks on/off or use horizontal lines with three methods
- 🏷️ **Watermark**: Add custom diagonal watermark with single or tiled pattern options

## Tech Stack / Built With 🛠️

![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black) ![React](https://img.shields.io/badge/React-19.2.4-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC) ![Marked](https://img.shields.io/badge/Marked-17.0.5-yellow)

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **PDF Generation**: Browser's native print functionality
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
3. **Convert**: Click "Convert to PDF" to open print dialog with responsive typography for any paper size
4. **Preview**: The tool supports all common markdown syntax including:
   - Headers (# ## ###)
   - Lists (ordered and unordered)
   - Code blocks and inline code
   - Links and images
   - Tables and blockquotes

### Page Breaks

Control PDF pagination using the toggle control panel and any of these methods:

**Toggle Control:**
- Use the **Page Breaks** toggle in the settings panel to enable/disable page break functionality
- **Enabled**: `---` creates page breaks, `<div class="page-break"></div>` works
- **Disabled**: `---` creates visible horizontal lines instead

**Manual Methods:**
1. **HTML Inline Style**: `<div style="page-break-after: always;"></div>`
2. **CSS Class**: `<div class="page-break"></div>`
3. **Horizontal Rule**: `---` (behavior depends on toggle setting)

Example:
```markdown
## Section 1
Content for first page...

<div class="page-break"></div>

## Section 2
Content starts on new page (when toggle is ON)
```

### Watermark

Add a custom diagonal watermark to your PDF documents with personalized text and pattern options.

**Toggle Controls:**
- **Watermark**: Enable/disable the watermark functionality
- **Custom Text**: Enter any watermark text (defaults to "DRAFT")
- **Multiple Small Watermarks**: Choose between single centered watermark or tiled pattern

**Watermark Modes:**

1. **Single Watermark** (Default):
   - Large custom text centered on each page
   - Responsive font size (60-120pt) based on text length
   - 45-degree diagonal rotation
   - 10% opacity for subtle visibility

2. **Multiple Small Watermarks**:
   - Tiled pattern of smaller custom text across entire page
   - 6×6 grid layout for consistent coverage
   - 24pt font size with 16.66% spacing
   - 10% opacity for uniform appearance

**Watermark Properties:**
- **Text**: Custom user-defined text (default: "DRAFT")
- **Rotation**: 45-degree diagonal angle
- **Opacity**: 10% for subtle visibility (both modes)
- **Color**: Black for compatibility with all printers
- **Responsive Scaling**: Font size adjusts automatically for longer text
- **Print Optimization**: CSS color adjustment ensures proper PDF rendering

**Custom Text Examples:**
- "DRAFT" - For document review processes
- "CONFIDENTIAL" - For sensitive internal documents  
- "SAMPLE" - For demonstration purposes
- "INTERNAL USE" - For company internal documents
- "DO NOT DISTRIBUTE" - For restricted documents

This feature is perfect for:
- Document review processes
- Version control during development
- Internal drafts before final publication
- Confidential document marking
- Sample document distribution

## Project Structure 📂

```
src/
└── app/
    ├── api/
    │   └── convert/
    │       └── route.ts      # Markdown-to-HTML conversion API
    ├── globals.css           # Global styles with Tailwind
    ├── layout.tsx            # Root layout component
    └── page.tsx              # Main converter UI with client-side PDF generation
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
- Serverless function routing for markdown-to-HTML conversion
- Optimized for static site generation with client-side processing

### Customization

- **Styling**: Modify `src/app/globals.css` for theme changes
- **PDF Options**: Update `src/app/page.tsx` for responsive print styling configuration
- **UI Components**: Edit `src/app/page.tsx` for interface changes
- **HTML Styling**: Modify `src/app/api/convert/route.ts` for PDF output styling

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
- [Marked.js](https://marked.js.org/) - Markdown parser
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Netlify](https://netlify.com/) - Serverless hosting platform
