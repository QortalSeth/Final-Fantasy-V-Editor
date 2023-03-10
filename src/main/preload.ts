import { contextBridge, ipcMain, ipcRenderer } from 'electron';
import { TextData } from 'src/models/text/ReadText';
import { ROMState } from '../redux/slices/ROM-Slice';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    openROM: async (defaultROM?: string) => {
      const result = await ipcRenderer.invoke('openROM', defaultROM);
      // console.log('preloader return: ', result);
      return result;
    },
    openEditor: async (url: string) => {
      await ipcRenderer.invoke('openEditor', url);
    },
    saveJSONfile: async (json: string, fileName?: string) => {
      await ipcRenderer.invoke('saveJSONfile', json, fileName);
    },

    openJSONfiles: async (directory: string): Promise<object[]> => {
      const result = await ipcRenderer.invoke('readJSONfiles', directory);
      // console.log('preload JSON results', result);
      return result;
    },
  },
});
