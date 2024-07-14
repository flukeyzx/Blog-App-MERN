import axios from "axios";
import AccountNavbar from "../components/AccountNavbar.tsx";
import { useAuth } from "../context/AuthProvider.tsx";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .post("/logout")
      .then(() => {
        enqueueSnackbar("logged out successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <AccountNavbar />
      <div className="flex justify-center mt-8">
        Logged In as {user?.name} ({user?.email})
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={logoutHandler} className="primary max-w-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
