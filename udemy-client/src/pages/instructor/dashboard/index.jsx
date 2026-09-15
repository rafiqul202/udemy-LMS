import axiosInstance from "@/api/axiosInstanse";
import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashBoardView from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListServices } from "@/services";
import { BarChart, BookCheck, LogOut } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";


const InstructorDashBoardPage = () => {
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCourseList, setInstructorCourseList } = useContext(InstructorContext);
  const [activeTabs, setActiveTabs] = useState("dashboard");

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashBoardView />,
    },
    {
      icon: BookCheck,
      label: "Courses",
      value: "course",
      component: <InstructorCourses listOfCourses={instructorCourseList} />,
    },
    {
      icon: LogOut,
      label: "Log-out",
      value: "logout",
      component: null,
    },
  ];
  


  const fetAllCourses = async () => {
    const response = await fetchInstructorCourseListServices();
    if (response.success) {
      setInstructorCourseList(response?.data)
    }

}
  useEffect(() => {
    fetAllCourses();
  }) 
  const handleLogOut = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <div className="flex min-h-screen pt-12">
      <aside className="w-3/12 bg-gray-300 shadow-md hidden md:block rounded-t-md">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Instructor View</h1>
        </div>
        <nav className="flex flex-col px-4">
          {menuItems.map((menuItem) => (
            <Button
              className="justify-start mb-2 w-10/12 py-7 px-3 cursor-pointer text-gray-900 border-none"
              size="icon"
              variant={activeTabs === menuItem.value ? "outline" : "ghost"}
              onClick={
                menuItem.value === "logout"
                  ? handleLogOut
                  : () => setActiveTabs(menuItem.value)
              }
            >
              <menuItem.icon className="mr-2 h-4 w-4" />
              {menuItem.label}
            </Button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col mx-auto w-9/12 overflow-y-auto px-8">
        <div className="mx-auto w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">DashBoard</h1>
          <Tabs value={activeTabs} onValueChange={setActiveTabs}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default InstructorDashBoardPage;
