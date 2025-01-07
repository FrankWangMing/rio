import rollupConfig from '@rio/common/rollup';
export default rollupConfig.map(config => {
    return {...config,input: './src/index.tsx',
        plugins: [
            ...config.plugins,
            {
                name: 'external',
                resolveId(id) {
                    if (id.startsWith('@rio')) {
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