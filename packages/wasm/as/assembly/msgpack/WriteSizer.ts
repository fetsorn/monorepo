import { Option } from "as-container";
import { Write } from "./Write";
import { BigInt, BigNumber } from "../math";
import { Context } from "../debug";
import { JSON } from "../json";

export class WriteSizer extends Write {
  length: i32;
  extByteLengths: Array<u32>;
  private readonly _context: Context;

  constructor(context: Context = new Context()) {
    super();
    this._context = context;
    this.extByteLengths = new Array<u32>();
  }

  context(): Context {
    return this._context;
  }

  writeNil(): void {
    this.length++;
  }

  writeBool(_value: bool): void {
    this.length++;
  }

  writeInt8(value: i8): void {
    this.writeInt32(<i32>value);
  }

  writeInt16(value: i16): void {
    this.writeInt32(<i32>value);
  }

  writeInt32(value: i32): void {
    if (value >= -(1 << 5) && value < 1 << 7) {
      this.length++;
    } else if (value < 1 << 7 && value >= -(1 << 7)) {
      this.length += 2;
    } else if (value < 1 << 15 && value >= -(1 << 15)) {
      this.length += 3;
    } else {
      this.length += 5;
    }
  }

  writeUInt8(value: u8): void {
    this.writeUInt32(<u32>value);
  }

  writeUInt16(value: u16): void {
    this.writeUInt32(<u32>value);
  }

  writeUInt32(value: u32): void {
    if (value < 1 << 7) {
      this.length++;
    } else if (value < 1 << 8) {
      this.length += 2;
    } else if (value < 1 << 16) {
      this.length += 3;
    } else {
      this.length += 5;
    }
  }

  writeFloat32(_value: f32): void {
    this.length += 5;
  }

  writeFloat64(_value: f64): void {
    this.length += 9;
  }

  writeStringLength(length: u32): void {
    if (length < 32) {
      this.length++;
    } else if (length <= <u32>u8.MAX_VALUE) {
      this.length += 2;
    } else if (length <= <u32>u16.MAX_VALUE) {
      this.length += 3;
    } else {
      this.length += 5;
    }
  }

  writeString(value: string): void {
    const buf = String.UTF8.encode(value);
    this.writeStringLength(buf.byteLength);
    this.length += buf.byteLength;
  }

  writeBytesLength(length: u32): void {
    if (length <= <u32>u8.MAX_VALUE) {
      this.length += 2;
    } else if (length <= <u32>u16.MAX_VALUE) {
      this.length += 3;
    } else {
      this.length += 5;
    }
  }

  writeBytes(value: ArrayBuffer): void {
    if (value.byteLength == 0) {
      this.length++; // nil byte
      return;
    }
    this.writeBytesLength(value.byteLength);
    this.length += value.byteLength;
  }

  writeBigInt(value: BigInt): void {
    const str = value.toString();
    this.writeString(str);
  }

  writeBigNumber(value: BigNumber): void {
    const str = value.toString();
    this.writeString(str);
  }

  writeJSON(value: JSON.Value): void {
    const str = value.stringify();
    this.writeString(str);
  }

  writeArrayLength(length: u32): void {
    if (length < 16) {
      this.length++;
    } else if (length <= <u32>u16.MAX_VALUE) {
      this.length += 3;
    } else {
      this.length += 5;
    }
  }

  writeArray<T>(a: Array<T>, fn: (sizer: Write, item: T) => void): void {
    this.writeArrayLength(a.length);
    for (let i: i32 = 0; i < a.length; i++) {
      fn(this, a[i]);
    }
  }

  writeMapLength(length: u32): void {
    if (length < 16) {
      this.length++;
    } else if (length <= <u32>u16.MAX_VALUE) {
      this.length += 3;
    } else {
      this.length += 5;
    }
  }

  writeMap<K, V>(
    m: Map<K, V>,
    key_fn: (sizer: Write, key: K) => void,
    value_fn: (sizer: Write, value: V) => void
  ): void {
    this.writeMapLength(m.size);
    const keys = m.keys();
    for (let i: i32 = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = m.get(key);
      key_fn(this, key);
      value_fn(this, value);
    }
  }

  writeExtGenericMap<K, V>(
    m: Map<K, V>,
    key_fn: (encoder: Write, key: K) => void,
    value_fn: (encoder: Write, value: V) => void
  ): void {
    // type = GENERIC_MAP
    this.length++;

    const startingLength = this.length;

    this.writeMap(m, key_fn, value_fn);

    const byteLength: u32 = this.length - startingLength;

    if (byteLength <= <u32>u8.MAX_VALUE) {
      this.length += 2;
    } else if (byteLength <= <u32>u16.MAX_VALUE) {
      this.length += 3;
    } else {
      this.length += 5;
    }

    this.extByteLengths.push(byteLength);
  }

  writeNullableBool(value: Option<bool>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeBool(value.unwrap());
  }

  writeNullableInt8(value: Option<i8>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeInt8(value.unwrap());
  }

  writeNullableInt16(value: Option<i16>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeInt16(value.unwrap());
  }

  writeNullableInt32(value: Option<i32>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeInt32(value.unwrap());
  }

  writeNullableUInt8(value: Option<u8>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeUInt8(value.unwrap());
  }

  writeNullableUInt16(value: Option<u16>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeUInt16(value.unwrap());
  }

  writeNullableUInt32(value: Option<u32>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeUInt32(value.unwrap());
  }

  writeNullableFloat32(value: Option<f32>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeFloat32(value.unwrap());
  }

  writeNullableFloat64(value: Option<f64>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeFloat64(value.unwrap());
  }

  writeNullableString(value: Option<string>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeString(value.unwrap());
  }

  writeNullableBytes(value: Option<ArrayBuffer>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeBytes(value.unwrap());
  }

  writeNullableBigInt(value: Option<BigInt>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeBigInt(value.unwrap());
  }

  writeNullableBigNumber(value: Option<BigNumber>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeBigNumber(value.unwrap());
  }

  writeNullableJSON(value: Option<JSON.Value>): void {
    if (value.isNone) {
      this.writeNil();
      return;
    }

    this.writeJSON(value.unwrap());
  }

  writeNullableArray<T>(
    a: Option<Array<T>>,
    fn: (sizer: Write, item: T) => void
  ): void {
    if (a.isNone) {
      this.writeNil();
      return;
    }

    this.writeArray(a.unwrap(), fn);
  }

  writeNullableMap<K, V>(
    m: Option<Map<K, V>>,
    key_fn: (sizer: Write, key: K) => void,
    value_fn: (sizer: Write, value: V) => void
  ): void {
    if (m.isNone) {
      this.writeNil();
      return;
    }

    this.writeMap(m.unwrap(), key_fn, value_fn);
  }

  writeNullableExtGenericMap<K, V>(
    m: Option<Map<K, V>>,
    key_fn: (sizer: Write, key: K) => void,
    value_fn: (sizer: Write, value: V) => void
  ): void {
    if (m.isNone) {
      this.writeNil();
      return;
    }
    this.writeExtGenericMap(m.unwrap(), key_fn, value_fn);
  }
}
