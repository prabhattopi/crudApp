import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useItem from '../hooks/useItem'
import { fetchDataSingle } from '../httpRequest'
import { iconsObj } from '../components/GetData'
import "./singlepage.css"
const SingleUser = () => {
  const {id}=useParams()
  const {dispatch,state}=useItem()
useEffect(()=>{
  fetchDataSingle(id).then(data=>{
    dispatch({type:"SET_SINGLE",payload:data})
  }).catch(err=>console.log(err))
  
  return ()=>dispatch({type:"REMOVE_SINGLE"})
},[dispatch,id])
const {img,user,description,like,dislike,views,social_links}=state?.singleData
  return (
   <div className='flex flex-wrap gap-8 justify-between mx-8 my-8 py-4 px-4'>
      <div className='flex flex-wrap gap-8'>
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
        <div className='flex flex-col gap-4'>
            <div className='font-bold text-4xl'>
             {user}
            </div>
            <div>
              <h2 className='text-xl'>{description}</h2>
            </div>
        
        </div>
      </div>


  {/* chat */}
      <div className='flex flex-col flex-2 gap-4'>
      
        <div className='text-2xl font-bold'>Comments</div>

        <div className='flex mb-4 flex-col gap-4  h-[calc(100vh-150px)]  overflow-y-auto max-h-80vh'>
     
        <div className='flex gap-2'>
          <img src={img} alt="" className='w-10 h-10 rounded-full object-cover' />
           <p>topi@....</p>
          </div>
          <div>
            <p className=''>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem nesciunt magnam provident amet, alias cum, laborum corporis voluptatibus officiis porro nam laboriosam illo eligendi saepe, debitis earum voluptates! Quod, ea?</p>
          </div>
          <div className='flex gap-2'>
          <img src={img} alt="" className='w-10 h-10 rounded-full object-cover' />
           <p>topi@....</p>
          </div>
          <div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem nesciunt magnam provident amet, alias cum, laborum corporis voluptatibus officiis porro nam laboriosam illo eligendi saepe, debitis earum voluptates! Quod, ea?</p>
          </div>
          <div className='flex gap-2'>
          <img src={img} alt="" className='w-10 h-10 rounded-full object-cover' />
           <p>topi@....</p>
          </div>
          <div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem nesciunt magnam provident amet, alias cum, laborum corporis voluptatibus officiis porro nam laboriosam illo eligendi saepe, debitis earum voluptates! Quod, ea?</p>
          </div>
          <div className='flex gap-2'>
          <img src={img} alt="" className='w-10 h-10 rounded-full object-cover' />
           <p>topi@....</p>
          </div>
          <div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem nesciunt magnam provident amet, alias cum, laborum corporis voluptatibus officiis porro nam laboriosam illo eligendi saepe, debitis earum voluptates! Quod, ea?</p>
          </div>
          <div className='flex gap-2'>
          <img src={img} alt="" className='w-10 h-10 rounded-full object-cover' />
           <p>topi@....</p>
          </div>
          <div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem nesciunt magnam provident amet, alias cum, laborum corporis voluptatibus officiis porro nam laboriosam illo eligendi saepe, debitis earum voluptates! Quod, ea?</p>
          </div>
          <div className='flex gap-2'>
          <img src={img} alt="" className='w-10 h-10 rounded-full object-cover' />
           <p>topi@....</p>
          </div>
          <div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem nesciunt magnam provident amet, alias cum, laborum corporis voluptatibus officiis porro nam laboriosam illo eligendi saepe, debitis earum voluptates! Quod, ea?</p>
          </div>
         

        </div>
        <div className='chat-section py-2 px-2'>
  <input
    type='text'
    placeholder='Add a public comment...'
    className='w-full p-2 border focus:outline-none focus:border-black-500'
  />
</div>
        
      

     
      </div>
      
    </div>
  )
}

export default SingleUser