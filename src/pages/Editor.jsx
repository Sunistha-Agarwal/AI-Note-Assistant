// src/pages/Editor.jsx
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import NoteEditor from "../components/NoteEditor";
import { updateNote, getNoteById } from "../services/firestoreService";
import { useAuth } from "../context/AuthContext";

export default function Editor() {
  const { user } = useAuth();
  const { id } = useParams();
  //while destructuring variable name should be equal to what is there in object
  //id refers to the noteId
  const [note, setNote] = useState({
    title: "Type your title here...",
    content: "Type your note content here...", // initial HTML content
  });
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    if (!user || !id) return;

    async function fetchNote() {

      const fetchedNote = await getNoteById(user.uid, id);
      if (fetchedNote) {
        setNote({
          title: fetchedNote.title || "Untitled Note",
          content: fetchedNote.content || "No content yet.",
        });
      }
    }

    fetchNote();
  }, [user, id]);

  // When TipTap updates the content, this is called
  const handleContentChange = (updatedHtml) => {
    setNote((prev) => ({ ...prev, content: updatedHtml }));
  };

  const handleSave = async () => {
   if (!user || !user.uid || !id) {
    setSaveStatus("error");
    return;
  }
    try {
    await updateNote(user.uid, id, {
      title: note.title,
      content: note.content,
    });
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 2000);
  } catch (error) {
    setSaveStatus("error");
  }
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

      <button
        onClick={handleSave}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
      {saveStatus === "error" && (
        <div className="mt-2 text-red-600">
          Cannot save: User not logged in or note not found.
        </div>
      )}
      {saveStatus === "saving" && (
        <div className="mt-2 text-yellow-600">Saving...</div>
      )}
      {saveStatus === "saved" && (
        <div className="mt-2 text-green-600">Note saved!</div>
      )}
    </div>
  );
}
