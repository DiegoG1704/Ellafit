import { Button, Input, Mentions, Modal, Table } from 'antd';
import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import EditArea from './EditArea';

interface DialogDetallesProps {
  Visible: boolean; // Tipo booleano para saber si el modal está visible
  Close: () => void; // Función para cerrar el modal
}

const DialogArea: React.FC<DialogDetallesProps> = ({ Visible, Close }) => {
  const [selectedValue, setSelectedValue] = useState<any>(null);
  const [editarDialog, setEditarDialog] = useState(false);
  const [datos, setDatos] = useState({
    prenda: '',
    cantidad: '',
    Comentario: '',
  });

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
  
  const dataSource = [
    { key: '1', Id: 'A001', Prenda: 'Modelo 1', Cantidad: '14', Comentario: 'Comentario' },
    { key: '2', Id: 'A002', Prenda: 'Modelo 2', Cantidad: '6', Comentario: 'Comentario' },
    { key: '3', Id: 'A003', Prenda: 'Modelo 3', Cantidad: '8', Comentario: 'Comentario' },
    { key: '4', Id: 'A004', Prenda: 'Modelo 4', Cantidad: '10', Comentario: 'Comentario' },
    { key: '5', Id: 'A005', Prenda: 'Modelo 5', Cantidad: '12', Comentario: 'Comentario' },
  ];

  const columns = [
    { title: 'Id', dataIndex: 'Id', key: 'Id' },
    { title: 'Prenda', dataIndex: 'Prenda', key: 'Prenda' },
    { title: 'Cantidad', dataIndex: 'Cantidad', key: 'Cantidad' },
    { title: 'Comentario', dataIndex: 'Comentario', key: 'Comentario' },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
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
              setSelectedValue(record);
              setEditarDialog(true);
            }}
          />
        </div>
      ),
    },
  ];

  // Maneja el cambio en el campo de cantidad
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  // Maneja el cambio en el campo de Comentario (con Mentions)
  const handleComentarioChange = (value: string) => {
    setDatos({ ...datos, Comentario: value });
  };

  const Imprimir = () => {
    console.log('areas', datos);
    setDatos({
      prenda: '',
      cantidad: '',
      Comentario: '',
    });
  };

  return (
    <>
        <Modal
        open={Visible}
        onCancel={Close}
        onOk={Close}
        onClose={Close}
        title={'Formulario de Control para Cambio de Área'}
        width={530}
        >
        <span>Para registrar los Productos fallidos y actualizar la cantidad prevista.</span>
        <div style={{ display: 'flex', marginTop: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
                <span>Prenda</span>
                <Input
                    placeholder="Ingresar Prenda..."
                    name="prenda"
                    value={datos.prenda}
                    onChange={handleChange}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
                <span>Cantidad de Productos Fallidos</span>
                <Input
                    placeholder="Ingresar Cantidad..."
                    name="cantidad"
                    value={datos.cantidad}
                    onChange={handleChange}
                />
                </div>
            <Button style={{ marginTop: '27px' }} onClick={Imprimir}>
            Registrar
            </Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Comentario</span>
            <Mentions
            value={datos.Comentario}
            onChange={handleComentarioChange} // Aquí se maneja solo el texto, no el evento completo
            allowClear
            rows={3}
            />
        </div>
        <div style={{ width: '100%', marginTop: '30px' }}>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
        </Modal>
        <EditArea Visible={editarDialog} Close={()=>setEditarDialog(false)} Datos={selectedValue}/>
    </>
  );
};

export default DialogArea;
