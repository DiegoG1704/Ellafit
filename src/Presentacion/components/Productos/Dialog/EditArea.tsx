import { Input, Mentions, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
interface EditarProduccProps {
    Visible: boolean; // Boolean to determine if the modal is visible
    Close: () => void; // Function to close the modal
    Datos: { Prenda: string, Cantidad: string , Comentario: string}; // Datos contains 'Prenda' and 'Cantidad'
  }
  
const EditArea:React.FC<EditarProduccProps> = ({ Visible, Close, Datos }) => {
    const [datos, setDatos] = useState({
        prenda: '',
        cantidad: '',
        Comentario: '',
        });
        // Maneja el cambio en el campo de cantidad

    useEffect(() => {
        if (Datos) {
            setDatos({
            prenda: Datos.Prenda || '', 
            cantidad: Datos.Cantidad || '', 
            Comentario:Datos.Comentario || ''
            });
        }
        }, [Datos])
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
    Close()
  };
  return (
    <Modal 
    open={Visible} 
    onClose={Close} 
    onCancel={Close} 
    onOk={Imprimir}
    title={'Editar Prenda'}
    >
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
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Comentario</span>
            <Mentions
            value={datos.Comentario}
            onChange={handleComentarioChange} 
            allowClear
            rows={3}
            />
        </div>
    </Modal>
  )
}

export default EditArea
