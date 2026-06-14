import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { PARTICIPANTS, GROUPS, SECTIONS, TOTAL_SECTIONS, DAYS_PER_SECTION, getAssignmentForDay } from '../gameConfig'

const DEFAULT_STATE = {
  currentSection: 1,
  currentDay: 1,
  isLive: false,
  deadline: null,
}

export default function AdminPanel({ onLogout }) {
  const [game, setGame]           = useState(null)
  const [saving, setSaving]       = useState(false)
  const [tab, setTab]             = useState('control') // 'control' | 'schedule' | 'preview' | 'scores'
  const [teamScores, setTeamScores] = useState({})
  const [deadlineInput, setDeadlineInput] = useState('')

  // Schedule tab state
  const [scheduleSection, setScheduleSection] = useState(1)
  const [scheduleDay, setScheduleDay]         = useState(1)

  // Listen to game state
  useEffect(() => {
    const ref = doc(db, 'config', 'gameState')
    const unsub = onSnapshot(ref, snap => {
      const data = snap.exists() ? snap.data() : DEFAULT_STATE
      setGame(data)
      if (data.deadline) setDeadlineInput(toLocalInput(new Date(data.deadline)))
      else setDeadlineInput('')
    })
    return () => unsub()
  }, [])

  // Listen to team scores
  useEffect(() => {
    const unsubs = Object.keys(GROUPS).map(gId => {
      const ref = doc(db, 'groups', gId)
      return onSnapshot(ref, snap => {
        if (snap.exists()) setTeamScores(prev => ({ ...prev, [gId]: snap.data().teamScore || 0 }))
      })
    })
    return () => unsubs.forEach(u => u())
  }, [])

  async function save(updates) {
    setSaving(true)
    const ref = doc(db, 'config', 'gameState')
    await setDoc(ref, { ...(game || DEFAULT_STATE), ...updates }, { merge: true })
    setSaving(false)
  }

  async function jumpToDay(section, day) {
    await save({ currentSection: section, currentDay: day, isLive: false, deadline: null })
  }

  async function setDeadline() {
    if (!deadlineInput) { await save({ deadline: null }); return }
    await save({ deadline: new Date(deadlineInput).toISOString() })
  }

  if (!game) return <div className="page-container"><div className="loader" /></div>

  const section    = SECTIONS[game.currentSection - 1]
  const absoluteDay = (game.currentSection - 1) * DAYS_PER_SECTION + game.currentDay
  const isLastDay  = game.currentSection === TOTAL_SECTIONS && game.currentDay === DAYS_PER_SECTION

  const previewSection = SECTIONS[scheduleSection - 1]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="header-bar">
        <span className="logo">🦚 Admin</span>
        <span className="text-muted text-sm" style={{ fontSize: '0.78rem' }}>
          {section.emoji} S{game.currentSection}·D{game.currentDay} &nbsp;
          {game.isLive
            ? <span style={{ color: 'var(--success)', fontWeight: 700 }}>● LIVE</span>
            : <span style={{ color: 'var(--error)', fontWeight: 700 }}>● LOCKED</span>}
        </span>
        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={onLogout}>
          Exit
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(249,168,37,0.15)', background: 'rgba(13,13,43,0.6)', overflowX: 'auto' }}>
        {[
          { id: 'control',  label: '🎛️ Control'  },
          { id: 'schedule', label: '📅 Schedule' },
          { id: 'preview',  label: '👁️ Preview'  },
          { id: 'scores',   label: '🏆 Scores'   },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: '11px 8px', background: 'none', border: 'none', whiteSpace: 'nowrap',
            borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent',
            color: tab === t.id ? 'var(--gold)' : 'var(--text-muted)',
            cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.82rem',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

        {/* ── CONTROL TAB ─────────────────────────────────────────────────── */}
        {tab === 'control' && (
          <div className="card card-wide flex-col gap-20">

            {/* Current position */}
            <div style={{ textAlign: 'center' }}>
              <p className="text-muted text-sm">Currently set to</p>
              <h2 className="title-krishna" style={{ fontSize: '1.4rem', marginTop: '4px' }}>
                {section.emoji} Section {game.currentSection} · Day {game.currentDay}
              </h2>
              <p className="text-muted text-sm">{section.name} · Overall day {absoluteDay} of 81</p>
            </div>

            <div className="divider" />

            {/* Live toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  {game.isLive
                    ? <span style={{ color: 'var(--success)' }}>🟢 LIVE — participants can answer</span>
                    : <span style={{ color: 'var(--error)' }}>🔴 LOCKED — participants see waiting screen</span>}
                </p>
                <p className="text-muted text-sm mt-4">
                  {game.isLive ? 'Click to lock and stop submissions' : "Click to unlock today's question"}
                </p>
              </div>
              <button onClick={() => save({ isLive: !game.isLive })} disabled={saving} style={{
                padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                fontWeight: 700, fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem',
                background: game.isLive ? 'linear-gradient(135deg,#f44336,#b71c1c)' : 'linear-gradient(135deg,#4caf50,#1b5e20)',
                color: '#fff', minWidth: '90px',
              }}>
                {saving ? '…' : game.isLive ? 'Lock 🔒' : 'Go Live 🚀'}
              </button>
            </div>

            <div className="divider" />

            {/* Deadline */}
            <div className="flex-col gap-12">
              <p className="section-heading">Set Deadline</p>
              <p className="text-muted text-sm">Participants can't submit after this time. Leave blank for no deadline.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="datetime-local" className="input-field" value={deadlineInput}
                  onChange={e => setDeadlineInput(e.target.value)} style={{ flex: 1 }} />
                <button className="btn-secondary" onClick={setDeadline} disabled={saving}>Set</button>
              </div>
              {game.deadline && (
                <p className="text-sm" style={{ color: 'var(--gold)' }}>
                  ⏰ {new Date(game.deadline).toLocaleString('en-IN')}
                </p>
              )}
            </div>

            <div className="divider" />

            {/* Navigate days — forward AND backward */}
            <div className="flex-col gap-12">
              <p className="section-heading">Navigate Days</p>
              <p className="text-muted text-sm">Move forward or backward freely. Resets Live to locked.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button className="btn-primary"
                  onClick={() => {
                    let s = game.currentSection, d = game.currentDay
                    if (d > 1) jumpToDay(s, d - 1)
                    else if (s > 1) jumpToDay(s - 1, DAYS_PER_SECTION)
                  }}
                  disabled={saving || (game.currentSection === 1 && game.currentDay === 1)}
                  style={{ background: 'linear-gradient(135deg,#4a148c,#1a237e)' }}
                >
                  ← Previous Day
                </button>
                <button className="btn-primary"
                  onClick={() => {
                    let s = game.currentSection, d = game.currentDay
                    if (d < DAYS_PER_SECTION) jumpToDay(s, d + 1)
                    else if (s < TOTAL_SECTIONS) jumpToDay(s + 1, 1)
                  }}
                  disabled={saving || isLastDay}
                  style={{ background: 'linear-gradient(135deg,#1565c0,#0d47a1)' }}
                >
                  Next Day →
                </button>
              </div>
              <p className="text-muted text-sm text-center">— or jump directly —</p>
              <JumpPicker current={game} onJump={jumpToDay} saving={saving} />
            </div>
          </div>
        )}

        {/* ── SCHEDULE TAB ─────────────────────────────────────────────────── */}
        {tab === 'schedule' && (
          <div className="card card-wide flex-col gap-16">
            <p className="section-heading">All 81 Days — Full Schedule</p>
            <p className="text-muted text-sm">Browse every section and day in advance. Click any day to jump the game to it.</p>

            {/* Section selector */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {SECTIONS.map(s => (
                <button key={s.id} onClick={() => { setScheduleSection(s.id); setScheduleDay(1) }}
                  style={{
                    padding: '6px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                    fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.8rem',
                    background: scheduleSection === s.id ? 'var(--gold)' : 'rgba(255,255,255,0.07)',
                    color: scheduleSection === s.id ? '#1a237e' : 'var(--text-muted)',
                  }}>
                  {s.emoji} S{s.id}
                </button>
              ))}
            </div>

            {/* Day selector grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: '6px' }}>
              {Array.from({ length: DAYS_PER_SECTION }, (_, i) => i + 1).map(d => {
                const isActive = game.currentSection === scheduleSection && game.currentDay === d
                return (
                  <button key={d} onClick={() => setScheduleDay(d)} style={{
                    padding: '8px 4px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.85rem',
                    background: scheduleDay === d
                      ? 'var(--gold)' : isActive
                      ? 'rgba(76,175,80,0.3)' : 'rgba(255,255,255,0.06)',
                    color: scheduleDay === d ? '#1a237e' : isActive ? '#a5d6a7' : 'var(--text-muted)',
                    outline: isActive ? '2px solid var(--success)' : 'none',
                  }}>
                    D{d}
                  </button>
                )
              })}
            </div>

            <div className="divider" />

            {/* Day detail */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <p style={{ fontWeight: 700, color: 'var(--gold)' }}>
                  {previewSection.emoji} Section {scheduleSection} · Day {scheduleDay}
                  <span className="text-muted" style={{ fontWeight: 400, fontSize: '0.8rem', marginLeft: '8px' }}>
                    (Overall day {(scheduleSection - 1) * DAYS_PER_SECTION + scheduleDay})
                  </span>
                </p>
                <button
                  onClick={() => jumpToDay(scheduleSection, scheduleDay)}
                  disabled={saving}
                  style={{
                    padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--gold)',
                    background: 'rgba(249,168,37,0.1)', color: 'var(--gold)',
                    cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 600,
                  }}
                >
                  {saving ? '…' : '⚡ Set as Current'}
                </button>
              </div>

              {scheduleSection === 1 ? (
                Object.entries(GROUPS).map(([gId, group]) => {
                  const members = PARTICIPANTS.filter(p => p.groupId === gId)
                  return (
                    <div key={gId} style={{ marginBottom: '20px' }}>
                      <p style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '8px' }}>
                        {group.emoji} {group.name}
                      </p>
                      {members.map(p => {
                        const a = getAssignmentForDay(p.id, scheduleDay)
                        return (
                          <AssignmentCard key={p.id} participant={p} assignment={a} />
                        )
                      })}
                    </div>
                  )
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p className="text-muted">{previewSection.emoji} {previewSection.name}</p>
                  <p className="text-muted text-sm mt-8">Questions for this section will be added closer to the date.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PREVIEW TAB (today's live day) ──────────────────────────────── */}
        {tab === 'preview' && (
          <div className="card card-wide flex-col gap-16">
            <p className="section-heading">
              Today's Assignments — {section.emoji} Section {game.currentSection} · Day {game.currentDay}
            </p>
            <p className="text-muted text-sm">Exactly what participants will see right now. Verify before going live.</p>
            <div className="divider" />
            {game.currentSection === 1 ? (
              Object.entries(GROUPS).map(([gId, group]) => {
                const members = PARTICIPANTS.filter(p => p.groupId === gId)
                return (
                  <div key={gId} style={{ marginBottom: '20px' }}>
                    <p style={{ fontWeight: 700, color: 'var(--gold)', marginBottom: '8px' }}>
                      {group.emoji} {group.name}
                    </p>
                    {members.map(p => {
                      const a = getAssignmentForDay(p.id, game.currentDay)
                      return <AssignmentCard key={p.id} participant={p} assignment={a} />
                    })}
                  </div>
                )
              })
            ) : (
              <p className="text-muted text-center">Preview for Section {game.currentSection} coming soon.</p>
            )}
          </div>
        )}

        {/* ── SCORES TAB ──────────────────────────────────────────────────── */}
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
              ))}
          </div>
        )}

      </div>
    </div>
  )
}

// ── Jump to any day picker ─────────────────────────────────────────────────
function JumpPicker({ current, onJump, saving }) {
  const [s, setS] = useState(current.currentSection)
  const [d, setD] = useState(current.currentDay)

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <select className="input-field" style={{ flex: 1 }} value={s} onChange={e => setS(Number(e.target.value))}>
        {SECTIONS.map(sec => (
          <option key={sec.id} value={sec.id}>{sec.emoji} Section {sec.id} — {sec.name}</option>
        ))}
      </select>
      <select className="input-field" style={{ width: '90px' }} value={d} onChange={e => setD(Number(e.target.value))}>
        {Array.from({ length: DAYS_PER_SECTION }, (_, i) => i + 1).map(day => (
          <option key={day} value={day}>Day {day}</option>
        ))}
      </select>
      <button className="btn-secondary" onClick={() => onJump(s, d)} disabled={saving} style={{ whiteSpace: 'nowrap' }}>
        Jump ⚡
      </button>
    </div>
  )
}

// ── Assignment card: shows video embed + question + correct answer ────────────
function AssignmentCard({ participant, assignment }) {
  const [expanded, setExpanded] = useState(false)
  const { video, question, questionIndex } = assignment || {}
  if (!video || !question) return null

  const LETTERS = ['A', 'B', 'C', 'D']

  return (
    <div style={{
      borderRadius: '10px', marginBottom: '8px', overflow: 'hidden',
      border: '1px solid rgba(249,168,37,0.15)',
      background: 'rgba(255,255,255,0.03)',
    }}>
      {/* Header row — always visible */}
      <div
        onClick={() => setExpanded(e => !e)}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '8px 12px', cursor: 'pointer', fontSize: '0.83rem',
        }}
      >
        <span style={{ fontWeight: 600, minWidth: '70px' }}>{participant.name}</span>
        <span className="text-muted" style={{ flex: 1, fontSize: '0.76rem' }}>
          {video.id} — {video.title}
          <span style={{ marginLeft: '8px', color: 'var(--gold)', fontSize: '0.7rem' }}>
            Q{(questionIndex ?? 0) + 1}
          </span>
        </span>
        <span style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>{expanded ? '▲' : '▼'}</span>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ padding: '0 12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Video embed */}
          <div style={{
            position: 'relative', paddingBottom: '45%', height: 0,
            borderRadius: '8px', overflow: 'hidden', marginTop: '12px',
            border: '1px solid rgba(249,168,37,0.2)',
          }}>
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              src={`https://www.youtube.com/embed/${video.videoId}?rel=0${video.startAt ? `&start=${video.startAt}` : ''}`}
              title={video.title}
              frameBorder="0"
              allowFullScreen
            />
          </div>

          {/* Question */}
          <div style={{
            marginTop: '12px', padding: '10px 14px',
            background: 'rgba(249,168,37,0.07)', borderRadius: '8px',
            fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.5,
          }}>
            {question.q}
          </div>

          {/* Options with correct answer highlighted */}
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {question.options.map((opt, idx) => (
              <div key={idx} style={{
                padding: '7px 12px', borderRadius: '7px', fontSize: '0.82rem',
                display: 'flex', alignItems: 'center', gap: '8px',
                background: idx === question.correct ? 'rgba(76,175,80,0.2)' : 'rgba(255,255,255,0.03)',
                border: idx === question.correct ? '1px solid #4caf50' : '1px solid transparent',
                fontWeight: idx === question.correct ? 700 : 400,
                color: idx === question.correct ? '#a5d6a7' : 'var(--text-muted)',
              }}>
                <span style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 700,
                  background: idx === question.correct ? '#4caf50' : 'rgba(255,255,255,0.1)',
                  color: idx === question.correct ? '#fff' : 'var(--text-muted)',
                }}>
                  {LETTERS[idx]}
                </span>
                {opt}
                {idx === question.correct && <span style={{ marginLeft: 'auto' }}>✅ Correct</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function toLocalInput(date) {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
