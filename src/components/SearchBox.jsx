import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import useItem from '../hooks/useItem';
const SearchBox = () => {
  const { state } = useItem()
  return (
    <motion.div

      initial={{ opacity: 0, x: -100, transition: { delay: 0.5, duration: 0.5 } }} // Initial position and opacity
      animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.5 } }} // Final position and opacity
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 0, x: -50, },
        visible: { opacity: 1, x: 0, },
      }}
      className='w-full sm:w-2/5 px-2 py-4 flex flex-col gap-2 overflow-y-auto absolute border-2 top-14 h-[calc(100dvh-10rem)] bg-white z-20'>
      {state.loading && <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-300"></div>
      </div>
      }
      {
        !state.loading&&state.searchData.length==0&& <div className='flex items-center justify-center'>
        <h1>No results found</h1>
      </div>
      }
      {/* card */}
      {
       
          state.searchData?.map(e => (
            <Link to={`/single/${e._id}`}
            key={e._id}
            >
              <div className='px-2 py-2 shadow-md flex items-center rounded-lg gap-4 h-14'>
                {/* Image container */}
                <div className='rounded-full w-10 h-10'>

                  <img
                    className='rounded-full object-cover w-full h-full'
                    src={e.img} alt="" />
                </div>
                {/* Title */}
                <div className='font-bold'>
                  <h2>{e.user}</h2>
                </div>


              </div>
            </Link>

          ))
      }

    </motion.div>
  )
}

export default SearchBox