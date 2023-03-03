import Model from './Model';

class Spell extends Model {
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

  getValuesFromROM() {
    super.initializeOffset();
    this.targeting = this.getNextByte();
    this.type = this.getNextByte();
    this.attributes = this.getNextByte();
    this.costAndReflect = this.getNextByte();
    this.attackFormula = this.getNextByte();
    this.parameter1 = this.getNextByte();
    this.parameter2 = this.getNextByte();
    this.parameter3 = this.getNextByte();
    this.name = String(this.gameIndex);
  }

  writeValuesToROM() {
    super.initializeOffset();
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
