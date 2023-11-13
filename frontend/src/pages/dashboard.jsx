import React, {useContext, useState} from 'react';
import SideBar from '../Component/sideBar';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import axios from 'axios';

export default function Dashboard(){
  const token = useContext(AppContext)
  const [commentaire, setCommentaire] = useState(0)
  const [Pharmacie, setPharmacie] = useState(0)
  
  axios.get('http://localhost:5050/api/commentair/countCommentair')
  .then((res) => {
    console.log(res.data)
    setCommentaire(res.data)
  })
  .catch((err) => {
    console.log(err)
  })


  axios.get('http://localhost:5050/api/pharmacie/countPharmacie')
  .then((res) => {
    console.log(res.data)
    setPharmacie(res.data)
  })
  .catch((err) => {
    console.log(err)
  })


  

return(
<div>
  <SideBar />
  <section className="home-section">
  <nav style={{backgroundColor : "#11101D"}}>
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center ">
      <div className="text-white absolute right-0"> welcome {token} 🤗</div>
      </div>
    </div>
  </nav>
    <div className="text">Dashboard</div>
     <div className="flex items-center text-gray-800">
        <div className="p-4 w-full">
          <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-6 md:col-span-4">
                <Link to= "/pharmacie">
                  <div className="flex flex-row bg-white shadow-sm rounded p-4">
                    <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col flex-grow ml-4">
                      <div className="text-sm text-gray-500">Pharmacie</div>
                      <div className="font-bold text-lg">{Pharmacie}</div>
                    </div>
                  </div>
                </Link>
              </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              <Link to="/commentaire">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
              <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                    </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">Commentaire</div>
                  <div className="font-bold text-lg">{commentaire}</div>
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
    </div>

  </section>
</div>
)
}