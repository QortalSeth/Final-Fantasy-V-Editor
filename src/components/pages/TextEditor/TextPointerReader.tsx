import React, { useRef, useState } from 'react';
import weaponIcon from 'assets/Images/Excalibur.png';
import { defaultEndText } from 'src/models/text/TextManager';
import { ObservableItem } from 'src/models/ObservableItem';
import { BaseTextfieldRef, PointerTextfield } from 'src/components/TextFields';
import { pointerToOffset } from 'src/components/TextFieldFunctions';
import { processPointers } from 'src/models/text/ReadText';
import { getNextTriple, inferNextTriple, pointerInROM, setOffset } from 'src/utils/StoreAccess';
import swordIcon from 'assets/Images/TextIcons/00 - Sword Icon.png';
import IncDecInput from 'src/components/Buttons/IncDecInput';
import IncDecSelect, { IncDecProps, IncDecSelectRef } from '../../Buttons/IncDecSelect';

export const TextPointerReader: React.FC = () => {
  const pointerTextField = useRef<BaseTextfieldRef>(null);
  const textLength = useRef<IncDecSelectRef>(null);
  const stringsToReadCount = useRef<BaseTextfieldRef>(null);
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
    if (pointerTextField.current && stringsToReadCount.current && textToRead.current && textLength.current) {
      // Get data from textfields
      const pointersStart = pointerToOffset(pointerTextField.current.getValue());

      const pointerSize = Number(textLength.current.getValue()?.value);
      const stringsToReadNum = refStringToNumber(stringsToReadCount.current);

      // Some pointer tables have 2 bytes, which means the third byte is the databank the pointer is located in
      // readPointer is a function that uses a 3 byte pointer if available or infers the 3rd byte
      const readPointer = () => (pointerSize === 2 ? pointerToOffset(inferNextTriple()) : pointerToOffset(getNextTriple()));
      if (pointerSize) {
        const pointers: number[] = [];
        setOffset(pointersStart);
        for (let i = 0; i < stringsToReadNum; i++) {
          const pointer = readPointer();
          const pointerIsInROM = pointerInROM(pointer);
          if (pointerIsInROM) {
            pointers.push(pointer);
          }
        }
        const [text, json] = processPointers(pointers, 9999, defaultEndText, 0);

        textToRead.current.value = text;
      }
    } else {
      console.log(
        `PointerTextField: ${pointerTextField.current}
        textToRead: ${textToRead.current}
        stringsToReadCount: ${stringsToReadCount.current}
        textLength: ${textLength.current}`
      );
    }
  };
  console.log('weapon icon type is: ', typeof weaponIcon);

  const options = ObservableItem.resetListIndexes([new ObservableItem('2'), new ObservableItem('3')]);

  return (
    <div style={gridStyle}>
      <span style={labelStyle}>Location to read:</span>
      <PointerTextfield ref={pointerTextField} textFieldStyle={{ width: '100px' }} />
      <span style={labelStyle}>Pointer Size:</span>
      <IncDecSelect
        selectStyle={{ width: '75px', height: '40px' }}
        initialValue={options[0]}
        options={options}
        ref={textLength}
      />

      <span style={labelStyle}># to Read:</span>
      <IncDecInput ref={stringsToReadCount} minValue={1} maxValue={9999} />
      <button type='button' style={{ width: '30%', height: '30px', gridColumnStart: '2' }} onClick={(e) => readTextPointers()}>
        Read Pointer Table
      </button>

      <textarea
        ref={textToRead}
        style={{ resize: 'none', height: '500px', marginTop: '5px', gridColumn: 'span 2' }}
        spellCheck={false}
      />
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextPointerReader;
