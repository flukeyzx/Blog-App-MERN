import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AccountNavbar = () => {
  const [active, setActive] = useState("account");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/account") {
      setActive("account");
    } else if (location.pathname === "/account/my-blogs") {
      setActive("blog");
    }
  }, [location.pathname]);
  return (
    <div className="flex justify-center gap-4 mt-8">
      <Link
        to={"/account"}
        className={`${
          active === "account"
            ? "bg-primary text-white"
            : "bg-gray-200 text-black dark:text-white dark:bg-slate-800"
        } px-8 py-2 rounded-full hover:opacity-75`}
      >
        My Account
      </Link>
      <Link
        to={"/account/my-blogs"}
        className={`${
          active === "blog"
            ? "bg-primary text-white"
            : "bg-gray-200 text-black dark:text-white dark:bg-slate-800"
        } px-9 py-2 rounded-full hover:opacity-75`}
      >
        My Blogs
      </Link>
    </div>
  );
};

export default AccountNavbar;
