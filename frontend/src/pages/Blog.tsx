import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { imageURL } from "../constants/constants.ts";

const Blog = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    axios
      .post("/blog", { id })
      .then((response) => {
        setBlog(response.data.blog);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  return (
    <div>
      {blog ? (
        <div className="py-2 mt-8 px-10 -mx-8 bg-gray-200 dark:bg-slate-900">
          <h1 className="text-3xl my-4">{blog.title}</h1>
          <div className="flex">
            <img
              src={imageURL + blog.file}
              alt="blog thumbnail"
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="ql-editor mt-4">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Blog;
