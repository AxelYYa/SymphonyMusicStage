import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import NavbarComponent from "/src/Components/Navbar";
import FooterComponent from "/src/Components/Footer";

const pedidosIniciales = [
  {
    id: 1,
    cliente: "Juan Pérez",
    direccion: "Av. Revolución 123",
    estado: "Pendiente",
    fecha: "2023-10-01",
    repartidor: "Sin asignar",
    detalles: {
      imagen: "/images/guitarra.jpg",
      nombre: "Guitarra Acústica Fender",
      descripcion: "Guitarra de madera de alta calidad con un sonido excepcional.",
    },
  },
  {
    id: 2,
    cliente: "Ana López",
    direccion: "Calle 5 de Mayo 456",
    estado: "En camino",
    fecha: "2023-10-02",
    repartidor: "Carlos Gómez",
    detalles: {
      imagen: "/images/teclado.jpg",
      nombre: "Teclado Yamaha PSR-E373",
      descripcion: "Teclado digital con 61 teclas y funciones avanzadas.",
    },
  },
  {
    id: 3,
    cliente: "Carlos Ramírez",
    direccion: "Blvd. Agua Caliente 789",
    estado: "Entregado",
    fecha: "2023-10-03",
    repartidor: "Luisa Martínez",
    detalles: {
      imagen: "/images/bateria.jpg",
      nombre: "Batería Pearl Export",
      descripcion: "Set completo de batería acústica con platillos incluidos.",
    },
  },
];

const AdminDashboard = () => {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [showModal, setShowModal] = useState(false);
  const [detallesPedido, setDetallesPedido] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const verDetalles = (detalles) => {
    setDetallesPedido(detalles);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const pedidosFiltrados =
    filtroEstado === "Todos"
      ? pedidos
      : pedidos.filter((pedido) => pedido.estado === filtroEstado);

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <main className="flex-grow-1">
        <div className="container mt-5">
          <h2 className="text-center mb-4">Panel de Administrador</h2>

          {/* Lista de pedidos */}
          <div className="row">
            {pedidosFiltrados.map((pedido) => (
              <div key={pedido.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{pedido.cliente}</h5>
                    <p className="card-text">{pedido.direccion}</p>
                    <p className="card-text">
                      <small className="text-muted">Fecha: {pedido.fecha}</small>
                    </p>
                    <p className="card-text">
                      Repartidor: <strong>{pedido.repartidor}</strong>
                    </p>
                    <span
                      className={`badge ${
                        pedido.estado === "Pendiente"
                          ? "bg-warning"
                          : pedido.estado === "En camino"
                          ? "bg-primary"
                          : pedido.estado === "Entregado"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {pedido.estado}
                    </span>
                  </div>
                  <div className="card-footer text-center">
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => verDetalles(pedido.detalles)}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal de Detalle del Producto */}
          <Modal show={showModal} onHide={cerrarModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Detalle del Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {detallesPedido && (
                <div className="text-center">
                  <img
                    src={detallesPedido.imagen}
                    alt={detallesPedido.nombre}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "250px", objectFit: "cover" }}
                  />
                  <h4>{detallesPedido.nombre}</h4>
                  <p className="text-muted">{detallesPedido.descripcion}</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cerrarModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default AdminDashboard;
