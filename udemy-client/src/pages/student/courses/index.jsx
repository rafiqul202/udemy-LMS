import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { filterOptions, sortOptions } from "@/config";
import { StudentContext } from "@/context/student-context";
import { fetchStudentViewCourseListService } from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const createSearchParamsFilter = (filterArrayData) => {
  let queryParams = [];
  for (const [key, value] of Object.entries(filterArrayData)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramsValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramsValue)}`);
    }
  }
  return queryParams.join("&");
};
const StudentViewCoursesPage = () => {
  const navigate = useNavigate();
  const { studentViewCoursesList, setStudentViewCourseList } =
    useContext(StudentContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});

  const handleFilerChange = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    const indexOfCourseSection = Object.keys(cpyFilters).indexOf(getSectionId);
    if (indexOfCourseSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  };
  const fetchAllStudentCourses = async (filters, sort) => {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const allStudentCourses = await fetchStudentViewCourseListService(query);

    if (allStudentCourses.success) {
      setStudentViewCourseList(allStudentCourses?.data);
    }
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    if (JSON.parse(sessionStorage.getItem("filters") !== null)) {
      setFilters(JSON.parse(sessionStorage.getItem("filters")));
    }
  }, []);
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);
  useEffect(() => {
    const buildQueryStringForFilter = createSearchParamsFilter(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilter));
  }, [filters]);
  useEffect(() => {
    if (filters !== null && sort !== null) {
      fetchAllStudentCourses(filters, sort);
    }
  }, [filters, sort]);
  // console.log("student View course", studentViewCoursesList);
  console.log("session Storage", JSON.parse(sessionStorage.getItem("filters")));
  // filters checked;

  return (
    <div className="px-8">
      <h1 className="text-3xl font-bold text-gray-500 mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div className="gap-4">
            {Object.keys(filterOptions).map((keyItems) => (
              <div className="pb-4 gap-y-3.5" key={keyItems.id}>
                <h3 className="font-bold mb-4">{keyItems.toUpperCase()}</h3>
                <div className="grid gap-2 mt-2">
                  {filterOptions[keyItems].map((option) => (
                    <Label
                      className="flex font-medium items-center gap-3"
                      key={option.id}
                    >
                      <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItems] &&
                          filters[keyItems].indexOf(option.id) > -1
                        }
                        onCheckedChange={() =>
                          handleFilerChange(keyItems, option)
                        }
                        className="border-gray-400"
                      />
                      {option.label}
                    </Label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-300 shadow-lg text-gray-700 flex items-center p-4 cursor-pointer"
                >
                  <ArrowUpDownIcon className="h-4 w-4" /> <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      key={sortItem.id}
                      value={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-gray-500">{studentViewCoursesList.length} Results</span>
          </div>
          <div className="space-y-4">
            {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
              studentViewCoursesList.map((courseList) => (
                <Card key={courseList._id} onClick={() => navigate(`/course/details/${courseList._id}`)} className="cursor-pointer">
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-35 shrink-0">
                      <img
                        src={courseList.image}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-500">
                        {courseList.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-1">
                        Created By-
                        <span className="font-semibold">
                          {courseList?.instructorName}
                        </span>
                      </p>
                      <p className="text-[18px] text-gray-400 ">
                        {`${courseList?.curriculum.length} ${
                          courseList?.curriculum?.length <= 1
                            ? "Lecture"
                            : "Lectures"
                        } - ${courseList.level.toUpperCase()} Level`}
                      </p>
                      <p className="text-lg text-gray-600 mt-2.5 font-semibold">
                        ${courseList.pricing}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="flex justify-center items-center text-4xl font-semibold">
                No course found !
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentViewCoursesPage;
