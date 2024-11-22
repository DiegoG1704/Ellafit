import { Button, Modal, Table } from 'antd';
import React, { useState } from 'react';

import {MenuOutlined } from '@ant-design/icons';
import DetallesProducc from './DetallesProducc';

interface DialogDetallesProps {
  Visible: boolean; // Tipo booleano para saber si el modal está visible
  Close: () => void; // Función para cerrar el modal
  Datos: { Modelo: string }; // Props de los datos
}

const DialogDetalles: React.FC<DialogDetallesProps> = ({ Visible, Close, Datos }) => {
    const [open,setOpen]=useState(false)
    const [select,setSelect]=useState<any>(null)
    const dataSource = [
        { key: '1', Id: 'A001', Prenda: 'Modelo 1', Cantidad: '14',Saldo:12 },
        { key: '2', Id: 'A002', Prenda: 'Modelo 2', Cantidad: '6',Saldo:12 },
        { key: '3', Id: 'A003', Prenda: 'Modelo 3', Cantidad: '8',Saldo:12 },
        { key: '4', Id: 'A004', Prenda: 'Modelo 4', Cantidad: '10',Saldo:12 },
        { key: '5', Id: 'A005', Prenda: 'Modelo 5', Cantidad: '12',Saldo:12 },
      ];

    const columns = [
        { title: 'Id', dataIndex: 'Id', key: 'Id' },
        { title: 'Prenda', dataIndex: 'Prenda', key: 'Prenda' },
        { title: 'Cantidad', dataIndex: 'Cantidad', key: 'Cantidad' },
        { title: 'Saldo', dataIndex: 'Saldo', key: 'Saldo' },
        {
          title: '',
          dataIndex: 'actions',
          key: 'actions',
          render: (text: string, record: any) => (
            <div>
              <Button 
                    icon={<MenuOutlined />} 
                    onClick={() => { setSelect(record); setOpen(true); }} 
                    style={{ color: '#2452b5', borderColor: 'white' }} />
            </div>
          ),
        },
      ];
  return (
    <>
        <Modal 
        open={Visible} 
        onCancel={Close} // Modal will be closed on cancel
        onOk={Close}    // Modal will be closed on OK
        title="Detalles de la Producción"
        >
        <div>
            {/* Ensure that Datos.Modelo is not undefined or null */}
            <strong>Prenda:</strong> {Datos?.Modelo || 'No disponible'}
        </div>

        <div style={{ width: '100%', marginTop: '30px' }}>
            <Table columns={columns} dataSource={dataSource} pagination={false} />
        </div>
        </Modal>
        <DetallesProducc Visible={open} Close={()=>setOpen(false)} Datos={select}/>
    </>
  );
};

export default DialogDetalles;
