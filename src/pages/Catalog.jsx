import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import NavbarComponent from '/src/Components/Navbar';
import '/main.css';

function Catalogo() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState({});
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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleQuantityChange = (id, amount) => {
    setCart((prevCart) => {
      const newQuantity = (prevCart[id] || 0) + amount;
      return { ...prevCart, [id]: newQuantity < 0 ? 0 : newQuantity };
    });
  };

  const filteredItems = selectedCategory
    ? items.filter(item => item.categoria === selectedCategory)
    : items;

  return (
    <div>
      <NavbarComponent />
      <div className="container my-5">
        <h2 className="mb-4 text-center text-info fw-bold">Catálogo de Productos</h2>

        <Form.Group controlId="categorySelect" className="mb-4">
          <Form.Label className="h5">Filtrar por Categoría</Form.Label>
          <Form.Control 
            as="select" 
            value={selectedCategory} 
            onChange={handleCategoryChange} 
            className="form-control-lg shadow-sm"
          >
            <option value="">Todas las categorías</option>
            <option value="Cuerda">Cuerda</option>
            <option value="Viento">Viento</option>
            <option value="Percusiones">Percusiones</option>
            <option value="Accesorios">Accesorios</option>
          </Form.Control>
        </Form.Group>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredItems.map((item) => (
            <Col key={item.id}>
              <Card className="shadow-lg rounded">
                <Card.Img variant="top" src={`http://localhost:3000/images/${item.imagepath}`} className="card-img-top" />
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
                  <Button variant="primary" className="mt-3 w-100" onClick={() => handleAddToCart(item.id)}>
                    Agregar al carrito
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

export default Catalogo;