export interface ProjectStructure {
    nginx: string[];
    src: Record<string, string[]>; // 文件夹和文件名
    public: string[];              // 公共文件名
  }

  export interface PackageConfig {
    name: string;
    version: string;
    scripts: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  }

  export interface TemplateConfig {
    templateFile: string;
    outputFile: string;
  }

  export interface ProjectConfig {
    basePath: string;
    structure: ProjectStructure;
    config: PackageConfig & Record<string,any>;
    templates: TemplateConfig[];
    context: Record<string, any>;
  }
