/* eslint-disable react-refresh/only-export-components */
import { useState, memo, useContext } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { ItemContext } from '../context/Items/item';
const PostData = ({ items, setItems }) => {

  const [showModal, setShowModal] = useState(false);
  
  const { postData, loading, setDescription, setScheduleTime, setUser, user, description, scheduleTime } = useContext(ItemContext)
  const handleSubmit = async (event) => {
    event.preventDefault();
   await postData(setItems)

  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setScheduleTime('');
  };
  const handleModalSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-center my-5">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 bg-white shadow-md rounded-lg">
        <h3 className="text-lg font-bold mb-4">Create Item</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">User:</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className={` px-4 py-2 text-sm font-medium rounded hover:bg-blue-600 ${loading
                ? "text-gray-500 bg-gray-300 cursor-not-allowed"
                : "text-white bg-blue-500"
                }`}
              disabled={loading}
            >
              Submit
            </button>
            <div className="ml-2 cursor-pointer" onClick={openModal}>
              <AiOutlineClockCircle size={20} />
            </div>
          </div>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-4 rounded-lg z-20">
            <h3 className="text-lg font-bold mb-4">Schedule Time</h3>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Schedule Time:</label>
                <input
                  type="text"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  placeholder='24-hrs format like 22:01'
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className='flex gap-4'>
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PostData);
