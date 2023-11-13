import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../../Component/sideBar';
import AppContext from '../../AppContext';
import axios from 'axios';

export default function DisplayTraceability() {
    const username = useContext(AppContext);
    const [traceability, setTraceability] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5050/api/tracable/getall')
            .then((res) => {
                console.log(res.data)
                setTraceability(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <>
            <SideBar />
            <section className="home-section ">
                <nav style={{ backgroundColor: "#11101D" }}>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center ">
                            <div className="text-white absolute right-0"> welcome {username} 🤗</div>
                        </div>
                    </div>
                </nav>
                <div className="flex justify-between">
                    <div className="text">Traceability</div>
                </div>

                <div className="rounded-lg border border-gray-200 shadow-md m-3 overflow-x-scroll">
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Username</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Pharmacie</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-900">date de modification</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {
                                traceability.map((traceability) => {
                                    return (
                                        <>
                                            <tr className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <span>
                                                        {traceability.Name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <span>

                                                            {traceability.Pharmacie.Nom}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span>
                                                        {traceability.Date.slice(11, 19) + "  " + traceability.Date.slice(0, 10)}
                                                    </span>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
