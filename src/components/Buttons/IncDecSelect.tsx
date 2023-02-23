import React, { useImperativeHandle, useRef } from 'react';
import CSS from 'csstype';
import IconButton from './IconButton';
import Triangle from '../../../assets/Triangle.png';
import { stringToNumber, tripleToString } from '../../utils/ROM';
import { BaseTextfieldRef, CustomTextfield } from '../TextFields';
import { numFilter } from '../TextFieldFunctions';
import { IncDecButtons } from './IncDecButtons';

const debugIncDecInput = false;

interface Props {
  divStyle?: CSS.Properties;
  onChange?: () => void;
  label: string;
  value: string;
  options: { label: string; value: string }[];
}

export const IncDecSelect = React.forwardRef<BaseTextfieldRef, Props>(
  ({ divStyle = {}, onChange, label, value, options }: Props, ref) => {
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: 'auto',
      gridGap: '0px',
      width: '25px',
      height: '100%',
    };
    const selectRef = useRef<HTMLSelectElement>(null);

    // selectRef.current.;
    return (
      <div style={{ display: 'flex', paddingTop: '2px' }}>
        <IncDecButtons incListener={() => console.log('')} decListener={() => console.log('')} />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          {label}
          <select
            value={value}
            onChange={onChange}
            style={{ width: '75px', height: '30px', boxSizing: 'border-box' }}
            ref={selectRef}
          >
            {options.map((option) => {
              return <option value={option.value}> {option.label}</option>;
            })}
          </select>
        </label>
      </div>
    );
  }
);

// textFieldStyle={{ width: '50px' }}
export default IncDecSelect;
