import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from 'axios';
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const {data} = await axios.post('/login', {email, password});
      setUser(data);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      if (e.response && e.response.status === 401) {
        alert("Invalid password");
      } else if (e.response && e.response.status === 404) {
        alert("User not found");
      } else {
        alert("Login failed");
      }
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}