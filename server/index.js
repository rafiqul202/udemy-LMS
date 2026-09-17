import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./database/dbConnection.js";
import authRoute from "./routes/auth-routes/index.js";
import mediaRoute from "./routes/instructor-routes/media-routes.js";
import instructorCourseRoutes from "./routes/instructor-routes/course-routes.js";
import studentViewCourseRoutes from "./routes/student-routes/course-routes.js"
const app = express();
const port = process.env.PORT ?? 5000;
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// routes configuration .
app.use("/auth", authRoute);
app.use("/media", mediaRoute);
app.use("/instructor/course", instructorCourseRoutes)
app.use("/student/course",studentViewCourseRoutes)

app.use((error, req, res, next) => {
  console.log(error.stack);
  res.stack(500).json({
    success: false,
    message: "Something went wrong!",
  });
});
app.listen(port, async () => {
  await connectDB();
  console.log(`Example app listening on port ${port}`);
});
