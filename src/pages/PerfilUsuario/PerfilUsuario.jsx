import { useContext, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { atualizarEmail, atualizarPerfil, atualizarSenha, excluirConta, getCurrentUser, updateUser } from "../../firebase/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export function PerfilUsuario() {
    const navigate = useNavigate
    const {reset, register, handleSubmit, formState: { errors } } = useForm();
    const {id} = useParams();
    const usuarioLogado = useContext(AuthContext);
    //console.log(usuarioLogado.providerData[0].providerId)
   function onSubmit(data) {
    
      updateUser(usuarioLogado, data).then(() => { alert("Informações atualizadas com sucesso!")
      })
    }

    function excluirUsuario(){
      excluirConta(usuarioLogado)
    }

    useEffect(() => {
     
      reset({email: usuarioLogado.email, displayName: usuarioLogado.displayName})
    },[])

  return (
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
        
        <Button variant="success" type="submit">
          Editar informações
        </Button>
        <Button onClick={excluirUsuario} className="ms-3" variant="danger" type="button">
          Deletar
        </Button>
      </Form>
      
    </Container>
  );
}
