import { DefaultJSON, Models } from 'src/models/lists/Models';
import { Spell } from 'src/models/Spell';
import { getUsingDefaultROM } from 'src/utils/StoreAccess';
import { TextData } from 'src/models/text/TextManager';

export class Spells extends Models<Spell> {
  static modelsNum = 0xec;

  className = 'Spells';

  constructor(namePointers?: TextData[]) {
    super(namePointers);
    if (namePointers) {
      const usingDefaultROM = getUsingDefaultROM();
      for (let i = 0; i < Spells.modelsNum; i++) {
        this.models.push(new Spell(i, namePointers[i], false));
        if (usingDefaultROM) {
          this.Dmodels.push(new Spell(i, namePointers[i], true));
        }
      }
    }
  }
}
