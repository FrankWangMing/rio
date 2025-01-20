import rollupConfig from '@rioe/common/rollup';
import copy from 'rollup-plugin-copy';
export default rollupConfig.map(config => {
    return  {
      ...config,
      input: './src/index.ts',
      plugins: [
        ...config.plugins,
        copy({
          targets: [
            { src: '../editor/dist/*', dest: 'dist/web' },
            { src: '../generate/templates/*', dest: 'dist/templates' },
          ]
        })
      ],
      external: ['react',"react-dom","@types/react"]
    };
})