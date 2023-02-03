import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { PointerTextfield } from '../TextFields';
import { pointerToOffset } from '../TextFieldFunctions';
import readText from '../../models/TextReader';
import { useAppDispatch } from '../../redux/hooks';
import {
  arrayToHexByteString,
  arrayToHexPointerString,
  getTriple,
  hexToString,
  printHex,
  printHexByteArray,
  printHexPointerArray,
} from '../../utils/ROM';
import { textToBytes } from '../../models/TextWriter';
import { romState } from '../../redux/slices/ROM-Slice';

export const TextEditor = () => {
  const [showCompressed, setCompressed] = useState(false);
  const [showUnCompressed, setUnCompressed] = useState(false);
  const [compressedName, setCompressedName] = useState('');
  const [compressedBytes, setCompressedbytes] = useState<number[]>([]);
  const [unCompressedBytes, setUnCompressedbytes] = useState<number[]>([]);
  const state = useSelector(romState);

  const pointerTextField = useRef<HTMLInputElement>(null);
  const textToRead = useRef<HTMLTextAreaElement>(null);
  const byteValues = useRef<HTMLTextAreaElement>(null);
  const textLocations = useRef<HTMLTextAreaElement>(null);
  const textPointers = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  const divStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: '0px',
    width: '50%',
    minHeight: '30px',
  };
  const labelStyle = { justifySelf: 'right', marginRight: '3px', alignSelf: 'center' };

  const readTextToMainTextArea = () => {
    if (pointerTextField.current && textToRead.current) {
      const pointerValue = pointerToOffset(pointerTextField.current.value);
      const text = readText(pointerValue, 100);
      // console.log('text is: ', text);
      textToRead.current.value = text;
    }
  };

  const displayedTextToBytes = () => {
    if (textToRead.current && byteValues.current) {
      if (textToRead.current.value.trim() === '') {
        setCompressed(false);
        setUnCompressed(false);
        return;
      }

      const tempCompressedBytes = textToBytes(textToRead.current.value, false);
      const tempUnCompressedBytes = textToBytes(textToRead.current.value, true);
      setCompressedbytes(tempCompressedBytes);
      setUnCompressedbytes(tempUnCompressedBytes);
      const showOneResult = JSON.stringify(tempCompressedBytes) === JSON.stringify(tempUnCompressedBytes);

      const compressedString = arrayToHexByteString(tempCompressedBytes, {
        includeHexPrefix: false,
        includeSpaces: true,
        newline: 9,
        prefix: showOneResult ? '' : 'Compressed Bytes:\n',
      });

      const uncompressedString = arrayToHexByteString(tempUnCompressedBytes, {
        includeHexPrefix: false,
        includeSpaces: true,
        newline: 9,
        prefix: 'Uncompressed Bytes:\n',
      });

      if (showOneResult) {
        byteValues.current.value = compressedString;
        setCompressedName('Get Locations');
        setCompressed(true);
        setUnCompressed(false);
      } else {
        byteValues.current.value = `${compressedString}\n\n${uncompressedString}`;
        setCompressedName('Get Compressed Locations');
        setCompressed(true);
        setUnCompressed(true);
      }
    }
  };

  const getLocations = (bytes: number[]) => {
    printHexByteArray(bytes, {
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
      for (const byte of bytes) {
        // console.log('Byte is: ', byte);
        if (byte !== rom[globalPointer + localPointer]) {
          match = false;
          break;
        }
        localPointer++;
      }

      if (match) {
        console.log('Result found: ', globalPointer);
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
        // console.log(`Pointer: ${pointer.toString(16)}`);
        // console.log(`ROM Pointer: ${romPointer.toString(16)}`);

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
  };

  const clearTextAreas = () => {
    if (textLocations.current && textPointers.current) {
      textLocations.current.value = '';
      textPointers.current.value = '';
    }
  };
  const getTextLocations = (bytes: number[]) => {
    clearTextAreas();
    const locations = getLocations(bytes);
    getPointers(locations);
  };

  return (
    <div style={divStyle}>
      <span
        style={{
          gridColumn: 'span 2',
          fontWeight: 'bold',
          textDecoration: 'underline',
          textAlign: 'center',
          marginBottom: '15px',
        }}
      >
        Text Reader
      </span>
      <span style={labelStyle}>Text Location to read:</span>
      <PointerTextfield ref={pointerTextField} textFieldStyle={{ width: '100%' }} />
      <button
        type='button'
        style={{ width: '100%', height: '30px', gridColumnStart: '2' }}
        onClick={(e) => readTextToMainTextArea()}
      >
        Read Text
      </button>
      <span style={labelStyle}>Text to Bytes:</span>
      <textarea ref={textToRead} style={{ resize: 'none', height: '150px', marginTop: '15px' }} />
      <button
        onClick={(e) => displayedTextToBytes()}
        type='button'
        style={{ width: '100%', height: '30px', gridColumnStart: '2' }}
      >
        Get Byte Values
      </button>
      <span style={labelStyle}>Byte Values:</span>
      <textarea ref={byteValues} style={{ resize: 'none', height: '150px', marginTop: '15px' }} />{' '}
      <button
        onClick={(e) => getTextLocations(compressedBytes)}
        type='button'
        style={{ width: '100%', height: '30px', gridColumnStart: '2' }}
        hidden={!showCompressed}
      >
        {compressedName}
      </button>
      <button
        onClick={(e) => getTextLocations(unCompressedBytes)}
        type='button'
        style={{ width: '100%', height: '30px', gridColumnStart: '2' }}
        hidden={!showUnCompressed}
      >
        Get Uncompressed Locations
      </button>
      <span style={labelStyle}>Possible Text Locations:</span>
      <textarea ref={textLocations} style={{ resize: 'none', height: '100px', marginTop: '15px' }} />
      <span style={labelStyle}>Possible Pointers to Locations:</span>
      <textarea ref={textPointers} style={{ resize: 'none', height: '100px', marginTop: '15px' }} />
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextEditor;
