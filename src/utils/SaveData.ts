export const saveJSONoptions = {
  title: 'Save to JSON File',
  defaultPath: './assets/TextLocations/RPGe',
  filters: [
    { name: 'JSON', extensions: ['json'] },
    { name: 'All Files', extensions: ['*'] },
  ],
  properties: ['openFile', 'createDirectory'],
};
