import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="container mx-auto px-4 my-2 overflow-y-auto max-h-80vh">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-8">
        {items?.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
            <h3 className="text-lg font-bold">{item.user}</h3>
            <p className="mt-2">{item.description.length>28?(item.description.substr(0,28)+"..."):item.description}</p>
            <span><Link to={`/single/${item._id}`} className="text-xs mt-2 text-blue-500 hover:text-blue-600 hover:underline">
              Know More
            </Link></span>
            <div className="flex justify-between items-end mt-auto">
              <div></div>
              <div className="flex space-x-2">
                <button
                  className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={() => handleRedirect(item._id)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(GetData);
