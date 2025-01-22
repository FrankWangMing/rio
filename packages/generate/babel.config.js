import babelConfig from "@rioe/common/babel";

export default {
    ...babelConfig,
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],
}