/* eslint-disable react-refresh/only-export-components */
import { useState, memo } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import api from '../api';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../httpRequest';
const PostData = ({items,setItems}) => {
  const [user, setUser] = useState('');
  const [loading,setLoading]=useState(false)
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false); // State for showing/hiding the modal
  const [scheduleTime, setScheduleTime] = useState(''); // State for the scheduled time
  const navigate=useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

  setLoading(true)
const timeString = scheduleTime; // The time in HH:mm format

// Get the current date in IST
const currentDateIST = moment().utcOffset('+05:30').format('YYYY-MM-DD');

// Concatenate the current date in IST and the time string
const timestampStringIST = `${currentDateIST} ${timeString}`;

// Create a Moment object from the IST timestamp string
const timestampIST = moment(timestampStringIST, 'YYYY-MM-DD HH:mm').toDate();

console.log(timestampIST); // The IST timestamp in Date object format
const date = new Date(timestampIST);

const formattedDate = date.toISOString();

console.log(formattedDate); // '2023-06-08T10:09:41.784Z'
    const response=scheduleTime? await api.post('/items', { user, description, scheduleTime:formattedDate }):await api.post('/items', { user, description})
     
      // Clear the form fields after successful submission
      if (response.status === 201) {
        // Show a success toast notification with a custom message from the backend
        toast.success(response.data||'Post created successfully', {
          position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
          autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar:false, // Hide the progress bar
        });
        // Clear the form fields after successful submission
        await fetchData().then((data)=>setItems(data))
        setUser('');
        setDescription('');
        setScheduleTime('');
     
        navigate("/");
        // Perform any additional actions after successful submission
      } else {
        // Show an error toast notification with a custom message from the backend
        toast.error(response.data||'Failed to create Post', {
          position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
          autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar:false, // Hide the progress bar
        });
      }
     setLoading(false)
      // ...
    } catch (error) {
      // Show an error toast notification for any other errors
      toast.error(response.data||'Failed to create Post', {
        position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
        autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar:false, // Hide the progress bar
      });
    }
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
              className={` px-4 py-2 text-sm font-medium rounded hover:bg-blue-600 ${
                 loading
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
