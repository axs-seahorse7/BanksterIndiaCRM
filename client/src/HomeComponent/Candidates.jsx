import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Popover, Button, Checkbox, Drawer , Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {BarLoader} from 'react-spinners'
import { useMessage } from '../../Global/messageContext';
import axios from 'axios';


const Candidates = ({openForm, filter}) => {
    const [isStatusEdit, setisStatusEdit] = useState(false)
    const message = useMessage()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [candidateLendth, setcandidateLendth] = useState()
    const [limit, setlimit] = useState(20)
    const [page, setpage] = useState(1)
    const [Candidates, setCandidates] = useState();
    const [candidateDetails, setCandidateDetails] = useState(null);
    const [openProfile, setopenProfile] = useState(false)
    const [profileNavigate, setprofileNavigate] = useState()
    const [Loading, setLoading] = useState(false)



    const [filters, setFilters] = useState({
      active: false,
      rejected: false,
      hold: false,
      progress:false,
      joined:false
    });
  
    const toggleDrawer = () => setOpen(!open);
  
    const handleChange = (e) => {
      setFilters({ ...filters, [e.target.name]: e.target.checked });
    };


    const handleToogleEditStatus = () =>{
      setisStatusEdit(!isStatusEdit)
    }

     //fetch ccandidates by filter and caniddate length
     const fetchCandidate = async () =>{
       try {
        setLoading(true)
        const skip =  (limit * page) - limit
        const {data} = await axios.get('http://localhost:4000/fetch-candidate', {
        params:{
        query:filters,
        limit,
        skip,
        }
        })

        setCandidates(data?.candidates)
        setcandidateLendth(data.totalCandidates)
         
       } catch (error) {
        console.log(error.message)
       }finally{
      setLoading(false)
       }

     }

     
    useEffect(() => {
    fetchCandidate()
    }, [])


    const next = ()=>{
    if(Candidates >= candidateLendth) return
    setpage(page+1)
    }
    const prev = ()=>{
    if(candidateLendth === 0) return
    setpage(page-1)
    }

    useEffect(() => {
    fetchCandidate()
    }, [page])
    


      const content = (
        <div style={{ width: 250, padding: "10px" }}>
          <Checkbox name="active" checked={filters.active} onChange={handleChange}>
            Active
          </Checkbox>
          <br />
          <Checkbox name="rejected" checked={filters.rejected} onChange={handleChange}>
            Rejected
          </Checkbox>
          <br />
          <Checkbox name="hold" checked={filters.hold} onChange={handleChange}>
            Hold
          </Checkbox>
          <br/>
          <Checkbox name="joined" checked={filters.joined} onChange={handleChange}>
            Joined
          </Checkbox>
          <br />
          
          <Button type="primary" block onClick={() => filter(filters)}>
            Save
          </Button>
          
        </div>

      );
      




  return (
  <div className='w-full flex flex-col bg-white shadow-md py-4 rounded'>
      <div className='flex justify-between items-center w-full px-6'>
        <span className='text-emerald-500 font-semibold'>Manage Candidates</span>
        <button onClick={()=>openForm(true)} className='px-3 py-1 cursor-pointer bg-cyan-500 font-semibold text-white rounded-4xl text-[12px] flex items-center gap-2'><i className="ri-add-circle-line text-[16px]"></i> Create New </button>
      </div>

      <div className='flex justify-between items-center w-full mt-6 px-6'>
        <div className='text-slate-500 flex gap-2'>
        <div>Show</div>
        <select  className='px-2 cursor-pointer border border-slate-300 rounded'>
        <option value={10}>10</option>
        {[10, 25, 50].map((value, i)=>(
        <option key={i} value={value}>{value}</option>
        ))}
        </select>
        </div>

        <div className=' py-1 px-4 cursor-pointer font-semibold rounded-4xl text-[12px] flex items-center gap-3'>
          <input type="text" placeholder='Search Candidate' className='border border-slate-300 w-[400px]  py-1 px-2 rounded  focus:outline-none' />
          <div >
          <Popover content={content} title="Filter Options" trigger="click" placement="rightTop">
          <button  ><i className="ri-equalizer-2-line text-2xl text-cyan-500 cursor-pointer"></i> </button>
          </Popover>
          </div>
          </div>
      </div>

      <div className='mt-8 rounded px-4 '>
          <div className='text-gray-500 flex justify-around pr-10 pl-4 gap-6 bg-slate-200 py-2 font-semibold rounded-t border border-slate-300'>
            <span className='text-slate-600 bord  text-sm w-6'>SN</span>
            <span className='text-slate-600 bord  text-sm w-36'>Candidate Name</span>
            <span className='text-slate-600 bord  text-sm w-36'>Email</span>
            <span className='text-slate-600 bord  text-sm w-36'>Contact</span>
            <span className='text-slate-600 bord  text-sm w-36'>Designation</span> 
            <span className='text-slate-600 bord  text-sm w-26'>Company</span>
            <span className='text-slate-600 bord  text-sm w-26'>Location</span>
            <span className='text-slate-600 bord  text-sm w-16'>Status</span>
          </div>
          {Array.isArray(Candidates) && Candidates.length>0 && Candidates.map((user, i)=>(
          <div onClick={()=>{
          setopenProfile(true)
          setCandidateDetails(user)}
          } 
          key={i} 
          className='text-gray-500 hover:bg-gray-100 justify-around flex pr-10 pl-4 gap-6 cursor-pointer bg-white py-2   border-b border-r border-l border-slate-300'
          >
            <span className='text-sm h-6 w-6'>{i+1}</span>
            <span className='text-sm w-36'> {user.name} </span>
            <span className='text-sm w-36 '>{user.email}</span>
            <span className='text-sm w-36 '>{user.mobileNo}</span>
            <span className='text-sm w-36 '>{user.companyDetails.designation}</span>
            <span className='text-sm w-26 '>{user.companyDetails.companyName}</span>
            <span className='text-sm w-26 '>{user.location.city}</span>
            <span className='w-16 flex gap-2  items-center'>Active </span>            
            
          </div>

          ))}

          {Loading && (
          <div className='w-full h-10 items-center flex justify-center'>
          <BarLoader  />
          </div>
          )}
          <div>
            <Drawer
              title="Candidate Profile"
              placement="right"
              width={400}
              onClose={() => setopenProfile(false)}
              open={openProfile}
            >
              {candidateDetails ? (
                <div>
                  <Card style={{ textAlign: ""  }}>
                    <div className='flex items-center gap-4'>
                    <Avatar size={60} icon={<UserOutlined />} />
                    <div className='flex flex-col gap-0'>
                    <h2 className='text-slate-600 font-semibold text-xl'>{candidateDetails.name}</h2>
                    <p style={{ color: "gray" }}>{candidateDetails.companyDetails.designation}</p>
                    </div>
                    </div>
                  </Card>
                    <div className='py-4 flex gap-2 flex-col'>
                      <div className='flex shadow border border-slate-200 rounded justify-between overflow-hidden'>
                      <span className='py-1 w-26 px-4 bg-zinc-600 text-white '>Contact</span>
                      <span className='px-4 text-gray-600 font-semibold flex items-center'>{candidateDetails.mobileNo}</span>
                      </div>

                      <div className='flex shadow border border-slate-200 rounded justify-between overflow-hidden'>
                      <span className='py-1 w-26 px-4 bg-zinc-600 text-white '>Email</span>
                      <span className='px-4 text-gray-600 font-semibold flex items-center'>{candidateDetails.email}</span>
                      </div>

                      <div className='flex shadow border border-slate-200 rounded justify-between overflow-hidden'>
                      <span className='py-1 w-26 px-4 bg-zinc-600 text-white '>Company</span>
                      <span className='px-4 text-gray-600 font-semibold flex items-center'>{candidateDetails.companyDetails.companyName}</span>
                      </div>

                      <div className='flex shadow border border-slate-200 rounded justify-between overflow-hidden'>
                      <span className='py-1 w-26 px-4 bg-zinc-600 text-white '>Status</span>
                      <span className='px-4 text-gray-600 font-semibold flex items-center'>Active</span>
                      </div>

                    </div>

                  </div>
                  ) : (
                  <p>Loading candidate details...</p>
                  )}
                  </Drawer>
                </div>
          
                <div className='flex justify-between mt-4'>
                  <span className='text-[12px] text-gray-500 font-mono'>Showing {Math.ceil(candidateLendth /limit)} out of {candidateLendth} enteries</span>
                  <div className='text-cyan-600 flex gap-2 text-[14px]'>
                  <button className='px-4 rounded-3xl hover:bg-cyan-500 active:bg-cyan-600 hover:text-white cursor-pointer py-1'>Previous</button>
                  <button className='px-4 rounded-3xl hover:bg-cyan-500 active:bg-cyan-600 hover:text-white cursor-pointer py-1'>Next</button>
                  </div>
                </div>
      </div>
      
    </div>  
    
  
  )
}

export default Candidates 