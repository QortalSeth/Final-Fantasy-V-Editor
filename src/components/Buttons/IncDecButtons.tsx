import React from 'react';
import CSS from 'csstype';
import { stringToNumber } from 'src/utils/NumberFormatConverter';
import Triangle from 'assets/Images/Triangle.png';
import IconButton from './IconButton';

const buttonColor = 230;
const buttonTimer = 200;
const incDecStyle = {
  height: '100%',
  backgroundColor: `rgb(${buttonColor},${buttonColor},${buttonColor})`,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'buttonborder',
};

const incDecProps = { name: '', icon: Triangle, buttonStyle: incDecStyle, timer: buttonTimer };

interface IncDecProps {
  divStyle?: CSS.Properties;
  incListener: () => void;
  decListener: () => void;
  eventType?: string;
  disabled?: boolean;
}
export const IncDecButtons: React.FC<IncDecProps> = ({
  divStyle = {},
  incListener,
  decListener,
  eventType = 'down',
  disabled = false,
}) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridGap: '0px',
    width: '3vw',
    height: '100%',
  };

  return (
    <div style={{ ...gridStyle, ...divStyle }}>
      <IconButton
        onMouseHeldDown={eventType === 'down' ? incListener : undefined}
        {...incDecProps}
        onClick={eventType === 'click' ? incListener : () => {}}
        disabled={disabled}
        tabIndex={-1}
        className='buttonAlt'
      />
      <IconButton
        onMouseHeldDown={eventType === 'down' ? decListener : undefined}
        imageStyle={{ transform: 'rotate(180deg)' }}
        {...incDecProps}
        onClick={eventType === 'click' ? decListener : () => {}}
        disabled={disabled}
        tabIndex={-1}
        className='buttonAlt'
      />
    </div>
  );
};
export default IncDecButtons;
