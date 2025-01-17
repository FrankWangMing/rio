export interface FileNode {
  name: string; // 文件或文件夹的名称
  type: 'file' | 'folder'; // 文件类型，可能是文件或文件夹
  children?: FileNode[]; // 如果是文件夹，可能包含子节点
}

export interface ProjectStructure {
  nginx: FileNode;
  src: FileNode; // 文件夹和文件名
  public: FileNode; // 公共文件名
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
  structure: FileNode;
  config: PackageConfig & Record<string, any>;
  templates: TemplateConfig[];
  context: Record<string, any>;
}
