import {
  Read,
  Write,
  Option,
  BigInt,
  BigNumber,
  JSON,
  JSONSerializer,
  JSONDeserializer,
} from "@polywrap/wasm-as";
import {
  serializeAnotherType,
  deserializeAnotherType,
  writeAnotherType,
  readAnotherType
} from "./serialization";
import * as Types from "..";

@serializable
export class AnotherType {
  prop: Option<string>;
  circular: Option<Types.CustomType>;
  m_const: Option<string>;

  static toBuffer(type: AnotherType): ArrayBuffer {
    return serializeAnotherType(type);
  }

  static fromBuffer(buffer: ArrayBuffer): AnotherType {
    return deserializeAnotherType(buffer);
  }

  static write(writer: Write, type: AnotherType): void {
    writeAnotherType(writer, type);
  }

  static read(reader: Read): AnotherType {
    return readAnotherType(reader);
  }

  static toJson(type: AnotherType): JSON.Value {
    return JSONSerializer.encode(type);
  }

  static fromJson(json: JSON.Value): AnotherType {
    return (new JSONDeserializer(json)).decode<AnotherType>();
  }
}
