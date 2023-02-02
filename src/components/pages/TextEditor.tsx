import React, { useRef, useState } from 'react';
import { PointerTextfield } from '../TextFields';
import { pointerToOffset } from '../TextFieldFunctions';
import readText from '../../models/TextReader';
import { useAppDispatch } from '../../redux/hooks';
import { arrayToHexString, printArray } from '../../utils/ROM';
import { textToBytes } from '../../models/TextWriter';

export const TextEditor = () => {
  const [showCompressed, setCompressed] = useState(false);
  const [showUnCompressed, setUnCompressed] = useState(false);
  const [compressedName, setCompressedName] = useState('');

  const pointerTextField = useRef<HTMLInputElement>(null);
  const textToRead = useRef<HTMLTextAreaElement>(null);
  const byteValues = useRef<HTMLTextAreaElement>(null);
  const textLocations = useRef<HTMLTextAreaElement>(null);
  const textPointers = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  let compressedTextBytes: number[];
  let unCompressedTextBytes: number[];

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
      console.log('text is: ', text);
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
      compressedTextBytes = textToBytes(textToRead.current.value, false);
      unCompressedTextBytes = textToBytes(textToRead.current.value, true);
      const showOneResult = JSON.stringify(compressedTextBytes) === JSON.stringify(unCompressedTextBytes);

      const compressedString = arrayToHexString(compressedTextBytes, {
        includePrefix: false,
        includeSpaces: true,
        newline: 9,
        prefix: showOneResult ? '' : 'Compressed Bytes:\n',
      });

      const uncompressedString = arrayToHexString(unCompressedTextBytes, {
        includePrefix: false,
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
    const results: number[] = [];
  };
  const getPointers = (bytes: number[]) => {};

  const getTextLocations = (bytes: number[]) => {
    getLocations(bytes);
    getPointers(bytes);
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
        onClick={(e) => getTextLocations(compressedTextBytes)}
        type='button'
        style={{ width: '100%', height: '30px', gridColumnStart: '2' }}
        hidden={!showCompressed}
      >
        {compressedName}
      </button>
      <button
        onClick={(e) => getTextLocations(unCompressedTextBytes)}
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
