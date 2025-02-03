import React, { useState } from 'react';
import '/main.css'; // Para incluir los estilos personalizados

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    direccion: '', // Nuevo campo agregado
    correo: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      alert('Formulario completado');
      console.log(formData);
    }
  };

  return (
    <div className="register-container">
      <div className="overlay">
        <h2 className="mb-4 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="form-container">
          {/* Paso 1: Datos Personales */}
          {step === 1 && (
            <>
              <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Apellido Paterno:</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido_paterno"
                  value={formData.apellido_paterno}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Apellido Materno:</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido_materno"
                  value={formData.apellido_materno}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Nuevo campo: Dirección */}
              <div className="mb-3">
                <label className="form-label">Dirección:</label>
                <input
                  type="text"
                  className="form-control"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Ejemplo: Calle 123, Colonia, Ciudad"
                  required
                />
              </div>
            </>
          )}

          {/* Paso 2: Datos de Cuenta */}
          {step === 2 && (
            <>
              <div className="mb-3">
                <label className="form-label">Correo Electrónico:</label>
                <input
                  type="email"
                  className="form-control"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña:</label>
                <input
                  type="password"
                  className="form-control"
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {step === 1 ? 'Continuar' : 'Registrar'}
          </button>
        </form>

        {/* Puntos para el progreso */}
        <div className="progress-dots">
          <span className={`dot ${step === 1 ? 'active' : ''}`}></span>
          <span className={`dot ${step === 2 ? 'active' : ''}`}></span>
        </div>
      </div>
    </div>
  );
}

export default Register;
