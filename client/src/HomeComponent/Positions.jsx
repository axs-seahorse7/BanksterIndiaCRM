import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {BarLoader} from 'react-spinners'
import axios from 'axios'
import { Drawer } from 'antd';


const Positions = ({openForm}) => {
  const navigate = useNavigate();
  const [isStatusEdit, setisStatusEdit] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [totalPositions, settotalPositions] = useState()
  const [limit, setlimit] = useState(20)
  const [Page, setPage] = useState(1)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [positionDetails, setpositionDetails] = useState()

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };



  const handleToogleEditStatus = () =>{
  setisStatusEdit(!isStatusEdit)
  }

  const [Client, setClient] = useState([]);

  const fetchPositions = async () =>{
    try {
      setLoading(true)
      const {data} = await axios.get('http://localhost:4000/fetch-position')
      setClient(data.positions)
      settotalPositions(data.totalPositions)
      
    } catch (error) {
      console.log(error.message)
    } finally{
      setLoading(false)
    } 
  
    }
  
    useEffect(()=>{
      fetchPositions()
    },[])



  return (
    <div className='w-full flex flex-col bg-white shadow-md py-4 rounded'>
      <div className='flex justify-between items-center w-full px-6'>
        <span className='text-emerald-500 font-semibold'>Manage Positions</span>
        <button onClick={() => openForm(true)} className='px-3 py-1 cursor-pointer bg-cyan-500 font-semibold text-white rounded-4xl text-[12px] flex items-center gap-2'><i className="ri-add-circle-line text-[16px]"></i> Create New </button>
      </div>

      <div className='flex justify-between items-center w-full mt-6 px-6'>
        <div className='text-slate-500 flex gap-2'>
          <div>Show</div>
          <select value={limit} onChange={(e)=>setlimit(e.target.value)} className='px-2 cursor-pointer border border-slate-300 rounded'>
          {[20, 30, 50].map((value, i)=>(
            <option key={i} value={value}>{value}</option>
          ))

            }
          </select>
        </div>
        <div className=' py-1 cursor-pointer font-semibold rounded-4xl text-[12px] flex items-center gap-2'>
          <input type="text" placeholder='filter' className=' w-[300px] border border-slate-300  py-1 px-2 rounded  focus:outline-none ' />
        </div>
      </div>
      <div className='mt-8 rounded px-6 '>
      <div className='text-gray-500 flex px-4 gap-6 bg-slate-200 py-2 font-semibold rounded-t border border-slate-300'>
          <span className='text-slate-600 text-sm w-6'>SN</span>
          <span className='text-slate-600 text-sm w-36'>Job Title</span>
          <span className='text-slate-600 text-sm w-36 '>Company Name</span>
          <span className='text-slate-600 text-sm w-36 '>Product</span>
          <span className='text-slate-600 text-sm w-16 '>Budget</span>
          <span className='text-slate-600 text-sm w-16 '>Location</span>
          <span className='text-slate-600 text-sm w-16 '>Sahred CVs</span>
          <span className='text-slate-600 text-sm w-36 '>Recruiter Name</span>
          <span className='text-slate-600 text-sm w-8 '>Status</span>
        </div>
        <div >
        {Array.isArray(Client) && Client.map((user, i) => (
            <div key={i} onClick={()=>{
              setpositionDetails(user)
              setIsDrawerOpen(true)
            }} className='text-gray-500 cursor-pointer hover:bg-gray-100 flex px-4 gap-6 bg-white py-2   border-b border-r border-l border-slate-300'>
              <span className='text-sm w-6'>{i + 1}</span>
              <span className='text-sm w-36'>{user.jobTitle}</span>
              <span className='text-sm w-36 '>{user.client?.name}</span>
              <span className='text-sm w-36 '>{user.client?.product}</span>
              <span className='text-sm w-16 '>{user.maxSalary}</span>
              <span className='text-sm w-16 '>{user.location.city}</span>
              <span className='text-sm w-16 '>{user.client?.Cvs}</span>
              <span className='text-sm w-36 '>recruiter Name</span>
              <span className='text-sm w-8 '>{user.open? 'Open' : 'Close'}</span>
              
            </div>

          ))

          }


          {Loading && (
          <div className='flex items-center justify-center w-full h-10'>
            <BarLoader/>
          </div>
        )} 

        <Drawer 
          title="Position" 
          placement="right" 
          onClose={closeDrawer} 
          open={isDrawerOpen}
        >
          <div className='w-full flex justify-end text-cyan-500'><button className='cursor-pointer rounded hover:bg-gray-100 px-1'> Edit <i class="ri-edit-line"></i>  </button></div>
          <p>{positionDetails?.jobTitle}</p>
        </Drawer>

        </div>

        <div className='flex justify-between mt-4'>
          <span className='text-[12px] text-gray-500 font-mono'>Showing {Client.length * Page} out of {totalPositions} enteries</span>
          <div className='text-cyan-600 flex gap-2 text-[14px]'>
            <button className='px-4 rounded-3xl hover:bg-cyan-500 active:bg-cyan-600 hover:text-white cursor-pointer py-1'>Previous</button>
            <button className='px-4 rounded-3xl hover:bg-cyan-500 active:bg-cyan-600 hover:text-white cursor-pointer py-1'>Next</button>
          </div>
        </div>
      </div>

    </div>)
}

export default Positions