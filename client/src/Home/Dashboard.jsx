import React, { useState } from 'react'
import Clients from '../HomeComponent/Clients'
import Candidates from '../HomeComponent/Candidates'
import Positions from '../HomeComponent/Positions'
import Sidebar from '../Component/Sidebar/Sidebar';
import Header from '../Component/Header/Header';
import ClientForm from './Forms/CreateClient';
import CandidateForm from './Forms/CreateCandidate';
import PositionForm from './Forms/CreatePosition';


const Dashboard = () => {
    const [Page, setPage] = useState('dashboard')
    const [isCreateClient, setisCreateClient] = useState(false)
    const [isCreateCandidate, setisCreateCandidate] = useState(false)
    const [isCreatePosition, setisCreatePosition] = useState(false)

    const handleClientToogle = (value)=>{
        if(value || !value){
            setisCreateClient(value)
        }
    }

    const handleCandidateToogle = (value) =>{
        setisCreateCandidate(value)
    }
    
    const handlePositionToogle = () =>{
        setisCreatePosition(!isCreatePosition)
    }

    return (
        <div>
            <div className='flex'>
                <Sidebar setPage={setPage} Page={Page} />
                <section className='h-screen w-full bg-gray-100'>
                    <Header Page={Page} />
                    <div className='h-[85vh] overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
                        {Page === 'dashboard' && (
                            <div className='flex gap-4  py-4 px-4 flex-wrap '>
                                <div className='h-32 w-64 bg-white shadow-md flex items-center justify-center gap-1 flex-col'>
                                    <span className='font-semibold text-3xl text-cyan-600'>240</span>
                                    <span className='text-slate-600 text-sm font-semibold '>Total Client</span>
                                </div>
                                <div className='h-32 w-64 bg-white shadow-md flex items-center justify-center gap-1 flex-col'>
                                    <span className='font-semibold text-3xl text-cyan-600'>240</span>
                                    <span className='text-slate-600 text-sm font-semibold '>Total Candidate</span>
                                </div>
                                <div className='h-32 w-64 bg-white shadow-md flex items-center justify-center gap-1 flex-col'>
                                    <span className='font-semibold text-3xl text-cyan-600'>240</span>
                                    <span className='text-slate-600 text-sm font-semibold '>Total Position</span>
                                </div>
                                <div className='h-32 w-64 bg-white shadow-md flex items-center justify-center gap-1 flex-col'>
                                    <span className='font-semibold text-3xl text-cyan-600'>240</span>
                                    <span className='text-slate-600 text-sm font-semibold '>Total Recruiter</span>
                                </div>
                            </div>
                        )}
                        {Page === 'position' && (
                            <div className='flex gap-4  py-4 px-4 '>
                                {
                                isCreatePosition? (
                                    <PositionForm closeForm={handlePositionToogle} />
                                )
                                :(<Positions openForm={handlePositionToogle} />)
                                }
                            </div>
                        )}
                        {Page === 'client' && (
                            <div className='flex gap-4  py-4 px-4 '>
                                {
                                isCreateClient? (<ClientForm closeForm={handleClientToogle} />)
                                :(<Clients openForm={handleClientToogle} />)
                                }
                            </div>
                        )}
                        {Page === 'candidate' && (
                            <div className='flex gap-4  py-4 px-4'>
                                {
                                    isCreateCandidate? (
                                        <CandidateForm closeForm={handleCandidateToogle} />
                                    ):(
                                        
                                    <Candidates openForm={handleCandidateToogle} />
                                    )
                                }
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Dashboard