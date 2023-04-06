import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Outlet } from "react-router-dom";
// import { ConteudosHome } from "../ConteudoHome/ConteudoHome";

export function Home() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme ? "bg-dark text-light" : "bg-light text-dark"}>
    <div className="page" data-theme={theme}>
      <Outlet/>
      
    </div>
    </div>
  );
}
