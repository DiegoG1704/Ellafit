import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png'
import usuario from '../../img/Usuario.png'
import './css/Sidebar.css'
import {
  ShoppingCartOutlined ,
  QuestionCircleOutlined,
  SettingOutlined,
  UserSwitchOutlined,
  FundProjectionScreenOutlined,
  ShopOutlined,
  PieChartOutlined ,
  ProductOutlined} from '@ant-design/icons';
import { Divider } from 'antd';


const Sidebar: React.FC = () => {
    const navigate = useNavigate()
   
  return(
    <>
    <div className='sidebar'>
        <img src={logo} alt='' />
        <Divider className='linea'/>
        <ul className="sidebar-menu">
          <li onClick={() => navigate('/Produccion')}>
            <i style={{ fontSize: '20px' }} ><FundProjectionScreenOutlined /></i>
            <span style={{ fontSize: '14px' }}>Produccion</span>
          </li>
          <li onClick={() => navigate('/Productos')}>
            <i style={{ fontSize: '20px' }} ><ProductOutlined /></i>
            <span style={{ fontSize: '14px' }}>Productos</span>
          </li>
          <li onClick={() => navigate('/ProductosRegistrados')}>
            <i style={{ fontSize: '20px' }} ><UserSwitchOutlined /></i>
            <span style={{ fontSize: '14px' }}>Productos Registrados</span>
          </li>
          <li onClick={() => navigate('/')}>
            <i style={{ fontSize: '20px' }} ><ShopOutlined /></i>
            <span style={{ fontSize: '14px' }}>Ventas</span>
          </li>
          <li onClick={() => navigate('/')}>
            <i style={{ fontSize: '20px' }} ><ShoppingCartOutlined /></i>
            <span style={{ fontSize: '14px' }}>PreVentas</span>
          </li>
          <li onClick={() => navigate('/')}>
            <i style={{ fontSize: '20px' }} ><PieChartOutlined /></i>
            <span style={{ fontSize: '14px' }}>Estadisticas</span>
          </li>
          <li onClick={() => navigate('/')}>
            <i style={{ fontSize: '20px' }} ><UserSwitchOutlined /></i>
            <span style={{ fontSize: '14px' }}>Roles</span>
          </li>
          <Divider className='linea'/>
          <li onClick={() => navigate('/')}>
            <i style={{ fontSize: '20px' }}><QuestionCircleOutlined /></i>
            <span style={{ fontSize: '14px' }}>Ayuda</span>
          </li>
          <li onClick={() => navigate('/')}>
            <i style={{ fontSize: '20px' }}><SettingOutlined /></i>
            <span style={{ fontSize: '14px' }}>Ajustes</span>
          </li>
        </ul>
        <div className='usuarioSidebar'>
          <img src={usuario} />
          <span>Anna Karin</span>
          <span>Anna@gmail.com</span>
        </div>
    </div>
    </>
  )
};

export default Sidebar;
