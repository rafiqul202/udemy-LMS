import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VideoPlayer from "@/components/video-player";
import { StudentContext } from "@/context/student-context";
import { fetchStudentViewCourseDetailsService } from "@/services";
import {
  CheckCircle2,
  CreditCardPlus,
  Globe,
  LockIcon,
  PlayCircleIcon,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentViewCourseDetailsPage = () => {
  const { id } = useParams();
  const {
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId,
    setCurrentCourseDetailsId,
  } = useContext(StudentContext);
  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);

  const fetchStudentCourseDetails = async () => {
    const viewDetails = await fetchStudentViewCourseDetailsService(
      currentCourseDetailsId
    );
    // console.log("studnetViewCursedetils data",viewDetails)
    if (viewDetails.success) {
      setStudentViewCourseDetails(viewDetails.data);
    }
  };
  const handleFreePreview = (getCurrentVideoInfo) => {
    setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
  };

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) {
      setShowFreePreviewDialog(true);
    }
  }, [displayCurrentVideoFreePreview]);
  useEffect(() => {
    fetchStudentCourseDetails();
  }, [currentCourseDetailsId]);

  useEffect(() => {
    setCurrentCourseDetailsId(id);
  }, [id]);

  const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview
        )
      : -1;
  // console.log("freePreview", getIndexOfFreePreviewUrl);
  return (
    <div className="flex flex-col px-5">
      <div className="">
        <h1 className="text-4xl font-semibold text-gray-500">
          {studentViewCourseDetails?.title}
        </h1>
        <p className="text-sm">{studentViewCourseDetails?.subtitle}</p>
        <div className="font-medium flex items-center ">
          <span className="mr-1.5">
            Created By-{studentViewCourseDetails?.instructorName}
          </span>
          <span className="mr-1.5">
            Created On-{studentViewCourseDetails?.date.split("T")[0]}
          </span>
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-1.5" />
            <span className="mr-2">
              {studentViewCourseDetails?.primaryLanguage}
            </span>
            <span>
              {studentViewCourseDetails?.students?.length}{" "}
              {studentViewCourseDetails?.students?.length <= 1
                ? "Student"
                : "Students"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-8 ">
        <main className="flex-1">
          <Card className="p-8 w-full">
            <CardHeader>
              <CardTitle className="text-xl text-gray-600">
                What you'll learn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {studentViewCourseDetails?.objectives
                  .split(",")
                  .map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="mr-3 mb-2.5 h-5 w-5 text-green-500 shrink-0" />
                      {objective}
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>

          <Card className={"mb-8 mt-6"}>
            <CardHeader>
              <CardTitle className={"text-xl text-gray-500"}>
                Course Curricular
              </CardTitle>
            </CardHeader>
            <CardContent>
              {studentViewCourseDetails?.curriculum.map(
                (curriculumItem, index) => (
                  <li
                    key={index}
                    className={`${
                      curriculumItem?.freePreview
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    } flex items-center mb-4`}
                    onClick={
                      curriculumItem?.freePreview
                        ? () => handleFreePreview(curriculumItem)
                        : null
                    }
                  >
                    {curriculumItem?.freePreview ? (
                      <PlayCircleIcon className="mr-3 h-5 w-5" />
                    ) : (
                      <LockIcon className="mr-3 h-5 w-5 rounded-full opacity-30" />
                    )}
                    {curriculumItem.title}
                  </li>
                )
              )}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <Card className={"sticky top-3.5"}>
            <CardContent className={"p-3"}>
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    getIndexOfFreePreviewUrl !== -1
                      ? studentViewCourseDetails?.curriculum[
                          getIndexOfFreePreviewUrl
                        ].videoUrl
                      : ""
                  }
                  width="450px"
                  height="300px"
                />
              </div>
              <div className=" text-3xl mt-2 font-semibold text-gray-500">
                ${studentViewCourseDetails?.pricing}
              </div>
              <Button className={"w-full py-6 mt-3"} variant="destructive">
                <CreditCardPlus /> <span>By Now</span>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false),
            setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="sm:max-w-md md:max-w-4xl">
          <DialogHeader>
            <DialogTitle
              className={
                "text-2xl items-center mx-auto font-semibold text-gray-500"
              }
            >
              Course Preview
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
            <VideoPlayer
              url={displayCurrentVideoFreePreview}
              width="700px"
              height="450px"
            />
          </div>
          <DialogClose
            render={
              <Button type="button" className={"py-5"}>
                Close
              </Button>
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentViewCourseDetailsPage;
