import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import swc from 'rollup-plugin-swc';

export default defineConfig({
    plugins: [
        tsconfigPaths(),
        swc({
            jsc: {
                parser: {
                    syntax: 'typescript',
                    tsx: true,
                    dynamicImport: true,
                    decorators: true,
                },
                target: 'es2021',
                transform: {
                    decoratorMetadata: true,
                },
            },
        }),
    ],
    esbuild: false,
    test: {
        environment: 'node',
        globals: true,
        clearMocks: true,
    },
});
