import React from 'react';
import { PointerTextfield } from '../TextFields';

export const TextEditor = () => {
  const divStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '0px',
    width: '50%',
  };
  return (
    <div style={divStyle}>
      <span
        style={{
          gridColumn: 'span 2',
          fontWeight: 'bold',
          textDecoration: 'underline',
          textAlign: 'center',
          marginBottom: '15px',
        }}
      >
        Text Reader
      </span>
      <span style={{ textAlign: 'right', marginTop: '2px', marginRight: '3px' }}>Text Location to read:</span>
      <PointerTextfield textFieldStyle={{ width: '100%' }} />
      <button type='button' style={{ width: '100%', height: '30px', gridColumnStart: '2' }}>
        Generate Results
      </button>
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextEditor;
