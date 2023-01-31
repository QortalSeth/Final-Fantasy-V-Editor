import React, { useRef, useState } from 'react';
import { PointerTextfield } from '../TextFields';
import { pointerToOffset } from '../TextFieldFunctions';
import readText from '../../models/TextReader';
import { useAppDispatch } from '../../redux/hooks';
import { setOffset } from '../../redux/slices/ROM-Slice';
import store from '../../redux/store';
import { arrayToHexString, printArray } from '../../utils/ROM';

export const TextEditor = () => {
  const [pointer, setPointer] = useState('');
  const pointerTextField = useRef<HTMLInputElement>(null);
  const textToRead = useRef<HTMLTextAreaElement>(null);
  const byteValues = useRef<HTMLTextAreaElement>(null);
  const textLocations = useRef<HTMLTextAreaElement>(null);
  const textPointers = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const state = store.getState();
  const divStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: '0px',
    width: '50%',
    minHeight: '30px',
  };
  const labelStyle = { justifySelf: 'right', marginRight: '3px', alignSelf: 'center' };

  const readTextToMainTextArea = () => {
    console.log('reading text');
    if (pointerTextField.current && textToRead.current) {
      const pointerValue = pointerToOffset(pointerTextField.current.value);
      // console.log('pointer value: ', pointerValue);
      // dispatch(setOffset(pointerValue));
      // console.log('set offset dispatched');
      const text = readText(pointerValue, 100);
      console.log('text is: ', text);
      textToRead.current.value = text;
    }
  };

  const generateResults = () => {
    // if (textToRead.current && byteValues.current) {
    //   const textBytes = textToBytes(textToRead.current.value);
    //   printArray(textBytes, { includePrefix: false });
    //   byteValues.current.value = arrayToHexString(textBytes);
    // }
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
        onClick={(e) => generateResults()}
        type='button'
        style={{ width: '100%', height: '30px', gridColumnStart: '2' }}
      >
        Generate Results
      </button>
      <span style={labelStyle}>Byte Values:</span>
      <textarea ref={byteValues} style={{ resize: 'none', height: '150px', marginTop: '15px' }} />{' '}
      <span style={labelStyle}>Possible Text Locations:</span>
      <textarea ref={textLocations} style={{ resize: 'none', height: '100px', marginTop: '15px' }} />
      <span style={labelStyle}>Possible Pointers to Locations:</span>
      <textarea ref={textPointers} style={{ resize: 'none', height: '100px', marginTop: '15px' }} />
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextEditor;
