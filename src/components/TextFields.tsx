import React, { ChangeEvent, useImperativeHandle, useRef, useState } from 'react';
import CSS from 'csstype';
import { numListener, pointerListener } from './TextFieldFunctions';

interface BaseProps extends React.HTMLProps<HTMLInputElement> {
  textFieldStyle?: CSS.Properties;
  initialValue?: string;
  listener: (e: React.ChangeEvent<HTMLInputElement> | string, value: string, maxValue: number, minValue: number) => string;
  minValue: number;
  maxValue: number;
  id?: string;
}

export type BaseTextfieldRef = {
  getValue: () => string;
  setValue: (newValue: string | number) => void;
};

export const BaseTextfield = React.forwardRef<BaseTextfieldRef, BaseProps>(
  (
    { id = '', textFieldStyle = {}, initialValue = '', listener, maxValue, minValue, disabled = false, ...props }: BaseProps,
    ref
  ) => {
    const [value, setStateValue] = useState(initialValue);

    const setValue = (newValue: string | number) => {
      const finalValue = typeof newValue === 'string' ? newValue : newValue.toString();
      setStateValue(listener(finalValue, value, maxValue, minValue));
      // console.log('state set from outside');
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
        id={id}
        {...props}
        onChange={(e) => setStateValue(listener(e, value, maxValue, minValue))}
        value={value}
        style={{ boxSizing: 'border-box', fontSize: '16px', ...textFieldStyle }}
        disabled={disabled}
        spellCheck={false}
      />
    );
  }
);

interface StyleProp extends React.HTMLProps<HTMLInputElement> {
  textFieldStyle?: CSS.Properties;
  initialValue?: string;
}

export const PointerTextfield = React.forwardRef<BaseTextfieldRef, StyleProp>(
  ({ textFieldStyle = {}, initialValue = '' }: StyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '30px' };
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
  ({ textFieldStyle = {}, initialValue = '', ...props }: StyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '25px' };
    return (
      <BaseTextfield
        {...props}
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
  ({ textFieldStyle = {}, initialValue = '', ...props }: StyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '25px' };
    return (
      <BaseTextfield
        {...props}
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
  ({ textFieldStyle = {}, initialValue = '', disabled, ...props }: StyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '25px' };
    return (
      <BaseTextfield
        {...props}
        ref={ref}
        textFieldStyle={{ ...defaultStyle, ...textFieldStyle }}
        initialValue={initialValue}
        listener={numListener}
        minValue={0}
        maxValue={0xffffff}
        disabled={disabled}
      />
    );
  }
);

interface CustomStyleProp extends React.HTMLProps<HTMLInputElement> {
  textFieldStyle?: CSS.Properties;
  initialValue?: string;
  minValue: number;
  maxValue: number;
}

export const CustomTextfield = React.forwardRef<BaseTextfieldRef, CustomStyleProp>(
  ({ textFieldStyle = {}, initialValue = '', minValue = 0, ...props }: CustomStyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '30px' };
    return (
      <BaseTextfield
        {...props}
        ref={ref}
        textFieldStyle={{ ...defaultStyle, ...textFieldStyle }}
        initialValue={initialValue}
        listener={numListener}
        minValue={minValue}
      />
    );
  }
);

export type TextfieldWithDefaultRef = {
  getMainRef: () => React.RefObject<BaseTextfieldRef>;
  getDefaultRef: () => React.RefObject<BaseTextfieldRef>;
  getMainValue: () => string;
  getDefaultValue: () => string;
  setMainValue: (value: string) => void;
  setDefaultValue: (value: string) => void;
};

interface DefaultStyleProp extends React.HTMLProps<HTMLInputElement> {
  textFieldStyle?: CSS.Properties;
  initialValue?: string;
  minValue: number;
  maxValue: number;
  labelText: string;
}

export const TextfieldWithDefault = React.forwardRef<TextfieldWithDefaultRef, DefaultStyleProp>(
  ({ textFieldStyle = {}, initialValue = '', minValue, maxValue, labelText, ...props }: DefaultStyleProp, ref) => {
    const defaultStyle = { width: '60px', height: '30px' };
    const mainRef = useRef<BaseTextfieldRef>(null);
    const defaultRef = useRef<BaseTextfieldRef>(null);

    const getMainRef = () => {
      return mainRef;
    };
    const getDefaultRef = () => {
      return defaultRef;
    };
    const getValue = (usedRef: React.RefObject<BaseTextfieldRef>) => {
      const refCurrent = usedRef.current;
      if (refCurrent) return refCurrent.getValue();
      return 'Ref Not Found';
    };

    const setValue = (value: string, usedRef: React.RefObject<BaseTextfieldRef>) => {
      const refCurrent = usedRef.current;
      if (refCurrent) refCurrent.setValue(value);
    };

    useImperativeHandle(ref, () => ({
      getMainRef,
      getDefaultRef,
      getMainValue: () => getValue(mainRef),
      getDefaultValue: () => getValue(defaultRef),
      setMainValue: (value: string) => setValue(value, mainRef),
      setDefaultValue: (value: string) => setValue(value, defaultRef),
    }));

    return (
      <div style={{ padding: '5px' }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={labelText} style={{ ...defaultStyle }} className='noselect'>
          <BaseTextfield
            id={labelText}
            {...props}
            ref={mainRef}
            textFieldStyle={{ ...defaultStyle, ...textFieldStyle }}
            initialValue={initialValue}
            listener={numListener}
            minValue={minValue}
            maxValue={maxValue}
          />
          <BaseTextfield
            id=''
            {...props}
            ref={defaultRef}
            textFieldStyle={{ ...defaultStyle, ...textFieldStyle }}
            initialValue={initialValue}
            listener={numListener}
            minValue={minValue}
            maxValue={maxValue}
            disabled
          />
        </label>
      </div>
    );
  }
);
