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


const userNotesRef = (userId) => collection(db, 'users',userId,'notes');

export const createNote = async (userId,initialData = {}) => {
  const noteData = {
    content: '',
    title: '',
    createdAt: Date.now(),
    ...initialData,
  };
  const docRef = await addDoc(userNotesRef(userId), noteData);
  return docRef.id;
};

export const getNoteById = async (userId,noteId) => {
  const docSnap = await getDoc(doc(db, 'users',userId,'notes', noteId));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getAllNotes = async (userId) => {
  const q = query(userNotesRef(userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateNote = async (userId,noteId, updatedData) => {
  const noteDoc = doc(db, 'users',userId,'notes', noteId);
  await updateDoc(noteDoc, updatedData);
};

export const deleteNote = async (userId,noteId) => {
  await deleteDoc(doc(db, 'users',userId,'notes', noteId));
};
