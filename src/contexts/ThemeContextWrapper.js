import React, { useState, useEffect } from 'react';                  
import { ThemeContext, themes } from './ThemeContext';

export default function ThemeContextWrapper(props) {         // estabelece um useState para a mudança de tema
  const [theme, setTheme] = useState(themes.dark);

  function changeTheme(theme) {
    setTheme(theme);
  }

  return (                                                                               // Pega o app que está renderizando no index.js
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>   
      {props.children}
    </ThemeContext.Provider>              // Passando valores para o contexto
  );
}