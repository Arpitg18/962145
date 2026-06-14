import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore'
import { PARTICIPANTS, GROUPS, SECTIONS, TOTAL_SECTIONS, DAYS_PER_SECTION, ROUND1_VIDEOS, getAssignmentForDay } from '../gameConfig'
import AdminLibrary from './AdminLibrary'

const DEFAULT_STATE = {
  currentSection: 1,
  currentDay: 1,
  isLive: false,
  deadline: null,
}

export default function AdminPanel({ onLogout }) {
  const [game, setGame]             = useState(null)
  const [saving, setSaving]         = useState(false)
  const [tab, setTab]               = useState('control')
  const [teamScores, setTeamScores] = useState({})
  const [deadlineInput, setDeadlineInput] = useState('')
  const [announcement, setAnnouncement]   = useState(null)
  const [announcementDraft, setAnnouncementDraft] = useState('')
  const [participantAnswered, setParticipantAnswered] = useState({})

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

  // Listen to announcement
  useEffect(() => {
    const ref = doc(db, 'config', 'announcement')
    const unsub = onSnapshot(ref, snap => {
      const data = snap.exists() ? snap.data() : null
      setAnnouncement(data)
      if (data?.message) setAnnouncementDraft(data.message)
    })
    return () => unsub()
  }, [])

  // Track who has answered today
  useEffect(() => {
    if (!game) return
    const key = `S${game.currentSection}D${game.currentDay}`
    const unsubs = PARTICIPANTS.map(p => {
      const ref = doc(db, 'participants', p.id)
      return onSnapshot(ref, snap => {
        const answered = snap.exists() ? (snap.data().answeredDays || []).includes(key) : false
        setParticipantAnswered(prev => ({ ...prev, [p.id]: answered }))
      })
    })
    return () => unsubs.forEach(u => u())
  }, [game?.currentSection, game?.currentDay])

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

  async function publishAnnouncement() {
    await setDoc(doc(db, 'config', 'announcement'), {
      message: announcementDraft,
      active: true,
      updatedAt: new Date().toISOString(),
    })
  }

  async function clearAnnouncement() {
    await setDoc(doc(db, 'config', 'announcement'), { message: '', active: false, updatedAt: new Date().toISOString() })
    setAnnouncementDraft('')
  }

  async function toggleCelebration() {
    await save({ celebrationMode: !game?.celebrationMode })
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
          { id: 'library',  label: '📚 Library'  },
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

            {/* Announcement */}
            <div className="divider" />
            <div className="flex-col gap-12">
              <p className="section-heading">📢 Announcement</p>
              <p className="text-muted text-sm">Shown as a banner to all participants instantly. Use for congratulations, reminders, hints.</p>
              <textarea
                className="input-field"
                rows={2}
                placeholder="e.g. 🎉 Congratulations to Team GOVARDHAN for topping Day 3!"
                value={announcementDraft}
                onChange={e => setAnnouncementDraft(e.target.value)}
                style={{ resize: 'vertical', fontFamily: 'Poppins, sans-serif', lineHeight: 1.5 }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-primary" onClick={publishAnnouncement}
                  disabled={!announcementDraft.trim()} style={{ flex: 1, padding: '10px' }}>
                  📢 Publish
                </button>
                {announcement?.active && (
                  <button className="btn-secondary" onClick={clearAnnouncement}>Clear</button>
                )}
              </div>
              {announcement?.active && (
                <p className="text-sm" style={{ color: 'var(--success)' }}>
                  🟢 Live: "{announcement.message}"
                </p>
              )}
            </div>

            {/* Leaderboard Reveal */}
            <div className="divider" />
            <div className="flex-col gap-12">
              <p className="section-heading">🎉 Leaderboard Reveal</p>
              <p className="text-muted text-sm">
                Push all participants to a celebration screen showing their scores. Use at section end or any milestone moment.
              </p>
              <button
                onClick={toggleCelebration}
                disabled={saving}
                style={{
                  padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.9rem',
                  background: game?.celebrationMode
                    ? 'linear-gradient(135deg,#f44336,#b71c1c)'
                    : 'linear-gradient(135deg,#7b1fa2,#4a148c)',
                  color: '#fff',
                }}
              >
                {game?.celebrationMode ? '⬇️ Exit Celebration Mode' : '🎉 Launch Leaderboard Reveal'}
              </button>
              {game?.celebrationMode && (
                <p className="text-sm" style={{ color: 'var(--lotus-pink)' }}>
                  🎊 All participants are seeing the celebration screen right now!
                </p>
              )}
            </div>

            {/* Participation tracker */}
            <div className="divider" />
            <div className="flex-col gap-12">
              <p className="section-heading">👥 Today's Participation</p>
              <ParticipationTracker answered={participantAnswered} game={game} />
            </div>

            {/* Navigate days — forward AND backward */}
            <div className="divider" />
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
                          <AssignmentCard key={p.id} participant={p} assignment={a} section={scheduleSection} day={scheduleDay} />
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
                      return <AssignmentCard key={p.id} participant={p} assignment={a} section={game.currentSection} day={game.currentDay} />
                    })}
                  </div>
                )
              })
            ) : (
              <p className="text-muted text-center">Preview for Section {game.currentSection} coming soon.</p>
            )}
          </div>
        )}

        {/* ── LIBRARY TAB ─────────────────────────────────────────────────── */}
        {tab === 'library' && <AdminLibrary />}

        {/* ── SCORES TAB ──────────────────────────────────────────────────── */}
        {tab === 'scores' && (
          <ScoresTab teamScores={teamScores} />
        )}

      </div>
    </div>
  )
}

// ── Scores tab: team leaderboard + individual breakdown ──────────────────────
function ScoresTab({ teamScores }) {
  const [individualScores, setIndividualScores] = useState({})
  const [view, setView] = useState('teams') // 'teams' | 'individuals'
  const [expandedGroup, setExpandedGroup] = useState(null)

  useEffect(() => {
    const unsubs = PARTICIPANTS.map(p => {
      const ref = doc(db, 'participants', p.id)
      return onSnapshot(ref, snap => {
        if (snap.exists()) {
          setIndividualScores(prev => ({
            ...prev,
            [p.id]: {
              myScore: snap.data().myScore || 0,
              answeredDays: snap.data().answeredDays || [],
            }
          }))
        }
      })
    })
    return () => unsubs.forEach(u => u())
  }, [])

  const sortedTeams = Object.entries(GROUPS)
    .map(([gId, group]) => ({ gId, group, score: teamScores[gId] || 0 }))
    .sort((a, b) => b.score - a.score)

  // All individuals sorted by score
  const allIndividuals = PARTICIPANTS
    .map(p => ({
      ...p,
      group: GROUPS[p.groupId],
      myScore: individualScores[p.id]?.myScore || 0,
      daysAnswered: individualScores[p.id]?.answeredDays?.length || 0,
    }))
    .sort((a, b) => b.myScore - a.myScore)

  return (
    <div className="card card-wide flex-col gap-16">
      {/* CSV Export */}
      <button
        onClick={() => exportCSV(individualScores)}
        style={{
          alignSelf: 'flex-end', padding: '7px 16px', borderRadius: '8px',
          border: '1px solid rgba(76,175,80,0.4)', background: 'rgba(76,175,80,0.1)',
          color: '#a5d6a7', cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
          fontSize: '0.8rem', fontWeight: 600,
        }}
      >
        ⬇️ Export CSV
      </button>

      {/* View toggle */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { id: 'teams', label: '🏆 Team Leaderboard' },
          { id: 'individuals', label: '⭐ Individual Scores' },
        ].map(v => (
          <button key={v.id} onClick={() => setView(v.id)} style={{
            flex: 1, padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.82rem',
            background: view === v.id ? 'var(--gold)' : 'rgba(255,255,255,0.07)',
            color: view === v.id ? '#1a237e' : 'var(--text-muted)',
          }}>{v.label}</button>
        ))}
      </div>

      <div className="divider" />

      {/* ── TEAM VIEW ── */}
      {view === 'teams' && (
        <div className="flex-col gap-10" style={{ gap: '10px' }}>
          {sortedTeams.map((item, rank) => {
            const members = PARTICIPANTS.filter(p => p.groupId === item.gId)
            const isExpanded = expandedGroup === item.gId
            return (
              <div key={item.gId} style={{
                borderRadius: '12px', overflow: 'hidden',
                background: rank === 0 ? 'rgba(249,168,37,0.10)' : 'rgba(255,255,255,0.04)',
                border: rank === 0 ? '1px solid rgba(249,168,37,0.4)' : '1px solid rgba(255,255,255,0.06)',
              }}>
                {/* Team row */}
                <div
                  onClick={() => setExpandedGroup(isExpanded ? null : item.gId)}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '1.3rem', width: '28px', textAlign: 'center' }}>
                    {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `#${rank + 1}`}
                  </span>
                  <span style={{ flex: 1, fontWeight: 600 }}>{item.group.emoji} {item.group.name}</span>
                  <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '1.2rem' }}>{item.score}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{isExpanded ? '▲' : '▼'}</span>
                </div>

                {/* Individual breakdown per team */}
                {isExpanded && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '8px 12px 12px' }}>
                    <p className="text-muted text-sm" style={{ marginBottom: '8px', paddingLeft: '4px' }}>Individual scores</p>
                    {members
                      .map(p => ({ ...p, myScore: individualScores[p.id]?.myScore || 0, days: individualScores[p.id]?.answeredDays?.length || 0 }))
                      .sort((a, b) => b.myScore - a.myScore)
                      .map((p, i) => (
                        <div key={p.id} style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '8px 12px', borderRadius: '8px', marginBottom: '4px',
                          background: i === 0 ? 'rgba(249,168,37,0.08)' : 'rgba(255,255,255,0.03)',
                        }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', width: '18px' }}>#{i + 1}</span>
                          <span style={{ flex: 1, fontSize: '0.88rem', fontWeight: i === 0 ? 700 : 400 }}>{p.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.days} day{p.days !== 1 ? 's' : ''}</span>
                          <span style={{
                            fontWeight: 700, fontSize: '1rem',
                            color: i === 0 ? 'var(--gold)' : 'var(--text-primary)',
                            minWidth: '36px', textAlign: 'right',
                          }}>{p.myScore}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── INDIVIDUAL VIEW ── */}
      {view === 'individuals' && (
        <div className="flex-col gap-8" style={{ gap: '8px' }}>
          <p className="text-muted text-sm">All {PARTICIPANTS.length} participants ranked by score</p>
          {allIndividuals.map((p, rank) => (
            <div key={p.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 14px', borderRadius: '10px',
              background: rank === 0 ? 'rgba(249,168,37,0.12)' : 'rgba(255,255,255,0.03)',
              border: rank < 3 ? '1px solid rgba(249,168,37,0.2)' : '1px solid rgba(255,255,255,0.05)',
            }}>
              <span style={{ fontSize: '1rem', width: '28px', textAlign: 'center', flexShrink: 0 }}>
                {rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>#{rank + 1}</span>}
              </span>
              <span style={{ flex: 1, fontWeight: rank < 3 ? 700 : 400, fontSize: '0.88rem' }}>{p.name}</span>
              <span style={{
                fontSize: '0.72rem', padding: '2px 8px', borderRadius: '20px',
                background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)',
              }}>
                {p.group?.emoji} {p.group?.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '50px', textAlign: 'right' }}>
                {p.daysAnswered}d played
              </span>
              <span style={{
                fontWeight: 700, fontSize: '1.05rem', minWidth: '36px', textAlign: 'right',
                color: rank === 0 ? 'var(--gold)' : 'var(--text-primary)',
              }}>{p.myScore}</span>
            </div>
          ))}
        </div>
      )}
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

// ── Assignment card: video embed + question + correct answer + Switch ─────────
function AssignmentCard({ participant, assignment, section, day }) {
  const [expanded, setExpanded] = useState(false)
  const [switching, setSwitching] = useState(false)
  const [switchVideo, setSwitchVideo] = useState('')
  const [switchQIdx, setSwitchQIdx] = useState(0)
  const [saving, setSaving] = useState(false)
  const [hasOverride, setHasOverride] = useState(false)

  const { video, question, questionIndex } = assignment || {}

  // Check if this participant+day has an assignment override
  useEffect(() => {
    if (!participant || !section || !day) return
    const key = `${participant.id}_S${section}D${day}`
    const ref = doc(db, 'assignmentOverrides', key)
    const unsub = onSnapshot(ref, snap => setHasOverride(snap.exists()))
    return () => unsub()
  }, [participant?.id, section, day])

  if (!video || !question) return null

  const LETTERS = ['A', 'B', 'C', 'D']

  async function saveSwitch() {
    if (!switchVideo) return
    setSaving(true)
    const key = `${participant.id}_S${section}D${day}`
    await setDoc(doc(db, 'assignmentOverrides', key), {
      videoId: switchVideo,
      questionIndex: switchQIdx,
      overriddenAt: new Date().toISOString(),
    })
    setSaving(false)
    setSwitching(false)
  }

  async function clearSwitch() {
    setSaving(true)
    const key = `${participant.id}_S${section}D${day}`
    await deleteDoc(doc(db, 'assignmentOverrides', key))
    setSaving(false)
  }

  const selectedVideoObj = ROUND1_VIDEOS.find(v => v.id === switchVideo)

  return (
    <div style={{
      borderRadius: '10px', marginBottom: '8px', overflow: 'hidden',
      border: hasOverride ? '1px solid rgba(249,168,37,0.6)' : '1px solid rgba(249,168,37,0.15)',
      background: hasOverride ? 'rgba(249,168,37,0.04)' : 'rgba(255,255,255,0.03)',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px' }}>
        <div onClick={() => setExpanded(e => !e)} style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, cursor: 'pointer' }}>
          <span style={{ fontWeight: 600, minWidth: '65px', fontSize: '0.83rem' }}>{participant.name}</span>
          <span className="text-muted" style={{ flex: 1, fontSize: '0.76rem' }}>
            {video.id} — {video.title}
            <span style={{ marginLeft: '6px', color: 'var(--gold)', fontSize: '0.7rem' }}>Q{(questionIndex ?? 0) + 1}</span>
            {hasOverride && <span style={{ marginLeft: '6px', color: 'var(--saffron-light)', fontSize: '0.7rem' }}>🔀 Switched</span>}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{expanded ? '▲' : '▼'}</span>
        </div>
        {/* Switch button */}
        <button
          onClick={() => { setSwitching(s => !s); setSwitchVideo(video.id); setSwitchQIdx(questionIndex ?? 0) }}
          style={{
            padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600,
            border: '1px solid rgba(2,136,209,0.4)', background: 'rgba(2,136,209,0.1)',
            color: '#81d4fa', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', flexShrink: 0,
          }}
        >
          🔀 Switch
        </button>
        {hasOverride && (
          <button onClick={clearSwitch} disabled={saving} style={{
            padding: '4px 8px', borderRadius: '6px', fontSize: '0.72rem',
            border: '1px solid rgba(244,67,54,0.4)', background: 'rgba(244,67,54,0.1)',
            color: '#ef9a9a', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', flexShrink: 0,
          }}>
            ✕ Clear
          </button>
        )}
      </div>

      {/* Switch panel */}
      {switching && (
        <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(2,136,209,0.2)', background: 'rgba(2,136,209,0.05)' }}>
          <p className="text-sm" style={{ color: '#81d4fa', marginBottom: '8px', fontWeight: 600 }}>
            🔀 Switch {participant.name}'s video for Section {section} Day {day}
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <select className="input-field" style={{ flex: 2, minWidth: '180px' }}
              value={switchVideo} onChange={e => setSwitchVideo(e.target.value)}>
              <option value="">— Select video —</option>
              {ROUND1_VIDEOS.map(v => (
                <option key={v.id} value={v.id}>{v.id} — {v.title}</option>
              ))}
            </select>
            <select className="input-field" style={{ width: '90px' }}
              value={switchQIdx} onChange={e => setSwitchQIdx(Number(e.target.value))}>
              {[0, 1, 2].map(i => <option key={i} value={i}>Q{i + 1}</option>)}
            </select>
            <button onClick={saveSwitch} disabled={saving || !switchVideo} className="btn-primary"
              style={{ padding: '10px 16px', fontSize: '0.82rem' }}>
              {saving ? '…' : '💾 Save'}
            </button>
            <button onClick={() => setSwitching(false)} className="btn-secondary" style={{ padding: '10px 14px', fontSize: '0.82rem' }}>
              Cancel
            </button>
          </div>
          {/* Preview the selected question */}
          {selectedVideoObj && (
            <div style={{ marginTop: '10px', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', fontSize: '0.8rem' }}>
              <p style={{ fontWeight: 600, marginBottom: '4px' }}>{selectedVideoObj.title} — Q{switchQIdx + 1}:</p>
              <p className="text-muted">{selectedVideoObj.questions?.[switchQIdx]?.q}</p>
              <p style={{ color: '#4caf50', marginTop: '4px', fontSize: '0.75rem' }}>
                ✅ Correct: {selectedVideoObj.questions?.[switchQIdx]?.options?.[selectedVideoObj.questions?.[switchQIdx]?.correct]}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Expanded detail: video + question */}
      {expanded && (
        <div style={{ padding: '0 12px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {!video.videoId?.startsWith('PENDING') && (
            <div style={{
              position: 'relative', paddingBottom: '45%', height: 0,
              borderRadius: '8px', overflow: 'hidden', marginTop: '12px',
              border: '1px solid rgba(249,168,37,0.2)',
            }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${video.videoId}?rel=0${video.startAt ? `&start=${video.startAt}` : ''}`}
                title={video.title} frameBorder="0" allowFullScreen
              />
            </div>
          )}
          <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(249,168,37,0.07)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.5 }}>
            {question.q}
          </div>
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
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, fontSize: '0.7rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: idx === question.correct ? '#4caf50' : 'rgba(255,255,255,0.1)',
                  color: idx === question.correct ? '#fff' : 'var(--text-muted)',
                }}>{LETTERS[idx]}</span>
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

// ── CSV Export ───────────────────────────────────────────────────────────────
function exportCSV(individualScores) {
  const rows = [
    ['Name', 'Team', 'Score', 'Days Played', 'Days Answered'],
    ...PARTICIPANTS.map(p => {
      const g = GROUPS[p.groupId]
      const data = individualScores[p.id] || {}
      return [
        p.name,
        `${g?.name} — ${g?.subtitle}`,
        data.myScore || 0,
        data.answeredDays?.length || 0,
        (data.answeredDays || []).join(' | '),
      ]
    })
  ]
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url
  a.download = `janmashtami-scores-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ── Participation Tracker ─────────────────────────────────────────────────────
function ParticipationTracker({ answered, game }) {
  if (!game) return null
  const key = `S${game.currentSection}D${game.currentDay}`
  const total     = PARTICIPANTS.length
  const doneCount = PARTICIPANTS.filter(p => answered[p.id]).length
  const pct       = Math.round((doneCount / total) * 100)

  return (
    <div className="flex-col gap-12">
      {/* Summary bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--success)' }}>{doneCount}</span>
          <span className="text-muted"> / {total} answered</span>
        </p>
        <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)' }}>
        <div style={{
          height: '100%', borderRadius: '3px', width: `${pct}%`,
          background: 'linear-gradient(90deg, #4caf50, #81c784)', transition: 'width 0.5s ease',
        }} />
      </div>

      {/* Per-team breakdown */}
      {Object.entries(GROUPS).map(([gId, group]) => {
        const members = PARTICIPANTS.filter(p => p.groupId === gId)
        const teamDone = members.filter(p => answered[p.id]).length
        return (
          <div key={gId} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{
              padding: '8px 12px', background: 'rgba(255,255,255,0.04)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontWeight: 700, fontSize: '0.83rem', color: 'var(--gold)' }}>
                {group.emoji} {group.name}
              </span>
              <span style={{ fontSize: '0.78rem', color: teamDone === members.length ? 'var(--success)' : 'var(--text-muted)' }}>
                {teamDone}/{members.length}
                {teamDone === members.length && ' ✅'}
              </span>
            </div>
            <div style={{ padding: '6px 8px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {members.map(p => (
                <span key={p.id} style={{
                  padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 500,
                  background: answered[p.id] ? 'rgba(76,175,80,0.2)' : 'rgba(244,67,54,0.15)',
                  border: `1px solid ${answered[p.id] ? 'rgba(76,175,80,0.4)' : 'rgba(244,67,54,0.3)'}`,
                  color: answered[p.id] ? '#a5d6a7' : '#ef9a9a',
                }}>
                  {answered[p.id] ? '✓' : '○'} {p.name}
                </span>
              ))}
            </div>
          </div>
        )
      })}

      {/* Not answered list */}
      {doneCount < total && (
        <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(244,67,54,0.08)', border: '1px solid rgba(244,67,54,0.2)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef9a9a', marginBottom: '6px' }}>
            ⏳ Yet to answer ({total - doneCount}):
          </p>
          <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
            {PARTICIPANTS.filter(p => !answered[p.id]).map(p => p.name).join(' · ')}
          </p>
        </div>
      )}
    </div>
  )
}

function toLocalInput(date) {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
