import { Outlet } from "react-router-dom";
import Header from "./components/Header.tsx";

const Layout = () => {
  return (
    <div className="py-6 px-8 max-sm:px-4 min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
