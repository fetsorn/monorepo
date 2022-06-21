import {
  Read,
  ReadDecoder,
  Write,
  WriteSizer,
  WriteEncoder,
  Option,
  BigInt,
  BigNumber,
  JSON,
  Context
} from "@polywrap/wasm-as";
import * as Types from "..";

export class Input_moduleMethod {
  str: string;
  optStr: Option<string>;
  en: Types.CustomEnum;
  optEnum: Option<Types.CustomEnum>;
  enumArray: Array<Types.CustomEnum>;
  optEnumArray: Option<Array<Option<Types.CustomEnum>>>;
  map: Map<string, i32>;
}

export function deserializemoduleMethodArgs(argsBuf: ArrayBuffer): Input_moduleMethod {
  const context: Context =  new Context("Deserializing module-type: moduleMethod");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _str: string = "";
  let _strSet: bool = false;
  let _optStr: Option<string> = Option.None<string>();
  let _en: Types.CustomEnum = 0;
  let _enSet: bool = false;
  let _optEnum: Option<Types.CustomEnum> = Option.None<Types.CustomEnum>();
  let _enumArray: Array<Types.CustomEnum> = [];
  let _enumArraySet: bool = false;
  let _optEnumArray: Option<Array<Option<Types.CustomEnum>>> = Option.None<Array<Option<Types.CustomEnum>>>();
  let _map: Map<string, i32> = new Map<string, i32>();
  let _mapSet: bool = false;

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "str") {
      reader.context().push(field, "string", "type found, reading property");
      _str = reader.readString();
      _strSet = true;
      reader.context().pop();
    }
    else if (field == "optStr") {
      reader.context().push(field, "Option<string>", "type found, reading property");
      _optStr = reader.readNullableString();
      reader.context().pop();
    }
    else if (field == "en") {
      reader.context().push(field, "Types.CustomEnum", "type found, reading property");
      let value: Types.CustomEnum;
      if (reader.isNextString()) {
        value = Types.getCustomEnumValue(reader.readString());
      } else {
        value = reader.readInt32();
        Types.sanitizeCustomEnumValue(value);
      }
      _en = value;
      _enSet = true;
      reader.context().pop();
    }
    else if (field == "optEnum") {
      reader.context().push(field, "Option<Types.CustomEnum>", "type found, reading property");
      let value: Option<Types.CustomEnum>;
      if (!reader.isNextNil()) {
        if (reader.isNextString()) {
          value = Option.Some(
            Types.getCustomEnumValue(reader.readString())
          );
        } else {
          value = Option.Some(
            reader.readInt32()
          );
          Types.sanitizeCustomEnumValue(value.value);
        }
      } else {
        value = Option.None<Types.CustomEnum>();
      }
      _optEnum = value;
      reader.context().pop();
    }
    else if (field == "enumArray") {
      reader.context().push(field, "Array<Types.CustomEnum>", "type found, reading property");
      _enumArray = reader.readArray((reader: Read): Types.CustomEnum => {
        let value: Types.CustomEnum;
        if (reader.isNextString()) {
          value = Types.getCustomEnumValue(reader.readString());
        } else {
          value = reader.readInt32();
          Types.sanitizeCustomEnumValue(value);
        }
        return value;
      });
      _enumArraySet = true;
      reader.context().pop();
    }
    else if (field == "optEnumArray") {
      reader.context().push(field, "Option<Array<Option<Types.CustomEnum>>>", "type found, reading property");
      _optEnumArray = reader.readNullableArray((reader: Read): Option<Types.CustomEnum> => {
        let value: Option<Types.CustomEnum>;
        if (!reader.isNextNil()) {
          if (reader.isNextString()) {
            value = Option.Some(
              Types.getCustomEnumValue(reader.readString())
            );
          } else {
            value = Option.Some(
              reader.readInt32()
            );
            Types.sanitizeCustomEnumValue(value.value);
          }
        } else {
          value = Option.None<Types.CustomEnum>();
        }
        return value;
      });
      reader.context().pop();
    }
    else if (field == "map") {
      reader.context().push(field, "Map<string, i32>", "type found, reading property");
      _map = reader.readExtGenericMap((reader: Read): string => {
        return reader.readString();
      }, (reader: Read): i32 => {
        return reader.readInt32();
      });
      _mapSet = true;
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_strSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'str: String'"));
  }
  if (!_enSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'en: CustomEnum'"));
  }
  if (!_enumArraySet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'enumArray: [CustomEnum]'"));
  }
  if (!_mapSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'map: Map<String, Int>'"));
  }

  return {
    str: _str,
    optStr: _optStr,
    en: _en,
    optEnum: _optEnum,
    enumArray: _enumArray,
    optEnumArray: _optEnumArray,
    map: _map
  };
}

export function serializemoduleMethodResult(result: i32): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: moduleMethod");
  const sizer = new WriteSizer(sizerContext);
  writemoduleMethodResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: moduleMethod");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writemoduleMethodResult(encoder, result);
  return buffer;
}

export function writemoduleMethodResult(writer: Write, result: i32): void {
  writer.context().push("moduleMethod", "i32", "writing property");
  writer.writeInt32(result);
  writer.context().pop();
}

export class Input_objectMethod {
  object: Types.AnotherType;
  optObject: Option<Types.AnotherType>;
  objectArray: Array<Types.AnotherType>;
  optObjectArray: Option<Array<Option<Types.AnotherType>>>;
}

export function deserializeobjectMethodArgs(argsBuf: ArrayBuffer): Input_objectMethod {
  const context: Context =  new Context("Deserializing module-type: objectMethod");
  const reader = new ReadDecoder(argsBuf, context);
  let numFields = reader.readMapLength();

  let _object: Option<Types.AnotherType> = Option.None<Types.AnotherType>();
  let _objectSet: bool = false;
  let _optObject: Option<Types.AnotherType> = Option.None<Types.AnotherType>();
  let _objectArray: Array<Types.AnotherType> = [];
  let _objectArraySet: bool = false;
  let _optObjectArray: Option<Array<Option<Types.AnotherType>>> = Option.None<Array<Option<Types.AnotherType>>>();

  while (numFields > 0) {
    numFields--;
    const field = reader.readString();

    reader.context().push(field, "unknown", "searching for property type");
    if (field == "object") {
      reader.context().push(field, "Types.AnotherType", "type found, reading property");
      const object = Types.AnotherType.read(reader);
      _object = object;
      _objectSet = true;
      reader.context().pop();
    }
    else if (field == "optObject") {
      reader.context().push(field, "Option<Types.AnotherType>", "type found, reading property");
      let object: Option<Types.AnotherType> = Option.None<Types.AnotherType>();
      if (!reader.isNextNil()) {
        object = Types.AnotherType.read(reader);
      }
      _optObject = object;
      reader.context().pop();
    }
    else if (field == "objectArray") {
      reader.context().push(field, "Array<Types.AnotherType>", "type found, reading property");
      _objectArray = reader.readArray((reader: Read): Types.AnotherType => {
        const object = Types.AnotherType.read(reader);
        return object;
      });
      _objectArraySet = true;
      reader.context().pop();
    }
    else if (field == "optObjectArray") {
      reader.context().push(field, "Option<Array<Option<Types.AnotherType>>>", "type found, reading property");
      _optObjectArray = reader.readNullableArray((reader: Read): Option<Types.AnotherType> => {
        let object: Option<Types.AnotherType> = Option.None<Types.AnotherType>();
        if (!reader.isNextNil()) {
          object = Types.AnotherType.read(reader);
        }
        return object;
      });
      reader.context().pop();
    }
    reader.context().pop();
  }

  if (!_object || !_objectSet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'object: AnotherType'"));
  }
  if (!_objectArraySet) {
    throw new Error(reader.context().printWithContext("Missing required argument: 'objectArray: [AnotherType]'"));
  }

  return {
    object: _object,
    optObject: _optObject,
    objectArray: _objectArray,
    optObjectArray: _optObjectArray
  };
}

export function serializeobjectMethodResult(result: Option<Types.AnotherType>): ArrayBuffer {
  const sizerContext: Context = new Context("Serializing (sizing) module-type: objectMethod");
  const sizer = new WriteSizer(sizerContext);
  writeobjectMethodResult(sizer, result);
  const buffer = new ArrayBuffer(sizer.length);
  const encoderContext: Context = new Context("Serializing (encoding) module-type: objectMethod");
  const encoder = new WriteEncoder(buffer, sizer, encoderContext);
  writeobjectMethodResult(encoder, result);
  return buffer;
}

export function writeobjectMethodResult(writer: Write, result: Option<Types.AnotherType>): void {
  writer.context().push("objectMethod", "Option<Types.AnotherType>", "writing property");
  if (result) {
    Types.AnotherType.write(writer, result as Types.AnotherType);
  } else {
    writer.writeNil();
  }
  writer.context().pop();
}
