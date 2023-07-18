/* eslint-disable react-refresh/only-export-components */
import { useState, memo, useContext } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { ItemContext } from '../context/Items/item';

const PostData = ({ items, setItems }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    postData,
    loading,
    setImageURL,
    setOccupation,
    setGithubLink,
    setLinkedinLink,
    setPortfolioLink,
    user,
    description,
    scheduleTime,
    setDescription,
    setScheduleTime,
    setUser,
    state,
    dispatch
  } = useContext(ItemContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postData(setItems);
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
      <div className="max-w-screen-lg w-full mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 p-4 bg-white shadow-md rounded-lg flex flex-start">
        <div className="w-full pr-8">
          <h3 className="text-2xl font-bold mb-4">Create Item</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2 mb-8">
              <label className="block w-20 text-sm font-medium">User:</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 mb-8">
              <label className="block w-20 text-sm font-medium">Occupation:</label>
              <input
                type="text"
                value={state.occupation}
                onChange={(e) => dispatch({type:"SET_OCCUPATION",payload:e.target.value})}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 mb-8">
              <label className="block w-20 text-sm font-medium">Image URL:</label>
              <input
                type="text"
                // value={imageURL}
                // onChange={(e) => setImageURL(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 gap-4 mb-8">
              <label className="block w-20 text-sm font-medium">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2 mb-8">
              <label className="block w-20 text-sm font-medium">GitHub Link:</label>
              <input
                type="text"
                // value={githubLink}
                // onChange={(e) => setGithubLink(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 mb-8">
              <label className="block w-full text-sm font-medium">LinkedIn Link:</label>
              <input
                type="text"
                // value={linkedinLink}
                // onChange={(e) => setLinkedinLink(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 mb-8">
              <label className="block w-full text-sm font-medium">Portfolio Link:</label>
              <input
                type="text"
                // value={linkedinLink}
                // onChange={(e) => setLinkedinLink(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center">
              <button
                type="submit"
                className={`px-4 py-2 text-sm font-medium rounded hover:bg-blue-600 ${
                  loading
                    ? 'text-gray-500 bg-gray-300 cursor-not-allowed'
                    : 'text-white bg-blue-500'
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
          <div className="absolute right-0 top-0 bg-gray-900 bg-opacity-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Schedule Time</h3>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="flex items-center">
                <label className="block w-32 text-sm font-medium">Schedule Time:</label>
                <input
                  type="text"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  placeholder="24-hrs format like 22:01"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 ml-4"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PostData);
