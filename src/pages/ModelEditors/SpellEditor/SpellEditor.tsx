import React, { useRef, useState } from 'react';
import { IconMenu, spellTypes } from 'src/components/IconMenu';
import { SpellType } from 'src/models/Spell';
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import IncDecSelect, { IncDecSelectRef } from 'src/components/Buttons/IncDecSelect';
import { Spells } from 'src/models/lists/Spells';
import { ObservableItem } from 'src/models/ObservableItem';
import { SingleValue } from 'react-select';
import { CheckBoxWithDefaultProps } from 'src/components/CheckBoxes';
import { CheckBoxGroup } from 'src/components/CheckBoxGroup';
import { DefaultTextfieldProp, DefaultTextfieldGrid, CustomTextfield, TextfieldWithDefault } from 'src/components/TextFields';
import jsonData from 'assets/Text/Magic Parameter Labels.json';
import {
  attackTypeCheckBoxes,
  miscCheckBoxes,
  observableParameterData,
  targetingCheckBoxes,
  textFieldProps,
} from 'src/pages/ModelEditors/SpellEditor/SpellEditorData';
import { createObservableParameterLabels, ParameterLabel } from 'src/models/ParameterLabel';

const debugSpellEditor = false;
export const SpellEditor: React.FC = () => {
  const spellsString = useSelector((state: RootState) => state.ROM.models).find((m) => {
    return m.name === 'Spells';
  })?.models;

  const [displayedSpells, setDisplayedSpells] = useState<Spells | null>(null);
  const [parameter1, setParameter1] = useState('Parameter 1:');
  const [parameter2, setParameter2] = useState('Parameter 2:');
  const [parameter3, setParameter3] = useState('Parameter 3:');

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
    const textFieldStyle = { width: '40px' };
    const parameterProps: DefaultTextfieldProp[] = [
      { minValue: 0, maxValue: 0xff, labelText: parameter1, textFieldStyle },
      { minValue: 0, maxValue: 0xff, labelText: parameter2, textFieldStyle },
      { minValue: 0, maxValue: 0xff, labelText: parameter3, textFieldStyle },
    ];

    const parameterStyle = { display: 'block', justifySelf: 'right' };
    return (
      <div>
        <div style={{ position: 'fixed', top: '0', height: '5%' }}>
          <IncDecSelect
            ref={selectRef}
            options={spellTypes}
            divStyle={{ paddingTop: '0px' }}
            incDecStyle={{ width: '3vh', height: '100%%' }}
            selectStyle={{
              width: '37vw',
              height: '100%',
              backgroundColor: '#d8d8d8',
            }}
            onChange={filterSpells}
          />
          <IconMenu
            models={displayedSpells || spells}
            divStyle={{ position: 'fixed', top: '5%', width: '40vw', bottom: '0', backgroundColor: '#e0e0e0' }}
          />
        </div>
        <CheckBoxGroup xStart='41vw' yStart='3.8vh' checkBoxes={targetingCheckBoxes} width='45vw' columns={2} name='Targeting' />
        <CheckBoxGroup
          xStart='41vw'
          yStart='17vh'
          checkBoxes={attackTypeCheckBoxes}
          width='45vw'
          columns={2}
          name='Attack Type'
        />
        <CheckBoxGroup xStart='41vw' yStart='30vh' checkBoxes={miscCheckBoxes} width='45vw' columns={2} name='Miscellaneous' />
        <DefaultTextfieldGrid
          textfieldProps={textFieldProps}
          gridStyle={{
            left: '40.37vw',
            top: '40vh',
            width: '60vw',
            position: 'absolute',
            gridTemplateColumns: '90px 150px 90px 150px',
          }}
          columns={4}
        />
        <span style={{ position: 'absolute', left: '41vw', top: '47.5vh' }}>Attack Formula</span>
        <div
          style={{
            display: 'grid',
            position: 'absolute',
            left: '41vw',
            top: '50vh',
            width: '58vw',
            gridTemplateColumns: '11vw 40vw',
            border: '2px solid blue',
            gap: '5px',
          }}
        >
          <IncDecSelect
            options={observableParameterData}
            divStyle={{ gridColumn: 'span 2' }}
            selectStyle={{ width: '40vw' }}
            incDecStyle={{ width: '3vw' }}
          />
          <span style={{ ...parameterStyle, marginTop: '1vh' }}>{parameter1}</span>
          <TextfieldWithDefault labelText='' minValue={0} maxValue={0xff} style={{ display: 'flex', padding: '0px' }} />
          <span style={{ ...parameterStyle, marginTop: '0.6vh' }}>{parameter2}</span>
          <TextfieldWithDefault
            labelText=''
            minValue={0}
            maxValue={0xff}
            style={{ display: 'flex', alignSelf: 'center', padding: '0px' }}
          />
          <span style={{ ...parameterStyle, marginTop: '0.6vh' }}>{parameter3}</span>
          <TextfieldWithDefault
            labelText=''
            minValue={0}
            maxValue={0xff}
            style={{ display: 'flex', alignSelf: 'center', padding: '0px' }}
          />
        </div>
      </div>
    );
  }
  return <span />;
};

export default SpellEditor;
