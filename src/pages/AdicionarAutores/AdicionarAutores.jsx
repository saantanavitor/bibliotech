import {
  Button,
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addAutor } from "../../firebase/autores";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";


export function AdicionarAutores() {

  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    addAutor(data).then(() => {
      toast.success("Autor adicionado com sucesso!", {
        duration: 2000,
        position: "bottom-right",
      });
      navigate("/autores");
    });
  }

  const renderTooltipAdd = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Adicionar
    </Tooltip>
  );

  return (
    <div id="bodyAdicionarAut" className={theme ? "bg-dark text-light" : "bg-light text-dark"}>
      <div className="adicionar-autor page pageTitle" data-theme={theme} >
        <Container>
          <h1>Adicionar autor</h1>
          <hr />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                className={errors.nome && "is-invalid"}
                {...register("nome", {
                  required: "Nome é obrigatório!",
                  maxLength: { value: 255, message: "Limite de 255 caracteres!" },
                })}
              />
              <Form.Text className="text-danger">
                {errors.nome?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                className={errors.email && "is-invalid"}
                {...register("email", {
                  required: "E-mail é obrigatório!",
                  maxLength: { value: 255, message: "Limite de 255 caracteres!" },
                })}
              />
              <Form.Text className="invalid-feedback">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>
            

            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltipAdd}
            >
              <Button type="submit" variant="success">
                Adicionar
              </Button>
              </OverlayTrigger>

          </Form>
        </Container>
      </div>
    </div>
  );
}
