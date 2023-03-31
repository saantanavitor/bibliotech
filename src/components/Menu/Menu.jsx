import "./Menu.css";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import { useState, useContext } from 'react';

export function Menu() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);           // Trazendo o contexto do tema
  const [darkMode, setDarkMode] = useState(true);       // useState para alteração do light para dark mode
  const [color, setColor] = useState(true); // useState para alteração do bg
  const changeColor = () => {
    if (darkMode = true){
      setColor(true);
    }
    else {
      setColor(false);
    }
  }


  function onLogout() {
    logout().then(() => {
      navigate("/login");
    });
  }

  return (
    
    <Navbar bg={darkMode ? "dark": "success"} variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img src={logoIcon} width="32" alt="Logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/livros">
              Livros
            </Nav.Link>
            <Nav.Link as={Link} to="/emprestimos">
              Emprestimos
            </Nav.Link>
            <Nav.Link>
            <ThemeContext.Consumer>
              {({ changeTheme }) => (
                <i onClick={() => {
                  setDarkMode(!darkMode);
                  changeTheme(darkMode ? themes.light : themes.dark);
                }} className={ darkMode ? "bi bi-brightness-high" : "bi bi-moon"}></i>
              )}
            </ThemeContext.Consumer>
          </Nav.Link>
            <Nav.Link onClick={onLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
