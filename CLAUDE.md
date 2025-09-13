# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@sect/webpack-sweet-entry`, a npm package that creates Webpack entry points using glob patterns while automatically excluding files/directories prefixed with underscores and preserving directory structure.

## Core Commands

- `npm test` - Run Jest tests with coverage
- `npm run build` - Compile TypeScript to dist/
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm run lint` - Run ESLint on src/ directory
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

## Testing

- Uses Jest with ts-jest preset
- Test files located in `src/__tests__/`
- Test fixtures in `src/__tests__/files/` (ignored by Jest via testPathIgnorePatterns)
- Tests cover single/multiple extensions, glob patterns, and underscore file exclusion

## Code Standards

- TypeScript with ES2022 target, CommonJS output
- ESLint with Airbnb + TypeScript configuration
- Named exports only (no default exports per ESLint rule)
- TSDoc comments for functions
- Prettier formatting enforced