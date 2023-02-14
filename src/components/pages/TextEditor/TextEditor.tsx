import React, { useRef, useState } from 'react';
import TextReaderComponent from './TextReaderComponent';
import { TextEditorFooter } from './TextEditorFooter';

export const TextEditor = () => {
  return (
    <div>
      <TextReaderComponent />
      <TextEditorFooter />
    </div>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextEditor;
