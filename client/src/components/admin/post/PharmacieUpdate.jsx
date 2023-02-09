import {useState } from "react";
import { Input, Button } from "../shared/index";
import {Link, useParams ,useNavigate} from 'react-router-dom'
import {updatePharmacie} from '../../../features/pharmacie/pharmacieSlice'
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios"


function PharmacieUpdate() {
  
  const navigate = useNavigate()
  const {id} = useParams()
  const pharmacie  = useSelector(state => state.pharmacie.pharmacies.find( ({ _id }) => _id === id ))
  const dispatch = useDispatch()
  const [data, setData] = useState(pharmacie);

  const handle = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value
    })
  } 
  

const handlSubmit = (e)=>{
  e.preventDefault();
  const dataUp = new FormData()
  // dataUp.append('image', image)
  dataUp.append('name', data.name) 
  dataUp.append('address',data.address) 
  dataUp.append('phone',data.phone) 
  dataUp.append('latitude',data.latitude) 
  dataUp.append('longtitude', data.longtitude) 
  dataUp.append('date_start', data.date_start) 
  dataUp.append('date_end', data.date_end) 
  
  
  dispatch(updatePharmacie({id,dataUp}));
   navigate('/dashboard/pharmacies')


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

                onChange={ handle }
                name="name"
                id="Name_Immeuble"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">Adresse</label>
              <Input
                onChange={ handle }
                 value={data?.address}
                type="text"
                name="address"
                id="Number_Appartement"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                Numéro de téléphone
              </label>
              <Input
                onChange={ handle }
                value={data?.phone}
                type="text"
                name="phone"
                id="Number_Appartement"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
              Latitude
              </label>
              <Input
                onChange={ handle }
                value={data?.latitude}
                type="Number"
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
                onChange={ handle }
                value={data?.longtitude}
                type="Number"
                name="longtitude"
                id="Number_Appartement"
                placeholder=""
              />
            </div>
            <div>
              <label className="label text-xs font-medium">
                date
              </label>
              <Input
                onChange={ handle }
                type="date"
                name="date_start"
                value={data?.date_start?.slice(0,10)}
                id="Number_Appartement"
                placeholder=""
              />
            </div>

            <div>
              <label className="label text-xs font-medium">
                date
              </label>
              <Input
                onChange={ handle }
                type="date"
                name="date_end"
                value={data?.date_end?.slice(0,10)}
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
