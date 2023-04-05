import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <MDBFooter
      bgColor="light"
      className="text-center text-lg-start text-success"
    >
      <section className="d-flex justify-content-center p-4 border-bottom">
        <div className="text-danger">
          <Link to="https://www.facebook.com/julia.gascho" target="_blank" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </Link>
          <Link to="" className="me-4 text-reset" target="_blank">
            <MDBIcon fab icon="google" />
          </Link>
          <Link to="https://www.instagram.com/jugascho/" target="_blank" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </Link>
          <Link to="https://www.linkedin.com/in/juliagascho/" target="_blank" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </Link>
          <Link to="https://github.com/juliagascho" target="_blank" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </Link>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <Link to="/login" className="linkApp">
                <h6 className="text-uppercase  fw-bold mb-4">
                  {/* <img src={livros} width={30} height={30} alt="" /> */}
                  <MDBIcon icon="bi bi-journal-code fa-lg" className="me-3" />
                  Bibliotech
                </h6>
              </Link>
              <p className="text-center text-md-start mt-5">
                A biblioteca tem por objetivo o atendimento à comunidade local
                no oferecimento de suporte informacional.
              </p>
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <p>
                <Link to="#!" className="text-reset">
                  Termos de uso
                </Link>
              </p>
              <p>
                <Link to="/ajuda" className="text-reset linkApp">
                  Ajuda
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">
                  Políticas de privacidade
                </Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">
                  Blogs
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Curitiba, PR, BR
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                contato@bibliotech.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> 99 99999-9999
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4 text-danger"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:&nbsp;
         <Link className="text-reset fw-bold" to="/login"> 
          bibliotech.com          
        </Link>
      </div>
    </MDBFooter>
  );
}
