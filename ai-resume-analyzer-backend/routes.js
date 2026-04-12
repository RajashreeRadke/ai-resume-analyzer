import express from "express"

const router = express.Router()
import {checkResume} from './controllers/resume-analyse.js'
console.log("enter routes")
router.route('/analyze').post(checkResume)

router.get('/analyze', (req, res) => {
    console.log('enter in to route')
  res.send("Resume Analyzer API is running 🚀");
});

export default router