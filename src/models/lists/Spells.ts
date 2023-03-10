import { Models } from 'src/models/lists/Models';
import { Spell } from 'src/models/Spell';
import { TextData } from 'src/models/text/ReadText';
import { getUsingDefaultROM } from 'src/utils/ROM';

export class Spells extends Models<Spell> {
  static modelsNum = 0xec;

  constructor(namePointers: TextData[]) {
    super(namePointers);
    const usingDefaultROM = getUsingDefaultROM();
    for (let i = 0; i < Spells.modelsNum; i++) {
      this.models.push(new Spell(i, namePointers[i], false));
      if (usingDefaultROM) {
        this.Dmodels.push(new Spell(i, namePointers[i], true));
      }
    }

    // if (!usingDefaultROM) {
    //   const json = window.electron.ipcRenderer.openJSONfiles('src/models') as ;
    //   this.Dmodels = json;
    // }
  }
}
