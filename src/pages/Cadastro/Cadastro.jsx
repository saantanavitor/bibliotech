import {
  Button,
  Container,
  Form,
  OverlayTrigger,
  Tooltip,
  InputGroup,
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg";
import githubIcon from "../../assets/icons/github.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginFacebook, loginGithub, loginGoogle } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { addUsuarios } from "../../firebase/usuarios";

export function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
            duration: 2500,
          });
        })
        
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
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

  const renderTooltipCadastro = (props) => (
    <Tooltip id="button-tooltip" {...props}>
     Confirmar Cadastro
    </Tooltip>
  );



  function onLoginGoogle() {
    // then = quando der certo o processo
    loginGoogle()
      .then((user) => {
        addUsuarios({id: user.uid, email: user.email, displayName: user.displayName}).then(() => {
          toast.success(`Bem-vindo(a) ${user.email}`, {
            position: "bottom-right",
            duration: 2500,
          });
        })
        navigate("/");
      })
      .catch((erro) => {
        // tratamento de erro
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginFacebook() {
    loginFacebook().then((user) => {
      addUsuarios({id: user.uid, email: user.email, displayName: user.displayName}).then(() => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
      navigate("/");
    })
    .catch((erro) => {
      toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
        position: "bottom-right",
        duration: 2500,
      });
    });
}

  function onLoginGithub() {
    loginGithub()
      .then((user) => {
        
        addUsuarios({id: user.uid, email: user.email, displayName: user.displayName}).then(() => {
          toast.success(`Bem-vindo(a) ${user.email}`, {
            position: "bottom-right",
            duration: 2500,
          });
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${erro.code}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  const usuarioLogado = useContext(AuthContext);

  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="my-5">
      <p className="text-center">
        <img src={logoIcon} width="256" height="256" alt="Logo do app" />
      </p>
      <h4>Faça parte da nossa plataforma</h4>
      <p className="text-muted">
        Já tem conta? <Link to="/login">Entre</Link>
      </p>
      <p className="text-muted">
          Esqueceu a Senha? <Link to="/esqueciSenha">Clique Aqui!</Link>
      </p>
      <hr />
      <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipGoogle}
        >
          <Button className="mb-3" variant="danger" onClick={onLoginGoogle}>
            <img src={googleIcon} width="32" alt="Google icon" /> Entrar com o
            Google
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltipGithub}
        >
          <Button className="mb-3 ms-3" variant="dark" onClick={onLoginGithub}>
            <img src={githubIcon} width="32" alt="Google icon" /> Entrar com o
            GitHub
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
            <img src={facebookIcon} width="32" alt="Facebook icon" /> Entrar com
            o Facebook
          </Button>
        </OverlayTrigger>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            className={errors.email && "is-invalid"}
            placeholder="Seu email"
            {...register("email", { required: "O email é obrigatório" })}
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
            className={errors.senha && "is-invalid"}
            placeholder="Sua senha"
            {...register("senha", { required: "A senha é obrigatória" })}
            aria-describedby="basic-addon1"
          />
          <InputGroup.Text id="basic-addon1"><i onClick={revealPassword} className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i></InputGroup.Text>
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
        <Button type="submit" variant="success">
          Cadastrar
        </Button>
        </OverlayTrigger>
      </Form>
    </Container>
  );
}
