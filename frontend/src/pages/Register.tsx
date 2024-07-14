import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const registerUserHandler = (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      return enqueueSnackbar("Password must be atleast 8 characters long.", {
        variant: "warning",
      });
    }
    axios
      .post("/register", { name, email, password })
      .then(() => {
        navigate("/login");
        enqueueSnackbar("Registration successfull", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar(error.response?.data?.message, { variant: "error" });
      });
  };
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="mb-4 text-3xl">Register</h1>
      <form onSubmit={registerUserHandler} className="flex flex-col gap-3 w-96">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="John Doe"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="password"
        />
        <p className="text-center">
          Already have an account?{" "}
          <Link className="underline font-semibold" to={"/login"}>
            Login
          </Link>
        </p>
        <button className="primary">Sign up</button>
      </form>
    </div>
  );
};

export default Register;
