import { edgeBundled } from './arch/edge-bundled.js';
import { edgeUnbundled } from './arch/edge-unbundled.js';
import { lambdaMono } from './arch/lambda-mono.js';
import { lambdaS3 } from './arch/lambda-s3.js';
import { deploy } from './steps/deploy.js';
import { setup } from './steps/setup.js';
const name = 'adapter-aws';
export const adapter = (options) => {
    return {
        name,
        adapt: async (builder) => {
            const tmp = builder.getBuildDirectory(name);
            const context = {
                builder,
                options: {
                    ...options,
                    out: options?.out ?? 'build',
                    architecture: options?.architecture ?? 'lambda-s3',
                    name: options?.name ?? 'SvelteKit-App-Default',
                    memory: options?.memory ?? 128,
                    deploy: options?.deploy ?? false,
                    cdn: options?.cdn ?? false,
                    s3TransferAcceleration: options?.s3TransferAcceleration ?? false,
                    stream: options?.stream ?? true,
                    bridgeAuthToken: options?.bridgeAuthToken
                },
                tmp
            };
            builder.rimraf(context.options.out);
            builder.rimraf(tmp);
            await setup(context);
            const arch = context.options.architecture;
            const process = arch === 'lambda-s3'
                ? lambdaS3
                : arch === 'edge-bundled'
                    ? edgeBundled
                    : arch === 'edge-unbundled'
                        ? edgeUnbundled
                        : lambdaMono;
            builder.log.minor('Building...');
            await process(context);
            await deploy(context);
        }
    };
};
