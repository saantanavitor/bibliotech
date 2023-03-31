import {useContext} from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

export function Home() {
  const {theme} = useContext(ThemeContext);
  return (
  <div className="page" data-theme={theme}>
    <h1 className="pageTitle"> HOME </h1>
  </div>
  )
};
