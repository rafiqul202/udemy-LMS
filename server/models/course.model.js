import mongoose, { Schema } from "mongoose";

const LectureSchema = new Schema({
  title: String,
  videoUrl: String,
  public_id: String,
  freePreview: Boolean,
});
const CourseSchema = new Schema({
  instructorId: String,
  instructorName: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: String,
  image: String,
  welcomeMessage: String,
  pricing: Number,
  objectives: String,
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
      paidAmount: String,
    },
  ],
  curriculum: [LectureSchema],
  isPublished: Boolean,
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;