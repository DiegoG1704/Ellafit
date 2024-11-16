import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/logo.png'
import { Button } from 'antd';
import './css/Sidebar.css'
import { ArrowLeftOutlined,ArrowRightOutlined,AuditOutlined,LogoutOutlined} from '@ant-design/icons';


const Sidebar: React.FC = () => {
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
  return(
    <>
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <img src={logo} alt='' />
        <ul className="sidebar-menu">
          <li onClick={() => navigate('/')}>
            <i style={{ fontSize: '20px' }} ><AuditOutlined /></i>
            {isSidebarOpen && <span style={{ fontSize: '14px' }}>Produccion</span>}
          </li>
          <li onClick={() => navigate('/')}>
            <i style={{ fontSize: '20px' }}><LogoutOutlined /></i>
            {isSidebarOpen && <span style={{ fontSize: '14px' }}>Cerrar Sesión</span>}
          </li>
        </ul>
        <Button
        icon={isSidebarOpen? <ArrowLeftOutlined/> : <ArrowRightOutlined/>}
        onClick={toggleSidebar}
        className="toggle-button"
        style={{
          left: isSidebarOpen ? '180px' : '60px',
          zIndex: 200,
        }}
        />
    </div>
    </>
  )
};

export default Sidebar;
