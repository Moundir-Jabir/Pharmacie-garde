import {useState } from "react";
import { Input, Button } from "../shared/index";
import { Link, useNavigate} from "react-router-dom";
import {postPharmacie} from '../../../features/pharmacie/pharmacieSlice'
import {useDispatch} from 'react-redux'

function PharmacieAdd() {
  const navigate = useNavigate()
  const [pharImage, setpharImage] = useState('')
  const [name, setName] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [latitude, setlatitude] = useState('')
  const [longtitude, setlongtitude] = useState('')
  const [date_start, setdate] = useState('')
  const [date_end, setdateEnd] = useState('')
  const [status, setstatus] = useState('')


 

const dispatch = useDispatch()

const handlSubmit = (e)=>{
  e.preventDefault();
  
  const data = new FormData()
  data.append('image', pharImage)
  data.append('name', name) 
  data.append('address', address) 
  data.append('phone', phone) 
  data.append('latitude',latitude) 
  data.append('longtitude',longtitude) 
  data.append('date_start', date_start) 
  data.append('date_end', date_end)
  data.append('status', status) 
 


  
  dispatch(postPharmacie(data));
     navigate('/dashboard/pharmacies')

   

}

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center align-middle bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <h1 className="text-2xl font-bold text-color-secondary">Ajouter Pharmacie</h1>
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
            <div>
              <label className="label text-xs font-medium">
                Image de pharmacie
              </label>
              <Input
                type="file"
                onChange={(e) => { setpharImage(e.target.files[0]) }}
                name="Name_Immeuble"
                id="Name_Immeuble"
                placeholder=""
                required  
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Nom de pharmacie
              </label>
              <Input
                type="text"
                onChange={(e) => { setName(e.target.value) }}
                name="Name_Immeuble"
                id="Name_Immeuble"
                placeholder=""
                required  
              />
            </div>
            <div>
              <label className="label text-xs font-medium">Adresse</label>
              <Input
                onChange={(e) => { setaddress(e.target.value) }}

                type="text"
                name="Number_Appartement"
                id="Number_Appartement"
                placeholder=""
                required  
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Numéro de téléphone
              </label>
              <Input
                onChange={(e) => { setphone(e.target.value) }}
                type="text"
                name="phone"
                id="phone"
                placeholder=""
                required  
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Statuss
              </label>
              <select 
        name="status"       
        onChange={(e) => { setstatus(e.target.value) }}
        type="status" 
        required 
        className="mt-3 block w-full  rounded-none rounded-t-md border  px-3 py-2 text-gray-900  focus:z-10  focus:border-violet-900 focus:outline-none focus:ring-violet-900 sm:text-sm">
        <option selected>Choose your status</option>
        <option 
        value="Garde" style={{color:"#153462"}}>Garde
        </option>
        <option 
        value="NoGarde" style={{color:"#153462"}}>NoGarde
        </option>
        </select>
            </div>
            <div>
              <label className="label text-xs font-medium">
              Latitude
              </label>
              <Input
                onChange={(e) => { setlatitude(e.target.value) }}
                type="Text"
                name="latitude"
                id="Number_Appartement"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
              Longtitude
              </label>
              <Input
                onChange={(e) => { setlongtitude(e.target.value) }}
                type="Text"
                name="longtitude"
                id="Number_Appartement"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                date d ouverte
              </label>
              <Input
                onChange={(e) => { setdate(e.target.value) }}
                type="date"
                name="Number_Appartement"
                id="Number_Appartement"
                placeholder=""
                required  
              />
            </div>

            <div>
              <label className="label text-xs font-medium">
              date de fermeture	
              </label>
              <Input
                onChange={(e) => { setdateEnd(e.target.value) }}
                type="date"
                name="Number_Appartement"
                id="Number_Appartement"
                placeholder=""
                required  
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

export default PharmacieAdd;
