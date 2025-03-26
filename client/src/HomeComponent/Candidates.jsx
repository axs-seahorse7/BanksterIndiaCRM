import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Candidates = ({openForm}) => {
    const [isStatusEdit, setisStatusEdit] = useState(false)
    const navigate = useNavigate()
    const handleToogleEditStatus = () =>{
      setisStatusEdit(!isStatusEdit)
    }

    const [Client, setClient] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" },
        { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "456-789-1234" },
        { id: 4, name: "Bob Brown", email: "bob@example.com", phone: "789-123-4567" },
        { id: 5, name: "Charlie White", email: "charlie@example.com", phone: "321-654-9870" },
        { id: 6, name: "David Green", email: "david@example.com", phone: "654-321-7890" },
        { id: 7, name: "Ella Blue", email: "ella@example.com", phone: "852-963-7410" },
        { id: 8, name: "Frank Black", email: "frank@example.com", phone: "147-258-3690" },
        { id: 9, name: "Grace Adams", email: "grace@example.com", phone: "369-147-2580" },
        { id: 10, name: "Henry Ford", email: "henry@example.com", phone: "753-951-8520" }
      ]);


  return (
  <div className='w-full flex flex-col bg-white shadow-md py-4 rounded'>
      <div className='flex justify-between items-center w-full px-6'>
        <span className='text-emerald-500 font-semibold'>Manage Candidates</span>
        <button onClick={()=>openForm(true)} className='px-3 py-1 cursor-pointer bg-cyan-500 font-semibold text-white rounded-4xl text-[12px] flex items-center gap-2'><i className="ri-add-circle-line text-[16px]"></i> Create New </button>
      </div>

      <div className='flex justify-between items-center w-full mt-6 px-6'>
        <div className='text-slate-500 flex gap-2'>
          <div>Show</div>
          <select className='px-2 cursor-pointer border border-slate-300 rounded'>
            <option value={10}>10</option>
          {[10, 50, 25, 50].map((value, i)=>(
            <option key={i} value={value}>{value}</option>
          ))

          }
          </select>
        </div>
        <div className=' py-1 cursor-pointer font-semibold rounded-4xl text-[12px] flex items-center gap-2'>
          <input type="text" placeholder='filter' className='border border-slate-300  py-1 px-2 rounded  focus:outline-none' />
           </div>
      </div>
      <div className='mt-8 rounded px-6 '>
          <div className='text-gray-500 flex justify-around pr-10 pl-4 gap-6 bg-slate-200 py-2 font-semibold rounded-t border border-slate-300'>
            <span className='text-slate-600 bord  text-sm w-6'>SN</span>
            <span className='text-slate-600 bord  text-sm w-26'>Candidate Name</span>
            <span className='text-slate-600 bord  text-sm w-36'>Email</span>
            <span className='text-slate-600 bord  text-sm w-36'>Contact</span>
            <span className='text-slate-600 bord  text-sm w-36'>Title</span> 
            <span className='text-slate-600 bord  text-sm w-26'>Client</span>
            <span className='text-slate-600 bord  text-sm w-26'>Status</span>
            <span className='text-slate-600 bord  text-sm w-8 '>Action</span>
          </div>
          { Client.map((user, i)=>(
          <div key={i} className='text-gray-500 justify-around flex pr-10 pl-4 gap-6 bg-white py-2   border-b border-r border-l border-slate-300'>
            <span className='text-sm   h-6 w-6'>{i+1}</span>
            <span className='text-sm   w-26'>{user.name}</span>
            <span className='text-sm w-36 '>{user.email}</span>
            <span className='text-sm w-36 '>{user.phone}</span>
            <span className='text-sm w-36 '>Digital Marketing</span>
            <span className='text-sm w-26 '>Bankster India</span>
            <span className='w-26 flex gap-2'>
                {!isStatusEdit && (
                  <span>Active</span>
                )}

              {isStatusEdit && (
                <select name="" id="">
                  <option value="" hidden>Active</option>
                  {["active", "rejected", 'hold', 'progress'].map((value, i)=>(
                    <option value={value} key={i}>{value}</option>
                  ))}
                </select>
              )}

              {!isStatusEdit ? (<i onClick={()=>handleToogleEditStatus()} className="ri-pencil-line text-cyan-500 cursor-pointer"></i>): (
              <i onClick={()=>handleToogleEditStatus()} className="ri-check-fill text-emerald-500 cursor-pointer"></i>
              )
            }          
            </span>            
            <div  className='text-sm w-8 flex gap-0.5'>
              <button className='hover:bg-slate-200 rounded-full px-1 py-0.5 cursor-pointer'>
              <i className="ri-pencil-line text-cyan-500 cursor-pointer"></i>
              </button>
              <button className='hover:bg-slate-200 rounded-full px-1 py-0.5 cursor-pointer'>
              <i className="ri-settings-3-line text-emerald-500"></i> 
              </button>
              <button className='hover:bg-slate-200 rounded-full px-1 py-0.5 cursor-pointer'>
              <i className="ri-delete-bin-line text-red-500"></i>
              </button>
            </div>
          </div>

          ))

          }
          
          <div className='flex justify-between mt-4'>
            <span className='text-[12px] text-gray-500 font-mono'>Showing 1 to 10 of 80 enteries</span>
            <div className='text-cyan-600 flex gap-2 text-[14px]'>
              <button className='px-4 rounded-3xl hover:bg-cyan-500 active:bg-cyan-600 hover:text-white cursor-pointer py-1'>Previous</button>
              <button className='px-4 rounded-3xl hover:bg-cyan-500 active:bg-cyan-600 hover:text-white cursor-pointer py-1'>Next</button>
            </div>
          </div>
      </div>
      
    </div>  )
}

export default Candidates 