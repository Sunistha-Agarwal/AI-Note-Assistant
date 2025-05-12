// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router';

export default function Navbar() {
  const { pathname } = useLocation();

  const navLinkClass = (path) =>
    `px-4 py-2 rounded hover:bg-gray-100 ${
      pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700'
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          AI Note Assistant
        </Link>
        <div className="flex gap-4">
          <Link to="/" className={navLinkClass('/')}>
            Dashboard
          </Link>
          <Link to="/note/new" className={navLinkClass('/note/new')}>
            New Note
          </Link>
        </div>
      </div>
    </nav>
  );
}
