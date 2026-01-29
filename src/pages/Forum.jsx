import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../context/UserContext'
import { MessageSquare, Heart, Reply, Trash2, Send } from 'lucide-react'

export default function Forum() {
  const { t } = useTranslation()
  const { user } = useUser()
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      courseId: 1,
      courseName: 'Basic Food Hygiene',
      title: 'Best practices for handwashing',
      author: 'Chef Maria',
      date: '2024-01-15',
      likes: 24,
      replies: 8,
      content: 'I found that using warm water with proper technique significantly reduces contamination. What are your experiences?',
      liked: false,
      comments: [
        {
          id: 1,
          author: 'Giovanni',
          content: 'Totally agree! I use the 6-step method from the course.',
          date: '2024-01-15',
          likes: 5
        },
        {
          id: 2,
          author: 'Sophie',
          content: 'The timing is really important too - at least 20 seconds!',
          date: '2024-01-15',
          likes: 3
        }
      ]
    },
    {
      id: 2,
      courseId: 2,
      courseName: 'Advanced Sanitation',
      title: 'Question about sanitizer concentrations',
      author: 'Manager Alex',
      date: '2024-01-14',
      likes: 12,
      replies: 5,
      content: 'The course mentions different sanitizer types. How do you test them in your kitchen?',
      liked: false,
      comments: [
        {
          id: 1,
          author: 'Robert',
          content: 'We use test strips from our supplier. Very reliable!',
          date: '2024-01-14',
          likes: 4
        }
      ]
    },
    {
      id: 3,
      courseId: 3,
      courseName: 'Allergen Management',
      title: 'Cross-contamination prevention tips',
      author: 'Chef Miguel',
      date: '2024-01-13',
      likes: 31,
      replies: 12,
      content: 'Share your best practices for preventing cross-contamination in a busy kitchen',
      liked: false,
      comments: []
    }
  ])

  const [showReplyForm, setShowReplyForm] = useState(null)
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('')
  const [newDiscussionContent, setNewDiscussionContent] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('1')
  const [showNewDiscussion, setShowNewDiscussion] = useState(false)
  const [replyTexts, setReplyTexts] = useState({})

  React.useEffect(() => {
    if (!user) {
      window.location.href = '/auth'
    }
  }, [user])

  if (!user) return null

  const courses = [
    { id: '1', name: 'Basic Food Hygiene' },
    { id: '2', name: 'Advanced Sanitation' },
    { id: '3', name: 'Allergen Management' },
  ]

  const handleCreateDiscussion = () => {
    if (!newDiscussionTitle.trim() || !newDiscussionContent.trim()) {
      alert('Please fill in all fields')
      return
    }

    const newDiscussion = {
      id: discussions.length + 1,
      courseId: parseInt(selectedCourse),
      courseName: courses.find(c => c.id === selectedCourse)?.name,
      title: newDiscussionTitle,
      author: user.fullName,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: 0,
      content: newDiscussionContent,
      liked: false,
      comments: []
    }

    setDiscussions([newDiscussion, ...discussions])
    setNewDiscussionTitle('')
    setNewDiscussionContent('')
    setShowNewDiscussion(false)
  }

  const handlePostReply = (discussionId, replyText) => {
    if (!replyText.trim()) return

    const updatedDiscussions = discussions.map(disc => {
      if (disc.id === discussionId) {
        return {
          ...disc,
          replies: disc.replies + 1,
          comments: [
            ...disc.comments,
            {
              id: disc.comments.length + 1,
              author: user.fullName,
              content: replyText,
              date: new Date().toISOString().split('T')[0],
              likes: 0
            }
          ]
        }
      }
      return disc
    })

    setDiscussions(updatedDiscussions)
    setReplyTexts({ ...replyTexts, [discussionId]: '' })
    setShowReplyForm(null)
  }

  const toggleLike = (id) => {
    setDiscussions(discussions.map(disc => {
      if (disc.id === id) {
        return {
          ...disc,
          liked: !disc.liked,
          likes: disc.liked ? disc.likes - 1 : disc.likes + 1
        }
      }
      return disc
    }))
  }

  const deleteDiscussion = (id) => {
    if (confirm('Are you sure you want to delete this discussion?')) {
      setDiscussions(discussions.filter(d => d.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Course Forum</h1>
          <p className="text-gray-600">
            Share experiences, ask questions, and learn from other professionals
          </p>
        </div>

        {/* New Discussion Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowNewDiscussion(!showNewDiscussion)}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-lg font-semibold hover:shadow-lg transition text-lg"
          >
            💬 Start a New Discussion
          </button>

          {showNewDiscussion && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
              <h2 className="text-2xl font-bold mb-4">Create New Discussion</h2>

              <div className="space-y-4">
                {/* Course Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Course Topic
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Discussion Title
                  </label>
                  <input
                    type="text"
                    value={newDiscussionTitle}
                    onChange={(e) => setNewDiscussionTitle(e.target.value)}
                    placeholder="What's your question or topic?"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newDiscussionContent}
                    onChange={(e) => setNewDiscussionContent(e.target.value)}
                    placeholder="Share your question, experience, or insight..."
                    rows="6"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleCreateDiscussion}
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
                  >
                    Post Discussion
                  </button>
                  <button
                    onClick={() => setShowNewDiscussion(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Discussions List */}
        <div className="space-y-6">
          {discussions.map(discussion => (
            <div key={discussion.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Discussion Header */}
              <div className="p-6 border-b">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {discussion.courseName}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{discussion.title}</h2>
                  </div>
                  {user.fullName === discussion.author && (
                    <button
                      onClick={() => deleteDiscussion(discussion.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>

                <p className="text-gray-600 text-sm">
                  by <strong>{discussion.author}</strong> • {discussion.date}
                </p>
              </div>

              {/* Discussion Content */}
              <div className="p-6 bg-gray-50 border-b">
                <p className="text-gray-700 leading-relaxed">{discussion.content}</p>
              </div>

              {/* Actions Bar */}
              <div className="px-6 py-4 flex justify-between items-center border-b bg-white">
                <div className="flex gap-6">
                  <button
                    onClick={() => toggleLike(discussion.id)}
                    className={`flex items-center gap-2 font-semibold transition ${
                      discussion.liked
                        ? 'text-red-500'
                        : 'text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <Heart size={20} fill={discussion.liked ? 'currentColor' : 'none'} />
                    {discussion.likes}
                  </button>

                  <div className="flex items-center gap-2 text-gray-600 font-semibold">
                    <MessageSquare size={20} />
                    {discussion.replies}
                  </div>
                </div>

                <button
                  onClick={() => setShowReplyForm(showReplyForm === discussion.id ? null : discussion.id)}
                  className="flex items-center gap-2 text-primary hover:text-secondary transition font-semibold"
                >
                  <Reply size={20} />
                  Reply
                </button>
              </div>

              {/* Comments Section */}
              {discussion.comments.length > 0 && (
                <div className="px-6 py-4 bg-gray-50 border-b space-y-4">
                  <h3 className="font-bold text-gray-800">Comments ({discussion.comments.length})</h3>
                  {discussion.comments.map(comment => (
                    <div key={comment.id} className="bg-white p-4 rounded border-l-4 border-primary">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">{comment.author}</p>
                          <p className="text-sm text-gray-600">{comment.date}</p>
                        </div>
                        <span className="text-red-500 text-sm">❤️ {comment.likes}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              {showReplyForm === discussion.id && (
                <div className="px-6 py-4 bg-white border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyTexts[discussion.id] || ''}
                      onChange={(e) =>
                        setReplyTexts({ ...replyTexts, [discussion.id]: e.target.value })
                      }
                      placeholder="Write a reply..."
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => handlePostReply(discussion.id, replyTexts[discussion.id])}
                      className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition flex items-center gap-2"
                    >
                      <Send size={18} />
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
