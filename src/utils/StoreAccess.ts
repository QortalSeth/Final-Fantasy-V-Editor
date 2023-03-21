/* eslint-disable import/no-cycle */

import { byteSelector, setByte, setOffsetStore } from '../redux/slices/ROM-Slice';
import store from '../redux/store';

// export const baseDir = rootPath.path;
// export const assetDir = (fileName: string) => `${baseDir}/assets/${fileName}`;

export const pointerInROM = (offset: number) => {
  const romLength = store.getState().ROM.rom.length;
  return offset < romLength;
};

export const getByte = (offset: number, defaultROM = false) => {
  return byteSelector(store.getState().ROM, offset, defaultROM);
};

// this returned value is little endian
export const getShort = (offset: number, defaultROM = false) => {
  const unsignedByte1 = getByte(offset, defaultROM);
  const unsignedByte2 = getByte(offset + 1, defaultROM) << 8;
  return unsignedByte1 | unsignedByte2;
};

export const inferTriple = (offset: number, defaultROM = false) => {
  const dataBank = offset & 0xff0000;
  const short = getShort(offset, defaultROM);
  return dataBank + short;
};
// this returned value is little endian
export const getTriple = (offset: number, defaultROM = false) => {
  const shortValue = getShort(offset, defaultROM);
  const finalByte = getByte(offset + 2, defaultROM) << 16;
  return finalByte | shortValue;
};

export const getOffset = () => {
  return store.getState().ROM.offset;
};

export const getUsingDefaultROM = () => {
  return store.getState().ROM.defaultRom !== undefined;
};
export const incOffset = (amount = 1) => {
  store.dispatch(setOffsetStore(getOffset() + amount));
};

export const setOffset = (offset: number) => {
  store.dispatch(setOffsetStore(offset));
};

export const getHeader = () => {
  return store.getState().ROM.data.header;
};

export const getNextByte = (defaultROM = false) => {
  const byte = getByte(store.getState().ROM.offset, defaultROM);
  incOffset();
  return byte;
};

export const getNextShort = (defaultROM = false) => {
  const short = getShort(store.getState().ROM.offset, defaultROM);
  setOffset(store.getState().ROM.offset + 2);
  return short;
};

export const getNextTriple = (defaultROM = false) => {
  const triple = getTriple(store.getState().ROM.offset, defaultROM);
  setOffset(store.getState().ROM.offset + 3);
  return triple;
};

export const inferNextTriple = (defaultROM = false) => {
  const triple = inferTriple(store.getState().ROM.offset, defaultROM);
  setOffset(store.getState().ROM.offset + 2);
  return triple;
};

export const setNextByte = (byte: number) => {
  const finalByte = byte & 0xff;
  store.dispatch(setByte({ value: finalByte }));
  incOffset();
};

export const setNextShort = (short: number) => {
  const unsignedByte1 = short & 0xff;
  const unsignedByte2 = short << 8;
  setNextByte(unsignedByte1);
  setNextByte(unsignedByte2);
};

export const setNextTriple = (short: number) => {
  const unsignedByte1 = short & 0xff;
  const unsignedByte2 = short << 8;
  const unsignedByte3 = short << 16;
  setNextByte(unsignedByte1);
  setNextByte(unsignedByte2);
  setNextByte(unsignedByte3);
};

export const nextPointerInROM = () => {
  return pointerInROM(getTriple(store.getState().ROM.offset));
};
