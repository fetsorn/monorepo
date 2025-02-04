/* eslint-disable */
/**
 * This file was automatically generated by scripts/manifest/validate-ts.mustache.
 * DO NOT MODIFY IT BY HAND. Instead, modify scripts/manifest/validate-ts.mustache,
 * and run node ./scripts/manifest/generateFormatTypes.js to regenerate this file.
 */
import {
  AnyAppManifest,
  AppManifestFormats
} from ".";
import * as Validators from "../../validators";
import schema_0_0_1_prealpha_1 from "@polywrap/manifest-schemas/formats/polywrap.app/0.0.1-prealpha.1.json";
import schema_0_0_1_prealpha_2 from "@polywrap/manifest-schemas/formats/polywrap.app/0.0.1-prealpha.2.json";
import { Tracer } from "@polywrap/tracing-js"

import {
  Schema,
  Validator,
  ValidationError,
  ValidatorResult
} from "jsonschema";

type AppManifestSchemas = {
  [key in AppManifestFormats]: Schema | undefined
};

const schemas: AppManifestSchemas = {
  "0.0.1-prealpha.1": schema_0_0_1_prealpha_1,
  "0.0.1-prealpha.2": schema_0_0_1_prealpha_2,
};

const validator = new Validator();

Validator.prototype.customFormats.appLanguage = Validators.appLanguage;
Validator.prototype.customFormats.file = Validators.file;
Validator.prototype.customFormats.polywrapUri = Validators.polywrapUri;
Validator.prototype.customFormats.schemaFile = Validators.schemaFile;
Validator.prototype.customFormats.packageName = Validators.packageName;

export const validateAppManifest = Tracer.traceFunc(
  "core: validateAppManifest",
  (
    manifest: AnyAppManifest,
    extSchema: Schema | undefined = undefined
  ): void => {
    const schema = schemas[manifest.format as AppManifestFormats];

    if (!schema) {
      throw Error(`Unrecognized AppManifest schema format "${manifest.format}"\nmanifest: ${JSON.stringify(manifest, null, 2)}`);
    }

    const throwIfErrors = (result: ValidatorResult) => {
      if (result.errors.length) {
        throw new Error([
          `Validation errors encountered while sanitizing AppManifest format ${manifest.format}`,
          ...result.errors.map((error: ValidationError) => error.toString())
        ].join("\n"));
      }
    };

    throwIfErrors(validator.validate(manifest, schema));

    if (extSchema) {
      throwIfErrors(validator.validate(manifest, extSchema));
    }
  }
);
