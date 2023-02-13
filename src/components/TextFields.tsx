import React, { ChangeEvent, CSSProperties, useImperativeHandle, useState } from 'react';
import CSS from 'csstype';
import { numListener, pointerListener } from './TextFieldFunctions';
import { stringToNumber, tripleToString } from '../utils/ROM';

interface BaseProps extends React.HTMLProps<HTMLButtonElement> {
  textFieldStyle?: CSS.Properties;
  initialValue?: string;
  listener: (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement> | string,
    value: string,
    maxValue: number,
    minValue: number
  ) => string;
  minValue: number;
  maxValue: number;
}

interface StyleProp {
  textFieldStyle?: CSS.Properties;
  initialValue?: string;
}

interface CustomStyleProp {
  textFieldStyle?: CSS.Properties;
  initialValue?: string;
  minValue: number;
  maxValue: number;
}

export type BaseTextfieldRef = {
  getValue: () => string;
  setValue: (newValue: string | number) => void;
};
export const BaseTextfield = React.forwardRef<BaseTextfieldRef, BaseProps>(
  ({ textFieldStyle = {}, initialValue = '', listener, maxValue, minValue }: BaseProps, ref) => {
    const [value, setStateValue] = useState(initialValue);
    const setValue = (newValue: string | number) => {
      const finalValue = typeof newValue === 'string' ? newValue : newValue.toString();
      setStateValue(listener(finalValue, value, maxValue, minValue));
      console.log('state set from outside');
    };
    const getValue = () => {
      return value;
    };
    useImperativeHandle(ref, () => ({
      getValue,
      setValue: (newValue: string | number) => setValue(newValue),
    }));
    return (
      <input
        onChange={(e) => setStateValue(listener(e, value, maxValue, minValue))}
        value={value}
        style={{ boxSizing: 'border-box', ...textFieldStyle }}
      />
    );
  }
);

export const PointerTextfield = React.forwardRef<BaseTextfieldRef, StyleProp>(
  ({ textFieldStyle = {}, initialValue = '' }: StyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '25px' };
    return (
      <BaseTextfield
        ref={ref}
        textFieldStyle={{ ...defaultStyle, ...textFieldStyle }}
        initialValue={initialValue}
        listener={pointerListener}
        minValue={0}
        maxValue={0xffffff}
      />
    );
  }
);

export const ByteTextfield = React.forwardRef<BaseTextfieldRef, StyleProp>(
  ({ textFieldStyle = {}, initialValue = '' }: StyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '25px' };
    return (
      <BaseTextfield
        ref={ref}
        textFieldStyle={{ ...defaultStyle, ...textFieldStyle }}
        initialValue={initialValue}
        listener={numListener}
        minValue={0}
        maxValue={0xff}
      />
    );
  }
);

export const ShortTextfield = React.forwardRef<BaseTextfieldRef, StyleProp>(
  ({ textFieldStyle = {}, initialValue = '' }: StyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '25px' };
    return (
      <BaseTextfield
        ref={ref}
        textFieldStyle={{ ...defaultStyle, ...textFieldStyle }}
        initialValue={initialValue}
        listener={numListener}
        minValue={0}
        maxValue={0xffff}
      />
    );
  }
);

export const TripleTextfield = React.forwardRef<BaseTextfieldRef, StyleProp>(
  ({ textFieldStyle = {}, initialValue = '' }: StyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '25px' };
    return (
      <BaseTextfield
        ref={ref}
        textFieldStyle={{ ...defaultStyle, ...textFieldStyle }}
        initialValue={initialValue}
        listener={numListener}
        minValue={0}
        maxValue={0xffffff}
      />
    );
  }
);

export const CustomTextfield = React.forwardRef<BaseTextfieldRef, CustomStyleProp>(
  ({ textFieldStyle = {}, initialValue = '', minValue = 0, maxValue }: CustomStyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '30px' };
    return (
      <BaseTextfield
        ref={ref}
        textFieldStyle={{ ...defaultStyle, ...textFieldStyle }}
        initialValue={initialValue}
        listener={numListener}
        minValue={minValue}
        maxValue={maxValue}
      />
    );
  }
);
