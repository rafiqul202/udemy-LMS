import { courseCategories } from "@/config";
import banner from "../../../assets/banner-1.jpg"
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import { fetchStudentViewCourseListService } from "@/services";
const StudentHomePage = () => {
  const { studentViewCoursesList, setStudentViewCourseList } = useContext(StudentContext);
  const fetchAllStudentCourses = async () => {
    const allStudentCourses = await fetchStudentViewCourseListService();
  
    if (allStudentCourses.success) {
      setStudentViewCourseList(allStudentCourses?.data)
    }
  }
  useEffect(() => {
    fetchAllStudentCourses()
  }, [])
  
  // console.log("all student courser",studentViewCoursesList)

  return (
    <div className="min-h-screen">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-4xl font-bold mb-3 text-gray-500">
            Learning that gets you
          </h1>
          <p className="text-md text-gray-400">
            Skills Yur for your present and your future. Get Started with us
          </p>
        </div>
        <div className="lg:w-full mb-6 lg:mb-0">
          <img
            src={banner}
            width={600}
            height={400}
            className="w-9/12 shadow-lg rounded-md"
          />
        </div>
      </section>
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courseCategories.map((category) => (
            <Button
              variant="outline"
              className="justify-start border-gray-300 py-6"
              key={category.id}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </section>
      <section className="py-10">
        <h1 className="text-4xl font-bold mb-3 text-gray-500">
          Feature Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((listItem) => (
              <div
                key={listItem._id}
                className="border-gray-400 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
              >
                <img
                  src={listItem?.image}
                  height={150}
                  width={400}
                  className="object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-500 line-clamp-1">{listItem.title}</h3>
                  <p className="text-sm text-gray-700 ">{listItem?.instructorName}</p>
                  <p className="font-extrabold text-xl">${listItem?.pricing }</p>
                </div>
              </div>
            ))
          ) : (
            <p>No course found !</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage