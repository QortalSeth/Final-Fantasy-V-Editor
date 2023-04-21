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
  console.log(arrayToHexPointerString(array, { newline, includeHexPrefix, includeSpaces, prefix }));
};
export const arrayToString = (arr: string[], newline = 10, space = ' ') => {
  let finalText = '';
  let count = 1;
  arr.forEach((text) => {
    finalText += `${text}${space}`;
    if (count % newline === 0 && count !== 0) finalText += '\n';
    count++;
  });
  return finalText;
};

export function stringToNumber(str: string, hex = false) {
  return hex ? Number(`0x${str}`) : Number(str);
}

export function numberUnitSplit(str: string) {
  const strAsNumber = str.replaceAll(/[^0-9.]/g, '');
  // console.log('strAsNumber is: ', strAsNumber);
  const number = Number(strAsNumber);
  const unit = str.replaceAll(/[0-9.]/g, '');
  // console.log('number is: ', number);
  // console.log('unit is: ', unit);
  return { number, unit };
}

export const changeUnitAmount = (value1: string, operation: (num1: number, num2: number) => number, value2?: string | number) => {
  const num1 = numberUnitSplit(value1);
  let newValue: number;
  if (value2) {
    const num2 = typeof value2 === 'string' ? numberUnitSplit(value2).number : value2;
    newValue = operation(num1.number, num2);
  } else {
    newValue = operation(num1.number, 0);
  }

  return newValue.toString() + num1.unit;
};

export const divideUnits = (str1: string, str2: string | number) => {
  return changeUnitAmount(str1, (num1, num2) => num1 / num2, str2);
};

export const addUnits = (str1: string, str2: string | number) => {
  return changeUnitAmount(str1, (num1, num2) => num1 + num2, str2);
};

export const multiplyUnits = (str1: string, str2: string | number) => {
  return changeUnitAmount(str1, (num1, num2) => num1 * num2, str2);
};

export function numberUnitCombine(numUnit: { number: number; unit: string }) {
  return `${numUnit.number.toString()}${numUnit.unit}`;
}
export const byteToString = (byte: number) => {
  return (byte & 0xff).toString(16).toUpperCase();
};
export const shortToString = (short: number) => {
  return (short & 0xffff).toString(16).toUpperCase();
};
export const tripleToString = (triple: number, addPrefix = false) => {
  const prefix = addPrefix ? '0x' : '';
  return prefix + (triple & 0xffffff).toString(16).toUpperCase();
};
export const numToHexString = (num: number, addPrefixZero = true) => {
  const formatByte = (num & 0xffffff).toString(16).toUpperCase();
  const unevenBytes = formatByte.length % 2 > 0;
  const addedPrefix = unevenBytes && addPrefixZero ? `0${formatByte}` : formatByte;
  return addedPrefix;
};
export const numToHexDigits = (num: number | string) => {
  const numString = typeof num === 'number' ? num.toString(16) : num;
  const digits = Math.log10(numString.length);
  return digits;
};
export const printHex = (num: number, prefix = '') => {
  console.log(prefix, numToHexString(num));
};
