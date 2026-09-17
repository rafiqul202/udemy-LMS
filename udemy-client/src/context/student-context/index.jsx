import { createContext, useState } from "react";


export const StudentContext = createContext(null);


const StudentProvider = ({ children }) => {
  const [studentViewCoursesList, setStudentViewCourseList] = useState([]);
  return (
    <StudentContext.Provider
      value={{ studentViewCoursesList, setStudentViewCourseList }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export default StudentProvider;