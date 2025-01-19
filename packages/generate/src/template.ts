import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { TemplateConfig } from './types';

export async function createTemplates(
  basePath: string,
  templates: TemplateConfig[],
  context: Record<string, any>
): Promise<void> {
  for (const template of templates) {
    const templatePath = path.resolve(
      __dirname,
      './templates',
      template.templateFile
    );
    const outputPath = path.resolve(basePath, './', template.outputFile);

    const rendered = await ejs.renderFile(templatePath, context);
    fs.writeFileSync(outputPath, rendered, 'utf8');
  }
}
