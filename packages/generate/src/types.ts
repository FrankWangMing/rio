
export interface FileNodeWithFile {
  name: string; // 文件或文件夹的名称
  type: 'file'  // 文件类型，可能是文件或文件夹
  content?:any
}
export interface FileNodeWithFolder {
  name: string; // 文件或文件夹的名称
  type: 'folder'; // 文件类型，可能是文件或文件夹
  children?: FileNode[]; // 如果是文件夹，可能包含子节点
}

export type FileNode = FileNodeWithFile | FileNodeWithFolder

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

export type Page = {
  page_id:string,
  page_name:string,
  route:Route
  view:any
}

export type RioConfig = {
  pages:Page[]
}

export type Route = {

}