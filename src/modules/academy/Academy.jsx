import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Academy() {
  const { t } = useTranslation()
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Sample course data
  const courses = [
    {
      id: 1,
      title: 'Basic Food Hygiene',
      description: 'Essential food safety practices',
      progress: 65,
      status: 'inProgress',
      modules: 5,
      enrollees: 234
    },
    {
      id: 2,
      title: 'Advanced Sanitation',
      description: 'Professional sanitation procedures',
      progress: 100,
      status: 'completed',
      modules: 8,
      enrollees: 156
    },
    {
      id: 3,
      title: 'Allergen Management',
      description: 'Handling food allergies safely',
      progress: 0,
      status: 'notStarted',
      modules: 4,
      enrollees: 89
    }
  ]

  const progressData = courses.map(c => ({
    name: c.title.substring(0, 10),
    progress: c.progress
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">{t('academy.title')}</h1>
          <p className="text-xl text-gray-100">{t('academy.subtitle')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl font-bold text-primary mb-2">{courses.length}</div>
            <div className="text-gray-600">{t('academy.courses')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl font-bold text-secondary mb-2">2</div>
            <div className="text-gray-600">{t('academy.completed')}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl font-bold text-accent mb-2">1</div>
            <div className="text-gray-600">{t('academy.inProgress')}</div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">{t('academy.progress')}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#2ecc71" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="bg-gradient-to-r from-primary to-secondary p-4 h-24"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">{t('academy.progress')}</span>
                    <span className="text-primary font-bold">{course.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                  <div>📚 {course.modules} {t('academy.courseModules')}</div>
                  <div>👥 {course.enrollees} {t('academy.enrolled')}</div>
                </div>

                {/* Button */}
                <button className="w-full bg-secondary text-white py-2 rounded font-semibold hover:bg-primary transition">
                  {course.status === 'completed'
                    ? t('academy.viewCertificate')
                    : course.status === 'inProgress'
                    ? t('academy.continueCourse')
                    : t('academy.startCourse')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
