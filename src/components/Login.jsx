import { useState } from 'react'
import { PARTICIPANTS, GROUPS } from '../gameConfig'

export default function Login({ onLogin }) {
  const [selectedId, setSelectedId] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    const participant = PARTICIPANTS.find(p => p.id === selectedId)
    if (!participant) {
      setError('Please select your name from the list.')
      return
    }
    onLogin(participant)
  }

  return (
    <div className="page-container">
      <div className="card card-narrow flex-col gap-20">
        {/* Header */}
        <div className="flex-col gap-8">
          <span className="emoji-large">🦚</span>
          <h1 className="title-krishna">Jay Shri Krishna</h1>
          <p className="subtitle">🪈 Janmashtami Celebration Quiz 🪈</p>
          <div className="peacock-divider">✦ ✦ ✦</div>
        </div>

        {/* Participant selector */}
        <div className="flex-col gap-12">
          <label className="section-heading">Who are you?</label>
          <select
            className="input-field"
            value={selectedId}
            onChange={e => { setSelectedId(e.target.value); setError('') }}
          >
            <option value="">— Select your name —</option>
            {Object.entries(GROUPS).map(([gId, group]) => {
              const members = PARTICIPANTS.filter(p => p.groupId === gId)
              return (
                <optgroup key={gId} label={`${group.emoji} ${group.name} — ${group.subtitle}`}>
                  {members.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </optgroup>
              )
            })}
          </select>

          {selectedId && (() => {
            const p = PARTICIPANTS.find(x => x.id === selectedId)
            const g = GROUPS[p.groupId]
            return (
              <div style={{
                background: 'rgba(249,168,37,0.08)',
                border: '1px solid rgba(249,168,37,0.25)',
                borderRadius: '10px',
                padding: '12px 16px',
                fontSize: '0.9rem',
              }}>
                Welcome, <strong style={{ color: 'var(--gold)' }}>{p.name}</strong>!
                <br />
                <span className="text-muted">Your team: {g.emoji} <strong>{g.name}</strong> — {g.subtitle}</span>
              </div>
            )
          })()}

          {error && <p className="text-error text-sm">{error}</p>}

          <button className="btn-primary" onClick={handleLogin} disabled={!selectedId}>
            Enter the Game 🎯
          </button>
        </div>

        <p className="text-muted text-sm text-center">
          Jai Radhe Krishna 🌸<br />
          <span style={{ fontSize: '0.75rem' }}>
            All scores are private — only you and your team score are visible.
          </span>
        </p>
      </div>
    </div>
  )
}
