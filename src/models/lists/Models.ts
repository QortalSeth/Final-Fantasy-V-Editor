import Model from 'src/models/Model';
import { TextData } from 'src/models/text/TextManager';

export interface DefaultJSON<T extends Model> {
  name: string;
  Dmodels: T[];
}

export abstract class Models<T extends Model> {
  models: T[] = [];

  static readDefaultJSON = true;

  Dmodels: T[] = [];

  nameData: TextData[] = [];

  abstract className: string;

  constructor(namePointers: TextData[] = []) {
    this.nameData = namePointers;
  }

  clearAll = () => {
    this.models = [];
    this.Dmodels = [];
  };

  clearModels = () => {
    this.models = [];
  };

  clearDmodels = () => {
    this.Dmodels = [];
  };

  resetListIndexes = () => {
    this.models.forEach((m, index) => {
      m.listIndex = index;
    });
  };

  initializeDefaultModels = (dModelsObject: object) => {
    const dModels = dModelsObject as DefaultJSON<T>[];
    const dModel = dModels.find(({ name }) => {
      // console.log('name is: ', item.name, 'item is: ', item, 'index is: ', index);
      return name === this.className;
    });
    if (dModel) this.Dmodels = dModel.Dmodels;
  };

  findModel = (name: string, models: { name: string; models: Models<Model> }[]) => {
    return models.find((m) => {
      return m.name === name;
    });
  };
}
