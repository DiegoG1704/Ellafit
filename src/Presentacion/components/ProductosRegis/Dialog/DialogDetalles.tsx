import { Button, Input, Modal, Select, Table } from 'antd';
import React, { useState } from 'react'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import EditDetalles from './EditDetalles';

interface DetallesProps {
    Visible: boolean; // Boolean to determine if the modal is visible
    Close: () => void; // Function to close the modal
    Datos: { Modelo: string}; // Datos contains 'Prenda' and 'Cantidad'
  }

const DialogDetalles:React.FC<DetallesProps> =({Visible,Close,Datos})=> {
  const [editar,setEditar]=useState(false)
  const [selected,setSelected]=useState<any>(null)
  const opciones = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
  ];
  const [datos, setDatos] = useState({
    Color: '',
    Talla: ''
  });
  const handleSelect = (field: string, value: string) => {
    setDatos({ ...datos, [field]: value });
  };

  const handleDelete = (record: { key: string; Nombre:string }) => {
    Modal.confirm({
      title: '¿Estás seguro de que quieres eliminar este registro?',
      icon: <ExclamationCircleOutlined />,
      content: `Esta acción no se puede deshacer. ${record.Nombre}`,
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
    });
  };

  const dataSource = [
    { key: '1', Id: 'A001', Nombre: 'Modelo 1', Color: '14', Talla:10 },
    { key: '2', Id: 'A002', Nombre: 'Modelo 2', Color: '6', Talla:10 },
    { key: '3', Id: 'A003', Nombre: 'Modelo 3', Color: '8', Talla:10 },
    { key: '4', Id: 'A004', Nombre: 'Modelo 4', Color: '10', Talla:10 },
    { key: '5', Id: 'A005', Nombre: 'Modelo 5', Color: '12', Talla:10 },
  ];

  const columns = [
    { title: 'Id', dataIndex: 'Id', key: 'Id' },
    { title: 'Nombre', dataIndex: 'Nombre', key: 'Nombre' },
    { title: 'Color', dataIndex: 'Color', key: 'Color' },
    { title: 'Talla', dataIndex: 'Talla', key: 'Talla' },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: string, record: any) => (
        <div>
          <Button
            icon={<DeleteOutlined />}
            style={{ color: '#ED6B6E', borderColor: '#ED6B6E', marginRight: '10px' }}
            onClick={() => handleDelete(record)} // Llamar a la función de eliminar
          />
          <Button
            icon={<EditOutlined />}
            style={{ color: '#4f9cd7', borderColor: '#4f9cd7' }}
            onClick={() => {
              setSelected(record);
              setEditar(true);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <>
    <Modal 
    open={Visible} 
    onCancel={Close} 
    onClose={Close} 
    onOk={Close} 
    title={`Detalles del ${Datos?.Modelo}`}
    centered
    width={580}
    >
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Color</span>
            <Select
              showSearch
              placeholder="Seleccionar modelo..."
              optionFilterProp="label"
              onChange={(value) => handleSelect('modelo', value)} // Usamos handleSelect aquí
              value={datos.Color}
              options={opciones}
              style={{ width: '170px' }}
            />
          </div>
          <Button style={{ marginTop: '27px' }} >Agregar</Button>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Talla</span>
            <Select
              showSearch
              placeholder="Seleccionar prenda..."
              optionFilterProp="label"
              onChange={(value) => handleSelect('prenda', value)} // Usamos handleSelect aquí
              value={datos.Talla}
              options={opciones}
              style={{ width: '170px' }}
            />
          </div>
          <Button style={{ marginTop: '27px' }} >Agregar</Button>
        </div>
        <div style={{ width: '100%', marginTop: '30px' }}>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
    </Modal>
    <EditDetalles Visible={editar} Close={()=>setEditar(false)} Datos={selected} />
    </>
  )
}

export default DialogDetalles