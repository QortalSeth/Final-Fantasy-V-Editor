import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { arrayToHexByteString, arrayToHexPointerString, printHex, printHexByteArray } from 'src/utils/NumberFormatConverter';
import { getTriple } from 'src/utils/StoreAccess';
import { textToBytes } from 'src/models/text/WriteText';
import { romState } from 'src/redux/slices/ROM-Slice';

export const TextInputReader: React.FC = () => {
  const state = useSelector(romState);

  const textToRead = useRef<HTMLTextAreaElement>(null);
  const byteValues = useRef<HTMLTextAreaElement>(null);
  const textLocations = useRef<HTMLTextAreaElement>(null);
  const textPointers = useRef<HTMLTextAreaElement>(null);
  const debugTextReader = true;
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '25% auto',
    gridGap: '0px',
    width: '100%',
    minHeight: '30px',
  };
  const labelStyle = { justifySelf: 'right', marginRight: '3px', alignSelf: 'center' };

  const displayedTextToBytes = (compress: boolean) => {
    if (textToRead.current && byteValues.current) {
      if (textToRead.current.value.trim() === '') {
        // if nothing to read, return
        return [];
      }
      const bytes = textToBytes(textToRead.current.value, compress);

      byteValues.current.value = arrayToHexByteString(bytes, {
        includeHexPrefix: false,
        includeSpaces: true,
        newline: 9999,
      });
      return bytes;
    }
    return [];
  };

  const getLocations = (textBytes: number[]) => {
    printHexByteArray(textBytes, {
      includeHexPrefix: false,
      includeSpaces: true,
      newline: 9,
      prefix: 'Text to locate: ',
    });

    let globalPointer = 0;
    const results: number[] = [];
    const { rom } = state;

    rom.forEach(() => {
      let match = true;
      let localPointer = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const byte of textBytes) {
        // if (debugTextReader) console.log('Byte is: ', byte);
        if (byte !== rom[globalPointer + localPointer]) {
          match = false;
          break;
        }
        localPointer++;
      }

      if (match) {
        if (debugTextReader) console.log('Result found: ', globalPointer);
        results.push(globalPointer);
      }
      globalPointer++;
    });

    if (textLocations.current) {
      textLocations.current.value = arrayToHexPointerString(results, {
        includeHexPrefix: true,
        includeSpaces: true,
        newline: 3,
      });
    }
    console.log('Locating Text Finished');
    return results;
  };

  const getPointers = (textLocationsArr: number[]) => {
    const offsets: number[] = [];
    const { rom } = state;
    for (let i = 0; i < rom.length - 5; i++) {
      textLocationsArr.forEach((l) => {
        // prettier-ignore
        const pointer = l + 0xC00000;
        const romPointer = getTriple(i);
        // if (debugTextReader) console.log(`Pointer: ${pointer.toString(16)}`);
        // if (debugTextReader) console.log(`ROM Pointer: ${romPointer.toString(16)}`);

        if (pointer === romPointer) {
          printHex(i, 'Pointer found: ');

          offsets.push(i);
        }
      });
    }

    if (textPointers.current) {
      textPointers.current.value = arrayToHexPointerString(offsets, {
        includeHexPrefix: true,
        includeSpaces: true,
        newline: 3,
      });
    }
    console.log('Locating Pointers Finished');
  };

  const clearTextAreas = () => {
    if (textLocations.current && textPointers.current) {
      textLocations.current.value = '';
      textPointers.current.value = '';
    }
  };
  const processText = (compress: boolean) => {
    const textBytes = displayedTextToBytes(compress);
    clearTextAreas();
    const locations = getLocations(textBytes);
    getPointers(locations);
  };

  return (
    <div style={gridStyle}>
      <span style={{ ...labelStyle }}>Text to Read:</span>
      <textarea
        ref={textToRead}
        style={{ resize: 'none', height: '150px', marginTop: '5px', gridColumnStart: 2 }}
        spellCheck={false}
      />
      <button onClick={(e) => processText(true)} type='button' style={{ width: '100%', height: '30px', gridColumnStart: '2' }}>
        Process Text with Compression
      </button>
      <button onClick={(e) => processText(false)} type='button' style={{ width: '100%', height: '30px', gridColumnStart: '2' }}>
        Process Text without Compression
      </button>
      <span style={labelStyle}>Byte Values:</span>
      <textarea ref={byteValues} style={{ resize: 'none', height: '150px', marginTop: '15px' }} readOnly spellCheck={false} />
      <span style={labelStyle}>Text Locations:</span>
      <textarea ref={textLocations} style={{ resize: 'none', height: '100px', marginTop: '15px' }} readOnly spellCheck={false} />
      <span style={labelStyle}>Pointers to Locations:</span>
      <textarea ref={textPointers} style={{ resize: 'none', height: '100px', marginTop: '15px' }} readOnly spellCheck={false} />
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextInputReader;
