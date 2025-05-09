// src/pages/NewNote.jsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNote } from '../services/firestoreService';

export default function NewNote() {
  const navigate = useNavigate();
  const isCreated = useRef(false);

  useEffect(() => {
    async function createAndRedirect() {
      if(useRef.current) return;

      useRef.current = true;

      const newNoteId = await createNote();
      // navigate(`/note/${newNoteId}`);
      navigate('/')
    }

    createAndRedirect();
  }, [navigate]);

  return <p className="p-4">Creating your new note...</p>;
}
