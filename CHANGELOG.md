# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Draft watermark toggle functionality for PDF generation
- Diagonal "DRAFT" watermark with 50% opacity when enabled
- Draft watermark appears across all pages in PDF output
- Toggle switch in settings panel for draft watermark control
- Updated placeholder text with draft watermark documentation
- Page break support for markdown-to-PDF conversion with three trigger methods
- HTML inline style method: `<div style="page-break-after: always;"></div>`
- CSS class method: `<div class="page-break"></div>`
- Horizontal rule method: `---` (treated as page break)
- Comprehensive page break instructions in UI placeholder text
- Page break toggle control panel with on/off switch
- Dynamic placeholder text that updates based on page break setting
- Flex layout with control panel positioned to the right of input window

## [1.1.0] - 2026-03-30

### Changed
- Replaced canvas-based PDF generation with browser's native print functionality
- Removed html2canvas and jsPDF dependencies for lighter bundle size
- Simplified PDF conversion process using iframe isolation and print dialog
- Added responsive print-specific CSS with relative units (pt) for consistent text sizing
- Implemented comprehensive print styling for all markdown elements
- Updated documentation to reflect new print-based architecture

### Fixed
- Fixed JSX spacing issues in UI components
- Updated placeholder text consistency in markdown textarea
- Resolved text scaling issues across different paper sizes (A4, A3, Tabloid)
- Removed unused marked import to clean up dependencies

## [1.0.0] - 2026-03-29

### BREAKING CHANGES
- **Major Architecture Pivot**: Completely removed server-side PDF generation using Puppeteer
- PDF generation now works entirely client-side using jsPDF and html2canvas
- Eliminated all serverless binary dependencies for perfect Netlify compatibility

### Added
- Client-side PDF generation using jsPDF and html2canvas libraries
- Complete privacy protection - data never leaves user's computer
- Zero server costs and no cold-start timeouts
- High-quality PDF output with proper A4 formatting
- Seamless one-click PDF download experience

### Removed
- All Puppeteer dependencies (puppeteer, puppeteer-core, chrome-aws-lambda)
- Server-side PDF generation API endpoints
- Background function processing and status polling
- Chromium binary dependencies and serverless compatibility issues

### Changed
- Simplified API endpoint to handle only markdown-to-HTML conversion
- Updated frontend to process PDF generation entirely in browser
- Enhanced PDF styling with print-optimized CSS
- Improved error handling for client-side operations
- Updated documentation to reflect new architecture
- Streamlined project structure and dependencies

### Fixed
- **Eliminated "Chromium loop" issues** on Netlify serverless functions
- Resolved all deployment failures related to binary size limits
- Fixed cold-start timeout issues that plagued serverless approach
- Removed complex browser launch configurations and compatibility problems

### Dependencies
- Added jspdf@latest for client-side PDF generation
- Added html2canvas@latest for HTML to image conversion
- Added @types/jspdf for TypeScript support
- Removed puppeteer, puppeteer-core, and chrome-aws-lambda packages

### Benefits
- 🚀 **Zero server complexity** - No more serverless function issues
- 🔒 **Complete privacy** - Data never leaves user's device  
- 💰 **Zero server costs** - No API calls or server processing
- ⚡ **Instant conversion** - No cold-start delays
- 🌐 **Universal compatibility** - Works on any modern browser
- 📱 **Mobile friendly** - PDF generation works on all devices

## [0.4.0] - 2026-03-28

### Fixed
- Resolved Netlify deployment failures caused by Chromium binary size exceeding 50MB function limit
- Fixed serverless environment compatibility issues with Puppeteer browser launch

### Changed
- Migrated from regular `puppeteer` to `puppeteer-core` + `chrome-aws-lambda` for serverless compatibility
- Updated Netlify function to use compressed Chromium binary designed for AWS Lambda environments
- Added environment detection to automatically switch between local and serverless configurations
- Updated `netlify.toml` to external chrome-aws-lambda module for proper bundling
- Maintained all existing PDF styling and generation parameters

### Dependencies
- Added puppeteer-core@10.4.0 (lightweight Puppeteer without bundled Chromium)
- Added chrome-aws-lambda@10.1.0 (compressed Chromium for serverless environments)

## [0.3.0] - 2026-03-27

### Changed
- Convert from synchronous Next.js API routes to asynchronous Netlify background functions
- Implement job-based PDF processing with status polling and download endpoints
- Update frontend to use 3-step workflow: start conversion, poll status, download PDF
- Configure Netlify functions directory and development server settings
- Add hydration warning suppression to prevent browser extension conflicts
- Update gitignore to exclude Netlify build artifacts

## [0.2.5] - 2026-03-27

### Fixed
- Fixed Chrome binary installation on Netlify serverless environment
- Added explicit Chrome download during Netlify build process
- Resolved Chrome not found errors in serverless functions

### Changed
- Updated Netlify build command to install Chrome browsers
- Configured Puppeteer environment variables for proper Chrome detection
- Enhanced Chrome path detection with Netlify-specific paths

## [0.2.4] - 2025-10-19

### Fixed
- Improved Chrome path detection for Netlify serverless environment
- Added fallback to bundled Chromium when system Chrome is not found
- Fixed TypeScript errors with undefined path checks

### Changed
- Updated Chrome executable path configuration to try multiple system paths
- Enhanced Puppeteer launch configuration for better serverless compatibility

## [0.2.3] - 2026-03-27

### Fixed
- Fixed Puppeteer Chrome binary detection on Netlify serverless environment
- Updated Chrome executable path configuration for cross-platform compatibility
- Resolved 404 errors on API endpoints by removing incorrect Netlify redirects

### Changed
- Updated Netlify configuration for proper serverless function deployment
- Enhanced Puppeteer launch arguments for better serverless compatibility

## [0.2.2] - 2026-03-27

### Fixed
- Updated Node.js version from 18 to 20 in Netlify configuration
- Fixed build failure due to Next.js 16.2.1 requiring Node.js >= 20.9.0

## [0.2.1] - 2025-10-19

### Added
- Comprehensive code documentation with JSDoc comments
- Enhanced error handling and user feedback
- Security policy and contributing guidelines
- Improved project documentation and README
- MIT license file for open source compliance

### Changed
- Updated all source files with detailed comments
- Enhanced API endpoint documentation
- Improved configuration file explanations
- Added comprehensive CSS documentation

## [0.2.0] - 2025-10-19

### Fixed
- Improved error handling to show detailed API error messages
- Fixed text color readability issues in input areas

### Changed
- Removed redundant preview section for cleaner, focused interface
- Redesigned UI with modern glassmorphism styling and gradients
- Added helpful markdown syntax examples in input placeholder
- Improved button styling with gradient effects and animations
- Enhanced layout from two-column to single focused design

## [0.1.0] - 2025-10-19

### Added
- Markdown to PDF conversion functionality
- File upload support for .md files
- Live markdown preview panel
- PDF generation using Puppeteer
- Netlify deployment configuration
- Responsive UI with Tailwind CSS
- API endpoint for PDF conversion at /api/convert

### Changed
- Replaced default Next.js template with converter application
- Updated documentation with project-specific instructions

### Dependencies
- Added puppeteer for PDF generation
- Added marked for markdown parsing
- Added react-markdown for markdown rendering
- Added @netlify/plugin-nextjs for deployment
