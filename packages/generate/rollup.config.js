
import rollupConfig from '@rioe/common/rollup';


export default rollupConfig.map(config => {
    return  {
      ...config,
      input: './src/index.ts',
      plugins: [...config.plugins,
          babel({
            babelHelpers: 'runtime',
            include: 'src/**',
            exclude: ['node_modules/**'],
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          })
        ]
  };
})