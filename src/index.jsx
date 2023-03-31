import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import ThemeContextWrapper from "./contexts/ThemeContextWrapper";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
 
root.render(                                      // Envolvendo todo o app pelo contexto do dark mode, pegando o valor e função de theme, em ThemeContextWrapper.js
    <ThemeContextWrapper> 
        <App />                                   
    </ThemeContextWrapper>
);
