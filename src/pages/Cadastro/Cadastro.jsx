import {
  Button,
  Form,
  OverlayTrigger,
  Tooltip,
  InputGroup,
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { addUsuarios } from "../../firebase/usuarios";
import logo from "../../assets/images/logo.png"

export function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  function revealPassword() {
    setShowPassword(!showPassword);
  }

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    cadastrarEmailSenha(email, senha)
      .then((user) => {
      addUsuarios({id: user.uid, email: user.email, displayName: user.displayName}).then(() => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500
        });
      });
  })
}
  
  const renderTooltipCadastro = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Confirmar Cadastro
    </Tooltip>
  );

  const usuarioLogado = useContext(AuthContext);

  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <section id="pagina">
      <div data-theme="white-content" class="container body-content py-5 h-100">
        <div class="row d-flex justify-content-end align-items-center h-100 ">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5 flex-column ">
            <div class="card shadow-2-strong raduius-2 h-50">
              <div class="card-body p-5 text-center">

                <p className="text-center">
                  <img src={logo} width="250" alt="Logo do app" />
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
                      className={errors.email && "is-invalid"}
                      placeholder="Seu email"
                      {...register("email", {
                        required: "O email é obrigatório"
                      })}
                    />
                    <Form.Text className="invalid-feedback">
                      {errors.email?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Sua senha"
                        className={errors.senha ? "is-invalid" : ""}
                        {...register("senha", {
                          required: "Senha é obrigatória"
                        })}
                        aria-describedby="basic-addon1"
                      />
                      <InputGroup.Text id="basic-addon1">
                        <i
                          onClick={revealPassword}
                          className={
                            showPassword ? "bi bi-eye" : "bi bi-eye-slash"
                          }
                        ></i>
                      </InputGroup.Text>
                    </InputGroup>
                    <Form.Text className="invalid-feedback">
                      {errors.senha?.message}
                    </Form.Text>
                  </Form.Group>

                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipCadastro}
                  >
                    <Button type="submit" variant="warning" className="text-light">
                      Cadastrar
                    </Button>
                  </OverlayTrigger>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
