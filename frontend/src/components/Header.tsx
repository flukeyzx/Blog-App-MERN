import { useAuth } from "../context/AuthProvider.tsx";
import { useTheme } from "../context/ThemeProvider.tsx";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <Link
        to={"/"}
        className="font-logo text-3xl max-sm:text-xl font-semibold"
      >
        Blog Stream
      </Link>
      <div className="flex gap-4">
        {theme === "light" && (
          <button
            onClick={toggleTheme}
            className="border-2 border-opacity-55 hover:border-opacity-100 border-primary px-4 rounded-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        {theme === "dark" && (
          <button
            onClick={toggleTheme}
            className="border-2 border-opacity-55 hover:border-opacity-100 border-primary px-4 max-sm:px-2 rounded-2xl"
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
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </button>
        )}
        {user && (
          <Link
            to={"/account"}
            className="flex cursor-pointer hover:opacity-85 gap-2 px-6 py-2 max-sm:px-2 items-center bg-gray-300 dark:bg-slate-800 rounded-full"
          >
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            {user.name}
          </Link>
        )}
        {!user && (
          <div className="flex gap-2">
            <Link
              to={"/login"}
              className="px-8 py-2 max-sm:px-3 max-sm:rounded-lg  bg-gray-200 dark:bg-gray-700 rounded-3xl hover:opacity-85 cursor-pointer"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="px-6 py-2 max-sm:px-2 max-sm:rounded-lg bg-slate-800 text-white dark:bg-white dark:text-black rounded-3xl hover:opacity-85 cursor-pointer"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
