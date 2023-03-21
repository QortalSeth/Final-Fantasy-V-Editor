import { Models } from 'src/models/lists/Models';
import Model from 'src/models/Model';

export type AllModelsItem = { name: string; models: Models<Model> };
export type AllModels = Array<AllModelsItem>;

export const serializeModels = (models: AllModels) => {
  return models.map((i) => {
    return { name: i.name, models: JSON.stringify(i.models) };
  });
};
