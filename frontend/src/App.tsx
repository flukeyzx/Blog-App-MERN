import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";
import ThemeProvider from "./context/ThemeProvider.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import axios from "axios";
import Account from "./pages/Account.tsx";
import MyBlogs from "./pages/MyBlogs.tsx";
import CreateBlog from "./pages/CreateBlog.tsx";
import Blog from "./pages/Blog.tsx";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/my-blogs" element={<MyBlogs />} />
            <Route path="/account/my-blogs/create" element={<CreateBlog />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/edit" element={<CreateBlog />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
