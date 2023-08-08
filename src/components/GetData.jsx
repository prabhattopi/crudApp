import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { motion } from "framer-motion";
import api from "../api";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useItem from "../hooks/useItem";

export const iconsObj = {
  github: <FaGithub size={20} />,
  linkedin: <FaLinkedin size={20} />,
  portfolio: <FaGlobe size={20} />,
};

const GetData = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { handleLikeDislike,dispatch,state } = useItem();

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
      const data = state.items.filter((item) => item._id !== id);
      if (response.status === 200) {
        toast.success(response.data || "Post created successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
        });
        dispatch({type:"SET_ITEM",payload:data})
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



  return (
    <div className="py-4 my-2">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
        {state.items?.map((item,index) => (
         <motion.div
         key={item._id}
         initial={{ opacity: 0, x: -100,transition:{delay: index * 0.5, duration: 0.5 } }} // Initial position and opacity
         animate={{ opacity: 1, x: 0,transition:{delay: index * 0.5, duration: 0.5 } }} // Final position and opacity
        //  transition={{ delay: index * 0.5, duration: 0.5 }} // Delay and duration for entrance animation
         className="bg-white shadow-md rounded-lg p-4 flex flex-col border-2 border-gray-200 hover:border-blue-500 relative"
         whileHover={{ scale: 1.05, transition: { duration: 0.2,delay:0.1 } }} // Apply scaling effect on hover with a different duration
         whileTap={{ scale: 0.95, transition: { duration: 0.2,delay:0.1 } }} // Apply scaling effect on tap with a different duration
       >
            <div className="flex items-center justify-around h-6 w-12 rounded-lg bg-gray-500 text-white text-sm">
              <IoIosEye size={16} />
              <span className="font-bold">{item.views}</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{item.user}</h3>
                <p className="mt-2">
                  {item.occupation.length > 28
                    ? item.occupation.substr(0, 28) + "..."
                    : item.occupation}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <img
                  src={item.img}
                  alt="Image"
                  className="rounded-full h-16 w-16 object-cover"
                />
              </div>
            </div>

            <span
              onClick={() =>
                handleLikeDislike({ id: item._id.toString(), action: "views" })
              }
            >
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
                  disabled={
                    !!item.like.find((e) => e.userId.toString() == user._id)
                  }
                  className="px-2 py-1 text-sm flex items-center text-gray-400 rounded hover:text-blue-500"
                  onClick={() =>
                    handleLikeDislike({
                      id: item._id.toString(),
                      action: "like",
                    })
                  }
                >
                  <AiOutlineLike
                    size={15}
                    className={`font-bold mr-1 ${
                      item.like.find((e) => e.userId.toString() == user._id)
                        ? "text-green-500 cursor-not-allowed"
                        : ""
                    }`}
                  />
                  <span className="text-black">{item.like.length || 0}</span>
                </button>
                <button
                  disabled={
                    !!item.dislike.find((e) => e.userId.toString() == user._id)
                  }
                  className="px-2 py-1 text-sm flex items-center text-gray-400 rounded hover:text-red-500"
                  onClick={() =>
                    handleLikeDislike({
                      id: item._id.toString(),
                      action: "dislike",
                    })
                  }
                >
                  <AiOutlineDislike
                    size={15}
                    className={`font-bold mr-1 ${
                      item.dislike.find((e) => e.userId.toString() == user._id)
                        ? "text-red-500 cursor-not-allowed"
                        : ""
                    }`}
                  />
                  <span className="text-black">{item.dislike.length || 0}</span>
                </button>
              </div>
              <div className="flex space-x-2">
                {item.social_links?.map((e) => (
                  <a
                    key={e._id}
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {iconsObj[e.name]}
                  </a>
                ))}
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
          </motion.div>
        ))}
      </div>
    </div>
  )
};

export default memo(GetData);
