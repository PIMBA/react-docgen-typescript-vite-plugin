import { Plugin } from "vite";
import * as tsconfig from "tsconfig";
import globby from "globby";
import * as docGen from "react-docgen-typescript";
import { generateDocgenCodeBlock } from "@storybook/react-docgen-typescript-plugin/dist/generateDocgenCodeBlock";
import { createProgram, ModuleResolutionKind } from "typescript";

const pattern = /\.tsx$/;

/**
 * Vite react typescript document generator plugin for storybook
 *
 * **Notice**: This plugin is very slow
 *
 * @param include files that should be included
 * @param context tsconfig file root, by default it is `process.cwd()`
 */
const docgenPlugin = (
  include: string[],
  context: string = process.cwd()
): Plugin => {
  const files = globby.sync(include);
  const { compilerOptions } = tsconfig.loadSync(context).config;
  const tscfg = {
    ...compilerOptions,
    moduleResolution: ModuleResolutionKind.NodeJs,
  };
  const docGenParser = docGen.withCompilerOptions(tscfg);
  const tsProgram = createProgram(files, tscfg);
  return {
    name: "react-docgen-plugin",
    transform(source, id) {
      if (!pattern.test(id)) return null;
      const docs = docGenParser.parseWithProgramProvider(id, () => tsProgram);
      return generateDocgenCodeBlock({
        filename: id,
        source,
        componentDocs: docs,
        docgenCollectionName: "STORYBOOK_REACT_CLASSES",
        setDisplayName: true,
        typePropName: "type",
      });
    },
  };
};

export default docgenPlugin;
