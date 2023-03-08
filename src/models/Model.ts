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

  protected constructor(
    index: number,
    name: string,
    defaultROM = false,
    iconIndexes?: { start: number; end: number; key: string }[]
  ) {
    super(name);
    this.gameIndex = index;
    this.getValuesFromROM(defaultROM);
    this.icon = this.getIconFromGameIndex(iconIndexes);
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

  initializeOffset = (offset?: number) => {
    setOffset(offset || this.getModelOffset());
  };

  getHeader = () => getHeader();

  abstract getValuesFromROM(defaultROM: boolean): void;
  abstract writeValuesToROM(): void;
  baseIconDir = 'assets/TextIcons/';

  icons = new Map<string, string>([
    ['sword', '00 - Sword Icon.png'],
    ['white', '01 - White Magic Icon (FF4).png'],
    ['black', '02 - Black Magic Icon (FF4).png'],
    ['time', '03 - Time Magic Icon.png'],
    ['summon', '04 - Summon Icon.png'],
    ['song', '05 - Song Icon.png'],
    ['dragoon', '06 - Dragoon Icon.png'],
    ['harp', '07 - Harp.png'],
    ['dancer', '08 - Dancer Icon?.png'],
    ['blue', '09 - Blue Magic Icon.png'],
    ['enemy', '10 - Apocalypse Icon.png'],
    ['whip', '11 - Whip Icon.png'],
  ]);

  getIconFromGameIndex(iconIndexes?: { start: number; end: number; key: string }[]) {
    if (iconIndexes) {
      // eslint-disable-next-line consistent-return
      iconIndexes.forEach(({ start, end, key }) => {
        if (this.gameIndex >= start && this.gameIndex <= end) {
          return this.icons.get(key) || '';
        }
      });
    }
    return '';
  }

  getNextByte = (defaultROM = false) => getNextByte(defaultROM);

  getNextShort = (defaultROM = false) => getNextShort(defaultROM);

  getNextTriple = (defaultROM = false) => getNextTriple(defaultROM);

  setNextByte = (byte: number) => setNextByte(byte);

  setNextShort = (short: number) => setNextShort(short);

  setNextTriple = (triple: number) => setNextTriple(triple);

  toString(): string {
    return this.name.trim().length === 0 ? '(empty)' : this.name;
  }

  equals(o: Model): boolean {
    return this.gameIndex !== o.gameIndex;
  }
}

export default Model;
