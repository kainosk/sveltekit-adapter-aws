import { build } from 'esbuild';
import path from 'path';
import { root } from '../utils/root.js';
export const buildServer = async ({ tmp, builder, options }, { source, entryPoint }) => {
    const serverEntryPoint = path.join(tmp, entryPoint);
    builder.copy(path.join(root, 'embed', 'arch', source), serverEntryPoint);
    await build({
        format: 'cjs',
        bundle: true,
        minify: true,
        external: ['node:*', '@aws-sdk/*'],
        ...options.esbuild,
        entryPoints: [serverEntryPoint],
        outfile: path.join(options.out, 'lambda', 'server.js'),
        platform: 'node',
        inject: [path.join(root, 'embed', 'shims.ts')]
    });
};
