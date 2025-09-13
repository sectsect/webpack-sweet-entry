# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@sect/webpack-sweet-entry`, a npm package that creates Webpack entry points using glob patterns while automatically excluding files/directories prefixed with underscores and preserving directory structure. The package supports dual distribution (CommonJS and ESModule) and requires Node.js 20+.

## Core Commands

- `npm test` - Run Vitest tests with coverage
- `npm run test:watch` - Run Vitest in watch mode for development
- `npm run test:ui` - Run Vitest with interactive UI
- `npm run build` - Build with tsup to create dual package (CJS + ESM) in dist/
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm run type-check:watch` - Run TypeScript type checking in watch mode
- `npm run lint` - Run ESLint on src/ and src/__tests__/ directories
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## Architecture

### Core Function
The main export is `WebpackSweetEntry(paths, ext, parentdir)` in `src/index.ts` which:
1. Uses `fast-glob` to find files matching the provided patterns
2. Filters out files/directories starting with underscore via `dropUnderscoreFiles()`
3. Extracts entry point keys by removing the parent directory and file extension
4. Returns an object mapping entry names to file paths

### Key Behaviors
- **Underscore filtering**: Files like `_partial.js` and directories like `_modules/` are automatically excluded
- **Directory preservation**: Input structure `src/js/components/modal.js` becomes entry key `components/modal`
- **Multi-extension support**: Can handle single extensions (`'js'`) or arrays (`['ts', 'js']`)

### Build System
- **tsup**: Builds dual package with CommonJS and ESModule exports
- **Target**: Node.js 20+ with ES2023 features
- **Output**: `dist/index.js` (CJS), `dist/index.mjs` (ESM), `dist/index.d.ts` (types)

## Testing

- Uses Vitest with v8 coverage provider
- Test files: `src/**/*.test.ts` pattern
- Test fixtures: `src/__tests__/files/` (excluded from test execution)
- Coverage includes all `src/**` files except tests, configs, and type definitions
- Tests cover single/multiple extensions, glob patterns, and underscore file exclusion

## Code Standards

- TypeScript with ES2023 target, dual CommonJS/ESModule output
- ESLint with Airbnb + TypeScript configuration
- Named exports only (no default exports per ESLint rule, except tsup.config.ts)
- TSDoc comments for functions
- Prettier formatting enforced
- Spotify TypeScript configuration as base