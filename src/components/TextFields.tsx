import React, { ChangeEvent, CSSProperties, useState } from 'react';
import CSS from 'csstype';
import { byteListener, pointerListener, shortListener, tripleListener } from './TextFieldFunctions';

export const BaseTextfield = ({
  textFieldStyle = {},
  listener,
}: {
  textFieldStyle?: CSS.Properties;
  listener: (e: React.ChangeEvent<HTMLInputElement>, value: string) => string;
}) => {
  const [value, setValue] = useState('');
  return <input onChange={(e) => setValue(listener(e, value))} value={value} style={{ ...textFieldStyle }} />;
};

export const PointerTextfield = ({ textFieldStyle = {} }: { textFieldStyle?: CSS.Properties }) => {
  const defaultStyle = { width: '60px', height: '20px' };
  return <BaseTextfield textFieldStyle={{ ...defaultStyle, ...textFieldStyle }} listener={pointerListener} />;
};

export const ByteTextfield = ({ textFieldStyle = {} }: { textFieldStyle?: CSS.Properties }) => {
  const defaultStyle = { width: '60px', height: '20px' };
  return <BaseTextfield textFieldStyle={{ ...defaultStyle, ...textFieldStyle }} listener={byteListener} />;
};

export const ShortTextfield = ({ textFieldStyle = {} }: { textFieldStyle?: CSS.Properties }) => {
  const defaultStyle = { width: '60px', height: '20px' };
  return <BaseTextfield textFieldStyle={{ ...defaultStyle, ...textFieldStyle }} listener={shortListener} />;
};

export const tripleTextfield = ({ textFieldStyle = {} }: { textFieldStyle?: CSS.Properties }) => {
  const defaultStyle = { width: '60px', height: '20px' };
  return <BaseTextfield textFieldStyle={{ ...defaultStyle, ...textFieldStyle }} listener={tripleListener} />;
};
