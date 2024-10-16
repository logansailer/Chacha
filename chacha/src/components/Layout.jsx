export default function Layout({ children }) {
  const header = (
    <header>
      <div>
        <h1 className="text-gradient">Chacha</h1>
        <p>For Tea Insatiates</p>
      </div>
      <button>
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
      </p>
    </footer>
  );
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
