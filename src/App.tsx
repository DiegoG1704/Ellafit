import './App.css'
import Index from '../src/Presentacion/components/index'
import { Route, Routes } from 'react-router-dom'
import Produccion from './Presentacion/components/Produccion/Produccion'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/produccion' element={<Produccion/>}/>
    </Routes>
  )
}

export default App
