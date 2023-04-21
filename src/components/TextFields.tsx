import React, { ChangeEvent, useImperativeHandle, useRef, useState } from 'react';
import CSS from 'csstype';
import IncDecButtons from 'src/components/Buttons/IncDecButtons';
import { divideUnits, stringToNumber } from 'src/utils/NumberFormatConverter';
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
        style={{ ...textFieldStyle, minHeight: '20px', padding: '0px' }}
        disabled={disabled}
        spellCheck={false}
        type='text'
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

export interface DefaultTextfieldProp extends React.HTMLProps<HTMLInputElement> {
  textFieldStyle?: CSS.Properties;
  initialValue?: string;
  minValue: number;
  maxValue: number;
  labelText: string;
  width: string;
  height: string;
}

export const TextfieldWithDefault = React.forwardRef<TextfieldWithDefaultRef, DefaultTextfieldProp>(
  (
    {
      textFieldStyle = {},
      initialValue = '',
      minValue,
      maxValue,
      labelText,
      width,
      height,
      style = {},
      ...props
    }: DefaultTextfieldProp,
    ref
  ) => {
    const defaultStyle = { marginRight: '1vw' };
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
    const incDecInputListener = (amount: number) => {
      const childTextfield = mainRef.current;
      if (childTextfield) {
        const currentValue = stringToNumber(childTextfield.getValue() || minValue.toString());
        childTextfield.setValue(currentValue + amount);
      } else console.log('no textfield');
    };

    return (
      <div style={{ display: 'contents', ...style }}>
        <span
          style={{
            justifySelf: 'right',
            alignSelf: 'center',
            marginRight: '0.5vw',
          }}
        >
          {labelText}
        </span>
        <div style={{ display: 'flex' }}>
          <IncDecButtons
            divStyle={{}}
            incListener={() => incDecInputListener(1)}
            decListener={() => incDecInputListener(-1)}
            width={divideUnits(width, 3)}
            height={height}
          />
          <BaseTextfield
            id={labelText}
            {...props}
            ref={mainRef}
            textFieldStyle={{ ...defaultStyle, ...textFieldStyle, width, height }}
            initialValue={initialValue}
            listener={numListener}
            minValue={minValue}
            maxValue={maxValue}
          />

          <BaseTextfield
            id=''
            {...props}
            ref={defaultRef}
            textFieldStyle={{ ...defaultStyle, ...textFieldStyle, width, height }}
            initialValue={initialValue}
            listener={numListener}
            minValue={minValue}
            maxValue={maxValue}
            disabled
          />
        </div>
      </div>
    );
  }
);

export interface DefaultTextfieldGridProps {
  textfieldProps: DefaultTextfieldProp[];
  gridStyle?: CSS.Properties;
  columns?: number;
}
export const DefaultTextfieldGrid = ({ textfieldProps = [], gridStyle = {}, columns = 2 }: DefaultTextfieldGridProps) => {
  const defaultStyle = { display: 'grid', gridTemplateColumns: `repeat(${columns}, auto)` };
  return (
    <div style={{ ...defaultStyle, ...gridStyle }}>
      {textfieldProps.map((t) => {
        return (
          <TextfieldWithDefault
            key={t.labelText}
            minValue={t.minValue}
            maxValue={t.maxValue}
            labelText={t.labelText}
            textFieldStyle={t.textFieldStyle}
            width={t.width}
            height={t.height}
          />
        );
      })}
    </div>
  );
};
