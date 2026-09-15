import axiosInstance from "@/api/axiosInstanse";

export async function registerServices(formData) {
  const data = await axiosInstance.post("/auth/register", { ...formData });
  return data.data;
}

export async function loginServices(formData) {
  const data = await axiosInstance.post("/auth/login", formData);
  return data.data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post(`/media/upload`, formData, {
    onUploadProgress: (progressEvent) => {
      const progressCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(progressCompleted);
    },
  });
  return data;
}

export async function mediaDeleteService(publicId) {
  const { data } = await axiosInstance.delete(`media/delete/${publicId}`);
  return data;
}

export async function fetchInstructorCourseListServices() {
  const { data } = await axiosInstance.get("/instructor/course/get")
  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/instructor/course/add/`, formData);
  return data;
}

export async function fetchInstructorCourseListDetailsServices(params) {
  const {data} = await axiosInstance.get(`/instructor/course/details/${params}`)
}


export async function updateInstructorCourseByIdService(params,formData) {
  const { data } = await axiosInstance.put(`/instructor/course/updata/${params}`, formData);
  return data;
}