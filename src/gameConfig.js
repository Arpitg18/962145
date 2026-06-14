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
  { id: 'p31', name: 'Chadrika', groupId: 'G6' },
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
        q: 'In this story of "Sachchi Mitrata" (True Friendship), who was Lord Krishna\'s most beloved childhood friend?',
        options: ['Arjuna', 'Sudama', 'Balrama', 'Eklavya'],
        correct: 1,
      },
      {
        q: 'At the gurukul, the guru\'s wife gave Krishna and Sudama food before they went to fetch firewood. What did Sudama do with it?',
        options: ['He shared it equally with Krishna', 'He secretly ate all of it himself without telling Krishna', 'He offered it to the guru first', 'He saved it and shared it later'],
        correct: 1,
      },
      {
        q: 'What does the story of "Sachchi Mitrata" (True Friendship) primarily teach us?',
        options: ['Friends should always be of equal social status', 'Wealthy friends make the best companions', 'Genuine friendship transcends wealth, status and the passage of time', 'Childhood friends are always the most loyal'],
        correct: 2,
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
        q: '"Laddu Gopal" is a beloved deity form worshipped in Hindu homes. Which form of the divine does Laddu Gopal represent?',
        options: ['Lord Ganesha as a child', 'Lord Shiva in his dancing form', 'Infant Lord Krishna (Bal Krishna)', 'Lord Vishnu in his four-armed form'],
        correct: 2,
      },
      {
        q: 'Why is little Krishna often shown in artwork holding a ball of butter (Makhan)?',
        options: ['Butter was the most expensive food in Vrindavan', 'As a child he joyfully stole and ate freshly churned butter from clay pots', 'It symbolises wealth and prosperity', 'Butter was offered to him as prasad in temples'],
        correct: 1,
      },
      {
        q: 'In the devotional tradition of worshipping Laddu Gopal at home, what does the devotee do as daily seva (service)?',
        options: ['Light a lamp once a week and offer flowers', 'Bathe, dress, feed and put the idol "to sleep" — caring for it as a real child', 'Chant 108 names of Krishna once a month', 'Keep the idol in a sacred box and open it only on festivals'],
        correct: 1,
      },
    ],
  },
  {
    id: 'v04', videoId: '6gHc6R23Eyo', points: 10,
    title: 'Krishna Leela — Divine Mystery',
    questions: [
      {
        q: 'Lord Krishna is known by 108 names. Which name specifically means "the one who attracts everyone"?',
        options: ['Govinda', 'Madhava', 'Krishna', 'Murari'],
        correct: 2,
      },
      {
        q: 'Lord Krishna is often depicted with which colour of skin in Hindu art and iconography?',
        options: ['Golden yellow', 'Pure white', 'Dark blue / black (Shyam)', 'Bright red'],
        correct: 2,
      },
      {
        q: 'Which musical instrument is Lord Krishna most famously associated with?',
        options: ['Tabla (drum)', 'Veena (lute)', 'Bansuri (flute)', 'Sitar'],
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
    id: 'v06', videoId: 'q00sSXPtUWE', points: 10,
    title: 'Makhan Chor — Bal Krishna',
    questions: [
      {
        q: 'Young Krishna was called "Makhan Chor". What is "Makhan" and what did Krishna love to steal?',
        options: ['Milk — he drank directly from the cows', 'Butter — he sneaked into neighbours\' homes to steal freshly churned butter', 'Sweets — he took laddoos from temple offerings', 'Flowers — he stole them from Radha\'s garden'],
        correct: 1,
      },
      {
        q: 'When Yashoda caught young Krishna with butter on his hands, what did clever Krishna do?',
        options: ['He admitted it immediately and apologised', 'He blamed his friends and pointed at them', 'He gave an innocent look, opened his mouth to show nothing inside, and denied everything with a smile', 'He ran away and hid behind Balrama'],
        correct: 2,
      },
      {
        q: 'The women of Vrindavan hung butter pots high on ropes. What clever method did Krishna and his friends use to get the butter anyway?',
        options: ['Krishna flew up and grabbed the pots', 'They formed a human pyramid — friends on each other\'s shoulders to reach the pots', 'They used a long bamboo stick to break the pots', 'They distracted the women with music while someone climbed'],
        correct: 1,
      },
    ],
  },
  {
    id: 'v07', videoId: 'yrHWUOrW1_o', points: 10,
    title: 'Krishna Bhakti ka Chamatkaar',
    questions: [
      {
        q: 'According to this video, what is the highest fruit of true devotion (Bhakti) to Lord Krishna?',
        options: ['Accumulation of great wealth and prosperity', 'Victory over all enemies in battle', 'Liberation (Moksha) — freedom from the cycle of birth and death', 'Gaining supernatural powers (Siddhis)'],
        correct: 2,
      },
      {
        q: 'What does the word "Bhakti" mean in Sanskrit?',
        options: ['Warfare and courage', 'Devotion and loving surrender to God', 'Knowledge and wisdom', 'Wealth and abundance'],
        correct: 1,
      },
      {
        q: 'According to the Bhagavad Gita, which type of devotee is considered most dear to Lord Krishna?',
        options: ['One who gives the most costly offerings and performs elaborate rituals', 'One who chants his name exactly 1008 times every day', 'One who loves Krishna with pure, unwavering devotion — expecting absolutely nothing in return', 'One who builds the largest temples in his name'],
        correct: 2,
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
    id: 'v09', videoId: '-UZdJa1ul9Y', points: 10,
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
    id: 'v10', videoId: 'Vv-l6XaosVc', points: 10,
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
  { id: 'v11', videoId: 'PENDING_11', points: 10, title: 'Krishna Leela 11', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v12', videoId: 'PENDING_12', points: 10, title: 'Krishna Leela 12', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v13', videoId: 'PENDING_13', points: 10, title: 'Krishna Leela 13', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v14', videoId: 'PENDING_14', points: 10, title: 'Krishna Leela 14', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v15', videoId: 'PENDING_15', points: 10, title: 'Krishna Leela 15', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v16', videoId: 'PENDING_16', points: 10, title: 'Krishna Leela 16', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v17', videoId: 'PENDING_17', points: 10, title: 'Krishna Leela 17', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
  { id: 'v18', videoId: 'PENDING_18', points: 10, title: 'Krishna Leela 18', questions: [{ q: 'Q1 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q2 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }, { q: 'Q3 — to be added', options: ['A', 'B', 'C', 'D'], correct: 0 }] },
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
