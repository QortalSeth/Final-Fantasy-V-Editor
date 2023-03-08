import { fullNamesDir } from '../models/Utils/ModelsManager';

export const openFileOptions: Electron.OpenDialogSyncOptions = {
  title: 'Open a ROM',
  defaultPath: '.',
  filters: [
    { name: 'Roms (.smc, .sfc)', extensions: ['smc', 'sfc'] },
    { name: 'All Files', extensions: ['*'] },
  ],
  properties: ['openFile', 'createDirectory'],
};

export const openJSONdirOptions: Electron.OpenDialogSyncOptions = {
  title: 'Open JSON Directory',
  defaultPath: fullNamesDir,
  filters: [{ name: 'JSON', extensions: ['json'] }],
  properties: ['openDirectory', 'createDirectory'],
};

export const saveJSONoptions: Electron.SaveDialogSyncOptions = {
  title: 'Save to JSON File',
  defaultPath: fullNamesDir,
  filters: [
    { name: 'JSON', extensions: ['json'] },
    { name: 'All Files', extensions: ['*'] },
  ],
  properties: ['createDirectory'],
};
