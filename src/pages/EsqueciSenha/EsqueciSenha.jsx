import { useContext } from "react";
import { Button, Container, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
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
    <section id="pagina">
      <div data-theme="white-content" class="container body-content py-5 h-100">
        <div class="row d-flex justify-content-end align-items-center h-100 ">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5 flex-column ">
            <div class="card shadow-2-strong raduius-2 h-50">
              <div class="card-body p-5 text-center">
    <Container className="py-5">
    <p className="text-center">
                  <img src={logo} width="350" alt="Logo do app" />
                </p>
                <h4>Faça parte da nossa plataforma</h4>
                <p className="text-muted">
                  Já possui conta? <Link to="/login" className="link">Entre</Link>                  
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
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
