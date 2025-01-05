import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import json from "@rollup/plugin-json"
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts', // 入口文件
  output: {
    file: 'dist/index.js', // 输出文件
    format: 'cjs', // CommonJS 格式，适用于 Node.js
    sourcemap: true, // 生成 sourcemap
  },
  plugins: [
    resolve(), // 支持解析 node_modules
    commonjs(), // 转换 CommonJS 模块为 ES6 模块
    typescript(), // 支持 TypeScript
    json(),
    terser(), // 压缩代码
  ],
  external: ['express'], // 指定外部依赖，不打包
};
