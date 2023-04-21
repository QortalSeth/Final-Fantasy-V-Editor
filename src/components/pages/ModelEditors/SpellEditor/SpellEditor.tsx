import React, { useRef, useState } from 'react';
import { RootState } from 'src/redux/store';
import { useSelector } from 'react-redux';
import IncDecSelect, { IncDecSelectRef } from 'src/components/Buttons/IncDecSelect';
import { Spells } from 'src/models/lists/Spells';
import CheckBoxGroups from 'src/components/pages/ModelEditors/SpellEditor/CheckboxGroups';
import { DefaultTextfieldProp, DefaultTextfieldGrid, CustomTextfield, TextfieldWithDefault } from 'src/components/TextFields';
import { observableParameterData, textFieldProps } from 'src/components/pages/ModelEditors/SpellEditor/SpellEditorData';
import WithResponsiveSize from 'src/components/pages/ModelEditors/WithResponsiveSize';
import SpellList from 'src/components/pages/ModelEditors/SpellEditor/SpellList';

const debugSpellEditor = false;
export const SpellEditor: React.FC = () => {
  const spellsString = useSelector((state: RootState) => state.ROM.models).find((m) => {
    return m.name === 'Spells';
  })?.models;

  const [displayedSpells, setDisplayedSpells] = useState<Spells | null>(null);
  const [parameter1, setParameter1] = useState('Parameter 1:');
  const [parameter2, setParameter2] = useState('Parameter 2:');
  const [parameter3, setParameter3] = useState('Parameter 3:');

  if (debugSpellEditor) console.log('Spellstring is: ', spellsString);
  if (spellsString) {
    const spells = Object.assign(new Spells(), JSON.parse(spellsString)) as Spells;
    if (debugSpellEditor) console.log('spells are: ', spells);

    const textFieldStyle = { width: '40px' };

    const textfieldWidth = '6vw';
    const textfieldHeight = '3vh';
    const parameterProps: DefaultTextfieldProp[] = [
      { minValue: 0, maxValue: 0xff, labelText: parameter1, textFieldStyle, width: textfieldWidth, height: textfieldHeight },
      { minValue: 0, maxValue: 0xff, labelText: parameter2, textFieldStyle, width: textfieldWidth, height: textfieldHeight },
      { minValue: 0, maxValue: 0xff, labelText: parameter3, textFieldStyle, width: textfieldWidth, height: textfieldHeight },
    ];

    const parameterStyle = { display: 'block', alignSelf: 'center', justifySelf: 'right' };
    return (
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1px',
            paddingRight: '2vw',
          }}
        >
          <SpellList displayedSpells={displayedSpells} setDisplayedSpells={setDisplayedSpells} spells={spells} />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '2vh',
          }}
        >
          <CheckBoxGroups />
          <DefaultTextfieldGrid textfieldProps={textFieldProps} gridStyle={{}} columns={4} />
          <div>
            <span>Attack Formula</span>
            <div
              style={{
                display: 'grid',
                width: '50vw',
                gridTemplateColumns: '15vw 40vw',
                border: '2px solid blue',
                gap: '.5vh',
                paddingTop: '0.1vh',
                paddingBottom: '1vh',
              }}
            >
              <IncDecSelect
                options={observableParameterData}
                divStyle={{ gridColumn: 'span 2' }}
                size={{ buttonWidth: '4vw', inputWidth: '45.4vw', height: '4vh' }}
              />
              <span style={{ ...parameterStyle }}>{parameter1}</span>
              <TextfieldWithDefault
                labelText=''
                minValue={0}
                maxValue={0xff}
                style={{ display: 'flex', padding: '0px' }}
                width={textfieldWidth}
                height={textfieldHeight}
              />
              <span style={{ ...parameterStyle, marginTop: '0.6vh' }}>{parameter2}</span>
              <TextfieldWithDefault
                labelText=''
                minValue={0}
                maxValue={0xff}
                style={{ display: 'flex', alignSelf: 'center', padding: '0px' }}
                width={textfieldWidth}
                height={textfieldHeight}
              />
              <span style={{ ...parameterStyle, marginTop: '0.6vh' }}>{parameter3}</span>
              <TextfieldWithDefault
                labelText=''
                minValue={0}
                maxValue={0xff}
                style={{ display: 'flex', alignSelf: 'center', padding: '0px' }}
                width={textfieldWidth}
                height={textfieldHeight}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <span />;
};

export default WithResponsiveSize(SpellEditor);
