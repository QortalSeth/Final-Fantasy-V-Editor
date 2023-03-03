import React, { useImperativeHandle, useRef } from 'react';
import CSS from 'csstype';
import IconButton from './IconButton';
import Triangle from '../../../assets/Triangle.png';
import { stringToNumber, tripleToString } from '../../utils/ROM';
import { BaseTextfieldRef, CustomTextfield } from '../TextFields';
import { numFilter } from '../TextFieldFunctions';
import IncDecButtons from './IncDecButtons';

const debugIncDecInput = false;

interface Props {
  divStyle?: CSS.Properties;
  onChange?: () => void;
  minValue: number;
  maxValue: number;
  initialValue?: string;
  disable?: boolean;
}

export const IncDecInput = React.forwardRef<BaseTextfieldRef, Props>(
  ({ divStyle = {}, onChange, minValue, maxValue, initialValue = '', disable = false }: Props, ref) => {
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
    return (
      <div style={{ display: 'flex', paddingTop: '2px' }}>
        <IncDecButtons incListener={() => incDecInputListener(1)} decListener={() => incDecInputListener(-1)} />
        <CustomTextfield
          initialValue={initialValue || minValue.toString()}
          ref={childInputRef}
          textFieldStyle={{ width: '75px' }}
          minValue={minValue}
          maxValue={maxValue}
          disabled={disable}
        />
      </div>
    );
  }
);

// textFieldStyle={{ width: '50px' }}
export default IncDecInput;
