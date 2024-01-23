import React, { useState } from 'react';
import SalesAddModal from './Modals/SalesAddModal';
import { FaSearch, FaFilter, FaFilePdf } from 'react-icons/fa';
import { MdOutlineAddToPhotos } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoOptionsOutline } from "react-icons/io5";



import './css/SalesModalAdd.css';


import './css/Searchbar.css';

const SearchbarSales = () => {

	const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [userData, setUserData] = useState({name: '', email:''  });

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  const saveUserData = (data) => {
    setUserData(data);
  };

	const handleFilterClick = () => {
    // Add filter logic here
    console.log('Filter button clicked');
	} 

  return (
    <div className="navbar" >
   
        <div className="filter-button" onClick={handleFilterClick} style={{justifyContent:'end'}}>Filter
          <IoOptionsOutline />
        </div>

        <div className="filter-button" onClick={openPopUp}>
				{/* <div className="App">
      <div className="main-container"> */}
        {/* <div className="main-box" onClick={openPopUp}> */}
          Adddetails
        {/* </div> */}
        <SalesAddModal isOpen={isPopUpOpen} onClose={closePopUp} onSave={saveUserData} />
      {/* </div> */}
      {/* <div className="display-box">
        <h3>User Details:</h3>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      </div> */}
    {/* </div> */}

          <MdOutlineAddToPhotos />
         </div>
				



        <div className="filter-button" onClick={handleFilterClick} >Update Details
          <GrDocumentUpdate />
        </div>

        <div className="filter-button" onClick={handleFilterClick} >Delete Details
          <RiDeleteBin5Line />
        </div>

        <div className="search-bar" >
          <FaSearch  className='search-icon' />
          <input type="text" placeholder="Search..."  />
          <button>Search</button>
        </div>


      </div>
        );
};

export default SearchbarSales
