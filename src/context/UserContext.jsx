import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [userProgress, setUserProgress] = useState({})

  // Charger les utilisateurs depuis localStorage au démarrage
  useEffect(() => {
    const savedUsers = localStorage.getItem('safefoodUsers')
    const currentUser = localStorage.getItem('currentUser')
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    }
    if (currentUser) {
      setUser(JSON.parse(currentUser))
      const userProgressData = localStorage.getItem(`progress_${JSON.parse(currentUser).id}`)
      if (userProgressData) {
        setUserProgress(JSON.parse(userProgressData))
      }
    }
    setLoading(false)
  }, [])

  // Sauvegarder les utilisateurs
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('safefoodUsers', JSON.stringify(users))
    }
  }, [users])

  // Sauvegarder l'utilisateur actuel
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
    }
  }, [user])

  // Sauvegarder le progrès de l'utilisateur
  useEffect(() => {
    if (user) {
      localStorage.setItem(`progress_${user.id}`, JSON.stringify(userProgress))
    }
  }, [userProgress, user])

  const register = (email, password, fullName, role = 'student') => {
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const newUser = {
      id: Date.now(),
      email,
      password, // Note: En production, hasher le password!
      fullName,
      role, // 'student' ou 'admin' ou 'restaurant_owner'
      createdAt: new Date().toISOString(),
      points: 0,
      badges: [],
      completedCourses: [],
      coursesProgress: {},
      profileImage: null,
    }

    setUsers([...users, newUser])
    setUser(newUser)
    setUserProgress({
      completedLessons: {},
      quizScores: {},
      timeSpent: {},
      notes: {},
    })
    return newUser
  }

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password)
    if (!foundUser) {
      throw new Error('Invalid credentials')
    }

    setUser(foundUser)
    const userProgressData = localStorage.getItem(`progress_${foundUser.id}`)
    if (userProgressData) {
      setUserProgress(JSON.parse(userProgressData))
    } else {
      setUserProgress({
        completedLessons: {},
        quizScores: {},
        timeSpent: {},
        notes: {},
      })
    }
    return foundUser
  }

  const logout = () => {
    setUser(null)
    setUserProgress({})
    localStorage.removeItem('currentUser')
  }

  const updateUserProgress = (lessonKey, data) => {
    setUserProgress(prev => ({
      ...prev,
      [lessonKey]: data
    }))
  }

  const addBadge = (badgeId, badgeName) => {
    setUser(prev => ({
      ...prev,
      badges: [...(prev.badges || []), { id: badgeId, name: badgeName, unlockedAt: new Date().toISOString() }]
    }))
  }

  const addPoints = (points) => {
    setUser(prev => ({
      ...prev,
      points: (prev.points || 0) + points
    }))
  }

  const completeLesson = (courseId, lessonId) => {
    const lessonKey = `${courseId}-${lessonId}`
    setUserProgress(prev => ({
      ...prev,
      completedLessons: {
        ...prev.completedLessons,
        [lessonKey]: true
      }
    }))
  }

  const recordQuizScore = (courseId, lessonId, score, percentage) => {
    const quizKey = `${courseId}-${lessonId}`
    setUserProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [quizKey]: { score, percentage, completedAt: new Date().toISOString() }
      }
    }))

    // Ajouter points basés sur le score
    if (percentage >= 90) addPoints(150) // Excellent
    else if (percentage >= 80) addPoints(100) // Good
    else if (percentage >= 70) addPoints(75) // Pass
  }

  const getAllUsers = () => users

  const getUserStats = (userId) => {
    const userToCheck = users.find(u => u.id === userId)
    if (!userToCheck) return null

    return {
      totalPoints: userToCheck.points || 0,
      totalBadges: userToCheck.badges?.length || 0,
      totalCoursesCompleted: userToCheck.completedCourses?.length || 0,
    }
  }

  const getLeaderboard = (limit = 10) => {
    return users
      .filter(u => u.role === 'student')
      .map(u => ({
        id: u.id,
        name: u.fullName,
        points: u.points || 0,
        badgesCount: u.badges?.length || 0,
        email: u.email,
      }))
      .sort((a, b) => b.points - a.points)
      .slice(0, limit)
  }

  const value = {
    user,
    users,
    loading,
    userProgress,
    register,
    login,
    logout,
    updateUserProgress,
    addBadge,
    addPoints,
    completeLesson,
    recordQuizScore,
    getAllUsers,
    getUserStats,
    getLeaderboard,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
