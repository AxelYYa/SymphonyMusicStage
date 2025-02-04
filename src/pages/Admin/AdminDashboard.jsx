import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const pedidosIniciales = [
  {
    id: 1,
    cliente: 'Juan Pérez',
    direccion: 'Av. Revolución 123',
    estado: 'Pendiente',
    detalles: 'Pedido con 3 artículos: 1 guitarra, 1 amplificador, 1 estuche.',
    fecha: '2023-10-01',
    repartidor: 'Sin asignar',
  },
  {
    id: 2,
    cliente: 'Ana López',
    direccion: 'Calle 5 de Mayo 456',
    estado: 'En camino',
    detalles: 'Pedido con 1 artículo: 1 teclado digital.',
    fecha: '2023-10-02',
    repartidor: 'Carlos Gómez',
  },
  {
    id: 3,
    cliente: 'Carlos Ramírez',
    direccion: 'Blvd. Agua Caliente 789',
    estado: 'Entregado',
    detalles: 'Pedido con 2 artículos: 1 batería, 1 par de baquetas.',
    fecha: '2023-10-03',
    repartidor: 'Luisa Martínez',
  },
];

const AdminDashboard = () => {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [showModal, setShowModal] = useState(false);
  const [detallesPedido, setDetallesPedido] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos'); // Estado para filtrar pedidos

  const verDetalles = (detalles) => {
    setDetallesPedido(detalles);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  const cambiarEstadoPedido = (id, nuevoEstado) => {
    setPedidos(
      pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
      )
    );
  };

  const cancelarPedido = (id) => {
    setPedidos(pedidos.filter((pedido) => pedido.id !== id));
  };

  const filtrarPedidos = (estado) => {
    setFiltroEstado(estado);
  };

  const pedidosFiltrados = filtroEstado === 'Todos' 
    ? pedidos 
    : pedidos.filter((pedido) => pedido.estado === filtroEstado);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Panel de Administrador</h2>

      {/* Filtros por estado */}
      <div className="mb-4">
        <button
          className={`btn btn-outline-secondary me-2 ${
            filtroEstado === 'Todos' ? 'active' : ''
          }`}
          onClick={() => filtrarPedidos('Todos')}
        >
          Todos
        </button>
        <button
          className={`btn btn-outline-warning me-2 ${
            filtroEstado === 'Pendiente' ? 'active' : ''
          }`}
          onClick={() => filtrarPedidos('Pendiente')}
        >
          Pendientes
        </button>
        <button
          className={`btn btn-outline-primary me-2 ${
            filtroEstado === 'En camino' ? 'active' : ''
          }`}
          onClick={() => filtrarPedidos('En camino')}
        >
          En camino
        </button>
        <button
          className={`btn btn-outline-success me-2 ${
            filtroEstado === 'Entregado' ? 'active' : ''
          }`}
          onClick={() => filtrarPedidos('Entregado')}
        >
          Entregados
        </button>
      </div>

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
                    pedido.estado === 'Pendiente'
                      ? 'bg-warning'
                      : pedido.estado === 'En camino'
                      ? 'bg-primary'
                      : pedido.estado === 'Entregado'
                      ? 'bg-success'
                      : 'bg-danger'
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
                {pedido.estado !== 'Entregado' && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => cancelarPedido(pedido.id)}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para detalles del pedido */}
      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{detallesPedido}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;