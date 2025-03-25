import React, { useState } from 'react'
import Clients from '../HomeComponent/Clients'
import Candidates from '../HomeComponent/Candidates'
import Positions from '../HomeComponent/Positions'

const RecruiterDashboard = () => {
  const [Page, setPage] = useState('dashboard')

  return (
    <div>
      <div className='flex'>
        <section className='w-[200px] border border-slate-200 h-screen shadow relative'>
          <div className='py-4 px-4 w-full border-b border-slate-300 flex flex-col gap-2 '>
            <span className='text-xl cursor-pointer px-2 py-1 hover:bg-slate-600 hover:text-white  rounded-full'><i className="ri-menu-2-line"></i></span>
            <span className='text-slate-700 w-full font-semibold tracking-wider cursor-pointer rouded-md hover:bg-slate-200 active:bg-slate-400 active:text-white px-2 flex items-center justify-ceter py-2 select-none rounded '>Smart Hirex</span>
          </div>
          <div className='w-full pt-4 px-0.5 gap-1 flex flex-col'>
            <div onClick={() => setPage('dashboard')} className={`${Page === 'dashboard' ? 'text-cyan-500 bg-slate-200' : "text-slate-500"}  w-full border-sate-200 font-semibold cursor-pointer pl-4 hover:bg-slate-200 active:bg-slate-300 active:text-gray-700 py-2 select-none flex gap-4 `}><span><i className="ri-dashboard-fill"></i></span> <span>Dashboard</span></div>
            <div onClick={() => setPage('position')} className={`${Page === 'position' ? 'text-cyan-500 bg-slate-200' : "text-slate-500"}  w-full border-sate-200 font-semibold cursor-pointer pl-4 hover:bg-slate-200 active:bg-slate-300 active:text-gray-700 py-2 select-none flex gap-4 `}><span><i className="ri-briefcase-4-fill"></i></span> <span>Position</span></div>
            <div onClick={() => setPage('candidate')} className={`${Page === 'candidate' ? 'text-cyan-500 bg-slate-200' : "text-slate-500"}  w-full border-sate-200 font-semibold cursor-pointer pl-4 hover:bg-slate-200 active:bg-slate-300 active:text-gray-700 py-2 select-none flex gap-4 `}><span><i className="ri-user-follow-fill"></i></span> <span>Candidates</span></div>
          </div>

          <div className='absolute bottom-0 py-4 flex item-center justify-center px-2 hover:bg-slate-200 w-full '>
            <div className='  cursor-pointer font-semibold select-none text-red-600 '><i className="ri-logout-box-line"></i> Logout</div>
          </div>
        </section>
        <section className='h-screen w-full bg-gray-100'>
          <nav className='h-18.5 flex items-center justify-between px-4 bg-white shadow'>
            <div className='text-cyan-600 capitalize font-semibold text-xl'>
              {Page}
            </div>
            <div className=' flex gap-2 items-center pr-6 '>
              <div className='h-8 w-8 rounded-full bg-slate-400'></div>
              <span className='text-md text-slate-600'>sagar</span>
            </div>
          </nav>
          <div className='h-[85vh] overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
            {Page === 'dashboard' && (
              <div className='flex gap-4  py-4 px-4 flex-wrap'>
                <div className='h-32 w-64 bg-white shadow-md'></div>
                <div className='h-32 w-64 bg-white shadow-md'></div>
                <div className='h-32 w-64 bg-white shadow-md'></div>
              </div>
            )}
            {Page === 'position' && (
              <div className='flex gap-4  py-4 px-4 '>
                <Positions />
              </div>
            )}
            {Page === 'candidate' && (
              <div className='flex gap-4  py-4 px-4'>
                <Candidates />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default RecruiterDashboard;