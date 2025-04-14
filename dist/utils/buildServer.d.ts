import { Context } from '../types/Context.js';
export declare const buildServer: ({ tmp, builder, options }: Context, { source, entryPoint }: {
    source: string;
    entryPoint: string;
}) => Promise<void>;
