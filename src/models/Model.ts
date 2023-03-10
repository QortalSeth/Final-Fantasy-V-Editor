// eslint-disable-next-line max-classes-per-file
import { metaCharacters, TextData } from 'src/models/text/ReadText';

import {
  getHeader,
  getNextByte,
  getNextShort,
  getNextTriple,
  setNextByte,
  setNextShort,
  setNextTriple,
  setOffset,
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

  modelConstructor(m: Model) {
    this.name = m.name;
    this.value = m.value;
    this.label = m.label;
    this.icon = m.icon;
    this.listIndex = m.listIndex;
    this.chronologicalIndex = m.chronologicalIndex;
  }
}

export const formatName = (name: string) => {
  const metaCharactersS = Array.from(metaCharacters.values());
  let replacedName = name;
  metaCharactersS.forEach((mc) => {
    replacedName = replacedName.replaceAll(mc, '');
  });

  return replacedName;
};

abstract class Model extends ObservableItem {
  gameIndex: number;

  nameData: TextData;

  offset: number = 0;

  protected constructor(index: number, nameData: TextData, iconIndexes?: { start: number; end: number; key: string }[]) {
    super(formatName(nameData.text));
    this.nameData = nameData;
    this.gameIndex = index;
    this.icon = this.getValueFromGameIndex(Model.icons, iconIndexes);
  }

  modelConstructor(m: Model) {
    super.modelConstructor(m);
    this.nameData = m.nameData;
    this.gameIndex = m.gameIndex;
  }

  initializeOffset = (offset?: number) => {
    setOffset(offset || this.offset);
  };

  getHeader = () => getHeader();

  abstract getValuesFromROM(defaultROM: boolean): void;
  abstract writeValuesToROM(): void;

  static baseIconDir = 'assets/TextIcons/';

  static icons = new Map<string, string>([
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

  getValueFromGameIndex(valueMap: Map<string, string>, iconIndexes?: { start: number; end: number; key: string }[]) {
    if (iconIndexes) {
      // eslint-disable-next-line consistent-return,no-restricted-syntax
      for (const { start, end, key } of iconIndexes) {
        if (this.gameIndex >= start && this.gameIndex <= end) {
          return valueMap.get(key) || '';
        }
      }
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

  // toJSON(): object {
  //   return {
  //     name: this.name,
  //     icon: this.icon,
  //     nameData: this.nameData,
  //     offset: this.offset,
  //     gameIndex: this.gameIndex,
  //     value: this.value,
  //     labeL: this.label,
  //   };
  // }
}

export default Model;
