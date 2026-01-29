import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../context/UserContext'
import { Users, Trash2, Download, Eye, EyeOff, Plus, X } from 'lucide-react'

export default function AdminDashboard() {
  const { t } = useTranslation()
  const { user, users, userProgress } = useUser()
  const [staffList, setStaffList] = useState([])
  const [newStaffEmail, setNewStaffEmail] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(null)

  React.useEffect(() => {
    if (!user || user.role !== 'owner') {
      window.location.href = '/profile'
    }
  }, [user])

  if (!user || user.role !== 'owner') return null

  const handleAddStaff = () => {
    if (!newStaffEmail || !newStaffEmail.includes('@')) {
      alert('Please enter a valid email')
      return
    }

    const newStaff = {
      id: Date.now(),
      email: newStaffEmail,
      name: newStaffEmail.split('@')[0],
      role: 'staff',
      addedDate: new Date().toLocaleDateString(),
      status: 'invited'
    }

    setStaffList([...staffList, newStaff])
    setNewStaffEmail('')
    setShowAddForm(false)
  }

  const removeStaff = (id) => {
    if (confirm('Are you sure you want to remove this staff member?')) {
      setStaffList(staffList.filter(s => s.id !== id))
    }
  }

  const getStaffProgress = (email) => {
    const staffUser = users.find(u => u.email === email)
    if (!staffUser) return { completed: 0, inProgress: 0, points: 0 }

    const progress = userProgress[staffUser.id] || {}
    return {
      completed: Object.keys(progress.completedLessons || {}).length,
      inProgress: Object.keys(progress.quizScores || {}).length,
      points: progress.points || 0
    }
  }

  const calculateTeamStats = () => {
    const total = staffList.length
    const active = staffList.filter(s => s.status === 'active').length
    const avgCompletion = staffList.length > 0
      ? Math.round(
          staffList.reduce((sum, staff) => sum + getStaffProgress(staff.email).completed, 0) / 
          staffList.length
        )
      : 0
    const totalPoints = staffList.reduce((sum, staff) => sum + getStaffProgress(staff.email).points, 0)

    return { total, active, avgCompletion, totalPoints }
  }

  const stats = calculateTeamStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-100">Manage your team's food safety training</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">TOTAL STAFF</p>
            <p className="text-4xl font-bold text-primary mt-2">{stats.total}</p>
            <p className="text-gray-500 text-sm mt-2">{stats.active} active</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">AVG COMPLETION</p>
            <p className="text-4xl font-bold text-secondary mt-2">{stats.avgCompletion}%</p>
            <p className="text-gray-500 text-sm mt-2">courses completed</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">TEAM POINTS</p>
            <p className="text-4xl font-bold text-yellow-500 mt-2">{stats.totalPoints}</p>
            <p className="text-gray-500 text-sm mt-2">total earned</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-semibold">EXPORT DATA</p>
            <button
              onClick={() => {
                const data = JSON.stringify(staffList, null, 2)
                const blob = new Blob([data], { type: 'application/json' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `team-report-${new Date().toISOString().split('T')[0]}.json`
                a.click()
              }}
              className="mt-2 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-secondary transition"
            >
              <Download size={18} />
              Download
            </button>
          </div>
        </div>

        {/* Add Staff Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded font-semibold hover:bg-primary transition"
            >
              <Plus size={18} />
              Add Staff
            </button>
          </div>

          {showAddForm && (
            <div className="bg-gray-50 p-4 rounded mb-6 border-2 border-secondary">
              <h3 className="font-semibold mb-4">Add New Staff Member</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter staff email"
                  value={newStaffEmail}
                  onChange={(e) => setNewStaffEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <button
                  onClick={handleAddStaff}
                  className="bg-secondary text-white px-6 py-2 rounded font-semibold hover:bg-primary transition"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Staff List */}
          {staffList.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No staff members added yet</p>
              <p className="text-gray-500 text-sm">Click "Add Staff" to invite team members</p>
            </div>
          ) : (
            <div className="space-y-4">
              {staffList.map((staff) => {
                const progress = getStaffProgress(staff.email)
                return (
                  <div
                    key={staff.id}
                    className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                    onClick={() => setSelectedStaff(selectedStaff?.id === staff.id ? null : staff)}
                  >
                    {/* Staff Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">{staff.name}</h3>
                        <p className="text-gray-600 text-sm">{staff.email}</p>
                        <div className="flex gap-4 mt-2">
                          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                            Added {staff.addedDate}
                          </span>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            staff.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {staff.status === 'active' ? '✓ Active' : '⏳ Invited'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeStaff(staff.id)
                        }}
                        className="text-red-500 hover:text-red-700 transition p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Progress Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-gray-600 text-sm">Lessons</p>
                        <p className="text-2xl font-bold text-primary">{progress.completed}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-sm">Quizzes</p>
                        <p className="text-2xl font-bold text-secondary">{progress.inProgress}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-sm">Points</p>
                        <p className="text-2xl font-bold text-yellow-500">{progress.points}</p>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedStaff?.id === staff.id && (
                      <div className="mt-4 pt-4 border-t bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold mb-3">Training Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className="font-semibold">{staff.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Role:</span>
                            <span className="font-semibold">{staff.role}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Active:</span>
                            <span className="font-semibold">Today</span>
                          </div>
                          <div className="pt-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-secondary h-2 rounded-full transition-all"
                                style={{ width: `${(progress.completed / 15) * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              {Math.round((progress.completed / 15) * 100)}% course completion
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bulk Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="border-2 border-primary text-primary py-3 rounded font-semibold hover:bg-primary hover:text-white transition">
              📧 Send Training Reminder
            </button>
            <button className="border-2 border-secondary text-secondary py-3 rounded font-semibold hover:bg-secondary hover:text-white transition">
              📊 Generate Team Report
            </button>
            <button className="border-2 border-yellow-500 text-yellow-600 py-3 rounded font-semibold hover:bg-yellow-500 hover:text-white transition">
              🎯 Set Completion Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
