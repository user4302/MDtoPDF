# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
