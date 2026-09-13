import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { InstructorContext } from "@/context/instructor-context";
import { PlusCircleIcon } from "lucide-react";
import React, { useContext } from "react";

const CourseCurriculum = () => {
  const { courseCurriculumFormData, setCourseCurriculumFormData } =
    useContext(InstructorContext);
  
  const handleAddNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumFormData[0]
      }
    ])
  }

  console.log("coursecFData", courseCurriculumFormData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleAddNewLecture} >
          {" "}
          <PlusCircleIcon /> Add Lecture{" "}
        </Button>
        <div className="space-y-3 mt-3 ">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index} className="border border-gray-400 p-4 rounded-md">
              <div className="flex items-center space-x-5">
                <h3 className="font-semibold">Lecture -{index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  id="title"
                  className="w-6/12 py-6"
                />
                <div className="flex items-center space-x-5">
                  <Switch checked={false} id={`freePreview- ${index + 1}`} />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-3">
                <Input type="file" accept="video/*" className="mb-4 w-2/12" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
