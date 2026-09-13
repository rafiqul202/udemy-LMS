import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/CourseCurriculum";
import CourseLanding from "@/components/instructor-view/courses/add-new-course/CourseLanding";
import CourseSetting from "@/components/instructor-view/courses/add-new-course/CourseSetting";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const AddNewCoursePage = () => {
  return (
    <div>
      <div className="flex justify-between mt-8 items-center">
        <h1 className="text-3xl font-semibold mb-5">Create a new course</h1>
        <Button
          className="text-sm tracking-wide font-bold px-8 uppercase cursor-pointer hover:bg-gray-300 border-gray-400"
          variant="outline"
        >
          submit
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
