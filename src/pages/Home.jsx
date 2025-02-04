import React, { useState, useEffect } from 'react';
import NavbarComponent from '/src/Components/Navbar';
import FooterComponent from '/src/Components/Footer';
import banner from "/src/assets/banner1.jpg";
import '/main.css';

const Home = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent cart={cart} />
      <main className="flex-grow-1">
        {/* Sección Hero con superposición oscura */}
        <section
          className="hero-section text-white text-center d-flex align-items-center justify-content-center position-relative"
          style={{
            backgroundImage: "url(" + banner + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "70vh",
          }}
        >
          <div className="position-absolute w-100 h-100 bg-dark opacity-50"></div> {/* Superposición oscura */}
          <div className="container position-relative z-index-1">
            <h1 className="display-4 fw-bold mb-4">Bienvenido a la Mejor Tienda de Instrumentos Musicales</h1>
            <p className="lead mb-4">
              Encuentra la mejor calidad en guitarras, pianos, baterías y más.
            </p>
            <a href="catalogo" className="btn btn-primary btn-lg">
              Ver Productos
            </a>
          </div>
        </section>

        {/* Sección de Productos Destacados */}
        <section id="productos" className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-5">Productos Destacados</h2>
            <div className="row">
              {/* Tarjeta de producto 1 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img
                    src="/guitar.jpg"
                    className="card-img-top"
                    alt="Guitarra"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Guitarras</h5>
                    <p className="card-text">
                      Descubre nuestra amplia variedad de guitarras acústicas y eléctricas.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
              {/* Tarjeta de producto 2 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img
                    src="/piano.jpg"
                    className="card-img-top"
                    alt="Piano"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Pianos</h5>
                    <p className="card-text">
                      Pianos de cola y digitales para todos los niveles.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
              {/* Tarjeta de producto 3 */}
              <div className="col-md-4 mb-4">
                <div className="card h-100 shadow">
                  <img
                    src="/drums.jpg"
                    className="card-img-top"
                    alt="Batería"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Baterías</h5>
                    <p className="card-text">
                      Baterías acústicas y electrónicas para profesionales y principiantes.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Ver más
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterComponent />
    </div>
  );
};

export default Home;