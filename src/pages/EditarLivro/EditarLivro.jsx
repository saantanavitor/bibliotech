import { useEffect, useContext, useState } from "react";
import { Button, Container, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getLivro, updateLivro, uploadCapaLivro } from "../../firebase/livros";
import { ThemeContext } from '../../contexts/ThemeContext';
import { getAutor, getAutores } from "../../firebase/autores";

export function EditarLivro() {

    const {theme} = useContext(ThemeContext);
    const {id} = useParams();

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const navigate = useNavigate();
    
    const autor = getAutor(id);
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        initializeAuthors();
    }, [])

    function initializeAuthors() {
        getAutores().then(resultados => {
            setAutores(resultados)
        })
    }

    function onSubmit(data) {
        const imagem = data.imagem[0];
        if(imagem) {
            const toastId = toast.loading("Upload da imagem...", {position: "top-right"});
            uploadCapaLivro(imagem).then(url => {
                toast.dismiss(toastId);
                data.urlCapa = url;
                delete data.imagem;
                updateLivro(id, data).then(() => {
                    toast.success("Livro editado com sucesso!", {duration: 2000, position: "bottom-right"})
                    navigate("/livros");
                })
            })
        }
        else {
            delete data.imagem;
            updateLivro(id, data).then(() => {
                toast.success("Livro editado com sucesso!", {duration: 2000, position: "bottom-right"})
                navigate("/livros");
            })
        }
        
    }

    useEffect(() => {
        getLivro(id).then(livro => {
            reset({
                titulo: livro.titulo,
                categoria: livro.categoria,
                isbn: livro.isbn,
                
        });
        })
    }, [id, reset]);

    const renderTooltipEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Confirmar alterações
        </Tooltip>
      );

    return (
        <div className={theme ? "bg-dark text-light" : "bg-light text-dark"}>
        <div className="editar-livro page vh-100" data-theme={theme}>
            <Container>
                <h1>Editar livro</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" className={errors.titulo && "is-invalid"} {...register("titulo", {required: "Título é obrigatório!", maxLength: {value: 255, message: "Limite de 255 caracteres!"}})} />
                        <Form.Text className="text-danger">
                            {errors.titulo?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="autor">Autor</Form.Label>
                        <Form.Select type="text" className={errors.autor && "is-invalid"} {...register("autor", { required: "Autor é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}>
                            <option selected value={autor.nome} >{autor.nome}</option>
                            {autores.map(autor => {
                        return <option key={autor.id}>{autor.nome}</option>
                    })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control type="text" className={errors.categoria && "is-invalid"} {...register("categoria", {required: "Categoria é obrigatória!", maxLength: {value: 255, message: "Limite de 255 caracteres!"}})} />
                        <Form.Text className="text-danger">
                            {errors.categoria?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text" className={errors.isbn && "is-invalid"} {...register("isbn", {required: "ISBN é obrigatório!", maxLength: {value: 255, message: "Limite de 255 caracteres!"}})} />
                        <Form.Text className="text-danger">
                            {errors.isbn?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Imagem da capa</Form.Label>
                        <Form.Control type="file" {...register("imagem")} />
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