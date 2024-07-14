import fs from "fs";
import { Blog } from "../models/blog.model.js";
import jwt from "jsonwebtoken";

export const createBlog = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(400)
      .json({ message: "No token provided, Access Denied!" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const { title, content, file } = req.body;
  const blog = new Blog({
    title,
    content,
    file,
    author: decoded._id,
  });

  await blog.save();

  return res
    .status(201)
    .json({ success: true, message: "Blog created successfully", blog });
};

export const getUserBlogs = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(400)
      .json({ message: "No token provided, Access Denied!" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const blogs = await Blog.find({ author: decoded._id });

  if (blogs) {
    return res.status(200).json(blogs);
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.body;
  const blog = await Blog.findById(id);
  if (blog) {
    return res.status(200).json({ blog });
  }
};

export const updateBlog = async (req, res) => {
  const { id, title, content, file } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { title, content, file },
    { new: true }
  );

  return res
    .status(200)
    .json({ success: true, message: "blog updated successfully", updatedBlog });
};

export const deleteBlog = async (req, res) => {
  const { _id } = req.body;
  const deletedBlog = await Blog.findByIdAndDelete(_id);
  if (deletedBlog) {
    return res
      .status(200)
      .json({ success: true, message: "blog deleted successfully" });
  }
};

export const getAllBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skipIndex = (page - 1) * limit;
  try {
    const blogs = await Blog.find()
      .limit(limit)
      .skip(skipIndex)
      .populate("author")
      .exec();

    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);

    return res.status(200).json({ blogs, totalBlogs, totalPages, page });
  } catch (error) {
    console.log(error.message);
  }
};

export const searchBlog = async (req, res) => {
  const { q } = req.query;

  try {
    const query = new RegExp(q, "i");
    const blogs = await Blog.find({
      $or: [{ title: { $regex: query } }, { content: { $regex: query } }],
    });
    res.status(200).json({ results: blogs });
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadFile = async (req, res) => {
  try {
    const uploadedFile = [];
    const { path, originalname } = req.files[0];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFile.push(newPath.replace("uploads\\", ""));
    return res.status(200).json(uploadedFile);
  } catch (error) {
    console.log(error.message);
  }
};
