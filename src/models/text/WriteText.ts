import { allText, getSortedMapValues, metaCharacters, singleChars } from 'src/models/text/TextManager';

const debugWriteText = false;

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

const textWriteCompressed = new Map<number, string>(allText);
const textWriteUnCompressed = new Map<number, string>([...metaCharacters, ...singleChars]);

/* eslint-disable no-continue, no-labels, no-restricted-syntax */
export const textToBytes = (text: string, compress = false): number[] => {
  const textMap = compress ? textWriteCompressed : textWriteUnCompressed;
  const sortedValues = getSortedMapValues(textMap);

  const bytes: number[] = [];
  let textRemaining = text;

  while (textRemaining.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    const byteText = sortedValues.find((str) => textRemaining.startsWith(str));
    const byteNum = getByValue(textMap, byteText);
    if (byteNum != null && byteText) {
      bytes.push(byteNum);
      textRemaining = textRemaining.slice(byteText.length);
    } else {
      textRemaining.slice(1);
    }
  }

  return bytes;
};
