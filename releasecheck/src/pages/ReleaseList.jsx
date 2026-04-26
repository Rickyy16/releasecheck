import React from 'react'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function ReleaseList() {
    const [releases, setReleases] = useState([]);

    const API = "http://localhost:5000";
    useEffect(() => {
        axios.get(`${API}/releases`)
            .then(res => setReleases(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="bg-gray-100 h-screen w-screen">
            <div className="mx-auto text-center pt-5">
                <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
                    ReleaseCheck
                </h2>
                <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                    Your all in one release checklist tool
                </p>
            </div>
            <div className="mt-10 pb-1">

                <div className="relative overflow-hidden bg-white shadow-sm rounded-xl border border-gray-400 mx-6">
                    <div className="p-4 flex items-center justify-between space-x-4">
                        <h2 className='text-gray-500 underline font-medium'>
                            All Releases
                        </h2>
                        <Link to="/create">
                        <button className="flex gap-2 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                            <span>New Release</span>
                            <svg className="w-5 h-5 mt-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </button>
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs uppercase text-gray-700 bg-gray-50 border-b border-t border-gray-300">
                                <tr>
                                    <th scope="col" className="px-6 py-3 font-bold">Release</th>
                                    <th scope="col" className="px-6 py-3 font-bold">Date</th>
                                    <th scope="col" className="px-6 py-3 font-bold">Status</th>
                                    <th scope="col" className="px-6 py-3 font-bold text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {releases.map(r => (
                                    <tr key={r.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {r.name}    
                                    </th>
                                    <td className="px-6 py-4">{new Date(r.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{r.status}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-6">
                                            <div className="flex items-center gap-2">
                                                <a href="#" className="font-medium text-cyan-600 hover:underline">View</a>
                                                <svg className="w-6 h-6 text-cyan-600 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <a href="#" className="font-medium text-red-600 hover:underline">Delete</a>
                                                <svg className="w-6 h-6 text-red-600 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </td>
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

export default ReleaseList