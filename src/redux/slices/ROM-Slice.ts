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

const payloadNextByte = (action: PayloadAction<{ offset?: number; value: number }>) => {
  if (action.payload.offset) action.payload.offset += 1;
  action.payload.value >>= 8;
  return action;
};

const setByte2 = (state: ROMState, action: PayloadAction<{ offset?: number; value: number }>) => {
  if (action.payload.offset) {
    state.rom[action.payload.offset + state.data.header] = action.payload.value & 0xff;
  } else {
    state.rom[state.offset + state.data.header] = action.payload.value & 0xff;
    state.offset += 1;
  }
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
      setByte2(state, action);
    },
    setShort(state, action: PayloadAction<{ offset?: number; value: number }>) {
      setByte2(state, action);
      payloadNextByte(action);
      setByte2(state, action);
    },
    setTriple(state: ROMState, action: PayloadAction<{ offset?: number; value: number }>) {
      setByte2(state, action);
      payloadNextByte(action);
      setByte2(state, action);
      payloadNextByte(action);
      setByte2(state, action);
    },
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload + state.data.header;
      // console.log('Offset Payload: ', action.payload);
      // console.log('New offset is: ', state.offset);
    },
  },
});

export const romState = (state: RootState) => state.ROM;

// export const byteSelector = createSelector(
//   [romState, (offset?: number) => offset],
//   // eslint-disable-next-line @typescript-eslint/no-shadow
//   (romState, offset) => {
//     console.log('In byte selector');
//     console.log('offset: ', offset);
//     console.log('romstate: ', romState);
//     const finalOffset = (offset || romState.offset) + romState.data.header;
//     if (!offset) romState.offset += 1;
//     return romState.rom[finalOffset];
//   }
// );

export const byteSelector = (state: ROMState, offset?: number) => {
  const finalOffset = (offset || state.offset) + state.data.header;
  return state.rom[finalOffset];
};

export const shortSelector = createSelector(
  [romState, (state, offset?: number) => offset],
  // eslint-disable-next-line @typescript-eslint/no-shadow
  (romState, offset) => {
    const shortOffset = (offset || romState.offset) + romState.data.header;
    let short = romState.rom[shortOffset];
    short <<= 8;
    short |= romState.rom[shortOffset + 1];
    if (!offset) romState.offset += 2;
    return short;
  }
);

export const tripleSelector = createSelector(
  [romState, (state, offset?: number) => offset],
  // eslint-disable-next-line @typescript-eslint/no-shadow
  (romState, offset) => {
    const tripleOffset = (offset || romState.offset) + romState.data.header;
    let triple = romState.rom[tripleOffset];
    triple <<= 8;
    triple |= romState.rom[tripleOffset + 1];
    triple <<= 8;
    triple |= romState.rom[tripleOffset + 2];
    if (!offset) romState.offset += 3;
    return triple;
  }
);

export const { setROM, setOffset, setByte } = ROMSlice.actions;
export default ROMSlice.reducer;
