import { useEffect, useState, useContext } from "react";
import {
  Button,
  Container,
  Table,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import "./Autores.css";
import { deleteAutor, getAutores } from "../../firebase/autores";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Autores() {
  const [autores, setAutores] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    getAutores().then((resultados) => {
      setAutores(resultados);
    });
  }

  function onDeleteAutor(id, nome) {
    const deletar = window.confirm(
      `Tem certeza que deseja excluir o autor ${nome}?`
    );
    if (deletar) {
      deleteAutor(id).then(() => {
        toast.success(`${nome} apagado com sucesso!`, {
          duration: 2000,
          position: "bottom-right",
        });
        initializeTable();
      });
    }
  }

  const renderTooltipAdd = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Clique para adicionar um autor
    </Tooltip>
  );

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Editar informações
    </Tooltip>
  );

  const renderTooltipExcl = (props) => (
    <Tooltip id="button-tooltip" {...props}>
     Excluir autor
    </Tooltip>
  );

  return (
    <div className="autores page pageTitle" data-theme={theme}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1>Autores</h1>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltipAdd}
          >
            <Button as={Link} to="/autores/adicionar" variant="success">
              Adicionar Autor
            </Button>
          </OverlayTrigger>
        </div>
        <hr />
        {autores === null ? (
          <Loader />
        ) : (
          <Table bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {autores.map((autor) => {
                return (
                  <tr key={autor.id}>
                    <td>{autor.nome}</td>
                    <td>{autor.email}</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipEdit}
                      >
                        <Button
                          as={Link}
                          to={`/autores/editar/${autor.id}`}
                          variant="warning"
                          size="sm"
                          className="me-2"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </Button>
                      </OverlayTrigger>


                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipExcl}
                      >
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => onDeleteAutor(autor.id, autor.nome)}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}
