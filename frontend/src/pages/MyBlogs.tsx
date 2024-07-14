import { Link } from "react-router-dom";
import AccountNavbar from "../components/AccountNavbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { imageURL } from "../constants/constants";
import { format } from "date-fns";
import DeleteBlogModal from "../components/DeleteBlogModal.tsx";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [modal, setShowModal] = useState<boolean>(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  useEffect(() => {
    axios
      .get("/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [blogs]);

  const handleDelete = (blog: Blog) => {
    setShowModal(true);
    setBlogToDelete(blog);
  };

  return (
    <div>
      <AccountNavbar />
      {modal && blogToDelete && (
        <DeleteBlogModal blog={blogToDelete} setShowModal={setShowModal} />
      )}
      <div className="flex justify-center items-center mt-8">
        <Link
          to={"/account/my-blogs/create"}
          className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full hover:opacity-70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create New Blog
        </Link>
      </div>
      <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-1 gap-4">
        {blogs?.length > 0 &&
          blogs.map((blog) => (
            <div
              key={blog._id}
              className={`mt-8 dark:bg-slate-800 bg-gray-300 rounded-2xl ${
                modal
                  ? ""
                  : "cursor-pointer hover:-translate-y-1 transition-transform"
              }`}
            >
              <Link to={modal ? "" : "/blog?id=" + blog._id}>
                <div className="flex flex-col p-4 gap-1">
                  <div className="flex w-68 h-36">
                    <img
                      src={imageURL + blog.file[0]}
                      className="object-cover"
                      alt={blog.title}
                    />
                  </div>
                  <h2 className="font-sans font-semibold text-md my-2 leading-5">
                    {blog.title}
                  </h2>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    created at &rarr;{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    <span>
                      {format(new Date(blog.createdAt), "yyyy-MM-dd")}
                    </span>
                  </span>
                </div>
              </Link>
              <div className="flex justify-end gap-6 -mt-2 p-4">
                <Link to={"/blog?id=" + blog._id}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 hover:text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </Link>
                <Link to={"/blog/edit/?id=" + blog._id}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 hover:text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </Link>
                <svg
                  onClick={() => handleDelete(blog)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 hover:text-primary cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyBlogs;
