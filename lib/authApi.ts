import axios from "axios";

const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

interface UserData {
  email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  avatar: string;
}

interface SessionResponse {
  success: boolean;
}

export async function registerUser(userData: UserData): Promise<User> {
  const res = await nextServer.post<User>("/auth/register", userData);
  return res.data;
}

export async function loginUser(userData: UserData): Promise<User> {
  const res = await nextServer.post<User>("/auth/login", userData);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function checkSession(): Promise<SessionResponse> {
  const res = await nextServer.get("/auth/session");
  if (res.status === 200) {
    return { success: true };
  }
  return { success: false };
}
