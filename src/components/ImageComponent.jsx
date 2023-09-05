import React from 'react'

const ImageComponent = ({img,user,height,width}) => {
  return (
    <img src={img} alt={user} style={{height:height,width:width,objectFit:"cover"}} className='rounded-full'
    onError={(e) => {
        e.target.src = "https://firebasestorage.googleapis.com/v0/b/image-gallery-8cf2b.appspot.com/o/images%2F1689583584637.webp?alt=media&token=5320ad10-a9d0-491b-8f9f-130cffdaa3b2";
      }}
    />
  )
}

export default ImageComponent