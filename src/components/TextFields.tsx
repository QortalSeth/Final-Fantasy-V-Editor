import React, { ChangeEvent, CSSProperties, useState } from 'react';
import CSS from 'csstype';
import { byteListener, pointerListener, shortListener, tripleListener } from './TextFieldFunctions';

interface BaseProps {
  textFieldStyle?: CSS.Properties;
  listener: (e: React.ChangeEvent<HTMLInputElement>, value: string) => string;
}

interface StyleProp {
  textFieldStyle?: CSS.Properties;
}

export const BaseTextfield = React.forwardRef<HTMLInputElement, BaseProps>(
  ({ textFieldStyle = {}, listener }: BaseProps, ref) => {
    const [value, setValue] = useState('270900');
    return (
      <input
        onChange={(e) => setValue(listener(e, value))}
        value={value}
        style={{ boxSizing: 'border-box', ...textFieldStyle }}
        ref={ref}
      />
    );
  }
);

export const PointerTextfield = React.forwardRef<HTMLInputElement, StyleProp>(({ textFieldStyle = {} }: StyleProp, ref) => {
  const defaultStyle = { width: '60px', height: '25px' };
  return <BaseTextfield ref={ref} textFieldStyle={{ ...defaultStyle, ...textFieldStyle }} listener={pointerListener} />;
});

export const ByteTextfield = React.forwardRef<HTMLInputElement, StyleProp>(({ textFieldStyle = {} }: StyleProp, ref) => {
  const defaultStyle = { width: '60px', height: '20px' };
  return <BaseTextfield ref={ref} textFieldStyle={{ ...defaultStyle, ...textFieldStyle }} listener={byteListener} />;
});

export const ShortTextfield = React.forwardRef<HTMLInputElement, StyleProp>(({ textFieldStyle = {} }: StyleProp, ref) => {
  const defaultStyle = { width: '60px', height: '20px' };
  return <BaseTextfield ref={ref} textFieldStyle={{ ...defaultStyle, ...textFieldStyle }} listener={shortListener} />;
});

export const tripleTextfield = React.forwardRef<HTMLInputElement, StyleProp>(({ textFieldStyle = {} }: StyleProp, ref) => {
  const defaultStyle = { width: '60px', height: '20px' };
  return <BaseTextfield ref={ref} textFieldStyle={{ ...defaultStyle, ...textFieldStyle }} listener={tripleListener} />;
});
