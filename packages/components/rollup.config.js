import rollupConfig from '@rioe/common/rollup';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
export default rollupConfig.map(config => {
    return {
        ...config,
        input: './src/index.tsx',
        plugins: [
            ...config.plugins,
            postcss({
                config: {
                  path: './postcss.config.js',
                },
                extensions: ['.css'],
                minimize: true,
                inject: {
                  insertAt: 'top',
                },
                plugins: [
                    tailwindcss({
                    config: './tailwind.config.js',
                })],
              }),
            {
                name: 'external',
                resolveId(id) {
                    if (id.startsWith('@rioe')) {
                        return {
                            id,
                            external: true
                        };
                    };
                    if (id.startsWith('@mul')) {
                        return {
                            id,
                            external: true
                        };
                    };
                }
            },
        ]
    };
})