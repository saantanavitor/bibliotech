import { useContext, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { atualizarEmail, atualizarPerfil, atualizarSenha, excluirConta, getCurrentUser, updateUser } from "../../firebase/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export function PerfilUsuario() {
    const navigate = useNavigate()
    const {reset, register, handleSubmit, formState: { errors } } = useForm();
    const {id} = useParams();
    const usuarioLogado = useContext(AuthContext);
   function onSubmit(data) {
    updateUser(usuarioLogado, data).then(() => { 
      navigate("/");
      })
    }

    function excluirUsuario(){
      excluirConta(usuarioLogado)
    }

    useEffect(() => {
     
      reset({email: usuarioLogado.email, displayName: usuarioLogado.displayName})
    },[])

  return (
    <section id="pagina" class="vh-100">
      <div data-theme="white-content" class="container body-content py-5 h-100">
        <div class="row d-flex justify-content-end align-items-center h-100 ">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5 flex-column ">
            <div class="card shadow-2-strong raduius-2 h-50">
              <div class="card-body p-5 text-center">
                <h3 class="mb-5">Perfil do usuário</h3>
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" className={errors.titulo && "is-invalid"} {...register("email", { required: "O email é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
          <Form.Text className="text-muted">
          Nunca compartilharemos seu e-mail.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" className={errors.titulo && "is-invalid"} {...register("senha", { required: "A senha é obrigatória!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNome">
          <Form.Label>Nome de Usuário</Form.Label>
          <Form.Control type="text" className={errors.titulo && "is-invalid"} {...register("displayName", { required: "O email é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}/>
          <Form.Text className="text-muted">
          Nunca compartilharemos seu nome de usuário.
          </Form.Text>
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Editar informações
        </Button>
        <Button onClick={excluirUsuario} className="ms-3" variant="danger" type="button">
          Deletar
        </Button>
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
