import express from "express"
import { getAllStudentViewCourse, getStudentViewCourseDetails } from "../../controllers/student-controllers/student-controllers.js";


const router = express.Router();
router.get("/get", getAllStudentViewCourse)
router.get("/get/details/:id",getStudentViewCourseDetails)



export default router;