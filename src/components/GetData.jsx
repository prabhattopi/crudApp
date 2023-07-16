import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import api from "../api";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const GetData = ({ items, setItems }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleRedirect = (id) => {
    navigate(`/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await api.delete(`/items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("it_wale_token")}`,
        },
      });
      const data = items.filter((item) => item._id !== id);
      if (response.status === 200) {
        toast.success(response.data || "Post created successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });
        setItems(data);
        setLoading(false);
      } else {
        toast.error(response.data || "An error occurred", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
      });
      console.log(err);
    }
  };

  const handleLike = (id) => {
    // Handle like functionality here
  };

  const handleDislike = (id) => {
    // Handle dislike functionality here
  };

  return (
    <div className="container px-4 py-4 my-2">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-8">
        {items?.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col border-2 border-gray-200 hover:border-blue-500"
          >
            <h3 className="text-lg font-bold">{item.user}</h3>
            <p className="mt-2">
              {item.description.length > 28
                ? item.description.substr(0, 28) + "..."
                : item.description}
            </p>
            <span>
              <Link
                to={`/single/${item._id}`}
                className="text-xs mt-2 text-blue-500 hover:text-blue-600 hover:underline"
              >
                Know More
              </Link>
            </span>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex space-x-2">
                <button
                  className="px-2 py-1 text-sm flex items-center text-gray-400 rounded hover:text-blue-500"
                  onClick={() => handleLike(item._id)}
                >
                  <AiOutlineLike className="mr-1" />
                  <span>{item.likes || 0}</span>
                </button>
                <button
                  className="px-2 py-1 text-sm flex items-center text-gray-400 rounded hover:text-red-500"
                  onClick={() => handleDislike(item._id)}
                >
                  <AiOutlineDislike className="mr-1" />
                  <span>{item.dislikes || 0}</span>
                </button>
              </div>
              <div className="flex space-x-2">
                <a
                  href="https://github.com/your-github-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/your-linkedin-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://your-portfolio-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGlobe size={20} />
                </a>
              </div>
              {user._id === item.users.toString() && (
                <div className="flex space-x-2 ml-auto">
                  <button
                    className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => handleRedirect(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    className={`px-2 py-1 text-sm font-medium text-white bg-red-500 ${
                      loading ? "cursor-not-allowed" : "cursor"
                    } rounded hover:bg-red-600`}
                    onClick={() => handleDelete(item._id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(GetData);
