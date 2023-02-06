import {useEffect} from "react";
import { Link, useParams} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import {getComment,deleteComme}from "../../../features/pharmacie/commentSlide"


function PharmacieComments() {

  const params = useParams()
//  const navigate = useNavigate()
//  const [date, setdate] = useState('')
 const dispatch = useDispatch()
 const {comments} = useSelector(state=>state.comment) 
 
 useEffect(()=>{
   dispatch(getComment(params.id))
 },[params.id])
 


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
          <tbody>
            { 
              comments?.map(com =>(
              <tr key={com?._id}>
              <td>{com?.clientname}</td>
              <td>{com?.clientcomment}</td>
              <td className="flex flex-row gap-2">
                <button                 
                  className="btn  btn-xs bg-color-primary text-white " 
                  onClick={()=> dispatch(deleteComme(com?._id))}>               
                  Delete
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

export default PharmacieComments;
