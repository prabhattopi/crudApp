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