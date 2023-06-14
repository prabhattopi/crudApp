import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDataSingle } from "../httpRequest";
import { toast } from "react-toastify";

const PutData = ({ items, setItems }) => {
  const param = useParams();
  const itemId = param.id;
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [single, setSingle] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataSingle(itemId)
      .then((data) => {
        console.log(data);
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
      const prevUser = items.find((e) =>
      e._id === itemId 
    );
      if(!user){
        setUser(prevUser.user)
      }
      if(!description){
        setUser(prevUser.description)
      }
      const response=await api.put(`/items/${itemId}`, { user, description });
      const data = items.map((e) =>
        e._id === itemId ? { ...e, user, description } : e
      );
      console.log(data);
      if(response.status=="200"){
        toast.success(response.data||'Item updated successfully', {
          position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
          autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar:false, // Hide the progress bar
        });
        setItems(data);
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
