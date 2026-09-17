import Course from "../../models/course.model.js";


export const getAllStudentViewCourse = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;
    console.log(req.query, "req.query");
    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParam = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParam.pricing = 1;

        break;
      case "price-hightolow":
        sortParam.pricing = -1;

        break;
      case "title-atoz":
        sortParam.title = 1;

        break;
      case "title-ztoa":
        sortParam.title = -1;

        break;

      default:
        sortParam.pricing = 1;
        break;
    }

    const courseList = await Course.find(filters).sort(sortParam);
    
    res.status(200).json({ success: true, message: "get All student view course data successful load", data: courseList })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "getAll Student Course something went wrong!" })
  }
};

export const getStudentViewCourseDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      res.status(404).json({ success: false, message: " student view single course details not found", data: null });
      return
    }
    res.status(200).json({success:true,message:'single course view details data successfully loaded',data:courseDetails})
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"get student view course details something went wrong!"})
  }
}