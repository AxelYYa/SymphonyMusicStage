import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import DriverPanel from './DriverPanel';
import Tracking from './Tracking';
import Catalog from './Catalog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/repartidor" element={<DriverPanel />} />
        <Route path="/seguimiento" element={<Tracking />} />
        <Route path="/catalogo" element={<Catalog />} />
      </Routes>
    </Router>
  );
}

export default App;