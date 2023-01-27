import {useState,useEffect } from "react";
import { Input, Button } from "../shared/index";
import {Link, useParams ,useNavigate} from 'react-router-dom'
import {updatePharmacie} from '../../../features/pharmacie/pharmacieSlice'
import {useDispatch} from 'react-redux'
import axios from "axios"


function PharmacieUpdate() {
  
  const navigate = useNavigate()
  const params = useParams()

  const [data, setData] = useState();
  
  // const [image, setimage] = useState('')
  const [name, setname] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [date, setdate] = useState('')


  useEffect(() => {
    axios.get(`http://localhost:8080/api/pharmacie/getPharmacieById/${params.id}`)
        .then((response) => {
          setData(response.data.pharmacie)
        })
        .catch((error) => {
             console.log(error)
        })
}, [params.id])

// console.log(data);

  //   const handleimage = (event) => {
  //   setimage(event.target.value)
  //   setData(event.target.value);
  // } 

  const handlename = (event) => {
    setname(event.target.value)
    setData(event.target.value);
  } 

  const handleaddress = (event) => {
    setaddress(event.target.value)
    setData(event.target.value);
  } 

  
  const handlephone = (event) => {
    setphone(event.target.value)
    setData(event.target.value);
  }
  
  const handledate = (event) => {
    setdate(event.target.value)
    setData(event.target.value);
  } 

  


const dispatch = useDispatch()

const handlSubmit = (e)=>{
  e.preventDefault();
  const dataUp = new FormData()
  // dataUp.append('image', image)
  dataUp.append('name', name) 
  dataUp.append('address',address) 
  dataUp.append('phone',phone) 
  dataUp.append('date',date)
  
  dispatch(updatePharmacie({params,dataUp}));

}

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center align-middle bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <h1 className="text-2xl font-bold text-color-secondary">Update Pharmacie</h1>
        <Link
          to={"/dashboard/pharmacies"}
          className="btn btn-active border-none hover:bg-color-primary bg-color-secondary "
        >
          Afficher Pharmacies
        </Link>
      </div>
      <div className="overflow-auto flex flex-col items-center bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <div className="w-1/2">
          <form onSubmit={handlSubmit}>
            {/* <div>
              <label className="label text-xs font-medium">
                Image de pharmacie
              </label>
              <Input
                type="file"

                onChange={ handleimage }
                value={data?.image}
                name="Name_Immeuble"
                id="Name_Immeuble"
                placeholder=""

              />
            </div> */}
            <div>
              <label className="label text-xs font-medium">
                Nom de pharmacie
              </label>
              <Input
                type="text"
                value={data?.name}

                onChange={ handlename }
                name="Name_Immeuble"
                id="Name_Immeuble"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">Adresse</label>
              <Input
                onChange={ handleaddress }
                 value={data?.address}
                type="text"
                name="Number_Appartement"
                id="Number_Appartement"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Numéro de téléphone
              </label>
              <Input
                onChange={ handlephone }
                value={data?.phone}
                type="text"
                name="Number_Appartement"
                id="Number_Appartement"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                date
              </label>
              <Input
                onChange={ handledate }
                type="date"
                name="Number_Appartement"
                value={data?.date?.slice(0,10)}
                id="Number_Appartement"
                placeholder=""
              />
            </div>
           
            <div className="mt-2 font-main">
              <Button type="submit" text="Submit" textColor={false} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

export default PharmacieUpdate;
