import React, { useRef, useState } from 'react';
import { IconMenu, spellTypes } from 'src/components/IconMenu';
import { Spell, SpellType } from 'src/models/Spell';
import { Models } from 'src/models/lists/Models';
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import IncDecSelect, { IncDecSelectRef } from 'src/components/Buttons/IncDecSelect';
import { Spells } from 'src/models/lists/Spells';
import { ObservableItem } from 'src/models/ObservableItem';
import { SingleValue } from 'react-select';

const debugSpellEditor = false;
export const SpellEditor: React.FC = () => {
  const spellsString = useSelector((state: RootState) => state.ROM.models).find((m) => {
    return m.name === 'Spells';
  })?.models;

  const [displayedSpells, setDisplayedSpells] = useState<Spells | null>(null);
  const selectRef = useRef<IncDecSelectRef>(null);
  if (debugSpellEditor) console.log('Spellstring is: ', spellsString);
  if (spellsString) {
    const spells = Object.assign(new Spells(), JSON.parse(spellsString)) as Spells;
    if (debugSpellEditor) console.log('spells are: ', spells);

    const filterSpells = (v: SingleValue<ObservableItem>) => {
      const ref = selectRef.current;
      if (ref) {
        const selectedValue = v;
        if (selectedValue) {
          const filteredSpells = spells;
          switch (selectedValue.name) {
            case 'Magic Sword':
              filteredSpells.models = spells.models.filter((spell) => {
                return spell.spellType === SpellType.MAGICSWORD;
              });
              break;
            case 'White':
              filteredSpells.models = spells.models.filter((spell) => {
                return spell.spellType === SpellType.WHITE;
              });
              break;
            case 'Black':
              filteredSpells.models = spells.models.filter((spell) => {
                return spell.spellType === SpellType.BLACK;
              });
              break;
            case 'Time':
              filteredSpells.models = spells.models.filter((spell) => {
                return spell.spellType === SpellType.TIME;
              });
              break;
            case 'Summon':
              filteredSpells.models = spells.models.filter((spell) => {
                return spell.spellType === SpellType.SUMMON1 || spell.spellType === SpellType.SUMMON2;
              });
              break;
            case 'Song':
              filteredSpells.models = spells.models.filter((spell) => {
                return spell.spellType === SpellType.SONG;
              });
              break;
            case 'Dragoon':
              filteredSpells.models = spells.models.filter((spell) => {
                return spell.spellType === SpellType.DRAGOON;
              });
              break;
            case 'Harp':
              filteredSpells.models = spells.models.filter((spell) => {
                return spell.spellType === SpellType.HARP;
              });
              break;
            case 'Blue':
              filteredSpells.models = spells.models.filter((spell) => {
                return spell.spellType === SpellType.BLUE;
              });
              break;
            case 'Enemy':
              filteredSpells.models = spells.models.filter((spell) => {
                return spell.spellType === SpellType.ENEMY;
              });
              break;
            case 'Misc':
              filteredSpells.models = spells.models.filter((spell) => {
                return (
                  spell.spellType === SpellType.DRAGOON ||
                  spell.spellType === SpellType.HARP ||
                  spell.spellType === SpellType.DANCE ||
                  spell.spellType === SpellType.WHIP
                );
              });
              break;
            default:
              filteredSpells.models = spells.models;
          }
          filteredSpells.resetListIndexes();
          setDisplayedSpells(filteredSpells); // THIS LINE ACTIVATES CHANGELISTENER DUE TO STATE UPDATE
          // console.log('filtered Spells: ', filteredSpells);
        }
      }
    };
    return (
      <div style={{ position: 'fixed', top: '0', height: '5%' }}>
        <IncDecSelect
          ref={selectRef}
          options={spellTypes}
          initialValue={spellTypes[0]}
          divStyle={{ paddingTop: '0px' }}
          incDecStyle={{ height: '100%%' }}
          selectStyle={{
            width: '200px',
            height: '100%',
            backgroundColor: '#d8d8d8',
          }}
          onChange={filterSpells}
        />
        <IconMenu
          models={displayedSpells || spells}
          divStyle={{ position: 'fixed', top: '5%', width: '50%', bottom: '0', backgroundColor: '#e0e0e0' }}
        />
      </div>
    );
  }
  return <span />;
};

export default SpellEditor;
