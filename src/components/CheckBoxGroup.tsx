import { CheckBoxWithDefault, CheckBoxWithDefaultProps } from 'src/components/CheckBoxes';
import React from 'react';
import { numberUnitCombine, numberUnitSplit } from 'src/utils/NumberFormatConverter';

interface CheckBoxGroupProps {
  xStart: string;
  yStart: string;
  checkBoxes: CheckBoxWithDefaultProps[];
  width: string;
  name: string;
  columns: number;
  border?: string;
}
export const CheckBoxGroup = ({
  xStart,
  yStart,
  checkBoxes,
  width,
  name,
  columns,
  border = '2px solid gray',
}: CheckBoxGroupProps) => {
  const yStartSplit = numberUnitSplit(yStart);
  const unitAddAmount = (unit: string) => {
    switch (unit) {
      case 'px':
        return 23;
      case 'vh':
        return 2.5;
      default:
        return 0;
    }
  };
  const checkBoxYstart = numberUnitCombine({
    number: yStartSplit.number + unitAddAmount(yStartSplit.unit),
    unit: yStartSplit.unit,
  });

  // console.log('Ystart: ', yStart);
  // console.log('checkBoxYstart: ', checkBoxYstart);
  return (
    <div className='noselect'>
      <span style={{ position: 'absolute', left: xStart, top: yStart }}>{name}</span>
      <div
        style={{
          display: 'grid',
          position: 'absolute',
          gridTemplateColumns: `repeat(${columns}, auto)`,
          left: `${xStart}`,
          top: `${checkBoxYstart}`,
          width,
          border,
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
