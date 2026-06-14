import { GROUPS, TOTAL_SECTIONS, DAYS_PER_SECTION } from '../gameConfig'

const TOTAL_DAYS = TOTAL_SECTIONS * DAYS_PER_SECTION // 81
const MAX_SCORE  = TOTAL_DAYS * 10                   // 810

export default function ScoreCard({ participant, myScore, teamScore, daysAnswered }) {
  const group = GROUPS[participant.groupId]
  const pct   = Math.round((myScore / MAX_SCORE) * 100)

  async function handleShare() {
    const text =
      `🦚 Janmashtami Quiz 2026 🦚\n\n` +
      `I am ${participant.name} from Team ${group?.name} ${group?.emoji}\n` +
      `⭐ My Score: ${myScore} pts\n` +
      `🏆 Team Score: ${teamScore} pts\n` +
      `📅 Days played: ${daysAnswered} / ${TOTAL_DAYS}\n\n` +
      `Jay Shri Krishna! 🪈\njanmashtami-2026.netlify.app`

    if (navigator.share) {
      try { await navigator.share({ title: 'Janmashtami Quiz 2026', text }) } catch {}
    } else {
      await navigator.clipboard.writeText(text)
      alert('Score copied to clipboard! Paste it in WhatsApp 🎉')
    }
  }

  return (
    <div className="flex-col gap-16" style={{ width: '100%', maxWidth: '440px' }}>

      {/* The card itself */}
      <div style={{
        borderRadius: '20px', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d0d2b 0%, #1a1050 50%, #0d1b4b 100%)',
        border: '2px solid rgba(249,168,37,0.5)',
        boxShadow: '0 0 40px rgba(249,168,37,0.2)',
        padding: '28px 24px',
        position: 'relative',
      }}>
        {/* Decorative corner emojis */}
        <span style={{ position: 'absolute', top: 12, left: 14, fontSize: '1.4rem', opacity: 0.4 }}>🦚</span>
        <span style={{ position: 'absolute', top: 12, right: 14, fontSize: '1.4rem', opacity: 0.4 }}>🪈</span>
        <span style={{ position: 'absolute', bottom: 12, left: 14, fontSize: '1.4rem', opacity: 0.4 }}>🌸</span>
        <span style={{ position: 'absolute', bottom: 12, right: 14, fontSize: '1.4rem', opacity: 0.4 }}>⛰️</span>

        {/* Title */}
        <p style={{
          textAlign: 'center', fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '0.15em', color: 'rgba(249,168,37,0.7)', marginBottom: '4px',
        }}>
          JANMASHTAMI QUIZ 2026
        </p>
        <p style={{ textAlign: 'center', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginBottom: '20px' }}>
          81 Days · 9 Sections · Jay Shri Krishna
        </p>

        {/* Participant name */}
        <p style={{
          textAlign: 'center', fontSize: '1.6rem', fontWeight: 800,
          color: '#fff', letterSpacing: '0.02em',
        }}>
          {participant.name}
        </p>
        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '20px' }}>
          {group?.emoji} {group?.name} — {group?.subtitle}
        </p>

        {/* Score tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <ScoreTile icon="⭐" label="My Score" value={myScore} color="var(--gold)" />
          <ScoreTile icon="🏆" label="Team Score" value={teamScore} color="#81d4fa" />
          <ScoreTile icon="📅" label="Days Played" value={`${daysAnswered}/${TOTAL_DAYS}`} color="#ce93d8" />
          <ScoreTile icon="📊" label="Accuracy" value={`${pct}%`} color="#a5d6a7" />
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>
            <span>Progress</span>
            <span>{myScore} / {MAX_SCORE} pts</span>
          </div>
          <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)' }}>
            <div style={{
              height: '100%', borderRadius: '3px', width: `${Math.min(pct, 100)}%`,
              background: 'linear-gradient(90deg, var(--gold), var(--saffron-light))',
              transition: 'width 1s ease',
            }} />
          </div>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>
          janmashtami-2026.netlify.app
        </p>
      </div>

      {/* Share button */}
      <button className="btn-primary" onClick={handleShare} style={{ fontSize: '0.95rem' }}>
        📤 Share on WhatsApp
      </button>
      <p className="text-muted text-sm text-center" style={{ marginTop: '-8px' }}>
        On mobile: tap Share → WhatsApp. On desktop: copies text to clipboard.
      </p>
    </div>
  )
}

function ScoreTile({ icon, label, value, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.05)', borderRadius: '12px',
      padding: '14px 12px', textAlign: 'center',
      border: `1px solid ${color}33`,
    }}>
      <div style={{ fontSize: '1.3rem', marginBottom: '2px' }}>{icon}</div>
      <div style={{ fontSize: '1.3rem', fontWeight: 800, color, lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{label}</div>
    </div>
  )
}
