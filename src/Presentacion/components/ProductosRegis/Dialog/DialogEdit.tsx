import { Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react'

interface EditProps {
    Visible: boolean; // Boolean to determine if the modal is visible
    Close: () => void; // Function to close the modal
    Datos: { Modelo: string,PrecioU: string,PrecioM: string,Material: string}; // Datos contains 'Prenda' and 'Cantidad'
  }
const DialogEditProduc:React.FC<EditProps>=({Visible,Close,Datos})=> {
    const [datos, setDatos] = useState({
        Modelo: '',
        PrecioU: '',
        PrecioM: '',
        Material: '',
      });
    
      const opciones = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'tom', label: 'Tom' },
      ];
    
      const handleSelect = (field: string, value: string) => {
        setDatos({ ...datos, [field]: value });
      };
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDatos({ ...datos, [name]: value });
      };

      useEffect(() => {
        if (Datos) {
          setDatos({
            Modelo: Datos.Modelo || '', // Ensure that Datos.Prenda is set
            PrecioM: Datos.PrecioM || '', // Ensure that Datos.Cantidad is set
            PrecioU: Datos.PrecioU || '',
            Material: Datos.Material || '',
          });
        }
      }, [Datos])
    
      const Imprimir = () => {
        // Validate inputs before proceeding
        if (!datos.Modelo || !datos.PrecioU || !datos.PrecioM || !datos.Material) {
          alert('Por favor complete todos los campos');
          return;
        }
    
        console.log('Producto Registrado', datos);
        setDatos({
          Modelo: '',
          PrecioU: '',
          PrecioM: '',
          Material: '',
        });
        Close();
      };
  return (
    <>
    <Modal
    open={Visible} 
    onCancel={Close} 
    onClose={Close} 
    onOk={Imprimir} 
    title={`Editar el ${Datos?.Modelo}`}
    centered
    width={580}
    >
        <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
          <span>Modelo</span>
          <Select
            showSearch
            placeholder="Seleccionar modelo..."
            optionFilterProp="label"
            onChange={(value) => handleSelect('Nombre', value)} // Fixed field name here
            value={datos.Modelo}
            options={opciones}
          />
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Precio (Unidad)</span>
            <Input
              placeholder="Ingresar Precio Unitario..."
              name="PrecioU"
              value={datos.PrecioU}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Precio por Mayor</span>
            <Input
              placeholder="Ingresar Precio Mayor..."
              name="PrecioM"
              value={datos.PrecioM}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
            <span>Material</span>
            <Input
              placeholder="Ingresar Material..."
              name="Material"
              value={datos.Material}
              onChange={handleChange}
            />
          </div>
        </div>
    </Modal>
    </>
  )
}

export default DialogEditProduc;