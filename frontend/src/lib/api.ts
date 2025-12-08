import API from "@/config/apiClient";

export const getUser = () => API.get("/user")