import { Accordion, Carousel, Container } from "react-bootstrap";
import carouselItem1 from "../../assets/images/Bibliotech-Carousel-1.jpg"
import carouselItem2 from "../../assets/images/Bibliotech-Carousel-2.jpg"
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";




export function Ajuda(){



    return(
        <Container>
            <p className="text-start">
                  <img src={logo} width="200" alt="Logo do app" />
                </p>
            <h1 style={{textAlign: "center", fontSize:"45px"}}>Ajuda</h1>
            {/* Inicio do Accordion */}
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>O que é a Bibliotech?</Accordion.Header>
                    <Accordion.Body>
                    Bibliotech é uma biblioteca constituída por documentos primários, que são digitalizados quer sob a forma material, quer em linha através da Internet, permitindo o acesso à distância. Este conceito inclui também a ideia de organização composta por serviços e recursos, cujo objetivo é selecionar, organizar e distribuir a informação, conservando a integridade dos documentos digitalizados.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Como a Bibliotech consegue os livros?</Accordion.Header>
                    <Accordion.Body>
                    Todo o acervo de livros fornecido pela Bibliotech é fornecido através de doações.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Consigo ler meu livro favorito pelo Bibliotech?</Accordion.Header>
                    <Accordion.Body>
                    Sim, desde que ele esteja disponível no nosso acervo, acesse a Bibliotech:<Link to="/login">Clicando Aqui!</Link>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* Fim do Accordion */}

            {/* Inicio do Carousel */}
            <Carousel className="my-5" variant="dark" fade>
                <Carousel.Item interval={10000}>
                    <img
                    className="d-block w-100"
                    src={carouselItem1}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={30000}>
                    <img
                    className="d-block w-100"
                    src={carouselItem2}
                    alt="Second slide"
                    />
                </Carousel.Item>
                {/* <Carousel.Item interval={3000}>
                    <img
                    className="d-block w-100"
                    src="holder.js/800x400?text=Third slide&bg=e5e5e5"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <h5>Third slide label</h5>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item> */}
            </Carousel>
        </Container>
    );
}