import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavbarComponent from '/src/Components/Navbar';
import '/main.css';

function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleQuantityChange = (id, amount) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[id] || 0) + amount;
      if (newQuantity <= 0) {
        const { [id]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [id]: newQuantity };
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const cartItems = items.filter(item => cart[item.id]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddressChange = (e) => setAddress(e.target.value);

  const handleRealizarPedido = () => {
    // Aquí puedes manejar la lógica para realizar el pedido
    console.log('Pedido realizado:', { cartItems, address });
    handleCloseModal();
  };

  return (
    <div>
      <NavbarComponent cart={cart} />
      <div className="container my-5">
        <h2 className="mb-4 text-center text-info fw-bold">Carrito de Compras</h2>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {cartItems.map((item) => (
            <Col key={item.id}>
              <Card className="shadow-lg rounded card-equal-height">
                <Card.Img variant="top" src={item.imagepath} className="card-img-top" />
                <Card.Body>
                  <Card.Title className="text-center text-uppercase">{item.nombre}</Card.Title>
                  <Card.Text className="text-center text-muted">{item.descripcion}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-primary fw-bold">${item.precio}</span>
                    <div className="d-flex align-items-center">
                      <Button 
                        variant={cart[item.id] > 0 ? "primary" : "secondary"} 
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </Button>
                      <span className="mx-2 fw-bold">{cart[item.id] || 0}</span>
                      <Button variant="primary" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                    </div>
                  </div>
                  <Button variant="danger" className="mt-3 w-100" onClick={() => handleQuantityChange(item.id, -cart[item.id])}>
                    Eliminar del carrito
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {cartItems.length > 0 && (
          <div className="text-center mt-4">
            <Button variant="success" size="lg" onClick={handleShowModal}>
              Realizar Compra
            </Button>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length > 0 ? (
            <div className="d-flex flex-column align-items-center">
              {cartItems.map((item, index) => (
                <div key={index} className="m-2 text-center" style={{ width: "250px" }}>
                  <img src={item.imagepath} alt={item.nombre} className="img-fluid rounded mb-2" style={{ maxHeight: "150px", objectFit: "cover" }} />
                  <h6>{item.nombre}</h6>
                  <p className="text-muted">{item.descripcion}</p>
                  <p className="text-muted">Cantidad: {cart[item.id]}</p>
                  <p className="text-muted">Precio: ${item.precio}</p>
                </div>
              ))}
              <Form.Group className="mt-3 w-100">
                <Form.Label>Ingresa tu Dirección</Form.Label>
                <Form.Control type="text" value={address} onChange={handleAddressChange} />
              </Form.Group>
            </div>
          ) : (
            <p className="text-center">No hay productos en el carrito.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleRealizarPedido}>
            Realizar Pedido
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cart;