import IncDecSelect, { IncDecSelectRef } from 'src/components/Buttons/IncDecSelect';
import { IconMenu, spellTypes } from 'src/components/IconMenu';
import React, { useRef } from 'react';
import { SingleValue } from 'react-select';
import { ObservableItem } from 'src/models/ObservableItem';
import { SpellType } from 'src/models/Spell';
import { Spells } from 'src/models/lists/Spells';

interface SpellListProps {
  spells: Spells;
  displayedSpells: Spells | null;
  setDisplayedSpells: (filteredSpells: Spells) => void;
}

export const SpellList = ({ spells, displayedSpells, setDisplayedSpells }: SpellListProps) => {
  const selectRef = useRef<IncDecSelectRef>(null);
  const filterSpells = (v: SingleValue<ObservableItem>) => {
    const ref = selectRef.current;
    if (ref) {
      const selectedValue = v;
      if (selectedValue) {
        const filteredSpells = spells;
        filteredSpells.resetListIndexes();

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

        setDisplayedSpells(filteredSpells); // THIS LINE ACTIVATES CHANGELISTENER DUE TO STATE UPDATE
        // console.log('filtered Spells: ', filteredSpells);
      }
    }
  };
  return (
    <div style={{ display: 'contents' }}>
      <IncDecSelect
        ref={selectRef}
        options={spellTypes}
        divStyle={{ padding: '0px' }}
        selectStyle={{
          backgroundColor: '#d8d8d8',
        }}
        onChange={filterSpells}
        size={{
          buttonWidth: '5vw',
          inputWidth: '35vw',
          height: '5vh',
        }}
      />
      <IconMenu models={displayedSpells || spells} divStyle={{ width: '40vw', height: '95vh', backgroundColor: '#e0e0e0' }} />
    </div>
  );
};

export default SpellList;
