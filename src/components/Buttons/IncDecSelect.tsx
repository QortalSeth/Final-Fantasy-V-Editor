import React, { useImperativeHandle, useRef } from 'react';
import CSS from 'csstype';
import { IncDecButtons } from './IncDecButtons';
import { BaseTextfieldRef } from '../TextFields';

const debugIncDecSelect = false;

interface Props {
  divStyle?: CSS.Properties;
  onChange?: () => void;
  label: string;
  initialValue: string;
  options: { label: string; value: string }[];
}

export type IncDecSelectRef = {
  getValue: () => string;
  setNewValue: (newValue: string) => void;
  current: () => HTMLSelectElement | null;
};

export const IncDecSelect = React.forwardRef<IncDecSelectRef, Props>(
  ({ divStyle = {}, onChange, label, initialValue, options }: Props, ref) => {
    const [value, setValue] = React.useState(initialValue);
    const selectRef = useRef<HTMLSelectElement>(null);
    const getValue = () => {
      return value;
    };
    const setNewValue = (newValue: string) => {
      setValue(newValue);
    };

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      setNewValue: (newValue: string) => setValue(newValue),
      current: () => selectRef.current,
    }));
    const onChangeListener = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
      if (onChange) {
        onChange();
      }
    };

    const select = (indexChange: number) => {
      if (selectRef.current) {
        let newIndex = selectRef.current.selectedIndex + indexChange;

        // bounds checking on newIndex
        newIndex = Math.min(newIndex, selectRef.current.options.length - 1);
        newIndex = Math.max(newIndex, 0);

        selectRef.current.selectedIndex = newIndex;
      }
    };

    return (
      <div style={{ display: 'flex', paddingTop: '2px', ...divStyle }}>
        <IncDecButtons incListener={() => select(1)} decListener={() => select(-1)} />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          {label}
          <select
            value={value}
            onChange={(e) => onChangeListener(e)}
            style={{ width: '75px', height: '30px', boxSizing: 'border-box' }}
            ref={selectRef}
          >
            {options.map((option) => {
              return (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    );
  }
);

// textFieldStyle={{ width: '50px' }}
export default IncDecSelect;
