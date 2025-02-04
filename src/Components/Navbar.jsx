import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/src/assets/logo1.png';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const token = localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#0000' }}>
      <div className="container-fluid">
        <div className="row w-100 align-items-center">
          <div className="col-4 d-flex justify-content-start">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Logo" style={{ height: '80px' }} />
            </Link>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <ul className="navbar-nav d-flex align-items-center gap-3">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                {token ? (
                  <LogoutButton />
                ) : (
                  <Link className="btn btn-primary btn-sm text-white" to="/login" style={{ padding: '5px 10px', fontSize: '14px' }}>Iniciar Sesión</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;