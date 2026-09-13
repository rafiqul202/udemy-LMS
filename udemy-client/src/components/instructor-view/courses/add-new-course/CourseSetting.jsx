import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InstructorContext } from '@/context/instructor-context'
import { mediaUploadService } from '@/services'
import React, { useContext } from 'react'

const CourseSetting = () => {
  const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext)
  const handleImageUploadChange = async (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file",selectedImage)
      try {
        const response = await mediaUploadService(imageFormData);
      //  console.log("setting Image data response",response)
        if (response.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image:response?.data?.url
          });
        }
      } catch (error) {
        console.log("courseSetting image upload error",error)
      }
    }
  }

  console.log("course setting data",courseLandingFormData)
  return (
    <Card className="max-h-full w-full">
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {
          courseLandingFormData?.image ? <img src={courseLandingFormData?.image} className='w-5/12 h-96 rounded-md' />
            :
            <div className='flex flex-col gap-3'>
              <Label>Upload Image</Label>
              <Input onChange={handleImageUploadChange} type="file" accept="image/*" className="mb-4 w-2/12" />
            </div>}
      </CardContent>
    </Card>
  )
}

export default CourseSetting