import { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import { toolbarOptions } from "../constants/constants.ts";

const CreateBlog = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      axios
        .post("/blog", { id })
        .then((response) => {
          setTitle(response.data.blog.title);
          setContent(response.data.blog.content);
          setFile(response.data.blog.file);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [id]);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const module = {
    toolbar: toolbarOptions,
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("photo", file);
      axios
        .post("/upload", data, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((response) => {
          setFile(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const submitBlogHandler = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      content,
      file,
    };

    if (id) {
      axios
        .post("/blog/edit", { id, ...data })
        .then((response) => {
          enqueueSnackbar(response.data.message, { variant: "success" });
          navigate("/account/my-blogs");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      axios
        .post("/create", data)
        .then(() => {
          enqueueSnackbar("Blog created successfully", { variant: "success" });
          navigate("/account/my-blogs");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <form className="w-full max-w-2xl" onSubmit={submitBlogHandler}>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title..."
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg"
        />

        <ReactQuill
          theme="snow"
          modules={module}
          value={content}
          onChange={setContent}
          className="dark:bg-white text-black custom-quill-editor"
        />

        <div className="mt-4">
          <span>Choose thumbnail from the device: </span>
          <label
            htmlFor="file-upload"
            className="py-2 px-6 bg-primary text-white rounded-md mx-2 hover:opacity-75 cursor-pointer inline-block"
          >
            Upload
            <input
              id="file-upload"
              onChange={fileChangeHandler}
              required={id ? false : true}
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <button className="primary mt-8">Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
