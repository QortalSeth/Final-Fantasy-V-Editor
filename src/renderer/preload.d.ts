import { Channels } from 'main/preload';
import { ROMState } from '../redux/slices/ROM-Slice';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(channel: Channels, func: (...args: unknown[]) => void): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
        openROM(params: object): Promise<ROMState>;
      };
    };
  }
}

export {};
