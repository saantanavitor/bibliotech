import { Button, Container, Form, OverlayTrigger, Tooltip, } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addLivro, uploadCapaLivro } from "../../firebase/livros";
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getAutores } from "../../firebase/autores";
import { getCategorias } from "../../firebase/categorias";
import Select from "react-select";



export function AdicionarLivro() {
    const {theme} = useContext(ThemeContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [autores, setAutores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([])

    function onSubmit(data) {
        if (categoriasSelecionadas.length === 0) {
            return toast.error(`Por favor, selecione uma ou mais categorias`,{
                duration: 2000,
                position: "bottom-top-center",
            });
        }
        data.categoria = categoriasSelecionadas
        const imagem = data.imagem[0];
        if (imagem) {
            const toastId = toast.loading("Upload da imagem...", { position: "top-right" });
            uploadCapaLivro(imagem).then(url => {
                toast.dismiss(toastId);
                data.urlCapa = url;
                delete data.imagem;
                addLivro(data).then(() => {
                    toast.success("Livro adicionado com sucesso!", { duration: 2000, 
                        position: "bottom-right" })
                    navigate("/livros");
                })
            })
        } 
        else {
            delete data.imagem;
            addLivro(data).then(() => {
                toast.success("Livro adicionado com sucesso!", { duration: 2000, 
                    position: "bottom-right" })
                navigate("/livros");
            })
        }
        
    }

    const renderTooltipAdd = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Adicionar Livro na tabela
        </Tooltip>
    );

    useEffect(() => {
        initializeAuthors();
        initializeCategories();
    }, [])


    function initializeAuthors() {
        getAutores().then(resultados => {
            setAutores(resultados)
        })
    }

    function handleCategoriaChange(selectedOptions) {
        setCategoriasSelecionadas(selectedOptions.map(option => option.value));
        setCategorias(categorias => categorias.map(categoria => ({
            ...categoria,
            isSelected: selectedOptions.some(option => option.value === categoria.value)
            
        }))) 
    }

        function initializeCategories() {
            getCategorias().then(buscas => {
                setCategorias( 
                    buscas.map((categoria) => ({
                    label: categoria.nome,
                    value: categoria.nome,
                    isSelected: false
            }))
            )
        })
    }

    return (
        <div className="adicionar-livro page" data-theme={theme}>
            <Container>
                <h1 className="pageTitle">Adicionar livro</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" className={errors.titulo && "is-invalid"} 
                        {...register("titulo", { required: "Título é obrigatório!", 
                        maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="text-danger">
                            {errors.titulo?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Autor</Form.Label>
                        <Form.Select type="text" className={errors.autor && "is-invalid"} 
                            {...register("autor", { required: "Autor é obrigatório!", 
                            maxLength: { value: 255, message: "Limite de 255 caracteres!" } })}>
                            <option  value={null} disabled>Selecione um Autor</option>                            
                            {autores.map(autor => {
                        return <option key={autor.id}>{autor.nome}</option>
                    })}
                        </Form.Select>
                    </Form.Group>
                    
                    {/*  Modelo Antigo de Form

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control type="text" className={errors.autor && "is-invalid"} {...register("autor", { required: "Autor é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="text-danger">
                            {errors.autor?.message}
                        </Form.Text>
                    </Form.Group> 
                    
                    */}

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Categoria</Form.Label>
                        <Select
                                isMulti
                                options={categorias}
                                value= {categorias.filter((categoria) => 
                                    categoriasSelecionadas.includes(categoria.value))}
                                labelledBy="select-categoria-label"
                                className={errors.categoria && "is-invalid"}
                                {...register("categoria",) 
                            }
                            onChange={handleCategoriaChange}
                            placeholder="Selecione uma ou mais categorias"
                        />
                        <Form.Text className="text-danger">
                            {errors.categoria?.message}
                        </Form.Text> 
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text" className={errors.isbn && "is-invalid"} 
                        {...register("isbn", { required: "ISBN é obrigatório!", 
                        maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="text-danger">
                            {errors.isbn?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Imagem da capa</Form.Label>
                        <Form.Control type="file" accept=".png,.jpg,.jpeg,.gif" {...register("imagem")} />
                    </Form.Group>
                    <Form.Control type="hidden" {...register("active", {value: true})} /> {/* Criando o input com o valor "active" para que possa ser colocado como false ao ser deletado, ou seja, todo livro criado será TRUE  */}
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipAdd}
                    > 
                    <Button type="submit" variant="success">Adicionar</Button>
                    </OverlayTrigger>
                </Form>
            </Container>
        </div>
    )
}