import React, { useState } from 'react';
import CSS from 'csstype';
import { addUnits, changeUnitAmount, divideUnits, numberUnitSplit, stringToNumber } from 'src/utils/NumberFormatConverter';
import Triangle from 'assets/Images/Triangle.png';
import IconButton from './IconButton';

const buttonColor = 230;
const buttonTimer = 200;
const incDecStyle = {
  backgroundColor: `rgb(${buttonColor},${buttonColor},${buttonColor})`,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'buttonborder',
};

const incDecProps = { name: '', icon: Triangle, buttonStyle: incDecStyle, timer: buttonTimer };

interface IncDecProps {
  divStyle?: CSS.Properties;
  buttonStyle?: CSS.Properties;
  incListener: () => void;
  decListener: () => void;
  eventType?: string;
  disabled?: boolean;
  width: string;
  height: string;
}
export const IncDecButtons: React.FC<IncDecProps> = ({
  divStyle = {},
  buttonStyle = {},
  incListener,
  decListener,
  eventType = 'down',
  disabled = false,
  width,
  height,
}) => {
  const flexStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gridGap: '0px',
    padding: '0px',
    boxSizing: 'border-box' as const,
  };
  const halfHeight = divideUnits(height, 2);
  const initialWindowHeight = Math.max((numberUnitSplit(halfHeight).number * window.innerHeight) / 100, 10);
  const [windowHeight, setWindowHeight] = useState(initialWindowHeight);

  const handleResize = () => {
    const CSSheight = (numberUnitSplit(halfHeight).number * window.innerHeight) / 100;
    const newHeight = Math.max(CSSheight, 10);
    setWindowHeight(newHeight);
  };
  window.addEventListener('resize', handleResize);

  return (
    <div style={{ ...flexStyle, ...divStyle }}>
      <IconButton
        onMouseHeldDown={eventType === 'down' ? incListener : undefined}
        {...incDecProps}
        onClick={eventType === 'click' ? incListener : () => {}}
        disabled={disabled}
        tabIndex={-1}
        className='incDecButton'
        buttonStyle={{
          width,
          height: `calc(${halfHeight} + 2px)`,
          minHeight: '12px',
          boxSizing: 'border-box' as const,
          ...buttonStyle,
        }}
        imageStyle={{ minWidth: '7px', minHeight: '7px' }}
      />
      <IconButton
        onMouseHeldDown={eventType === 'down' ? decListener : undefined}
        imageStyle={{
          transform: `rotate(180deg)`,
          transformOrigin: `center ${divideUnits(`${`${windowHeight.toString()}px`}`, 2)}`,
          minWidth: '7px',
          minHeight: '7px',
        }}
        {...incDecProps}
        onClick={eventType === 'click' ? decListener : () => {}}
        disabled={disabled}
        tabIndex={-1}
        className='incDecButton'
        buttonStyle={{ width, height: `calc(${halfHeight} + 2px)`, minHeight: '12px', boxSizing: 'border-box' as const }}
      />
    </div>
  );
};
export default IncDecButtons;
