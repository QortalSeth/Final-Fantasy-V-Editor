// eslint-disable-next-line max-classes-per-file
import { ObservableItem } from 'src/models/ObservableItem';
import { stringToNumber } from 'src/utils/NumberFormatConverter';

export class ParameterLabel {
  index: string = '';

  name: string = '';

  usedBy: string = '';

  param1: string = '';

  param2: string = '';

  param3: string = '';
}

export class ObservableParameterLabel extends ObservableItem {
  index: string = '';

  usedBy: string = '';

  param1: string = '';

  param2: string = '';

  param3: string = '';

  constructor(p: ParameterLabel) {
    super(p.name, ObservableItem.emptyIconData, stringToNumber(p.index, true), 0);
    this.label = `0x${p.index}: ${p.name}`;
    this.index = p.index;

    this.usedBy = p.usedBy;
    this.param1 = p.param1;
    this.param2 = p.param2;
    this.param3 = p.param3;
  }
}

export const createObservableParameterLabels = (labels: ParameterLabel[]) => {
  const newLabels: ObservableParameterLabel[] = [];
  labels.forEach((p) => {
    newLabels.push(new ObservableParameterLabel(p));
  });
  return ObservableItem.resetListIndexes(newLabels);
};
