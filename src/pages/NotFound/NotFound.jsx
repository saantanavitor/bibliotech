import { useCallback, useState, useContext } from "react";
import { Container, ButtonGroup, Button, Card } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../../assets/images/not-found-404.png";
import { logout } from "../../firebase/auth";
import { ThemeContext, themes } from "../../contexts/ThemeContext";

export function NotFound() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { theme } = useContext(ThemeContext);
    

const goLogin = useCallback(function () {
    logout().then(() => {
        navigate('/login');
    })
}, []);

const backHome = useCallback(() => {
    navigate('/');
}, []) 

const displayModal = useCallback(() =>{
    setShowModal(true);
},[]);

const closeModal = useCallback(() =>{
    setShowModal(false);
},[]);
    

    return (
        <div className="page pageTitle" data-theme={theme}>
        <Container className="d-flex flex-column justify-content-center align-items-center">
            <img src={notFoundImg} className="rounded float-end" width="300"alt="imagem de pagina não encontrada"/>
            <h4>Oops... a página que você está tentando acessar não existe.</h4>
            <p className="mt-5">Pesquise novamente ou acesse um dos botões abaixo:</p>
            <ButtonGroup  className="mt-1" >
            <Button onClick={backHome} variant="outline-secondary" size="sm">Voltar</Button>
                <Button onClick={goLogin} variant="outline-success" size="sm">Login</Button>
                <Button onClick={displayModal} variant="outline-danger" size="sm">Reportar</Button>
            </ButtonGroup> 
            <Modal show={showModal} onHide={closeModal}>
            <Modal.Dialog className="modal-md">
                <Modal.Header closeButton>
                <Modal.Title>Envio de erro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>Ok! Erro reportado aos desenvolvedores.</p>
                </Modal.Body>
                </Modal.Dialog>
            </Modal>
        </Container>
        </div>
    )
}