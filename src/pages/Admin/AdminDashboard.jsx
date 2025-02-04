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
    detalles: [
      {
        imagen: "https://martinguitarmexico.com/wp-content/uploads/2022/02/martin-guitarras-D-42-modern-deluxe-1.jpg",
        nombre: "Guitarra Acústica Fender",
        descripcion: "Guitarra de madera de alta calidad con un sonido excepcional.",
        cantidad: 1,
        precio: 1200.00,
      },
      {
        imagen: "https://i5.walmartimages.com/asr/08756097-cef4-402c-b715-504741840605.05eeebc0f0801be3092cd1d44a4d2f88.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        nombre: "Amplificador Marshall",
        descripcion: "Amplificador de 50W ideal para conciertos en vivo.",
        cantidad: 2,
        precio: 300.00,
      }
    ],
  },
];

const AdminDashboard = () => {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [showModal, setShowModal] = useState(false);
  const [detallesPedido, setDetallesPedido] = useState([]);

  const verDetalles = (detalles) => {
    setDetallesPedido(detalles);
    setShowModal(true);
  };

  const cerrarModal = () => setShowModal(false);

  const aceptarPedido = (id) => {
    setPedidos((prev) => prev.map((p) => p.id === id ? { ...p, estado: "Aceptado" } : p));
  };

  const rechazarPedido = (id) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id));
  };

  const asignarRepartidor = (id) => {
    setPedidos((prev) => prev.map((p) => p.id === id ? { ...p, estado: "En Camino", repartidor: "Asignado" } : p));
  };

  const calcularTotal = (detalles) => {
    return detalles.reduce((total, p) => total + (p.cantidad * p.precio), 0).toFixed(2);
  };

  const calcularTotalProductos = (detalles) => {
    return detalles.reduce((total, p) => total + p.cantidad, 0);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavbarComponent />
      <main className="flex-grow-1 container mt-5">
        <h2 className="text-center mb-4 text-primary">Panel de Administrador</h2>
        <div className="row">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="col-md-4 mb-4">
              <div className="card shadow-lg rounded border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark">{pedido.cliente}</h5>
                  <p className="card-text text-muted">{pedido.direccion}</p>
                  <p className="card-text">
                    <small className="text-secondary">Fecha: {pedido.fecha}</small>
                  </p>
                  <p className="card-text">Repartidor: <strong>{pedido.repartidor}</strong></p>
                  <span className={`badge py-2 px-3 ${pedido.estado === "Pendiente" ? "bg-warning text-white" : pedido.estado === "En Camino" ? "bg-primary" : "bg-success"}`}>
                    {pedido.estado}
                  </span>
                </div>
                <div className="card-footer text-center bg-white border-0">
                  <button className="btn btn-info btn-sm me-2 text-white" onClick={() => verDetalles(pedido.detalles)}>Ver Detalles</button>
                  {pedido.estado === "Pendiente" && (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={() => aceptarPedido(pedido.id)}>Aceptar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => rechazarPedido(pedido.id)}>Rechazar</button>
                    </>
                  )}
                  {pedido.estado === "Aceptado" && (
                    <button className="btn btn-primary btn-sm" onClick={() => asignarRepartidor(pedido.id)}>Asignar Repartidor</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal show={showModal} onHide={cerrarModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {detallesPedido.length > 0 ? (
              <div className="d-flex overflow-auto" style={{ gap: "1rem" }}>
                {detallesPedido.map((producto, index) => (
                  <div key={index} className="text-center" style={{ minWidth: "200px" }}>
                    <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded shadow mb-2" style={{ maxHeight: "150px", objectFit: "cover" }} />
                    <h6 className="fw-bold">{producto.nombre}</h6>
                    <p className="text-muted small">{producto.descripcion}</p>
                    <p className="fw-bold">Cantidad: {producto.cantidad}</p>
                    <p className="fw-bold">Precio: ${producto.precio.toFixed(2)}</p>
                    <p className="text-success fw-bold">Subtotal: ${(producto.cantidad * producto.precio).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted">No hay productos en este pedido.</p>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-1 fw-bold">Total de productos: {calcularTotalProductos(detallesPedido)}</p>
              <p className="mb-0 text-success fw-bold">Total a pagar: ${calcularTotal(detallesPedido)}</p>
            </div>
            <Button variant="secondary" onClick={cerrarModal}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      </main>
      <FooterComponent />
    </div>
  );
};

export default AdminDashboard;