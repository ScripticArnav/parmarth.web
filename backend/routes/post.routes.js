import { Router } from "express";
const router = Router();
import isAuth from "../middleware/is-auth.js";

import {
  getArticles,
  getPosts,
  getPostById,
  getPostByCategory,
  addPost,
  editPost,
  deletePost,
  getPastActivities,
} from "../controllers/post.js";

router.get("/api/getPosts", getPosts);
router.get("/api/getPost/:id", getPostById);
router.get("/api/getPostByCategory/:category", getPostByCategory);
router.get("/api/getArticles", getArticles);
router.post("/api/addPost", isAuth, addPost);
router.put("/api/editPost/:id", isAuth, editPost);
router.delete("/api/deletePost/:id", isAuth, deletePost);
router.get("/api/past-activities/:category", getPastActivities);


export default router;
