import React from 'react';
import CSS from 'csstype';

export interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
  buttonStyle?: CSS.Properties;
  imageStyle?: CSS.Properties;
  name: string;
  icon: string;
  disabled?: boolean;
  onMouseHeldDown?: () => void;
  timer?: number;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  buttonStyle = {},
  imageStyle = {},
  name,
  icon,
  disabled = false,
  onMouseHeldDown,
  timer = 500,
  className = 'button',
  ...props
}: IconButtonProps) => {
  const buttonDefaultStyle: CSS.Properties = {
    height: '100%',
    paddingLeft: 0,
    paddingRight: 0,
    lineHeight: '30px',
    paddingTop: 0,
    paddingBottom: 0,
    userSelect: 'none',
    backgroundColor: 'white',
  };

  const imageDefaultStyle: CSS.Properties = {
    width: '70%',
    height: '70%',
    display: 'block',
    paddingTop: '0px',
    marginLeft: 'auto',
    marginRight: 'auto',
    opacity: 1,
  };

  if (disabled) {
    imageDefaultStyle.opacity = 0.3;
    buttonDefaultStyle.pointerEvents = 'none';
  }

  let timedFunction: NodeJS.Timeout;

  const repeat = () => {
    if (onMouseHeldDown) {
      onMouseHeldDown();
      timedFunction = setTimeout(repeat, timer);
    }
  };

  const stopRepeat = () => {
    // console.log('repeat stopped');
    clearTimeout(timedFunction);
  };

  return (
    <button
      {...props}
      type='button'
      className={className}
      style={{ ...buttonDefaultStyle, ...buttonStyle }}
      disabled={disabled}
      onMouseDown={repeat}
      onMouseUp={() => (onMouseHeldDown ? stopRepeat() : undefined)}
      onMouseLeave={() => (onMouseHeldDown ? stopRepeat() : undefined)}
    >
      <img src={icon} alt='' style={{ ...imageDefaultStyle, ...imageStyle }} />
      {name}
    </button>
  );
};

export default IconButton;
