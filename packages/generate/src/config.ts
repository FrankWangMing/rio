import fs from 'fs';
import path from 'path';
import { PackageConfig } from './types';

export async function createPackageJson(
  basePath: string,
  config: PackageConfig
): Promise<void> {
  const packageJsonPath = path.join(basePath, 'package.json');
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(config, null, 2),
    'utf8'
  );
}
