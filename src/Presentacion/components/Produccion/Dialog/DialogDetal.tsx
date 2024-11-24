import { Modal, Table } from 'antd';
import React from 'react'

interface EditarDetallesProps {
    Visible: boolean; // Boolean to determine if the modal is visible
    Close: () => void; // Function to close the modal
    Datos: { Modelo: string}; // Datos contains 'Prenda' and 'Cantidad'
  }

const DialogDetal:React.FC<EditarDetallesProps> =({ Visible, Close, Datos }) => {
    const dataSource = [
        { key: '1', Id: 'A001', Prenda: 'Modelo 1', Stock: '14' },
        { key: '2', Id: 'A002', Prenda: 'Modelo 2', Stock: '6' },
        { key: '3', Id: 'A003', Prenda: 'Modelo 3', Stock: '8' },
        { key: '4', Id: 'A004', Prenda: 'Modelo 4', Stock: '10' },
        { key: '5', Id: 'A005', Prenda: 'Modelo 5', Stock: '12' },
      ];
    const columns = [
        { title: 'Id', dataIndex: 'Id', key: 'Id' },
        { title: 'Prenda', dataIndex: 'Prenda', key: 'Prenda' },
        { title: 'Stock', dataIndex: 'Stock', key: 'Stock' },
      ];
  return (
    <Modal
    open={Visible}
    onCancel={Close}
    onClose={Close}
    onOk={Close}
    title={`Detalles del Modelo: ${Datos?.Modelo}`}
    >
    <div style={{ width: '100%', marginTop: '30px' }}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
    </Modal>
  )
}

export default DialogDetal
