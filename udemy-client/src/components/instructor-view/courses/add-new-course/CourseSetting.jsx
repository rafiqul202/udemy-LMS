import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const CourseSetting = () => {
  return (
    <Card className="max-h-full w-full">
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-3'>
          <Label>Upload Image</Label>
          <Input type="file" accept="image/*" className="mb-4 w-2/12"/>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseSetting