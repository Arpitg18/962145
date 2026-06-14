import { useState } from 'react'

const LETTERS = ['A', 'B', 'C', 'D']

// Props: video (object), question (object with q/options/correct), onSubmit, alreadyAnswered
export default function VideoQuestion({ video, question, onSubmit, alreadyAnswered }) {
  const [phase, setPhase] = useState('video') // 'video' | 'question'
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  if (!video) return (
    <div className="card card-wide text-center">
      <p className="text-muted">No video assigned for today. Please contact the organiser.</p>
    </div>
  )

  if (alreadyAnswered) {
    return (
      <div className="card card-wide flex-col gap-16 text-center">
        <span style={{ fontSize: '2rem' }}>✅</span>
        <h3 className="section-heading">Today's question answered!</h3>
        <p className="text-muted">Come back tomorrow for the next one.<br />Check the Scores tab to see how your team is doing!</p>
      </div>
    )
  }

  const handleSubmit = () => {
    if (selected === null || !question) return
    setRevealed(true)
    const isCorrect = selected === question.correct
    setTimeout(() => {
      onSubmit({ videoId: video.id, selectedOption: selected, isCorrect, points: isCorrect ? video.points : 0 })
    }, 2000)
  }

  // ── Video phase ──────────────────────────────────────────────────────────
  if (phase === 'video') {
    return (
      <div className="card card-wide flex-col gap-20">
        <div>
          <div className="peacock-divider">🪈 Watch & Answer 🪈</div>
          <h2 className="section-heading mt-8" style={{ textAlign: 'center' }}>{video.title}</h2>
          <p className="text-muted text-sm text-center mt-4">
            Watch the video carefully. Your question appears after you click "I'm ready!".
          </p>
          {video.difficulty && (
            <p className="text-center mt-4" style={{ fontSize: '0.8rem' }}>
              Difficulty: {video.difficulty === 'E' ? '🟢 Easy' : video.difficulty === 'M' ? '🟡 Medium' : '🔴 Difficult'}
            </p>
          )}
        </div>

        <div style={{
          position: 'relative', paddingBottom: '56.25%', height: 0,
          borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(249,168,37,0.3)',
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
      <div className="peacock-divider">🪈 Answer the Question 🪈</div>

      <div style={{
        background: 'rgba(249,168,37,0.08)', border: '1px solid rgba(249,168,37,0.25)',
        borderRadius: '12px', padding: '16px 20px',
      }}>
        <p style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.5 }}>{question?.q}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {(question?.options || []).map((opt, idx) => {
          let extraClass = ''
          if (revealed) {
            if (idx === question.correct) extraClass = 'correct'
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
              {revealed && idx === question.correct && <span style={{ marginLeft: 'auto' }}>✅</span>}
              {revealed && idx === selected && idx !== question.correct && <span style={{ marginLeft: 'auto' }}>❌</span>}
            </button>
          )
        })}
      </div>

      {!revealed && (
        <button className="btn-primary" onClick={handleSubmit} disabled={selected === null}>
          {selected === null ? 'Select an answer first' : 'Submit Answer 🎯'}
        </button>
      )}

      {revealed && question && (
        <div className="text-center" style={{ animation: 'fadeInUp 0.4s ease' }}>
          {selected === question.correct
            ? <p style={{ color: 'var(--success)', fontWeight: 700, fontSize: '1.1rem' }}>🎉 Correct! +{video.points} points</p>
            : <p style={{ color: 'var(--error)', fontWeight: 700 }}>❌ Not quite — better luck tomorrow!</p>
          }
          <p className="text-muted text-sm mt-8">Saving your answer…</p>
        </div>
      )}
    </div>
  )
}
