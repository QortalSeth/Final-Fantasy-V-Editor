import React from 'react';
import { arrayToString } from 'src/utils/NumberFormatConverter';

export const TextEditorFooter: React.FC<{ textAreaHeight: string }> = ({ textAreaHeight }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr 1fr 1fr',
    gridGap: '0px',
    width: '98vw',
    marginLeft: '1vw',
    minHeight: '70px',
    paddingTop: '10px',
  };

  const textAreaStyle = { height: textAreaHeight };

  const miscText = ['0x00 ~END~', '0x02 ~BARTZ~', '0xBE ~MISC~', '0xC2 ~DRINK~', '0xC0 ~TENT~', '0xBC ~KEY~', '0xFF ~SPACE~'];

  const weaponText = [
    '0xE7 ~KNIFE~',
    '0xE3 ~SWORD~',
    '0xEC ~STAFF~',
    '0xEB ~ROD~',
    '0xE9 ~AXE~  ',
    '0xBF ~HAMMR~',
    '0xEF ~WHIP~ ',
    '0xC6 ~SURKN~',
    '0xC8 ~SCRLL~',
    '0xED ~BOW~',
    '0xEE ~HARP~ ',
    '0xEA ~KATAN~',
    '0xE8 ~SPEAR~',
    '0xF0 ~BELL~',
    '0xCA ~CLAW~',
  ];
  const armorText = [
    '0xF1 ~SHELD~',
    '0xF2 ~HELM~',
    '0xC1 ~RIBBN~',
    '0xF3 ~ARMOR~',
    '0xC3 ~SUIT~',
    '0xBD ~SHOE~',
    '0xF4 ~RING~',
    '0xCC ~GLOVE~',
  ];

  const spellText = ['0xE4 ~WHITE~', '0xE5 ~BLACK~', '0xE6 ~DIMEN~', '0xC4 ~SONG~'];
  const spanStyle = { justifySelf: 'center' };
  return (
    <div style={gridStyle}>
      <span style={spanStyle}>Misc. Characters</span>
      <span style={spanStyle}>Weapon Characters</span>
      <span style={spanStyle}>Armor Characters</span>
      <span style={spanStyle}>Magic Characters</span>
      <textarea className='fontMedium' value={arrayToString(miscText, 1, '')} style={textAreaStyle} readOnly />
      <textarea className='fontSmall' value={arrayToString(weaponText, 2, '   ')} style={textAreaStyle} readOnly />
      <textarea className='fontSmall' value={arrayToString(armorText, 1)} style={textAreaStyle} readOnly />
      <textarea className='fontMedium' value={arrayToString(spellText, 1)} style={textAreaStyle} readOnly />
    </div>
  );
};
