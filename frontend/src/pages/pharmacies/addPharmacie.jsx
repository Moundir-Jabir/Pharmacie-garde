import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MultipleSelectChip from "./MultipleSelectChip";
import Input from "../../Component/Input";
import Api from "../../Utils/Api";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function AddPharmacie(props) {
  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [Service, setServices] = useState([]);
  const [dataForm, setFormData] = useState({});

  const [formError, setFormError] = useState({});
  const [error, setError] = useState("");

  let phoneReg =
    /^(?:(?:(?:\+|00)212[\s]?(?:[\s]?\(0\)[\s]?)?)|0){1}(?:5[\s.-]?[2-3]|6[\s.-]?[13-9]){1}[0-9]{1}(?:[\s.-]?\d{2}){3}$/;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    
    console.dir(dataForm);
  };

  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
  };

  const [multipleFiles, setMultipleFiles] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };
  
  const addData = async () => {
    if (!phoneReg.test(dataForm.NumeroTele)) {
      setError("Number is not correct");
    } else {
      const formData = new FormData();
      formData.append("Nom", dataForm.Nom);
      formData.append("NumeroTele", dataForm.NumeroTele);
      formData.append("Adresse", dataForm.Adresse);
      formData.append("HeurOpen", dataForm.HeurOpen);
      formData.append("HeurClose", dataForm.HeurClose);
      formData.append("Services", Service);
      formData.append("Lon", dataForm.lon);
      formData.append("Lat", dataForm.lat);
      formData.append("Status", dataForm.Status);
      for (let i = 0; i < multipleFiles.length; i += 1) {
        formData.append("files", multipleFiles[i]);
      }

      console.log(dataForm);
      await addFarmacie(formData, mulitpleFileOptions);
    }
  };

  const addFarmacie = async (data, options) => {
    await Api.post("pharmacie/add", data, options)
      .then((Response) => {
        console.log(Response);
        setError("");
        setTimeout(() => {
          setMultipleProgress(0);
          setShowModal(false);
        }, 500);
        props.setRefresh((refresh) => !refresh);
      })
      .catch((Error) => {
        console.log(Error);
        setError(Error.response.data.message);
        setMultipleProgress(0);
      });
  };

  return (
    <>
      <button
        type="button"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => setShowModal(true)}
      >
        Add
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
                        {error && (
                          <div
                            class="bg-red-100 border border-red-400 text-red-700 px-4 py-1 mb-2 rounded relative"
                            role="alert"
                          >
                            <span class="block sm:inline">{error}</span>
                          </div>
                        )}
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="file"
                            onChange={(e) => MultipleFileChange(e)}
                            className="form-control"
                            multiple
                          />

                          {/* <div className="col-2" style={{ width: 80 }}>
                            <CircularProgressbar
                              value={multipleProgress}
                              text={`${multipleProgress}%`}
                              styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: "butt",
                                textSize: "16px",
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255, 136, 136, ${
                                  multipleProgress / 100
                                })`,
                                textColor: "#3e98c7",
                                trailColor: "#d6d6d6",
                                backgroundColor: "#3e98c7",
                              })}
                            />
                          </div> */}
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                          <div className="relative z-0 w-full mb-6 group">
                            <Input
                              onChange={onChange}
                              type="text"
                              name="Nom"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
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
                          />

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
                              type="text"
                              name="lat"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                            />

                            <label
                              htmlFor="floating_phone"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                             Latitude
                            </label>
                          </div>
                          <div className="relative z-0 w-full mb-6 group">
                            <Input
                              onChange={onChange}
                              type="text"
                              name="lon"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                            />

                            <label
                              htmlFor="floating_phone"
                              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Longtitude
                            </label>
                          </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <MultipleSelectChip setServices={setServices} />
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                          <select name="Status" onChange={onChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                            <option value="open">open</option>
                            <option value="no">no</option>
                          </select>
                          

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
                              type="datetime-local"
                              name="HeurOpen"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
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
                              type="datetime-local"
                              name="HeurClose"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
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
                            onClick={() => addData()}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="submit"
                          >
                            Save
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
