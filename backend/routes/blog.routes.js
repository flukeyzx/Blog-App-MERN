import { Router } from "express";
import {
  createBlog,
  uploadFile,
  getUserBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  searchBlog,
} from "../controllers/blog.controller.js";
import photosMiddleware from "../middlewares/mutler.middleware.js";

const router = Router();

router.post("/create", createBlog);
router.get("/blogs", getUserBlogs);
router.post("/blog", getBlog);
router.post("/blog/edit", updateBlog);
router.post("/delete", deleteBlog);
router.get("/all-blogs", getAllBlogs);
router.get("/search", searchBlog);
router.post("/upload", photosMiddleware.array("photo"), uploadFile);

export default router;
