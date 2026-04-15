import express from "express"
import multer from "multer";
import {checkResume} from './controllers/resume-analyse.js'
const router = express.Router()
const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("resume"), checkResume);

router.get('/analyze', (req, res) => {
    console.log('enter in to route')
  res.send("Resume Analyzer API is running 🚀");
});

export default router