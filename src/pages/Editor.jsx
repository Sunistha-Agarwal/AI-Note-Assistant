// src/pages/Editor.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NoteEditor from '../components/NoteEditor'; 
import { updateNote,getNoteById } from '../services/firestoreService';

export default function Editor() {
  const { id } = useParams();//destructuring
  const [note, setNote] = useState({
    title:"Type your title here...",
    content:"Type your note content here...", // initial HTML content
  });

  useEffect(() => {
    async function fetchNote(){
      const fetchedNote = await getNoteById(id);
      console.log(fetchedNote);
      if(fetchedNote){
        setNote({
          title: fetchedNote.title || "Untitled Note",
          content: fetchedNote.content || "No content yet."
        })
        console.log('Updated Note State:', {
    title: fetchedNote.title || "Untitled Note",
    content: fetchedNote.content || "No content yet.",
  });
      }
    }

    fetchNote()
  },[id])

  // When TipTap updates the content, this is called
  const handleContentChange = (updatedHtml) => {
    setNote((prev) => ({ ...prev, content: updatedHtml }));
  };

  const handleSave = async() => {
    console.log('Saving to Firebase:', note);
    await updateNote(id, {
    title: note.title,
    content: note.content, // HTML string from TipTap
});
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <input
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className="w-full text-2xl font-semibold border-b mb-4"
        placeholder="Note Title"
      />

      <NoteEditor content={note.content} onChange={handleContentChange} />

      <button onClick={handleSave} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
}
