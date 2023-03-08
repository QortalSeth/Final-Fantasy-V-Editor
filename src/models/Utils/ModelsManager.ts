import { Models } from 'src/models/lists/Models';
import Model from 'src/models/Model';
// eslint-disable-next-line import/no-cycle
import { Spells } from 'src/models/lists/Spells';
import { metaCharacters, TextToJSON } from 'src/models/text/ReadText';

export const baseNamesDir = 'assets/TextLocations';
export const fullNamesDir = `${baseNamesDir}/RPGe`;
export const models = new Map<string, Models<Model>>();
// eslint-disable-next-line import/no-mutable-exports
export let spellNames: string[] = [];

const removeMetaCharacters = (names: string[]) => {
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
const JSONtoName = (json: TextToJSON[][]) => {
  const names: string[] = [];
  json.forEach((value) => {
    value.forEach((item) => {
      names.push(item.text);
    });
  });
  return names;
};

const assembleNames = async () => {
  await window.electron.ipcRenderer.openJSONfiles(`${fullNamesDir}/Spells`).then((json) => {
    spellNames = removeMetaCharacters(JSONtoName(json));
    console.log('spellnames: ', spellNames);
  });
};
export const initializeModels = () => {
  assembleNames()
    // eslint-disable-next-line promise/always-return
    .then((r) => {
      // eslint-disable-next-line promise/always-return
      models.set('Spells', new Spells(0xec, spellNames));
    })
    .catch((e) => {
      console.log('assembleNames error', e);
    });
};
