import React, { useState } from 'react';
import { TabContext, TabList } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import WithResponsiveSize from 'src/components/pages/ModelEditors/WithResponsiveSize';
import TextInputReader from './TextInputReader';
import { TextEditorFooter } from './TextEditorFooter';
import { TextOffsetReader } from './TextOffsetReader';
import TextPointerReader from './TextPointerReader';

export const TextEditor = () => {
  const [value, setValue] = useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const width = '33vw';

  const tabStyle = { width, maxWidth: width, padding: '0px' };
  return (
    <Box style={{ width: '100vw' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList aria-label='Tab Label?' onChange={handleChange}>
            <Tab label='Read Text' value='1' style={tabStyle} />
            <Tab label='Read Offsets' value='2' style={tabStyle} />
            <Tab label='Read Pointer Table' value='3' style={tabStyle} />
          </TabList>
        </Box>
        <div hidden={value !== '1'}>
          <TextInputReader />
          <TextEditorFooter textAreaHeight='24vh' />
        </div>
        <div hidden={value !== '2'}>
          <TextOffsetReader />
          <TextEditorFooter textAreaHeight='25vh' />
        </div>
        <div hidden={value !== '3'}>
          <TextPointerReader />
          <TextEditorFooter textAreaHeight='27vh' />
        </div>
      </TabContext>
    </Box>
  );
};

// textFieldStyle={{ width: '50px' }}
export default WithResponsiveSize(TextEditor);
