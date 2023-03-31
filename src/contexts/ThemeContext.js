import { createContext } from "react";                         // Criando contexto 

export const themes = {        // Componente para direcionar quais cores serão utilizadas
  dark: "dark",
  light: "white-content",
};

export const ThemeContext = createContext({      // Criando contexto para puxar de qualquer lugar da aplicação
    theme: themes.dark,
  changeTheme: () => {},
});