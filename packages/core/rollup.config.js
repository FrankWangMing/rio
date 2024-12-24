import rollupConfig from '@rio/common/rollup';
export default rollupConfig.map(config => {
    return {...config,input: './src/index.tsx',};
})