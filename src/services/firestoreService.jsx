// src/services/noteService.js
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';

const notesRef = collection(db, 'notes');
console.log(notesRef)

export const createNote = async (initialData = {}) => {
  const noteData = {
    content: '',
    title: '',
    createdAt: Date.now(),
    ...initialData,
  };
  const docRef = await addDoc(notesRef, noteData);
  console.log(noteData);
  console.log(docRef)
  return docRef.id;
};

export const getNoteById = async (id) => {
  const docSnap = await getDoc(doc(db, 'notes', id));
  console.log(docSnap)
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getAllNotes = async () => {
  const q = query(notesRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  console.log(q)
  console.log(snapshot)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateNote = async (id, updatedData) => {
  const noteDoc = doc(db, 'notes', id);
  console.log(noteDoc)
  await updateDoc(noteDoc, updatedData);
};

export const deleteNote = async (id) => {
  await deleteDoc(doc(db, 'notes', id));
};
