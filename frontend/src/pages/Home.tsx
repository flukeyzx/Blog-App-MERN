import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { imageURL } from "../constants/constants.ts";
import { format } from "date-fns";
import Searchbar from "../components/Searchbar.tsx";

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    axios
      .get(`/all-blogs?page=${page}&limit=${12}`)
      .then((response) => {
        setBlogs(response.data.blogs);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [page]);

  const handleSearchResult = async (query: string) => {
    try {
      axios.get(`/search?q=${query}`).then((response) => {
        setBlogs(response.data.results);
        setTotalPages(1);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const changePageHandler = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setPage(page);
  };

  return (
    <div className="flex flex-col justify-between min-h-[490px]">
      <Searchbar onSearch={handleSearchResult} />
      {blogs?.length === 0 && (
        <div className="flex justify-center items-center mt-48">
          No blog posts.
        </div>
      )}
      <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-1 gap-4">
        {blogs?.length > 0 &&
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="mt-8 dark:bg-slate-800 bg-gray-300 rounded-2xl cursor-pointer hover:-translate-y-1 transition-transform"
            >
              <Link to={"/blog?id=" + blog._id}>
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
                  <span className="text-sm dark:text-gray-100 flex justify-end mt-2 items-center gap-1">
                    Author:
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                      />
                    </svg>
                    <span>{blog.author.name}</span>
                  </span>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className="flex justify-end mt-24 gap-2">
        <button
          onClick={() => changePageHandler(page - 1)}
          disabled={page === 1}
          className="bg-gray-200 dark:bg-slate-700 px-2 py-2 rounded-xl hover:opacity-70"
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => changePageHandler(idx + 1)}
            disabled={idx + 1 === page}
            className="bg-gray-200 dark:bg-slate-700 px-4 py-2 rounded-xl hover:opacity-70"
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => changePageHandler(page + 1)}
          disabled={page === totalPages}
          className="bg-gray-200 dark:bg-slate-700 px-2 py-2 rounded-xl hover:opacity-70"
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
