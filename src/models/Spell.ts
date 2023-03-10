import { spellIconIndexes } from 'src/models/Utils/IconIndexes';
import { TextData } from 'src/models/text/ReadText';
import { getHeader } from 'src/utils/ROM';
import Model from './Model';

export class Spell extends Model {
  targeting!: number;

  type!: number;

  attributes!: number;

  costAndReflect!: number;

  attackFormula!: number;

  parameter1!: number;

  parameter2!: number;

  parameter3!: number;

  spellType: string = '';

  static baseOffset = 0x110b80;

  static bytesPerModel = 8;

  static spellTypes = new Map<string, string>([
    ['sword', 'Magic Sword'],
    ['white', 'White'],
    ['black', 'Black'],
    ['time', 'Time'],
    ['summon', 'Summon'],
    ['song', 'Song'],
    ['summon', 'Summon'],
    ['dragoon', 'Dragoon'],
    ['harp', 'Harp'],
    ['dance', 'Dance'],
    ['whip', 'Whip'],
    ['blue', 'Blue'],
    ['enemy', 'Enemy'],
  ]);

  modelConstructor(m: Spell) {
    super.modelConstructor(m);
    this.targeting = m.targeting;
    this.costAndReflect = m.costAndReflect;
    this.attackFormula = m.attackFormula;
    this.parameter1 = m.parameter1;
    this.parameter2 = m.parameter2;
    this.parameter3 = m.parameter3;
  }

  constructor(index: number, nameData: TextData, defaultROM = false) {
    super(index, nameData, spellIconIndexes);
    this.offset = this.gameIndex * Spell.bytesPerModel + Spell.baseOffset + getHeader();
    this.getValuesFromROM(defaultROM);
    this.spellType = this.getValueFromGameIndex(Spell.spellTypes, spellIconIndexes);
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

  // toJSON() {
  //   return {
  //     ...super.toJSON(),
  //     targeting: this.targeting,
  //     type: this.type,
  //     attributes: this.attributes,
  //     costAndReflect: this.costAndReflect,
  //     attackFormula: this.attackFormula,
  //     parameter1: this.parameter1,
  //     parameter2: this.parameter2,
  //     parameter3: this.parameter3,
  //   };
  // }
}
