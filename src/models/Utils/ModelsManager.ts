import { DefaultJSON, Models } from 'src/models/lists/Models';
import Model from 'src/models/Model';
// eslint-disable-next-line import/no-cycle
import { Spells } from 'src/models/lists/Spells';
import { metaCharacters, TextData } from 'src/models/text/ReadText';
import { getUsingDefaultROM } from 'src/utils/ROM';

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

export const writeDefaultModelsToJSON = () => {
  const defaultData = [] as DefaultJSON<Model>[];
  models.forEach((value, key) => {
    const newData = { name: key, Dmodels: value.Dmodels };
    defaultData.push(newData);
  });
  if (defaultData) {
    const json = JSON.stringify(defaultData, null, ' ');
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

export const initializeDmodels = () => {
  if (!getUsingDefaultROM() || Models.readDefaultJSON) {
    models.forEach((model, className) => {
      window.electron.ipcRenderer
        .openJSONfiles('src/models')
        .then((json) => {
          const defaultModelsJSON = json[0];
          model.initializeDefaultModels(defaultModelsJSON);
        })
        .catch((e) => {
          console.log('default JSON file not found');
        });
    });
  }
};
