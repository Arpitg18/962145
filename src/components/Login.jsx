import { useState, useRef, useEffect } from 'react'
import { PARTICIPANTS, GROUPS } from '../gameConfig'

export default function Login({ onLogin }) {
  const [selectedId, setSelectedId] = useState('')
  const [open, setOpen]             = useState(false)
  const [error, setError]           = useState('')
  const dropdownRef                 = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogin = () => {
    const participant = PARTICIPANTS.find(p => p.id === selectedId)
    if (!participant) { setError('Please select your name from the list.'); return }
    onLogin(participant)
  }

  const selected = PARTICIPANTS.find(p => p.id === selectedId)
  const selectedGroup = selected ? GROUPS[selected.groupId] : null

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

          {/* Custom dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            {/* Trigger button */}
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${open ? 'var(--gold)' : 'rgba(249,168,37,0.3)'}`,
                borderRadius: open ? '10px 10px 0 0' : '10px',
                color: selected ? '#fff' : 'rgba(255,255,255,0.4)',
                fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif',
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
              }}
            >
              <span>
                {selected
                  ? <>{selectedGroup?.emoji} <strong style={{ color: '#fff' }}>{selected.name}</strong> <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}>— {selectedGroup?.name}</span></>
                  : '— Select your name —'
                }
              </span>
              <span style={{ color: 'var(--gold)', fontSize: '0.8rem', flexShrink: 0 }}>
                {open ? '▲' : '▼'}
              </span>
            </button>

            {/* Dropdown list */}
            {open && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
                background: '#0f1535',
                border: '1px solid var(--gold)', borderTop: 'none',
                borderRadius: '0 0 10px 10px',
                maxHeight: '320px', overflowY: 'auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}>
                {Object.entries(GROUPS).map(([gId, group]) => {
                  const members = PARTICIPANTS.filter(p => p.groupId === gId)
                  return (
                    <div key={gId}>
                      {/* Team header */}
                      <div style={{
                        padding: '8px 14px 4px',
                        borderTop: '1px solid rgba(249,168,37,0.15)',
                        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em',
                        color: '#f9a825',
                        background: 'rgba(249,168,37,0.06)',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}>
                        <span>{group.emoji}</span>
                        <span style={{ color: '#f9a825' }}>{group.name}</span>
                        <span style={{ color: 'rgba(249,168,37,0.55)', fontWeight: 400 }}>— {group.subtitle}</span>
                      </div>

                      {/* Members */}
                      {members.map(p => (
                        <div
                          key={p.id}
                          onClick={() => { setSelectedId(p.id); setOpen(false); setError('') }}
                          style={{
                            padding: '10px 18px',
                            cursor: 'pointer',
                            fontSize: '0.92rem',
                            fontWeight: selectedId === p.id ? 700 : 400,
                            color: selectedId === p.id ? '#fff' : 'rgba(255,255,255,0.8)',
                            background: selectedId === p.id
                              ? 'rgba(249,168,37,0.18)'
                              : 'transparent',
                            borderLeft: selectedId === p.id
                              ? '3px solid var(--gold)'
                              : '3px solid transparent',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={e => {
                            if (selectedId !== p.id) e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                          }}
                          onMouseLeave={e => {
                            if (selectedId !== p.id) e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          {p.name}
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Welcome card */}
          {selected && (
            <div style={{
              background: 'rgba(249,168,37,0.08)',
              border: '1px solid rgba(249,168,37,0.25)',
              borderRadius: '10px', padding: '12px 16px', fontSize: '0.9rem',
            }}>
              Welcome, <strong style={{ color: 'var(--gold)' }}>{selected.name}</strong>!
              <br />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>
                {selectedGroup?.emoji} <strong style={{ color: '#fff' }}>{selectedGroup?.name}</strong>
                <span style={{ color: 'rgba(255,255,255,0.45)' }}> — {selectedGroup?.subtitle}</span>
              </span>
            </div>
          )}

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
