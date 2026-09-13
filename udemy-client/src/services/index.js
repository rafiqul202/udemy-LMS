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

export async function mediaUploadService(formData,onProgressCallback) {
  const { data } = await axiosInstance.post(`/media/upload`, formData, {
    onUploadProgress: (progressEvent => {
      const progressCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onProgressCallback(progressCompleted);
    })
  });
  return data;
}