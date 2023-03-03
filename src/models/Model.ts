// eslint-disable-next-line max-classes-per-file
import store from '../redux/store';
import {
  getNextByte,
  getNextShort,
  getNextTriple,
  setNextByte,
  setNextShort,
  setNextTriple,
  setOffset,
  getHeader,
} from '../utils/ROM';

export class ObservableItem {
  name: string = '';

  value: string = '';

  label: string = '';

  icon: string = '';

  listIndex: number = 0;

  chronologicalIndex: number = 0;

  constructor(name = '', listIndex = 0, icon = '', chronologicalIndex = 0) {
    this.name = name;
    this.value = name;
    this.label = name;
    this.icon = icon;
    this.listIndex = listIndex;
    this.chronologicalIndex = chronologicalIndex;
  }
}
abstract class Model extends ObservableItem {
  gameIndex: number;

  namePointer: number = 0;

  store = store;

  abstract baseOffset: number;

  abstract bytesPerModel: number;

  constructor(index: number) {
    super();
    this.gameIndex = index;
    this.getValuesFromROM();
  }

  getModelOffset() {
    return this.gameIndex * this.bytesPerModel + this.baseOffset + getHeader();
  }

  modelConstructor(m: Model) {
    this.name = m.name;
    this.icon = m.icon;
    this.gameIndex = m.gameIndex;
    this.namePointer = m.namePointer;
    this.chronologicalIndex = m.chronologicalIndex;
    this.listIndex = m.listIndex;
  }

  initializeOffset = (offset?: number) => setOffset(offset || this.getModelOffset());

  getHeader = () => getHeader();

  abstract getValuesFromROM(): void;
  abstract writeValuesToROM(): void;

  getNextByte = () => getNextByte();

  getNextShort = () => getNextShort();

  getNextTriple = () => getNextTriple();

  setNextByte = (byte: number) => setNextByte(byte);

  setNextShort = (short: number) => setNextShort(short);

  setNextTriple = (triple: number) => setNextTriple(triple);

  toString(): string {
    return this.name.trim().length === 0 ? '(empty)' : this.name;
  }
}

export default Model;
