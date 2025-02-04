import React, { useState } from 'react';

const pedidosIniciales = [
  { id: 1, cliente: 'Juan Pérez', direccion: 'Av. Revolución 123', estado: 'Pendiente', detalles: 'Pedido con 3 artículos' },
  { id: 2, cliente: 'Ana López', direccion: 'Calle 5 de Mayo 456', estado: 'Pendiente', detalles: 'Pedido con 1 artículo' },
  { id: 3, cliente: 'Carlos Ramírez', direccion: 'Blvd. Agua Caliente 789', estado: 'Pendiente', detalles: 'Pedido con 2 artículos' },
];

const DeliveryDashboard = () => {
  const [pedidos, setPedidos] = useState(pedidosIniciales);

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
    alert(detalles);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Panel de Repartidor</h2>
      <div className="row">
        {pedidos.map(pedido => (
          <div key={pedido.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{pedido.cliente}</h5>
                <p className="card-text">{pedido.direccion}</p>
                <span className={`badge ${
                  pedido.estado === 'Pendiente' ? 'bg-warning' :
                  pedido.estado === 'En camino' ? 'bg-primary' :
                  pedido.estado === 'Entregado' ? 'bg-success' :
                  'bg-danger'
                }`}>
                  {pedido.estado}
                </span>
              </div>
              <div className="card-footer text-center">
                {pedido.estado === 'Pendiente' && (
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => aceptarPedido(pedido.id)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => rechazarPedido(pedido.id)}
                    >
                      Denegar
                    </button>
                  </div>
                )}

                {pedido.estado === 'En camino' && (
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-info btn-sm"
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
    </div>
  );
};

export default DeliveryDashboard;