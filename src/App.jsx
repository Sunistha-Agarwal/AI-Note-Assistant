import './styles/App.css'
import { Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard';
import NewNote from './pages/NewNote';
import Editor from './pages/Editor';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import { useAuth } from './context/AuthContext';


function App() {

  const {user} = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/dashboard" element={user?(<Dashboard/>):(<p>Sign in to view Dashboard</p>)}/>
        <Route path="/note/new" element={user?(<NewNote/>):(<p>Sign In to create a new Note</p>)}/>
        <Route path="/note/:id" element={<Editor/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
