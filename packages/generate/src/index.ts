import { createStructure } from './structure';
import { createPackageJson } from './config';
import { createTemplates } from './template';
import { ProjectConfig } from './types';
import { cwd } from 'process';

const projectConfig: ProjectConfig = {
  basePath: '',
  structure: {
    name: '',
    type: 'folder',
    children: [
      {
        name: 'nginx',
        type: 'folder',
        children: [
          {
            name: 'nginx.conf',
            type: 'file',
          },
          {
            name: 'fe.conf',
            type: 'file',
          },
        ],
      },
      {
        name: 'public',
        type: 'folder',
        children: [
          {
            name: 'index.html',
            type: 'file',
          },
          {
            name: 'favicon.ico',
            type: 'file',
          },
        ],
      },
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'main.tsx',
            type: 'file',
          },
          {
            name: 'index.scss',
            type: 'file',
          },
          {
            name: 'routes',
            type: 'folder',
            children: [
              {
                name: 'index.ts',
                type: 'file',
              },
            ],
          },
          {
            name: 'pages',
            type: 'folder',
            children: [
              {
                name: 'App.tsx',
                type: 'file',
              },
              {
                name: 'data.ts',
                type: 'file',
              },
              {
                name: 'EditorContainer.tsx',
                type: 'file',
              },
            ],
          },
          {
            name: 'data',
            type: 'folder',
            children: [
              {
                name: 'api',
                type: 'folder',
                children: [
                  {
                    name: 'getUserInfo.ts',
                    type: 'file',
                  },
                ],
              },
              {
                name: 'common',
                type: 'folder',
                children: [
                  {
                    name: 'dto.ts',
                    type: 'file',
                  },
                ],
              },
              {
                name: 'http.ts',
                type: 'file',
              },
              {
                name: 'index.ts',
                type: 'file',
              },
            ],
          },
          {
            name: 'components',
            type: 'folder',
            children: [
              {
                name: 'editor',
                type: 'folder',
                children: [
                  {
                    name: 'Viewport',
                    type: 'folder',
                    children: [
                      {
                        name: 'Sidebar',
                        type: 'folder',
                        children: [
                          {
                            name: 'index.tsx',
                            type: 'file',
                          },
                          {
                            name: 'SidebarItem.tsx',
                            type: 'file',
                          },
                        ],
                      },
                      {
                        name: 'index.tsx',
                        type: 'file',
                      },
                      {
                        name: 'Header.tsx',
                        type: 'file',
                      },
                      {
                        name: 'ToolBox.tsx',
                        type: 'file',
                      },
                    ],
                  },
                  {
                    name: 'index.ts',
                    type: 'file',
                  },
                  {
                    name: 'RenderNode.tsx',
                    type: 'file',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'file',
        name: '.babelrc',
      },
      {
        type: 'file',
        name: '.gitignore',
      },
      {
        type: 'file',
        name: 'Dockerfile',
      },
      {
        type: 'file',
        name: 'eslint.config.mjs',
      },
      {
        type: 'file',
        name: 'pnpm-lock.yaml',
      },
      {
        type: 'file',
        name: 'tsconfig.json',
      },
      {
        type: 'file',
        name: 'webpack.config.ts',
      },
      {
        type: 'file',
        name: 'postcss.config.js',
      },
      {
        type: 'file',
        name: 'tailwind.config.js',
      },
      {
        type: 'file',
        name: 'tsconfig.json',
      },
    ],
  },
  config: {
    name: '@rioe/deploy',
    version: '1.0.0',
    description: '',
    main: 'index.js',
    type: 'module',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1',
      build: 'webpack --mode production',
      dev: 'webpack serve',
    },
    keywords: [],
    author: '',
    license: 'ISC',
    packageManager:
      'pnpm@9.14.4+sha512.c8180b3fbe4e4bca02c94234717896b5529740a6cbadf19fa78254270403ea2f27d4e1d46a08a0f56c89b63dc8ebfd3ee53326da720273794e6200fcf0d184ab',
    devDependencies: {
      '@babel/core': '^7.26.0',
      '@babel/plugin-transform-arrow-functions': '^7.25.9',
      '@babel/preset-env': '^7.26.0',
      '@babel/preset-react': '^7.26.3',
      '@babel/preset-typescript': '^7.26.0',
      '@eslint/js': '^9.17.0',
      '@types/node': '^22.10.2',
      autoprefixer: '^10.4.20',
      babel: '^6.23.0',
      'babel-loader': '^9.2.1',
      'clean-webpack-plugin': '^4.0.0',
      'compression-webpack-plugin': '^11.1.0',
      'css-loader': '^7.1.2',
      eslint: '^9.17.0',
      'eslint-plugin-react': '^7.37.2',
      globals: '^15.14.0',
      'html-webpack-plugin': '^5.6.3',
      'mini-css-extract-plugin': '^2.9.2',
      postcss: '^8.4.49',
      'postcss-loader': '^8.1.1',
      prettier: '^3.4.2',
      sass: '^1.83.0',
      'sass-loader': '^16.0.4',
      'style-loader': '^4.0.0',
      tailwindcss: '^3.4.17',
      'terser-webpack-plugin': '^5.3.11',
      'ts-loader': '^9.5.1',
      typescript: '^5.7.2',
      'typescript-eslint': '^8.18.1',
      webpack: '^5.97.1',
      'webpack-bundle-analyzer': '^4.10.2',
      'webpack-cli': '^5.1.4',
      'webpack-dev-server': '^5.2.0',
    },
    peerDependencies: {
      '@types/react': '^17.0.0 || ^18.0.0 ',
      '@types/react-dom': '^17.0.0 || ^18.0.0 ',
      react: '^17.0.0 || ^18.0.0 ',
      'react-dom': '^17.0.0 || ^18.0.0 ',
    },
    dependencies: {
      '@rioe/components': 'workspace:*',
      '@emotion/react': '^11.14.0',
      '@emotion/styled': '^11.14.0',
      '@mui/material': '^6.3.1',
      '@mui/styled-engine-sc': '^6.3.1',
      '@mui/styles': '^6.3.1',
      '@rioe/core': 'workspace:*',
      '@rioe/generate': 'workspace:*',
      '@rioe/layers': 'workspace:*',
      '@sentry/react': '^8.47.0',
      '@swc/register': '^0.1.10',
      antd: '^5.22.6',
      axios: '^1.7.9',
      classnames: '^2.5.1',
      debounce: '^2.2.0',
      mobx: '^6.13.5',
      'mobx-react-lite': '^4.1.0',
      're-resizable': '6.1.0',
      'react-color': '^2.19.3',
      'react-contenteditable': '^3.3.7',
      'react-router': '^7.0.2',
      'react-router-dom': '^7.0.2',
      'react-svg': '^16.2.0',
      'react-youtube': '^10.1.0',
      'styled-components': '6.1.13',
    },
  },
  templates: [
    {
      templateFile: 'nginx/nginx.conf.ejs',
      outputFile: 'nginx/nginx.conf',
    },
    {
      templateFile: 'nginx/fe.conf.ejs',
      outputFile: 'nginx/fe.conf',
    },
    {
      templateFile: 'public/index.html.ejs',
      outputFile: 'public/index.html',
    },
    {
      templateFile: 'src/data/api/getUserInfo.ts.ejs',
      outputFile: 'src/data/api/getUserInfo.ts',
    },
    {
      templateFile: 'src/data/common/dto.ts.ejs',
      outputFile: 'src/data/common/dto.ts',
    },
    {
      templateFile: 'src/data/http.ts.ejs',
      outputFile: 'src/data/http.ts',
    },
    {
      templateFile: 'src/data/common/dto.ts.ejs',
      outputFile: 'src/data/common/dto.ts',
    },
    {
      templateFile: 'src/data/index.ts.ejs',
      outputFile: 'src/data/index.ts',
    },

    {
      templateFile: 'src/pages/App.tsx.ejs',
      outputFile: 'src/pages/App.tsx',
    },
    {
      templateFile: 'src/pages/EditorContainer.tsx.ejs',
      outputFile: 'src/pages/EditorContainer.tsx',
    },
    {
      templateFile: 'src/pages/data.ts.ejs',
      outputFile: 'src/pages/data.ts',
    },
    {
      templateFile: 'src/routes/index.ts.ejs',
      outputFile: 'src/routes/index.ts',
    },

    {
      templateFile: 'src/index.scss.ejs',
      outputFile: 'src/index.scss',
    },
    { templateFile: 'src/main.tsx.ejs', outputFile: 'src/main.tsx' },

    { templateFile: '.babelrc.ejs', outputFile: '.babelrc' },
    { templateFile: '.gitignore.ejs', outputFile: '.gitignore' },
    { templateFile: 'data.json.ejs', outputFile: 'data.json' },
    { templateFile: 'Dockerfile.ejs', outputFile: 'Dockerfile' },
    {
      templateFile: 'eslint.config.mjs.ejs',
      outputFile: 'eslint.config.mjs',
    },
    // { templateFile: "pnpm-lock.yaml.ejs", outputFile: "pnpm-lock.yaml" },
    {
      templateFile: 'tsconfig.json.ejs',
      outputFile: 'tsconfig.json',
    },
    {
      templateFile: 'webpack.config.ts.ejs',
      outputFile: 'webpack.config.ts',
    },
    {
      templateFile: 'postcss.config.js.ejs',
      outputFile: 'postcss.config.js',
    },
    {
      templateFile: 'tailwind.config.js.ejs',
      outputFile: 'tailwind.config.js',
    },
  ],
  context: {
    view: {},
    appName: 'My Web Project',
  },
};

async function main(viewConfig): Promise<void> {
  const { basePath, structure, config, templates, context } =
    projectConfig;

  Object.assign(context, {
    view: viewConfig,
  });
  await createStructure(basePath, structure);
  await createPackageJson(basePath, config);
  await createTemplates(basePath, templates, context);
}

const generate = (config) => {
  console.log(cwd())
  main(config);
};
const generateRioFile = async (config) => {
  await createStructure('', {
    type: 'file',
    name: 'rio.json',
  });
  await createTemplates(
    '',
    [
      {
        templateFile: 'rio/rio.json.ejs',
        outputFile: 'rio.json',
      },
    ],
    config
  );
};
export { generate, generateRioFile };
