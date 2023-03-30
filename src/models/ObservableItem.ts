// eslint-disable-next-line max-classes-per-file
export interface IconData {
  name: string;
  width: string;
  height: string;
}

export class ObservableItem {
  listIndex: number = 0;

  name: string = '';

  value: string = '';

  label: string = '';

  static emptyIconData = { name: '', width: '', height: '' };

  iconData: IconData = ObservableItem.emptyIconData;

  chronologicalIndex: number = 0;

  static resetListIndexes = (list: ObservableItem[]) => {
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
