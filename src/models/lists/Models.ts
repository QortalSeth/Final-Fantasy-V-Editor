import Model from 'src/models/Model';
import { TextData } from 'src/models/text/ReadText';

export class Models<T extends Model> {
  models: T[] = [];

  Dmodels: T[] = [];

  nameData: TextData[] = [];

  constructor(namePointers: TextData[]) {
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
}
