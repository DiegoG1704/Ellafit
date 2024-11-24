import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { BellOutlined, SearchOutlined, CloseOutlined,ExportOutlined } from '@ant-design/icons';
import { Button, Card, Input, Table } from 'antd'; // Importar el componente Table de Ant Design
import user from '../../img/Usuario.png';
import '../css/produccion.css';
import DialogDetal from './Dialog/DialogDetal';

const Produccion: React.FC = () => {
  const [open,setOpen] =useState(false)
  const [selectDt,setSelectDt] =useState<any>(null)

  const Estados = [
    { id: 1, nombre: 'En Pausa' },
    { id: 2, nombre: 'En Proceso' },
    { id: 3, nombre: 'Finalizado' },
    { id: 4, nombre: 'Por Iniciar' }
];
  const dataSource = [
    {
      key: '1',
      Id: 'A001',
      Modelo: 'Modelo 1',
      Color: 'Rojo',
      Stock: 150,
      Detalle: 'Producto en buen estado',
      Estado:1,
    },
    {
      key: '2',
      Id: 'A002',
      Modelo: 'Modelo 2',
      Color: 'Azul',
      Stock: 75,
      Detalle: 'Producto dañado',
      Estado:2,
    },
    {
      key: '3',
      Id: 'A003',
      Modelo: 'Modelo 3',
      Color: 'Negro',
      Stock: 200,
      Detalle: 'Producto recién llegado',
      Estado: 3,
    },
    {
      key: '4',
      Id: 'A004',
      Modelo: 'Modelo 4',
      Color: 'Blanco',
      Stock: 50,
      Detalle: 'Producto en promoción',
      Estado: 2,
    },
    {
      key: '5',
      Id: 'A005',
      Modelo: 'Modelo 5',
      Color: 'Gris',
      Stock: 0,
      Detalle: 'Producto agotado',
      Estado: 4,
    },
  ];

  // Columnas de la tabla
  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',
    },
    {
      title: 'Modelo',
      dataIndex: 'Modelo',
      key: 'Modelo',
    },
    {
      title: 'Color',
      dataIndex: 'Color',
      key: 'Color',
    },
    {
      title: 'Stock',
      dataIndex: 'Stock',
      key: 'Stock',
    },
    {
      title: 'Detalle',
      dataIndex: 'Detalle',
      key: 'Detalle',
      render: (text: string, record: any) => (
        <Button
          icon={<ExportOutlined style={{color:'#12C447',fontSize:'20px'}}/>} 
          onClick={() => { setSelectDt(record); setOpen(true); }} 
          style={{borderColor: 'white' }} />
      ),
    },
    {
      title: 'Estado',
      dataIndex: 'Estado',
      key: 'Estado',
      render: (estadoId: number) => {
        const estado = Estados.find((item) => item.id === estadoId);
        return (
            <span style={{ color: '#2659c7', background: '#a4bef5', borderRadius: '10px', padding: '5px' }}>
                {estado ? estado.nombre : 'Estado no encontrado'}
            </span>
        );
    },
    },
  ];

  return (
    <div className="produccion-container">
      <Sidebar />
      <div>
        <div className="produccion-main-content">
          <div className="produccion-header">
            <h2>Lista de Productos Almacen</h2>
            <span>En este módulo usted podrá ver la lista de productos</span>
          </div>
          <div className="produccion-cards">
            <Card className="bell-card">
              <BellOutlined className="bell-icon" />
            </Card>
            <Card className="user-card">
              <div className="user-info">
                <div className="user-text">
                  <span className="user-name">Anna Karin</span>
                  <span className="user-role">Usuario</span>
                </div>
                <div className="user-avatar">
                  <img src={user} alt="User" className="avatar-image" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Buscador */}
        <div style={{ marginTop: '80px', marginLeft: '250px', width:'100%' }}>
          <div>
            <SearchOutlined style={{ color: '#4f9cd7' }} />
            <Input placeholder="Buscar..." style={{ width: '300px', color: '#4f9cd7' }} />
            <CloseOutlined 
              style={{ color: 'white',background:'#4f9cd7',borderRadius:'10px',width:'20px',height:'20px',textAlign:'center'}} 
            />
          </div>
          <div style={{ width: '100%', marginTop: '30px'}}>
            <Table columns={columns} dataSource={dataSource} pagination={false}/>
          </div>
        </div>
      </div>
      <DialogDetal Visible={open} Close={()=>setOpen(false)} Datos={selectDt}/>
    </div>
  );
};

export default Produccion;
