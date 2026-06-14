import { GROUPS } from '../gameConfig'

export default function ScoreBoard({ participant, myScore, teamScore, teamName, groupId }) {
  const group = GROUPS[groupId]

  return (
    <div className="card card-wide flex-col gap-20">
      <div className="text-center">
        <span style={{ fontSize: '2rem' }}>{group?.emoji}</span>
        <h2 className="section-heading mt-8">{group?.emoji} {group?.name}</h2>
        <p className="text-muted text-sm">{group?.subtitle}</p>
        <p className="text-muted text-sm mt-4">Your scores are private — only you can see your individual score</p>
      </div>

      <div className="divider" />

      {/* Score tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <ScoreTile
          label="My Score"
          value={myScore}
          icon="⭐"
          subtitle="Individual"
          color="var(--gold)"
        />
        <ScoreTile
          label="Team Score"
          value={teamScore}
          icon="🏆"
          subtitle={`Team ${group?.name}`}
          color="#81d4fa"
        />
      </div>

      <div className="divider" />

      {/* Points breakdown hint */}
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '12px',
        padding: '14px 18px',
      }}>
        <p className="text-sm text-muted" style={{ lineHeight: 1.7 }}>
          🌸 Each correct answer earns <strong style={{ color: 'var(--gold)' }}>10 points</strong><br />
          🦚 Team score = sum of all member scores<br />
          🪈 9 rounds · 9 questions each
        </p>
      </div>
    </div>
  )
}

function ScoreTile({ label, value, icon, subtitle, color }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${color}33`,
      borderRadius: '16px',
      padding: '20px 16px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '1.8rem', marginBottom: '4px' }}>{icon}</div>
      <div style={{
        fontSize: '2rem',
        fontWeight: 700,
        color,
        fontFamily: 'Cinzel Decorative, serif',
        marginBottom: '4px',
      }}>
        {value ?? 0}
      </div>
      <div style={{ fontSize: '0.8rem', fontWeight: 600, color }}>{label}</div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{subtitle}</div>
    </div>
  )
}
