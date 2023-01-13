import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    openROM: async (params: object) => {
      const result = await ipcRenderer.invoke('openROM', params);
      console.log('preloader return: ', result);
      return result;
    },
  },
});
