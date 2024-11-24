import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { BellOutlined, SearchOutlined, CloseOutlined,ExportOutlined,DeleteOutlined,EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, Input, Modal, Table } from 'antd'; // Importar el componente Table de Ant Design
import user from '../../img/Usuario.png';
import '../css/produccion.css';
import DialogDetalles from './Dialog/DialogDetalles';
import DialogCreate from './Dialog/DialogCreate';
import DialogEditProduc from './Dialog/DialogEdit';

const ProductosRegis:React.FC =()=> {
    const Estados = [
        { id: 1, nombre: 'En Pausa' },
        { id: 2, nombre: 'En Proceso' },
        { id: 3, nombre: 'Finalizado' },
        { id: 4, nombre: 'Por Iniciar' }
    ];
    const [open,setOpen] = useState(false)
    const [Select,setSelect] = useState<any>(null)
    const [create,setCreate] = useState(false)
    const [editarDialog,setEditarDialog]=useState(false)
    const [selectedEdit,setSelectedEdit]=useState<any>(null)

    const handleDelete = (record: { key: string; Modelo:string }) => {
      Modal.confirm({
        title: '¿Estás seguro de que quieres eliminar este registro?',
        icon: <ExclamationCircleOutlined />,
        content: `Esta acción no se puede deshacer. ${record.Modelo}`,
        okText: 'Sí, eliminar',
        okType: 'danger',
        cancelText: 'Cancelar',
      });
    };

    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            Id: 'A001',
            Modelo: 'Modelo 1',
            PrecioU: 150,
            PrecioM: 1,
            Material: 'Material',
            Estado: 4,
        },
        {
            key: '2',
            Id: 'A002',
            Modelo: 'Modelo 2',
            PrecioU: 75,
            PrecioM: 2,
            Material: 'Material',
            Estado: 3,
        },
        {
            key: '3',
            Id: 'A003',
            Modelo: 'Modelo 3',
            PrecioU: 200,
            PrecioM: 3,
            Material: 'Material',
            Estado: 3,
        },
        {
            key: '4',
            Id: 'A004',
            Modelo: 'Modelo 4',
            PrecioU: 50,
            PrecioM: 4,
            Material: 'Material',
            Estado: 2,
        },
        {
            key: '5',
            Id: 'A005',
            Modelo: 'Modelo 5',
            PrecioU: 0,
            PrecioM: 1,
            Material: 'Material',
            Estado: 1,
        },
    ]);
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
            title: 'Precio Unitario',
            dataIndex: 'PrecioU',
            key: 'PrecioU',
        },
        {
            title: 'Precio por Mayor',
            dataIndex: 'PrecioM',
            key: 'PrecioM',
        },
        {
            title: 'Material',
            dataIndex: 'Material',
            key: 'Material',
        },
        {
            title: 'Detalles',
            dataIndex: 'Detalles',
            key: 'Detalles',
            render: (text: string, record: any) => (
                <Button 
                    icon={<ExportOutlined style={{color:'#12C447',fontSize:'20px'}} />} 
                    onClick={() => { setSelect(record); setOpen(true); }} 
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
                    <span style={{ color: '#278a43', background: '#9dd4ac', borderRadius: '10px', padding: '5px' }}>
                        {estado ? estado.nombre : 'Estado no encontrado'}
                    </span>
                );
            },
        },
        {
            title: '',
            dataIndex: 'Delete',
            key: 'Delete',
            render: (text: string, record: any) => (
                <div>
                    <Button 
                        icon={<DeleteOutlined />} 
                        style={{ color: '#ED6B6E', borderColor: '#ED6B6E', marginRight: '10px' }}
                        onClick={() => handleDelete(record)} 
                    />
                    <Button
                        icon={<EditOutlined />}
                        style={{ color: '#4f9cd7', borderColor: '#4f9cd7' }}
                        onClick={() => {
                        setSelectedEdit(record);
                        setEditarDialog(true);
                        }}
                    />
                </div>
            ),
        },
    ];
  return (
    <div className="produccion-container">
      <Sidebar />
      <div>
        <div className="produccion-main-content">
          <div className="produccion-header">
            <h2>Lista de Productos Registrados</h2>
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
        <div style={{ marginTop: '80px', marginLeft: '250px', width: '100%', display: 'flex' }}>
          <div style={{ display: 'flex', justifyContent: 'start' }}>
              <SearchOutlined style={{ color: '#4f9cd7', position: 'absolute', zIndex: 10 }} />
              <Input placeholder="Buscar..." style={{ width: '300px', color: '#4f9cd7', zIndex: 8 }} />
              <CloseOutlined
                  style={{
                      color: '#4f9cd7',
                      borderRadius: '10px',
                      width: '20px',
                      height: '20px',
                      textAlign: 'center',
                      position: 'absolute',
                      zIndex: 11,
                  }}
              />
          </div>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Button 
                  onClick={() => setCreate(true)} 
                  style={{ background: '#BACD00', color: 'white', borderColor: '#BACD00' }}>
                  + Iniciar Producción
              </Button>
          </div>
      </div>
      <div style={{ width: '100%', marginTop: '30px', marginLeft: '250px'}}>
        <Table columns={columns} dataSource={dataSource} pagination={false}/>
      </div>

      </div>
      <DialogDetalles Visible={open} Close={()=>setOpen(false)} Datos={Select}/>
      <DialogCreate Visible={create} Close={()=>setCreate(false)}/>
      <DialogEditProduc Visible={editarDialog} Close={()=>setEditarDialog(false)} Datos={selectedEdit}/>
    </div>
  )
}

export default ProductosRegis
