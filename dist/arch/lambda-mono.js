import path from 'path';
import { buildServer } from '../utils/buildServer.js';
import { writeAssets } from '../utils/writeAssets.js';
export const lambdaMono = async (context) => {
    await writeAssets(context, path.join('lambda', 'assets'));
    await buildServer(context, {
        source: `lambda-mono${context.options.stream ? '' : '-buffered'}.js`,
        entryPoint: path.join('lambda', 'index.js')
    });
};
