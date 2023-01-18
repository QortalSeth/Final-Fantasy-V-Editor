import store from '../redux/store';
import ROMSlice, {
  romState,
  setOffset,
  byteSelector,
  shortSelector,
  tripleSelector,
  setByte,
} from '../redux/slices/ROM-Slice';

abstract class Model {
  name: string = '';

  gameIndex: number;

  namePointer: number = 0;

  chronologicalIndex: number = 0;

  listIndex: number = 0;

  store = store;

  state = romState(store.getState());

  abstract baseOffset: number;

  abstract bytesPerModel: number;

  constructor(index: number) {
    this.gameIndex = index;
    this.getValuesFromROM();
  }

  modelConstructor(m: Model) {
    this.name = m.name;
    this.gameIndex = m.gameIndex;
    this.namePointer = m.namePointer;
    this.chronologicalIndex = m.chronologicalIndex;
    this.listIndex = m.listIndex;
  }

  setOffset() {
    const offset = this.baseOffset + this.bytesPerModel * this.gameIndex + store.getState().ROM.data.header;
    store.dispatch(setOffset(offset));
    console.log('offset set, value is: ', offset === store.getState().ROM.offset ? 'correct' : 'incorrect');
  }

  abstract getValuesFromROM(): void;
  abstract writeValuesToROM(): void;

  getNextByte() {
    return byteSelector(this.state);
  }

  getNextShort() {
    return shortSelector(this.state);
  }

  getNextTriple() {
    return tripleSelector(this.state);
  }

  setNextByte(byte: number) {
    this.store.dispatch(setByte({ value: byte }));
  }

  setNextShort(short: number) {
    this.store.dispatch(setByte({ value: short }));
  }

  setNextTriple(triple: number) {
    this.store.dispatch(setByte({ value: triple }));
  }

  toString(): string {
    if (this.name.trim().length === 0) return '(empty)';
    return this.name;
  }
}

export default Model;
