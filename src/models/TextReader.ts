import { getOffset, getNextByte, setOffset } from '../utils/ROM';

// prettier-ignore
const textReadMap = new Map<number, string>([
  [0x1, '\n'],
  [0x2, 'Bartz'],
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
  [0x2A, 'K '],
  [0x2B, 'L '],
  [0x2C, 'M '],
  [0x2D, 'N '],
  [0x2E, 'O '],
  [0x2F, 'P '],
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
  [0x53, '0'],
  [0x54, '1'],
  [0x55, '2'],
  [0x56, '3'],
  [0x57, '4'],
  [0x58, '5'],
  [0x59, '6'],
  [0x5A, '7'],
  [0x5B, '8'],
  [0x5C, '9'],
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
  [0x6A, 'K'],
  [0x6B, 'L'],
  [0x6C, 'M'],
  [0x6D, 'N'],
  [0x6E, 'O'],
  [0x6F, 'P'],
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
  [0x7A, 'a'],
  [0x7B, 'b'],
  [0x7C, 'c'],
  [0x7D, 'd'],
  [0x7E, 'e'],
  [0x7F, 'f'],
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
  [0x8A, 'q'],
  [0x8B, 'r'],
  [0x8C, 's'],
  [0x8D, 't'],
  [0x8E, 'u'],
  [0x8F, 'v'],
  [0x90, 'w'],
  [0x91, 'x'],
  [0x92, 'y'],
  [0x93, 'z'],
  [0x94, 'il'],
  [0x95, 'it'],
  [0x96, ' '],
  [0x97, 'li'],
  [0x98, 'll'],
  [0x99, '\''],
  [0x9B, ':'],
  [0x9D, ','],
  [0x9E, '('],
  [0x9F, ')'],
  [0xA0, '/'],
  [0xA1, '!'],
  [0xA2, '?'],
  [0xA3, '.'],
  [0xA4, 'ti'],
  [0xA5, 'fi'],
  [0xAC, 'if'],
  [0xAD, 'It'],
  [0xAE, 'tl'],
  [0xAF, 'ir'],
  [0xB0, 'tt'],
  [0xBC, 'KEY'],
  [0xBD, 'SHOE'],
  [0xBE, 'MISC'],
  [0xBF, 'HAMR'],
  [0xC0, 'TENT'],
  [0xC1, 'RIBN'],
  [0xC2, 'DRNK'],
  [0xC3, 'SUIT'],
  [0xC4, 'SONG'],
  [0xC5, '-'],
  [0xC6, 'SHUR'],
  [0xC7, '...'],
  [0xC8, 'SCRL'],
  [0xC9, '!'],
  [0xCA, 'CLAW'],
  [0xCB, '?'],
  [0xCC, 'GLOV'],
  [0xCD, '%'],
  [0xCE, '/'],
  [0xCF, ':'],
  [0xD0, '|-'],
  [0xD1, ' |'],
  [0xE0, '/\\'],
  [0xE1, '-}'],
  [0xE2, '+'],
  [0xE3, 'SWRD'],
  [0xE4, 'WHIT'],
  [0xE5, 'BLAK'],
  [0xE6, 'DIMN'],
  [0xE7, 'KNIF'],
  [0xE8, 'SPER'],
  [0xE9, 'AXE'],
  [0xEA, 'KATN'],
  [0xEB, 'ROD'],
  [0xEC, 'STAF'],
  [0xED, 'BOW'],
  [0xEE, 'HARP'],
  [0xEF, 'WHIP'],
  [0xF0, 'BELL'],
  [0xF1, 'SHLD'],
  [0xF2, 'HELM'],
  [0xF3, 'ARMR'],
  [0xF4, 'RING'],
]);
export const readText = (pointer: number, sizeLimit = 20) => {
  //  console.log('reading text');

  let text = '';
  let readNext = true;

  setOffset(pointer);
  // console.log('offset set at: ', getOffset());

  let textLength = 0;

  while (readNext) {
    // console.log('textReader romstate: ', romstate);
    const nextByte = getNextByte();

    // console.log('next byte is: ', nextByte);
    textLength += 1;
    if (textLength > sizeLimit) {
      // console.log('size limit of ', sizeLimit, 'reached');
      readNext = false;
    }

    if (nextByte === 0xff) {
      readNext = false;
    } else {
      const textValue = textReadMap.get(nextByte) || '';
      //  console.log('Byte Value: ', nextByte.toString(16), '  Text Value: ', textValue);

      text += textValue;
    }
  }

  return text;
};

export default readText;
