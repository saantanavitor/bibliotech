import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import "./Autores.css";
import { deleteAutor, getAutores } from "../../firebase/autores";

export function Autores() {

    const [autores, setAutores] = useState(null);

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        getAutores().then(resultados => {
            setAutores(resultados)
        })
    }

    function onDeleteAutor(id, nome) {
        const deletar = window.confirm(`Tem certeza que deseja excluir o autor ${nome}?`);
        if(deletar) {
            deleteAutor(id).then(() => {
                toast.success(`${nome} apagado com sucesso!`, {duration: 2000, position: "bottom-right"});
                initializeTable();
            })
        }
    }

    return (
        <div className="autores">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Autores</h1>
                    <Button as={Link} to="/autores/adicionar" variant="success">
                        Adicionar Autor
                    </Button>
                </div>
                <hr />
                {autores === null ?
                    <Loader />
                    : 
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {autores.map(autor => {
                                return (
                                    <tr key={autor.id}>
                                        <td>{autor.nome}</td>
                                        <td>{autor.email}</td>                                       
                                        <td>
                                            <Button
                                                as={Link}
                                                to={`/autores/editar/${autor.id}`}
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                            >
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button size="sm" variant="danger" onClick={() => onDeleteAutor(autor.id, autor.nome)}>
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
