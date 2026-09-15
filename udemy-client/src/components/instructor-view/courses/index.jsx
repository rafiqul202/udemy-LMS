import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit, PlusCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const InstructorCourses = ({ listOfCourses }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-2xl font-extrabold">All Courses</CardTitle>
        <Button
          variant="icon"
          className="border-2 border-gray-300 p-4 cursor-pointer"
          onClick={() => navigate("/instructor/create-new-course")}
        >
          {" "}
          <PlusCircle /> <span>Create Course</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0 ? (
                listOfCourses.map((course) => (
                  <TableRow>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>{course?.students?.length}</TableCell>
                    <TableCell>${course?.pricing}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer hover:bg-gray-200 mr-0.5"
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <p>No Course Available</p>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstructorCourses;
