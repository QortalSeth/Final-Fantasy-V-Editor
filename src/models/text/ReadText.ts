import { getNextByte, getOffset, setOffset } from 'src/utils/StoreAccess';
/* eslint-disable no-continue, no-labels, no-restricted-syntax */
import { defaultEndText, TextData, textReadMap } from 'src/models/text/TextManager';
import { numToHexDigits, numToHexString, printHexPointerArray, tripleToString } from 'src/utils/NumberFormatConverter';

const debugReadText = false;

export const readText = (pointer: number, sizeLimit = 20, endText = defaultEndText) => {
  if (debugReadText) console.log('reading text');

  let text = '';
  let readNext = true;

  setOffset(pointer);
  if (debugReadText) console.log('offset set at: ', getOffset());

  let textLength = 0;

  let firstChar = true;
  while (readNext) {
    const nextByte = getNextByte();

    if (debugReadText) console.log('next byte is: ', nextByte);
    textLength += 1;
    if (textLength >= sizeLimit) {
      if (debugReadText) console.log('size limit of ', sizeLimit, 'reached');
      readNext = false;
    }

    if (endText.includes(nextByte) && !firstChar) {
      readNext = false;
      if (!defaultEndText.includes(nextByte)) continue;
    }
    const textValue =
      textReadMap.get(nextByte) !== undefined ? textReadMap.get(nextByte) : `(Value: 0x${numToHexString(nextByte)} Missing)`;
    if (debugReadText) console.log('Byte Value: ', nextByte, '  Text Value: ', textValue);

    text += textValue;
    firstChar = false;
  }

  return text;
};

export const readBytes = (pointer: number, sizeLimit = 20, endText = defaultEndText) => {
  if (debugReadText) console.log('reading text');

  const bytes: string[] = [];
  let readNext = true;

  setOffset(pointer);
  if (debugReadText) console.log('offset set at: ', getOffset());

  let textLength = 0;

  while (readNext) {
    const nextByte = getNextByte();
    if (nextByte) {
      bytes.push(numToHexString(nextByte));
    } else return bytes;

    if (debugReadText) console.log('next byte is: ', nextByte);

    textLength += 1;
    if (textLength >= sizeLimit) {
      if (debugReadText) console.log('size limit of ', sizeLimit, 'reached');
      readNext = false;
    }

    if (endText.includes(nextByte)) {
      readNext = false;
      if (!defaultEndText.includes(nextByte)) continue;
    }
    const textValue =
      textReadMap.get(nextByte) !== undefined ? textReadMap.get(nextByte) : `(Value: 0x${numToHexString(nextByte)} Missing)`;
    if (debugReadText) console.log('Byte Value: ', nextByte.toString(16), '  Text Value: ', textValue);
  }
  return bytes;
};
const formatText = (text: string, prefix: string, newLineAfter: number) => {
  const textWithPrefix = prefix + text;
  const finalTextString = text.length > newLineAfter ? `\n${textWithPrefix.trim()}\n` : textWithPrefix;
  return finalTextString;
};
export const processPointers = (
  pointers: number[],
  sizeLimit = 10,
  endText = defaultEndText,
  startIndex = 0
): [string, TextData[]] => {
  let returnText = '';
  const jsonText: TextData[] = [];
  const maxOffsetDigits = numToHexDigits(startIndex + pointers.length);
  pointers.forEach((pointer, index) => {
    const indexMod = index + startIndex;
    // const indexString =
    //   indexMod < 0x10
    //     ? `00${numToHexString(indexMod)}`
    //     : indexMod < 0xff
    //     ? `0${numToHexString(indexMod)}`
    //     : numToHexString(indexMod);
    let indexString = numToHexString(indexMod, false);
    while (numToHexDigits(indexString) < maxOffsetDigits) indexString = `0${indexString}`;

    const pointerString = tripleToString(pointer, false);
    const text = readText(pointer, sizeLimit, endText).trim().replaceAll('~SPACE~', '');
    const textString = formatText(text, '    Text is: ', 40);

    const bytes = readBytes(pointer, sizeLimit, endText);
    const bytesString = bytes.toString().replaceAll(',', ' ');
    const bytesFinalString = formatText(bytesString, '    Bytes: ', 40);
    jsonText.push({
      index: indexString,
      offset: pointerString,
      byteLength: bytes.length,
      bytes: bytesString.trim(),
      text,
    });
    returnText += `Offset ${indexString}: ${pointerString}${bytesFinalString}${textString}\n\n`;
  });

  return [returnText, jsonText];
};

export const findTextPointersVar = (basePointer: number, maxTextCount = 10, endText = defaultEndText) => {
  const pointers: number[] = [basePointer];
  setOffset(basePointer);
  let stringFinished = false;
  let textCount = 0;
  while (textCount < maxTextCount - 1) {
    // gets pointers to textCount number of strings
    const nextByte = getNextByte();

    if (endText.includes(nextByte)) {
      // determines when the string being examined ends
      stringFinished = true;
    }

    if (!endText.includes(nextByte) && stringFinished) {
      // determines when the next string begins
      stringFinished = false;
      pointers.push(getOffset() - 1); // subtracting by 1 is because the getNextByte() call increments offset by 1
      textCount++;
    }
  }
  return pointers;
};

const dontCountValue = [0xff];
export const findTextPointersFixed = (basePointer: number, maxByteCount = 9999, maxTextCount = 10, endText = defaultEndText) => {
  const pointers: number[] = [basePointer];
  setOffset(basePointer);
  let stringFinished = false;
  let textCount = 0;
  let byteCount = 0;
  while (textCount < maxTextCount - 1) {
    // gets pointers to textCount number of strings
    const nextByte = getNextByte();

    if (byteCount === 0 && dontCountValue.includes(nextByte)) continue;
    if (byteCount >= maxByteCount) {
      // determines when the string being examined ends
      stringFinished = true;
    }

    if (!endText.includes(nextByte) && !dontCountValue.includes(nextByte) && stringFinished) {
      // determines when the next string begins
      stringFinished = false;
      byteCount = 0;
      pointers.push(getOffset() - 1); // subtracting by 1 is because the getNextByte() call increments offset by 1
      textCount++;
    }
    byteCount += 1;
  }
  return pointers;
};

export const readTextBulkVarLength = (
  basePointer: number,
  maxTextCount = 10,
  endText: number[] = defaultEndText,
  startIndex = 0
) => {
  const pointers = findTextPointersVar(basePointer, maxTextCount);
  printHexPointerArray(pointers, {
    includeHexPrefix: true,
    includeSpaces: true,
    newline: 5,
    prefix: 'pointers to text to read are: ',
  });

  return processPointers(pointers, 9999, endText, startIndex);
};

export const readTextBulkFixedLength = (basePointer: number, maxByteCount = 6, maxTextCount = 10, startIndex = 0) => {
  const pointers = findTextPointersFixed(basePointer, maxByteCount, maxTextCount);
  printHexPointerArray(pointers, {
    includeHexPrefix: true,
    includeSpaces: true,
    newline: 5,
    prefix: 'pointers to text to read are: ',
  });

  return processPointers(pointers, maxByteCount, [], startIndex);
};

export default readText;
