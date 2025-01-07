import { createStructure } from "./structure";
import { createPackageJson } from "./config";
import { createTemplates } from "./template";
import { ProjectConfig } from "./types";
import { connectEditor, useEditorStore } from "@rio/core";

const projectConfig: ProjectConfig = {
  basePath: "./my-web-project",
  structure: {
    nginx: ["nginx.conf", "fe.conf"],
    public: ["index.html", "favicon.ico"],
    src: {
      components: ["Header.tsx", "Footer.tsx"],
      pages: ["App.tsx"],
      assets: ["styles.css"],
    },

  },
  config: {
    "name": "webpack-best-practices",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack --mode production",
      "dev": "webpack serve"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "packageManager": "pnpm@9.14.4+sha512.c8180b3fbe4e4bca02c94234717896b5529740a6cbadf19fa78254270403ea2f27d4e1d46a08a0f56c89b63dc8ebfd3ee53326da720273794e6200fcf0d184ab",
    "devDependencies": {
      "@babel/core": "^7.26.0",
      "@babel/plugin-transform-arrow-functions": "^7.25.9",
      "@babel/preset-env": "^7.26.0",
      "@babel/preset-react": "^7.26.3",
      "@babel/preset-typescript": "^7.26.0",
      "@eslint/js": "^9.17.0",
      "@types/node": "^22.10.2",
      "babel": "^6.23.0",
      "babel-loader": "^9.2.1",
      "clean-webpack-plugin": "^4.0.0",
      "compression-webpack-plugin": "^11.1.0",
      "css-loader": "^7.1.2",
      "eslint": "^9.17.0",
      "eslint-plugin-react": "^7.37.2",
      "globals": "^15.14.0",
      "html-webpack-plugin": "^5.6.3",
      "prettier": "^3.4.2",
      "sass": "^1.83.0",
      "sass-loader": "^16.0.4",
      "style-loader": "^4.0.0",
      "terser-webpack-plugin": "^5.3.11",
      "ts-loader": "^9.5.1",
      "typescript": "^5.7.2",
      "typescript-eslint": "^8.18.1",
      "webpack": "^5.97.1",
      "webpack-bundle-analyzer": "^4.10.2",
      "webpack-cli": "^5.1.4",
      "webpack-dev-server": "^5.2.0"
    },
    "dependencies": {
      "@sentry/react": "^8.47.0",
      "axios": "^1.7.9",
      "mobx": "^6.13.5",
      "mobx-react-lite": "^4.1.0",
      "react": "^19.0.0",
      "react-dom": "^19.0.0",
      "react-router": "^7.0.2",
      "react-router-dom": "^7.0.2"
    }
  },
  templates: [
    { templateFile: "nginx/nginx.conf.ejs", outputFile: "nginx/nginx.conf" },
    { templateFile: "nginx/fe.conf.ejs", outputFile: "nginx/fe.conf" },
    { templateFile: "public/index.html.ejs", outputFile: "public/index.html" },
  ],
  context: {
    appName: "My Web Project",
  },
};

async function main(): Promise<void> {


  const { basePath, structure, config, templates, context } = projectConfig;

  await createStructure(basePath, structure);
  await createPackageJson(basePath, config);
  await createTemplates(basePath, templates, context);


}



const generate = (config) => {
  console.log(config)
  main()
}
export {
  generate
}
