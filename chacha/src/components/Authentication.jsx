import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Authentication({ handleCloseModal }) {
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { signup, login } = useAuth();

  async function handleAuthenticate() {
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.length < 6 ||
      isAuthenticating
    ) {
      return;
    }
    try {
      setIsAuthenticating(true);
      setError(null);
      if (isRegistration) {
        //register a user
        await signup(email, password);
      } else {
        //login a user
        await login(email, password);
      }
      handleCloseModal();
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  }
  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? "Sign up" : "Login"}</h2>
      <p>{isRegistration ? "Create an account" : "Sign in to your account"}</p>
      {error && <p>❌{error}</p>}
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
        placeholder="Email"
      ></input>
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="*********"
        autoComplete="current-password"
        type="password"
      ></input>
      <button onClick={handleAuthenticate}>
        <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
      </button>
      <hr />
      <div className="register-content">
        <p>
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button onClick={() => setIsRegistration(!isRegistration)}>
          {isRegistration ? "Sign in" : "Sign up"}
        </button>
      </div>
    </>
  );
}
