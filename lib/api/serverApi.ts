import { Note } from "@/types/note";
import { nextServerAPI } from "./api";
import { FetchNotesParams, FetchNotesResponse } from "./clientApi";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServerAPI.get<FetchNotesResponse>(`/notes`, {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export async function getNoteById(id: string) {
  const cookieStore = await cookies();
  const res = await nextServerAPI.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function getServerUser(): Promise<User> {
  const cookieStore = await cookies();
  const res = await nextServerAPI.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const res = await nextServerAPI.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
}
