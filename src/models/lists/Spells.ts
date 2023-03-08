import { Models } from 'src/models/lists/Models';
import { Spell } from 'src/models/Spell';

export class Spells extends Models<Spell> {
  constructor(modelsNum: number, names: string[]) {
    super(modelsNum, names);
    for (let i = 0; i < this.modelsNum; i++) {
      this.models.push(new Spell(i, names[i], false));
      this.Dmodels.push(new Spell(i, names[i], true));
    }
  }
}
