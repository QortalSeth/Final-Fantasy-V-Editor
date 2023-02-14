import React, { useImperativeHandle, useRef } from 'react';
import CSS from 'csstype';
import IconButton from './IconButton';
import Triangle from '../../../assets/Triangle.png';
import { stringToNumber, tripleToString } from '../../utils/ROM';
import { BaseTextfieldRef, CustomTextfield } from '../TextFields';
import { numFilter } from '../TextFieldFunctions';

const debugIncDecInput = false;
const buttonColor = 230;
const buttonTimer = 200;
interface IncDecProps extends React.HTMLProps<HTMLButtonElement> {
  listener: () => void;
}
const incDecStyle = {
  height: '100%',
  backgroundColor: `rgb(${buttonColor},${buttonColor},${buttonColor})`,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'buttonborder',
};

const incDecProps = { name: '', icon: Triangle, buttonStyle: incDecStyle, timer: buttonTimer };

const IncButton: React.FC<IncDecProps> = ({ listener }) => {
  return <IconButton onMouseHeldDown={listener} {...incDecProps} />;
};

const DecButton: React.FC<IncDecProps> = ({ listener }) => {
  return <IconButton onMouseHeldDown={listener} imageStyle={{ transform: 'rotate(180deg)' }} {...incDecProps} />;
};

interface Props {
  divStyle?: CSS.Properties;
  onChange?: () => void;
}

export const IncDecInput = React.forwardRef<BaseTextfieldRef, Props>(({ divStyle = {}, onChange }: Props, ref) => {
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

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridGap: '0px',
    width: '25px',
    height: '100%',
  };

  const minValue = 1;
  const maxValue = 99;
  const incDecListener = (amount: number) => {
    const childTextfield = childInputRef.current;
    if (childTextfield) {
      const currentValue = stringToNumber(childTextfield.getValue());
      childTextfield.setValue(currentValue + amount);
    } else console.log('no textfield');
  };

  return (
    <div style={{ display: 'flex', paddingTop: '2px' }}>
      <div style={{ ...gridStyle, ...divStyle }}>
        <IncButton listener={() => incDecListener(1)} />
        <DecButton listener={() => incDecListener(-1)} />
      </div>
      <CustomTextfield
        initialValue={minValue.toString()}
        ref={childInputRef}
        textFieldStyle={{ width: '20%' }}
        minValue={minValue}
        maxValue={maxValue}
      />
    </div>
  );
});

// textFieldStyle={{ width: '50px' }}
export default IncDecInput;
