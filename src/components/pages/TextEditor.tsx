import React from 'react';
import { PointerTextfield } from '../TextFields';

export const TextEditor = () => {
  const style = { display: 'grid', gridTemplateColumns: '200px 200px' };
  //       <style>color: None;</style>
  return (
    <div style={style}>
      <p>Text Location/Pointer to read:</p>
      <PointerTextfield />
    </div>
  );
};

export default TextEditor;
