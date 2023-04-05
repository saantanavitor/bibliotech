import { useContext, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import githubIcon from "../../assets/icons/github.svg";
import imagemLogin2 from "../../assets/images/imagemLogin2.jpg";
import facebookIcon from "../../assets/icons/facebook (1).svg";
import { AuthContext } from "../../contexts/AuthContext";
import {
  loginGoogle,
  loginEmailSenha,
  loginFacebook,
  loginGithub
} from "../../firebase/auth";
import "./Login.css";

export function Login() {
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
    loginEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Entrando como ${user.email}`, {
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
  }

  function onLoginGoogle() {
    loginGoogle()
      .then((user) => {
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
  }

  function onLoginFacebook() {
    loginFacebook();
  }

  function onLoginGithub() {
    loginGithub()
      .then((user) => {
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
  }

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  const renderTooltipGoogle = (props) => (
    <Tooltip id="button-tooltip" {...props}>      
      Login com o Google
    </Tooltip>
  );

  const renderTooltipGithub = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Login com o Github
    </Tooltip>
  );

  const renderTooltipFacebook = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Login com o Facebook
    </Tooltip>
  );

  const renderTooltipEntrar = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Entrar
    </Tooltip>
  );

  return (
    <section id="pagina" class="vh-100">
      <div data-theme="white-content" class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card shadow-2-strong raduius-2">
              <div class="card-body p-5 text-center">
                <h3 class="mb-5">Bem vindo de volta ao Bibliotech!</h3>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Seu email"
                      className={errors.email ? "is-invalid" : ""}
                      {...register("email", {
                        required: "Email é obrigatório"
                      })}
                    />
                    <Form.Text className="invalid-feedback">
                      {errors.email?.message}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="senha">
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
                    overlay={renderTooltipEntrar}
                  >
                    <Button type="submit" variant="danger">
                      Entrar
                    </Button>
                  </OverlayTrigger>
                </Form>

                <hr class="my-4" />

                <OverlayTrigger
                  
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltipGoogle}
                >
                  <Button
                    className="mb-3 ms-3"
                    variant="primary"
                    onClick={onLoginGoogle}
                  >
                    <img src={googleIcon} width="32" alt="Google icon" className="me-3" />
                   
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltipGithub}
                >
                  <Button
                    className="mb-3 ms-3"
                    variant="primary"
                    onClick={onLoginGithub}
                  >
                    <img src={githubIcon} width="32" alt="Google icon" className="me-3"/>
                    
                  </Button>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltipFacebook}
                >
                  <Button
                    className="mb-3 ms-3"
                    variant="primary"
                    onClick={onLoginFacebook}
                  >
                    <img src={facebookIcon} width="32" alt="Facebook icon" className="me-3"/>
                    
                  </Button>
                </OverlayTrigger>

                <hr />

                <p className="text-muted">
                  Não tem conta? <Link to="/cadastro" className="link">Cadastre-se</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
//     <div data-theme="white-content">
//       <Container fluid className="my-5">

//         <div>

//         </div>
//         <p className="text-center">
//           <img src={imagemlogin} width="256" alt="Logo" />
//         </p>
//         <h4>Bem-vindo(a) de volta!</h4>

//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <Form.Group className="mb-3" controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Seu email"
//               className={errors.email ? "is-invalid" : ""}
//               {...register("email", { required: "Email é obrigatório" })}
//             />
//             <Form.Text className="invalid-feedback">
//               {errors.email?.message}
//             </Form.Text>
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="senha">
//             <Form.Label>Senha</Form.Label>
//             <InputGroup>
//               <Form.Control
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Sua senha"
//                 className={errors.senha ? "is-invalid" : ""}
//                 {...register("senha", { required: "Senha é obrigatória" })}
//                 aria-describedby="basic-addon1"
//               />
//               <InputGroup.Text id="basic-addon1">
//                 <i
//                   onClick={revealPassword}
//                   className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}
//                 ></i>
//               </InputGroup.Text>
//             </InputGroup>
//             <Form.Text className="invalid-feedback">
//               {errors.senha?.message}
//             </Form.Text>
//           </Form.Group>
//           <OverlayTrigger
//             placement="bottom"
//             delay={{ show: 250, hide: 400 }}
//             overlay={renderTooltipEntrar}
//           >
//             <Button type="submit" variant="danger">
//               Entrar
//             </Button>
//           </OverlayTrigger>
//         </Form>

//         <hr />

//         <OverlayTrigger
//           placement="top"
//           delay={{ show: 250, hide: 400 }}
//           overlay={renderTooltipGoogle}
//         >
//           <Button
//             className="mb-3"
//             variant="primary"
//             onClick={onLoginGoogle}
//           >
//             <img src={googleIcon} width="32" alt="Google icon" />
//             Entrar com o Google
//           </Button>
//         </OverlayTrigger>

//         <OverlayTrigger
//           placement="top"
//           delay={{ show: 250, hide: 400 }}
//           overlay={renderTooltipGithub}
//         >
//           <Button
//             className="mb-3 ms-3"
//             variant="primary"
//             onClick={onLoginGithub}
//           >
//             <img src={githubIcon} width="32" alt="Google icon" />
//             Entrar com o GitHub
//           </Button>
//         </OverlayTrigger>

//         <OverlayTrigger
//           placement="top"
//           delay={{ show: 250, hide: 400 }}
//           overlay={renderTooltipFacebook}
//         >
//           <Button
//             className="mb-3 ms-3"
//             variant="primary"
//             onClick={onLoginFacebook}
//           >
//             <img src={facebookIcon} width="32" alt="Facebook icon" /> Entrar com
//             o Facebook
//           </Button>
//         </OverlayTrigger>

//         <hr />

//         <p className="text-muted">
//           Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
//         </p>
//       </Container>
//     </div>
//   );
// }
