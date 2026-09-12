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
