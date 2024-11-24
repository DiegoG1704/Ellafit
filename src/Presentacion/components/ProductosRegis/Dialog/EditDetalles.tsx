import { Button, Input, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
interface EditProps {
    Visible: boolean; // Boolean to determine if the modal is visible
    Close: () => void; // Function to close the modal
    Datos: { Nombre: string,Color:string,Talla:string}; // Datos contains 'Prenda' and 'Cantidad'
  }
const EditDetalles:React.FC<EditProps>=({Visible,Close,Datos})=> {
    const opciones = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' },
      ];
    const [datos, setDatos] = useState({
        color: '',
        talla: '',
      });

      // Maneja el cambio en el campo de cantidad
    const handleSelect = (field: string, value: string) => {
    setDatos({ ...datos, [field]: value });
    };

    useEffect(() => {
        if (Datos) {
            setDatos({
            color: Datos.Color || '', 
            talla: Datos.Talla || '',
            });
        }
        }, [Datos])
    
    const Imprimir = ()=>{
        console.log('datos',datos);
        setDatos({
            color: '',
            talla: '',
          })
        Close()
    }
  return (
    <Modal
    open={Visible} 
    onCancel={Close} 
    onClose={Close} 
    onOk={Imprimir} 
    title={`Editar el ${Datos?.Nombre}`}
    centered
    width={230}
    >
        <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
        <span>Color</span>
        <Select
            showSearch
            placeholder="Seleccionar modelo..."
            optionFilterProp="label"
            onChange={(value) => handleSelect('modelo', value)} // Usamos handleSelect aquí
            value={datos.color}
            options={opciones}
            style={{ width: '170px' }}
        />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
        <span>Talla</span>
        <Select
            showSearch
            placeholder="Seleccionar prenda..."
            optionFilterProp="label"
            onChange={(value) => handleSelect('prenda', value)} // Usamos handleSelect aquí
            value={datos.talla}
            options={opciones}
            style={{ width: '170px' }}
        />
        </div>
    </Modal>
  )
}

export default EditDetalles