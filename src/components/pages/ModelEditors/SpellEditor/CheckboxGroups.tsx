import { CheckBoxGroup } from 'src/components/CheckBoxGroup';
import {
  attackTypeCheckBoxes,
  miscCheckBoxes,
  targetingCheckBoxes,
} from 'src/components/pages/ModelEditors/SpellEditor/SpellEditorData';
import React from 'react';

export const CheckboxGroups = () => {
  return (
    <div>
      <CheckBoxGroup xStart='42vw' yStart='10px' checkBoxes={targetingCheckBoxes} width='400px' columns={2} name='Targeting' />
      <CheckBoxGroup xStart='42vw' yStart='17vh' checkBoxes={attackTypeCheckBoxes} width='280px' columns={2} name='Attack Type' />
      <CheckBoxGroup xStart='42vw' yStart='30vh' checkBoxes={miscCheckBoxes} width='300px' columns={2} name='Miscellaneous' />
    </div>
  );
};

export default CheckboxGroups;
