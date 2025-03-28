import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarLoader } from 'react-spinners';
import {Drawer} from 'antd'

const Clients = ({openForm}) => {
  const [isStatusEdit, setisStatusEdit] = useState(false)
  const navigate = useNavigate()
  const [Client, setClient] = useState([]);
  const [totalCalients, settotalCalients] = useState()
  const [limit, setlimit] = useState(20)
  const [Page, setPage] = useState(1)
  const [Loading, setLoading] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [clientDetails, setclientDetails] = useState()

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const handleToogleEditStatus = () =>{
    setisStatusEdit(!isStatusEdit)
  }
  
  const fetchClientData = async () =>{
    try {
      setLoading(true)
      const {data} = await axios.get('http://localhost:4000/fetch-client')
      setClient(data.client)
      settotalCalients(data.totalClients)
      
    } catch (error) {
      console.log(error.message)
    } finally{
      setLoading(false)
    } 
  
    }
  
    useEffect(()=>{
      fetchClientData()
    },[])

    
  return (
    <div className='w-full flex flex-col bg-white shadow-md py-4 rounded'>
      <div className='flex justify-between items-center w-full px-6'>
      <span className='text-emerald-500 font-semibold'>Manage Clients</span>
      <button onClick={()=>openForm(true)} className='px-3 py-1 cursor-pointer bg-cyan-500 font-semibold text-white rounded-4xl text-[12px] flex items-center gap-2'><i className="ri-add-circle-line text-[16px]"></i> Create New </button>
      </div>

      <div className='flex justify-between items-center w-full mt-6 px-6'>
        <div className='text-slate-500 flex gap-2'>
          <div>Show</div>
          <select value={limit} onChange={(e)=>setlimit(e.target.value)} className='px-2 cursor-pointer border border-slate-300 rounded'>
            <option value={10}>10</option>
          {[20,  30, 50].map((value, i)=>(
            <option key={i} value={value}>{value}</option>
          ))

          }
          </select>
        </div>
        <div className=' py-1 cursor-pointer font-semibold rounded-4xl text-[12px] flex items-center gap-2'>
          <input type="text" placeholder='filter' className='border border-slate-300  py-1 px-2 rounded  focus:outline-none' />
           </div>
      </div>
      <div className='mt-8 rounded px-6'>
          <div className='text-gray-500 flex justify-between px-4 gap-6 bg-slate-200 py-2 font-semibold rounded-t border border-slate-300'>
            <span className='text-slate-600 text-sm w-6'>SN</span>
            <span className='text-slate-600 text-sm w-56'>Company</span>
            <span className='text-slate-600 text-sm w-36'>Contact</span>
            <span className='text-slate-600 text-sm w-56'>Industry</span>
            <span className='text-slate-600 text-sm w-26'>Status</span>
          </div>
          {Array.isArray(Client) && Client.map((user, i)=>(
          <div key={i} onClick={()=>{
            setclientDetails(user)
            setIsDrawerOpen(true)
          }} className='text-gray-500 cursor-pointer hover:bg-gray-100 flex justify-between px-4 gap-6 bg-white py-2   border-b border-r border-l border-slate-300'>
            <span className='text-sm w-6'>{i+1}</span>
            <span className='text-sm w-56'>{user.clientName}</span>
            <span className='text-sm w-36 '>{user.mobileNo}</span>
            <span className='text-sm w-56 '>{user.industry}</span>
            <span className='w-26 flex gap-2'>{user.status?.active? user.status.active: 'Inactive' }</span> 
          </div>

          ))

          }

          {Loading && (
          <div className='flex items-center justify-center w-full h-10'>
          <BarLoader/>
          </div>
          )}  

        <Drawer 
        title="Company" 
        placement="right" 
        onClose={closeDrawer} 
        open={isDrawerOpen}
        >
        <div className='w-full flex justify-end text-cyan-500'><button className='cursor-pointer rounded hover:bg-gray-100 px-1'> Edit <i class="ri-edit-line"></i>  </button></div>
        <p>{clientDetails?.clientName}</p>
        <p>{clientDetails?.companyName}</p>
        </Drawer>
            
          
          <div className='flex justify-between mt-4'>
          <span className='text-[12px] text-gray-500 font-mono'>Showing {totalCalients} to {Page} of  {limit}</span>
          <div className='text-cyan-600 flex gap-2 text-[14px]'>
            <button className='px-4 rounded-3xl hover:bg-cyan-500 active:bg-cyan-600 hover:text-white cursor-pointer py-1'>Previous</button>
            <button className='px-4 rounded-3xl hover:bg-cyan-500 active:bg-cyan-600 hover:text-white cursor-pointer py-1'>Next</button>
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default Clients