import { useState } from 'react'
import { GROUPS, TOTAL_ROUNDS } from '../gameConfig'
import VideoQuestion from './VideoQuestion'
import ScoreBoard from './ScoreBoard'

export default function Dashboard({ participant, gameState, onAnswerSubmit, onLogout }) {
  const [tab, setTab] = useState('play') // 'play' | 'score'
  const group = GROUPS[participant.groupId]

  const { currentRound, myScore, teamScore, completedRounds, videoAssignment } = gameState

  const hasAnsweredCurrentRound = completedRounds.includes(currentRound)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="header-bar">
        <span className="logo">🦚 JK Quiz</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="score-badge">{participant.name.split(' ')[0]} ⭐ {myScore ?? 0}</span>
          <span className="score-badge team">{group?.emoji} {teamScore ?? 0}</span>
        </div>

        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Round progress */}
      <div style={{
        background: 'rgba(13,13,43,0.8)',
        borderBottom: '1px solid rgba(249,168,37,0.1)',
        padding: '12px 20px',
      }}>
        <div className="round-progress">
          {Array.from({ length: TOTAL_ROUNDS }, (_, i) => i + 1).map(r => (
            <div
              key={r}
              className={`round-dot ${r === currentRound ? 'active' : completedRounds.includes(r) ? 'completed' : ''}`}
            >
              {completedRounds.includes(r) ? '✓' : r}
            </div>
          ))}
        </div>
        <p className="text-muted text-sm text-center mt-8">
          Round {currentRound} of {TOTAL_ROUNDS}
        </p>
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(249,168,37,0.15)',
        background: 'rgba(13,13,43,0.6)',
      }}>
        {[
          { id: 'play', label: '🎮 Play' },
          { id: 'score', label: '📊 Scores' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: '12px',
              background: 'none',
              border: 'none',
              borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent',
              color: tab === t.id ? 'var(--gold)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'all 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}>
        {tab === 'play' && (
          <>
            {currentRound === 1 ? (
              <VideoQuestion
                videoAssignmentId={videoAssignment}
                onSubmit={onAnswerSubmit}
                alreadyAnswered={hasAnsweredCurrentRound}
              />
            ) : (
              <div className="card card-wide text-center flex-col gap-16">
                <span style={{ fontSize: '2.5rem' }}>🪈</span>
                <h3 className="section-heading">Round {currentRound} Coming Soon</h3>
                <p className="text-muted">
                  The organiser will unlock Round {currentRound} shortly.<br />
                  Check your score while you wait!
                </p>
                <button className="btn-secondary" onClick={() => setTab('score')}>
                  View Scores →
                </button>
              </div>
            )}
          </>
        )}

        {tab === 'score' && (
          <ScoreBoard
            participant={participant}
            myScore={myScore}
            teamScore={teamScore}
            teamName={group?.name}
            groupId={participant.groupId}
          />
        )}
      </div>
    </div>
  )
}
