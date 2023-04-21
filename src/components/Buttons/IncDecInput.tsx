import React, { useImperativeHandle, useRef } from 'react';
import CSS from 'csstype';
import { addUnits, changeUnitAmount, numberUnitSplit, stringToNumber, tripleToString } from 'src/utils/NumberFormatConverter';
import Triangle from 'assets/Images/Triangle.png';
import IconButton from './IconButton';
import { BaseTextfieldRef, CustomTextfield } from '../TextFields';
import { numFilter } from '../TextFieldFunctions';
import IncDecButtons from './IncDecButtons';

const debugIncDecInput = false;

interface Props {
  divStyle?: CSS.Properties;
  textFieldStyle?: CSS.Properties;
  onChange?: () => void;
  minValue: number;
  maxValue: number;
  initialValue?: string;
  disable?: boolean;
  size: {
    buttonWidth: string;
    inputWidth: string;
    height: string;
  };
}
export const IncDecInput = React.forwardRef<BaseTextfieldRef, Props>(
  (
    { divStyle = {}, textFieldStyle = {}, onChange, minValue, maxValue, initialValue = '', disable = false, size }: Props,
    ref
  ) => {
    const childInputRef = useRef<BaseTextfieldRef>(null);

    const setValue = (newValue: string | number) => {
      if (childInputRef.current) {
        const finalValue = typeof newValue === 'string' ? newValue : newValue.toString();
        childInputRef.current.setValue(finalValue);
        if (debugIncDecInput) console.log('state set from outside');
      }
    };
    const getValue = () => {
      const getValueFailed = '-1';
      if (childInputRef.current) {
        if (debugIncDecInput) console.log('state read from outside');
        return childInputRef.current.getValue();
      }
      return getValueFailed;
    };

    useImperativeHandle(ref, () => ({
      getValue,
      setValue,
    }));

    const incDecInputListener = (amount: number) => {
      const childTextfield = childInputRef.current;
      if (childTextfield) {
        const currentValue = stringToNumber(childTextfield.getValue());
        childTextfield.setValue(currentValue + amount);
      } else console.log('no textfield');
    };

    if (debugIncDecInput) console.log('disable is: ', disable);
    const fullWidth = addUnits(size.buttonWidth, size.inputWidth);

    return (
      <div
        style={{
          display: 'flex',
          padding: '0px',
          ...divStyle,
          gap: '0px',
        }}
      >
        <IncDecButtons
          incListener={() => incDecInputListener(1)}
          decListener={() => incDecInputListener(-1)}
          width={size.buttonWidth}
          height={size.height}
          disabled={disable}
        />
        <CustomTextfield
          initialValue={initialValue || minValue.toString()}
          ref={childInputRef}
          textFieldStyle={{ width: size.inputWidth, height: size.height, padding: '0px', ...textFieldStyle }}
          minValue={minValue}
          maxValue={maxValue}
          disabled={disable}
          onChange={onChange}
        />
      </div>
    );
  }
);

// textFieldStyle={{ width: '50px' }}
export default IncDecInput;
