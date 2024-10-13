import React, { useState, useEffect } from 'react';

function HorasExtras() {
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');

  // Cargar las horas extras desde el servidor
  useEffect(() => {
    fetch('http://localhost:5000/horasextras')
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((error) => console.error('Error al obtener horas extras:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecord = { title, date, hours };

    try {
      if (editIndex !== null) {
        // Editar hora extra
        const updatedRecord = await fetch(`http://localhost:5000/horasextras/${records[editIndex]._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
        });
        const updatedData = await updatedRecord.json();
        const updatedRecords = [...records];
        updatedRecords[editIndex] = updatedData;
        setRecords(updatedRecords);
        setEditIndex(null);
      } else {
        // Añadir nueva hora extra
        const response = await fetch('http://localhost:5000/horasextras', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
        });
        const data = await response.json();
        setRecords([...records, data]);  // Añadir nuevo registro al estado
      }

      setTitle('');
      setDate('');
      setHours('');
      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar la hora extra:', error);
    }
  };

  const handleEdit = (index) => {
    const record = records[index];
    setTitle(record.title);
    setDate(record.date);
    setHours(record.hours);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    const recordId = records[index]._id;
    try {
      await fetch(`http://localhost:5000/horasextras/${recordId}`, {
        method: 'DELETE',
      });
      const updatedRecords = records.filter((_, i) => i !== index);
      setRecords(updatedRecords);
    } catch (error) {
      console.error('Error al eliminar la hora extra:', error);
    }
  };

  return (
    <section id="horas-extras" className="form-section">
      <div className="section-header">
        <h2>Horas Extras</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cerrar' : 'Añadir Hora Extra'}
        </button>
      </div>

      {/* Listado de Horas Extras */}
      <div className="records-list">
        {records.length > 0 ? (
          records.map((record, index) => (
            <div key={record._id} className="record-item">
              <strong>{record.title}</strong> - {record.date} - {record.hours} horas
              <div className="button-group">
                <button onClick={() => handleEdit(index)}>Editar</button>
                <button className="button-delete" onClick={() => handleDelete(index)}>Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay horas extras registradas</p>
        )}
      </div>

      {/* Formulario de añadir/modificar horas extras */}
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
            <label>Horas trabajadas</label>
            <input 
              type="number" 
              placeholder="Horas trabajadas" 
              value={hours} 
              onChange={(e) => setHours(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">{editIndex !== null ? 'Guardar Cambios' : 'Añadir Hora Extra'}</button>
        </form>
      )}
    </section>
  );
}

export default HorasExtras;
