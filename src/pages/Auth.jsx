import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, Users, Building2, GraduationCap } from 'lucide-react'

export default function Auth() {
  const { t } = useTranslation()
  const { login, register, user } = useUser()
  const navigate = useNavigate()
  
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    role: 'student'
  })

  // Redirect si déjà connecté
  React.useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          throw new Error('Veuillez remplir tous les champs / Please fill all fields')
        }
        login(formData.email, formData.password)
        setSuccess('Connexion réussie! / Login successful!')
        setTimeout(() => navigate('/'), 1500)
      } else {
        if (!formData.email || !formData.password || !formData.fullName) {
          throw new Error('Veuillez remplir tous les champs / Please fill all fields')
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Les mots de passe ne correspondent pas / Passwords do not match')
        }
        if (formData.password.length < 6) {
          throw new Error('Le mot de passe doit contenir au moins 6 caractères / Password must be at least 6 characters')
        }
        register(formData.email, formData.password, formData.fullName, formData.role)
        setSuccess('Inscription réussie! / Registration successful!')
        setTimeout(() => navigate('/'), 1500)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const demoAccounts = [
    { role: 'Employé/Student', email: 'student@safefood.com', password: 'demo123' },
    { role: 'Manager', email: 'manager@safefood.com', password: 'demo123' },
    { role: 'Restaurant', email: 'restaurant@safefood.com', password: 'demo123' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-500 to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Info */}
        <div className="hidden md:flex flex-col justify-center text-white">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">SafeFood NYC Academy</h1>
            <p className="text-xl opacity-90">Sécurité Alimentaire pour New York / Food Safety for New York</p>
          </div>

          {/* Benefits */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Certification Food Protection</h3>
                <p className="text-sm opacity-80">Obtenez votre certification officielle du NYC DOH</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Communauté Collaborative</h3>
                <p className="text-sm opacity-80">Participez à un forum et leaderboard motivant</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Pour Tous les Rôles</h3>
                <p className="text-sm opacity-80">Employés, managers et propriétaires de restaurants</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white border-opacity-20">
            <p className="text-sm opacity-75">Rejoignez des milliers d'utilisateurs / Join thousands of users</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto md:mx-0">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-br from-primary to-secondary p-4 rounded-lg mb-4">
              <User size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-primary">{isLogin ? 'Connexion' : 'Inscription'}</h2>
            <p className="text-gray-600 mt-2 text-sm">
              {isLogin ? 'Bon retour ! / Welcome back!' : 'Rejoignez notre plateforme / Join our platform'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => {
                setIsLogin(true)
                setFormData({ email: '', password: '', fullName: '', confirmPassword: '', role: 'student' })
                setError('')
              }}
              className={`flex-1 py-2 rounded font-semibold transition ${
                isLogin
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => {
                setIsLogin(false)
                setFormData({ email: '', password: '', fullName: '', confirmPassword: '', role: 'student' })
                setError('')
              }}
              className={`flex-1 py-2 rounded font-semibold transition ${
                !isLogin
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex gap-3 rounded">
              <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 flex gap-3 rounded">
              <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom Complet / Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Jean Dupont / John Doe"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>
            )}

            {/* Role (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Votre Rôle / Your Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                >
                  <option value="student">👨‍💼 Employé / Staff Member</option>
                  <option value="manager">📊 Manager / Gestionnaire</option>
                  <option value="restaurant_owner">🍽️ Restaurant Owner / Propriétaire</option>
                  <option value="instructor">👨‍🏫 Instructor / Formateur</option>
                </select>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse Email / Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vous@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de Passe / Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmez le Mot de Passe / Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 mt-6"
            >
              {loading ? '⏳ Traitement... / Processing...' : (isLogin ? '🔓 Se Connecter / Login' : '✨ Créer un Compte / Sign Up')}
            </button>
          </form>

          {/* Demo Credentials */}
          {isLogin && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-3">📝 Identifiants de Démonstration / Demo Accounts:</p>
              <div className="space-y-2">
                {demoAccounts.map((acc, idx) => (
                  <div key={idx} className="text-xs text-blue-800 bg-white p-2 rounded border border-blue-100">
                    <p className="font-semibold">{acc.role}</p>
                    <p>Email: <code className="bg-gray-100 px-1">{acc.email}</code></p>
                    <p>Password: <code className="bg-gray-100 px-1">{acc.password}</code></p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-6">
            En continuant, vous acceptez nos conditions d'utilisation / By continuing, you agree to our terms
          </p>
        </div>
      </div>
    </div>
  )
}
