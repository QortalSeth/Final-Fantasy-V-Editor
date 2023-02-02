/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import fs from 'fs';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import { createFileRoute } from 'electron-router-dom';
import * as remoteMain from '@electron/remote/main';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { getHeader, ROMState } from '../redux/slices/ROM-Slice';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
app.commandLine.appendSwitch('remote-debugging-port', '9229');

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'assets') : path.join(__dirname, '../../assets');

  // eslint-disable-next-line import/prefer-default-export
  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1300,
    height: 600,
    minWidth: 900,
    autoHideMenuBar: true,
    // resizable: false,
    // useContentSize: true, // (auto width/height)
    icon: getAssetPath('FF5 Icon (Square).png'),
    webPreferences: {
      // nodeIntegration: true,
      contextIsolation: true,
      devTools: true, // (removes inspect devtools addon window if false)
      preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  remoteMain.enable(mainWindow.webContents);

  // mainWindow.loadURL('http://localhost:1212');
  // mainWindow.loadURL(resolveHtmlPath('index.html'));
  mainWindow.loadURL(resolveHtmlPath(''));
  // mainWindow.loadFile(...createFileRoute(path.join(__dirname, '../renderer/index.html'), 'main'));
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    console.log('main window closed');
    app.exit(0);
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    ipcMain.handle('openROM', async (event, params, defaultROM?: string) => {
      console.log('default ROM: ', defaultROM);
      let file: string;
      if (!defaultROM) {
        const fileNames = dialog.showOpenDialogSync(params);

        if (fileNames) {
          [file] = fileNames;
          console.log('Selected File is: ', file.toString());
        } else return undefined;
      } else file = defaultROM;

      const fileData = fs.readFileSync(file);
      console.log('buffer: ', fileData);
      mainWindow?.webContents.openDevTools();
      return { rom: Array.from(fileData), data: { path: file, header: getHeader(fileData.length) } } as ROMState;
    });

    ipcMain.handle('openEditor', async (event, url) => {
      if (mainWindow) {
        mainWindow.hide();

        const editorWindow = new BrowserWindow({
          show: true,
          parent: mainWindow,
          width: 1600,
          height: 800,
          minWidth: 900,
          autoHideMenuBar: true,
          // resizable: false,
          // useContentSize: true, // (auto width/height)
          // icon: getAssetPath('FF5 Icon (Square).png'),
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            devTools: true, // (removes inspect devtools addon window if false)
            preload: app.isPackaged ? path.join(__dirname, 'preload.js') : path.join(__dirname, '../../.erb/dll/preload.js'),
          },
        });
        remoteMain.enable(editorWindow.webContents);

        editorWindow.on('closed', () => {
          mainWindow?.show();
        });
        editorWindow.on('ready-to-show', () => {
          //  editorWindow.webContents.send('routeChange', url);
          editorWindow.show();
        });
        editorWindow.loadURL(resolveHtmlPath('/spell'));

        // await editorWindow.loadURL(`file:/${path.join(__dirname, '../renderer/index.html')}`);
        // await editorWindow.loadURL(`file://${path.resolve(__dirname, '../components/pages/', url)}`);
        await editorWindow.loadURL(`http://localhost:1212/${url}`);
        // await editorWindow.loadURL(`file://${__dirname}../renderer/index.html#/spell')}`);
      }
    });

    // eslint-disable-next-line promise/no-nesting
    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));

    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
