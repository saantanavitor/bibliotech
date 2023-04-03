import { useEffect, useState, useContext } from "react";
import {
  Badge,
  Button,
  Container,
  Table,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEmprestimos } from "../../firebase/emprestimos";
import { Loader } from "../../components/Loader/Loader";
import { ThemeContext } from "../../contexts/ThemeContext";

export function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    getEmprestimos().then((busca) => {
      setEmprestimos(busca);
    });
  }, []);

  const renderTooltipAdd = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Adicionar novo empréstimo
    </Tooltip>
  );

  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Editar informações do empréstimo
    </Tooltip>
  );

  return (
    <div className="emprestimos page" data-theme={theme}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="pageTitle">Emprestimos</h1>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltipAdd}
          >
            <Button as={Link} to="/emprestimos/adicionar" variant="success">
              Adicionar emprestimo
            </Button>
          </OverlayTrigger>
        </div>
        <hr className="divider" />
        {emprestimos === null ? (
          <Loader />
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>Leitor</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Livro</th>
                <th>Status</th>
                <th>Data de Empréstimo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map((emprestimo) => {
                const dataEmprestimo = emprestimo.dataEmprestimo
                  .toDate()
                  .toLocaleDateString("pt-br");
                return (
                  <tr key={emprestimo.id}>
                    <td>{emprestimo.leitor}</td>
                    <td>{emprestimo.email}</td>
                    <td>{emprestimo.telefone}</td>
                    <td>{emprestimo.livro.titulo}</td>
                    <td>
                      <Badge
                        bg={
                          emprestimo.status === "Pendente"
                            ? "warning"
                            : "success"
                        }
                      >
                        {emprestimo.status}
                      </Badge>
                    </td>
                    <td>{dataEmprestimo}</td>
                    <td>
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipEdit}
                      >
                        <Button
                          as={Link}
                          to={`/emprestimos/editar/${emprestimo.id}`}
                          variant="warning"
                          size="sm"
                        >
                          <i className="bi bi-pencil-fill"></i>
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
