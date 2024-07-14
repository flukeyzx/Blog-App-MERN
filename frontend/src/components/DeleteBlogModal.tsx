import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

interface PropsType {
  blog: Blog;
  setShowModal: (value: boolean) => void;
}

const DeleteBlogModal = ({ blog, setShowModal }: PropsType) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const deleteHandler = () => {
    axios
      .post("/delete", { _id: blog._id })
      .then((response) => {
        setShowModal(false);
        navigate("/account/my-blogs");
        enqueueSnackbar(response.data.message, { variant: "success" });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="-mt-10 max-w-sm flex flex-col gap-2 bg-gray-100 dark:bg-slate-800 p-8 rounded-2xl min-h-48 opacity-100 cursor-pointer"
      >
        Are you sure you want to delete "{blog?.title}" ?
        <div className="flex gap-2 justify-around mt-4">
          <button
            className="bg-gray-300 dark:bg-slate-600 px-12 py-2 rounded-lg hover:opacity-65"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            onClick={deleteHandler}
            className="bg-red-600 text-white px-12 py-2 rounded-lg hover:opacity-65"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlogModal;
