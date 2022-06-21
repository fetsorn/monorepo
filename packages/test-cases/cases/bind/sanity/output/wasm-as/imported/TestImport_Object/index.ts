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
  serializeTestImport_Object,
  deserializeTestImport_Object,
  writeTestImport_Object,
  readTestImport_Object
} from "./serialization";
import * as Types from "../..";

@serializable
export class TestImport_Object {

  public static uri: string = "testimport.uri.eth";

  object: Types.TestImport_AnotherObject;
  optObject: Option<Types.TestImport_AnotherObject>;
  objectArray: Array<Types.TestImport_AnotherObject>;
  optObjectArray: Option<Array<Option<Types.TestImport_AnotherObject>>>;
  en: Types.TestImport_Enum;
  optEnum: Option<Types.TestImport_Enum>;
  enumArray: Array<Types.TestImport_Enum>;
  optEnumArray: Option<Array<Option<Types.TestImport_Enum>>>;

  static toBuffer(type: TestImport_Object): ArrayBuffer {
    return serializeTestImport_Object(type);
  }

  static fromBuffer(buffer: ArrayBuffer): TestImport_Object {
    return deserializeTestImport_Object(buffer);
  }

  static write(writer: Write, type: TestImport_Object): void {
    writeTestImport_Object(writer, type);
  }

  static read(reader: Read): TestImport_Object {
    return readTestImport_Object(reader);
  }

  static toJson(type: TestImport_Object): JSON.Value {
    return JSONSerializer.encode(type);
  }

  static fromJson(json: JSON.Value): TestImport_Object {
    return (new JSONDeserializer(json)).decode<TestImport_Object>();
  }
}
