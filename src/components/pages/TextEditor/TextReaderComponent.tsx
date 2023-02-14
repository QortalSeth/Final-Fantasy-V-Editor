import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BaseTextfieldRef, ByteTextfield, CustomTextfield, PointerTextfield } from '../../TextFields';
import { pointerToOffset } from '../../TextFieldFunctions';
import readText, { readTextBulk } from '../../../models/ReadText';
import { useAppDispatch } from '../../../redux/hooks';
import { arrayToHexByteString, arrayToHexPointerString, getTriple, printHex, printHexByteArray } from '../../../utils/ROM';
import { textToBytes } from '../../../models/WriteText';
import { romState } from '../../../redux/slices/ROM-Slice';
import IncDecInput from '../../Buttons/IncDecButtons';

export const TextReaderComponent = () => {
  const [showCompressed, setCompressed] = useState(false);
  const [showUnCompressed, setUnCompressed] = useState(false);
  const [compressedName, setCompressedName] = useState('');
  const [compressedBytes, setCompressedbytes] = useState<number[]>([]);
  const [unCompressedBytes, setUnCompressedbytes] = useState<number[]>([]);
  const state = useSelector(romState);

  const pointerTextField = useRef<BaseTextfieldRef>(null);
  const stringsToReadCount = useRef<BaseTextfieldRef>(null);
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
  const getStringsToReadCount = () => {
    if (stringsToReadCount.current) {
      const stringsToReadCountNum = Number(stringsToReadCount.current.getValue());
      return stringsToReadCountNum === 0 ? 1 : stringsToReadCountNum;
    }
    return -1;
  };
  const readTextToMainTextArea = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pointerTextField.current && textToRead.current && stringsToReadCount.current) {
      const pointerValue = pointerToOffset(pointerTextField.current.getValue());

      const stringsToReadCountNum = getStringsToReadCount();

      const text = readTextBulk(pointerValue, 100, stringsToReadCountNum);
      textToRead.current.value = text;

      stringsToReadCount.current.setValue(stringsToReadCountNum);
      pointerTextField.current.setValue(pointerTextField.current.getValue() || '0');

      if (stringsToReadCountNum !== 1) {
        // don't show extra buttons on bulk reads
        setCompressed(false);
        setUnCompressed(false);
      }
    } else {
      console.log(
        `PointerTextField: ${pointerTextField.current}\n, textToRead: '${textToRead.current}\n, stringsToReadCount: ${stringsToReadCount.current}`
      );
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
        if (getStringsToReadCount() === 1) {
          setCompressed(true);
          setUnCompressed(true);
        } else {
          setCompressed(false);
          setUnCompressed(false);
        }
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
  const getTextLocations = (bytes: number[]) => {
    clearTextAreas();
    const locations = getLocations(bytes);
    getPointers(locations);
  };

  return (
    <div style={gridStyle}>
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
      <PointerTextfield ref={pointerTextField} textFieldStyle={{ width: '100px' }} />
      <span style={labelStyle}># of Items to Read:</span>
      <IncDecInput ref={stringsToReadCount} />
      <button
        type='button'
        style={{ width: '100%', height: '30px', gridColumnStart: '2' }}
        onClick={(e) => readTextToMainTextArea(e)}
      >
        Read Text
      </button>
      <span style={labelStyle}>Text to Bytes:</span>
      <textarea ref={textToRead} style={{ resize: 'none', height: '150px', marginTop: '15px' }} readOnly />
      <button
        onClick={(e) => displayedTextToBytes()}
        type='button'
        style={{ width: '100%', height: '30px', gridColumnStart: '2' }}
      >
        Get Byte Values
      </button>
      <span style={labelStyle}>Byte Values:</span>
      <textarea ref={byteValues} style={{ resize: 'none', height: '150px', marginTop: '15px' }} readOnly />{' '}
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
      <textarea ref={textLocations} style={{ resize: 'none', height: '100px', marginTop: '15px' }} readOnly />
      <span style={labelStyle}>Possible Pointers to Locations:</span>
      <textarea ref={textPointers} style={{ resize: 'none', height: '100px', marginTop: '15px' }} readOnly />
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextReaderComponent;
