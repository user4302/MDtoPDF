# Security Policy

## Supported Versions

| Version | Supported          |
|---------|-------------------|
| 0.2.x   | ✅ Supported      |
| 0.1.x   | ❌ Unsupported    |

## Reporting a Vulnerability

### How to Report

**Please DO NOT report security vulnerabilities publicly.** Instead, report them privately through GitLab Issues:

1. **Create a Private Issue**: 
   - Go to [GitLab Issues](https://gitlab.com/user4302_Projects/coding/next-js/mdtopdf/-/issues)
   - Click "New issue"
   - Set confidentiality to "Only team members"
   - Use the "Security" label

2. **Include the Following Information**:
   - Type of vulnerability (XSS, injection, etc.)
   - Steps to reproduce the issue
   - Potential impact
   - Any proof-of-concept code (if applicable)
   - Environment details (browser, OS, version)

3. **What to Expect**:
   - Initial response within 48 hours
   - Detailed assessment within 7 days
   - Patch timeline based on severity
   - Public disclosure after fix is deployed

### Vulnerability Types

We consider the following as security vulnerabilities:

- **Cross-Site Scripting (XSS)**: Injection of malicious scripts
- **File Upload Vulnerabilities**: Malicious file handling
- **Server-Side Injection**: Code injection in API endpoints
- **Authentication Bypass**: Unauthorized access to features
- **Data Exposure**: Sensitive information leakage
- **Denial of Service**: Resource exhaustion attacks
- **Dependency Vulnerabilities**: Security issues in dependencies

### Severity Levels

#### Critical (9.0-10.0)
- Remote code execution
- Complete system compromise
- Widespread data exposure

#### High (7.0-8.9)
- Significant data exposure
- Privilege escalation
- Authentication bypass

#### Medium (4.0-6.9)
- Limited data exposure
- Local file inclusion
- Cross-site scripting with user interaction

#### Low (0.1-3.9)
- Information disclosure
- Minor security issues
- Best practice violations

## Security Best Practices

### For Users

1. **Keep Updated**: Always use the latest version
2. **Input Validation**: Validate all markdown input
3. **File Handling**: Be cautious with uploaded files
4. **Network Security**: Use HTTPS in production

### For Developers

1. **Input Sanitization**: Sanitize all user input
2. **Output Encoding**: Encode all output to prevent XSS
3. **File Validation**: Validate uploaded file types and sizes
4. **Dependencies**: Regularly update dependencies
5. **Code Review**: Review all code for security issues

### Current Security Measures

- **Input Validation**: Client and server-side validation
- **File Type Checking**: Restrict file uploads to .md files
- **Content Security Policy**: CSP headers for XSS protection
- **Dependency Scanning**: Regular security updates
- **Serverless Isolation**: Netlify's secure environment

## Security Updates

### Patch Process

1. **Assessment**: Evaluate vulnerability severity and impact
2. **Development**: Create and test security patches
3. **Release**: Deploy patches with security advisories
4. **Disclosure**: Public disclosure after patch deployment

### Update Channels

- **Security Advisories**: Published in GitLab Issues
- **Release Notes**: Security updates documented in CHANGELOG.md
- **Dependency Updates**: Automated security updates for dependencies

## Security Team

The security team reviews and responds to all security reports:

- **Response Time**: Within 48 hours
- **Assessment**: Within 7 days
- **Resolution**: Based on severity and complexity

## Acknowledgments

We thank security researchers and users who help us maintain the security of the Markdown to PDF Converter.

### Hall of Fame

Security researchers who have contributed to our security:

*To be updated as vulnerabilities are reported and fixed*

## Legal

This security policy is provided "as is" without warranty of any kind. We reserve the right to modify this policy at any time.

---

**Remember**: Security is everyone's responsibility. If you find a vulnerability, please report it responsibly.
