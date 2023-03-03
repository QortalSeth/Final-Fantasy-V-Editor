import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import CSS from 'csstype';
import Select, { ActionMeta, OnChangeValue, SelectInstance } from 'react-select';
import { IncDecButtons } from './IncDecButtons';
import { ObservableItem } from '../../models/Model';

const debugIncDecSelect = false;
type SelectType = ObservableItem;

type BasicOption = {
  label: string;
  value: string;
};
export interface IncDecProps<T extends SelectType> {
  divStyle?: CSS.Properties;
  selectStyle?: CSS.Properties;
  onChange?: () => void;
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
    { divStyle = {}, selectStyle = {}, onChange, initialValue, isSearchable = false, options }: IncDecProps<SelectType>,
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
        onChange();
        console.log('onchange is:', onChange);
      }
    };

    const select = (indexChange: number) => {
      if (selectRef.current) {
        if (debugIncDecSelect) console.log('value is: ', getValue());
        if (debugIncDecSelect) console.log('options are: ', options);
        const value = getValue();
        if (value) {
          let newIndex = value.listIndex + indexChange;
          newIndex = Math.min(newIndex, options.length - 1);
          newIndex = Math.max(newIndex, 0);

          selectRef.current.selectOption(options[newIndex]);
        }
      }
    };
    const borderColor = '#767676';
    return (
      <div style={{ display: 'flex', paddingTop: '2px', ...divStyle }}>
        <IncDecButtons incListener={() => select(1)} decListener={() => select(-1)} />

        <Select
          options={options}
          defaultValue={options[0]}
          onChange={(v, a) => onChangeListener(v, a)}
          ref={selectRef}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              ...selectStyle,
              borderColor,
              '&:hover': { borderColor },
            }),
            dropdownIndicator: (base) => ({ color: borderColor, width: '20px' }),
          }}
          formatOptionLabel={(option) => (
            <div style={{ display: 'flex', verticalAlign: 'center', alignItems: 'center' }}>
              {option.icon ? (
                <img src={option.icon} alt='missing Icon' width='25 px' height='25 px' style={{ marginRight: '5px' }} />
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
