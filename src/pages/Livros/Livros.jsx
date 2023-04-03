import { useEffect, useState, useContext } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";
import { ThemeContext, themes } from '../../contexts/ThemeContext';
import { ThemeContextWrapper } from '../../contexts/ThemeContextWrapper';


export function Livros() {

    const [livros, setLivros] = useState(null);
    const {theme} = useContext(ThemeContext);
    const [color, setColor] = useState(false);
    function changeColor () {
        if (color === true){
          setColor(false);
        }
        else {
          setColor(true);
        }
      }

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        getLivros().then(resultados => {
            setLivros(resultados)
        })
    }

    function onDeleteLivro(id, titulo) {
        const deletar = window.confirm(`Tem certeza que deseja excluir o livro ${titulo}?`);
        if(deletar) {
            deleteLivro(id).then(() => {
                toast.success(`${titulo} apagado com sucesso!`, {duration: 2000, position: "bottom-right"});
                initializeTable();
            })
        }
    }

    return (
        <div className="livros page" data-theme={theme}>
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="pageTitle">Livros</h1>
                    <Button as={Link} to="/livros/adicionar" variant="success">
                        Adicionar Livro
                    </Button>
                </div>
                <hr className="divider"/>
                {livros === null ?
                    <Loader />
                    : 
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Categoria</th>
                                <th>ISBN</th>
                                <th>Imagem</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map(livro => {
                                return (
                                    <tr key={livro.id}>
                                        <td>
                                            <Link to={`/livros/detalhes/${livro.id}`}>{livro.titulo}</Link> </td>
                                        <td>{livro.autor}</td>
                                        <td>{livro.categoria}</td>
                                        <td>{livro.isbn}</td>
                                        <td>
                                            <img src={livro.urlCapa} alt={livro.titulo} />
                                        </td>
                                        <td>
                                            <Button
                                                as={Link}
                                                to={`/livros/editar/${livro.id}`}
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button size="sm" variant="danger" onClick={() => onDeleteLivro(livro.id, livro.titulo)}>
                                                <i className="bi bi-trash3-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                }
            </Container>
        </div>
    )
}