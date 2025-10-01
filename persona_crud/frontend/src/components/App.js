import React, { useState, useEffect } from "react";

function App() {
    const [personas, setPersonas] = useState([]);
    const [form, setForm] = useState({ rut: "", nombre: "", edad: "", genero: "" });

    useEffect(() => {
        fetch("http://localhost:8000/personas/")
            .then(res => res.json())
            .then(data => setPersonas(data));
    }, []);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        fetch("http://localhost:8000/personas/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        .then(res => res.json())
        .then(data => {
            setPersonas([...personas, data]);
            setForm({ rut: "", nombre: "", edad: "", genero: "" });
        });
    };

    const handleDelete = rut => {
        fetch(`http://localhost:8000/personas/${rut}`, { method: "DELETE" })
            .then(() => setPersonas(personas.filter(p => p.rut !== rut)));
    };

    return (
        <div>
            <h1>CRUD Persona</h1>
            <form onSubmit={handleSubmit}>
                <input name="rut" value={form.rut} onChange={handleChange} placeholder="RUT" required />
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
                <input name="edad" type="number" value={form.edad} onChange={handleChange} placeholder="Edad" required />
                <input name="genero" value={form.genero} onChange={handleChange} placeholder="Género" required />
                <button type="submit">Agregar</button>
            </form>
            <ul>
                {personas.map(p => (
                    <li key={p.rut}>
                        {p.nombre} ({p.edad}, {p.genero}) <button onClick={() => handleDelete(p.rut)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;