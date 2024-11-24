import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { BellOutlined, SearchOutlined, CloseOutlined, ExportOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Card, Input, Table, Modal } from 'antd'; 
import user from '../../img/Usuario.png';
import '../css/produccion.css';
import DialogCreate from './Dialog/DialogCreate';
import DialogDetalles from './Dialog/DialogDetalles';
import DialogArea from './Dialog/DialogArea';

const Productos: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [detalles, setDetalles] = useState(false);
    const [selectDt, setSelectDt] = useState<any>(null);
    const [cambioArea,setCambioArea] = useState(false)
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            Id: 'A001',
            Modelo: 'Modelo 1',
            Fecha: 150,
            Area: 1,
            Cantidad: '14',
            Saldo: '10',
            Estado: 4,
        },
        {
            key: '2',
            Id: 'A002',
            Modelo: 'Modelo 2',
            Fecha: 75,
            Area: 2,
            Cantidad: '6',
            Saldo: '10',
            Estado: 3,
        },
        {
            key: '3',
            Id: 'A003',
            Modelo: 'Modelo 3',
            Fecha: 200,
            Area: 3,
            Cantidad: '8',
            Saldo: '10',
            Estado: 3,
        },
        {
            key: '4',
            Id: 'A004',
            Modelo: 'Modelo 4',
            Fecha: 50,
            Area: 4,
            Cantidad: '10',
            Saldo: '10',
            Estado: 2,
        },
        {
            key: '5',
            Id: 'A005',
            Modelo: 'Modelo 5',
            Fecha: 0,
            Area: 1,
            Cantidad: '12',
            Saldo: '10',
            Estado: 1,
        },
    ]);

    const Areas = [
        { id: 1, nombre: 'Area de Corte' },
        { id: 2, nombre: 'Area de Confeccion' },
        { id: 3, nombre: 'Area de Acabados' },
        { id: 4, nombre: 'Produccion Terminada' }
    ];

    const Estados = [
        { id: 1, nombre: 'En Pausa' },
        { id: 2, nombre: 'En Proceso' },
        { id: 3, nombre: 'Finalizado' },
        { id: 4, nombre: 'Por Iniciar' }
    ];

    const handleDelete = (record: { key: string, Modelo: string }) => {
        Modal.confirm({
            title: '¿Estás seguro de que quieres eliminar este registro?',
            icon: <ExclamationCircleOutlined />,
            content: `Esta acción no se puede deshacer. ${record.Modelo}`,
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk: () => {
                // Remove the record from the dataSource
                const updatedDataSource = dataSource.filter(item => item.key !== record.key);
                setDataSource(updatedDataSource);
            }
        });
    };

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
            title: 'Detalles',
            dataIndex: 'Detalles',
            key: 'Detalles',
            render: (text: string, record: any) => (
                <Button 
                    icon={<ExportOutlined style={{color:'#12C447',fontSize:'20px'}} />} 
                    onClick={() => { setSelectDt(record); setDetalles(true); }} 
                    style={{borderColor: 'white' }} />
            ),
        },
        {
            title: 'Fecha(Inicio)',
            dataIndex: 'Fecha',
            key: 'Fecha',
        },
        {
            title: 'Area',
            dataIndex: 'Area',
            key: 'Area',
            render: (areaId: number) => {
                const area = Areas.find((item) => item.id === areaId);
                return (
                    <Button
                    style={{ color: 'red', background: '#e08888af'}}
                    onClick={()=>setCambioArea(true)}
                    >
                    {area ? area.nombre : 'Área no encontrada'}</Button>
                );
            },
        },
        {
            title: 'Cantidad(Prevista)',
            dataIndex: 'Cantidad',
            key: 'Cantidad',
        },
        {
            title: 'Saldo',
            dataIndex: 'Saldo',
            key: 'Saldo',
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
        {
            title: '',
            dataIndex: 'Delete',
            key: 'Delete',
            render: (text: string, record: any) => (
                <Button 
                    icon={<DeleteOutlined />} 
                    style={{ color: '#ED6B6E', borderColor: '#ED6B6E', fontWeight: 'bold' }}
                    onClick={() => handleDelete(record)} />
            ),
        },
    ];

    return (
        <div className="produccion-container">
            <Sidebar />
            <div>
                <div className="produccion-main-content">
                    <div className="produccion-header">
                        <h2>Lista de Productos en Producción</h2>
                        <span>En este módulo usted podrá ver la lista de productos que se están elaborando</span>
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
                            onClick={() => setOpen(true)} 
                            style={{ background: '#BACD00', color: 'white', borderColor: '#BACD00' }}>
                            + Iniciar Producción
                        </Button>
                    </div>
                </div>

                <div style={{ width: '100%', marginTop: '30px', marginLeft: '250px' }}>
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                </div>
            </div>

            <DialogCreate Visible={open} Close={() => setOpen(false)} />
            <DialogDetalles Visible={detalles} Close={() => { setDetalles(false); setSelectDt(null); }} Datos={selectDt} />
            <DialogArea Visible={cambioArea} Close={()=>setCambioArea(false)}/>
        </div>
    );
};

export default Productos;
