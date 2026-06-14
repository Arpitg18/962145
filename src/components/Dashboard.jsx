import { useState, useEffect } from 'react'
import { GROUPS, SECTIONS, DAYS_PER_SECTION, PARTICIPANTS } from '../gameConfig'
import VideoQuestion from './VideoQuestion'
import ScoreBoard from './ScoreBoard'
import ScoreCard from './ScoreCard'

export default function Dashboard({
  participant, gameState, myScore, teamScore, daysAnswered,
  currentVideo, currentQuestion, hasAnsweredToday,
  announcement, onAnswerSubmit, onLogout
}) {
  const [tab, setTab]                     = useState('play')
  const [announcementDismissed, setDismissed] = useState(false)
  const [scoreView, setScoreView]         = useState('board') // 'board' | 'card'
  const group = GROUPS[participant.groupId]

  const section     = gameState ? SECTIONS[gameState.currentSection - 1] : null
  const absoluteDay = gameState ? (gameState.currentSection - 1) * DAYS_PER_SECTION + gameState.currentDay : 1
  const deadlinePassed = gameState?.deadline ? new Date() > new Date(gameState.deadline) : false

  // Reset dismissal when a new announcement comes in
  useEffect(() => { setDismissed(false) }, [announcement?.message])

  // Celebration / leaderboard reveal mode
  if (gameState?.celebrationMode) {
    return <CelebrationScreen gameState={gameState} participant={participant} teamScore={teamScore} myScore={myScore} onDismiss={() => {}} />
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Announcement banner */}
      {announcement?.active && announcement?.message && !announcementDismissed && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(230,81,0,0.9), rgba(249,168,37,0.9))',
          padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '10px',
          zIndex: 200,
        }}>
          <span style={{ fontSize: '1.1rem' }}>📢</span>
          <p style={{ flex: 1, fontSize: '0.88rem', fontWeight: 600, color: '#1a237e', lineHeight: 1.4 }}>
            {announcement.message}
          </p>
          <button onClick={() => setDismissed(true)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#1a237e', fontSize: '1rem', fontWeight: 700, flexShrink: 0,
          }}>✕</button>
        </div>
      )}

      {/* Header */}
      <div className="header-bar">
        <span className="logo" style={{ fontSize: '0.85rem' }}>🦚 Janmashtami 2026</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="score-badge">{participant.name.split(' ')[0]} ⭐ {myScore}</span>
          <span className="score-badge team">{group?.emoji} {teamScore}</span>
        </div>
        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Section + Day bar */}
      {gameState && (
        <div style={{
          background: 'rgba(13,13,43,0.8)', borderBottom: '1px solid rgba(249,168,37,0.1)',
          padding: '10px 20px', textAlign: 'center',
        }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)' }}>
            {section?.emoji} {section?.name} · Day {gameState.currentDay} of {DAYS_PER_SECTION}
          </p>
          <p className="text-muted" style={{ fontSize: '0.72rem', marginTop: '2px' }}>
            Overall Day {absoluteDay} of 81
          </p>
          {gameState.deadline && !deadlinePassed && <DeadlineCountdown deadline={gameState.deadline} />}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(249,168,37,0.15)', background: 'rgba(13,13,43,0.6)' }}>
        {[
          { id: 'play',  label: '🎮 Play'   },
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

        {/* ── PLAY TAB ── */}
        {tab === 'play' && (
          <>
            {/* Rest day — no activity scheduled */}
            {gameState?.restDay && !hasAnsweredToday && (
              <div className="card card-wide text-center flex-col gap-16">
                <span style={{ fontSize: '2.5rem' }}>🌸</span>
                <h3 className="section-heading">No activity today</h3>
                <p className="text-muted">
                  The hosts have given everyone a day of rest. 🪈<br />
                  Enjoy the break and come back tomorrow!
                </p>
                <button className="btn-secondary" onClick={() => setTab('score')}>View Scores →</button>
              </div>
            )}

            {/* Locked — activity coming but not yet live */}
            {!gameState?.restDay && !gameState?.isLive && !hasAnsweredToday && (
              <div className="card card-wide text-center flex-col gap-16">
                <span style={{ fontSize: '2.5rem' }}>🔒</span>
                <h3 className="section-heading">
                  {section?.type === 'video' ? "Today's video is not live yet" : "Today's activity is not live yet"}
                </h3>
                <p className="text-muted">
                  The hosts will open {section?.emoji} {section?.name} — Day {gameState?.currentDay} shortly.<br />
                  Check your scores while you wait!
                </p>
                <button className="btn-secondary" onClick={() => setTab('score')}>View Scores →</button>
              </div>
            )}

            {/* Deadline passed without answering */}
            {!gameState?.restDay && deadlinePassed && !hasAnsweredToday && (
              <div className="card card-wide text-center flex-col gap-16">
                <span style={{ fontSize: '2.5rem' }}>⏰</span>
                <h3 className="section-heading">Time's up!</h3>
                <p className="text-muted">The deadline for Day {gameState?.currentDay} has passed.<br />Better luck tomorrow!</p>
              </div>
            )}

            {/* Section 1 — Video question */}
            {!gameState?.restDay && gameState?.isLive && !deadlinePassed && gameState?.currentSection === 1 && (
              <VideoQuestion
                video={currentVideo}
                question={currentQuestion}
                onSubmit={onAnswerSubmit}
                alreadyAnswered={hasAnsweredToday}
              />
            )}

            {/* Other sections — coming soon */}
            {!gameState?.restDay && gameState?.isLive && !deadlinePassed && gameState?.currentSection > 1 && (
              <div className="card card-wide text-center flex-col gap-16">
                <span style={{ fontSize: '2.5rem' }}>{section?.emoji}</span>
                <h3 className="section-heading">{section?.name}</h3>
                <p className="text-muted">This section's activity will be added soon!</p>
              </div>
            )}
          </>
        )}

        {/* ── SCORES TAB ── */}
        {tab === 'score' && (
          <>
            {/* Sub-tab toggle */}
            <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '440px' }}>
              {[
                { id: 'board', label: '📊 Scoreboard' },
                { id: 'card',  label: '📤 Share Card'  },
              ].map(v => (
                <button key={v.id} onClick={() => setScoreView(v.id)} style={{
                  flex: 1, padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.82rem',
                  background: scoreView === v.id ? 'var(--gold)' : 'rgba(255,255,255,0.07)',
                  color: scoreView === v.id ? '#1a237e' : 'var(--text-muted)',
                }}>{v.label}</button>
              ))}
            </div>

            {scoreView === 'board' && (
              <ScoreBoard participant={participant} myScore={myScore} teamScore={teamScore} groupId={participant.groupId} />
            )}
            {scoreView === 'card' && (
              <ScoreCard
                participant={participant}
                myScore={myScore}
                teamScore={teamScore}
                daysAnswered={daysAnswered || 0}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ── Celebration / Leaderboard Reveal ─────────────────────────────────────────
function CelebrationScreen({ gameState, participant, teamScore, myScore }) {
  const section = gameState ? SECTIONS[gameState.currentSection - 1] : null
  const group   = GROUPS[participant.groupId]

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '24px',
      background: 'radial-gradient(ellipse at center, rgba(249,168,37,0.15) 0%, transparent 70%)',
      animation: 'fadeInUp 0.6s ease',
    }}>
      <div className="flex-col gap-20" style={{ width: '100%', maxWidth: '440px', alignItems: 'center' }}>
        <div className="text-center">
          <span style={{ fontSize: '3.5rem', display: 'block', animation: 'float 2s ease-in-out infinite' }}>🎉</span>
          <h1 className="title-krishna" style={{ marginTop: '12px' }}>
            {section ? `Section ${gameState.currentSection} Complete!` : 'Celebration!'}
          </h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>
            {section?.emoji} {section?.name}
          </p>
        </div>

        {/* Your scores */}
        <div className="card card-wide" style={{ width: '100%' }}>
          <p className="section-heading text-center" style={{ marginBottom: '16px' }}>Your Result</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ textAlign: 'center', padding: '16px', borderRadius: '12px', background: 'rgba(249,168,37,0.1)', border: '1px solid rgba(249,168,37,0.3)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold)' }}>{myScore}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⭐ My Score</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', borderRadius: '12px', background: 'rgba(2,136,209,0.1)', border: '1px solid rgba(2,136,209,0.3)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#81d4fa' }}>{teamScore}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{group?.emoji} Team Score</div>
            </div>
          </div>
        </div>

        <p className="text-muted text-sm text-center">
          🪈 The hosts will open the next section shortly.<br />Stay tuned!
        </p>
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
