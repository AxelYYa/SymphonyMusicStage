import React, { useState } from "react";
import { Card, Button, Container, Row, Col, Modal, ProgressBar } from "react-bootstrap";
import NavbarComponent from "/src/Components/Navbar";
import FooterComponent from "/src/Components/Footer";

function HistorialPedidos() {
  const [pedidos] = useState([
    {
      id: 1,
      fecha: "2024-02-01",
      estado: "Entregado",
      total: 250,
      progreso: 100,
      productos: [
        { nombre: "Guitarra", descripcion: "Guitarra acústica", cantidad: 1, precio: 100, imagen: "https://via.placeholder.com/80" },
        { nombre: "Afinador", descripcion: "Afinador digital", cantidad: 2, precio: 75, imagen: "https://via.placeholder.com/80" },
      ],
    },
    {
      id: 2,
      fecha: "2024-02-05",
      estado: "Pendiente",
      total: 120,
      progreso: 40,
      productos: [
        { nombre: "Flauta", descripcion: "Flauta profesional", cantidad: 1, precio: 120, imagen: "https://via.placeholder.com/80" },
      ],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [showSeguimiento, setShowSeguimiento] = useState(false);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Entregado":
        return "success";
      case "Pendiente":
        return "warning";
      case "En camino":
        return "info";
      case "Cancelado":
        return "danger";
      default:
        return "secondary";
    }
  };

  const abrirModal = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowModal(true);
  };

  const abrirSeguimiento = (pedido) => {
    setPedidoSeleccionado(pedido);
    setShowSeguimiento(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const cerrarSeguimiento = () => {
    setShowSeguimiento(false);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <NavbarComponent />
      <Container className="my-5">
        <h2 className="text-center text-info fw-bold">Historial de Pedidos</h2>
        <Row className="g-4 mt-4">
          {pedidos.map((pedido) => (
            <Col xs={12} sm={6} md={4} key={pedido.id}>
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title className="text-center fw-bold">Pedido #{pedido.id}</Card.Title>
                  <Card.Text className="text-center text-muted">
                    <strong>Fecha:</strong> {pedido.fecha}
                  </Card.Text>
                  <Card.Text className="text-center">
                    <span className={`badge bg-${getEstadoColor(pedido.estado)}`}>
                      {pedido.estado}
                    </span>
                  </Card.Text>
                  <Card.Text className="text-center fw-bold text-primary">Total: ${pedido.total}</Card.Text>
                  <div className="d-flex justify-content-around">
                    <Button variant="info" onClick={() => abrirModal(pedido)}>
                      Ver Detalles
                    </Button>
                    <Button variant="primary" onClick={() => abrirSeguimiento(pedido)}>
                      Ver Seguimiento
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal de Detalles del Pedido */}
        <Modal show={showModal} onHide={cerrarModal} centered size="lg">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>Detalles del Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 bg-light">
            <div className="d-flex flex-wrap justify-content-start">
              {pedidoSeleccionado?.productos.map((producto, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center border rounded p-3 me-3 mb-3 shadow-sm"
                  style={{ minWidth: "250px", maxWidth: "300px", backgroundColor: "#f8f9fa" }}
                >
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="img-fluid rounded shadow-lg me-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div>
                    <h6 className="fw-bold text-dark m-0">{producto.nombre}</h6>
                    <p className="small text-muted m-0">{producto.descripcion}</p>
                    <p className="fw-bold m-0">Cantidad: {producto.cantidad}</p>
                    <p className="fw-bold m-0">${(producto.cantidad * producto.precio).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-primary text-white">
            <div className="w-100 d-flex justify-content-between align-items-center">
              <div>
                <p className="fw-bold mb-1">Total de productos: {pedidoSeleccionado?.productos.reduce((acc, p) => acc + p.cantidad, 0)}</p>
                <p className="fw-bold mb-1">Total: ${pedidoSeleccionado?.total.toFixed(2)}</p>
              </div>
              <Button variant="secondary" onClick={cerrarModal} className="text-white">
                Cerrar
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Modal de Seguimiento */}
        <Modal show={showSeguimiento} onHide={cerrarSeguimiento} centered>
          <Modal.Header closeButton className="bg-info text-white">
            <Modal.Title>Seguimiento del Pedido #{pedidoSeleccionado?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 bg-light">
            <h5 className="text-center fw-bold">Estado: {pedidoSeleccionado?.estado}</h5>
            <ProgressBar animated now={pedidoSeleccionado?.progreso} label={`${pedidoSeleccionado?.progreso}%`} className="mt-3" />
            <p className="text-center mt-3">{pedidoSeleccionado?.progreso === 100 ? "Pedido Entregado" : "Pedido en proceso..."}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarSeguimiento}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <FooterComponent />
    </div>
  );
}

export default HistorialPedidos;
