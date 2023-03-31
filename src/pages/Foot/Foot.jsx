import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";

export function Foot() {
  const usuarioLogado = useContext(AuthContext);

  if (usuarioLogado !== null) {    
    return <Navigate to="/" />;
  }

  return (
    <>        
        <main>
            <Outlet />
        </main>
        <footer>
            <Footer />
        </footer>
    </>
  );
}