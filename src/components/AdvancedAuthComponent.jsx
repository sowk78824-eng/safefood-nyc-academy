import React, { useState, useEffect } from 'react'
import { Mail, Lock, Eye, EyeOff, Loader, AlertCircle, CheckCircle, Shield, Apple, Globe } from 'lucide-react'
import {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithApple,
  getCurrentUser,
  getSecurityStatus
} from '../utils/authSecurityApi'

export default function AdvancedAuthComponent() {
  const [mode, setMode] = useState('login') // login, signup, mfa
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [securityStatus, setSecurityStatus] = useState(null)
  const [mfaCode, setMfaCode] = useState('')
  const [showMFA, setShowMFA] = useState(false)

  useEffect(() => {
    checkCurrentUser()
  }, [])

  const checkCurrentUser = () => {
    const user = getCurrentUser()
    setCurrentUser(user)
    if (user) {
      setSecurityStatus(getSecurityStatus())
    }
  }

  const handleEmailSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    const result = await signUpWithEmail(email, password, { displayName: email.split('@')[0] })

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess('Account created! Please verify your email.')
      checkCurrentUser()
      setTimeout(() => setMode('login'), 2000)
    }
    setLoading(false)
  }

  const handleEmailSignIn = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const result = await signInWithEmail(email, password)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess('Signed in successfully!')
      checkCurrentUser()
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)

    const result = await signInWithGoogle()

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess('Google sign-in successful!')
      checkCurrentUser()
    }
    setLoading(false)
  }

  const handleAppleSignIn = async () => {
    setError('')
    setLoading(true)

    const result = await signInWithApple()

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess('Apple sign-in successful!')
      checkCurrentUser()
    }
    setLoading(false)
  }

  // If user is logged in, show dashboard
  if (currentUser) {
    return <UserDashboard user={currentUser} securityStatus={securityStatus} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-600 to-purple-700 flex items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">SafeFood</h1>
          <p className="text-gray-600">Secure & Delicious Dining</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
            <p className="flex items-start gap-2 text-red-900">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              {error}
            </p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded">
            <p className="flex items-start gap-2 text-green-900">
              <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
              {success}
            </p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => {
              setMode('login')
              setError('')
              setSuccess('')
            }}
            className={`flex-1 py-2 px-4 rounded font-semibold transition ${
              mode === 'login'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMode('signup')
              setError('')
              setSuccess('')
            }}
            className={`flex-1 py-2 px-4 rounded font-semibold transition ${
              mode === 'signup'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={mode === 'login' ? handleEmailSignIn : handleEmailSignUp} className="space-y-4 mb-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Signup only) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
                  required
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-blue-600 text-white py-2 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : mode === 'login' ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Auth Buttons */}
        <div className="space-y-3 mb-6">
          {/* Google Auth */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            <Globe size={20} />
            Google
          </button>

          {/* Apple Auth */}
          <button
            onClick={handleAppleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            <Apple size={20} />
            Apple
          </button>
        </div>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

// User Dashboard Component
function UserDashboard({ user, securityStatus }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl p-8 mb-6 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.displayName || user.email}!</h1>
          <p className="text-blue-100">Your secure dining experience is ready</p>
        </div>

        {/* Security Status */}
        {securityStatus && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Auth Info */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield size={24} className="text-primary" />
                Security Status
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Provider</span>
                  <span className="font-bold capitalize text-gray-800">
                    {user.provider || 'Email'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">2FA Status</span>
                  <span className={securityStatus.mfaEnabled ? 'text-green-600 font-bold' : 'text-orange-600'}>
                    {securityStatus.mfaEnabled ? '✓ Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Security Score</span>
                  <span className="font-bold text-primary">{securityStatus.securityScore}/100</span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Security Tips</h2>
              <ul className="space-y-2">
                {securityStatus.recommendations?.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckIcon size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="text-gray-800 font-semibold">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Member Since</label>
              <p className="text-gray-800 font-semibold">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CheckIcon = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4l-8.97 8.97" strokeWidth="2" />
  </svg>
)
