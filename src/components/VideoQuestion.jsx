import { useState, useRef } from 'react'
import { ROUND1_VIDEOS } from '../gameConfig'

const LETTERS = ['A', 'B', 'C', 'D']

export default function VideoQuestion({ videoAssignmentId, onSubmit, alreadyAnswered }) {
  const video = ROUND1_VIDEOS.find(v => v.id === videoAssignmentId)
  const [phase, setPhase] = useState('video') // 'video' | 'question' | 'submitted'
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  if (!video) return (
    <div className="card card-wide text-center">
      <p className="text-muted">No video assigned for this round. Please contact the organiser.</p>
    </div>
  )

  if (alreadyAnswered) {
    return (
      <div className="card card-wide flex-col gap-16 text-center">
        <span style={{ fontSize: '2rem' }}>✅</span>
        <h3 className="section-heading">Round 1 Complete!</h3>
        <p className="text-muted">You've already submitted your answer for this round.<br />Wait for the organiser to open the next round.</p>
      </div>
    )
  }

  const handleSubmit = () => {
    if (selected === null) return
    setRevealed(true)
    const isCorrect = selected === video.correctOption
    setTimeout(() => {
      onSubmit({
        videoId: video.id,
        selectedOption: selected,
        isCorrect,
        points: isCorrect ? video.points : 0,
      })
      setPhase('submitted')
    }, 2000)
  }

  // ── Video phase ──────────────────────────────────────────────────────────
  if (phase === 'video') {
    return (
      <div className="card card-wide flex-col gap-20">
        <div>
          <div className="peacock-divider">🪈 Round 1 — Watch & Answer 🪈</div>
          <h2 className="section-heading mt-8" style={{ textAlign: 'center' }}>{video.title}</h2>
          <p className="text-muted text-sm text-center mt-4">
            Watch the video carefully. Your question will appear after you click "I'm ready!".
          </p>
        </div>

        {/* YouTube embed */}
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          height: 0,
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(249,168,37,0.3)',
        }}>
          <iframe
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={`https://www.youtube.com/embed/${video.videoId}?rel=0${video.startAt ? `&start=${video.startAt}` : ''}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <button className="btn-primary" onClick={() => setPhase('question')}>
          I'm ready — show me the question! 🎯
        </button>
      </div>
    )
  }

  // ── Question phase ───────────────────────────────────────────────────────
  return (
    <div className="card card-wide flex-col gap-20">
      <div>
        <div className="peacock-divider">🪈 Round 1 — Question 🪈</div>
        <p className="text-sm text-muted text-center mt-4">Video: {video.title}</p>
      </div>

      <div style={{
        background: 'rgba(249,168,37,0.08)',
        border: '1px solid rgba(249,168,37,0.25)',
        borderRadius: '12px',
        padding: '16px 20px',
      }}>
        <p style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.5 }}>
          {video.question}
        </p>
      </div>

      <div className="flex-col gap-10" style={{ gap: '10px' }}>
        {video.options.map((opt, idx) => {
          let extraClass = ''
          if (revealed) {
            if (idx === video.correctOption) extraClass = 'correct'
            else if (idx === selected) extraClass = 'incorrect'
          } else if (idx === selected) {
            extraClass = 'selected'
          }

          return (
            <button
              key={idx}
              className={`option-btn ${extraClass}`}
              onClick={() => !revealed && setSelected(idx)}
              disabled={revealed}
            >
              <span className="option-letter">{LETTERS[idx]}</span>
              {opt}
              {revealed && idx === video.correctOption && <span style={{ marginLeft: 'auto' }}>✅</span>}
              {revealed && idx === selected && idx !== video.correctOption && <span style={{ marginLeft: 'auto' }}>❌</span>}
            </button>
          )
        })}
      </div>

      {phase === 'question' && !revealed && (
        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={selected === null}
        >
          {selected === null ? 'Select an answer first' : 'Submit Answer 🎯'}
        </button>
      )}

      {revealed && (
        <div className="text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
          {selected === video.correctOption
            ? <p style={{ color: 'var(--success)', fontWeight: 700, fontSize: '1.1rem' }}>🎉 Correct! +{video.points} points</p>
            : <p style={{ color: 'var(--error)', fontWeight: 700 }}>❌ Not quite — better luck next round!</p>
          }
          <p className="text-muted text-sm mt-8">Saving your answer…</p>
        </div>
      )}
    </div>
  )
}
