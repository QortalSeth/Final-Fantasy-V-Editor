import { ROMState } from '../redux/slices/ROM-Slice';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        openROM(dialogOptions: object, defaultROM?: string): Promise<ROMState>;
        openEditor(url: string): Promise<void>;
        saveJSONfile(dialogOptions: object, data: string): Promise<void>;
      };
    };
  }
}
