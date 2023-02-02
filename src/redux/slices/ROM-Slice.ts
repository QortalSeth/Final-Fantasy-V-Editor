import { createDraftSafeSelector, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Buffer } from 'buffer';
import { useSelector } from 'react-redux';
/* eslint-disable import/no-cycle */
import { RootState } from '../store';

export interface ROMState {
  rom: number[];
  data: ROMData;
  offset: number;
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
  data: { path: 'Final Fantasy V.smc', header: 0 },
  offset: 0,
};

const ROMSlice = createSlice({
  name: 'ROM',
  initialState,

  reducers: {
    setROM(state, action: PayloadAction<ROMState>) {
      state.rom = action.payload.rom;
      state.data = action.payload.data;
      console.log('action types', typeof ROMSlice.actions.setROM);
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
      console.log('Offset Payload: ', action.payload);
      console.log('New offset is: ', state.offset);
    },
  },
});

export const romState = (state: RootState) => state.ROM;

export const byteSelector = (state: ROMState, offset?: number) => {
  const finalOffset = (offset || state.offset) + state.data.header;
  //  console.log('byteSelector Final Offset is: ', finalOffset);
  return state.rom[finalOffset];
};

export const { setROM, setOffsetStore, setByte } = ROMSlice.actions;
export default ROMSlice.reducer;
