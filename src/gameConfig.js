// ─── PARTICIPANTS & GROUPS ──────────────────────────────────────────────────
export const PARTICIPANTS = [
  // ── Team 1: MAYUR ───────────────────────────────────────────────────────
  { id: 'p01', name: 'Rinki',    groupId: 'G1' },
  { id: 'p02', name: 'Rajni',    groupId: 'G1' },
  { id: 'p03', name: 'Monika',   groupId: 'G1' },
  { id: 'p04', name: 'Girdhari', groupId: 'G1' },
  { id: 'p05', name: 'Aarti',    groupId: 'G1' },
  { id: 'p06', name: 'Ratika',   groupId: 'G1' },
  // ── Team 2: MAKHAN CHORS ────────────────────────────────────────────────
  { id: 'p07', name: 'Poonam',  groupId: 'G2' },
  { id: 'p08', name: 'Shreya',  groupId: 'G2' },
  { id: 'p09', name: 'Rishu',   groupId: 'G2' },
  { id: 'p10', name: 'Nandan',  groupId: 'G2' },
  { id: 'p11', name: 'Anjalee', groupId: 'G2' },
  { id: 'p12', name: 'Vijaya',  groupId: 'G2' },
  // ── Team 3: BANSURI ─────────────────────────────────────────────────────
  { id: 'p13', name: 'Nishtha',  groupId: 'G3' },
  { id: 'p14', name: 'Pratyush', groupId: 'G3' },
  { id: 'p15', name: 'Twinkle',  groupId: 'G3' },
  { id: 'p16', name: 'Richa',    groupId: 'G3' },
  { id: 'p17', name: 'Anju',     groupId: 'G3' },
  { id: 'p18', name: 'Reena',    groupId: 'G3' },
  // ── Team 4: GOVARDHAN ───────────────────────────────────────────────────
  { id: 'p19', name: 'Arpit',    groupId: 'G4' },
  { id: 'p20', name: 'Sangeeta', groupId: 'G4' },
  { id: 'p21', name: 'Kritika',  groupId: 'G4' },
  { id: 'p22', name: 'Prachi',   groupId: 'G4' },
  { id: 'p23', name: 'Akshita',  groupId: 'G4' },
  { id: 'p24', name: 'Usha',     groupId: 'G4' },
  // ── Team 5: MAKHAN MISHRI ───────────────────────────────────────────────
  { id: 'p25', name: 'Neenu',   groupId: 'G5' },
  { id: 'p26', name: 'Kheyati', groupId: 'G5' },
  { id: 'p27', name: 'Tanupam', groupId: 'G5' },
  { id: 'p28', name: 'Sarita',  groupId: 'G5' },
  { id: 'p29', name: 'Sonia',   groupId: 'G5' },
  { id: 'p30', name: 'Manju',   groupId: 'G5' },
  // ── Team 6: RADHA RAMAN — 7 members ────────────────────────────────────
  { id: 'p31', name: 'Chandrika', groupId: 'G6' },
  { id: 'p32', name: 'Sanchit',  groupId: 'G6' },
  { id: 'p33', name: 'Devansh',  groupId: 'G6' },
  { id: 'p34', name: 'Pooja',    groupId: 'G6' },
  { id: 'p35', name: 'Suman',    groupId: 'G6' },
  { id: 'p36', name: 'Jayanthi', groupId: 'G6' },
  { id: 'p37', name: 'Sarika',   groupId: 'G6' },
]

export const GROUPS = {
  G1: { name: 'MAYUR',         subtitle: 'The Peacocks',         emoji: '🪶' },
  G2: { name: 'MAKHAN CHORS',  subtitle: 'The Butter Thieves',   emoji: '🧈' },
  G3: { name: 'BANSURI',       subtitle: 'The Flutes',           emoji: '🪕' },
  G4: { name: 'GOVARDHAN',     subtitle: 'The Mountain Lifters', emoji: '⛰️' },
  G5: { name: 'MAKHAN MISHRI', subtitle: 'The Sweet Blessings',  emoji: '🪶' },
  G6: { name: 'RADHA RAMAN',   subtitle: 'The Joy of Krishna',   emoji: '🌸' },
}

// ─── ROUND 1 — VIDEO QUESTIONS ──────────────────────────────────────────────
// Each video has 3 questions. Assignment: memberIndex % 3
//   Members 0,3,6 → Q0 | Members 1,4,7 → Q1 | Members 2,5 → Q2
// Guarantees teammates who see the same video on different days get different questions.
export const ROUND1_VIDEOS = [
  {
    id: 'v01', videoId: 'p4QnWct09Z0', startAt: 8, points: 10,
    title: 'Krishna Sudama — Sachchi Mitrata',
    questions: [
      {
        q: 'What did Krishna do to explain the meaning of Maya',
        options: ['He gave a long lecture on philosophy.', 'He sent the devotee into a real-life illusion.', 'He showed a magical vision in the sky.', 'He gave him a book to read.'],
        correct: 1,
      },
      {
        q: 'What happened to the devotee during the illusion of Maya?',
        options: ['He became a powerful king, got married, and faced great tragedy.', 'He stayed in the desert and could not find water.', 'He immediately woke up and realized it was a dream.', 'He traveled to heaven to meet the gods.'],
        correct: 0,
      },
      {
        q: 'What is the main moral lesson Krishna teaches through this illusion?',
        options: ['Being a king is the happiest life a person can have.', 'The world and its attachments can vanish like a dream, so do not lose sight of ultimate truth.', 'It is always a good idea to follow every traditional custom without questioning it.', 'You should never try to help someone look for water in a desert.'],
        correct: 1,
      },
    ],
  },
  {
    id: 'v02', videoId: '7AE8xG38jDw', points: 10,
    title: 'Sudama Garib Kyun Raha?',
    questions: [
      {
        q: 'According to this story, why did Sudama remain poor for most of his life despite being Krishna\'s dear friend?',
        options: ['He never worked hard enough', 'He secretly ate the food at gurukul that was meant to be shared with Krishna', 'He refused all of Krishna\'s gifts out of pride', 'He was cursed by sage Durvasa'],
        correct: 1,
      },
      {
        q: 'What subject did young Krishna and Sudama study together at their guru Sandipani\'s ashram?',
        options: ['Music and classical dance', 'The Vedas, scriptures and the art of warfare', 'Astrology and mathematics', 'Painting and sculpture'],
        correct: 1,
      },
      {
        q: 'When Sudama finally visited Krishna in Dwarka, how did Krishna receive his poor childhood friend?',
        options: ['He asked his guards to turn Sudama away', 'He welcomed him with tears of joy, washed his feet personally and gave him a royal seat', 'He gave him money quietly and sent him back', 'He asked Sudama to prove his identity first'],
        correct: 1,
      },
    ],
  },
  {
    id: 'v03', videoId: '-PO-DXp0M_0', points: 10,
    title: 'Laddu Gopal — Ek Bhakt ki Divya Kahani',
    questions: [
      {
        q: 'Why did the old woman stop remembering and praying to Krishna?',
        options: ['She became too tired and forgot her prayers.', 'She was angry at Krishna for not visiting her.', 'She heard that remembering someone causes them to get hiccups, and she wanted to protect Krishna from getting hurt.', 'She wanted to start praying to a different god.'],
        correct: 2,
      },
      {
        q: 'What did Krishna do when the old woman stopped remembering Him?',
        options: ['He got angry and punished her.', 'He appeared right in front of her and asked her to start praying and serving Him again.', 'He ignored her and went to another devotee.', 'He sent her a letter through a messenger.'],
        correct: 1,
      },
      {
        q: 'What is the main moral lesson about Bhakti (devotion) in this story?',
        options: ['God only cares about strict rules and expensive gifts.', 'True devotion is about a pure, innocent heart and selfless love, not about superstitions or fears.', 'You should stop praying if you think it will cause problems.', 'Older people should not do prayers or rituals.'],
        correct: 1,
      },
    ],
  },
  {
    id: 'v04', videoId: '6gHc6R23Eyo', points: 10,
    title: 'Krishna Leela — Divine Mystery',
    questions: [
      {
        q: 'Why did the old lady miss feeding the Khichdi to Lord Jagannath early in the morning?',
        options: ['She ran out of rice and lentils to cook.', 'She overslept because she was feeling unwell.', 'A priest told her she must strictly take a bath and follow rules before cooking, which delayed her.', 'She decided to go to the temple instead of cooking at home.'],
        correct: 2,
      },
      {
        q: 'What did Lord Jagannath do when he did not get his morning Khichdi on time?',
        options: ['He got angry and told the temple priests to punish the lady.', 'He ate food at the main temple instead and forgot about her.', 'He changed the rules of the temple forever.', 'He cried because he was hungry and went to her, telling her to feed him without worrying about other strict rules.'],
        correct: 3,
      },
      {
        q: 'What does Lord Jagannath's love for the old lady's Khichdi teach us?',
        options: ['God prefers complex temple rituals over a devotee's personal love.', 'You should only offer food to God if you are an expert cook.', 'Pure love and feeding God with a caring heart are much more important than rigid rituals and external rules.', 'People should never eat Khichdi in the morning.'],
        correct: 2,
      },
    ],
  },
  {
    id: 'v05', videoId: 'qin-Oqga9gY', points: 10,
    title: 'Shyam Kund & Radha Kund — The Divine Ponds',
    questions: [
      {
        q: 'On which specific occasion does bathing in Radha Kund grant the highest spiritual merit?',
        options: ['Janmashtami midnight', 'Kartik Purnima (full moon of Kartik)', 'Ashtami of Kartik — the 8th day after Diwali', 'Ekadashi — the 11th day of the lunar fortnight'],
        correct: 2,
      },
      {
        q: 'Radha Kund and Shyam Kund are sacred ponds associated with which divine couple?',
        options: ['Shiva and Parvati', 'Ram and Sita', 'Krishna and Radha', 'Vishnu and Lakshmi'],
        correct: 2,
      },
      {
        q: 'Near which famous holy hill are Radha Kund and Shyam Kund located?',
        options: ['The Himalayas', 'Govardhan Hill (near Mathura)', 'Vindhya Mountains', 'Kailash Parvat'],
        correct: 1,
      },
    ],
  },
  {
    id: 'v06', videoId: 'sHQg0Y-Grrk', points: 10,
    title: 'Krishna reveals his Divine Avatar',
    questions: [
      {
        q: 'When Arjun is confused by seeing both divine and demonic aspects in the Vishwaroop, how does Krishna resolve this duality?',
        options: ['He calls the demonic form an illusion.', 'He states he is both Dharma and Adharma.', 'He advises looking only toward the light.', 'He separates the physical and spiritual worlds.'],
        correct: 1,
      },
      {
        q: 'How does Krishna counter Arjun’s hesitation to fight his own family members?',
        options: ['He claims warriors cannot have families.', 'He promises they will all meet in heaven.', 'He lists past betrayals by those family members.', 'He states that kingdoms matter more than blood.'],
        correct: 2,
      },
      {
        q: 'What does Krishna mean when he calls Arjun a mere instrument (Nimitta) in the war?',
        options: ['Arjun holds the final power to decide who lives or dies.', 'Krishna has already decided the outcome, as he is the one who gives life and takes it away.', 'Arjun must find a way to escape his duties on the battlefield.', 'Arjun needs to punish everyone using his own personal anger.'],
        correct: 1,
      },
    ],
  },
  {
    id: 'v07', videoId: 'yrHWUOrW1_o', points: 10,
    title: 'Krishna Bhakti ka Chamatkaar',
    questions: [
      {
        q: 'What unusual thing did the cow do after eating the sacred Krishna Patta?',
        options: ['She ran away into the deep forest.', 'She started speaking and chanting the name "Krishna, Krishna!"', 'She stopped giving milk to her owner.', 'She fell asleep under a large banyan tree.'],
        correct: 1,
      },
      {
        q: 'What miracle happened when the Maharaj (king) brought the chanting cow near his sick wife?',
        options: ['The cow gave them a bucket of gold coins.', 'The king's wife suddenly woke up and was completely cured of her illness.', 'he queen decided to leave the palace to become a sadhu.', 'The illness spread to the rest of the kingdom.'],
        correct: 1,
      },
      {
        q: 'What is the main moral lesson behind the cow chanting Krishna's name?',
        options: ['Animals should only be fed holy leaves and nothing else.', 'Spiritual vibration and the name of God have immense healing power that can touch any soul, including animals.', 'Kings should always keep a cow inside their palace bedrooms.', 'You should only pray to God when a family member falls very sick.'],
        correct: 1,
      },
    ],
  },
  {
    id: 'v08', videoId: 'X-bRSyOcaUw', points: 10,
    title: 'Krishna Lifts Govardhan Mountain',
    questions: [
      {
        q: 'When Indra Dev sent devastating rains to punish Vrindavan, how many days did Lord Krishna hold up Govardhan Mountain?',
        options: ['3 days and 3 nights', '5 days and 5 nights', '7 days and 7 nights', '9 days and 9 nights'],
        correct: 2,
      },
      {
        q: 'Who was the rain god whose pride was challenged when Krishna lifted Govardhan Mountain?',
        options: ['Vayu Dev (wind god)', 'Surya Dev (sun god)', 'Indra Dev (rain and thunder god)', 'Varuna Dev (ocean god)'],
        correct: 2,
      },
      {
        q: 'After Krishna held Govardhan for 7 days and Indra\'s rage subsided, what did Indra do?',
        options: ['He launched another attack with more powerful storms', 'He declared eternal war against Krishna', 'He descended to earth, humbly apologised to Krishna and worshipped him with Surabhi the divine cow', 'He retreated silently, vowing never to return'],
        correct: 2,
      },
    ],
  },
  {
    id: 'v09', videoId: 'm6Y5CYeagFw', points: 10,
    title: 'Why Was Sudama Poor & Krishna a King?',
    questions: [
      {
        q: 'This video reveals the "secret sacrifice" behind Sudama\'s poverty. What did his lifelong poverty ultimately demonstrate?',
        options: ['God always punishes dishonesty, even small acts', 'Material wealth is irrelevant — Sudama\'s true treasure was his unbreakable love for Krishna', 'A brahmin\'s duty is always to remain poor', 'Krishna deliberately kept Sudama poor to test his loyalty'],
        correct: 1,
      },
      {
        q: 'After Sudama returned from Dwarka having received nothing obvious in return, what did he find at home?',
        options: ['His family had moved away, thinking he had abandoned them', 'His poor hut had transformed into a magnificent palace overflowing with wealth and happiness', 'A sealed letter from Krishna had arrived with instructions', 'Everything was exactly as he had left it — nothing had changed'],
        correct: 1,
      },
      {
        q: 'What humble gift did poor Sudama carry all the way to Dwarka for Krishna?',
        options: ['A bag of gold coins saved over many years', 'A handwoven shawl made lovingly by his wife', 'A small bundle of flattened rice (poha / chivda) wrapped in a torn piece of cloth', 'Fresh lotus flowers picked from the Yamuna river'],
        correct: 2,
      },
    ],
  },
  {
    id: 'v10', videoId: 'mUxTv7hTD2c', points: 10,
    title: 'Krishna & Sudama — A Beautiful Friendship',
    questions: [
      {
        q: 'When the poor Sudama visited Krishna\'s palace in Dwarka, what humble gift did he bring?',
        options: ['A bag of gold coins', 'A handwoven shawl', 'A small bundle of flattened rice (poha / chivda)', 'Fresh flowers from the Yamuna bank'],
        correct: 2,
      },
      {
        q: 'When Sudama arrived at Krishna\'s grand palace, what was going through his mind?',
        options: ['He felt proud and confident, expecting a big reward', 'He was shy and hesitant, wondering if his great king-friend would even remember a poor old man like him', 'He was angry about his poverty and planned to ask Krishna for help directly', 'He was joyful and dancing, singing bhajans all the way'],
        correct: 1,
      },
      {
        q: 'The friendship of Krishna and Sudama is the ultimate example of "Mitra Dharma". What does this mean?',
        options: ['"Satyameva Jayate" — truth alone triumphs', '"Vasudhaiva Kutumbakam" — the whole world is one family', 'The sacred duty of friendship — which transcends all worldly differences of wealth, status and time', '"Ahimsa Paramo Dharma" — non-violence is the highest duty'],
        correct: 2,
      },
    ],
  },
  // ── PENDING: 8 more videos (v11–v18) — add links and 3 questions each ──────
  { id: 'v11', videoId: 'Wox7-N3MYKg',playlistId: 'RDWox7-N3MYKg', points: 10, title: 'Krishna Leela 11', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v12', videoId: 'Feoea8FQTI0',playlistId: 'RDFeoea8FQTI0', points: 10, title: 'Krishna Leela 12', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v13', videoId: '3YLog5mrAYM',playlistId: 'RD3YLog5mrAYM', points: 10, title: 'Krishna Leela 13', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v14', videoId: 'GIFgAcZcEFQ',playlistId: 'RDGIFgAcZcEFQ', points: 10, title: 'Krishna Leela 14', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v15', videoId: 'g883CDeZtBA',playlistId: 'RDg883CDeZtBA', points: 10, title: 'Krishna Leela 15', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v16', videoId: 'LqrgTZWTvB4',playlistId: 'RDLqrgTZWTvB4', points: 10, title: 'Krishna Leela 16', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v17', videoId: 'FWi2kkoLumk', points: 10, title: 'Krishna Leela 17', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v18', videoId: 'po8a5tDQkaM', points: 10, title: 'Krishna Leela 18', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v19', videoId: 'j5gUr6O1i4o', points: 10, title: 'Krishna Leela 19', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },

]

// ─── GAME STRUCTURE ──────────────────────────────────────────────────────────
export const TOTAL_SECTIONS = 9
export const DAYS_PER_SECTION = 9
export const TOTAL_DAYS = 81

export const SECTIONS = [
  { id: 1, name: 'Krishna Leela Videos', type: 'video', emoji: '🎬' },
  { id: 2, name: 'Section 2', type: 'tbd', emoji: '🎵' },
  { id: 3, name: 'Section 3', type: 'tbd', emoji: '🎭' },
  { id: 4, name: 'Section 4', type: 'tbd', emoji: '📖' },
  { id: 5, name: 'Section 5', type: 'tbd', emoji: '🎨' },
  { id: 6, name: 'Section 6', type: 'tbd', emoji: '🎶' },
  { id: 7, name: 'Section 7', type: 'tbd', emoji: '🧩' },
  { id: 8, name: 'Section 8', type: 'tbd', emoji: '🌟' },
  { id: 9, name: 'Section 9', type: 'tbd', emoji: '🏆' },
]

// ─── ADMIN CONFIG ─────────────────────────────────────────────────────────────
export const ADMIN_PASSWORD = 'krishna2026'

// ─── ASSIGNMENT ALGORITHM ────────────────────────────────────────────────────
// Returns { video, questionIndex, question } for a participant on a given day.
// Guarantees:
//   • No two teammates see the same video on the same day
//   • No participant sees the same video twice across 9 days
//   • Teammates who see the same video on different days get different questions
//     (questionIndex = memberIndex % 3)
export function getAssignmentForDay(participantId, dayNumber) {
  const totalVideos = ROUND1_VIDEOS.length

  const groupMap = {}
  PARTICIPANTS.forEach(p => {
    if (!groupMap[p.groupId]) groupMap[p.groupId] = []
    groupMap[p.groupId].push(p.id)
  })

  const participant = PARTICIPANTS.find(p => p.id === participantId)
  if (!participant) return null

  const members = groupMap[participant.groupId]
  const memberIndex = members.indexOf(participantId)
  const d = dayNumber - 1

  const videoIndex = (memberIndex * 2 + d * 7) % totalVideos
  const video = ROUND1_VIDEOS[videoIndex]
  const questionIndex = memberIndex % (video.questions?.length || 1)
  const question = video.questions?.[questionIndex] ?? null

  return { video, questionIndex, question }
}

export function getVideoForDay(participantId, dayNumber) {
  return getAssignmentForDay(participantId, dayNumber)?.video ?? null
}
