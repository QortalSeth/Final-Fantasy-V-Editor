import React from 'react';
import { Models } from 'src/models/lists/Models';
import Model from 'src/models/Model';
import smallCrystal from 'assets/TextIcons/12 - Crystal (Small).png';
import swordIcon from 'assets/TextIcons/00 - Sword Icon (Excalibur).png';
import whiteIcon from 'assets/TextIcons/01 - White Magic Icon (FF4).png';
import blackIcon from 'assets/TextIcons/02 - Black Magic Icon (FF4).png';
import timeIcon from 'assets/TextIcons/03 - Time Magic Icon.png';
import summonIcon1 from 'assets/TextIcons/04 - Summon (Overworld Icon).png';
import summonIcon2 from 'assets/TextIcons/04 - Summon Icon.png';
import songIcon from 'assets/TextIcons/05 - Song Icon.png';
import dragoonIcon from 'assets/TextIcons/06 - Dragoon Icon.png';
import harpIcon from 'assets/TextIcons/07 - Harp.png';
import danceIcon from 'assets/TextIcons/08 - Dancer Icon.png';
import blueIcon from 'assets/TextIcons/09 - Blue Magic Icon.png';
import enemyIcon from 'assets/TextIcons/10 - Apocalypse Icon.png';
import whipIcon from 'assets/TextIcons/11 - Whip Icon.png';
import miscIcon from 'assets/TextIcons/13 - Misc. Icon.png';
import { numToHexString } from 'src/utils/NumberFormatConverter';
import CSS from 'csstype';
import { ObservableItem } from 'src/models/ObservableItem';

interface Props<T extends Model> {
  models: Models<T>;
  divStyle?: CSS.Properties;
}

export const spellTypes: ObservableItem[] = ObservableItem.setListIndexes([
  new ObservableItem('All', { name: smallCrystal, width: '30 px', height: '20 px' }),
  new ObservableItem('Magic Sword', { name: swordIcon, width: '30 px', height: '20 px' }),
  new ObservableItem('White', { name: whiteIcon, width: '30 px', height: '20 px' }),
  new ObservableItem('Black', { name: blackIcon, width: '30 px', height: '20 px' }),
  new ObservableItem('Time', { name: timeIcon, width: '30 px', height: '20 px' }),
  new ObservableItem('Summon', { name: summonIcon2, width: '30 px', height: '20 px' }),
  new ObservableItem('Song', { name: songIcon, width: '30 px', height: '20 px' }),
  new ObservableItem('Blue', { name: blueIcon, width: '30 px', height: '20 px' }),
  new ObservableItem('Enemy', { name: enemyIcon, width: '30 px', height: '20 px' }),
  new ObservableItem('Misc', { name: miscIcon, width: '120 px', height: '20 px' }),
]);

export const IconMenu = <T extends Model>({ models, divStyle = {} }: Props<T>) => {
  const getIcon = (icon: string) => {
    // console.log('icon is: ', icon);
    switch (icon) {
      case 'swordIcon':
        return swordIcon;
      case 'whiteIcon':
        return whiteIcon;
      case 'blackIcon':
        return blackIcon;
      case 'timeIcon':
        return timeIcon;
      case 'summonIcon1':
        return summonIcon1;
      case 'summonIcon2':
        return summonIcon2;
      case 'songIcon':
        return songIcon;
      case 'dragoonIcon':
        return dragoonIcon;
      case 'harpIcon':
        return harpIcon;
      case 'danceIcon':
        return danceIcon;
      case 'blueIcon':
        return blueIcon;
      case 'enemyIcon':
        return enemyIcon;
      case 'whipIcon':
        return whipIcon;
      default:
        return '';
    }
  };

  const defaultStyle = { overflow: 'scroll' };
  return (
    <div style={{ ...defaultStyle, ...divStyle }}>
      {models.models.map((m, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index + m.name}>
            <img
              src={getIcon(m.iconData.name)}
              alt='(No Icon)'
              width={m.iconData.width}
              height={m.iconData.height}
              style={{ marginRight: '5px' }}
            />
            <span style={{ fontSize: '25px' }}>{` 0x${numToHexString(m.gameIndex)}: ${m.label}`}</span>
          </div>
        );
      })}
    </div>
  );
};
