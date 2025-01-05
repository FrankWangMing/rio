import { createStructure } from "./structure";
import { createPackageJson } from "./config";
import { createTemplates } from "./template";
import { ProjectConfig } from "./types";
import { connectEditor, useEditorStore } from "@rio/core";

const projectConfig: ProjectConfig = {
  basePath: "./my-web-project",
  structure: {
    src: {
      components: ["Header.tsx", "Footer.tsx"],
      pages: ["HomePage.tsx", "AboutPage.tsx"],
      assets: ["styles.css"],
    },
    public: ["index.html", "favicon.ico"],
  },
  config: {
    name: "my-web-project",
    version: "1.0.0",
    scripts: {
      start: "vite",
      build: "vite build",
    },
    dependencies: {
      react: "^18.0.0",
      "react-dom": "^18.0.0",
    },
    devDependencies: {
      vite: "^4.0.0",
    },
  },
  templates: [
    { templateFile: "Header.tsx.ejs", outputFile: "components/Header.tsx" },
    { templateFile: "HomePage.tsx.ejs", outputFile: "pages/HomePage.tsx" },
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

main().catch(console.error);


const generate = (config) => {
  console.log(config)
  main()
}
export {
  generate
}
