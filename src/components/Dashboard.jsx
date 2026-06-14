import { useState, useEffect } from 'react'
import { GROUPS, SECTIONS, DAYS_PER_SECTION } from '../gameConfig'
import VideoQuestion from './VideoQuestion'
import ScoreBoard from './ScoreBoard'

export default function Dashboard({
  participant, gameState, myScore, teamScore,
  currentVideo, currentQuestion, hasAnsweredToday, onAnswerSubmit, onLogout
}) {
  const [tab, setTab] = useState('play')
  const group = GROUPS[participant.groupId]

  const section = gameState ? SECTIONS[gameState.currentSection - 1] : null
  const absoluteDay = gameState
    ? (gameState.currentSection - 1) * DAYS_PER_SECTION + gameState.currentDay
    : 1

  const deadlinePassed = gameState?.deadline
    ? new Date() > new Date(gameState.deadline)
    : false

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="header-bar">
        <span className="logo">🦚 JK 2026</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="score-badge">{participant.name.split(' ')[0]} ⭐ {myScore}</span>
          <span className="score-badge team">{group?.emoji} {teamScore}</span>
        </div>
        <span className="text-muted text-sm" style={{ fontSize: '0.75rem' }}>
          {participant.name.split(' ')[0]}
        </span>
      </div>

      {/* Section + Day bar */}
      {gameState && (
        <div style={{
          background: 'rgba(13,13,43,0.8)',
          borderBottom: '1px solid rgba(249,168,37,0.1)',
          padding: '10px 20px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)' }}>
            {section?.emoji} {section?.name} · Day {gameState.currentDay} of {DAYS_PER_SECTION}
          </p>
          <p className="text-muted" style={{ fontSize: '0.72rem', marginTop: '2px' }}>
            Overall Day {absoluteDay} of 81
          </p>
          {gameState.deadline && !deadlinePassed && (
            <DeadlineCountdown deadline={gameState.deadline} />
          )}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(249,168,37,0.15)', background: 'rgba(13,13,43,0.6)' }}>
        {[
          { id: 'play', label: '🎮 Play' },
          { id: 'score', label: '📊 Scores' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '12px', background: 'none', border: 'none',
            borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent',
            color: tab === t.id ? 'var(--gold)' : 'var(--text-muted)',
            cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.9rem',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

        {tab === 'play' && (
          <>
            {/* Not yet live */}
            {!gameState?.isLive && !hasAnsweredToday && (
              <div className="card card-wide text-center flex-col gap-16">
                <span style={{ fontSize: '2.5rem' }}>🔒</span>
                <h3 className="section-heading">Today's question is not live yet</h3>
                <p className="text-muted">
                  The hosts will unlock Day {gameState?.currentDay}'s question shortly.<br />
                  Check your scores while you wait!
                </p>
                <button className="btn-secondary" onClick={() => setTab('score')}>View Scores →</button>
              </div>
            )}

            {/* Deadline passed without answering */}
            {deadlinePassed && !hasAnsweredToday && (
              <div className="card card-wide text-center flex-col gap-16">
                <span style={{ fontSize: '2.5rem' }}>⏰</span>
                <h3 className="section-heading">Time's up!</h3>
                <p className="text-muted">The deadline for Day {gameState?.currentDay} has passed.</p>
              </div>
            )}

            {/* Section 1 — Video question (live and within deadline) */}
            {gameState?.isLive && !deadlinePassed && gameState?.currentSection === 1 && (
              <VideoQuestion
                video={currentVideo}
                question={currentQuestion}
                onSubmit={onAnswerSubmit}
                alreadyAnswered={hasAnsweredToday}
              />
            )}

            {/* Other sections — placeholder */}
            {gameState?.isLive && !deadlinePassed && gameState?.currentSection > 1 && (
              <div className="card card-wide text-center flex-col gap-16">
                <span style={{ fontSize: '2.5rem' }}>{section?.emoji}</span>
                <h3 className="section-heading">{section?.name}</h3>
                <p className="text-muted">This section's activity will be added soon!</p>
              </div>
            )}
          </>
        )}

        {tab === 'score' && (
          <ScoreBoard
            participant={participant}
            myScore={myScore}
            teamScore={teamScore}
            groupId={participant.groupId}
          />
        )}
      </div>
    </div>
  )
}

function DeadlineCountdown({ deadline }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    function update() {
      const diff = new Date(deadline) - new Date()
      if (diff <= 0) { setTimeLeft("Time's up!"); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${h}h ${m}m ${s}s remaining`)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [deadline])

  return (
    <p style={{ fontSize: '0.75rem', color: 'var(--saffron-light)', marginTop: '4px', fontWeight: 600 }}>
      ⏰ {timeLeft}
    </p>
  )
}
