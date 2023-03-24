import textTable from 'assets/Text/RPGe/Table.json';

export interface TextData {
  index: string;
  offset: string;
  byteLength: number;
  bytes: string;
  text: string;
}

const jsonToHexMap = (object: { [s: string]: unknown } | ArrayLike<unknown>) => {
  const entries = Object.entries(object);
  const map = new Map<number, string>();
  entries.map((key) => {
    map.set(parseInt(key[0], 16), <string>key[1]);
    return key;
  });
  return map;
};

export const getSortedMapValues = (m: Map<number, string>) => {
  return [...m]
    .map((e) => {
      return e[1];
    })
    .slice()
    .sort((a, b) => {
      return b.length - a.length;
    });
};

export const miscText = jsonToHexMap(textTable.miscText);
export const weaponText = jsonToHexMap(textTable.weaponText);
export const armorText = jsonToHexMap(textTable.armorText);
export const spellText = jsonToHexMap(textTable.spellText);
export const metaCharacters = new Map<number, string>([...miscText, ...weaponText, ...armorText, ...spellText]);
export const compressionText = jsonToHexMap(textTable.compressionText);
export const singleChars = jsonToHexMap(textTable.singleChars);
export const allText = jsonToHexMap(textTable.allText);
// prettier-ignore
export const textReadMap = jsonToHexMap(textTable.allText)
export const defaultEndText = [0x00, 0xff];
export const alternateEndText = [...defaultEndText, ...Array.from(metaCharacters.keys())];
