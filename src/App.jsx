import { useState, useEffect } from 'react'
import './styles/theme.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import { getAssignmentForDay, ROUND1_VIDEOS, PARTICIPANTS, ADMIN_PASSWORD } from './gameConfig'
import { db, signInAnon } from './firebase'
import {
  doc, getDoc, setDoc, updateDoc, onSnapshot, increment
} from 'firebase/firestore'

// ── Firestore helpers ──────────────────────────────────────────────────────

// Resolve the final assignment for a participant on a day, honouring any overrides.
// Priority: assignmentOverride > default algorithm
//           questionOverride > default question in video
async function resolveAssignment(participantId, section, day) {
  const base = getAssignmentForDay(participantId, day)
  if (!base) return null

  // Check assignment override (admin switched this person's video for this day)
  const assignKey = `${participantId}_S${section}D${day}`
  const assignSnap = await getDoc(doc(db, 'assignmentOverrides', assignKey))
  let video = base.video
  let questionIndex = base.questionIndex
  if (assignSnap.exists()) {
    const ov = assignSnap.data()
    video = ROUND1_VIDEOS.find(v => v.id === ov.videoId) ?? video
    questionIndex = ov.questionIndex ?? questionIndex
  }

  // Check question override (admin edited the question/answer for this video+qIdx)
  const qKey = `${video.id}_${questionIndex}`
  const qSnap = await getDoc(doc(db, 'questionOverrides', qKey))
  const question = qSnap.exists() ? qSnap.data() : (video.questions?.[questionIndex] ?? null)

  return { video, questionIndex, question }
}

async function loadParticipantData(participantId) {
  const ref = doc(db, 'participants', participantId)
  const snap = await getDoc(ref)
  if (snap.exists()) return snap.data()
  const initial = { myScore: 0, answeredDays: [] }
  await setDoc(ref, initial)
  return initial
}

async function submitAnswer(participantId, groupId, section, day, answerData) {
  const key = `S${section}D${day}`

  await setDoc(doc(db, 'answers', `${participantId}_${key}`), {
    participantId, groupId, section, day, key, ...answerData, submittedAt: new Date().toISOString()
  })

  const participantRef = doc(db, 'participants', participantId)
  const snap = await getDoc(participantRef)
  const current = snap.exists() ? snap.data() : { myScore: 0, answeredDays: [] }
  const answeredDays = current.answeredDays || []

  await updateDoc(participantRef, {
    myScore: increment(answerData.points),
    answeredDays: [...answeredDays, key],
  })

  const groupRef = doc(db, 'groups', groupId)
  const gSnap = await getDoc(groupRef)
  if (gSnap.exists()) {
    await updateDoc(groupRef, { teamScore: increment(answerData.points) })
  } else {
    await setDoc(groupRef, { teamScore: answerData.points, groupId })
  }
}

// ── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [mode, setMode] = useState('loading') // 'loading' | 'login' | 'game' | 'admin' | 'adminLogin'
  const [participant, setParticipant] = useState(null)
  const [participantData, setParticipantData] = useState(null)
  const [gameState, setGameState] = useState(null)   // from Firestore config/gameState
  const [teamScore, setTeamScore] = useState(0)
  const [adminPass, setAdminPass] = useState('')
  const [adminError, setAdminError] = useState('')
  const [resolvedAssignment, setResolvedAssignment] = useState(null)
  const [announcement, setAnnouncement] = useState(null)

  // Check if URL has #admin
  const isAdminRoute = window.location.hash === '#admin'

  // Sign in anonymously + restore session
  useEffect(() => {
    const timeout = setTimeout(() => setMode(isAdminRoute ? 'adminLogin' : 'login'), 6000)

    signInAnon()
      .then(async () => {
        clearTimeout(timeout)
        if (isAdminRoute) {
          setMode('adminLogin')
          return
        }
        const saved = localStorage.getItem('jk_current_user')
        if (saved) {
          const p = JSON.parse(saved)
          setParticipant(p)
          const data = await loadParticipantData(p.id)
          setParticipantData(data)
          setMode('game')
        } else {
          setMode('login')
        }
      })
      .catch(() => { clearTimeout(timeout); setMode(isAdminRoute ? 'adminLogin' : 'login') })
  }, [])

  // Listen to global game state (section, day, isLive, deadline)
  useEffect(() => {
    const ref = doc(db, 'config', 'gameState')
    const unsub = onSnapshot(ref, snap => {
      setGameState(snap.exists() ? snap.data() : { currentSection: 1, currentDay: 1, isLive: false, deadline: null })
    })
    return () => unsub()
  }, [])

  // Listen to team score
  useEffect(() => {
    if (!participant) return
    const ref = doc(db, 'groups', participant.groupId)
    const unsub = onSnapshot(ref, snap => {
      if (snap.exists()) setTeamScore(snap.data().teamScore || 0)
    })
    return () => unsub()
  }, [participant])

  // Listen to announcement
  useEffect(() => {
    const ref = doc(db, 'config', 'announcement')
    const unsub = onSnapshot(ref, snap => {
      setAnnouncement(snap.exists() ? snap.data() : null)
    })
    return () => unsub()
  }, [])

  // Resolve video + question for today (with Firestore overrides)
  useEffect(() => {
    if (!gameState || gameState.currentSection !== 1 || !participant) return
    resolveAssignment(participant.id, gameState.currentSection, gameState.currentDay)
      .then(setResolvedAssignment)
  }, [gameState?.currentSection, gameState?.currentDay, participant?.id])

  const handleLogin = async (p) => {
    localStorage.setItem('jk_current_user', JSON.stringify(p))
    setParticipant(p)
    const data = await loadParticipantData(p.id)
    setParticipantData(data)
    setMode('game')
  }

  const handleAnswerSubmit = async (answerData) => {
    if (!gameState) return
    const { currentSection, currentDay } = gameState
    await submitAnswer(participant.id, participant.groupId, currentSection, currentDay, answerData)
    const key = `S${currentSection}D${currentDay}`
    setParticipantData(prev => ({
      ...prev,
      myScore: (prev.myScore || 0) + answerData.points,
      answeredDays: [...(prev.answeredDays || []), key],
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('jk_current_user')
    setParticipant(null)
    setParticipantData(null)
    setMode('login')
  }

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) {
      setMode('admin')
      setAdminError('')
    } else {
      setAdminError('Incorrect password. Try again.')
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────

  if (mode === 'loading') {
    return (
      <div className="page-container">
        <div className="loader" />
        <p className="text-muted mt-16 text-center">🦚 Loading…</p>
      </div>
    )
  }

  if (mode === 'adminLogin') {
    return (
      <div className="page-container">
        <div className="card card-narrow flex-col gap-20">
          <div className="text-center">
            <span style={{ fontSize: '2.5rem' }}>🔐</span>
            <h2 className="title-krishna" style={{ fontSize: '1.6rem', marginTop: '8px' }}>Admin Panel</h2>
            <p className="text-muted text-sm">Janmashtami 2026</p>
          </div>
          <div className="flex-col gap-12">
            <input
              type="password"
              className="input-field"
              placeholder="Enter admin password"
              value={adminPass}
              onChange={e => setAdminPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
              autoFocus
            />
            {adminError && <p className="text-error text-sm">{adminError}</p>}
            <button className="btn-primary" onClick={handleAdminLogin}>Enter →</button>
          </div>
        </div>
      </div>
    )
  }

  if (mode === 'admin') {
    return <AdminPanel onLogout={() => { setMode('adminLogin'); setAdminPass('') }} />
  }

  if (mode === 'login' || !participant || !participantData) {
    return <Login onLogin={handleLogin} />
  }

  const currentVideo    = resolvedAssignment?.video    ?? null
  const currentQuestion = resolvedAssignment?.question ?? null

  const currentKey = gameState ? `S${gameState.currentSection}D${gameState.currentDay}` : null
  const hasAnsweredToday = currentKey ? (participantData.answeredDays || []).includes(currentKey) : false

  return (
    <Dashboard
      participant={participant}
      gameState={gameState}
      myScore={participantData.myScore || 0}
      teamScore={teamScore}
      daysAnswered={(participantData.answeredDays || []).length}
      currentVideo={currentVideo}
      currentQuestion={currentQuestion}
      hasAnsweredToday={hasAnsweredToday}
      announcement={announcement}
      onAnswerSubmit={handleAnswerSubmit}
      onLogout={handleLogout}
    />
  )
}
