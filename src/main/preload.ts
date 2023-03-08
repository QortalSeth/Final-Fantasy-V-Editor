import { contextBridge, ipcMain, ipcRenderer } from 'electron';
import { TextToJSON } from 'src/models/text/ReadText';
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
    saveJSONfile: async (data: string): Promise<void> => {
      await ipcRenderer.invoke('saveJSONfile', data);
    },

    openJSONfiles: async (directory: string): Promise<TextToJSON[][]> => {
      const result = await ipcRenderer.invoke('readJSONfiles', directory);
      // console.log('preload JSON results', result);
      return result;
    },
  },
});
