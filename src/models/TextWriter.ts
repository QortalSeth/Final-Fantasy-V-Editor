const textWriteMap4 = new Map<number, string>([
  [0xbd, 'SHOE'],

  [0xbe, 'MISC'],
  [0xbf, 'HAMR'],
  [0xc0, 'TENT'],
  [0xc1, 'RIBN'],
  [0xc2, 'DRNK'],
  [0xc3, 'SUIT'],
  [0xc4, 'SONG'],
  [0xc6, 'SHUR'],
  [0xc8, 'SCRL'],

  [0xca, 'CLAW'],
  [0xcc, 'GLOV'],

  [0xe3, 'SWRD'],
  [0xe4, 'WHIT'],
  [0xe5, 'BLAK'],
  [0xe6, 'DIMN'],
  [0xe7, 'KNIF'],
  [0xe8, 'SPER'],
  [0xea, 'KATN'],
  [0xec, 'STAF'],
  [0xee, 'HARP'],
  [0xef, 'WHIP'],
  [0xf0, 'BELL'],
  [0xf1, 'SHLD'],
  [0xf2, 'HELM'],
  [0xf3, 'ARMR'],
  [0xf4, 'RING'],
]);

const textWriteMap3 = new Map<number, string>([
  [0xbc, 'KEY'],
  [0xc7, '...'],
  [0xe0, '/\\'],
  [0xe9, 'AXE'],

  [0xeb, 'ROD'],

  [0xed, 'BOW'],
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
  if (endIndex > text.length) return undefined;
  return text.substring(index, endIndex);
};

const textToBytes = (text: string): number[] => {
  const bytes = [];
  let index = 0;
  while (index < text.length) {
    const byte =
      getByValue(textWriteMap4, getSubString(text, index, 4)) ||
      getByValue(textWriteMap3, getSubString(text, index, 3)) ||
      getByValue(textWriteMap2, getSubString(text, index, 2)) ||
      getByValue(textWriteMap1, getSubString(text, index, 1));

    if (!byte) return bytes;
    bytes.push(byte);
    index += 1;
  }
  return bytes;
};
