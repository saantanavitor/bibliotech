import { useState, useEffect, useContext } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getLivro } from "../../firebase/livros";
import { ThemeContext } from "../../contexts/ThemeContext";
import heartIcon from "../../assets/icons/heart.svg";
import calendarIcon from "../../assets/icons/calendar-event.svg";
import bookIcon from "../../assets/icons/book.svg";
import buildingIcon from "../../assets/icons/buildings.svg";
import tagIcon from "../../assets/icons/tag.svg";
import "./DetalhesLivro.css";

export function DetalhesLivro() {
    const [livro, setLivro] = useState(null);
    const { id } = useParams();
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        getLivro(id).then((livro) =>{
            setLivro(livro)
        })
    },[id])

    if (!livro) {
        return null;
    }

    return(
        <div className="livros page d-flex mt-4 mb-4" data-theme={theme}> 
            <Card className="card-livro" style={{ width: '22rem', height:'32rem' }}>
                    <Card.Img variant="top" src={livro.urlCapa} alt={livro.titulo} />
                <Card.Body className="card-conteudo">
                    <Card.Text>
                        <p>Autor: {livro.autor}</p>
                        <p>ISBN: {livro.isbn}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Container>
                <h2>{livro.titulo}</h2>
                <div className="d-flex align-items-center">
                    <img src={tagIcon} width="15" alt="Tag icon" />
                    <p className="mb-1 ms-1">Categoria: {livro.categoria}</p>
                    </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur enim est laudantium 
                    nihil debitis! Adipisci saepe exercitationem in iste iure a natus rerum aliquam beatae, 
                    fugit enim! Repellat, perspiciatis deleniti. Lorem ipsum dolor sit, amet consectetur 
                    adipisicing elit. Corporis illo aliquam quas quisquam rerum at, quia recusandae magnam 
                    esse voluptatibus nulla impedit fugit maiores distinctio inventore temporibus cupiditate 
                    nisi adipisci!</p>
                <Button variant="outline-secondary" size="sm" style={{ fontSize: '10px'}}  >
                <img className="me-1" src={heartIcon} width="11" alt="Heart icon" />
                Adicionar aos Favoritos</Button>
                <Container className="mt-4" >
                <Row>
                    <Col> <img src={calendarIcon} width="19" alt="Calendar icon" />
                    <p>Data de publicação:</p>
                    </Col>
                    <Col> <img src={bookIcon} width="20" alt="Book icon" />
                    <p>Nº de páginas: </p>
                    </Col>
                    <Col> <img src={buildingIcon} width="20" alt="Book icon" />
                    <p>Editora: </p>
                    </Col>
                </Row>
            </Container>
            </Container>
        </div>    
    )
}