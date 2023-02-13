import React from 'react';

const debugTextFieldFunctions = false;
export const setMinMaxValueDec = (value: string, maxValue: number, minValue = 0): string => {
  const valueNum = Number(`${value}`);

  const maxCheck = valueNum > maxValue ? maxValue : valueNum;
  return maxCheck < minValue ? minValue.toString() : maxCheck.toString();
};

export const setMaxValueHex = (value: string, maxValue: string) => {
  const valueNum = Number(`0x${value}`);
  const maxValueNum = Number(`0x${maxValue}`);

  return (valueNum & maxValueNum).toString(16);
};

export const pointerListener = (
  e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent> | string,
  value: string,
  maxValue: number,
  minValue = 0
) => {
  const input = typeof e !== 'string' ? e.currentTarget.value.toUpperCase() : e.toUpperCase();

  if (debugTextFieldFunctions) console.log('input starting value is: ', input);
  const isHex = /^[0-9A-F]+$/.test(input);

  if (input.length > 6) {
    return value;
  }
  if (isHex || input.length === 0) {
    return input;
  }
  return value;
};

export const numFilter = (value: string, maxValue: number, minValue = 0, emptyReturn = '') => {
  if (debugTextFieldFunctions) console.log('starting value is: ', value);
  if (value === '') {
    return emptyReturn;
  }
  const isNum = /^[0-9,-]+$/.test(value);

  if (isNum) {
    const minMaxCheck = setMinMaxValueDec(value, maxValue, minValue);
    if (debugTextFieldFunctions) console.log('filtered value is: ', minMaxCheck);
    return minMaxCheck;
  }
  return value;
};
export const numListener = (
  e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement, MouseEvent> | string,
  value: string,
  maxValue: number,
  minValue = 0,
  emptyReturn = ''
) => {
  const input = typeof e !== 'string' ? e.currentTarget.value : e;
  return numFilter(input, maxValue, minValue, emptyReturn);
};

export const pointerToOffset = (pointer: number | string) => {
  const pointerValue = typeof pointer === 'string' ? Number(`0x${pointer}`) : pointer;
  const clearhighBits = 0x3fffff;
  return pointerValue & clearhighBits;
};
