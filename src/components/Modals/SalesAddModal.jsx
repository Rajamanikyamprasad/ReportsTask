import React, { useState } from 'react';
import '../css/SalesModalAdd.css';

const SalesAddModal = ({ isOpen, onClose, onSave}) => {

  const [userData, setUserData] = useState({ name: '', address: '',city:'',state:'', zipcode:'', phoneno:'',email:'' });

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // const handleSave = () => {
  //   onSave(userData);
  //   onClose();
  // };

  const handleSave = () => {
    onSave(userData);
    setTimeout(() => {
      onClose();
  }, 1000);

};

  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <h2>Enter Your Details</h2>
        <label>Company Name:</label>
        <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
        <label>Street Address:</label>
        <input type="text" name="address" value={userData.address} onChange={handleInputChange} />
        <label>City:</label>
        <input type="text" name="city" value={userData.city} onChange={handleInputChange} />
        <label>State:</label>
        <input type="text" name="state" value={userData.state} onChange={handleInputChange} />
        <label>Zipcode:</label>
        <input type="text" name="zipcode" value={userData.zipcode} onChange={handleInputChange} />
        <label>Phone Number:</label>
        <input type="text" name="phoneno" value={userData.phoneno} onChange={handleInputChange} />
        <label>Email:</label>
        <input type="text" name="email" value={userData.email} onChange={handleInputChange} />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default SalesAddModal
