// Catalogo.js
import React, { useState } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import NavbarComponent from '/src/Components/Navbar';
import '/main.css';

function Catalogo() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [items] = useState([
    { id: 1, nombre: 'Guitarra', categoria: 'Cuerda', descripcion: 'Guitarra acústica', imagen: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT42kxyYGynr66Yb7fMHH6GF2XLrwm7Uv5RDUH3I5dEII3DQiZANLEW7ovVgXwMm95RxznGycXT0UCD1aALgqhZ99sCXDKVogcHPLWM-_wWcj3GjaXPTS4EZQ', precio: '$100' },
    { id: 2, nombre: 'Flauta', categoria: 'Viento', descripcion: 'Flauta traversa', imagen: 'path/to/image2.jpg', precio: '$150' },
    { id: 3, nombre: 'Batería', categoria: 'Percusiones', descripcion: 'Batería acústica', imagen: 'path/to/image3.jpg', precio: '$200' },
    { id: 4, nombre: 'Palo de tambor', categoria: 'Percusiones', descripcion: 'Palo para batería', imagen: 'path/to/image4.jpg', precio: '$20' },
    { id: 5, nombre: 'Piano', categoria: 'Cuerda', descripcion: 'Piano digital', imagen: 'path/to/image5.jpg', precio: '$500' },
    { id: 6, nombre: 'Afinador', categoria: 'Accesorios', descripcion: 'Afinador digital', imagen: 'path/to/image6.jpg', precio: '$30' },
  ]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredItems = selectedCategory
    ? items.filter(item => item.categoria === selectedCategory)
    : items;

  return (
    <div>
      {/* Usar el Navbar dentro del componente Catalogo */}
      <NavbarComponent /> 

      {/* Contenido de la Página - Catálogo */}
      <div className="container my-5">
        <h2 className="mb-4 text-center text-info">Catálogo de Productos</h2>

        {/* Selector de Categoría */}
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

        {/* Galería de Productos */}
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredItems.map((item) => (
            <Col key={item.id}>
              <Card className="shadow-lg rounded">
                <Card.Img variant="top" src={item.imagen} className="card-img-top" />
                <Card.Body>
                  <Card.Title className="text-center text-uppercase">{item.nombre}</Card.Title>
                  <Card.Text className="text-center text-muted">{item.descripcion}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-primary fw-bold">{item.precio}</span>
                    <Button variant="info" className="btn-detail btn-sm">Ver más</Button>
                  </div>
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
