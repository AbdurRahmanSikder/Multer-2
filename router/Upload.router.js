import express from "express";
import { fileUpload } from "../controller/Upload.controller.js";
import validateFileAndUpload from "../middleware/Upload.middleware.js";
const route = express.Router();

route.post("/upload", validateFileAndUpload, fileUpload);

export default route;