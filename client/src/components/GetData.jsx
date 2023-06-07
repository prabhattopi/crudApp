/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {memo} from "react";
import {useNavigate} from "react-router-dom"
import api from "../api";
const GetData = ({items,setItems}) => {
const navigate=useNavigate()
  const handleRedirect = (id) => {
    navigate(`/${id}`);
  };
  const handleDelete = async (id) => {
    try{
        await api.delete(`/items/${id}`);
        const data=items.filter(item => item._id !== id);
        setItems(data);
    }
    catch(err){
     console.log(err);
    }
  
  };
  return (
  <div>
      {items?.map((item) => (
        <div key={item._id}>
          <h3>{item.user}</h3>
          <p>{item.description}</p>
          <button onClick={()=>handleRedirect(item._id)}>Edit</button>
          <button onClick={()=>handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default memo(GetData)