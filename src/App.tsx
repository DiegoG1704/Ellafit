import Index from '../src/Presentacion/components/index'
import { Route, Routes } from 'react-router-dom'
import Produccion from './Presentacion/components/Produccion/Produccion'
import Productos from './Presentacion/components/Productos/Productos'
import ProductosRegis from './Presentacion/components/ProductosRegis/ProductosRegis'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/Produccion' element={<Produccion/>}/>
      <Route path='/Productos' element={<Productos/>}/>
      <Route path='/ProductosRegistrados' element={<ProductosRegis/>}/>
    </Routes>
  )
}

export default App
