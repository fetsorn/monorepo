// TODO: https://github.com/polywrap/monorepo/issues/101
import { Uri, InvokeHandler, InvokeResult } from "../";

import { Tracer } from "@polywrap/tracing-js";

export interface MaybeUriOrManifest {
  uri?: string;
  manifest?: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Query = {
  tryResolveUri: Tracer.traceFunc(
    "core: uri-resolver: tryResolveUri",
    async (
      invoke: InvokeHandler["invoke"],
      wrapper: Uri,
      uri: Uri
    ): Promise<InvokeResult<MaybeUriOrManifest>> => {
      return invoke<MaybeUriOrManifest>({
        uri: wrapper.uri,
        method: `tryResolveUri`,
        input: {
          authority: uri.authority,
          path: uri.path,
        },
      });
    }
  ),
  getFile: Tracer.traceFunc(
    "core: uri-resolver: getFile",
    async (
      invoke: InvokeHandler["invoke"],
      wrapper: Uri,
      path: string
    ): Promise<InvokeResult<ArrayBuffer>> => {
      return invoke<ArrayBuffer>({
        uri: wrapper.uri,
        method: "getFile",
        input: {
          path,
        },
      });
    }
  ),
};
