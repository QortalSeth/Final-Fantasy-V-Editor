import React, { CSSProperties, ReactHTMLElement, Ref, RefObject, useRef, useState } from 'react';
import CSS from 'csstype';
import IconButton from './IconButton';
import Triangle from '../../../assets/Triangle.png';
import { stringToNumber } from '../../utils/ROM';
import { CustomTextfield } from '../TextFields';
import { numFilter } from '../TextFieldFunctions';

const buttonColor = 230;
const buttonTimer = 200;
interface IncDecProps {
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

interface Props extends React.HTMLProps<HTMLDivElement> {
  divStyle?: CSS.Properties;
}
export const IncDecTextField: React.FC<Props> = ({ divStyle = {} }: Props) => {
  const textfield = useRef<HTMLInputElement>(null);
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
    const t = textfield.current;
    if (t) {
      const currentValue = stringToNumber(t.value);
      const newValue = numFilter((currentValue + amount).toString(), maxValue, minValue);
      t.value = newValue;
      console.log('incDecListener new value: ', newValue);
    } else console.log('no textfield');
  };

  return (
    <div style={{ display: 'flex', paddingTop: '2px' }}>
      <div style={{ ...gridStyle, ...divStyle }}>
        <IncButton listener={() => incDecListener(1)} />
        <DecButton listener={() => incDecListener(-1)} />
      </div>
      <CustomTextfield
        initialValue='1'
        ref={textfield}
        textFieldStyle={{ width: '20%' }}
        minValue={minValue}
        maxValue={maxValue}
      />
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default IncDecTextField;
