import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Navbar from '/src/Components/Navbar';
import FooterComponent from '/src/Components/Footer';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const defaultCenter = { lat: 25.53845653120954, lng: -103.45535531993444 };

const DeliveryDashboard = () => {
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [detallesPedido, setDetallesPedido] = useState([]);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [direccionDestino, setDireccionDestino] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:3000/pedidos-public');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const aceptarPedido = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}/aceptar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      if (response.ok) {
        const updatedPedido = await response.json();
        setPedidos(pedidos.map(pedido => 
          pedido.id === id ? updatedPedido : pedido
        ));
      } else {
        console.error('Error al aceptar el pedido');
      }
    } catch (error) {
      console.error('Error al aceptar el pedido:', error);
    }
  };

  const rechazarPedido = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}/revertir`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      if (response.ok) {
        setPedidos(pedidos.filter(pedido => pedido.id !== id));
      } else {
        console.error('Error al rechazar el pedido');
      }
    } catch (error) {
      console.error('Error al rechazar el pedido:', error);
    }
  };

  const entregarPedido = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/pedidos/${id}/entregar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      });
      if (response.ok) {
        const updatedPedido = await response.json();
        setPedidos(pedidos.map(pedido => 
          pedido.id === id ? updatedPedido : pedido
        ));
      } else {
        console.error('Error al entregar el pedido');
      }
    } catch (error) {
      console.error('Error al entregar el pedido:', error);
    }
  };

  const verDetalles = (detalles, direccion) => {
    const cantidadTotal = detalles.reduce((acc, producto) => acc + producto.cantidad, 0);
    const precioTotal = detalles.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);

    setDetallesPedido(detalles);
    setTotalCantidad(cantidadTotal);
    setTotalPrecio(precioTotal);
    setDireccionDestino(direccion);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setDirectionsResponse(null);
  };

  useEffect(() => {
    if (direccionDestino) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: defaultCenter,
          destination: direccionDestino,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirectionsResponse(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [direccionDestino]);

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="container mt-5 flex-grow-1">
        <h2 className="mb-4 text-center text-info fw-bold">Panel de Repartidor</h2>
        <div className="row">
          {Array.isArray(pedidos) && pedidos.map(pedido => (
            <div key={pedido.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{pedido.cliente}</h5>
                  <p className="card-text">{pedido.direccion}</p>
                  <span className={`badge ${pedido.estado_envio === 'En Proceso' ? 'bg-warning' : pedido.estado_envio === 'En Camino' ? 'bg-primary' : pedido.estado_envio === 'Entregado' ? 'bg-success' : 'bg-danger'}`}>
                    {pedido.estado_envio}
                  </span>
                </div>
                <div className="card-footer text-center">
                  {pedido.estado_envio === 'En Proceso' && (
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => aceptarPedido(pedido.id)}
                      >
                        Aceptar
                      </button>
                      <button
                        className="btn btn-info btn-sm text-white"
                        onClick={() => verDetalles(pedido.detalles, pedido.direccion)}
                      >
                        Ver Detalles
                      </button>
                    </div>
                  )}
                  {pedido.estado_envio === 'En Camino' && (
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rechazarPedido(pedido.id)}
                      >
                        Denegar
                      </button>
                      <button
                        className="btn btn-info btn-sm text-white"
                        onClick={() => verDetalles(pedido.detalles, pedido.direccion)}
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
                  {pedido.estado_envio === 'Entregado' && (
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
            {direccionDestino && (
              <LoadScript googleMapsApiKey="AIzaSyCx4NNBGSBnu0ypvno3X4OSfXzVHRQbj1Y">
                <GoogleMap
                  mapContainerStyle={{ height: "400px", width: "100%" }}
                  center={defaultCenter}
                  zoom={10}
                >
                  {directionsResponse && (
                    <DirectionsRenderer
                      directions={directionsResponse}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
            )}
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