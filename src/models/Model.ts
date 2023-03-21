import { metaCharacters, TextData } from 'src/models/text/TextManager';
import { IconData, ObservableItem } from 'src/models/ObservableItem';

import {
  getHeader,
  getNextByte,
  getNextShort,
  getNextTriple,
  setNextByte,
  setNextShort,
  setNextTriple,
  setOffset,
} from '../utils/StoreAccess';

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
    this.iconData = this.getIconData(Model.icons, iconIndexes);
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

  static icons = new Map<string, IconData>([
    ['sword', { name: 'swordIcon', width: '30px', height: '20px' }],
    ['white', { name: 'whiteIcon', width: '30px', height: '20px' }],
    ['black', { name: 'blackIcon', width: '30px', height: '20px' }],
    ['time', { name: 'timeIcon', width: '30px', height: '20px' }],
    ['summon1', { name: 'summonIcon1', width: '30px', height: '20px' }],
    ['summon2', { name: 'summonIcon2', width: '30px', height: '20px' }],
    ['song', { name: 'songIcon', width: '30px', height: '20px' }],
    ['dragoon', { name: 'dragoonIcon', width: '30px', height: '20px' }],
    ['harp', { name: 'harpIcon', width: '30px', height: '20px' }],
    ['dance', { name: 'danceIcon', width: '30px', height: '20px' }],
    ['blue', { name: 'blueIcon', width: '30px', height: '20px' }],
    ['enemy', { name: 'enemyIcon', width: '30px', height: '20px' }],
    ['whip', { name: 'whipIcon', width: '30px', height: '20px' }],
  ]);

  getIconData(valueMap: Map<string, IconData>, iconIndexes?: { start: number; end: number; key: string }[]) {
    if (iconIndexes) {
      // eslint-disable-next-line consistent-return,no-restricted-syntax
      for (const { start, end, key } of iconIndexes) {
        if (this.gameIndex >= start && this.gameIndex <= end) {
          return valueMap.get(key) || ObservableItem.emptyIconData;
        }
      }
    }
    return ObservableItem.emptyIconData;
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
