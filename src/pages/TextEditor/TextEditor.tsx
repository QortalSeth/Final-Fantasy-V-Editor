import React, { useRef, useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import TextInputReader from './TextInputReader';
import { TextEditorFooter } from './TextEditorFooter';
import TextLocationReaderComponent, { TextOffsetReader } from './TextOffsetReader';
import TextPointerReader from './TextPointerReader';

export const TextEditor = () => {
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box style={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList aria-label='Tab Label?' onChange={handleChange}>
            <Tab label='Read Text' value='1' />
            <Tab label='Read Offsets' value='2' />
            <Tab label='Read Pointer Table' value='3' />
          </TabList>
        </Box>
        <div hidden={value !== '1'}>
          <TextInputReader />
        </div>
        <div hidden={value !== '2'}>
          <TextOffsetReader />
        </div>
        <div hidden={value !== '3'}>
          <TextPointerReader />
        </div>
      </TabContext>
      <TextEditorFooter />
    </Box>
  );
};

// textFieldStyle={{ width: '50px' }}
export default TextEditor;
