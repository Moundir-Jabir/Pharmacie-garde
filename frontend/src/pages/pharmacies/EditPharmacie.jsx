import React, { useState, useEffect,useContext } from "react";
import MultipleSelectChip from "./MultipleSelectChip";
import Input from "../../Component/Input";
import Api from "../../Utils/Api";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import AppContext from "../../AppContext";

export default function UpdatePharmacie(props) {
  const username = useContext(AppContext)


  
  const [Pharmacie , setPharmacie] = useState({Nom : "", Images:"",NumeroTele:"", Adresse:"",HeurOpen:"",HeurClose:""})
  const [currentId , setCurrentID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [Service, setServices] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);


 function getOnePharmacie(id){
  setShowModal(true);
  axios.get(`http://localhost:5050/api/pharmacie/GetSinglePha/${id}`)
  .then((res)=>{
    setPharmacie(res.data)
    console.log(res.data)
    setCurrentID(id)
  })
  .catch((err)=>{
    console.log(err.message)
  })
}

  const onChange = (e) => {
    setPharmacie({...Pharmacie,[e.target.name]: e.target.value})    
  };

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
  };


  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  const updateData = async () => {
    const formData = new FormData();
    formData.append("Nom", Pharmacie.Nom);
    formData.append("NumeroTele", Pharmacie.NumeroTele);
    formData.append("Adresse", Pharmacie.Adresse);
    formData.append("HeurOpen", Pharmacie.HeurOpen);
    formData.append("HeurClose", Pharmacie.HeurClose);
    formData.append("Services", Service);
    for (let i = 0; i < multipleFiles.length; i += 1) {
      formData.append("files", multipleFiles[i]);
    }
    await updatFarmacie(formData, mulitpleFileOptions);
  };

  const updatFarmacie = async (Pharmacie, option) => {
    await Api.put(`pharmacie/updatePharmacie/${currentId}`, Pharmacie,option)
      .then((Response) => {
        addTracable(currentId);
        setShowModal(false)
        setMultipleProgress(0)
        props.setRefresh(refresh => !refresh)

      })
      .catch((Error) => {
        console.log(Error);
      });
  };


  const addTracable = async(id)=>{
    const data = {
      Name:username,
      Pharmacie:id
    }
    await Api.post(`tracable/add`, data)
      .then((Response) => {
        console.log(Response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }

 
  
  

  return (
    <>

      <button type="button" onClick={()=>getOnePharmacie(props.id)}>
        <button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
            <path strokeLinecap="round" strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        </button>
    </button>

      <div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h5 className="text-center text-2xl font-semibold ">
                      New Pharmacie
                    </h5>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <div className="my-4 text-slate-500 text-lg leading-relaxed">
                      <div>
                        <div className="relative z-0 w-full mb-6 group" style={{ width: 80}}>
                          <input
                            type="file"
                            onChange={(e) => MultipleFileChange(e)}
                            className="form-control" 
                            name = "Images"
                            multiple
                          />
                          <img src={"http://localhost:5050/"+Pharmacie.Images[0]}/>

                           <div className="col-2" style={{ width: 80}}>
                        <CircularProgressbar
                            value={multipleProgress}
                            text={`${multipleProgress}%`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: 'butt',
                                textSize: '16px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${multipleProgress / 100})`,
                                textColor: '#3e98c7',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7',                                
                              })}
                        />
                             </div> 
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <Input
                              onChange={onChange}
                              type="text"
                              name="Nom"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              value= {Pharmacie.Nom}
                              
                            />

                            <label
                              htmlFor="floating_phone"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Nom de pharmacie
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <Input
                              onChange={onChange}
                              type="text"
                              name="NumeroTele"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              value= {Pharmacie.NumeroTele}
                            />

                            <label
                              htmlFor="floating_phone"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Numero de telephone
                            </label>
                          </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <Input
                            onChange={onChange}
                            type="text"
                            name="Adresse"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value= {Pharmacie.Adresse}
                          />

                          <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Adresse de Pharmacie
                          </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                        {Pharmacie.Services && <MultipleSelectChip setServices={setServices} 
                            data = {Pharmacie.Services}
                          /> }
                          

                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Adresse de Pharmacie
                          </label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <Input
                              onChange={onChange}
                              type="time"
                              name="HeurOpen"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              value= {Pharmacie.HeurOpen}
                            />

                            <label
                              htmlFor="floating_phone"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              HeurOpen
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <Input
                              onChange={onChange}
                              type="time"
                              name="HeurClose"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              value= {Pharmacie.HeurClose}
                            />
                            <label
                              htmlFor="floating_company"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              HeurClose
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            onClick={() => updateData()}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="submit"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <div></div>
      </div>
    </>
  );
}
