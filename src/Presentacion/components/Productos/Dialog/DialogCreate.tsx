import { Button, DatePicker, Input, Modal, Select, Table } from 'antd';
import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import EditarProducc from './EditarProducc';

// Tipado de las props
interface DialogCreateProps {
  Visible: boolean; // Tipo booleano para saber si el modal está visible
  Close: () => void; // Función para cerrar el modal
}

const DialogCreate: React.FC<DialogCreateProps> = ({ Visible, Close }) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [editarDialog, setEditarDialog] = useState(false);
  const [datos, setDatos] = useState({
    modelo: '',
    prenda: '',
    cantidad: '',
  });

  // Maneja el cambio en el Select (generalizado)
  const handleSelect = (field: string, value: string) => {
    setDatos({ ...datos, [field]: value });
  };

  // Maneja el cambio en el campo de cantidad
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  // Opciones para los Selects
  const opciones = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
  ];

  // Datos de ejemplo para la tabla
  const dataSource = [
    { key: '1', Id: 'A001', Prenda: 'Modelo 1', Cantidad: '14' },
    { key: '2', Id: 'A002', Prenda: 'Modelo 2', Cantidad: '6' },
    { key: '3', Id: 'A003', Prenda: 'Modelo 3', Cantidad: '8' },
    { key: '4', Id: 'A004', Prenda: 'Modelo 4', Cantidad: '10' },
    { key: '5', Id: 'A005', Prenda: 'Modelo 5', Cantidad: '12' },
  ];

  // Función para eliminar un registro
  const handleDelete = (record: { key: string; Prenda: string; Cantidad: string }) => {
    Modal.confirm({
      title: '¿Estás seguro de que quieres eliminar este registro?',
      icon: <ExclamationCircleOutlined />,
      content: `Esta acción no se puede deshacer. ${record.Prenda}`,
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
    });
  };

  // Columnas de la tabla
  const columns = [
    { title: 'Id', dataIndex: 'Id', key: 'Id' },
    { title: 'Prenda', dataIndex: 'Prenda', key: 'Prenda' },
    { title: 'Cantidad', dataIndex: 'Cantidad', key: 'Cantidad' },
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
              setSelectedValue(record);
              setEditarDialog(true);
            }}
          />
        </div>
      ),
    },
  ];

  // Maneja el registro
  const handleRegistrar = () => {
    console.log('Datos a registrar:', datos);
    // Aquí puedes agregar lógica para guardar los datos, como una llamada a una API
    setDatos({
      modelo: '',
      prenda: '',
      cantidad: '',
    });
  };

  return (
    <>
      <Modal
        open={Visible}
        onOk={Close}
        okText={'Iniciar'}
        centered
        onCancel={Close}
        title="Formulario para iniciar Producción"
        width={700}
        style={{ maxWidth: '80%' }}
      >
        <span>Para registrar un tema, es necesario que proporciones los siguientes datos.</span>

        {/* Sección de formulario */}
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Modelo</span>
            <Select
              showSearch
              placeholder="Seleccionar modelo..."
              optionFilterProp="label"
              onChange={(value) => handleSelect('modelo', value)} // Usamos handleSelect aquí
              value={datos.modelo}
              options={opciones}
              style={{ width: '170px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Prenda</span>
            <Select
              showSearch
              placeholder="Seleccionar prenda..."
              optionFilterProp="label"
              onChange={(value) => handleSelect('prenda', value)} // Usamos handleSelect aquí
              value={datos.prenda}
              options={opciones}
              style={{ width: '170px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Cantidad</span>
            <Input placeholder="Ingresar Cantidad..." name="cantidad" value={datos.cantidad} onChange={handleChange} />
          </div>

          <Button style={{ marginTop: '27px' }} onClick={handleRegistrar}>Registrar</Button>
        </div>

        {/* Fecha Prevista Inicio y Fin */}
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Fecha Prevista Inicio</span>
            <DatePicker style={{ marginTop: '5px', width: '312px' }} placeholder="Selecciona la fecha..." />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Fecha Prevista Fin</span>
            <DatePicker style={{ marginTop: '5px', width: '312px' }} placeholder="Selecciona la fecha..." />
          </div>
        </div>

        {/* Tabla de productos */}
        <div style={{ width: '100%', marginTop: '30px' }}>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'end', margin: '8px' }}>
          <span style={{ marginRight: '8px' }}>Cantidad Total</span>
          <Input style={{ width: '100px' }} />
        </div>
      </Modal>
      
      {/* Editar Modal */}
      <EditarProducc Visible={editarDialog} Close={() => setEditarDialog(false)} Datos={selectedValue} />
    </>
  );
};

export default DialogCreate;
