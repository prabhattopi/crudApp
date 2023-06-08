/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const GetData = ({ items, setItems }) => {
  const navigate = useNavigate();

  const handleRedirect = (id) => {
    navigate(`/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      const data = items.filter((item) => item._id !== id);
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {items?.map((item) => (
        <div
          key={item._id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 bg-white shadow-md rounded-lg flex flex-col"
        >
          <h3 className="text-lg font-bold">{item.user}</h3>
          <p className="mt-2">{item.description}</p>
          <div className="mt-auto flex justify-end">
            <button
              className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => handleRedirect(item._id)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(GetData);
