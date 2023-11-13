import React, { useEffect, useState, useContext } from "react";
import SideBar from "../../Component/sideBar";
import AddPharmacie from "./addPharmacie";
import EditPharmacie from "./EditPharmacie";
import AppContext from "../../AppContext";
import axios from "axios";

export default function Pharmacies() {
  const username = useContext(AppContext)
  const [Pharmacie, setPharmacie] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [status, setStatus] = useState({})



  useEffect(() => {

    axios.get("http://localhost:5050/api/pharmacie/getAllPharmacie")
      .then((res) => {
        console.log(res.data)
        setPharmacie(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [refresh])

  function deletePharmacie(id) {
    axios.delete(`http://localhost:5050/api/pharmacie/deletePharmacie/${id}`)
      .then((res) => {
        console.log(res.data)
        setRefresh(!refresh)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //update status
  function updateStatus(id, e) {
    const status = { Status: e.target.value === "open" ? "close" : "open" }
    axios.put(`http://localhost:5050/api/pharmacie/updateStatus/${id}`, status)
      .then((res) => {
        console.log(res.data)
        setRefresh(!refresh)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
          <div className="text">Pharmacies</div>
          <div className="p-4 mr-3">
            <AddPharmacie setRefresh={setRefresh} />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 shadow-md m-3 overflow-x-scroll">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Images</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nom</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Adresse</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">HeurOpen</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">HeurClose</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">NumeroTele</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Services</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {Pharmacie.map((pharmacie) => (
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4" style={{ width: 80 }}>
                    <img src={"http://localhost:5050/" + pharmacie.Images[0]} />
                  </td>
                  <td className="px-6 py-4">
                    <span>
                      {pharmacie.Nom}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <span>
                        {pharmacie.Adresse}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span>
                      {pharmacie.HeurClose}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span>
                      {pharmacie.HeurOpen}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span>
                      {pharmacie.NumeroTele}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span>
                      {pharmacie.Services}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="overflow-hidden">
                      <div className="flex">
                        <label class="inline-flex relative items-center mr-5 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            name="Status"
                            readOnly
                            checked={pharmacie.Status === "open" ? true : false}
                            value={pharmacie.Status}
                            onChange={(e) => {
                              updateStatus(pharmacie._id, e)
                            }}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                            onClick={() => updateStatus(pharmacie._id)}>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-900">
                            {pharmacie.Status}
                          </span>
                        </label>
                      </div>
                    </div>
                  </td>


                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">

                      <EditPharmacie id={pharmacie._id} setRefresh={setRefresh} />

                      <button onClick={() => deletePharmacie(pharmacie._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                          stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}