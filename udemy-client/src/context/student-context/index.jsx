import { createContext, useState } from "react";


export const StudentContext = createContext(null);


const StudentProvider = ({ children }) => {
  const [studentViewCoursesList, setStudentViewCourseList] = useState([]);
  const [studentViewCourseDetails, setStudentViewCourseDetails] = useState(null);
  const [currentCourseDetailsId , setCurrentCourseDetailsId] = useState(null)
  return (
    <StudentContext.Provider
      value={{
        studentViewCoursesList,
        setStudentViewCourseList,
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        currentCourseDetailsId,
        setCurrentCourseDetailsId,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export default StudentProvider;