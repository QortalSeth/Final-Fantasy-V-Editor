import { printHexByteArray } from '../utils/ROM';

const textWriteMap6 = new Map<number, string>([
  [0x02, '~BARTZ'],
  [0xbf, '~HAMMR'],
  [0xc1, '~RIBBN'],
  [0xc2, '~DRINK'],
  [0xc6, '~SURKN'],
  [0xc8, '~SCRLL'],
  [0xcc, '~GLOVE'],
  [0xe3, '~SWORD'],
  [0xe4, '~WHITE'],
  [0xe5, '~BLACK'],
  [0xe6, '~DIMEN'],
  [0xe7, '~KNIFE'],
  [0xe8, '~SPEAR'],
  [0xea, '~KATAN'],
  [0xec, '~STAFF'],
  [0xf1, '~SHELD'],
  [0xf3, '~ARMOR'],
]);

const textWriteMap5 = new Map<number, string>([
  [0xbd, '~SHOE'],
  [0xbe, '~MISC'],
  [0xc0, '~TENT'],
  [0xc3, '~SUIT'],
  [0xc4, '~SONG'],
  [0xca, '~CLAW'],
  [0xee, '~HARP'],
  [0xef, '~WHIP'],
  [0xf0, '~BELL'],
  [0xf2, '~HELM'],
  [0xf4, '~RING'],
]);

const textWriteMap4 = new Map<number, string>([
  [0xbc, '~KEY'],
  [0xe9, '~AXE'],
  [0xeb, '~ROD'],
  [0xed, '~BOW'],
  [0xff, '~END'],
]);

const textWriteMap3 = new Map<number, string>([
  [0xc7, '...'],
  [0xe0, '/\\'],
]);

const textWriteMap2 = new Map<number, string>([
  [0x20, 'A '],
  [0x21, 'B '],
  [0x22, 'C '],
  [0x23, 'D '],
  [0x24, 'E '],
  [0x25, 'F '],
  [0x26, 'G '],
  [0x27, 'H '],
  [0x28, 'I '],
  [0x29, 'J '],
  [0x2a, 'K '],
  [0x2b, 'L '],
  [0x2c, 'M '],
  [0x2d, 'N '],
  [0x2e, 'O '],
  [0x2f, 'P '],
  [0x30, 'Q '],
  [0x31, 'R '],
  [0x32, 'S '],
  [0x33, 'T '],
  [0x34, 'U '],
  [0x35, 'V '],
  [0x36, 'W '],
  [0x37, 'X '],
  [0x38, 'Y '],
  [0x39, 'Z '],
  [0x94, 'il'],
  [0x95, 'it'],
  [0x97, 'li'],
  [0x98, 'll'],
  [0xa4, 'ti'],
  [0xa5, 'fi'],
  [0xac, 'if'],
  [0xad, 'It'],
  [0xae, 'tl'],
  [0xaf, 'ir'],
  [0xb0, 'tt'],
  [0xd0, '|-'],
  [0xd1, ' |'],
  [0xe1, '-}'],
]);

const noCompressValues = [0x94, 0x95, 0x97, 0x98, 0xa4, 0xa5, 0xac, 0xad, 0xae, 0xaf, 0xb0];

const textWriteMap1 = new Map<number, string>([
  [0x1, '\n'],
  [0x53, '0'],
  [0x54, '1'],
  [0x55, '2'],
  [0x56, '3'],
  [0x57, '4'],
  [0x58, '5'],
  [0x59, '6'],
  [0x5a, '7'],
  [0x5b, '8'],
  [0x5c, '9'],
  [0x60, 'A'],
  [0x61, 'B'],
  [0x62, 'C'],
  [0x63, 'D'],
  [0x64, 'E'],
  [0x65, 'F'],
  [0x66, 'G'],
  [0x67, 'H'],
  [0x68, 'I'],
  [0x69, 'J'],
  [0x6a, 'K'],
  [0x6b, 'L'],
  [0x6c, 'M'],
  [0x6d, 'N'],
  [0x6e, 'O'],
  [0x6f, 'P'],
  [0x70, 'Q'],
  [0x71, 'R'],
  [0x72, 'S'],
  [0x73, 'T'],
  [0x74, 'U'],
  [0x75, 'V'],
  [0x76, 'W'],
  [0x77, 'X'],
  [0x78, 'Y'],
  [0x79, 'Z'],
  [0x7a, 'a'],
  [0x7b, 'b'],
  [0x7c, 'c'],
  [0x7d, 'd'],
  [0x7e, 'e'],
  [0x7f, 'f'],
  [0x80, 'g'],
  [0x81, 'h'],
  [0x82, 'i'],
  [0x83, 'j'],
  [0x84, 'k'],
  [0x85, 'l'],
  [0x86, 'm'],
  [0x87, 'n'],
  [0x88, 'o'],
  [0x89, 'p'],
  [0x8a, 'q'],
  [0x8b, 'r'],
  [0x8c, 's'],
  [0x8d, 't'],
  [0x8e, 'u'],
  [0x8f, 'v'],
  [0x90, 'w'],
  [0x91, 'x'],
  [0x92, 'y'],
  [0x93, 'z'],
  [0x96, ' '],
  [0x99, "'"],
  [0x9b, ':'],
  [0x9d, ','],
  [0x9e, '('],
  [0x9f, ')'],
  [0xa0, '/'],
  [0xa1, '!'],
  [0xa2, '?'],
  [0xa3, '.'],
  [0xc5, '-'],
  [0xc9, '!'],
  [0xcb, '?'],
  [0xcd, '%'],
  [0xce, '/'],
  [0xcf, ':'],
  [0xe2, '+'],
]);

const getByValue = (map: Map<number, string>, searchValue: string | undefined) => {
  if (!searchValue) {
    return undefined;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
  return undefined;
};

const getSubString = (text: string, index: number, length: number) => {
  const endIndex = index + length;
  // console.log('(substring) text is: ', text, ' index is ', index, ' length is: ', length, ' endIndex is: ', endIndex);
  if (endIndex > text.length) return undefined;
  const subText = text.substring(index, endIndex);
  // console.log('Substring of size ', length, ' is: ', subText);
  return subText;
};

const getByte = (map: Map<number, string>, text: string, length: number, index: number) => {
  // console.log('text is: ', text, 'length is: ', length, 'index is: ', index);
  return getByValue(map, getSubString(text, index, length));
};

const textWriteMaps = new Map<number, Map<number, string>>([
  [6, textWriteMap6],
  [5, textWriteMap5],
  [4, textWriteMap4],
  [3, textWriteMap3],
  [2, textWriteMap2],
  [1, textWriteMap1],
]);

/* eslint-disable no-continue, no-labels, no-restricted-syntax */

export const textToBytes = (text: string, noCompress = false): number[] => {
  const bytes: number[] = [];
  let index = 0;

  mainLoop: while (index < text.length) {
    for (let i = 6; i > 0; i--) {
      const map = textWriteMaps.get(i);
      if (map) {
        const byte = getByte(map, text, i, index);

        const noCompression = i === 2 && noCompress && byte && noCompressValues.includes(byte);

        if (byte && !noCompression) {
          // console.log('byte is: ', byte.toString(16).toUpperCase());
          // console.log('bytes before push: ', bytes);
          bytes.push(byte);
          // console.log('bytes after push: ', bytes);
          index += i;
          // printArray(bytes, { includePrefix: false, includeSpaces: true }, 'bytes with added byte: ');
          // console.log('break out of for loop');
          continue mainLoop;
        }
      } else return bytes;
    }
    index += 1;
    // return bytes;
  }
  // printArray(bytes, { includePrefix: false, includeSpaces: true }, 'Returned Bytes are: ');

  return bytes;
};
