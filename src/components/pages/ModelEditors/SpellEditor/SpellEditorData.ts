import { CheckBoxWithDefaultProps } from 'src/components/CheckBoxes';
import jsonData from 'assets/Text/Magic Parameter Labels.json';
import { createObservableParameterLabels, ParameterLabel } from 'src/models/ParameterLabel';
import { DefaultTextfieldProp } from 'src/components/TextFields';

export const targetingCheckBoxes: CheckBoxWithDefaultProps[] = [
  { labelText: 'Can Multi-Target' },
  { labelText: 'Hits all Targets' },
  { labelText: 'Target Selectable' },
  { labelText: 'Side Selectable' },
  { labelText: 'Target Enemy' },
  { labelText: 'Roulette' },
  { labelText: 'Not Used 1' },
  { labelText: 'Not Used 2' },
];

export const attackTypeCheckBoxes: CheckBoxWithDefaultProps[] = [
  { labelText: 'Physical' },
  { labelText: 'Aerial' },
  { labelText: 'White' },
  { labelText: 'Black' },
  { labelText: 'Time' },
  { labelText: 'Summon' },
  { labelText: 'Song' },
  { labelText: 'Enemy' },
];

export const miscCheckBoxes: CheckBoxWithDefaultProps[] = [
  { labelText: 'Learnable' },
  { labelText: 'Monster Bit?' },
  { labelText: "Can't Reflect" },
  { labelText: "Can't Avoid" },
  { labelText: 'Not Used 3' },
  { labelText: 'Not Used 4' },
];
const textfieldWidth = '5vw';
const textfieldHeight = '3vh';
const textFieldStyle = {};
export const textFieldProps: DefaultTextfieldProp[] = [
  { minValue: 1, maxValue: 0x0f, labelText: '# of hits:', textFieldStyle, width: textfieldWidth, height: textfieldHeight },
  { minValue: 1, maxValue: 0x7f, labelText: 'MP Cost:', textFieldStyle, width: textfieldWidth, height: textfieldHeight },
];

console.log('jsondata is ', jsonData);
const parameterData = jsonData as ParameterLabel[];
export const observableParameterData = createObservableParameterLabels(parameterData);
console.log('parameter data is: ', observableParameterData);
