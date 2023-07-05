import { useContext } from 'react'
import {AuthContext} from '../context/auth/auth'

const useAuth = () => {
   return useContext(AuthContext)
}

export default useAuth