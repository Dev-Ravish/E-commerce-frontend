import { Image } from '@chakra-ui/react'
import React from 'react'
import { API } from '../../backend'

const Imagecalls = ({product}) => {
    const imageUrl = product? `${API}/product/image/${product._id}` : "https://images.unsplash.com/photo-1672478865437-781a128b61ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
  return (
    <Image
          src= {imageUrl}
          alt='product image'
          borderRadius="lg"
          height="200px"
          width="95%"
          objectFit="cover"
        />
  )
}

export default Imagecalls