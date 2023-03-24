import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import CSS from 'csstype';
import Select, { ActionMeta, OnChangeValue, SelectInstance } from 'react-select';
import { ObservableItem } from 'src/models/ObservableItem';
import incDecButtons, { IncDecButtons } from './IncDecButtons';

const debugIncDecSelect = false;
type SelectType = ObservableItem;

export interface IncDecProps<T extends SelectType> {
  divStyle?: CSS.Properties;
  selectStyle?: CSS.Properties;
  incDecStyle?: CSS.Properties;
  onChange?: (v: ObservableItem) => void;
  initialValue: T;
  isSearchable?: boolean;
  options: T[];
}

export type IncDecSelectRef = {
  getValue: () => SelectType | null | undefined;
  setValue: (newValue: SelectType) => void;
  current: () => SelectInstance<SelectType> | null;
};

export const IncDecSelect = forwardRef(
  <T extends SelectType>(
    {
      divStyle = {},
      selectStyle = {},
      incDecStyle = {},
      onChange,
      initialValue,
      isSearchable = false,
      options,
    }: IncDecProps<SelectType>,
    ref?: React.Ref<IncDecSelectRef>
  ) => {
    const selectRef = useRef<SelectInstance<SelectType>>(null);
    const getValue = () => {
      const value = selectRef.current?.getValue()[0];
      if (debugIncDecSelect) console.log('value is: ', value);
      return value;
    };
    const setValue = (newValue: SelectType) => selectRef.current?.setValue(newValue, 'select-option');

    useImperativeHandle(ref, () => ({
      getValue: () => getValue(),
      setValue: (newValue: SelectType) => setValue(newValue),
      current: () => selectRef.current,
    }));
    const onChangeListener = (v: OnChangeValue<SelectType, false>, a: ActionMeta<SelectType>) => {
      if (v && a && onChange) {
        // setValue(v);
        onChange(v);

        if (debugIncDecSelect) console.log('onchange is:', onChange);
      }
    };

    const select = (indexChange: number) => {
      if (selectRef.current) {
        if (debugIncDecSelect) console.log('new select');
        if (debugIncDecSelect) console.log('indexChange is: ', indexChange);
        if (debugIncDecSelect) console.log('value is: ', getValue());
        if (debugIncDecSelect) console.log('options are: ', options);
        const value = getValue();
        if (value) {
          if (debugIncDecSelect) console.log('old index is: ', value.listIndex);
          let newIndex = value.listIndex + indexChange;
          if (debugIncDecSelect) console.log('new index is: ', newIndex);
          newIndex = Math.min(newIndex, options.length - 1);
          if (debugIncDecSelect) console.log('high check new index is: ', newIndex);
          newIndex = Math.max(newIndex, 0);
          if (debugIncDecSelect) console.log('low check new index is: ', newIndex);
          selectRef.current.selectOption(options[newIndex]);
        }
      }
    };
    const borderColor = '#767676';
    const { backgroundColor } = selectStyle;
    if (debugIncDecSelect) console.log('background color is: ', backgroundColor);

    return (
      <div style={{ display: 'flex', paddingTop: '2px', ...divStyle }}>
        <IncDecButtons divStyle={incDecStyle} incListener={() => select(-1)} decListener={() => select(1)} eventType='click' />

        <Select
          options={options}
          defaultValue={options[0]}
          onChange={(v, a) => onChangeListener(v, a)}
          ref={selectRef}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              ...selectStyle,
              borderColor,
              '&:hover': { borderColor },
            }),
            // menu: (baseStyle) => ({ ...baseStyle, height: '400px' }),
            menuList: (baseStyle) => ({ ...baseStyle, backgroundColor }),
            dropdownIndicator: (base) => ({ color: borderColor, width: '20px' }),
          }}
          formatOptionLabel={(option) => (
            <div style={{ display: 'flex', verticalAlign: 'center', alignItems: 'center' }}>
              {option.iconData.name ? (
                <img
                  src={option.iconData.name}
                  alt='missing Icon'
                  width={option.iconData.width}
                  height={option.iconData.height}
                  style={{ marginRight: '5px' }}
                />
              ) : (
                ''
              )}
              <span style={{ fontSize: '20px' }}>{option.label}</span>
            </div>
          )}
          isSearchable={isSearchable}
          placeholder='Placeholder Text'
        />
      </div>
    );
  }
);

// textFieldStyle={{ width: '50px' }}
export default IncDecSelect;
