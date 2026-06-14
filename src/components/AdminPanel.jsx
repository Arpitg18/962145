import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore'
import { PARTICIPANTS, GROUPS, SECTIONS, TOTAL_SECTIONS, DAYS_PER_SECTION, getVideoForDay, ROUND1_VIDEOS } from '../gameConfig'

const DEFAULT_STATE = {
  currentSection: 1,
  currentDay: 1,
  isLive: false,
  deadline: null,
}

export default function AdminPanel({ onLogout }) {
  const [game, setGame] = useState(null)
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState('control') // 'control' | 'preview' | 'scores'
  const [teamScores, setTeamScores] = useState({})
  const [deadlineInput, setDeadlineInput] = useState('')

  // Listen to game state
  useEffect(() => {
    const ref = doc(db, 'config', 'gameState')
    const unsub = onSnapshot(ref, snap => {
      const data = snap.exists() ? snap.data() : DEFAULT_STATE
      setGame(data)
      if (data.deadline) {
        const d = new Date(data.deadline)
        setDeadlineInput(toLocalInput(d))
      }
    })
    return () => unsub()
  }, [])

  // Listen to team scores
  useEffect(() => {
    const unsubs = Object.keys(GROUPS).map(gId => {
      const ref = doc(db, 'groups', gId)
      return onSnapshot(ref, snap => {
        if (snap.exists()) {
          setTeamScores(prev => ({ ...prev, [gId]: snap.data().teamScore || 0 }))
        }
      })
    })
    return () => unsubs.forEach(u => u())
  }, [])

  async function save(updates) {
    setSaving(true)
    const ref = doc(db, 'config', 'gameState')
    const current = game || DEFAULT_STATE
    await setDoc(ref, { ...current, ...updates }, { merge: true })
    setSaving(false)
  }

  async function toggleLive() {
    await save({ isLive: !game?.isLive })
  }

  async function advanceDay() {
    if (!game) return
    let { currentSection, currentDay } = game
    if (currentDay < DAYS_PER_SECTION) {
      await save({ currentDay: currentDay + 1, isLive: false, deadline: null })
    } else if (currentSection < TOTAL_SECTIONS) {
      await save({ currentSection: currentSection + 1, currentDay: 1, isLive: false, deadline: null })
    }
  }

  async function setDeadline() {
    if (!deadlineInput) { await save({ deadline: null }); return }
    const ts = new Date(deadlineInput).toISOString()
    await save({ deadline: ts })
  }

  if (!game) return <div className="page-container"><div className="loader" /></div>

  const section = SECTIONS[game.currentSection - 1]
  const absoluteDay = (game.currentSection - 1) * DAYS_PER_SECTION + game.currentDay
  const isLastDay = game.currentSection === TOTAL_SECTIONS && game.currentDay === DAYS_PER_SECTION

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="header-bar">
        <span className="logo">🦚 Admin</span>
        <span className="text-muted text-sm">Janmashtami 2026</span>
        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={onLogout}>
          Exit
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(249,168,37,0.15)', background: 'rgba(13,13,43,0.6)' }}>
        {[
          { id: 'control', label: '🎛️ Control' },
          { id: 'preview', label: '👁️ Preview' },
          { id: 'scores', label: '🏆 Scores' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '12px', background: 'none', border: 'none',
            borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent',
            color: tab === t.id ? 'var(--gold)' : 'var(--text-muted)',
            cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.85rem',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

        {/* ── CONTROL TAB ── */}
        {tab === 'control' && (
          <div className="card card-wide flex-col gap-20">
            {/* Current position */}
            <div style={{ textAlign: 'center' }}>
              <p className="text-muted text-sm">Current position</p>
              <h2 className="title-krishna" style={{ fontSize: '1.4rem', marginTop: '4px' }}>
                {section.emoji} Section {game.currentSection} · Day {game.currentDay}
              </h2>
              <p className="text-muted text-sm">{section.name} · Overall day {absoluteDay} of 81</p>
            </div>

            <div className="divider" />

            {/* Live toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '1rem' }}>
                  {game.isLive
                    ? <span style={{ color: 'var(--success)' }}>🟢 LIVE — participants can answer</span>
                    : <span style={{ color: 'var(--error)' }}>🔴 LOCKED — participants see waiting screen</span>
                  }
                </p>
                <p className="text-muted text-sm mt-4">
                  {game.isLive ? 'Click to lock and stop submissions' : 'Click to unlock today\'s question for participants'}
                </p>
              </div>
              <button
                onClick={toggleLive}
                disabled={saving}
                style={{
                  padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                  fontWeight: 700, fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem',
                  background: game.isLive
                    ? 'linear-gradient(135deg, #f44336, #b71c1c)'
                    : 'linear-gradient(135deg, #4caf50, #1b5e20)',
                  color: '#fff',
                  minWidth: '100px',
                }}
              >
                {saving ? '...' : game.isLive ? 'Lock 🔒' : 'Go Live 🚀'}
              </button>
            </div>

            <div className="divider" />

            {/* Deadline */}
            <div className="flex-col gap-12">
              <p className="section-heading">Set Deadline</p>
              <p className="text-muted text-sm">Participants can't submit after this time. Leave blank for no deadline.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="datetime-local"
                  className="input-field"
                  value={deadlineInput}
                  onChange={e => setDeadlineInput(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button className="btn-secondary" onClick={setDeadline} disabled={saving}>
                  Set
                </button>
              </div>
              {game.deadline && (
                <p className="text-sm" style={{ color: 'var(--gold)' }}>
                  ⏰ Deadline: {new Date(game.deadline).toLocaleString('en-IN')}
                </p>
              )}
            </div>

            <div className="divider" />

            {/* Advance day */}
            <div className="flex-col gap-12">
              <p className="section-heading">Advance to Next Day</p>
              <p className="text-muted text-sm">
                Moves to Day {game.currentDay < DAYS_PER_SECTION ? game.currentDay + 1 : 1} of{' '}
                {game.currentDay < DAYS_PER_SECTION ? `Section ${game.currentSection}` : `Section ${game.currentSection + 1}`}.
                Also resets Live to locked.
              </p>
              <button
                className="btn-primary"
                onClick={advanceDay}
                disabled={saving || isLastDay}
                style={{ background: 'linear-gradient(135deg, #1565c0, #0d47a1)' }}
              >
                {isLastDay ? '🏁 Event Complete!' : `➡️ Advance to Next Day`}
              </button>
            </div>
          </div>
        )}

        {/* ── PREVIEW TAB ── */}
        {tab === 'preview' && game.currentSection === 1 && (
          <div className="card card-wide flex-col gap-16">
            <p className="section-heading">Day {game.currentDay} video assignments (Section 1)</p>
            <p className="text-muted text-sm">This is what each participant will see today. Verify before going live.</p>
            <div className="divider" />
            {Object.entries(GROUPS).map(([gId, group]) => {
              const members = PARTICIPANTS.filter(p => p.groupId === gId)
              return (
                <div key={gId} style={{ marginBottom: '12px' }}>
                  <p style={{ fontWeight: 700, color: 'var(--gold)', marginBottom: '8px' }}>
                    {group.emoji} {group.name}
                  </p>
                  {members.map(p => {
                    const video = getVideoForDay(p.id, game.currentDay)
                    return (
                      <div key={p.id} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '8px 12px', borderRadius: '8px',
                        background: 'rgba(255,255,255,0.03)', marginBottom: '4px',
                        fontSize: '0.85rem',
                      }}>
                        <span>{p.name}</span>
                        <span className="text-muted" style={{ fontSize: '0.78rem' }}>
                          {video ? `${video.id} — ${video.title}` : '—'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
        {tab === 'preview' && game.currentSection !== 1 && (
          <div className="card card-wide text-center flex-col gap-12">
            <p className="text-muted">Preview for Section {game.currentSection} coming soon.</p>
          </div>
        )}

        {/* ── SCORES TAB ── */}
        {tab === 'scores' && (
          <div className="card card-wide flex-col gap-16">
            <p className="section-heading">Team Leaderboard</p>
            {Object.entries(GROUPS)
              .map(([gId, group]) => ({ gId, group, score: teamScores[gId] || 0 }))
              .sort((a, b) => b.score - a.score)
              .map((item, rank) => (
                <div key={item.gId} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '14px 16px', borderRadius: '12px',
                  background: rank === 0 ? 'rgba(249,168,37,0.12)' : 'rgba(255,255,255,0.04)',
                  border: rank === 0 ? '1px solid rgba(249,168,37,0.4)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ fontSize: '1.3rem', width: '32px', textAlign: 'center' }}>
                    {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `#${rank + 1}`}
                  </span>
                  <span style={{ flex: 1, fontWeight: 600 }}>{item.group.emoji} {item.group.name}</span>
                  <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '1.2rem' }}>{item.score}</span>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}

function toLocalInput(date) {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
