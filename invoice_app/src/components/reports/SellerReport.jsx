
import React, { useRef } from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaRegShareSquare } from "react-icons/fa";
import { RiFileDownloadLine } from 'react-icons/ri';
import { FaDownload } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";


import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import '../css/Salesreport.css'
import SearchbarSales from '../SearchbarSales';
const SellerReport = () => {


	
	const ComponentPdf = useRef();
	const ComponentPdf1 = useRef();
	
		
		const handleGeneratePDFClick = useReactToPrint({
			content:()=>ComponentPdf.current,
			documentTitle:"Salesreport",
			pageStyle: `
				@page {
					size: auto;
					margin: 0mm;
				}
				@media print {
					body {
						margin: 2px;
					}
					@page {
						font-size: 10pt; /* Adjust the font size as needed */
					}
				}
			`,
			onAfterPrint:()=>alert("data saved in pdf")
		});
	
				const [data, setData] = useState([]);
	
			useEffect(() => {
			const fetchData = async () => {
				try {
					const response = await axios.get('https://localhost:7133/api/Values'); // Replace with your API endpoint
					setData(response.data);
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			};
	
			fetchData();
		}, []);
	
		const addColumnsToData = () => {
			return data.map(item => ({
				...item,
				total:item.price*item.quantity,
			}));
		};
	
		
		const contentRef = useRef(null);

		const handleDownloadPDFClick = () => {
			const input = contentRef.current;
	
			// Generate a canvas from the content
			html2canvas(input).then((canvas) => {
				// Convert canvas to base64 image data
				const imgData = canvas.toDataURL('image/png');
	
				// Create PDF using jsPDF
				const pdf = new jsPDF('p', 'mm', 'a4');
				const pdfWidth = pdf.internal.pageSize.getWidth();
				const pdfHeight = pdf.internal.pageSize.getHeight();
				const imgWidth = pdfWidth;
				const imgHeight = (canvas.height * imgWidth) / canvas.width;
	
				pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
				pdf.save('downloaded.pdf');
			});
		};
		const updatedData = addColumnsToData();
	
		//select theme code
		const [isOpen, setIsOpen] = useState(false);
		const [selectedStyle, setSelectedStyle] = useState(null);
	
		const styleOptions = [
			{ label: 'Default', value: 'default-style' },
			{ label: 'Highlighted', value: 'highlighted-style' },
			{ label: 'Underlined', value: 'underlined-style' },
		];
	
		const toggleDropdown = () => {
			setIsOpen(!isOpen);
		};
	
		const selectStyle = (style) => {
			setSelectedStyle(style);
			setIsOpen(false);
		};
	


	
		return (
			<div>
			<div id='left_box' >
<SearchbarSales/>	
				<div className='download_div'>
	
				<div className=" {`box ${selectedStyle || ''}`} " id='themebtn' onClick={toggleDropdown}  >Select Theme
				<TbHandClick />
					{isOpen && (
						<div className="dropdown_themebtn">
							{styleOptions.map((option) => (
								<div
									key={option.value}
									className={`dropdown-option ${option.value}`}
									onClick={() => selectStyle(option.value)}
								>
									{option.label}
								</div>
							))}
						</div>
					)}
					</div>
	
	<div className="generate-pdf-button" onClick={handleGeneratePDFClick}  >Share
						<FaRegShareSquare />
					</div>
	
						<div className="generate-pdf-button" onClick={handleGeneratePDFClick} >Save PDF
						<RiFileDownloadLine />
					</div>
	
					<div className="generate-pdf-button" onClick={handleDownloadPDFClick} >Download 
					<FaDownload/>
					</div>
	
					
			</div>
	
				<div ref={contentRef}  className="container mt-5" id='display1' >
				<div ref={ComponentPdf} className={ `selected-box ${selectedStyle || ''}`}  >
	
					{/* <div className= 'saleshead_box'>
					<h2 style={{}}>PRODUCTS SELLER REPORT</h2>
					<div className='rowbox'>
					 <div className='sales_sidebox'>
						<h3>Actualize Consulting Engineers(India) Pvt.Ltd</h3>
							<h5>Address:</h5> 
							<h6>91 Springboard 5th Floor,Trifecta Adatto, 21, ITPL Main Road, </h6>
							<h6>Mahadevapura, Bengaluru – 560048</h6>
							<h6>Phone No: +91 89518 69605

</h6>
							 <h6>Email : contact@actualize.co.in </h6>
					 </div>
					 <div className='sales_midbox' ></div>
					 <div className=' sales_rightbox ' >
					 <div className='logobox'> <img src='https://media.licdn.com/dms/image/C510BAQHu1nYC2ZcOHA/company-logo_200_200/0/1630607313928/actualizece_logo?e=2147483647&v=beta&t=HHv1kznOx-75fVcLLtAEaVL2X6jyd5zRuz1nHeqaw6I'></img></div>
					 <h6 >Date</h6>
					 <h6 >From : XX-XX-XXXX</h6>
					 <h6>To   : XX-XX-XXXX</h6>
					 </div>
					</div>
					</div> */}
					
				<h1 className='orderdetails'>Seller Details</h1>
				<table className=" sales_table" style={{width:'100%'}}>
					<thead>
					<tr>
<th>Email</th>
<th>Name</th>
<th>Seller ID</th>
<th>Industry Type</th>
<th>No Products Sold</th>
<th>Amount Earned</th>
<th>Amount Credited</th>
<th><button>Bill</button></th>
</tr>
					</thead>
					<tbody>
						{updatedData.map((item) => (
							<tr key={item.id}>
								<td>{item.orderDate}</td>
								<td>{item.customerName}</td>  
								<td>{item.orderId}</td>
								<td>{item.productId}</td>
								<td>{item.productName}</td>
								<td>{item.deliveryDate}</td>
								<td>{item.quantity}</td>
								<td>₹{item.price}</td>
								<td>₹{item.total}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			</div>
	
	</div>
			</div>
	)
}

export default SellerReport

