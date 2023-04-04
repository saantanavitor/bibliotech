import { useContext } from "react";
import { Button, Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import loginImg from "../../assets/images/login.png";
import { AuthContext } from "../../contexts/AuthContext";
import { recuperarSenha } from "../../firebase/auth";

export function EsqueciSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    alert("passei aqui");
    const { email } = data;
    if(email !== null && email !== ""){
      recuperarSenha(email).then(() => {
        alert("passei aqui");
        toast.success(`Email de recuperação encaminhado para ${email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate(-1);
      }).catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {position:"bottom-right", duration:2500});
      });

    }
    
  }

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  const renderTooltipEntrar = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Entrar
    </Tooltip>
  );





  return (
    <Container fluid className="my-5">
      <p className="text-center">
        <img src={loginImg} width="256" alt="Logo" />
      </p>
      <h4>Esqueçeu sua senha??</h4>
      <p className="text-muted">
        Já tem conta? <Link to="/login">Login</Link>
      </p>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Seu email"
            className={errors.email ? "is-invalid" : ""}
            {...register("email", { required: "Email é obrigatório" })}
          />
          <Form.Text className="invalid-feedback">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipEntrar}
                      >
        <Button type="submit" variant="success">
          Entrar
        </Button>
        </OverlayTrigger>
      </Form>
    </Container>
  );
}
