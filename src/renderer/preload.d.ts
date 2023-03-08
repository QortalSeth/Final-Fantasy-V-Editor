import { TextToJSON } from 'src/models/text/ReadText';
import { ROMState } from '../redux/slices/ROM-Slice';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        openROM(defaultROM?: string): Promise<ROMState>;
        openEditor(url: string): Promise<void>;
        openJSONfiles(directory: string): Promise<TextToJSON[][]>;
        saveJSONfile(data: string): Promise<void>;
      };
    };
  }
}
