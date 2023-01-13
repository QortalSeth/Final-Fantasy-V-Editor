import React from 'react';

import CSS from 'csstype';
import icon from '../../../assets/Title Screen.png';
import EditorChooser from '../EditorChooser';

const imageStyle = {
  width: '100%',
  height: '80%',
  position: 'fixed' as const,
  bottom: '0px',
};
export const MainMenu = () => {
  return (
    <div>
      <EditorChooser />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <img src={icon} className='fillImage' alt='' style={imageStyle} draggable={false} onMouseDown={() => false} />
    </div>
  );
};

export default MainMenu;
