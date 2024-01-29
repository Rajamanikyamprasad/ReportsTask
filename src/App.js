import React, { useState } from 'react';
import './App.css'; // Import your CSS file for styling

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import About from './components/About';
import SalesReport from './components/reports/SalesReport';
import CustomerReport from './components/reports/CustomerReport';
import MarketingReport from './components/reports/MarketingReport';
import SellerReport from './components/reports/SellerReport';
import TransactionReport from './components/reports/TransactionReport';

import { FaCircleUser } from "react-icons/fa6";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import RevenueReport from './components/reports/RevenueReport';
import ChartComponent from './components/reports/visible';
import Inventory from './components/Inventory';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  const handleNavItemClick = (page) => {
    setActivePage(page);
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleReportsDropdown = () => {
    setIsReportsOpen(!isReportsOpen);
  };

  const renderActiveComponent = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'dashboard':
        return <Dashboard />;
      case 'about':
        return <About />;
      case 'sales-report':
        return <SalesReport />;
      case 'customer-report':
        return <CustomerReport />;
      case 'seller-report':
        return <SellerReport/>;
        case 'visible-report':
          return <ChartComponent/>;
      case 'transaction-report':
      return <TransactionReport/>;
      case 'revenue-report':
        return <RevenueReport/>;
        case 'inventory-report':
          return <Inventory/>;
      default:
        return null;
    }
  };

  return (
    <div>
    <div className='titlebox'><div className="toggle-button" onClick={toggleSidebar}>
        ☰
      </div><div className='image'><img src='https://media.licdn.com/dms/image/C510BAQHu1nYC2ZcOHA/company-logo_200_200/0/1630607313928/actualizece_logo?e=2147483647&v=beta&t=HHv1kznOx-75fVcLLtAEaVL2X6jyd5zRuz1nHeqaw6I'></img></div><span> Fathom Invoice</span>
   <div className='icondiv'>
    <div className='icon'>
    <CiMenuKebab />
    </div>
    <div className='icon'>
    <IoNotificationsCircleOutline />
    </div>
    <div className='icon1' >
    {/* <FaCircleUser /> */}
    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6PWiT4jbOgFjpAy0ROofuZ4PS8AzvDqqlDw&usqp=CAU'></img>
    </div>

   </div>
   </div>

    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
    

      <div className="sidebar" >
          <li onClick={() => handleNavItemClick('home')}className='makedownhome'>Home</li>
          <hr></hr>
          <li onClick={() => handleNavItemClick('dashboard')}>Dashboard</li>
          <hr></hr>
          <li onClick={() => handleNavItemClick('about')}>Manage Users</li>
          <hr></hr>
          <li onClick={() => handleNavItemClick('dashboard')}>Manage Orders</li>
          <hr></hr>
          <li >
            <div  className="dropdown">
              <span onClick={toggleReportsDropdown}>Reports <span>▼</span></span>
              {isReportsOpen && (
                <div> 
                  <li onClick={() => handleNavItemClick('sales-report')}>Sales Report</li>
                  <li onClick={() => handleNavItemClick('customer-report')}>Customer Report</li>
                  <li onClick={() => handleNavItemClick('seller-report')}>Seller Report</li>
                  <li onClick={() => handleNavItemClick('transaction-report')}>Transaction Report</li>
                  <li onClick={() => handleNavItemClick('revenue-report')}>Revenue Report</li>
                  <li onClick={() => handleNavItemClick('seller-report')}>Product Analytic Report</li>
                  <li onClick={() => handleNavItemClick('visible-report')}>Acquistion Report</li>

                  </div>
              )}
            </div>
          </li>
          <hr></hr>
          <li onClick={() => handleNavItemClick('inventory-report')}>Inventory</li>
          <hr></hr>
          <li onClick={() => handleNavItemClick('dashboard')}>Update Products</li>

      </div>

      <div className="main-content">{renderActiveComponent()}</div>
    </div>
    </div>
  );
};

export default App;

