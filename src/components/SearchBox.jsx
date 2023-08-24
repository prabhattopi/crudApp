import React from 'react'
import { Link } from 'react-router-dom'
import { motion} from "framer-motion";
const SearchBox = () => {
  return (
    <motion.div
    
      initial={{ opacity: 0, x: -100,transition:{delay:0.5, duration: 0.5 } }} // Initial position and opacity
         animate={{ opacity: 1, x: 0,transition:{delay:0.5, duration: 0.5 } }} // Final position and opacity
         whileInView="visible"
         viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -50,},
          visible: { opacity: 1, x: 0,},
        }}
    className='w-full sm:w-2/5 px-2 py-4 flex flex-col gap-2 overflow-y-auto absolute border-2 top-14 h-[calc(100dvh-10rem)] bg-white z-20'>
      {/* card */}
      <Link to="/">
      <div className='px-2 py-2 shadow-md flex items-center rounded-lg gap-4 h-14'>
             {/* Image container */}
             <div className='rounded-full w-10 h-10'>

                <img
                className='rounded-full object-cover w-full h-full'
                 src="https://firebasestorage.googleapis.com/v0/b/image-gallery-8cf2b.appspot.com/o/images%2F1689583584637.webp?alt=media&token=5320ad10-a9d0-491b-8f9f-130cffdaa3b2" alt="" />
             </div>
             {/* Title */}
             <div className='font-bold'>
                <h2>Prabhat Singh</h2>
             </div>
             

      </div>
      </Link>
    </motion.div>
  )
}

export default SearchBox