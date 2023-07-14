import { useContext } from 'react'
import { ItemContext } from '../context/Items/item'

const useItem = () => {
   return useContext(ItemContext)
}

export default useItem