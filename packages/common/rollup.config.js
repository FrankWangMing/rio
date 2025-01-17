
import path from 'path';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from "@rollup/plugin-commonjs"
import json from '@rollup/plugin-json';
import os from 'os';

const shouldMinify = false;
// const shouldMinify = process.env.NODE_ENV === 'production';
const bundle = ['tslib'];

const injectPackageVersion = async () => {
  let pkgPath = '';
  pkgPath = path.resolve(process.cwd(), 'package.json');
  const currentOS = os.platform();
  if (currentOS === 'win32') {
    pkgPath = `file://${pkgPath.replace(/\\/g, '/')}`;
  }
  const pkg = await import(pkgPath, { with: { type: 'json' } });
  return `
if ( typeof window !== 'undefined' ) {
  if ( !window['RIO'] ) {
    window['RIO'] = {};
  }

  window['RIO']["${pkg.name}"] = "${pkg.version}";
}
  `;
};

function checkNodeEnv() {
  return process.env.NODE_ENV === 'production';
}
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
      sourcemap: checkNodeEnv()?false:true,
    },
    {
      file: 'dist/index.cjs',
      intro: injectPackageVersion(),
      format: 'cjs',
      sourcemap: checkNodeEnv()?false:true,
    },
  ],
}].map((entry) => ({
  ...entry,
  plugins: [
    alias({
      entries: [
        { find: '@rioe', replacement: path.resolve(path.dirname('../../')) },
      ]
    }),
    resolve(
      {
        extensions:['.js', '.mjs'], // 确保包含常见的文件扩展名
        preferBuiltins: true,
      }
    ), // 支持解析 TS 和 TSX 文件
    commonjs(),
    typescript({}),
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
