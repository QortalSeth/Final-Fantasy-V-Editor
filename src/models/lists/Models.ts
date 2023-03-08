import Model from 'src/models/Model';
import { Spell } from 'src/models/Spell';

export class Models<T extends Model> {
  models: T[] = [];

  Dmodels: T[] = [];

  names: string[] = [];

  modelsNum: number = 0;

  constructor(modelsNum: number, names: string[]) {
    this.modelsNum = modelsNum;
    this.names = names;
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
