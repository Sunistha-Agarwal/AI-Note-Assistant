# FlairNotes

FlairNotes is an intelligent note-taking web application designed to help users create, manage, and organize notes efficiently using AI-powered features.

## Features

- **Create, Edit, and Delete Notes:** Manage your notes with a simple and intuitive interface.
- **AI-Powered Summaries:** Get smart summaries for your notes using Gemini API.
- **User Authentication:** Secure login and registration with Firebase Authentication.
- **Rich Text Editing:** Write and format notes with Tiptap editor.
- **Responsive Design:** Works seamlessly across devices.

## Tech Stack

### Frontend

- **React.js:** Modern UI development.
- **Context API:** State management.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Tiptap:** Rich text editor for notes.

### Backend & Services

- **Firebase:** Backend as a Service (BaaS) for authentication and hosting.
- **Firestore:** NoSQL cloud database for storing notes and user data.
- **Gemini API:** AI-powered note summaries.


## Key Functions

- `createNote`: Add a new note to Firestore.
- `editNote`: Update an existing note in Firestore.
- `deleteNote`: Remove a note from Firestore.
- `getNotes`: Retrieve all notes for a user.
- `summarizeNote`: Generate AI-powered summaries using Gemini API.
- `registerUser` / `loginUser`: User authentication with Firebase.
