import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BaseTextfieldRef, CustomTextfield, PointerTextfield } from '../../TextFields';
import { pointerToOffset } from '../../TextFieldFunctions';
import {
  alternateEndText,
  defaultEndText,
  metaCharacters,
  readText,
  readTextBulkFixedLength,
  readTextBulkVarLength,
} from '../../../models/ReadText';
import { getNextTriple, setOffset } from '../../../utils/ROM';
import { romState } from '../../../redux/slices/ROM-Slice';
import IncDecInput from '../../Buttons/IncDecButtons';

export const TextPointerReader: React.FC = () => {
  const [disableFixedLength, setDisableFixedLength] = useState(false);

  const pointerTextField = useRef<BaseTextfieldRef>(null);
  const stringsToReadCount = useRef<BaseTextfieldRef>(null);
  const textLength = useRef<BaseTextfieldRef>(null);

  const textToRead = useRef<HTMLTextAreaElement>(null);
  const debugTextReader = true;
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '25% auto',
    gridGap: '0px',
    width: '100%',
    minHeight: '30px',
  };
  const labelStyle = { justifySelf: 'right', marginRight: '3px', alignSelf: 'center' };

  const refStringToNumber = (ref: BaseTextfieldRef) => {
    // Used to check if reading single or multiple lines of text
    const stringsToReadCountNum = Number(ref.getValue());
    return stringsToReadCountNum === 0 ? 1 : stringsToReadCountNum;
  };

  const readTextPointers = () => {
    if (pointerTextField.current && textToRead.current && stringsToReadCount.current && textLength.current) {
      // Get data from textfields
      const pointersStart = pointerToOffset(pointerTextField.current.getValue());
      const pointersNum = refStringToNumber(stringsToReadCount.current);
      const pointerSize = refStringToNumber(textLength.current);
      const pointers: number[] = [];
      setOffset(pointersStart);

      // assemble pointer list
      for (let i = 0; i < pointersNum; i++) pointers.push(getNextTriple());
    }
  };
  return (
    <div style={gridStyle}>
      <span style={labelStyle}>Location to read:</span>
      <PointerTextfield ref={pointerTextField} textFieldStyle={{ width: '100px' }} />
      <span style={labelStyle}># of Items to Read:</span>
      <IncDecInput ref={stringsToReadCount} minValue={1} maxValue={99} />
      <span style={labelStyle}>Text Size: </span>
      <IncDecInput ref={textLength} minValue={6} maxValue={99} disable={disableFixedLength} />
      <label htmlFor='varLength' style={{ gridColumnStart: '2' }}>
        <input
          type='checkbox'
          id='varLength'
          checked={disableFixedLength}
          onChange={(e) => setDisableFixedLength(!disableFixedLength)}
        />
        Read Variable Length Text
      </label>
      <div style={{ gridColumnStart: '2', gridRowStart: '5' }}>
        <button type='button' style={{ width: '50%', height: '30px' }} onClick={(e) => readTextPointers()}>
          Read Pointer Table
        </button>
      </div>
      <textarea ref={textToRead} style={{ resize: 'none', height: '500px', marginTop: '5px', gridColumn: 'span 2' }} />
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextPointerReader;
