import React from 'react';
import CSS from 'csstype';
import { stringToNumber } from 'src/utils/NumberFormatConverter';
import Triangle from 'assets/Triangle.png';
import IconButton from './IconButton';

const buttonColor = 230;
const buttonTimer = 200;
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  listener: () => void;
}
const incDecStyle = {
  height: '100%',
  backgroundColor: `rgb(${buttonColor},${buttonColor},${buttonColor})`,
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'buttonborder',
};

const incDecProps = { name: '', icon: Triangle, buttonStyle: incDecStyle, timer: buttonTimer };

const IncButton: React.FC<ButtonProps> = ({ listener, disabled }) => {
  return <IconButton onMouseHeldDown={listener} {...incDecProps} disabled={disabled} tabIndex={-1} />;
};

const DecButton: React.FC<ButtonProps> = ({ listener, disabled }) => {
  return (
    <IconButton
      onMouseHeldDown={listener}
      imageStyle={{ transform: 'rotate(180deg)' }}
      {...incDecProps}
      disabled={disabled}
      tabIndex={-1}
    />
  );
};

interface IncDecProps {
  divStyle?: CSS.Properties;
  incListener: () => void;
  decListener: () => void;
  disabled?: boolean;
}
export const IncDecButtons: React.FC<IncDecProps> = ({ divStyle = {}, incListener, decListener, disabled = false }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridGap: '0px',
    width: '25px',
    height: '100%',
  };

  return (
    <div style={{ ...gridStyle, ...divStyle }}>
      <IncButton listener={incListener} disabled={disabled} />
      <DecButton listener={decListener} disabled={disabled} />
    </div>
  );
};
export default IncDecButtons;
