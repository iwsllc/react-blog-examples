import {useContext} from 'react'
import Context from './context'

export default function useModal() {
  let context = useContext(Context)
  return context
}
