import { Input, Modal, Table } from 'antd';
import React from 'react'

interface DialogDetallesProps {
    Visible: boolean; // Tipo booleano para saber si el modal está visible
    Close: () => void; // Función para cerrar el modal
    Datos: { Prenda: string };  
  }
  
const DetallesProducc: React.FC<DialogDetallesProps> = ({ Visible, Close,Datos }) => {
    const dataSource = [
        { key: '1', Id: 'A001', Area: 'Modelo 1',Saldo:12 },
        { key: '2', Id: 'A002', Area: 'Modelo 2',Saldo:12 },
        { key: '3', Id: 'A003', Area: 'Modelo 3',Saldo:12 },
        { key: '4', Id: 'A004', Area: 'Modelo 4',Saldo:12 },
        { key: '5', Id: 'A005', Area: 'Modelo 5',Saldo:12 },
      ];

    const columns = [
        { title: 'Id', dataIndex: 'Id', key: 'Id' },
        { title: 'Area', dataIndex: 'Area', key: 'Area' },
        { title: 'Saldo', dataIndex: 'Saldo', key: 'Saldo' },
        {
          title: '',
          dataIndex: 'actions',
          key: 'actions',
          render: () => (
            <div>
              <Input/>
            </div>
          ),
        },
      ];
  return (
    <Modal
    open={Visible}
    onCancel={Close}
    onClose={Close}
    onOk={Close}
    title={`Detalles Saldo (${Datos?.Prenda})`}
    >
        <div style={{ width: '100%', marginTop: '30px' }}>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
    </Modal>
  )
}
export default DetallesProducc