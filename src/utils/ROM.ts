import fs from 'fs';
import { ROMState } from '../redux/slices/ROM-Slice';
import { RootState } from '../redux/store';

// eslint-disable-next-line import/prefer-default-export
// export const openFileAsBytes = (fileName: string) => {
//   const fileData = fs.readFileSync(fileName).toString('hex');
//   console.log('fileData:', fileData.substring(0, 100));
//   const result = [];
//   for (let i = 0; i < fileData.length; i += 2) result.push(`0x${fileData[i]}${fileData[i + 1]}`);
//   console.log('file: ', result.toString().substring(0, 100));
//   return result;
// };

export function byteArrayToHexString(uint8arr: Uint8Array, start: number, size: number, newline = 10) {
  if (!uint8arr) {
    return '';
  }

  let hexStr = '';
  let count = 0;
  for (let i = start; i < start + size; i++) {
    let hex = (uint8arr[i] & 0xff).toString(16);
    hex = hex.length === 1 ? `0${hex}` : hex;
    hexStr += `0x${hex.toUpperCase()} `;
    count += 1;
    if (count % newline === 0 && count !== 0) hexStr += '\n';
  }
  return hexStr;
}

export const printArray = (array: Uint8Array, startIndex = 0, size = 100, newline = 10) => {
  console.log(byteArrayToHexString(array, startIndex, size, newline));
};

export const stringifyBytes = (array: Uint8Array) => {
  return JSON.stringify(Array.from(new Uint8Array(array)));
};

export const openFileAsBytes = (fileName: string): Buffer => {
  // console.log('file length is: ', byteArray.length);
  // printArray(byteArray, 0, 128, 16);
  return fs.readFileSync(fileName);
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

export function hexStringToByte(str: string) {
  if (!str) {
    return new Uint8Array();
  }

  const a = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substring(i, 2), 16));
  }

  return new Uint8Array(a);
}

export const getByte = (state: RootState, offset: number) => {
  return state.ROM.rom[offset + state.ROM.data.header] & 0xff;
};

// this returned value is little endian
export const getShort = (state: RootState, offset: number) => {
  const unsignedByte1 = getByte(state, offset);
  const unsignedByte2 = getByte(state, offset + 1) << 8;
  return unsignedByte1 | unsignedByte2;
};

// this returned value is little endian
export const getTriple = (state: RootState, offset: number) => {
  const shortValue = getShort(state, offset);
  const finalByte = getByte(state, offset + 2) << 16;
  return finalByte | shortValue;
};

export const byteToString = (byte: number) => {
  return (byte & 0xff).toString(16);
};

export const shortToString = (byte: number) => {
  return (byte & 0xffff).toString(16);
};

export const tripleToString = (byte: number) => {
  return (byte & 0xffffff).toString(16);
};
