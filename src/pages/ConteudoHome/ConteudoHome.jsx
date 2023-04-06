import { useEffect } from "react";
import { Card, Table, Carousel } from "react-bootstrap";
import { getLivros } from "../../firebase/livros";
import { useState } from "react";
import { getEmprestimos } from "../../firebase/emprestimos";
import TimeAgo from 'timeago-react';
import carouselItem1 from "../../assets/images/Bibliotech-Carousel-1.jpg";
import carouselItem2 from "../../assets/images/Bibliotech-Carousel-2.jpg";

import listCheck from "../../assets/icons/list-check.svg";
import unchecked from "../../assets/icons/unchecked.svg";
import check from "../../assets/icons/check.svg";


import "./conteudo-home.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";


export function ConteudosHome() {
  const [livros, setLivros] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    getLivros().then((resultado) => {
      setLivros(resultado);
    });
    getEmprestimos().then((resultado) => {
      setEmprestimos(resultado);
    });
  },[]);

  const contarEmprestimosEntregues = () => {
    let emprestimosEntregues = [];
    emprestimosEntregues = emprestimos.filter((i) => i.status === "Entregue");
    return emprestimosEntregues.length;
  };

  const contarEmprestimosPendentes = () => {
    let emprestimosPendentes = [];
    emprestimosPendentes = emprestimos.filter((i) => i.status === "Pendente");
    return emprestimosPendentes.length;
  };

  
  


  return (
    <div className={theme ? "bg-dark text-light" : "bg-light text-dark"}>
    <div className="page info-home pt-3">
      <h1>Visão Geral</h1> 

      <div
        style={{ width: "19rem" }}
        className="info-home-item1 border-primary"
      >
        <Card>
          <Card.Body className="text-center mt-4 mb-4">
            <Card.Img variant="top" src={listCheck} width="200" height="150" />
            <br /> <br />
            <Card.Title>Total de Empréstimos</Card.Title>
            <Card.Text>
              <p>{emprestimos.length}</p>
              <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div style={{ width: "19rem" }} className="info-home-item2 border-danger">
        <Card>
          <Card.Body className="text-center mt-4 mb-4">
            <Card.Img variant="top" src={unchecked} width="200" height="150" />
            <br />
            <br />
            <Card.Title>Empréstimos Pendentes</Card.Title>
            <Card.Text>
              <p>{contarEmprestimosPendentes()}</p>
              <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div
        style={{ width: "19rem" }}
        className="info-home-item3 border-success"
      >
        <Card>
          <Card.Body className="text-center mt-4 mb-4">
            <Card.Img variant="top" src={check} width="200" height="150" />
            <br />
            <br />
            <Card.Title>Empréstimos Entregues</Card.Title>
            <Card.Text>
              <p>{contarEmprestimosEntregues()}</p>
              <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div className="info-home-item-table">
        <Table bordered size="xl">
          <thead>
            <tr>
              <th width="313px">Leitor</th>
              <th width="313px">Livro</th>
              <th width="313px">
                <i class="bi bi-clock"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            
          {emprestimos.slice(0, 5).map((emprestimo) => {
    const dataEmprestimo = emprestimo.dataEmprestimo.toDate();
    return (
      <tr key={emprestimo.id}> 
        <td>{emprestimo.leitor}</td>
        <td>{emprestimo.livro.titulo}</td>
        <td><TimeAgo datetime={dataEmprestimo} locale='pt_BR'></TimeAgo> </td>
      </tr>
    );
  })}
          </tbody>
        </Table>
      </div>
      <div style={{ width: "66.5rem" }} className="info-home-item-carousel">
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

        </Carousel>
      </div>
    </div>
    </div>
  );
}
