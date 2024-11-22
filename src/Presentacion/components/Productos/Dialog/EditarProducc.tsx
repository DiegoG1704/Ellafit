import { Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';

// Define the type of Datos as an object with at least 'Prenda' and 'Cantidad' properties
interface EditarProduccProps {
  Visible: boolean; // Boolean to determine if the modal is visible
  Close: () => void; // Function to close the modal
  Datos: { Prenda: string, Cantidad: string }; // Datos contains 'Prenda' and 'Cantidad'
}

const EditarProducc: React.FC<EditarProduccProps> = ({ Visible, Close, Datos }) => {
  const [datos, setDatos] = useState({
    prenda: '',
    cantidad: '',
  });

  // Options for the "Prenda" Select dropdown
  const opciones = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
  ];

  // Update local state with the passed 'Datos' when it changes
  useEffect(() => {
    if (Datos) {
      setDatos({
        prenda: Datos.Prenda || '', // Ensure that Datos.Prenda is set
        cantidad: Datos.Cantidad || '', // Ensure that Datos.Cantidad is set
      });
    }
  }, [Datos]); // Re-run this effect when Datos changes

  // Handle selection of prenda (clothing item)
  const handleSelect = (field: string, value: string) => {
    setDatos({ ...datos, [field]: value });
  };

  // Handle changes in the cantidad (quantity) input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleSutmit =()=>{
    console.log('edit',datos)
    setDatos({
        prenda: '',
        cantidad: '',
      });
    Close()
  }

  return (
    <Modal
      open={Visible} // Display the modal based on the 'Visible' prop
      onCancel={Close} // Close the modal on cancel
      onOk={handleSutmit}
      okText={'Guardar'} // Close the modal on OK (can customize this if needed)
      centered
      width={320}
      title="Editar Producción"
    >
      <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
        <span>Prenda</span>
        <Select
          showSearch
          placeholder="Seleccionar prenda..."
          optionFilterProp="label"
          onChange={(value) => handleSelect('prenda', value)} // Update 'prenda' state
          value={datos.prenda} // Display the selected 'prenda' value
          options={opciones} // Options for selecting 'prenda'
          style={{ width: '90%' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', margin: '5px' }}>
        <span>Cantidad</span>
        <Input
          placeholder="Ingresar Cantidad..."
          name="cantidad" // This links to the 'cantidad' state
          value={datos.cantidad} // Display the selected 'cantidad' value
          onChange={handleChange} // Update 'cantidad' when the input changes
          style={{ width: '90%' }}
        />
      </div>
    </Modal>
  );
};

export default EditarProducc;
