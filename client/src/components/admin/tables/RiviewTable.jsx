import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { getReview } from '../../../features/pharmacie/reviewSlice'



function RiviewTable() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getReview())
  },[])
  
  return (
    <div>RiviewTable</div>
  )
}

export default RiviewTable