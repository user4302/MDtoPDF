# Contributing to Markdown to PDF Converter

Thank you for your interest in contributing to the Markdown to PDF Converter! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

- **Bug Reports**: Use GitLab Issues to report bugs with detailed information
- **Feature Requests**: Open an issue with the "enhancement" label
- **Security Issues**: Report security vulnerabilities privately through GitLab Issues

### Development Workflow

1. **Fork the Repository**
   ```bash
   # Fork on GitLab and clone your fork
   git clone https://gitlab.com/YOUR_USERNAME/mdtopdf.git
   cd mdtopdf
   ```

2. **Set Up Development Environment**
   ```bash
   # Install dependencies
   npm install
   
   # Start development server
   npm run dev
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes
   git checkout -b fix/bug-description
   ```

4. **Make Your Changes**
   - Follow the coding standards below
   - Add tests for new functionality
   - Update documentation if needed

5. **Commit Your Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   # Use conventional commit format
   ```

6. **Push and Create Merge Request**
   ```bash
   git push origin feature/your-feature-name
   # Create Merge Request on GitLab
   ```

## 📝 Coding Standards

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the ESLint configuration in `eslint.config.mjs`
- **Prettier**: Use Prettier for consistent formatting (if configured)
- **Comments**: Add meaningful comments to complex logic

### File Naming

- Use kebab-case for file names: `component-name.tsx`
- Use descriptive names that reflect functionality

### Component Structure

```tsx
/**
 * Component description
 * 
 * @param props - Component props
 * @returns JSX element
 */
export default function ComponentName(props: Props) {
  // State and hooks
  
  // Helper functions
  
  // Event handlers
  
  return (
    // JSX
  );
}
```

### API Endpoints

```tsx
/**
 * API endpoint description
 * 
 * @param request - Next.js request object
 * @returns Next.js response with appropriate status
 */
export async function POST(request: NextRequest) {
  try {
    // Implementation
  } catch (error) {
    // Error handling
  }
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Writing Tests

- Test files should be named `*.test.ts` or `*.test.tsx`
- Use descriptive test names
- Test both happy path and error cases
- Mock external dependencies

## 📋 Types of Contributions

### Bug Fixes

- Fix reported issues with proper error handling
- Add tests to prevent regressions
- Update CHANGELOG.md

### New Features

- Implement new functionality following the existing patterns
- Add comprehensive tests
- Update documentation (README.md, API docs)
- Consider backward compatibility

### Documentation

- Improve existing documentation
- Add examples and tutorials
- Fix typos and grammatical errors
- Translate documentation (if applicable)

### Performance Improvements

- Optimize code for better performance
- Reduce bundle size
- Improve loading times
- Add performance tests

## 🔄 Git Workflow

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/code-refactoring` - Code refactoring
- `test/add-tests` - Adding tests

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(api): add PDF quality options
fix(ui): resolve file upload issue on mobile
docs(readme): update installation instructions
```

### Merge Request Guidelines

1. **Title**: Use conventional commit format
2. **Description**: Explain what changes were made and why
3. **Screenshots**: Include screenshots for UI changes
4. **Testing**: Describe how you tested your changes
5. **Documentation**: Mention any documentation updates

## 🚀 Release Process

### Version Management

- Follow [Semantic Versioning](https://semver.org/)
- Update CHANGELOG.md for each release
- Tag releases in Git

### Release Checklist

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Version number is updated in package.json
- [ ] Git tag is created

## 🏷️ Labels

Use these labels on GitLab Issues and Merge Requests:

- `bug` - Bug reports and fixes
- `enhancement` - Feature requests
- `documentation` - Documentation changes
- `good first issue` - Good for newcomers
- `help wanted` - Community help needed
- `priority/high` - High priority
- `priority/medium` - Medium priority
- `priority/low` - Low priority

## 💬 Getting Help

- **GitLab Issues**: For bugs and feature requests
- **Discussions**: For general questions and ideas
- **Code Review**: Request reviews from maintainers

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Recognition

Contributors are recognized in:
- README.md contributors section
- GitLab contributor statistics
- Release notes for significant contributions

Thank you for contributing to the Markdown to PDF Converter! 🎉
