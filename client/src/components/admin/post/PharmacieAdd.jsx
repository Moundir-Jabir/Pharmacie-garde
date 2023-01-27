import {useState } from "react";
import { Input, Button } from "../shared/index";
import { Link } from "react-router-dom";
import {postPharmacie} from '../../../features/pharmacie/pharmacieSlice'
import {useDispatch} from 'react-redux'

function PharmacieAdd() {

  const [pharImage, setpharImage] = useState('')
  const [name, setName] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [date, setdate] = useState('')

  


const dispatch = useDispatch()

const handlSubmit = (e)=>{
  e.preventDefault();
  
  const data = new FormData()
  data.append('image', pharImage)
  data.append('name', name) 
  data.append('address', address) 
  data.append('phone', phone) 
  data.append('date', date) 

  console.log(data);

  dispatch(postPharmacie(data));
   

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
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Numéro de téléphone
              </label>
              <Input
                onChange={(e) => { setphone(e.target.value) }}
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
                onChange={(e) => { setdate(e.target.value) }}
                type="datetime-local"
                name="Number_Appartement"
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

export default PharmacieAdd;
