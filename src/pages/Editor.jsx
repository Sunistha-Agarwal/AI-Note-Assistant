// src/pages/Editor.jsx
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import NoteEditor from "../components/NoteEditor";
import { updateNote, getNoteById } from "../services/firestoreService";
import { useAuth } from "../context/AuthContext";

export default function Editor() {
  const { user } = useAuth();
  const { noteId } = useParams(); //destructuring
  const [note, setNote] = useState({
    title: "Type your title here...",
    content: "Type your note content here...", // initial HTML content
  });
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    if (!user || !noteId) return;

    async function fetchNote() {
      const fetchedNote = await getNoteById(user.uid, noteId);
      console.log(fetchedNote);
      if (fetchedNote) {
        setNote({
          title: fetchedNote.title || "Untitled Note",
          content: fetchedNote.content || "No content yet.",
        });
        console.log("Updated Note State:", {
          title: fetchedNote.title || "Untitled Note",
          content: fetchedNote.content || "No content yet.",
        });
      }
    }

    fetchNote();
  }, [user, noteId]);

  // When TipTap updates the content, this is called
  const handleContentChange = (updatedHtml) => {
    setNote((prev) => ({ ...prev, content: updatedHtml }));
  };

  const handleSave = async () => {
   if (!user || !user.uid || !noteId) {
    setSaveStatus("error");
    return;
  }
    try {
    await updateNote(user.uid, noteId, {
      title: note.title,
      content: note.content,
    });
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus(""), 2000);
  } catch (error) {
    setSaveStatus("error");
    console.error("Failed to save note:", error);
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
