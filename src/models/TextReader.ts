import store from '../redux/store';
import { byteSelector, setOffset } from '../redux/slices/ROM-Slice';

// prettier-ignore
const textMap = new Map<number, (char: string) => string>([
  [0x0, () => { return '|';  } ],
  [0x1, () => { return '>';  } ],
  [0x2, () => { return 'Bartz';  } ],
  [0x20, () => { return 'A';  } ],
  [0x21, () => { return 'B';  } ],
  [0x22, () => { return 'C';  } ],
  [0x23, () => { return 'D';  } ],
  [0x24, () => { return 'E';  } ],
  [0x25, () => { return 'F';  } ],
  [0x26, () => { return 'G';  } ],
  [0x27, () => { return 'H';  } ],
  [0x28, () => { return 'I';  } ],
  [0x29, () => { return 'J';  } ],
  [0x2A, () => { return 'K';  } ],
  [0x2B, () => { return 'L';  } ],
  [0x2C, () => { return 'M';  } ],
  [0x2D, () => { return 'N';  } ],
  [0x2E, () => { return 'O';  } ],
  [0x2F, () => { return 'P';  } ],
  [0x30, () => { return 'Q';  } ],
  [0x31, () => { return 'R';  } ],
  [0x32, () => { return 'S';  } ],
  [0x33, () => { return 'T';  } ],
  [0x34, () => { return 'U';  } ],
  [0x35, () => { return 'V';  } ],
  [0x36, () => { return 'W';  } ],
  [0x37, () => { return 'X';  } ],
  [0x38, () => { return 'Y';  } ],
  [0x39, () => { return 'Z';  } ],
  [0x53, () => { return '0';  } ],
  [0x54, () => { return '1';  } ],
  [0x55, () => { return '2';  } ],
  [0x56, () => { return '3';  } ],
  [0x57, () => { return '4';  } ],
  [0x58, () => { return '5';  } ],
  [0x59, () => { return '6';  } ],
  [0x5A, () => { return '7';  } ],
  [0x5B, () => { return '8';  } ],
  [0x5C, () => { return '9';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
  [0x, () => { return '';  } ],
]);

export const textReader = (pointer: number) => {
  let text = '';
  let readNextByte = true;
  let nextByte: number;
  setOffset(pointer);
  while (readNextByte) {
    nextByte = byteSelector(store.getState);
    if (nextByte === 0xff) {
      readNextByte = false;
    } else {
      text += textMap.get(nextByte);
    }
  }

  return text;
};

export default textReader;
