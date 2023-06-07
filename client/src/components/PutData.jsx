import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import {fetchDataSingle } from '../httpRequest';

const PutData = ({items,setItems}) => {
   const param=useParams()
   const itemId=param.id
   console.log(itemId)
  const [user, setUser] = useState('');
  const [description, setDescription] = useState('');
  const [single,setSingle]=useState({})
  const navigate=useNavigate()

  useEffect(()=>{
    fetchDataSingle(itemId)
    .then((data) =>{console.log(data);setSingle(data)})
    .catch((error) => console.error("Failed to fetch items:", error));
}, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/items/${itemId}`, { user, description });
      const data=items.map(e=>e._id===itemId?{...e,user,description}:e)
      console.log(data);
      setItems(data);
      // Perform any additional actions after successful update
    } catch (error) {
      console.error('Failed to update item:', error)
    }
    navigate("/");
  };

  return (
    <div>
      <h3>Update Item</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User: {single?.user}</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
        </div>
        <div>
          <label>Description: {single?.description}</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};


export default PutData