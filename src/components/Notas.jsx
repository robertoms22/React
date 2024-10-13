import React, { useState, useEffect } from 'react';

function Notas() {
  const [notas, setNotas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  // Cargar las notas desde el servidor cuando el componente se monta
  useEffect(() => {
    fetch('http://localhost:5000/notas')
      .then((response) => response.json())
      .then((data) => setNotas(data))
      .catch((error) => console.error('Error al obtener las notas:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNota = { title, date, description };

    try {
      if (editIndex !== null) {
        // Editar nota
        const updatedNota = await fetch(`http://localhost:5000/notas/${notas[editIndex]._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newNota),
        });
        const updatedData = await updatedNota.json();
        const updatedNotas = [...notas];
        updatedNotas[editIndex] = updatedData;
        setNotas(updatedNotas);
        setEditIndex(null);
      } else {
        // Añadir nueva nota
        const response = await fetch('http://localhost:5000/notas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newNota),
        });
        const data = await response.json();
        setNotas([...notas, data]); // Añadir nueva nota al estado
      }

      setTitle('');
      setDate('');
      setDescription('');
      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar la nota:', error);
    }
  };

  const handleEdit = (index) => {
    const nota = notas[index];
    setTitle(nota.title);
    setDate(nota.date);
    setDescription(nota.description);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    const notaId = notas[index]._id;
    try {
      await fetch(`http://localhost:5000/notas/${notaId}`, {
        method: 'DELETE',
      });
      const updatedNotas = notas.filter((_, i) => i !== index);
      setNotas(updatedNotas);
    } catch (error) {
      console.error('Error al eliminar la nota:', error);
    }
  };

  return (
    <section id="notas" className="form-section">
      <div className="section-header">
        <h2>Notas</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cerrar' : 'Añadir Nota'}
        </button>
      </div>

      {/* Listado de Notas */}
      <div className="notas-list">
        {notas.length > 0 ? (
          notas.map((nota, index) => (
            <div key={nota._id} className="nota-item">
              <strong>{nota.title}</strong> - {nota.date}
              <p>{nota.description}</p>
              <div className="button-group">
                <button onClick={() => handleEdit(index)}>Editar</button>
                <button className="button-delete" onClick={() => handleDelete(index)}>Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay notas registradas</p>
        )}
      </div>

      {/* Formulario de añadir/modificar nota */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input 
              type="text" 
              placeholder="Título" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Fecha</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              placeholder="Descripción" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          <button type="submit">{editIndex !== null ? 'Guardar Cambios' : 'Añadir Nota'}</button>
        </form>
      )}
    </section>
  );
}

export default Notas;
