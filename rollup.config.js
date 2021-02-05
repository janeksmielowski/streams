import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const external = [
    'lodash.isequal'
];

const plugins = [
    nodeResolve({
        browser: true,
        jsnext: true,
        main: true
    }),
    commonjs(),
    typescript()
];

export default [
    {
        external,
        input: './src/index.ts',
        output: {
            file: './lib/index.esm.js',
            format: 'esm'
        },
        plugins
    },
    {
        external,
        input: './src/index.ts',
        output: {
            exports: 'named',
            file: './lib/index.js',
            format: 'cjs'
        },
        plugins
    }
];
