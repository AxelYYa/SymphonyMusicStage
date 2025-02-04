import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Card } from 'react-bootstrap';

function CrearProductosCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
  });

  const [showModalCategoria, setShowModalCategoria] = useState(false);
  const [showModalProducto, setShowModalProducto] = useState(false);

  const handleAgregarCategoria = (e) => {
    e.preventDefault();
    if (nombreCategoria.trim() === '') return;
    setCategorias([...categorias, nombreCategoria]);
    setNombreCategoria('');
    setShowModalCategoria(false);
  };

  const handleChangeProducto = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleGuardarProducto = (e) => {
    e.preventDefault();
    console.log('Producto guardado:', producto);
    setProducto({ nombre: '', descripcion: '', precio: '', categoria: '' });
    setShowModalProducto(false);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center text-info fw-bold mb-5">Crear Productos y Categorías</h2>

      <Row className="mb-6 justify-content-space-around">
        {/* Formulario de Categoría */}
        <Col md={5} className="mb-3 d-flex justify-content-center">
          <Card className="shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
            <Card.Body>
              <h4 className="text-primary text-center">Agregar Categoría</h4>
              <Button 
                variant="success" 
                onClick={() => setShowModalCategoria(true)} 
                className="mb-3 w-100"
              >
                Nueva Categoría
              </Button>
              <ul>
                {categorias.map((categoria, index) => (
                  <li key={index}>{categoria}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulario de Producto */}
        <Col md={7} className="mb-3 d-flex justify-content-center">
          <Card className="shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
            <Card.Body>
              <h4 className="text-primary text-center">Agregar Producto</h4>
              <Button 
                variant="primary" 
                onClick={() => setShowModalProducto(true)} 
                className="mb-3 w-100"
              >
                Crear Producto
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para agregar nueva categoría */}
      <Modal show={showModalCategoria} onHide={() => setShowModalCategoria(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAgregarCategoria}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Categoría</Form.Label>
              <Form.Control 
                type="text" 
                value={nombreCategoria} 
                onChange={(e) => setNombreCategoria(e.target.value)} 
                placeholder="Ej: Percusiones"
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">Agregar Categoría</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para agregar nuevo producto */}
      <Modal show={showModalProducto} onHide={() => setShowModalProducto(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleGuardarProducto}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control 
                type="text" 
                name="nombre" 
                value={producto.nombre} 
                onChange={handleChangeProducto} 
                placeholder="Ej: Guitarra acústica" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                name="descripcion" 
                value={producto.descripcion} 
                onChange={handleChangeProducto} 
                placeholder="Ej: Guitarra de madera con cuerdas de nylon" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control 
                type="number" 
                name="precio" 
                value={producto.precio} 
                onChange={handleChangeProducto} 
                placeholder="Ej: 150" 
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control 
                as="select" 
                name="categoria" 
                value={producto.categoria} 
                onChange={handleChangeProducto} 
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Guardar Producto</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default CrearProductosCategorias;
