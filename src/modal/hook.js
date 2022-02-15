import { useContext } from 'react'
import Context from './context'

export default function useModal() {
  const context = useContext(Context)
  return context
}
