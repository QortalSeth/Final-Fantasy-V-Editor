import { Routes, Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../redux/store';
import './App.css';
import { MainMenu } from '../components/pages/MainMenu';
import SpellEditor from '../components/pages/SpellEditor';

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route index element={<MainMenu />} />
          <Route path='spells' element={<SpellEditor />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}
