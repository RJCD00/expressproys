 // src/components/ViewEntry.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewEntry = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/entries/${id}`);
        setEntry(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEntry();
  }, [id]);

  if (!entry) return <div>Cargando...</div>;

  return (
    <main>
      <div className="card my-4">
        <div className="card-body">
          <h2 className="card-title">{entry.title}</h2>
          <p className="card-text text-muted">Creado el: {entry.createdAt}</p>
          <div className="card-text" dangerouslySetInnerHTML={{ __html: entry.content }}></div>
          <a href="/" className="btn btn-primary mt-3">Volver</a>
        </div>
      </div>
    </main>
  );
};

export default ViewEntry;
