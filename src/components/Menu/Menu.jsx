import "./Menu.css";
import {
  Container,
  Nav,
  Navbar,
  Button,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Menu() {
  const usuarioLogado = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Trazendo o contexto do tema
  const [darkMode, setDarkMode] = useState(true);
  let email = usuarioLogado.email;
  const [nome, setNome ] = useState("")

  function onLogout() {
    logout().then(() => {
      navigate("/login");
    });
  }

  const renderTooltipSair = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Sair
    </Tooltip>
  );

  const renderTooltipTema = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Alterar tema
    </Tooltip>
  );

  const renderTooltipHome = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Ir para Home
    </Tooltip>
  );
  useEffect(() => {
    let index = email.split("@")
    setNome(index[0])
    
  },[])
    
  return (
    <Navbar
      bg={theme === "dark" ? "dark" : "danger"}
      variant="dark"
      expand="lg"
    >
      <Container fluid>
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipHome}
        >
          <Navbar.Brand>
            <Link to="/">
              <img src={logoIcon} width="32" alt="Logo" />
            </Link>
          </Navbar.Brand>
        </OverlayTrigger>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
            <Nav.Link as={Link} to="/autores">
              Autores
            </Nav.Link>
            {usuarioLogado.providerData[0].providerId === "password" && (
              <Nav.Link as={Link} to={`/perfil/${usuarioLogado.uid}`}>
                Perfil
              </Nav.Link>
            )}
            {usuarioLogado.displayName !== null ?
            (
              <Nav.Link>
                <span>{usuarioLogado.displayName}</span>
              </Nav.Link>
            )
            :
            (
            <Nav.Link>
                <span>{nome}</span>
            </Nav.Link>
            )}
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltipTema}
            >
              <Nav.Link>
                <ThemeContext.Consumer>
                  {({ changeTheme }) => (
                    <i
                      onClick={() => {
                        setDarkMode(!darkMode);
                        changeTheme(darkMode ? themes.light : themes.dark);
                      }}
                      className={
                        theme === "dark"
                          ? "bi bi-brightness-high"
                          : "bi bi-moon"
                      }
                    ></i>
                  )}
                </ThemeContext.Consumer>
              </Nav.Link>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltipSair}
            >
              <Nav.Link onClick={onLogout}>
                <i className="bi bi-box-arrow-right"></i>
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
