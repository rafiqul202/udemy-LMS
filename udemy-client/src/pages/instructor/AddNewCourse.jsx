import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/CourseCurriculum";
import CourseLanding from "@/components/instructor-view/courses/add-new-course/CourseLanding";
import CourseSetting from "@/components/instructor-view/courses/add-new-course/CourseSetting";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courseLandingInitialFormData } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { addNewCourseService, fetchInstructorCourseListDetailsServices, updateInstructorCourseByIdService } from "@/services";
import { Send } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddNewCoursePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);
  const { auth } = useContext(AuthContext);

  // console.log("addNew course params edite button click",params)
  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value == "" || value === null || value === undefined
  }
  const validatedFormData = () => {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }
    let hasFreePreview = false;
    for (const item of courseCurriculumFormData) {
      if (isEmpty(item.title) || isEmpty(item.videoUrl) || isEmpty(item.public_id)) {
        return false
      }
      if (item.freePreview) {
      hasFreePreview= true
    }
    }
    return hasFreePreview
  }


  async function handleCreateCourse() {
    const courseFinalFormdata = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
     ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublished: true,
    };
    const response = currentEditedCourseId !== null ? await updateInstructorCourseByIdService(currentEditedCourseId,courseFinalFormdata): await addNewCourseService(courseFinalFormdata);
    if (response.success) {
      setCourseCurriculumFormData(courseCurriculumFormData);
      setCourseLandingFormData(courseLandingFormData);
      navigate(-1)
      setCurrentEditedCourseId(null)
    }
  }

  //fetch the edit page

  const fetchCurrentCourseDetails = async () => {
    const response = await fetchInstructorCourseListDetailsServices(currentEditedCourseId);
    if (response.success) {
      const setCourseFormData = Object.keys(
        courseLandingInitialFormData
      ).reduce((acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key]
        return acc
      }, {});
      console.log("setcourseFormData ",response.data)
      setCourseLandingFormData(setCourseFormData)
      setCourseCurriculumFormData(response.data.curriculum);
   }
  }
  useEffect(() => {
 fetchCurrentCourseDetails()
},[currentEditedCourseId])

  useEffect(() => {
    if (params.courseId) {
      setCurrentEditedCourseId(params.courseId)
    }
  },[params.courseId])
  return (
    <div>
      <div className="flex justify-between mt-8 items-center mb-4">
        <h1 className="text-3xl font-semibold">Create a new course</h1>
        <Button
          disabled={!validatedFormData()}
          onClick={handleCreateCourse}
          className="text-sm tracking-wide font-bold px-8 uppercase cursor-pointer hover:bg-gray-300 border-gray-400"
          variant="outline"
        >
          <Send/>
          {currentEditedCourseId !== null ? "updating" : "submit"}
        </Button>
      </div>
      <Card>
        <CardContent>
          <Tabs defaultValue="curriculum" className="space-y-4">
            <TabsList variant="line">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="course-landing-page">
                Course-Landing-Page
              </TabsTrigger>
              <TabsTrigger value="setting">Setting</TabsTrigger>
            </TabsList>
            <TabsContent value="curriculum">
              <CourseCurriculum/>
            </TabsContent>
            <TabsContent value="course-landing-page">
            <CourseLanding/>
            </TabsContent>
            <TabsContent value="setting">
            <CourseSetting/>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCoursePage;
