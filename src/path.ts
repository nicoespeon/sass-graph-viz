import * as fs from "fs";
import * as path from "path";

export type Path = string;

export function isFolder(target: Path): boolean {
  return fs.existsSync(target) && fs.lstatSync(target).isDirectory();
}

export function fileNameRelativeTo(rootFolder: Path, file: Path): string {
  return path.relative(rootFolder, file).replace(path.extname(file), "");
}
