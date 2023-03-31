import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdb-react-ui-kit";

export function Footer() {
  return (
    <MDBFooter
      bgColor="light"
      className="text-center text-lg-start text-success"
    >
      <section className="d-flex justify-content-center p-4 border-bottom">
        <div className="text-danger">
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="" className="me-4 text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon className="me-3" />
                Bibliotech
              </h6>
              <p className="text-center text-md-start mt-5">
                A biblioteca tem por objetivo o atendimento à comunidade local
                no oferecimento de suporte informacional.
              </p>
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <p>
                <a href="#!" className="text-reset">
                  Termos de uso
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Ajuda
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Políticas de privacidade
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Blogs
                </a>
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
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="/">
          bibliotech.com
        </a>
      </div>
    </MDBFooter>
  );
}
