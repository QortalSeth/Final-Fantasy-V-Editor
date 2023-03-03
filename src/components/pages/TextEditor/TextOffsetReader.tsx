import React, { useRef, useState } from 'react';
import { BaseTextfieldRef, PointerTextfield } from '../../TextFields';
import { pointerToOffset } from '../../TextFieldFunctions';
import { defaultEndText, readTextBulkFixedLength, readTextBulkVarLength, TextToJSON } from '../../../models/text/ReadText';
import IncDecInput from '../../Buttons/IncDecInput';
import { saveJSONoptions } from '../../../utils/SaveData';

export const TextOffsetReader: React.FC = () => {
  const [disableFixedLength, setDisableFixedLength] = useState(false);
  const [showExportJSON, setExportJSON] = useState(false);
  const [JSONdata, setJSONdata] = useState<Array<TextToJSON>>([]);

  const pointerTextField = useRef<BaseTextfieldRef>(null);
  const stringsToReadCount = useRef<BaseTextfieldRef>(null);
  const startIndex = useRef<BaseTextfieldRef>(null);
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
    return stringsToReadCountNum;
  };
  const readTextFromPointers = () => {
    if (
      pointerTextField.current &&
      stringsToReadCount.current &&
      startIndex.current &&
      textLength.current &&
      textToRead.current
    ) {
      // Get data from textfields
      const pointerValue = pointerToOffset(pointerTextField.current.getValue());
      const stringsToReadNum = refStringToNumber(stringsToReadCount.current);
      const startIndexNum = refStringToNumber(startIndex.current);
      const sizeLimit = refStringToNumber(textLength.current);

      // Read text based on settings

      const [offsetText, returnJSON] =
        // eslint-disable-next-line no-nested-ternary
        disableFixedLength
          ? readTextBulkVarLength(pointerValue, stringsToReadNum, defaultEndText, startIndexNum)
          : readTextBulkFixedLength(pointerValue, sizeLimit, stringsToReadNum, startIndexNum);
      textToRead.current.value = offsetText;

      // store results
      stringsToReadCount.current.setValue(stringsToReadNum);
      pointerTextField.current.setValue(pointerTextField.current.getValue() || '0');
      setJSONdata(returnJSON);
      setExportJSON(true);
    } else {
      console.log(
        `PointerTextField: ${pointerTextField.current}\n, textToRead: '${textToRead.current}\n, stringsToReadCount: ${stringsToReadCount.current}`
      );
    }
  };

  const exportPointers = async () => {
    const jsonData = JSON.stringify(JSONdata, null, ' ');
    await window.electron.ipcRenderer.saveJSONfile(saveJSONoptions, jsonData);
  };
  return (
    <div style={gridStyle}>
      <span style={labelStyle}>Location to read:</span>
      <PointerTextfield ref={pointerTextField} textFieldStyle={{ width: '100px' }} />
      <span style={labelStyle}># to Read:</span>
      <IncDecInput ref={stringsToReadCount} minValue={1} maxValue={999} />
      <span style={labelStyle}>Start Index:</span>
      <IncDecInput ref={startIndex} minValue={0} maxValue={999} />
      <span style={labelStyle}>Text Size: </span>
      <IncDecInput ref={textLength} minValue={1} maxValue={99} initialValue='6' disable={disableFixedLength} />

      <label htmlFor='varLength' style={{ gridColumnStart: '2' }}>
        <input
          type='checkbox'
          id='varLength'
          checked={disableFixedLength}
          onChange={(e) => setDisableFixedLength(!disableFixedLength)}
        />
        Read Variable Length Text
      </label>
      <div style={{ gridColumnStart: '2', gridRowStart: '6' }}>
        <button type='button' style={{ width: '50%', height: '30px' }} onClick={(e) => readTextFromPointers()}>
          Read Text
        </button>
        <button type='button' style={{ width: '50%', height: '30px' }} onClick={(e) => exportPointers()} hidden={!showExportJSON}>
          Export Pointers to JSON
        </button>
      </div>
      <textarea
        ref={textToRead}
        style={{ resize: 'none', height: '500px', marginTop: '5px', gridColumn: 'span 2' }}
        readOnly
        spellCheck={false}
      />
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextOffsetReader;
