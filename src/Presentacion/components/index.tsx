import React from 'react';
import { Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import fondo from '../img/fondoEllafit.png';
import './css/Index.css';

const Index: React.FC = () => {
  const navigate = useNavigate(); // Inicializar el hook

  return (
    <div className="container">
      <div className="image-container">
        <img src={fondo} alt="Ellafit Background" className="imagen" />
      </div>
      <div className="form-container">
        <h1 className="titulo">Ellafit</h1>
        <div>
          <span className="parrafo">Usuario</span>
          <Input className="usuario" placeholder="Ingresa usuario..." />
        </div>
        <div>
          <span className="parrafo">Contraseña</span>
          <Input
            className="contraseña"
            placeholder="Ingresa Contraseña..."
            type="password"
          />
        </div>
        <Button className="ingresar" onClick={()=>navigate('/Produccion')}>
          Ingresar
        </Button>
      </div>
    </div>
  );
};

export default Index;
