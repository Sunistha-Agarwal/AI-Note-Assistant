// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router';
import { getAllNotes,deleteNote } from '../services/firestoreService';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const {user} = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  

  useEffect(() => {
    if(!user) return;

    async function fetchNotes() {
      const allNotes = await getAllNotes(user.uid);
      setNotes(allNotes);
      setLoading(false);
    }

    fetchNotes();
  }, [user]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
      </Link>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes found. <Link to="/note/new" className="text-blue-600 underline">Create one now</Link>.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notes.map(note => (
            <Link
              to={`/note/${note.id}`}
              key={note.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg mb-2">{note.title || 'Untitled Note'}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">
                {note.content?.slice(0, 100) || 'No content yet.'}
              </p>
              <button 
              onClick= {(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate("/dashboard")
                deleteNote(user.uid,note.id)
                setNotes(prevNotes => prevNotes.filter(n => n.id !== note.id))
              }}
                //arrow bcz w/o arrow the function is directly called when the comp renders not when it is clicked
          >
                Delete Note
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}