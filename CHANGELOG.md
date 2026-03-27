# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
