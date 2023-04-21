import { CheckBoxGroup } from 'src/components/CheckBoxGroup';
import {
  attackTypeCheckBoxes,
  miscCheckBoxes,
  targetingCheckBoxes,
} from 'src/components/pages/ModelEditors/SpellEditor/SpellEditorData';
import React from 'react';

const width = '55vw';
export const CheckboxGroups = () => {
  return (
    <div style={{ display: 'contents' }}>
      <CheckBoxGroup checkBoxes={targetingCheckBoxes} width={width} columns={2} name='Targeting' />
      <CheckBoxGroup checkBoxes={attackTypeCheckBoxes} width={width} columns={2} name='Attack Type' />
      <CheckBoxGroup checkBoxes={miscCheckBoxes} width={width} columns={2} name='Miscellaneous' />
    </div>
  );
};

export default CheckboxGroups;
