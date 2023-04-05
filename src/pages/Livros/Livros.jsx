import { useEffect, useState, useContext } from "react";
import { Button, Container, Table, Tooltip, OverlayTrigger, Form } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { updateLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";
import { ThemeContext, themes } from "../../contexts/ThemeContext";

export function Livros() {
  const [livros, setLivros] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [filtrarTitulo, setFiltrarTitulo] = useState("");
  const [filtrarIsbn, setFiltrarIsbn] = useState("");

  useEffect(() => {
    initializeTable();
  }, []);

  function initializeTable() {
    getLivros().then((resultados) => {
      setLivros(resultados);
    });
  }

  function softDelete(id, titulo) {
    // Função alterada de onDeleteLivro para softDelete
    const desativar = window.confirm(
      `Tem certeza que deseja excluir o livro ${titulo}?`
    ); // variável alterada de deletar para desativar
    if (desativar) {
      updateLivro(id, { active: false }).then(() => {
        // Trocando deleteLivro por updateLivro
        toast.success(`${titulo} apagado com sucesso!`, {
          duration: 2000,
          position: "bottom-right",
        });
        initializeTable();
      });
    }
  }

  const renderTooltipAdd = (props) => (
    <Tooltip id="button-tooltip" {...props}>
    Adicionar novo livro
    </Tooltip>
  );

  const renderTooltipDelete = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Excluir livro
    </Tooltip>
  );

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Editar informações do livro
    </Tooltip>
  );

  return (
    <div className="livros page " data-theme={theme}>
      <Container>
        <div className="d-flex justify-content-between align-items-center ">
          <h1 className="pageTitle">Livros</h1>
          <div className="bg-light border w-25 rounded-3 input-group mb-3 mt-3">
            <Form.Control           
                type="text"
                placeholder="Pesquise pelo título do livro..."
                value={filtrarTitulo}
                onChange={(e) => setFiltrarTitulo(e.target.value)}                  
            />
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
            </div>          
          </div>
          <div className="bg-light border w-25 rounded-3 input-group mb-3 mt-3">
            <Form.Control 
                className="bg-light border w-25 p-2 rounded-3" 
                type="text"
                placeholder="Pesquise pelo ISBN do livro..."
                value={filtrarIsbn}
                onChange={(e) => setFiltrarIsbn(e.target.value)}                  
            />
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
            </div>          
          </div>          
          <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltipAdd}
          >          
          <Button as={Link} to="/livros/adicionar" variant="success">
            Adicionar novo Livro
          </Button>
          </OverlayTrigger>
        </div>
        <hr className="divider" />
        {livros === null ? (
          <Loader />
        ) : (
          <Table bordered>
            <thead>
              <tr class="align-top text-center">
                <th>Título</th>
                <th>Autor</th>
                <th>Categoria</th>
                <th>ISBN</th>
                <th>Imagem</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {livros
              .filter((livro) => livro.titulo.toLowerCase().includes(filtrarTitulo.toLowerCase()))
              .filter((livro) => livro.isbn.includes(filtrarIsbn))
              .map((livro) => {
                return (
                  <tr key={livro.id}>
                    <td>
                        <Link className="title" to={`/livros/detalhes/${livro.id}`}>
                          {livro.titulo}</Link>
                    </td>
                    <td>{livro.autor}</td>
                    <td>{livro.categoria}</td>
                    <td>{livro.isbn}</td>
                    <td>
                      <img src={livro.urlCapa} alt={livro.titulo} />
                    </td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipEdit}
                      >
                        <Button
                          as={Link}
                          to={`/livros/editar/${livro.id}`}
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
                        overlay={renderTooltipDelete}
                      >
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => softDelete(livro.id, livro.titulo)}
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
