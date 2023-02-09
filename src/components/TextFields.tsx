import React, { ChangeEvent, CSSProperties, useState } from 'react';
import CSS from 'csstype';
import { numListener, pointerListener } from './TextFieldFunctions';

interface BaseProps {
  textFieldStyle?: CSS.Properties;
  initialValue?: string;
  listener: (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>,
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

export const BaseTextfield = React.forwardRef<HTMLInputElement, BaseProps>(
  ({ textFieldStyle = {}, initialValue = '', listener, maxValue, minValue }: BaseProps, ref) => {
    const [value, setValue] = useState(initialValue);

    return (
      <input
        onChange={(e) => setValue(listener(e, value, maxValue, minValue))}
        ref={ref}
        value={value}
        style={{ boxSizing: 'border-box', ...textFieldStyle }}
      />
    );
  }
);

export const PointerTextfield = React.forwardRef<HTMLInputElement, StyleProp>(
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

export const ByteTextfield = React.forwardRef<HTMLInputElement, StyleProp>(
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

export const ShortTextfield = React.forwardRef<HTMLInputElement, StyleProp>(
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

export const TripleTextfield = React.forwardRef<HTMLInputElement, StyleProp>(
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

export const CustomTextfield = React.forwardRef<HTMLInputElement, CustomStyleProp>(
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
