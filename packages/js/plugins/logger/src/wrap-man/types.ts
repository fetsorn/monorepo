/// NOTE: This is an auto-generated file.
///       All modifications will be overwritten.

/* eslint-disable @typescript-eslint/naming-convention */

import * as Types from "./";

import { Client, InvokeResult } from "@polywrap/core-js";

export type UInt = number;
export type UInt8 = number;
export type UInt16 = number;
export type UInt32 = number;
export type Int = number;
export type Int8 = number;
export type Int16 = number;
export type Int32 = number;
export type Bytes = ArrayBuffer;
export type BigInt = string;
export type BigNumber = string;
export type Json = string;
export type String = string;
export type Boolean = boolean;

/// Envs START ///
/// Envs END ///

/// Objects START ///
/// Objects END ///

/// Enums START ///
/// Enums END ///

/// Imported Objects START ///

/* URI: "ens/logger.core.polywrap.eth" */
export enum Logger_LogLevelEnum {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

export type Logger_LogLevelString = "DEBUG" | "INFO" | "WARN" | "ERROR";

export type Logger_LogLevel = Logger_LogLevelEnum | Logger_LogLevelString;

/// Imported Objects END ///

/// Imported Modules START ///

/* URI: "ens/logger.core.polywrap.eth" */
interface Logger_Module_Input_log extends Record<string, unknown> {
  level: Types.Logger_LogLevel;
  message: Types.String;
}

/* URI: "ens/logger.core.polywrap.eth" */
export const Logger_Module = {
  log: async (
    input: Logger_Module_Input_log,
    client: Client
  ): Promise<InvokeResult<Types.Boolean>> => {
    return client.invoke<Types.Boolean>({
      uri: "ens/logger.core.polywrap.eth",
      method: "log",
      input,
    });
  },
};

/// Imported Modules END ///
