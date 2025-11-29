// src/hooks/useNotes.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNote, fetchNoteById, fetchNotes } from '../api/notesApi';

const NOTE_QUERY_KEY = ['notes'];  

export const useGetNotes = () => { 
    return useQuery({
        queryKey: NOTE_QUERY_KEY,
        queryFn: fetchNotes,
    });
};

export const useGetNoteById = (id:number) => { 
    return useQuery({
        queryKey: [...NOTE_QUERY_KEY,id],
        queryFn:()=> fetchNoteById(id),
    });
};


export const useCreateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNote,
       
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTE_QUERY_KEY });
        },
    });
};