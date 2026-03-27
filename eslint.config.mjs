import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * ESLint configuration for Next.js project
 * Combines Next.js recommended rules for TypeScript and Core Web Vitals
 * with custom ignore patterns for build outputs
 */
const eslintConfig = defineConfig([
  // Apply Next.js Core Web Vitals rules for performance best practices
  ...nextVitals,
  // Apply Next.js TypeScript rules for type safety and code quality
  ...nextTs,
  // Override default ignores of eslint-config-next to customize ignored paths
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",        // Next.js build output directory
    "out/**",          // Static export output directory
    "build/**",        // General build output directory
    "next-env.d.ts",   // Next.js environment type definitions
  ]),
]);

export default eslintConfig;
