import { Models } from 'src/models/lists/Models';
import Model from 'src/models/Model';
// eslint-disable-next-line import/no-cycle
import { Spells } from 'src/models/lists/Spells';
import { metaCharacters, TextData } from 'src/models/text/ReadText';
import { Spell } from 'src/models/Spell';

export const baseNamesDir = 'assets/TextLocations';
export const fullNamesDir = `${baseNamesDir}/RPGe`;
export const models = new Map<string, Models<Model>>();
// eslint-disable-next-line import/no-mutable-exports
export let spellNames: TextData[] = [];

export const removeMetaCharacters = (names: string[]) => {
  const metaCharactersS = Array.from(metaCharacters.values());
  const newNames: string[] = [];
  names.forEach((name) => {
    let replacedName = name;
    metaCharactersS.forEach((mc) => {
      replacedName = replacedName.replaceAll(mc, '');
    });
    newNames.push(replacedName);
  });
  return newNames;
};

const JSONtoName = (json: TextData[][]) => {
  const names: string[] = [];
  json.forEach((value) => {
    value.forEach((item) => {
      names.push(item.text);
    });
  });
  return names;
};

const JSONtoNameData = (json: TextData[][]) => {
  const names: TextData[] = [];
  json.forEach((value) => {
    value.forEach((item) => {
      names.push(item);
    });
  });
  return names;
};

const assembleNames = async () => {
  await window.electron.ipcRenderer.openJSONfiles(`${fullNamesDir}/Spells`).then((json) => {
    spellNames = JSONtoNameData(json as TextData[][]);
    // console.log('spellnames: ', spellNames);
  });
};

export interface DefaultJSON<T extends Model> {
  name: string;
  Dmodels: T[];
}
export const writeDefaultModelsToJSON = () => {
  let defaultData = {} as DefaultJSON<Model>;
  models.forEach((value, key) => {
    const newData = { name: key, Dmodels: value.Dmodels };
    defaultData = { ...defaultData, ...newData };
  });
  if (defaultData) {
    const json = JSON.stringify(defaultData, null, ' ');
    // console.log('default data json is: ', json);
    window.electron.ipcRenderer.saveJSONfile(json, 'src/models/DefaultData.json');
    console.log('Writing Default Models to JSON Complete');
  }
};

export const initializeModels = () => {
  assembleNames()
    // eslint-disable-next-line promise/always-return
    .then(() => {
      // eslint-disable-next-line promise/always-return
      models.set('Spells', new Spells(spellNames));
      writeDefaultModelsToJSON();
    })
    .catch((e) => {
      console.log('assembleNames error', e);
    });
};
