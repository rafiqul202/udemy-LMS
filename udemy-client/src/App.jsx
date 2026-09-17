import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/auth";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import RouteGuard from "./components/route-guard";
import InstructorDashBoardPage from "./pages/instructor/dashboard";
import StudentViewCommonLayout from "./components/student-view/StudentViewCommonlayout";
import StudentHomePage from "./pages/student/home";
import NotFound from "./components/NotFound";
import AddNewCoursePage from "./pages/instructor/AddNewCourse";
import StudentViewCoursesPage from "./pages/student/courses";

function App() {
  const { auth } = useContext(AuthContext);

  console.log("app auth info ", auth);
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashBoardPage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticated}
            user={auth?.user}
          />
        }
      >
        <Route path="home" element={<StudentHomePage />} />
        <Route path="courses" element={<StudentViewCoursesPage />} />
        <Route path="" element={<StudentHomePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
