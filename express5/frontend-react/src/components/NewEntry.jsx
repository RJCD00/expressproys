import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS con Popper.js
import 'summernote/dist/summernote-bs5.min.css'; // Summernote CSS
import 'summernote/dist/summernote-bs5.min.js'; // Summernote JS

const NewEntry = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      try {
        $(editorRef.current).summernote({
          height: 300,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
          ]
        });
      } catch (err) {
        console.error('Error al inicializar Summernote:', err);
      }
    }

    return () => {
      if (editorRef.current && $.fn.summernote) {
        $(editorRef.current).summernote('destroy');
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = $(editorRef.current).summernote('code');
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/entries`, { title, content });
      window.location.href = '/';
    } catch (err) {
      console.error('Error al guardar entrada:', err);
    }
  };

  return (
    <main>
      <h2 className="my-4">Nueva Entrada</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título:</label>
          <input type="text" id="title" name="title" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Contenido:</label>
          <div ref={editorRef} id="content"></div>
        </div>
        <button type="submit" className="btn btn-success">Guardar</button>
      </form>
    </main>
  );
};

export default NewEntry;
