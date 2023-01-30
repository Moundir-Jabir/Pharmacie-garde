import {useState } from "react";
import { Input, Button } from "../shared/index";
import { Link, useNavigate} from "react-router-dom";
import {postPharmacie} from '../../../features/pharmacie/pharmacieSlice'
import {useDispatch} from 'react-redux'

function PharmacieComments() {

 const navigate = useNavigate()
 const [date, setdate] = useState('')
 const dispatch = useDispatch()



 
 return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center align-middle bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <h1 className="text-2xl font-bold text-color-secondary">Liste Pharmacies</h1>
        <div className="flex flex-row gap-2">
          <div className="form-control">
            <div className="input-group ">
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered  text-black"
              />
              
            </div>
          </div>
          <Link
            to={"/dashboard/pharmacieadd"}
            className="btn btn-active border-none hover:bg-color-primary bg-color-secondary"
          >
            Ajouter Pharmacie
          </Link>
        </div>
      </div>
      <div className="overflow-auto bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
        <table className="table table-compact w-full">
          <thead>
            <tr>
             
              <th>User Name</th>
              <th>Comment</th>
              <th>Option</th>
            </tr>
          </thead>
          {/* <tbody>
            { loading ? 'loading....' :
              pharmacies.map(phar =>(
            <tr key={phar._id}>
              <td>{phar.name}</td>
              
              <td className="flex flex-row gap-2">
                <button                 
                  className="btn btn-ghost btn-xs bg-color-primary text-white " 
                  onClick={() => { DeleteComment(phar._id) }}
                >
                  Comments
                </button>
               
              </td>
            </tr>
  ))}
          </tbody> */}
        </table>
      </div>
    </div>
  );
}

export default PharmacieComments;
