import { spellIconIndexes } from 'src/models/Utils/IconIndexes';
import Model from './Model';

export class Spell extends Model {
  baseOffset = 0x110b80;

  bytesPerModel = 8;

  targeting!: number;

  type!: number;

  attributes!: number;

  costAndReflect!: number;

  attackFormula!: number;

  parameter1!: number;

  parameter2!: number;

  parameter3!: number;

  modelConstructor(m: Spell) {
    super.modelConstructor(m);
  }

  constructor(index: number, name: string, defaultROM = false) {
    super(index, name, defaultROM, spellIconIndexes);
  }

  getValuesFromROM(defaultROM = false) {
    this.initializeOffset();
    this.targeting = this.getNextByte(defaultROM);
    this.type = this.getNextByte(defaultROM);
    this.attributes = this.getNextByte(defaultROM);
    this.costAndReflect = this.getNextByte(defaultROM);
    this.attackFormula = this.getNextByte(defaultROM);
    this.parameter1 = this.getNextByte(defaultROM);
    this.parameter2 = this.getNextByte(defaultROM);
    this.parameter3 = this.getNextByte(defaultROM);
  }

  writeValuesToROM() {
    this.initializeOffset();
    this.setNextByte(this.targeting);
    this.setNextByte(this.type);
    this.setNextByte(this.attributes);
    this.setNextByte(this.costAndReflect);
    this.setNextByte(this.attackFormula);
    this.setNextByte(this.parameter1);
    this.setNextByte(this.parameter2);
    this.setNextByte(this.parameter3);
  }
}
