// src/components/Navbar.jsx
import { Link, useLocation } from "react-router";
import { signIn,signOutUser } from "../../firebase";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const navLinkClass = (path) =>
    `px-4 py-2 rounded hover:bg-gray-100 ${
      pathname === path ? "text-blue-600 font-semibold" : "text-gray-700"
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          FlairNote
        </Link>
        <div className="flex gap-4">
          <Link to="/dashboard" className={navLinkClass("/")}>
            Dashboard
          </Link>
           <Link to="/note/new" className={navLinkClass("/note/new")}>
            New Note
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <img src={user.photoURL} className="h-8 w-8 rounded-full" />
              <span>{user.displayName}</span>
              <button onClick={signOutUser}>Sign Out</button>
            </div>
          ) : (
            <button onClick={signIn}>Sign In with Google</button>
          )}
        </div>
      </div>
    </nav>
  );
}
