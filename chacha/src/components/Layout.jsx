import Modal from "./Modal";
import Authentication from "./Authentication";
import { useState } from "react";

export default function Layout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const header = (
    <header>
      <div>
        <h1 className="text-gradient">Chacha</h1>
        <p>For Tea Insatiates</p>
      </div>
      <button onClick={() => setShowModal(true)}>
        <p>Sign up free</p>
        <i className="fa-solid fa-mug-hot"></i>
      </button>
    </header>
  );
  const footer = (
    <footer>
      <p>
        <span className="text-gradient">Chacha</span> was made by{" "}
        <a href="https://logan-sailer.netlify.app/" target="_blank">
          Logan Sailer
        </a>
        <br></br>
        See the project on
        <a href="https://github.com/logansailer/Chacha" target="_blank">
          Github
        </a>
      </p>
    </footer>
  );
  return (
    <>
      {showModal && (
        <Modal handleCloseModal={() => setShowModal(false)} >
          <Authentication></Authentication>
        </Modal>
      )}
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
