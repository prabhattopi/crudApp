import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataSingle } from "../httpRequest";
import { toast } from "react-toastify";
import useItem from "../hooks/useItem";

const PutData = () => {
  const {dispatch,state}=useItem()
  const param = useParams();
  const itemId = param.id;
  const prevUser = state.items.find((e) =>
  e._id === itemId 
);

  const [user, setUser] = useState(prevUser.user);
  const [description, setDescription] = useState(prevUser.description);
  const [single, setSingle] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataSingle(itemId)
      .then((data) => {
        setSingle(data);
      })
      .catch((error) => console.error("Failed to fetch items:", error));

    // Cleanup function to clear previous state
    return () => {
      setUser("");
      setDescription("");
    };
  }, [itemId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    
    
      const response=await api.put(`/items/${itemId}`, { user, description },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
        },
      });
      const data = state.items.map((e) =>
        e._id === itemId ? { ...e, user, description } : e
      );
      if(response.status=="200"){
        toast.success(response.data||'Item updated successfully', {
          position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
          autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar:false, // Hide the progress bar
        });
        dispatch({type:"SET_ITEM",payload:data})
        navigate("/");
      }
      else{
        toast.error(response.data||'An error occured', {
          position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
          autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar:false, // Hide the progress bar
        });
      }
   
      // Perform any additional actions after successful update
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar:false, // Hide the progress bar
      });
      console.error("Failed to update item:", error);
    }
    
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <h3 className="text-xl font-bold mb-4">Update Item</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              User: {single?.user}
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Description: {single?.description}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-sm font-medium rounded hover:bg-blue-600 ${
              !user && !description
                ? "text-gray-500 bg-gray-300 cursor-not-allowed"
                : "text-white bg-blue-500"
            }`}
            disabled={!user && !description}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default PutData;
