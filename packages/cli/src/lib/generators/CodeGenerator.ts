import { BuildConfig } from "../Compiler";
import { SchemaComposer } from "../SchemaComposer";

import chalk from "chalk";
import fs, { readFileSync } from "fs";
import path from "path";
import Mustache from "mustache";
import {
  OutputDirectory,
  OutputEntry,
  writeDirectory,
} from "@web3api/schema-bind";
import { TypeInfo, parseSchema } from "@web3api/schema-parse";

export class CodeGenerator {
  private _schema: string | undefined = "";
  constructor(private _templateFile: string, private _config: BuildConfig) {}

  public async generateCode(): Promise<boolean> {
    // Make sure that the output dir exists, if not create a new one
    if (!fs.existsSync(this._config.outputDir)) {
      fs.mkdirSync(this._config.outputDir);
    }

    // Compose schema from manifest
    const schemaComposer = new SchemaComposer(this._config);
    const manifest = await schemaComposer.loadManifest();
    const composedSchema = await schemaComposer.composeSchemas(manifest);
    const typeInfo = parseSchema(composedSchema.combined!);
    this._schema = composedSchema.combined;

    // Check the template file if it has the proper run() method
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports, @typescript-eslint/naming-convention
    const { run } = await require(this._templateFile);

    if (!run) {
      console.log(
        chalk.red(
          "The template file provided is wrong or doesn't have the 'run' method."
        )
      );
      return false;
    }

    const output: OutputDirectory = {
      entries: [],
    };

    await run(output, {
      typeInfo,
      generate: (templatePath: string, typeInfo: TypeInfo) =>
        this.generate(templatePath, typeInfo),
    });

    output.entries = await Promise.all(
      output.entries.map((entry) => this.generateFile(entry, typeInfo))
    );

    writeDirectory(this._config.outputDir, output);

    console.log(`🔥 Types were generated successfully 🔥`);
    return true;
  }

  public generate(templatePath: string, typeInfo: TypeInfo): string {
    templatePath = path.join(
      path.dirname(this._config.manifestPath),
      templatePath
    );

    const template = readFileSync(templatePath);

    return Mustache.render(template.toString(), {
      typeInfo,
      schema: this._schema,
    });
  }

  public async generateFile(
    entry: OutputEntry,
    typeInfo: TypeInfo
  ): Promise<OutputEntry> {
    if (entry.type === "Directory") {
      entry.data = await Promise.all(
        entry.data.map((subEntry) => this.generateFile(subEntry, typeInfo))
      );
    } else if (entry.type === "Template") {
      entry = {
        ...entry,
        data: this.generate(entry.data, typeInfo),
        type: "File",
      };
    }

    return entry;
  }
}
