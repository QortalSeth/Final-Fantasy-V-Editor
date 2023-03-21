export interface IconData {
  name: string;
  width: string;
  height: string;
}

export class ObservableItem {
  name: string = '';

  value: string = '';

  label: string = '';

  static emptyIconData = { name: '', width: '', height: '' };

  iconData: IconData = ObservableItem.emptyIconData;

  listIndex: number = 0;

  chronologicalIndex: number = 0;

  static setListIndexes = (list: ObservableItem[]) => {
    list.forEach((item, index) => {
      item.listIndex = index;
    });
    return list;
  };

  constructor(name = '', icon = ObservableItem.emptyIconData, listIndex = 0, chronologicalIndex = 0) {
    this.name = name;
    this.value = name;
    this.label = name;
    this.iconData = icon;
    this.listIndex = listIndex;
    this.chronologicalIndex = chronologicalIndex;
  }

  modelConstructor(m: ObservableItem) {
    this.name = m.name;
    this.value = m.value;
    this.label = m.label;
    this.iconData = m.iconData;
    this.listIndex = m.listIndex;
    this.chronologicalIndex = m.chronologicalIndex;
  }
}
