import {useEffect} from "react";
import { Link ,useNavigate} from "react-router-dom";
import { BiSearch } from "../../../assets/icons";
import {getPharmacie}from "../../../features/pharmacie/pharmacieSlice"
import {useDispatch, useSelector} from "react-redux"



function CommentTable() {

const navigate = useNavigate();
const {pharmacies,loading}= useSelector(state=>state.pharmacie) 
const dispatch = useDispatch()

useEffect(()=>{
  dispatch(getPharmacie())
},[])


const getComments = (id)=>{
 
  navigate (`/dashboard/getcomment/${id}`)
  navigate (`/dashboard/getreview/${id}`)
}


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
              <button className="btn btn-square border-none hover:bg-color-primary bg-color-secondary ">
                <BiSearch size={24} />
              </button>
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
             
              <th>Nom</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            { loading ? 'loading....' :
              pharmacies.map(phar =>(
            <tr key={phar._id}>
              <td>{phar.name}</td>
              
              <td className="flex flex-row gap-2">
                <button                 
                  className="btn btn-ghost btn-xs bg-color-primary text-white " 
                  onClick={() => { getComments(phar._id) }}
                >
                  Comments
                </button>
               
              </td>
              <td className="flex flex-row gap-2">
                <button                 
                  className="btn btn-ghost btn-xs bg-color-primary text-white " 
                  onClick={() => { getComments(phar._id) }}
                >
                  Review
                </button>
               
              </td>
            </tr>
  ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommentTable;
