import React from 'react';

export const setMaxValueDec = (value: string, maxValue: number) => {
  const valueNum = Number(`${value}`);
  return valueNum > maxValue ? maxValue.toString() : valueNum.toString();
};

export const setMaxValueHex = (value: string, maxValue: string) => {
  const valueNum = Number(`0x${value}`);
  const maxValueNum = Number(`0x${maxValue}`);

  return (valueNum & maxValueNum).toString(16);
};

export const pointerListener = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
  const input = e.currentTarget.value.toUpperCase();

  console.log('input starting value is: ', input);
  const isHex = /^[0-9A-F]+$/.test(input);

  if (input.length > 6) {
    return value;
  }
  if (isHex || input.length === 0) {
    return input;
  }
  return value;
};

const numListener = (e: React.ChangeEvent<HTMLInputElement>, value: string, maxValue: number) => {
  const input = e.currentTarget.value;

  console.log('input starting value is: ', input);
  const isNum = /^[0-9]+$/.test(input);

  if (isNum) {
    return setMaxValueDec(input, maxValue);
  }
  return value;
};

export const byteListener = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
  return numListener(e, value, 0xff);
};

export const shortListener = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
  return numListener(e, value, 0xffff);
};

export const tripleListener = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
  return numListener(e, value, 0xffffff);
};

export const pointerToOffset = (pointer: number | string) => {
  const pointerValue = typeof pointer === 'string' ? Number(`0x${pointer}`) : pointer;
  const clearhighBits = 0x7fffff;
  return pointerValue & clearhighBits;
};
