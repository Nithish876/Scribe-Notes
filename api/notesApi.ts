import { CreateNoteDto, NoteDto } from "@/api/types/dtos";
import axios from "axios";
const api = axios.create({ baseURL: "http://192.168.29.36:9743" });

export const fetchNotes = async () => {
  const response = await api.get("/api");
  return response.data;
};

export const fetchNoteById = async (id: number): Promise<NoteDto> => {
  const response = await api.get(`/api/${id}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<NoteDto> => {
  const response = await api.post("/api/create-note", noteData);
  return response.data;
};
