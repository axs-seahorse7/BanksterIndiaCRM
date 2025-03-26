import React, { useState } from 'react'
import Clients from '../HomeComponent/Clients'
import Candidates from '../HomeComponent/Candidates'
import Positions from '../HomeComponent/Positions'
import Sidebar from '../Component/Sidebar/Sidebar';
import Header from '../Component/Header/Header';


const Dashboard = () => {
    const [Page, setPage] = useState('dashboard')

    return (
        <div>
            <div className='flex'>
                <Sidebar setPage={setPage} Page={Page} />
                <section className='h-screen w-full bg-gray-100'>
                    <Header Page={Page} />
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
                        {Page === 'client' && (
                            <div className='flex gap-4  py-4 px-4 '>
                                <Clients />
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

export default Dashboard