import React from 'react'
import { useTranslation } from 'react-i18next'
import { useUser } from '../context/UserContext'
import { Download, Share2, Mail, Award, CheckCircle, Calendar, Printer } from 'lucide-react'

// Utilitaire pour générer certificat SVG/PDF
const generateCertificateHTML = (userName, courseName, completionDate, points, percentage) => {
  const date = new Date(completionDate).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return `
    <html>
      <head>
        <style>
          @page {
            margin: 0;
            size: A4 landscape;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: 'Georgia', serif;
            background: white;
          }
          .certificate {
            width: 100%;
            height: 100vh;
            padding: 60px;
            box-sizing: border-box;
            background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%);
            border: 8px solid #2ecc71;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            text-align: center;
          }
          .certificate::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 2px solid #2ecc71;
            opacity: 0.3;
          }
          .content {
            position: relative;
            z-index: 1;
          }
          .header {
            font-size: 48px;
            font-weight: bold;
            color: #27ae60;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .subtitle {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 40px;
            font-style: italic;
          }
          .recipient {
            font-size: 32px;
            font-weight: bold;
            color: #34495e;
            margin: 30px 0;
            text-decoration: underline;
            text-decoration-style: dotted;
          }
          .course-name {
            font-size: 28px;
            color: #2ecc71;
            margin: 30px 0;
            font-weight: bold;
          }
          .details {
            font-size: 16px;
            color: #555;
            margin: 30px 0;
            line-height: 1.8;
          }
          .achievement {
            font-size: 18px;
            color: #27ae60;
            font-weight: bold;
            margin: 20px 0;
            background: rgba(46, 204, 113, 0.1);
            padding: 15px;
            border-radius: 5px;
          }
          .footer {
            font-size: 14px;
            color: #7f8c8d;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #bdc3c7;
          }
          .seal {
            font-size: 60px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="content">
            <div class="seal">🏆</div>
            <div class="header">Certificat de Réussite</div>
            <div class="subtitle">SafeFood NYC Academy - Sécurité Alimentaire</div>
            
            <div style="margin: 40px 0;">
              <div style="font-size: 18px; color: #555;">Ceci certifie que</div>
              <div class="recipient">${userName}</div>
              <div style="font-size: 18px; color: #555;">a complété avec succès le cours</div>
            </div>

            <div class="course-name">${courseName}</div>

            <div class="achievement">
              Score de ${percentage}% avec ${points} points ⭐
            </div>

            <div class="details">
              Démontrant une compétence en matière de bonnes pratiques de sécurité alimentaire<br>
              et de normes professionnelles pour les opérations de restaurants et hôtels
            </div>

            <div class="details">
              Complété le: <strong>${date}</strong>
            </div>

            <div class="footer">
              <div>SafeFood NYC Academy</div>
              <div>Certification Professionnelle en Sécurité Alimentaire</div>
              <div>ID Certificat: SFOOD-${Date.now()}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `
}

export default function Certificates() {
  const { t } = useTranslation()
  const { user, userProgress } = useUser()
  const [selectedCertificate, setSelectedCertificate] = React.useState(null)

  React.useEffect(() => {
    if (!user) {
      window.location.href = '/auth'
    }
  }, [user])

  if (!user) return null

  // Construire la liste des certificats basée sur les quizzes complétés
  const courses = [
    { id: 1, name: 'Hygiène Alimentaire Basique', icon: '🧼', lessons: [1, 2, 3, 4, 5], status: 'completed' },
    { id: 2, name: 'Sanitation Avancée', icon: '🏥', lessons: [1, 2, 3, 4, 5], status: 'completed' },
    { id: 3, name: 'Gestion des Allergènes', icon: '⚠️', lessons: [1, 2, 3, 4], status: 'in-progress' },
    { id: 4, name: 'Food Protection NYC DOH', icon: '🛡️', lessons: [1, 2], status: 'in-progress' },
  ]

  const certificates = courses
    .map(course => {
      const lessonsCompleted = course.lessons.filter(lessonId => {
        const quizKey = `${course.id}-${lessonId}`
        return userProgress.quizScores?.[quizKey]
      })

      if (lessonsCompleted.length === 0 && course.status !== 'completed') return null

      const scores = lessonsCompleted.length > 0 
        ? lessonsCompleted.map(id => userProgress.quizScores?.[`${course.id}-${id}`]?.percentage || 85)
        : [85]
      const avgPercentage = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      const totalPoints = lessonsCompleted.length * 100

      return {
        courseId: course.id,
        courseName: course.name,
        icon: course.icon,
        completionDate: userProgress.quizScores?.[`${course.id}-${lessonsCompleted[lessonsCompleted.length - 1]}`]?.completedAt || new Date().toISOString(),
        averagePercentage: avgPercentage,
        points: totalPoints,
        lessonsCount: lessonsCompleted.length || course.lessons.length,
        status: course.status,
        progress: lessonsCompleted.length > 0 ? Math.round((lessonsCompleted.length / course.lessons.length) * 100) : 0
      }
    })
    .filter(Boolean)

  const completedCertificates = certificates.filter(c => c.status === 'completed')
  const inProgressCertificates = certificates.filter(c => c.status === 'in-progress')

  const downloadCertificate = (cert) => {
    const html = generateCertificateHTML(
      user.fullName,
      cert.courseName,
      cert.completionDate,
      cert.points,
      cert.averagePercentage
    )

    // Utiliser print pour générer PDF
    const printWindow = window.open('', '', 'width=1200,height=800')
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.print()
  }

  const shareCertificate = (cert) => {
    const text = `J'ai complété "${cert.courseName}" sur SafeFood NYC Academy avec ${cert.averagePercentage}%! 🏆 Certification professionnelle en sécurité alimentaire pour restaurants et hôtels.`
    
    if (navigator.share) {
      navigator.share({
        title: 'SafeFood NYC Academy Certificat',
        text: text,
        url: 'https://sowk78824-eng.github.io/safefood-nyc-academy'
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('Certificat partageable copié!')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Award className="text-yellow-500 animate-bounce" size={48} />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">🏆 Vos Certificats</h1>
          <p className="text-xl text-gray-600">
            Certifications professionnelles pour votre formation en sécurité alimentaire
          </p>
        </div>

        {/* Completed Certificates */}
        {completedCertificates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
              <CheckCircle className="text-green-600" size={32} />
              Certificats Obtenus ({completedCertificates.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedCertificates.map((cert, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition border-t-4 border-green-500">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold">{cert.courseName}</h3>
                        <p className="text-green-100 mt-1 flex items-center gap-1">
                          <Calendar size={16} />
                          {new Date(cert.completionDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className="text-4xl">{cert.icon}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Score Display */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <p className="text-gray-600 text-xs font-semibold mb-2">SCORE MOYEN</p>
                        <p className="text-3xl font-bold text-green-600">{cert.averagePercentage}%</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-gray-600 text-xs font-semibold mb-2">POINTS</p>
                        <p className="text-3xl font-bold text-primary">{cert.points}</p>
                      </div>
                    </div>

                    {/* Certificate Badge */}
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg text-center border-2 border-yellow-300">
                      <p className="text-6xl mb-3">✨</p>
                      <p className="font-bold text-yellow-800">Certificat Obtenu</p>
                      <p className="text-sm text-yellow-700 mt-1">{cert.lessonsCount} leçons complétées</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2 pt-4">
                      <button
                        onClick={() => setSelectedCertificate(cert)}
                        className="flex items-center justify-center gap-1 bg-gray-100 text-gray-700 py-3 rounded font-semibold hover:bg-gray-200 transition text-sm"
                        title="Prévisualiser"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => downloadCertificate(cert)}
                        className="flex items-center justify-center gap-1 bg-primary text-white py-3 rounded font-semibold hover:bg-secondary transition text-sm"
                        title="Télécharger PDF"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => shareCertificate(cert)}
                        className="flex items-center justify-center gap-1 bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600 transition text-sm"
                        title="Partager"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In Progress Certificates */}
        {inProgressCertificates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
              📚 En Cours ({inProgressCertificates.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inProgressCertificates.map((cert, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border-t-4 border-yellow-500">
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 text-white">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-2xl font-bold">{cert.courseName}</h3>
                        <p className="text-yellow-100 mt-1">En cours de completion...</p>
                      </div>
                      <span className="text-4xl">{cert.icon}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-700 font-semibold">{cert.lessonsCount}/{cert.lessonsCount} leçons</p>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                          {cert.progress}%
                        </span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${cert.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-gray-600 text-xs font-semibold mb-2">LEÇONS RESTANTES</p>
                        <p className="text-2xl font-bold text-blue-600">{cert.lessonsCount - cert.lessonsCount}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-gray-600 text-xs font-semibold mb-2">POINTS GAGNÉS</p>
                        <p className="text-2xl font-bold text-gray-600">{cert.points}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href="/academy"
                      className="block text-center bg-primary text-white py-3 rounded font-semibold hover:bg-secondary transition"
                    >
                      Continuer le Cours →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Certificates */}
        {completedCertificates.length === 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-12 text-center border-l-4 border-primary">
            <p className="text-6xl mb-4">🎓</p>
            <p className="text-gray-700 text-xl mb-4 font-semibold">
              Pas encore de certificat. Commencez un cours pour gagner votre certificat!
            </p>
            <a href="/academy" className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary transition">
              Aller à l'Académie →
            </a>
          </div>
        )}

        {/* Certificate Preview Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full my-8">
              <div className="p-6 flex justify-between items-center border-b border-gray-200 bg-gray-50">
                <h2 className="text-2xl font-bold text-primary">Aperçu du Certificat</h2>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-gray-600 hover:text-gray-800 text-3xl font-bold"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-8 bg-white overflow-x-auto">
                <iframe
                  srcDoc={generateCertificateHTML(
                    user.fullName,
                    selectedCertificate.courseName,
                    selectedCertificate.completionDate,
                    selectedCertificate.points,
                    selectedCertificate.averagePercentage
                  )}
                  style={{ width: '100%', height: '500px', border: 'none' }}
                  title="Certificate Preview"
                />
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
                <button
                  onClick={() => downloadCertificate(selectedCertificate)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded font-semibold hover:bg-secondary transition"
                >
                  <Download size={18} />
                  Télécharger en PDF
                </button>
                <button
                  onClick={() => shareCertificate(selectedCertificate)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded font-semibold hover:bg-blue-600 transition"
                >
                  <Share2 size={18} />
                  Partager
                </button>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded font-semibold hover:bg-gray-400 transition"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
