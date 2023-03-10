import React, { useState } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { setDefaultROM, setROM } from 'src/redux/slices/ROM-Slice';

import openIcon from 'assets/Open Icon.png';
import saveIcon from 'assets/Save Icon.png';
import characterIcon from 'assets/Bartz Freelancer.png';
import jobIcon from 'assets/Lenna Mime Mod.png';
import itemIcon from 'assets/Excalibur.png';
import spellIcon from 'assets/Comet.png';
import shopIcon from 'assets/Female NPC.png';
import enemyIcon from 'assets/Gilgamesh.png';
import textIcon from 'assets/Text.png';

import { initializeModels } from 'src/models/Utils/ModelsManager';
import { openFileOptions } from 'src/utils/DialogOptions';
import IconButton, { IconButtonProps } from '../../components/Buttons/IconButton';

export const EditorChooser = () => {
  const defaultROM = 'assets/Final Fantasy V translated.smc';
  const defaultUneditedROM = 'assets/Final Fantasy V untranslated_noheader.smc';
  const useDefaultROM = true;
  const readDefaultUneditedROM = true;
  const [isDisabled, setDisabled] = useState(true);
  const dispatch = useAppDispatch();

  const openFile = async (defaultFile?: string) => {
    console.log('in openFile clickEvent');
    await window.electron.ipcRenderer
      .openROM(defaultFile)
      .then(
        // eslint-disable-next-line promise/always-return
        (romState) => {
          // eslint-disable-next-line promise/always-return
          if (romState.rom) setDisabled(false);
          dispatch(setROM(romState));
        }
      )
      .catch((e) => console.log('No File Selected'));

    if (readDefaultUneditedROM)
      // eslint-disable-next-line promise/always-return
      await window.electron.ipcRenderer.openROM(defaultUneditedROM).then((romState) => {
        dispatch(setDefaultROM(romState));
      });
    initializeModels(); // after ROMs loaded, load models with ROM and DefaultROM data values
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