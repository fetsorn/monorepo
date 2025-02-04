import { usePolywrapClient } from "./client";
import { useStateReducer } from "./state";

import { InvokeOptions, InvokeResult } from "@polywrap/core-js";

export interface UsePolywrapInvokeState<
  TData = unknown
> extends InvokeResult<TData> {
  loading: boolean;
}

export const INITIAL_QUERY_STATE: UsePolywrapInvokeState = {
  data: undefined,
  error: undefined,
  loading: false,
};

export interface UsePolywrapInvokeProps extends InvokeOptions<string> {
  provider?: string;
}

/*
Note that the initial values passed into the usePolywrapInvoke hook will be
ignored when an ArrayBuffer is passed into execute(...).
*/
export interface UsePolywrapInvoke<
  TData = unknown
> extends UsePolywrapInvokeState<TData> {
  execute: (
    input?: Record<string, unknown> | ArrayBuffer
  ) => Promise<InvokeResult<TData>>;
}

export function usePolywrapInvoke<
  TData = unknown
>(props: UsePolywrapInvokeProps | InvokeOptions<string>): UsePolywrapInvoke<TData> {
  const provider = "provider" in props ? props.provider : undefined;
  const client = usePolywrapClient({ provider });

  // Initialize the UsePolywrapQueryState
  const { state, dispatch } = useStateReducer<UsePolywrapInvokeState<TData>>(
    INITIAL_QUERY_STATE as UsePolywrapInvokeState<TData>
  );

  const execute = async (input?: Record<string, unknown> | ArrayBuffer) => {
    dispatch({ loading: true });
    const { data, error } = await client.invoke<TData>({
      ...props,
      input: input instanceof ArrayBuffer ? input : {
        ...props.input,
        ...input,
      },
    });
    dispatch({ data, error, loading: false });
    return { data, error };
  };

  return {
    ...state,
    execute,
  };
}
