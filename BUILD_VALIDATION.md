# Build & Source Validation

## Source validation completed

- Parsed **154** JavaScript/JSX/TypeScript source files with Babel parser: **0 syntax errors**.
- Resolved local relative and `@/` imports across the source tree: **0 missing local imports**.
- Audited static internal links created during the refactor; new navigation/footer/editorial/policy links resolve to real application routes.

## Production build attempt in this sandbox

`npm run build` reaches Next.js 16.3.0, but the sandbox cannot load the Linux SWC native binary because the ZIP-provided dependency tree was created on Windows and this environment has no package-registry access to download the Linux-native package.

This is an environment/native-dependency issue rather than a source parse/import failure. The project intentionally excludes `node_modules` from the delivery ZIP. Run the following on the target OS:

```bash
npm install
npm run build
```

A fresh install will select the correct native Next.js/SWC package for that platform.
