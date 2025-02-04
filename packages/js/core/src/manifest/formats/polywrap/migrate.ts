/* eslint-disable */
/**
 * This file was automatically generated by scripts/manifest/migrate-ts.mustache.
 * DO NOT MODIFY IT BY HAND. Instead, modify scripts/manifest/migrate-ts.mustache,
 * and run node ./scripts/manifest/generateFormatTypes.js to regenerate this file.
 */
import {
  AnyPolywrapManifest,
  PolywrapManifest,
  PolywrapManifestFormats,
  latestPolywrapManifestFormat
} from ".";

import {
  migrate as migrate_0_0_1_prealpha_1_to_0_0_1_prealpha_9
} from "./migrators/0.0.1-prealpha.1_to_0.0.1-prealpha.9";
import {
  migrate as migrate_0_0_1_prealpha_2_to_0_0_1_prealpha_9
} from "./migrators/0.0.1-prealpha.2_to_0.0.1-prealpha.9";
import {
  migrate as migrate_0_0_1_prealpha_3_to_0_0_1_prealpha_9
} from "./migrators/0.0.1-prealpha.3_to_0.0.1-prealpha.9";
import {
  migrate as migrate_0_0_1_prealpha_4_to_0_0_1_prealpha_9
} from "./migrators/0.0.1-prealpha.4_to_0.0.1-prealpha.9";
import {
  migrate as migrate_0_0_1_prealpha_5_to_0_0_1_prealpha_9
} from "./migrators/0.0.1-prealpha.5_to_0.0.1-prealpha.9";
import {
  migrate as migrate_0_0_1_prealpha_6_to_0_0_1_prealpha_9
} from "./migrators/0.0.1-prealpha.6_to_0.0.1-prealpha.9";
import {
  migrate as migrate_0_0_1_prealpha_7_to_0_0_1_prealpha_9
} from "./migrators/0.0.1-prealpha.7_to_0.0.1-prealpha.9";
import {
  migrate as migrate_0_0_1_prealpha_8_to_0_0_1_prealpha_9
} from "./migrators/0.0.1-prealpha.8_to_0.0.1-prealpha.9";

import { Tracer } from "@polywrap/tracing-js";

type Migrator = {
  [key in PolywrapManifestFormats]?: (m: AnyPolywrapManifest) => PolywrapManifest;
};

export const migrators: Migrator = {
  "0.0.1-prealpha.1": migrate_0_0_1_prealpha_1_to_0_0_1_prealpha_9,
  "0.0.1-prealpha.2": migrate_0_0_1_prealpha_2_to_0_0_1_prealpha_9,
  "0.0.1-prealpha.3": migrate_0_0_1_prealpha_3_to_0_0_1_prealpha_9,
  "0.0.1-prealpha.4": migrate_0_0_1_prealpha_4_to_0_0_1_prealpha_9,
  "0.0.1-prealpha.5": migrate_0_0_1_prealpha_5_to_0_0_1_prealpha_9,
  "0.0.1-prealpha.6": migrate_0_0_1_prealpha_6_to_0_0_1_prealpha_9,
  "0.0.1-prealpha.7": migrate_0_0_1_prealpha_7_to_0_0_1_prealpha_9,
  "0.0.1-prealpha.8": migrate_0_0_1_prealpha_8_to_0_0_1_prealpha_9,
};

export const migratePolywrapManifest = Tracer.traceFunc(
  "core: migratePolywrapManifest",
  (manifest: AnyPolywrapManifest, to: PolywrapManifestFormats): PolywrapManifest => {
    const from = manifest.format as PolywrapManifestFormats;

    if (from === latestPolywrapManifestFormat) {
      return manifest as PolywrapManifest;
    }

    if (!(from in PolywrapManifestFormats)) {
      throw new Error(`Unrecognized PolywrapManifestFormat "${manifest.format}"`);
    }

    const migrator = migrators[from];
    if (!migrator) {
      throw new Error(
        `Migrator from PolywrapManifestFormat "${from}" to "${to}" is not available`
      );
    }

    return migrator(manifest);
  }
);
