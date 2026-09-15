import Course from "../../models/course.model.js";

export const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = await new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();
    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course is created successfully",
        data: {
          course: saveCourse,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "add new course something went wrong!",
      });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courseList = await Course.find({});
    res
      .status(200)
      .json({
        success: true,
        message: "get all course list",
        data: courseList,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "get all course something went wrong!",
      });
  }
};

export const getCourseDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      res.status(404).json({ success: false, message: "course not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "get single course details",
        data: courseDetails,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "something went wrong getCourse details!",
      });
  }
};

export const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateCourseData = req.body;

    const updatedCourse = await Course.findOneAndUpdate(id, updateCourseData, {
      new: true,
    });
    if (!updatedCourse) {
      res
        .status(404)
        .json({ success: false, message: "course not fond update" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "course updated successfully",
        data: updatedCourse,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "something went wrong update course by id!",
      });
  }
};
