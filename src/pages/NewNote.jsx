// src/pages/NewNote.jsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { createNote } from '../services/firestoreService';
import { useAuth } from '../context/AuthContext';

export default function NewNote() {
  const {user} = useAuth(); 
  const navigate = useNavigate();
  const isCreated = useRef(false);

  useEffect(() => {
    async function createAndRedirect() {
      if(useRef.current) return;

      useRef.current = true;

      const newNoteId = await createNote(user.uid);
      navigate(`/note/${newNoteId}`);
    }

    createAndRedirect();
  }, [navigate]);

  return <p className="p-4">Creating your new note...</p>;
}
