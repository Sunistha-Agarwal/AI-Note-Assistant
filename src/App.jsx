import './styles/App.css'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewNote from './pages/NewNote';
import Editor from './pages/Editor';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/note/new" element={<NewNote/>}/>
        <Route path="/note/:id" element={<Editor/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
