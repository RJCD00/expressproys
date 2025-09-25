import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntryList from './components/EntryList';
import NewEntry from './components/NewEntry';
import ViewEntry from './components/ViewEntry';
import EditEntry from './components/EditEntry';

function App() {
  return (
    <Router>
      <div className="container">
        <header className="bg-primary text-white py-3 mb-4">
          <h1 className="text-center">Mi Diario</h1>
          <nav className="nav justify-content-center">
            <a className="nav-link text-white" href="/">Inicio</a>
            <a className="nav-link text-white" href="/new">Nueva Entrada</a>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<EntryList />} />
          <Route path="/new" element={<NewEntry />} />
          <Route path="/view/:id" element={<ViewEntry />} />
          <Route path="/edit/:id" element={<EditEntry />} />
        </Routes>
        <footer className="bg-light py-3 mt-4 text-center">
          <p>&copy; 2025 - mgfranciae</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
