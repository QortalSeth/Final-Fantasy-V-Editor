import React, { useRef, useState } from 'react';
import { readTextBulkFixedLength, readTextBulkVarLength } from 'src/models/text/ReadText';
import { BaseTextfieldRef, PointerTextfield } from 'src/components/TextFields';
import { pointerToOffset } from 'src/components/TextFieldFunctions';
import { defaultEndText, TextData } from 'src/models/text/TextManager';
import {
  buttonHalf2ndColumnStyle,
  grid2ColumnGapStyle,
  grid2ColumnStyle,
  labelStyle,
  textAreaLarge2Col,
  textAreaSmallStyle2ndC,
} from 'src/components/pages/ModelEditors/TextEditor/TextEditorStyles';
import IncDecInput from '../../../Buttons/IncDecInput';

export const TextOffsetReader: React.FC = () => {
  const [disableFixedLength, setDisableFixedLength] = useState(false);
  const [showExportJSON, setExportJSON] = useState(false);
  const [JSONdata, setJSONdata] = useState<Array<TextData>>([]);

  const pointerTextField = useRef<BaseTextfieldRef>(null);
  const stringsToReadCount = useRef<BaseTextfieldRef>(null);
  const startIndex = useRef<BaseTextfieldRef>(null);
  const textLength = useRef<BaseTextfieldRef>(null);

  const textToRead = useRef<HTMLTextAreaElement>(null);
  const debugTextReader = true;

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

      const [offsetText, returnJSON] = disableFixedLength
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
    await window.electron.ipcRenderer.saveJSONfile(jsonData);
  };

  const textFieldStyle = { width: '12.75vw', height: '3.5vh' };

  const incDecInputSize = { buttonWidth: '3vw', inputWidth: '10vw', height: '3vh' };

  return (
    <div style={grid2ColumnGapStyle}>
      <span style={labelStyle}>Location to read:</span>
      <PointerTextfield ref={pointerTextField} textFieldStyle={textFieldStyle} />
      <span style={labelStyle}># to Read:</span>
      <IncDecInput ref={stringsToReadCount} minValue={1} maxValue={999} size={incDecInputSize} />
      <span style={labelStyle}>Start Index:</span>
      <IncDecInput ref={startIndex} minValue={0} maxValue={999} size={incDecInputSize} />
      <span style={labelStyle}>Text Size: </span>
      <IncDecInput
        ref={textLength}
        minValue={1}
        maxValue={99}
        initialValue='6'
        disable={disableFixedLength}
        size={incDecInputSize}
      />

      <label htmlFor='varLength' style={{ gridColumnStart: '2' }}>
        <input
          type='checkbox'
          id='varLength'
          checked={disableFixedLength}
          onChange={(e) => setDisableFixedLength(!disableFixedLength)}
          style={{ verticalAlign: 'middle' }}
        />
        <span style={{ paddingLeft: '1vw' }}>Read Variable Length Text</span>
      </label>
      <div style={{ gridColumnStart: '2', gridRowStart: '6' }}>
        <button type='button' style={buttonHalf2ndColumnStyle} onClick={(e) => readTextFromPointers()}>
          <span>Read Text</span>
        </button>
        <button type='button' style={buttonHalf2ndColumnStyle} onClick={(e) => exportPointers()} hidden={!showExportJSON}>
          <span> Export Pointers to JSON</span>
        </button>
      </div>
      <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
        <textarea ref={textToRead} style={textAreaLarge2Col} readOnly spellCheck={false} />
      </div>
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextOffsetReader;