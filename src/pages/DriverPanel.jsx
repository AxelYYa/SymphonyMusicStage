import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Navbar from '/src/Components/Navbar';
import FooterComponent from '/src/Components/Footer';

const pedidosIniciales = [
  { 
    id: 1, 
    cliente: 'Juan Pérez', 
    direccion: 'Av. Revolución 123', 
    estado: 'Listo Para Enviar', 
    detalles: [
      { nombre: 'Producto 1', descripcion: 'Descripción del producto 1', cantidad: 2, precio: 100, imagen: '/path/to/image.jpg' },
      { nombre: 'Producto 2', descripcion: 'Descripción del producto 2', cantidad: 1, precio: 150, imagen: '/path/to/image.jpg' }
    ] 
  },
  { 
    id: 2, 
    cliente: 'Ana López', 
    direccion: 'Calle 5 de Mayo 456', 
    estado: 'Listo Para Enviar', 
    detalles: [
      { nombre: 'Producto 3', descripcion: 'Descripción del producto 3', cantidad: 1, precio: 80, imagen: '/path/to/image.jpg' }
    ]
  }
];

const DeliveryDashboard = () => {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [showModal, setShowModal] = useState(false); 
  const [detallesPedido, setDetallesPedido] = useState([]);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [totalPrecio, setTotalPrecio] = useState(0);

  const aceptarPedido = (id) => {
    setPedidos(pedidos.map(pedido => 
      pedido.id === id ? { ...pedido, estado: 'En camino' } : pedido
    ));
  };

  const rechazarPedido = (id) => {
    setPedidos(pedidos.filter(pedido => pedido.id !== id));
  };

  const entregarPedido = (id) => {
    setPedidos(pedidos.map(pedido => 
      pedido.id === id ? { ...pedido, estado: 'Entregado' } : pedido
    ));
  };

  const verDetalles = (detalles) => {
    const cantidadTotal = detalles.reduce((acc, producto) => acc + producto.cantidad, 0);
    const precioTotal = detalles.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);

    setDetallesPedido(detalles);
    setTotalCantidad(cantidadTotal);
    setTotalPrecio(precioTotal);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="container mt-5 flex-grow-1">
        <h2 className="mb-4 text-center text-info fw-bold">Panel de Repartidor</h2>
        <div className="row">
          {pedidos.map(pedido => (
            <div key={pedido.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{pedido.cliente}</h5>
                  <p className="card-text">{pedido.direccion}</p>
                  <span className={`badge ${pedido.estado === 'Listo Para Enviar' ? 'bg-warning' : pedido.estado === 'En camino' ? 'bg-primary' : pedido.estado === 'Entregado' ? 'bg-success' : 'bg-danger'}`}>
                    {pedido.estado}
                  </span>
                </div>
                <div className="card-footer text-center">
                  {pedido.estado === 'Listo Para Enviar' && (
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => aceptarPedido(pedido.id)}
                      >
                        Aceptar
                      </button>
                      <button
                        className="btn btn-info btn-sm text-white"
                        onClick={() => verDetalles(pedido.detalles)}
                      >
                        Ver Detalles
                      </button>
                    </div>
                  )}
                  {pedido.estado === 'En camino' && (
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rechazarPedido(pedido.id)}
                      >
                        Denegar
                      </button>
                      <button
                        className="btn btn-info btn-sm text-white"
                        onClick={() => verDetalles(pedido.detalles)}
                      >
                        Ver Detalles
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => entregarPedido(pedido.id)}
                      >
                        Marcar como Entregado
                      </button>
                    </div>
                  )}
                  {pedido.estado === 'Entregado' && (
                    <div className="alert alert-success mt-2">
                      Pedido entregado
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para mostrar los detalles del pedido */}
        <Modal show={showModal} onHide={cerrarModal} centered size="lg">
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title>Detalles del Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4 bg-light">
            <div className="d-flex flex-wrap justify-content-start">
              {detallesPedido.map((producto, index) => (
                <div key={index} className="d-flex align-items-center border rounded p-3 me-3 mb-3 shadow-sm" style={{ minWidth: "250px", maxWidth: "300px", backgroundColor: "#f8f9fa" }}>
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
                <p className="fw-bold mb-1">Total de productos: {totalCantidad}</p>
                <p className="fw-bold mb-1">Total: ${totalPrecio.toFixed(2)}</p>
              </div>
              <Button variant="secondary" onClick={cerrarModal} className="text-white" style={{ backgroundColor: "#0056b3", borderColor: "#0056b3" }}>
                Cerrar
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      <FooterComponent />
    </div>
  );
};

export default DeliveryDashboard;
