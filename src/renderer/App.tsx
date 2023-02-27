import {
  MemoryRouter as Router,
  Routes,
  Route,
  HashRouter,
  createHashRouter,
  createRoutesFromElements,
  BrowserRouter,
} from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { store } from '../redux/store';
import './App.css';
import { MainMenu } from '../components/pages/MainPage/MainMenu';
import SpellEditor from '../components/pages/SpellEditor';
import TextEditor from '../components/pages/TextEditor/TextEditor';

// const router = createHashRouter(
//   createRoutesFromElements(
//     <Route path='/'>
//       <Route index element={<MainMenu />} />
//       <Route path='spells' element={<SpellEditor />} />
//     </Route>
//   )
// );

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainMenu />} />
          <Route path='/spell' element={<SpellEditor />} />
          <Route path='/text' element={<TextEditor />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
