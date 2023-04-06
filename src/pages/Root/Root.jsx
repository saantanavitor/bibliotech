import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

// Layout principal do App com Navbar Fixa
// As páginas com Navbar fixa: home, livros, empréstimos, etc
export function Root() {
  const usuarioLogado = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  
  if (usuarioLogado === null) {
    // se está deslogado
    // redireciona para a página de login
    return <Navigate to="/login" />;
  }

  return (
    <div id="bodyRoot" className={theme ? "bg-dark text-light page" : "bg-light text-dark page"}>
      <header>
        <Menu />
      </header>
      <main>
        <Outlet />
      </main>
      
    </div>
  );
}
