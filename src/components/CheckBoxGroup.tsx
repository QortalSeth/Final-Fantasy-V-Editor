import { CheckBoxWithDefault, CheckBoxWithDefaultProps } from 'src/components/CheckBoxes';
import React from 'react';
import { numberUnitCombine, numberUnitSplit } from 'src/utils/NumberFormatConverter';

interface CheckBoxGroupProps {
  checkBoxes: CheckBoxWithDefaultProps[];
  width: string;
  name: string;
  columns: number;
  border?: string;
}
export const CheckBoxGroup = ({ checkBoxes, width, name, columns, border = '2px solid gray' }: CheckBoxGroupProps) => {
  return (
    <div className='noselect'>
      <span>{name}</span>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 50%)`,
          width,
          border,
          paddingLeft: '1vw',
          paddingBottom: '0.5vw',
        }}
      >
        {checkBoxes.map((props) => {
          // eslint-disable-next-line react/prop-types
          return <CheckBoxWithDefault key={props.labelText} {...props} />;
        })}
      </div>
    </div>
  );
};
