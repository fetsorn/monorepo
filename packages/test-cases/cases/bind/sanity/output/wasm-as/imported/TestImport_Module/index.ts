import {
  wrap_subinvoke,
  wrap_subinvokeImplementation,
  Option,
  BigInt,
  BigNumber,
  JSON,
  Result
} from "@polywrap/wasm-as";
import {
  serializeimportedMethodArgs,
  deserializeimportedMethodResult,
  Input_importedMethod,
  serializeanotherMethodArgs,
  deserializeanotherMethodResult,
  Input_anotherMethod
} from "./serialization";
import * as Types from "../..";

export class TestImport_Module {

  public static interfaceUri: string = "testimport.uri.eth";

  public uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  public importedMethod(
    input: Input_importedMethod
  ): Result<Option<Types.TestImport_Object>, string> {
    const args = serializeimportedMethodArgs(input);
    const result = wrap_subinvokeImplementation(
      "testimport.uri.eth",
      this.uri,
      "importedMethod",
      args
    );

    if (result.isErr) {
      return Result.Err<Option<Types.TestImport_Object>, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<Option<Types.TestImport_Object>, string>(
      deserializeimportedMethodResult(result.unwrap())
    );
  }

  public anotherMethod(
    input: Input_anotherMethod
  ): Result<i32, string> {
    const args = serializeanotherMethodArgs(input);
    const result = wrap_subinvokeImplementation(
      "testimport.uri.eth",
      this.uri,
      "anotherMethod",
      args
    );

    if (result.isErr) {
      return Result.Err<i32, string>(
        result.unwrapErr()
      );
    }

    return Result.Ok<i32, string>(
      deserializeanotherMethodResult(result.unwrap())
    );
  }
}
