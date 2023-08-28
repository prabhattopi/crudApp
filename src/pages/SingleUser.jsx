import React, { useEffect, useState,useRef } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useItem from '../hooks/useItem'
import Pusher from "pusher-js";
import { fetchDataSingle } from '../httpRequest'
import { iconsObj } from '../components/GetData'
import "./singlepage.css"
import api from '../api'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'
const SingleUser = () => {
  const [comment,setComment]=useState("")
  const [commentData,setCommentData]=useState([])
  const chatContainerRef = useRef(null);
  const {id}=useParams()
  const {dispatch,state}=useItem()
  const {user:contextUser}=useAuth()
useEffect(()=>{
  fetchDataSingle(id).then(data=>{
    dispatch({type:"SET_SINGLE",payload:data})
  }).catch(err=>console.log(err))
  
  return ()=>dispatch({type:"REMOVE_SINGLE"})
},[dispatch,id])

useEffect(() => {
  const pusher = new Pusher(import.meta.env.VITE_API_KEY, {
    cluster: import.meta.env.VITE_API_CLUSTER,
    encrypted: true,
  });

  const channel = pusher.subscribe('pusherchat');

  // Listen for 'new-comment' event and update the comments state
  channel.bind('new_comment', (data) => {
    if(!data.img){
      data.img="https://firebasestorage.googleapis.com/v0/b/image-gallery-8cf2b.appspot.com/o/images%2F1689583584637.webp?alt=media&token=5320ad10-a9d0-491b-8f9f-130cffdaa3b2"
    }
    setCommentData([...commentData,data])
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, 50);
    }
  });
  
  return () => {
    // Unsubscribe from the Pusher channel when the component unmounts
    pusher.unsubscribe("pusherchat");
  };
}, [commentData]);

const {img,user,description,like,dislike,views,social_links,comments}=state?.singleData
const handleNewchat=async ()=>{
  try{
    const response=await api.post("/items/comment",{id,email:contextUser.email,comment},{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('it_wale_token')}`,
      },
  })
  
  toast.success(response.data.message||'Login in successfully', {
    position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
    autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
    hideProgressBar:false, // Hide the progress bar
  });
  setComment("")
// Handle the response here, such as updating state or displaying a messag
// navigate("/")
} catch (error) {
// Handle any errors that occurred during the API call

toast.error(error.response.data.message||'Worng credential', {
    position: toast.POSITION.TOP_RIGHT, // Change the position of the toast
    autoClose: 3000, // Auto-close the toast after 3000 milliseconds (3 seconds)
    hideProgressBar:false, // Hide the progress bar
  });
}
 

}

  return (
   <div className='flex flex-wrap gap-4 justify-between mx-4 my-4 py-8 px-2'>
      <div style={{maxWidth:"800px"}} className='flex flex-wrap gap-8 ml-8'>
        {/* img */}
        <div className='flex flex-wrap flex-col gap-2 font-bold items-center'>
          <img src={img} alt={user} style={{height:"200px",width:"200px",objectFit:"cover"}} className='rounded-full'/>
          <div className='flex gap-2'>
            <span>Likes</span>
            <span>{like?.length}</span>
           
          </div>
          <div className='flex gap-2'>
          <span>Dislikes</span>
            <span>{dislike?.length}</span>
           
          </div>
          <div className='flex gap-2'>
          <span>total views</span>
            <span>{views}</span>
           
          </div>
          <div className='flex flex-col gap-2'>
              <span>contact with</span>
              <div className="flex space-x-2 justify-center">
                {social_links?.map((e) => (
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
          </div>

        </div>
        




        {/* description and other other stub */}
        <div className='flex flex-col gap-4 px-2 py-2'>
            <div className='font-bold text-4xl'>
             {user}
            </div>
            <div>
              <h2 style={{maxWidth:"400px"}} className='text-xl'>{description}</h2>
            </div>
        
        </div>
      </div>


  {/* chat */}
      <div className='flex relative flex-col flex-1 gap-8 bg-gray-200 px-4 py-2 rounded-lg'>
      
        <div className='text-2xl font-bold'>Comments</div>

        <div ref={chatContainerRef} className='flex mb-16 flex-col gap-4 h-[calc(100vh-200px)]  overflow-y-auto max-h-80vh'>
     
        {([...(comments || []), ...(commentData || [])]).map((e,i) => (
          <div key={e._id|| i}>
            <div className='flex gap-2 items-center font-bold'>
              <img src={e.img} alt={e.user} className='w-10 h-10 rounded-full object-cover' />
              <p>{e.email}</p>
            </div>
            <div className='flex ml-16'>
              <p className=''>{e.comment}</p>
            </div>
          </div>
        ))}
       
        </div>
        <div className='chat-section mt-16 py-2 px-2 flex gap-4 items-center'>
  <input
    type='text'
    value={comment}
    onChange={(e)=>setComment(e.target.value)}
    placeholder='Add a public comment...'
    className='w-full p-2 border focus:outline-none focus:border-black-500'
  />
  <button disabled={!comment} onClick={handleNewchat} className='bg-blue-700 w-28 text-white font-bold px-2 py-2 rounded-lg text-center'>Post</button>
</div>
        
      

     
      </div>
      
    </div>
  )
}

export default SingleUser

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { MdClose } from 'react-icons/md'; // Import the close icon from react-icons
// import ReactHtmlParser from 'react-html-parser'; // Import the react-html-parser library

// import useRecipe from '../hooks/useRecipe';

// let tasteData={
    
//         "sweetness": 28.79,
//         "saltiness": 26.74,
//         "sourness": 6.22,
//         "bitterness": 12.38,
//         "savoriness": 11.8,
//         "fattiness": 100,
//         "spiciness": 0
    
// }
// const SinglePages = () => {
//     const { id } = useParams();
//     const { singleRecipeInformation, dispatch, state } = useRecipe();
//     const [activeComponent, setActiveComponent] = useState(null);

//     useEffect(() => {
       

//         const getSingleData = async () => {
//             await singleRecipeInformation(id)
//         };

 
//             getSingleData();
        

//         return () => {
//             dispatch({ type: 'RESET_SINGLE' });
   
          
//         };
//     }, [id]);

//     const handleComponentClick = (component) => {
//         setActiveComponent(component);
//     };

//     const handleCloseComponent = () => {
//         setActiveComponent(null);
//     };
// console.log(state.singleRecipe)
// if(state.loading){
//     return (
//         <div className="flex items-center justify-center h-screen">
//       <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 sm:h-20 sm:w-20"></div>
//     </div>
//    )
// }
//     return (
//         <div className="bg-gray-100 min-h-[calc(100vh-82px)]">
           
//             <div className="p-6 sm:flex">
//                 {/* Recipe Information */}
//                 <div className="flex flex-col flex-wrap flex-1 items-center lg:flex-row">
//                     {/* Image information */}
//                     <div className="sm:mr-6 mb-4 sm:mb-0">
//                         <img
//                           className="width-full h-full object-cover"
//                             src={ state.singleRecipe?.recipeInformations?.image}
//                             alt={ state.singleRecipe?.recipeInformations?.title}
//                         />
//                     </div>
//                     {/* Title Summary */}
//                     <div className="flex-1">
//                         <h1 className="text-3xl font-semibold mb-2">{ state.singleRecipe?.recipeInformations?.title}</h1>
//                         <p className="text-gray-600">
//                            {
//                                ReactHtmlParser(
//                                 state.singleRecipe?.recipeInformations?.summary
//                                )
                                
//                            }
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-6 flex flex-wrap gap-4">
//                 <button
//                     className={`py-2 px-4 rounded ${
//                         activeComponent === 'nutrition' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
//                     }`}
//                     onClick={() => handleComponentClick('nutrition')}
//                 >
//                     Nutritions Details
//                 </button>
//                 <button
//                     className={`py-2 px-4 rounded ${
//                         activeComponent === 'ingredients' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
//                     }`}
//                     onClick={() => handleComponentClick('ingredients')}
//                 >
//                     Ingredients Details
//                 </button>
//                 <button
//                     className={`py-2 px-4 rounded ${
//                         activeComponent === 'tastes' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
//                     }`}
//                     onClick={() => handleComponentClick('tastes')}
//                 >
//                     Tastes Details
//                 </button>
//             </div>

//             {activeComponent && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="p-4 sm:p-6 bg-white rounded shadow w-full max-w-md relative">
//                         <button
//                             className="absolute top-0 right-0 mt-2 mr-2 px-3 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800"
//                             onClick={handleCloseComponent}
//                         >
//                             <MdClose size={20} />
//                         </button>
//                         <div className="h-[calc(100dvh-14rem)] overflow-y-auto">
//                             {activeComponent === 'nutrition' && (
//                                 <div className="flex flex-col p-2 gap-4 sm:p-6 rounded mt-2">
                                    
//                                     {
//                                         state.singleRecipe?.nutrition?.map(e=>(
//                                             <div key={e.name} className="flex shadow-md px-4 py-4 w-full h-auto">
//                                                 <span className="font-bold">{e.name}</span>
//                                                 <span className="font-bold text-gray-600">: {e.amount}{e.unit}</span>
                                         
//                                             </div>
//                                         ))
//                                     }
//                                     {/* ... */}
//                                 </div>
//                             )}

//                             {activeComponent === 'ingredients' && (
//                                 <div className="flex flex-col p-2 gap-4 sm:p-6 rounded mt-2">
//                                     {
//                                         state.singleRecipe?.ingredients?.map(e=>(
//                                             <div key={e.name} className="flex items-center gap-2 shadow-md px-4 py-4 w-full h-auto">
//                                                 <div>
//                                                     <img className="rounded-full object-cover" src={`https://spoonacular.com/cdn/ingredients_100x100/${e.image}`} alt={e.name}/>
//                                                 </div>
//                                                 <div className="flex flex-col gap-2 justify-center">
//                                                 <span className="font-bold uppercase">{e.name}</span>
//                                                 <div className="flex gap-1">
//                                                     <span className="font-bold">
//                                                         metric
//                                                     </span>
//                                                 <span className="font-bold text-gray-600">:{e.amount.metric.value}{e.amount.metric.unit}</span>
//                                                 </div>
//                                                 <div className="flex gap-1">
//                                                     <span className="font-bold">
//                                                         US
//                                                     </span>
//                                                 <span className="font-bold text-gray-600">:{e.amount.us.value}{e.amount.us.unit}</span>
//                                                 </div>
                                            
                                    
//                                                 </div>
                                            
                                     
//                                         </div>

//                                         ))
//                                     }
//                                     {/* ... */}
//                                 </div>
//                             )}

//                             {activeComponent === 'tastes' && (
//                                <div className="flex flex-col p-2 gap-4 sm:p-6 rounded mt-2">
                                    
//                                {
//                                   Object.keys(tasteData)?.map(e=>(
//                                        <div key={e} className="flex shadow-md px-4 py-4 w-full h-auto">
//                                            <span className="font-bold">{e}</span>
//                                            <span className="font-bold text-gray-600">: {state.singleRecipe?.taste[e]}</span>
                                    
//                                        </div>
//                                    ))
//                                }
//                                {/* ... */}
//                            </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SinglePages;