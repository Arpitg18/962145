import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, getDoc, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore'
import { ROUND1_VIDEOS } from '../gameConfig'

const LETTERS = ['A', 'B', 'C', 'D']

// ── Firestore paths ──────────────────────────────────────────────────────────
// questionOverrides/{videoId}_{qIdx} → { q, options, correct }

export async function loadQuestionOverride(videoId, qIdx) {
  const ref = doc(db, 'questionOverrides', `${videoId}_${qIdx}`)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export async function saveQuestionOverride(videoId, qIdx, data) {
  await setDoc(doc(db, 'questionOverrides', `${videoId}_${qIdx}`), data)
}

export async function deleteQuestionOverride(videoId, qIdx) {
  await deleteDoc(doc(db, 'questionOverrides', `${videoId}_${qIdx}`))
}

// ── Resolve a question: override > default ──────────────────────────────────
export async function resolveQuestion(video, qIdx) {
  const override = await loadQuestionOverride(video.id, qIdx)
  return override ?? video.questions?.[qIdx] ?? null
}

// ── Main component ──────────────────────────────────────────────────────────
export default function AdminLibrary() {
  const [overrides, setOverrides] = useState({}) // key: `${videoId}_${qIdx}`
  const [expandedVideo, setExpandedVideo] = useState(null)

  // Live-listen to all question overrides
  useEffect(() => {
    const unsubs = []
    ROUND1_VIDEOS.forEach(v => {
      v.questions?.forEach((_, qi) => {
        const key = `${v.id}_${qi}`
        const ref = doc(db, 'questionOverrides', key)
        unsubs.push(onSnapshot(ref, snap => {
          setOverrides(prev => ({
            ...prev,
            [key]: snap.exists() ? snap.data() : null,
          }))
        }))
      })
    })
    return () => unsubs.forEach(u => u())
  }, [])

  return (
    <div className="flex-col gap-16" style={{ width: '100%', maxWidth: '700px' }}>
      <div>
        <p className="section-heading">Video & Question Library</p>
        <p className="text-muted text-sm">
          Review every video and its 3 questions. Edit question text, options or correct answer — changes save to the cloud instantly.
          <br />
          <span style={{ color: 'var(--gold)' }}>Gold border = you have an override saved for that question.</span>
        </p>
      </div>

      {ROUND1_VIDEOS.map(video => {
        const isPending = video.videoId?.startsWith('PENDING')
        const isExpanded = expandedVideo === video.id
        const hasAnyOverride = video.questions?.some((_, qi) => overrides[`${video.id}_${qi}`])

        return (
          <div key={video.id} style={{
            borderRadius: '14px', overflow: 'hidden',
            border: hasAnyOverride
              ? '1px solid rgba(249,168,37,0.6)'
              : '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
          }}>
            {/* Video header */}
            <div
              onClick={() => setExpandedVideo(isExpanded ? null : video.id)}
              style={{
                padding: '14px 16px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--gold)', minWidth: '36px', fontSize: '0.85rem' }}>
                {video.id}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{video.title}</p>
                <p className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {isPending ? '⚠️ Video link pending' : `youtube.com/watch?v=${video.videoId}`}
                  {hasAnyOverride && <span style={{ color: 'var(--gold)', marginLeft: '8px' }}>✏️ Override saved</span>}
                </p>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>{isExpanded ? '▲' : '▼'}</span>
            </div>

            {/* Expanded content */}
            {isExpanded && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px' }}>
                {/* YouTube embed */}
                {!isPending && (
                  <div style={{
                    position: 'relative', paddingBottom: '45%', height: 0,
                    borderRadius: '10px', overflow: 'hidden', marginBottom: '16px',
                    border: '1px solid rgba(249,168,37,0.2)',
                  }}>
                    <iframe
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      src={`https://www.youtube.com/embed/${video.videoId}?rel=0${video.startAt ? `&start=${video.startAt}` : ''}`}
                      title={video.title} frameBorder="0" allowFullScreen
                    />
                  </div>
                )}

                {/* Questions */}
                <p className="text-muted text-sm" style={{ marginBottom: '12px' }}>
                  3 questions — members 0,3,6 get Q1 · members 1,4,7 get Q2 · members 2,5 get Q3
                </p>
                <div className="flex-col gap-16">
                  {video.questions?.map((defaultQ, qi) => {
                    const key = `${video.id}_${qi}`
                    const override = overrides[key]
                    return (
                      <QuestionEditor
                        key={qi}
                        qIndex={qi}
                        defaultQ={defaultQ}
                        override={override}
                        onSave={data => saveQuestionOverride(video.id, qi, data)}
                        onReset={() => deleteQuestionOverride(video.id, qi)}
                      />
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Question editor ──────────────────────────────────────────────────────────
function QuestionEditor({ qIndex, defaultQ, override, onSave, onReset }) {
  const active = override ?? defaultQ
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(null)
  const [saving, setSaving] = useState(false)

  function startEdit() {
    setDraft({
      q: active.q,
      options: [...active.options],
      correct: active.correct,
    })
    setEditing(true)
  }

  function cancelEdit() {
    setDraft(null)
    setEditing(false)
  }

  async function handleSave() {
    setSaving(true)
    await onSave(draft)
    setSaving(false)
    setEditing(false)
    setDraft(null)
  }

  async function handleReset() {
    if (!override) return
    if (!confirm('Remove override and restore original question?')) return
    setSaving(true)
    await onReset()
    setSaving(false)
  }

  const display = editing ? draft : active

  return (
    <div style={{
      borderRadius: '10px', padding: '14px',
      border: override
        ? '1px solid rgba(249,168,37,0.5)'
        : '1px solid rgba(255,255,255,0.07)',
      background: override ? 'rgba(249,168,37,0.05)' : 'rgba(255,255,255,0.03)',
    }}>
      {/* Q header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{
          fontWeight: 700, fontSize: '0.78rem',
          color: override ? 'var(--gold)' : 'var(--text-muted)',
        }}>
          Q{qIndex + 1} {override ? '✏️ Override' : '(default)'}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {override && !editing && (
            <button onClick={handleReset} disabled={saving} style={{
              padding: '4px 10px', borderRadius: '6px', border: '1px solid rgba(244,67,54,0.4)',
              background: 'rgba(244,67,54,0.1)', color: '#ef9a9a', cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem',
            }}>
              Reset to default
            </button>
          )}
          {!editing && (
            <button onClick={startEdit} style={{
              padding: '4px 12px', borderRadius: '6px', border: '1px solid rgba(249,168,37,0.4)',
              background: 'rgba(249,168,37,0.1)', color: 'var(--gold)', cursor: 'pointer',
              fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600,
            }}>
              ✏️ Edit
            </button>
          )}
        </div>
      </div>

      {/* Question text */}
      {editing ? (
        <textarea
          value={draft.q}
          onChange={e => setDraft(d => ({ ...d, q: e.target.value }))}
          style={{
            width: '100%', padding: '10px', borderRadius: '8px', fontSize: '0.88rem',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(249,168,37,0.4)',
            color: 'var(--text-primary)', fontFamily: 'Poppins, sans-serif',
            resize: 'vertical', minHeight: '72px', lineHeight: 1.5,
          }}
        />
      ) : (
        <p style={{ fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '10px' }}>
          {display?.q}
        </p>
      )}

      {/* Options */}
      <div className="flex-col gap-8" style={{ marginTop: '10px' }}>
        {(display?.options || []).map((opt, idx) => {
          const isCorrect = display?.correct === idx
          return (
            <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {/* Correct answer toggle */}
              {editing ? (
                <button
                  onClick={() => setDraft(d => ({ ...d, correct: idx }))}
                  style={{
                    width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                    border: '2px solid',
                    borderColor: draft.correct === idx ? '#4caf50' : 'rgba(255,255,255,0.2)',
                    background: draft.correct === idx ? '#4caf50' : 'transparent',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700, color: '#fff',
                  }}
                  title="Mark as correct answer"
                >
                  {draft.correct === idx ? '✓' : LETTERS[idx]}
                </button>
              ) : (
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.72rem', fontWeight: 700,
                  background: isCorrect ? '#4caf50' : 'rgba(255,255,255,0.1)',
                  color: isCorrect ? '#fff' : 'var(--text-muted)',
                }}>
                  {isCorrect ? '✓' : LETTERS[idx]}
                </div>
              )}

              {/* Option text */}
              {editing ? (
                <input
                  value={draft.options[idx]}
                  onChange={e => {
                    const opts = [...draft.options]
                    opts[idx] = e.target.value
                    setDraft(d => ({ ...d, options: opts }))
                  }}
                  style={{
                    flex: 1, padding: '7px 10px', borderRadius: '7px', fontSize: '0.82rem',
                    background: 'rgba(255,255,255,0.08)',
                    border: draft.correct === idx ? '1px solid #4caf50' : '1px solid rgba(255,255,255,0.15)',
                    color: 'var(--text-primary)', fontFamily: 'Poppins, sans-serif',
                  }}
                />
              ) : (
                <span style={{
                  flex: 1, fontSize: '0.83rem', padding: '6px 10px', borderRadius: '7px',
                  background: isCorrect ? 'rgba(76,175,80,0.15)' : 'rgba(255,255,255,0.03)',
                  border: isCorrect ? '1px solid rgba(76,175,80,0.4)' : '1px solid transparent',
                  color: isCorrect ? '#a5d6a7' : 'var(--text-muted)',
                  fontWeight: isCorrect ? 700 : 400,
                }}>
                  {opt}
                  {isCorrect && <span style={{ marginLeft: '8px', color: '#4caf50' }}>✅ Correct</span>}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Save / Cancel */}
      {editing && (
        <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 1, padding: '10px' }}>
            {saving ? 'Saving…' : '💾 Save Override'}
          </button>
          <button onClick={cancelEdit} className="btn-secondary">Cancel</button>
        </div>
      )}
    </div>
  )
}
