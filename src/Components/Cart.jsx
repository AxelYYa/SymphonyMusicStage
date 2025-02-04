import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import NavbarComponent from '/src/Components/Navbar';
import '/main.css';

function Cart() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const [items, setItems] = useState([]);

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
      </div>
    </div>
  );
}

export default Cart;