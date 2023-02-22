import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton, { IconButtonProps } from './Buttons/IconButton';
import openIcon from '../../assets/Open Icon.png';
import saveIcon from '../../assets/Save Icon.png';
import characterIcon from '../../assets/Bartz Freelancer.png';
import jobIcon from '../../assets/Lenna Mime Mod.png';
import itemIcon from '../../assets/Excalibur.png';
import spellIcon from '../../assets/Comet.png';
import shopIcon from '../../assets/Female NPC.png';
import enemyIcon from '../../assets/Gilgamesh.png';
import textIcon from '../../assets/Text.png';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setROM } from '../redux/slices/ROM-Slice';

export const EditorChooser = () => {
  const defaultROM = '/home/seth/WebstormProjects/Final-Fantasy-V-Editor/assets/Final Fantasy V translated.smc';
  const useDefaultROM = true;
  const [isDisabled, setDisabled] = useState(true);
  const dispatch = useAppDispatch();

  // console.log(
  //   '10th byte is: ',
  //   useAppSelector((state) => byteSelector(state, 10))
  // );

  const openFile = async (defaultFile?: string) => {
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
      .openROM(options, defaultFile)
      .then(
        // eslint-disable-next-line promise/always-return
        (romState) => {
          // eslint-disable-next-line promise/always-return
          if (romState.rom) setDisabled(false);
          dispatch(setROM(romState));
        }
      )
      .catch((e) => console.log('No File Selected'));
  };

  const openEditor = async (editorURL: string) => {
    await window.electron.ipcRenderer.openEditor(editorURL);
    //  navigate('/spell');
  };

  // useEffect(() => {
  //   if (useDefaultROM) {
  //     openFile(defaultROM);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const buttonProps: IconButtonProps[] = [
    {
      name: 'Open',
      icon: openIcon,
      onClick: useDefaultROM ? () => openFile(defaultROM) : () => openFile(),
      disabled: false,
    },
    { name: 'Save', icon: saveIcon, onClick: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Character', icon: characterIcon, onClick: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Job', icon: jobIcon, onClick: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Item', icon: itemIcon, onClick: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Spell', icon: spellIcon, onClick: () => openEditor('spell'), disabled: isDisabled },
    { name: 'Shop', icon: shopIcon, onClick: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Enemy', icon: enemyIcon, onClick: () => console.log('clicked'), disabled: isDisabled },
    { name: 'Text', icon: textIcon, onClick: () => openEditor('text'), disabled: isDisabled },
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
