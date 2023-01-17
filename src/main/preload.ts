import { contextBridge, ipcMain, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    openROM: async (params: object, defaultROM: string) => {
      const result = await ipcRenderer.invoke('openROM', params, defaultROM);
      console.log('preloader return: ', result);
      return result;
    },
    openEditor: async (url: string) => {
      await ipcRenderer.invoke('openEditor', url);
    },
  },
});
