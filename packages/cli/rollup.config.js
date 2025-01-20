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
            { src: '../generate/templates/.gitignore.ejs', dest: 'dist/templates/.gitignore.ejs' },

          ]
        })
      ],
      external: ['react',"react-dom","@types/react"]
    };
})