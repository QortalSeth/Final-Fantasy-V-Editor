/* eslint-disable import/no-cycle */
import { byteSelector, setOffsetStore } from '../redux/slices/ROM-Slice';
import store from '../redux/store';

// eslint-disable-next-line import/prefer-default-export
// export const openFileAsBytes = (fileName: string) => {
//   const fileData = fs.readFileSync(fileName).toString('hex');
//   console.log('fileData:', fileData.substring(0, 100));
//   const result = [];
//   for (let i = 0; i < fileData.length; i += 2) result.push(`0x${fileData[i]}${fileData[i + 1]}`);
//   console.log('file: ', result.toString().substring(0, 100));
//   return result;
// };

export function arrayToHexByteString(
  array: number[],
  { start = 0, size = array.length, newline = 10, includeHexPrefix = true, includeSpaces = true, prefix = '' } = {}
) {
  let hexStr = prefix;
  let count = 0;
  for (let i = start; i < start + size; i++) {
    let hex = (array[i] & 0xff).toString(16);
    hex = hex.length === 1 ? `0${hex}` : hex;
    hexStr += includeHexPrefix ? `0x${hex.toUpperCase()}` : hex.toUpperCase();
    hexStr += includeSpaces ? ' ' : '';
    count += 1;
    if (count % newline === 0 && count !== 0) hexStr += '\n';
  }
  return hexStr;
}

export const printHexByteArray = (
  array: number[],
  { start = 0, size = array.length, newline = 10, includeHexPrefix = true, includeSpaces = true, prefix = '' } = {}
) => {
  console.log(prefix + arrayToHexByteString(array, { start, size, newline, includeHexPrefix, includeSpaces }));
};

export function arrayToHexPointerString(
  array: number[],
  { newline = 10, includeHexPrefix = true, includeSpaces = true, prefix = '' } = {}
) {
  let hexStr = prefix;
  let count = 0;

  array.forEach((pointer) => {
    const hex = pointer.toString(16);
    hexStr += includeHexPrefix ? `0x${hex.toUpperCase()}` : hex.toUpperCase();
    hexStr += includeSpaces ? ' ' : '';
    count += 1;
    if (count % newline === 0 && count !== 0) hexStr += '\n';
  });
  return hexStr;
}

export const printHexPointerArray = (
  array: number[],
  { newline = 10, includeHexPrefix = true, includeSpaces = true, prefix = '' } = {}
) => {
  console.log(prefix + arrayToHexPointerString(array, { newline, includeHexPrefix, includeSpaces, prefix }));
};

export const stringifyBytes = (array: Uint8Array) => {
  return JSON.stringify(Array.from(new Uint8Array(array)));
};

// function fileToByteArray(file: File) {
//   return new Promise((resolve, reject) => {
//     try {
//       const reader = new FileReader();
//       const fileByteArray = [];
//       reader.readAsArrayBuffer(file);
//       reader.onloadend = (evt) => {
//         if (evt.target.readyState === FileReader.DONE) {
//           const arrayBuffer = evt.target.result;
//           const array = new Uint8Array(arrayBuffer);
//           for (byte of array) {
//             fileByteArray.push(byte);
//           }
//         }
//         resolve(fileByteArray);
//       };
//     } catch (e) {
//       reject(e);
//     }
//   });
// }

export function stringToNumber(str: string, hex = false) {
  return hex ? Number(`0x${str}`) : Number(str);
}

export const getByte = (offset: number) => {
  return byteSelector(store.getState().ROM, offset);
};

// this returned value is little endian
export const getShort = (offset: number) => {
  const unsignedByte1 = getByte(offset);
  const unsignedByte2 = getByte(offset + 1) << 8;
  return unsignedByte1 | unsignedByte2;
};

// this returned value is little endian
export const getTriple = (offset: number) => {
  const shortValue = getShort(offset);
  const finalByte = getByte(offset + 2) << 16;
  return finalByte | shortValue;
};

export const getOffset = () => {
  return store.getState().ROM.offset;
};

export const incOffset = () => {
  store.dispatch(setOffsetStore(getOffset() + 1));
};

export const setOffset = (offset: number) => {
  store.dispatch(setOffsetStore(offset));
};

export const getNextByte = () => {
  const byte = getByte(store.getState().ROM.offset);
  // const altByte = store.getState().ROM.rom[getOffset()];
  // console.log('in readNextByte');
  // console.log('Byte is: ', byte);
  // console.log('Alt Byte is: ', altByte);
  // console.log('ROM is: ', store.getState().ROM.rom);
  incOffset();
  return byte;
};

export const getNextShort = () => {
  const short = getShort(store.getState().ROM.offset);
  setOffset(store.getState().ROM.offset + 2);
  return short;
};

export const getNextTriple = () => {
  const triple = getTriple(store.getState().ROM.offset);
  setOffset(store.getState().ROM.offset + 3);
  return triple;
};

export const byteToString = (byte: number) => {
  return (byte & 0xff).toString(16).toUpperCase();
};

export const shortToString = (short: number) => {
  return (short & 0xffff).toString(16).toUpperCase();
};

export const tripleToString = (triple: number) => {
  return (triple & 0xffffff).toString(16).toUpperCase();
};

export const hexToString = (num: number) => {
  return (num & 0xffffff).toString(16).toUpperCase();
};

export const printHex = (num: number, prefix = '') => {
  console.log(prefix, hexToString(num));
};
