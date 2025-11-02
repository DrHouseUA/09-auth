import type { Note, NoteTag } from "@/types/note";
import { nextServerAPI } from "./api";
import { User } from "@/types/user";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface UserData {
  email: string;
  password: string;
}

interface UserUpdatedData {
  email?: string;
  username: string;
}

export interface SessionResponse {
  success: boolean;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const response = await nextServerAPI.get<FetchNotesResponse>(`/notes`, {
    params,
  });
  return response.data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const response = await nextServerAPI.post<Note>("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServerAPI.delete<Note>(`/notes/${id}`);
  return response.data;
};

export async function getNoteById(id: string) {
  const res = await nextServerAPI.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function registerUser(userData: UserData): Promise<User> {
  const res = await nextServerAPI.post<User>("/auth/register", userData);
  return res.data;
}

export async function loginUser(userData: UserData): Promise<User> {
  const res = await nextServerAPI.post<User>("/auth/login", userData);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await nextServerAPI.post("/auth/logout");
}

export async function checkSession(): Promise<SessionResponse> {
  const res = await nextServerAPI.get("/auth/session");
  console.log("checksesion response:", res.data);
  return res.data;
}

export async function getUser(): Promise<User> {
  const res = await nextServerAPI.get("/users/me");
  return res.data;
}

export async function updateUser(userData: UserUpdatedData): Promise<User> {
  const res = await nextServerAPI.patch("/users/me", userData);
  return res.data;
}
