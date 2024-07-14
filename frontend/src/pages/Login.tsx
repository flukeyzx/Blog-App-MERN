import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("/login", {
        email,
        password,
      })
      .then((response) => {
        setUser(response.data.isUser);
        enqueueSnackbar(response.data.message, { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        enqueueSnackbar(error.response?.data?.message, { variant: "error" });
      });
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-3xl mb-4">Login</h1>
      <form onSubmit={loginHandler} className="flex flex-col gap-3 w-96">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <p className="text-center">
          Don't have an account?{" "}
          <Link className="underline font-semibold" to={"/register"}>
            Register
          </Link>
        </p>
        <button className="primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
