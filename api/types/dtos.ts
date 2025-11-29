// ===============================================
// 1. INPUT DTO: Used when creating a new Note (POST /api/notes)
// ===============================================
/**
 * Data structure required by the API to create a new Note.
 * Note: It does NOT include server-generated fields like 'id' or 'createdAt'.
 */
export interface CreateNoteDto {
  /** The title of the new note. Required. */
  Title: string; 
  
  /** The content or body of the new note. Required. */
  Content: string;
}

// ===============================================
// 2. OUTPUT DTO: Used when the API returns a Note (GET, POST, PUT responses)
// ===============================================
/**
 * Data structure returned by the API after a successful operation (e.g., Get or Create).
 * This represents the complete, client-facing Note object.
 */
export interface NoteDto {
  /** The unique identifier of the note (set by the database). */
  Id: number; 
  
  /** The title of the note. */
  Title: string;
  
  /** The content of the note. */
  Content: string;
  
  /** The timestamp when the note was created (set by the server). */
  CreatedAt: string; // Using string to represent DateTime from C#
}

// ===============================================
// 3. INPUT DTO: Used when updating an existing Note (PUT /api/notes/{id})
// ===============================================
/**
 * Data structure used to update an existing Note.
 * Only includes fields that the client is allowed to modify.
 */
export interface UpdateNoteDto {
  /** The updated title of the note. Optional or Required based on your specific PUT logic. */
  Title?: string; 
  
  /** The updated content of the note. Optional or Required based on your specific PUT logic. */
  Content?: string;
}