import path from 'path';
import { buildEdge } from '../utils/buildEdge.js';
import { buildServer } from '../utils/buildServer.js';
import { writeAssets } from '../utils/writeAssets.js';
export const edgeUnbundled = async (context) => {
    await writeAssets(context, path.join('s3', context.builder.config.kit.paths.base));
    await buildEdge(context, {
        source: path.join('edge-unbundled', 'edge.js'),
        entryPoint: path.join('server', 'edge', 'index.js')
    });
    await buildServer(context, {
        source: path.join('edge-unbundled', `server${context.options.stream ? '' : '-buffered'}.js`),
        entryPoint: path.join('server', 'lambda', 'index.js')
    });
};
