import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './src/pages/login';
import DriverPanel from './src/pages/DriverPanel';
import Tracking from './src/pages/Tracking';
import Catalog from './src/pages/Catalog';
import Register from './src/pages/Register';
import RegisterEmployee from './src/pages/RegisterEmployee';
import ProtectedRoute from './src/Components/ProtectedRoute';
import '/main.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registro"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/registroempleado" element={<RegisterEmployee />} />
        <Route path="/repartidor" element={<DriverPanel />} />
        <Route path="/seguimiento" element={<Tracking />} />
        <Route path="/catalogo" element={<Catalog />} />
      </Routes>
    </Router>
  );
}

export default App;