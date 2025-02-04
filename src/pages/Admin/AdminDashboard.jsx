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

      },
      {
        imagen: "https://i5.walmartimages.com/asr/08756097-cef4-402c-b715-504741840605.05eeebc0f0801be3092cd1d44a4d2f88.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        nombre: "Amplificador Marshall",
        descripcion: "Amplificador de 50W ideal para conciertos en vivo.",
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

  const cerrarModal = () => {
    setShowModal(false);
  };

  const aceptarPedido = (id) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, estado: "Aceptado" } : pedido
      )
    );
  };

  const rechazarPedido = (id) => {
    setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== id));
  };

  const asignarRepartidor = (id) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, estado: "En Camino", repartidor: "Asignado" } : pedido
      )
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <main className="flex-grow-1">
        <div className="container mt-5">
          <h2 className="text-center mb-4">Panel de Administrador</h2>
          <div className="row">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{pedido.cliente}</h5>
                    <p className="card-text">{pedido.direccion}</p>
                    <p className="card-text">
                      <small className="text-muted">Fecha: {pedido.fecha}</small>
                    </p>
                    <p className="card-text">Repartidor: <strong>{pedido.repartidor}</strong></p>
                    <span className={`badge ${pedido.estado === "Pendiente" ? "bg-warning" : pedido.estado === "En Camino" ? "bg-primary" : "bg-success"}`}>
                      {pedido.estado}
                    </span>
                  </div>
                  <div className="card-footer text-center">
                    <button className="btn btn-info btn-sm me-2" onClick={() => verDetalles(pedido.detalles)}>
                      Ver Detalles
                    </button>
                    {pedido.estado === "Pendiente" && (
                      <>
                        <button className="btn btn-success btn-sm me-2" onClick={() => aceptarPedido(pedido.id)}>
                          Aceptar
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => rechazarPedido(pedido.id)}>
                          Rechazar
                        </button>
                      </>
                    )}
                    {pedido.estado === "Aceptado" && (
                      <button className="btn btn-primary btn-sm" onClick={() => asignarRepartidor(pedido.id)}>
                        Asignar Repartidor
                      </button>
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
                <div className="d-flex justify-content-center">
                  {detallesPedido.map((producto, index) => (
                    <div key={index} className="m-2 text-center" style={{ width: "250px" }}>
                      <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded mb-2" style={{ maxHeight: "150px", objectFit: "cover" }} />
                      <h6>{producto.nombre}</h6>
                      <p className="text-muted">{producto.descripcion}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center">No hay productos en este pedido.</p>
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