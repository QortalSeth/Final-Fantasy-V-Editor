import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import IconButton, { IconButtonProps } from './IconButton';
import openIcon from '../../assets/Open Icon.png';
import saveIcon from '../../assets/Save Icon.png';
import characterIcon from '../../assets/Bartz Freelancer.png';
import jobIcon from '../../assets/Lenna Mime Mod.png';
import itemIcon from '../../assets/Excalibur.png';
import spellIcon from '../../assets/Comet.png';
import shopIcon from '../../assets/Female NPC.png';
import enemyIcon from '../../assets/Gilgamesh.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { byteSelector, setROM } from '../redux/slices/ROM-Slice';

const OpenEditor = (editorName: string) => {};

export const EditorChooser = () => {
  const [isDisabled, setDisabled] = useState(true);

  const dispatch = useAppDispatch();

  // console.log(
  //   '10th byte is: ',
  //   useAppSelector((state) => byteSelector(state, 10))
  // );

  const openFile = async () => {
    const options = {
      title: 'Open a ROM',
      defaultPath: '.',
      filters: [
        { name: 'Roms (.smc, .sfc)', extensions: ['smc', 'sfc'] },
        { name: 'All Files', extensions: ['*'] },
      ],
      properties: ['openFile', 'createDirectory'],
    };
    console.log('in openFile clickEvent');
    await window.electron.ipcRenderer
      .openROM(options)
      .then(
        // eslint-disable-next-line promise/always-return
        (romState) => {
          setDisabled(false);
          dispatch(setROM(romState));
        }
      )
      .catch((e) => console.log('No File Selected'));
  };

  const buttonProps: IconButtonProps[] = [
    { name: 'Open', icon: openIcon, clickListener: () => openFile(), disabled: false },
    { name: 'Save', icon: saveIcon, clickListener: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Character', icon: characterIcon, clickListener: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Job', icon: jobIcon, clickListener: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Item', icon: itemIcon, clickListener: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Spell', icon: spellIcon, clickListener: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Shop', icon: shopIcon, clickListener: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Enemy', icon: enemyIcon, clickListener: () => console.log('clicked'), disabled: isDisabled },
  ];
  const buttonWidth = `${100 / buttonProps.length}%`;

  // eslint-disable-next-line no-return-assign
  buttonProps.map((bp) => (bp.buttonStyle = { width: buttonWidth }));

  const divStyle = {
    width: '100%',
    height: '20%',
    top: 0,
    bottom: 0,
    position: 'fixed' as const,
  };

  return (
    <div style={divStyle}>
      {buttonProps.map((props) => (
        // eslint-disable-next-line react/prop-types
        <IconButton key={props.name} {...props} />
      ))}
    </div>
  );
};

export default EditorChooser;
