import React, { useState } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import NavbarComponent from '/src/Components/Navbar';
import '/main.css';

function Catalogo() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState({});

  const items = [
    { id: 1, nombre: 'Guitarra', categoria: 'Cuerda', descripcion: 'Guitarra acústica', imagen: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT42kxyYGynr66Yb7fMHH6GF2XLrwm7Uv5RDUH3I5dEII3DQiZANLEW7ovVgXwMm95RxznGycXT0UCD1aALgqhZ99sCXDKVogcHPLWM-_wWcj3GjaXPTS4EZQ', precio: '$100' },
    { id: 2, nombre: 'Flauta', categoria: 'Viento', descripcion: 'Flauta traversa', imagen: 'https://mx.yamaha.com/es/files/YRA901_a8a3773d61e40de2bf5d1b68532733bf.jpg?impolicy=resize&imwid=2000&imhei=2000', precio: '$150' },
    { id: 3, nombre: 'Batería', categoria: 'Percusiones', descripcion: 'Batería acústica', imagen: 'path/to/image3.jpg', precio: '$200' },
    { id: 4, nombre: 'Palo de tambor', categoria: 'Percusiones', descripcion: 'Palo para batería', imagen: 'path/to/image4.jpg', precio: '$20' },
    { id: 5, nombre: 'Piano', categoria: 'Cuerda', descripcion: 'Piano digital', imagen: 'path/to/image5.jpg', precio: '$500' },
    { id: 6, nombre: 'Afinador', categoria: 'Accesorios', descripcion: 'Afinador digital', imagen: 'path/to/image6.jpg', precio: '$30' },
  ];

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
                <Card.Img variant="top" src={item.imagen} className="card-img-top" />
                <Card.Body>
                  <Card.Title className="text-center text-uppercase">{item.nombre}</Card.Title>
                  <Card.Text className="text-center text-muted">{item.descripcion}</Card.Text>
                  <div className="d-flex justify-content-center">
                    <span className="text-primary fw-bold">{item.precio}</span>
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








