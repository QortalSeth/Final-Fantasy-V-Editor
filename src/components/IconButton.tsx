import React, { PropsWithChildren, useState } from 'react';
import CSS from 'csstype';

export interface IconButtonProps extends React.HTMLProps<HTMLButtonElement> {
  buttonStyle?: object;
  imageStyle?: object;
  name: string;
  icon: string;
  clickListener: () => void;
  disabled: boolean;
}

export const IconButton = ({ buttonStyle = {}, imageStyle = {}, name, icon, clickListener, disabled }: IconButtonProps) => {
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

  return (
    <button
      type='button'
      className='button'
      style={{ ...buttonDefaultStyle, ...buttonStyle }}
      onClick={clickListener}
      disabled={disabled}
    >
      <img src={icon} alt='' style={{ ...imageDefaultStyle, ...imageStyle }} />
      {name}
    </button>
  );
};

export default IconButton;
