import { useState, useEffect } from 'react'
import './styles/theme.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { assignVideosToParticipants, PARTICIPANTS } from './gameConfig'
import { db, signInAnon } from './firebase'
import {
  doc, getDoc, setDoc, updateDoc, onSnapshot, increment
} from 'firebase/firestore'

// Pre-compute video assignments once at startup
const VIDEO_ASSIGNMENTS = assignVideosToParticipants()

// ── Firestore helpers ──────────────────────────────────────────────────────

async function loadParticipantData(participantId) {
  const ref = doc(db, 'participants', participantId)
  const snap = await getDoc(ref)
  if (snap.exists()) return snap.data()
  // First time — initialise the doc
  const initial = { myScore: 0, completedRounds: [], currentRound: 1 }
  await setDoc(ref, initial)
  return initial
}

async function submitAnswer(participantId, groupId, roundNum, answerData) {
  const participantRef = doc(db, 'participants', participantId)
  const groupRef = doc(db, 'groups', groupId)

  // Save answer details
  await setDoc(
    doc(db, 'answers', `${participantId}_R${roundNum}`),
    { participantId, groupId, roundNum, ...answerData, submittedAt: new Date() }
  )

  // Update participant score
  await updateDoc(participantRef, {
    myScore: increment(answerData.points),
    completedRounds: (await getDoc(participantRef)).data().completedRounds.concat(roundNum),
  })

  // Update group team score
  const groupSnap = await getDoc(groupRef)
  if (groupSnap.exists()) {
    await updateDoc(groupRef, { teamScore: increment(answerData.points) })
  } else {
    await setDoc(groupRef, { teamScore: answerData.points, groupId })
  }
}

// ── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [participant, setParticipant] = useState(null)
  const [gameState, setGameState] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sign in anonymously on mount + restore session
  useEffect(() => {
    signInAnon().then(async () => {
      const saved = localStorage.getItem('jk_current_user')
      if (saved) {
        const p = JSON.parse(saved)
        setParticipant(p)
        const data = await loadParticipantData(p.id)
        setGameState({ ...data, videoAssignment: VIDEO_ASSIGNMENTS[p.id] })
      }
      setLoading(false)
    })
  }, [])

  // Live-sync team score from Firestore whenever participant is set
  useEffect(() => {
    if (!participant) return
    const groupRef = doc(db, 'groups', participant.groupId)
    const unsub = onSnapshot(groupRef, (snap) => {
      if (snap.exists()) {
        setGameState(prev => prev ? { ...prev, teamScore: snap.data().teamScore } : prev)
      }
    })
    return () => unsub()
  }, [participant])

  const handleLogin = async (p) => {
    localStorage.setItem('jk_current_user', JSON.stringify(p))
    setParticipant(p)
    const data = await loadParticipantData(p.id)
    setGameState({ ...data, videoAssignment: VIDEO_ASSIGNMENTS[p.id] })
  }

  const handleAnswerSubmit = async (answerData) => {
    const round = gameState.currentRound
    await submitAnswer(participant.id, participant.groupId, round, answerData)
    // Update local state immediately; team score updates via onSnapshot
    setGameState(prev => ({
      ...prev,
      myScore: (prev.myScore || 0) + answerData.points,
      completedRounds: [...(prev.completedRounds || []), round],
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('jk_current_user')
    setParticipant(null)
    setGameState(null)
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="loader" />
        <p className="text-muted mt-16" style={{ textAlign: 'center' }}>
          🦚 Loading…
        </p>
      </div>
    )
  }

  if (!participant || !gameState) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Dashboard
      participant={participant}
      gameState={gameState}
      onAnswerSubmit={handleAnswerSubmit}
      onLogout={handleLogout}
    />
  )
}
