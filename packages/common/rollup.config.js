
import path from 'path';

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs"
import json from '@rollup/plugin-json';

const shouldMinify = false;
// const shouldMinify = process.env.NODE_ENV === 'production';
const bundle = ['tslib'];

const injectPackageVersion = async () => {

  const pkg = await import(path.resolve(process.cwd(),'./package.json'), { with: { type: 'json' } });
  return `
if ( typeof window !== 'undefined' ) {
  if ( !window['__CRAFTJS__'] ) {
    window['__CRAFTJS__'] = {};
  }

  window['__CRAFTJS__']["${pkg.name}"] = "${pkg.version}";
}
  `;
};

export default [{
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.mjs', // 输出的单一文件
      format: 'es',           // 模块格式
      intro: injectPackageVersion(),
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs',
      intro: injectPackageVersion(),
      format: 'cjs',
      sourcemap: true,
    },
  ],
}].map((entry) => ({
  ...entry,
  plugins: [
    resolve(), // 支持解析 TS 和 TSX 文件
    commonjs(),
    typescript({
    }),
    babel({
      babelHelpers:"runtime",
      include:"src/**",
      exclude:["node_modules/**"],
      extensions:['.js','.jsx','.ts','.tsx']
    }),
    json(),
    shouldMinify &&
      terser({
        output: { comments: 'some' },
        compress: {
          keep_infinity: true,
          pure_getters: true,
          passes: 10,
        },
        ecma: 5,
        warnings: true,
        mangle: {
          reserved: ['Canvas'],
        },
      }),
  ],
  external: (id) => {
    // /@babel\/runtime-corejs3|core-js/.test(id)&&
    return !id.startsWith('.') && !path.isAbsolute(id) && !bundle.includes(id);
  }
}));;
