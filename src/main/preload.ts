import { contextBridge, ipcMain, ipcRenderer } from 'electron';
import { ROMState } from '../redux/slices/ROM-Slice';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    openROM: async (dialogOptions: object, defaultROM: string) => {
      const result = await ipcRenderer.invoke('openROM', dialogOptions, defaultROM);
      console.log('preloader return: ', result);
      return result;
    },
    openEditor: async (url: string) => {
      await ipcRenderer.invoke('openEditor', url);
    },
    saveJSONfile: async (dialogOptions: object, data: string): Promise<void> => {
      await ipcRenderer.invoke('saveJSONfile', dialogOptions, data);
    },
  },
});
