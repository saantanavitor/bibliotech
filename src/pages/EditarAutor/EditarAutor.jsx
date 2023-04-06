import { useEffect } from "react";
import { Button, Container, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getAutor, updateAutor } from "../../firebase/autores";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext } from "react";

export function EditarAutor() {

    const {id} = useParams();
    const {theme} = useContext(ThemeContext);

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
          updateAutor(id, data).then(() => {
                toast.success("Autor editado com sucesso!", {duration: 2000, position: "bottom-right"})
                navigate("/autores");
            })
        }
        
    
    useEffect(() => {
        getAutor(id).then(autor => {
            reset(autor);
        })
    }, [id, reset]);


    
  const renderTooltipEdit = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Confirmar alterações
    </Tooltip>
  );

    return (
        <div className={theme ? "bg-dark text-light" : "bg-light text-dark"}>
        <div className="page editar-autor">
            <Container>
                <h1>Editar autor</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "Nome é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="text-danger">
                            {errors.nome?.message}
                        </Form.Text>
                    </Form.Group>                   
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" className={errors.email && "is-invalid"} {...register("email", { required: "E-mail é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.email?.message}
                        </Form.Text>
                    </Form.Group>

                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipEdit}
                      > 
                    <Button type="submit" variant="success">Editar</Button>
                    </OverlayTrigger>
                </Form>
            </Container>
        </div>
        </div>
    )
}