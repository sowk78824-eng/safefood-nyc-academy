import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function ProtectedRoute({ children }) {
  const { user } = useUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!user) {
      navigate('/auth')
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  return children
}
