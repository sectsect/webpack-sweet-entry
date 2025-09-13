import * as fs from 'fs';
import * as path from 'path';
import { describe, it, expect } from 'vitest';

const distPath = path.resolve(__dirname, '../../dist');
const packageJsonPath = path.resolve(__dirname, '../../package.json');

describe('Dual Package Support', () => {
  describe('Build Output Files', () => {
    it('should have CommonJS output', () => {
      const cjsPath = path.join(distPath, 'index.js');
      expect(fs.existsSync(cjsPath)).toBe(true);

      const content = fs.readFileSync(cjsPath, 'utf-8');
      expect(content).toContain('"use strict"');
      expect(content).toContain('module.exports');
    });

    it('should have ESM output', () => {
      const esmPath = path.join(distPath, 'index.mjs');
      expect(fs.existsSync(esmPath)).toBe(true);

      const content = fs.readFileSync(esmPath, 'utf-8');
      expect(content).toContain('import');
      expect(content).not.toContain('"use strict"');
    });

    it('should have TypeScript declaration files', () => {
      const cjsDeclarationPath = path.join(distPath, 'index.d.ts');
      const esmDeclarationPath = path.join(distPath, 'index.d.mts');

      expect(fs.existsSync(cjsDeclarationPath)).toBe(true);
      expect(fs.existsSync(esmDeclarationPath)).toBe(true);

      const cjsContent = fs.readFileSync(cjsDeclarationPath, 'utf-8');
      const esmContent = fs.readFileSync(esmDeclarationPath, 'utf-8');

      // Both should contain the main export
      expect(cjsContent).toContain('WebpackSweetEntry');
      expect(esmContent).toContain('WebpackSweetEntry');
    });
  });

  describe('Package.json Configuration', () => {
    it('should have correct exports field', () => {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      expect(packageJson.exports).toBeDefined();
      expect(packageJson.exports['.']).toBeDefined();
      expect(packageJson.exports['.'].types).toBe('./dist/index.d.ts');
      expect(packageJson.exports['.'].import).toBe('./dist/index.mjs');
      expect(packageJson.exports['.'].require).toBe('./dist/index.js');
    });

    it('should have correct legacy fields', () => {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      expect(packageJson.main).toBe('dist/index.js');
      expect(packageJson.module).toBe('dist/index.mjs');
      expect(packageJson.types).toBe('dist/index.d.ts');
    });
  });

  describe('Module Compatibility', () => {
    it('should work with CommonJS require', async () => {
      const modulePath = path.join(distPath, 'index.js');

      // Dynamic import to avoid TypeScript/ESM issues
      const { createRequire } = await import('module');
      const require = createRequire(import.meta.url);

      const { WebpackSweetEntry } = require(modulePath);
      expect(typeof WebpackSweetEntry).toBe('function');

      // Test basic functionality
      const testPath = path.join(__dirname, 'files/single');
      const result = WebpackSweetEntry(path.resolve(testPath, '**/*.js'), 'js', 'js');
      expect(typeof result).toBe('object');
      expect(Object.keys(result).length).toBeGreaterThan(0);
    });

    it('should work with ESM import', async () => {
      const modulePath = path.join(distPath, 'index.mjs');

      // Dynamic import
      const module = await import(`file://${modulePath}`);
      const { WebpackSweetEntry } = module;

      expect(typeof WebpackSweetEntry).toBe('function');

      // Test basic functionality
      const testPath = path.join(__dirname, 'files/single');
      const result = WebpackSweetEntry(path.resolve(testPath, '**/*.js'), 'js', 'js');
      expect(typeof result).toBe('object');
      expect(Object.keys(result).length).toBeGreaterThan(0);
    });

    it('should produce identical results from both formats', async () => {
      const cjsPath = path.join(distPath, 'index.js');
      const esmPath = path.join(distPath, 'index.mjs');

      // Import both versions
      const { createRequire } = await import('module');
      const require = createRequire(import.meta.url);
      const { WebpackSweetEntry: cjsFunction } = require(cjsPath);
      const { WebpackSweetEntry: esmFunction } = await import(`file://${esmPath}`);

      // Test with same inputs
      const testPath = path.join(__dirname, 'files/single');
      const globPattern = path.resolve(testPath, '**/*.js');

      const cjsResult = cjsFunction(globPattern, 'js', 'js');
      const esmResult = esmFunction(globPattern, 'js', 'js');

      expect(cjsResult).toEqual(esmResult);
    });
  });
});