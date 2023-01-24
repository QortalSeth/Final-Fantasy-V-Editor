import React from 'react';
import { PointerTextfield } from '../TextFields';

export const TextEditor = () => {
  const divStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    // textAlign: 'right',
    //  verticalAlign: 'bottom',
    alignItems: 'end',
    gridGap: '4px',
  };
  //       <style>color: None;</style>
  return (
    <div style={divStyle}>
      <p>Text Location to read:</p>
      <PointerTextfield />
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextEditor;
