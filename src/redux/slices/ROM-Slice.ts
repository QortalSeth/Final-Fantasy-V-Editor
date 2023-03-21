import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable import/no-cycle */
import { tripleToString } from 'src/utils/NumberFormatConverter';
import { RootState } from '../store';

const debugRomSlice = false;

export type SerialzedModels = Array<{ name: string; models: string }>;

export interface ROMState {
  rom: number[];
  defaultRom: number[];
  data: ROMData;
  offset: number;
  models: SerialzedModels;
}
export interface ROMData {
  path: string;
  header: number;
}

export const getHeader = (size: number): number => {
  return size % 1024 === 0 ? 0 : 1024;
};

const initialState: ROMState = {
  rom: [],
  defaultRom: [],
  data: { path: 'Final Fantasy V.smc', header: 0 },
  offset: 0,
  models: [],
};

const ROMSlice = createSlice({
  name: 'ROM',
  initialState,

  reducers: {
    setROM(state, action: PayloadAction<ROMState>) {
      state.rom = action.payload.rom;
      state.data = action.payload.data;
      if (debugRomSlice) console.log('action types', typeof ROMSlice.actions.setROM);
    },
    setDefaultROM(state, action: PayloadAction<ROMState>) {
      state.defaultRom = action.payload.rom;
      if (debugRomSlice) console.log('action types', typeof ROMSlice.actions.setROM);
    },
    setModels(state, action: PayloadAction<SerialzedModels>) {
      state.models = action.payload;
      if (debugRomSlice) console.log('action types', typeof ROMSlice.actions.setModels);
    },
    updateModels(state, action: PayloadAction<{ index: number; models: string }>) {
      const { index, models } = action.payload;
      state.models[index].models = models;
    },
    setByte(state, action: PayloadAction<{ offset?: number; value: number }>) {
      if (action.payload.offset) {
        state.rom[action.payload.offset + state.data.header] = action.payload.value & 0xff;
      } else {
        state.rom[state.offset + state.data.header] = action.payload.value & 0xff;
        state.offset += 1;
      }
    },
    setOffsetStore(state, action: PayloadAction<number>) {
      state.offset = action.payload + state.data.header;
      if (debugRomSlice) console.log('Offset Payload: ', tripleToString(action.payload));
      if (debugRomSlice) console.log('New offset is: ', tripleToString(state.offset));
    },
  },
});

export const romState = (state: RootState) => state.ROM;

export const byteSelector = (state: ROMState, offset?: number, defaultROM = false) => {
  const finalOffset = (offset || state.offset) + state.data.header;
  if (debugRomSlice) console.log('byteSelector Final Offset is: ', finalOffset);
  return defaultROM ? state.defaultRom[finalOffset] : state.rom[finalOffset] & 0xff;
};

export const { setROM, setDefaultROM, setModels, setOffsetStore, setByte } = ROMSlice.actions;
export default ROMSlice.reducer;
