import { useState, useEffect } from 'react'
import './styles/theme.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { assignVideosToParticipants, PARTICIPANTS } from './gameConfig'

// ── Storage helpers (localStorage until Firebase is wired up) ───────────────
const STORAGE_KEY = 'jk_game_state'

function loadLocalState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

function saveLocalState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function getInitialGameData(participantId) {
  const all = loadLocalState() || {}
  return all[participantId] || {
    myScore: 0,
    teamScore: 0,
    completedRounds: [],
    currentRound: 1,
  }
}

function saveAnswerLocally(participantId, groupId, roundNum, answerData) {
  const all = loadLocalState() || {}

  // Update this participant's score
  if (!all[participantId]) {
    all[participantId] = { myScore: 0, teamScore: 0, completedRounds: [], currentRound: 1 }
  }
  all[participantId].myScore = (all[participantId].myScore || 0) + answerData.points
  if (!all[participantId].completedRounds.includes(roundNum)) {
    all[participantId].completedRounds.push(roundNum)
  }

  // Recompute team score from all members of this group
  const groupMembers = PARTICIPANTS.filter(p => p.groupId === groupId)
  let teamTotal = 0
  groupMembers.forEach(m => {
    teamTotal += all[m.id]?.myScore || 0
  })
  // Write team score back to all members
  groupMembers.forEach(m => {
    if (all[m.id]) all[m.id].teamScore = teamTotal
  })
  all[participantId].teamScore = teamTotal

  saveLocalState(all)
  return all[participantId]
}

// Pre-compute video assignments once
const VIDEO_ASSIGNMENTS = assignVideosToParticipants()

export default function App() {
  const [participant, setParticipant] = useState(null)
  const [gameState, setGameState] = useState(null)

  // Restore session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jk_current_user')
    if (saved) {
      const p = JSON.parse(saved)
      setParticipant(p)
      const data = getInitialGameData(p.id)
      setGameState({
        ...data,
        videoAssignment: VIDEO_ASSIGNMENTS[p.id],
      })
    }
  }, [])

  const handleLogin = (p) => {
    localStorage.setItem('jk_current_user', JSON.stringify(p))
    setParticipant(p)
    const data = getInitialGameData(p.id)
    setGameState({
      ...data,
      videoAssignment: VIDEO_ASSIGNMENTS[p.id],
    })
  }

  const handleAnswerSubmit = (answerData) => {
    const updated = saveAnswerLocally(
      participant.id,
      participant.groupId,
      gameState.currentRound,
      answerData
    )
    setGameState(prev => ({
      ...prev,
      myScore: updated.myScore,
      teamScore: updated.teamScore,
      completedRounds: updated.completedRounds,
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem('jk_current_user')
    setParticipant(null)
    setGameState(null)
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
