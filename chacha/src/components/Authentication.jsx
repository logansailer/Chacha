export default function Authentication() {
  return (
    <>
      <h2 className="sign-up-text">Sign up / Login</h2>
      <p>Sign in to your account</p>
      <input placeholder="Email"></input>
      <input placeholder="*********" type="password"></input>
      <button><p>Submit</p></button>
      <hr />
      <div className="register-content">
        <p>Don&apos;t have an account</p>
      </div>
    </>
  );
}
