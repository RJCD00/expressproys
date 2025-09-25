 
// src/components/EntryList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EntryList = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/entries`);
        setEntries(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEntries();
  }, []);

  const deleteEntry = async (id) => {
    if (window.confirm('¿Seguro?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/entries/${id}`);
        setEntries(entries.filter(entry => entry.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <main>
      <h2 className="my-4">Entradas Recientes</h2>
      {entries.length === 0 ? (
        <div className="alert alert-info">No hay entradas aún. ¡Crea una!</div>
      ) : (
        <div className="row">
          {entries.map(entry => (
            <div key={entry.id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">{entry.title}</h3>
                  <p className="card-text">Creado el: {entry.createdAt}</p>
                  <button onClick={() => navigate(`/view/${entry.id}`)} className="btn btn-primary btn-sm">Ver</button>
                  <button onClick={() => navigate(`/edit/${entry.id}`)} className="btn btn-secondary btn-sm mx-1">Editar</button>
                  <button onClick={() => deleteEntry(entry.id)} className="btn btn-danger btn-sm">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default EntryList;