import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaDeleteService, mediaUploadService } from "@/services";
import { CircleX, PlusCircleIcon, Replace } from "lucide-react";
import React, { useContext } from "react";

const CourseCurriculum = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  function handleAddNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  }

  const handleCourseTitleChange = (event, currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
    // console.log("copyCourseCurriculumFormData info", copyCourseCurriculumFormData);
  };
  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          videoFormData,
          setMediaUploadProgressPercentage
        );
        if (response.success) {
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log("singellactureUpload file upload failed!", error);
      }
    }
  }

  const handleReplaceVideo = async(currentIndex) => {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVidePublicId =
      cpyCourseCurriculumFormData[currentIndex].public_id;
    const deleteCurrentMediaResponse = await mediaDeleteService(getCurrentVidePublicId);
    if (deleteCurrentMediaResponse.success) {
      cpyCourseCurriculumFormData[currentIndex] = {
        ...cpyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id:""
      }
      setCourseCurriculumFormData(cpyCourseCurriculumFormData)
 }
  }
  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every(item => {
      return item && typeof item === "object" && item.title.trim() !== "" && item.videoUrl.trim() !== ""
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleAddNewLecture} disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}>
          {" "}
          <PlusCircleIcon /> Add Lecture{" "}
        </Button>

        <div className="space-y-3 mt-3 ">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index} className="p-5 rounded-md shadow-lg ">
              <div className="flex items-center space-x-5">
                <h3 className="font-semibold">Lecture -{index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  id="title"
                  className="w-6/12 py-6"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-5">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>
              <div className="mt-3">
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className="flex gap-3">
                    <VideoPlayer
                      url={courseCurriculumFormData[index]?.videoUrl}
                      width="700px"
                      height="400px"
                    />
                    <Button size="icon" onClick={()=> handleReplaceVideo(index)}>
                      <Replace />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="rounded-full"
                    >
                      <CircleX />
                    </Button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    className="mb-4 w-2/12"
                    onChange={(event) =>
                      handleSingleLectureUpload(event, index)
                    }
                  />
                )}
              </div>
              {mediaUploadProgress && (
                <MediaProgressBar
                  isMediaUploading={mediaUploadProgress}
                  progress={mediaUploadProgressPercentage}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
