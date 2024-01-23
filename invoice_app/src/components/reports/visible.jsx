import React, { useEffect, useState } from 'react';
import BarChart from './Barchart';
import YearBarChart from './YearBarChart';
import DailySalesChart from './DailySalesChart';

const Visible = () => {

  const [monthdata, setMonthdata] = useState([ ]);
  const [yeardata, setYeardata] = useState([ ]);

  useEffect( ()=>{
    const fetchdata = async ()=>{
      try{
        const response = await fetch('https://localhost:44347/api/Orders/monthly-amounts');

        if(!response.ok)
        {
          throw new Error('NEtwork response is not ok')
        }

        const data = await response.json();
        setMonthdata(data)
      }catch(error){
        console.error('Error fecthing data:', error)
      }
    }
    fetchdata();
  },[]);
  console.log(monthdata)

  useEffect( ()=>{
    const fetchdata = async ()=>{
      try{
        const response = await fetch('https://localhost:44347/api/Orders/yearly-amounts');

        if(!response.ok)
        {
          throw new Error('NEtwork response is not ok')
        }

        const data = await response.json();
        setYeardata(data)
      }catch(error){
        console.error('Error fecthing data:', error)
      }
    }
    fetchdata();
  },[]);

  return (
    <div>
      <h2>welcome to visble</h2>
     <div>
     <BarChart data={monthdata} />
     </div>
     <div>
     <YearBarChart data ={yeardata}/>
     </div>
     <div>
      <DailySalesChart data={monthdata}/>
     </div>
    </div>
  )
}

export default Visible
