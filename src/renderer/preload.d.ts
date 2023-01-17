import { ROMState } from '../redux/slices/ROM-Slice';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        openROM(params: object, defaultROM?: string): Promise<ROMState>;
        openEditor(url: string): Promise<void>;
      };
      // ipcMain: {
      //   routeEditorWindow(url: string): Promise<void>;
      // };
    };
  }
}
