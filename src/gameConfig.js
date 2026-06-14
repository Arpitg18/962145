// ─── PARTICIPANTS & GROUPS ──────────────────────────────────────────────────
// Add all participants here. groupId must match a key in GROUPS below.
export const PARTICIPANTS = [
  // Example entries — replace with real names & group assignments
  { id: 'p01', name: 'Arpit', groupId: 'G1' },
  { id: 'p02', name: 'Priya', groupId: 'G1' },
  { id: 'p03', name: 'Rahul', groupId: 'G1' },
  { id: 'p04', name: 'Sneha', groupId: 'G1' },
  { id: 'p05', name: 'Vikram', groupId: 'G1' },
  { id: 'p06', name: 'Ananya', groupId: 'G1' },

  { id: 'p07', name: 'Rohan', groupId: 'G2' },
  { id: 'p08', name: 'Meera', groupId: 'G2' },
  { id: 'p09', name: 'Karan', groupId: 'G2' },
  { id: 'p10', name: 'Divya', groupId: 'G2' },
  { id: 'p11', name: 'Aditya', groupId: 'G2' },
  { id: 'p12', name: 'Pooja', groupId: 'G2' },

  { id: 'p13', name: 'Nikhil', groupId: 'G3' },
  { id: 'p14', name: 'Simran', groupId: 'G3' },
  { id: 'p15', name: 'Amit', groupId: 'G3' },
  { id: 'p16', name: 'Kavya', groupId: 'G3' },
  { id: 'p17', name: 'Saurabh', groupId: 'G3' },
  { id: 'p18', name: 'Riya', groupId: 'G3' },

  { id: 'p19', name: 'Dev', groupId: 'G4' },
  { id: 'p20', name: 'Tanvi', groupId: 'G4' },
  { id: 'p21', name: 'Harsh', groupId: 'G4' },
  { id: 'p22', name: 'Nidhi', groupId: 'G4' },
  { id: 'p23', name: 'Yash', groupId: 'G4' },
  { id: 'p24', name: 'Isha', groupId: 'G4' },

  { id: 'p25', name: 'Vivek', groupId: 'G5' },
  { id: 'p26', name: 'Ritika', groupId: 'G5' },
  { id: 'p27', name: 'Shubham', groupId: 'G5' },
  { id: 'p28', name: 'Ankita', groupId: 'G5' },
  { id: 'p29', name: 'Gaurav', groupId: 'G5' },
  { id: 'p30', name: 'Deepika', groupId: 'G5' },

  { id: 'p31', name: 'Mohit', groupId: 'G6' },
  { id: 'p32', name: 'Sakshi', groupId: 'G6' },
  { id: 'p33', name: 'Rajesh', groupId: 'G6' },
  { id: 'p34', name: 'Neha', groupId: 'G6' },
  { id: 'p35', name: 'Kunal', groupId: 'G6' },
  { id: 'p36', name: 'Shruti', groupId: 'G6' },

  { id: 'p37', name: 'Abhinav', groupId: 'G7' },
  { id: 'p38', name: 'Pallavi', groupId: 'G7' },
  { id: 'p39', name: 'Sumit', groupId: 'G7' },
  { id: 'p40', name: 'Jyoti', groupId: 'G7' },
  { id: 'p41', name: 'Kartik', groupId: 'G7' },
  { id: 'p42', name: 'Swati', groupId: 'G7' },
]

export const GROUPS = {
  G1: { name: 'Gopas', emoji: '🦚' },
  G2: { name: 'Gopis', emoji: '🌸' },
  G3: { name: 'Sudarshanas', emoji: '🔵' },
  G4: { name: 'Mathuras', emoji: '🪈' },
  G5: { name: 'Vrindavanas', emoji: '🌿' },
  G6: { name: 'Dwarkas', emoji: '⚡' },
  G7: { name: 'Panchalas', emoji: '🎯' },
}

// ─── ROUND 1 — VIDEO QUESTIONS ──────────────────────────────────────────────
// 10 videos with questions (difficulty: E=Easy, M=Medium, D=Difficult)
// Correct answer index is 0-based (0=A, 1=B, 2=C, 3=D)
export const ROUND1_VIDEOS = [
  {
    id: 'v01',
    videoId: 'p4QnWct09Z0',
    startAt: 8,
    difficulty: 'E',
    title: 'कृष्णा सुदामा — सच्ची मित्रता',
    // Easy — central character is well known
    question: 'In this story of "Sachchi Mitrata" (True Friendship), who was Lord Krishna\'s most beloved childhood friend?',
    options: ['Arjuna', 'Sudama', 'Balrama', 'Eklavya'],
    correctOption: 1,
    points: 10,
  },
  {
    id: 'v02',
    videoId: '7AE8xG38jDw',
    difficulty: 'M',
    title: 'सुदामा गरीब क्यों रह गए?',
    // Medium — the gurukul food incident is the specific cause
    question: 'According to this story, why did Sudama remain poor for most of his life despite being Krishna\'s dear friend?',
    options: [
      'He never worked hard enough',
      'He secretly ate the food at gurukul that was meant to be shared with Krishna',
      'He refused all of Krishna\'s gifts out of pride',
      'He was cursed by sage Durvasa',
    ],
    correctOption: 1,
    points: 10,
  },
  {
    id: 'v03',
    videoId: '-PO-DXp0M_0',
    difficulty: 'M',
    title: 'लड्डू गोपाल — एक भक्त की दिव्य कहानी',
    // Medium — requires knowing what Laddu Gopal represents
    question: '"Laddu Gopal" is a beloved deity form worshipped in Hindu homes. Which form of the divine does Laddu Gopal represent?',
    options: [
      'Lord Ganesha as a child',
      'Lord Shiva in his dancing form',
      'Infant Lord Krishna (Bal Krishna)',
      'Lord Vishnu in his four-armed form',
    ],
    correctOption: 2,
    points: 10,
  },
  {
    id: 'v04',
    videoId: '6gHc6R23Eyo',
    difficulty: 'D',
    title: 'Krishna Leela — Divine Mystery',
    // Difficult — tests deeper knowledge of Krishna's attributes
    question: 'Lord Krishna is known by 108 names. Which of the following names specifically means "the one who attracts everyone" — and is considered his most universal name?',
    options: [
      'Govinda',
      'Madhava',
      'Krishna',
      'Murari',
    ],
    correctOption: 2,
    points: 10,
  },
  {
    id: 'v05',
    videoId: 'qin-Oqga9gY',
    difficulty: 'D',
    title: 'Shyam Kund & Radha Kund — The Divine Ponds',
    // Difficult — specific sacred geography
    question: 'Radha Kund and Shyam Kund are two supremely sacred ponds. According to scripture, bathing in Radha Kund on which specific occasion grants the highest spiritual merit?',
    options: [
      'Janmashtami (Krishna\'s birth midnight)',
      'Kartik Purnima (full moon in the month of Kartik)',
      'Ashtami of Kartik (8th day after Diwali)',
      'Ekadashi (the 11th day of every lunar fortnight)',
    ],
    correctOption: 2,
    points: 10,
  },
  {
    id: 'v06',
    videoId: 'q00sSXPtUWE',
    difficulty: 'E',
    title: 'माखन चोर — Makhan Chor Krishna',
    // Easy — "butter thief" is one of Krishna's most famous childhood traits
    question: 'Young Krishna was famously called "Makhan Chor". What does "Makhan" mean, and what did Krishna love to steal?',
    options: [
      'Milk — he would drink from the cows directly',
      'Butter — he would sneak into neighbours\' homes to steal freshly churned butter',
      'Sweets — he would steal laddoos from the temple offerings',
      'Flowers — he would steal them from Radha\'s garden',
    ],
    correctOption: 1,
    points: 10,
  },
  {
    id: 'v07',
    videoId: 'yrHWUOrW1_o',
    difficulty: 'M',
    title: 'कृष्ण भक्ति का चमत्कार',
    // Medium — about the transformative power of devotion
    question: 'This video explores the "Chamatkaar" (miracle) of Krishna Bhakti. According to Hindu tradition, what is the highest fruit of true devotion (Bhakti) to Lord Krishna?',
    options: [
      'Accumulation of great wealth and prosperity',
      'Victory over all enemies in battle',
      'Liberation (Moksha) — freedom from the cycle of birth and death',
      'Gaining supernatural powers (Siddhis)',
    ],
    correctOption: 2,
    points: 10,
  },
  {
    id: 'v08',
    videoId: 'X-bRSyOcaUw',
    difficulty: 'M',
    title: 'Krishna Lifts Govardhan Mountain',
    // Medium — well known story but the "7 days" detail is not always remembered
    question: 'When Indra Dev sent devastating rains to punish Vrindavan, Lord Krishna lifted Govardhan Mountain to shelter the villagers. For how many continuous days did Krishna hold up the mountain?',
    options: [
      '3 days and 3 nights',
      '5 days and 5 nights',
      '7 days and 7 nights',
      '9 days and 9 nights',
    ],
    correctOption: 2,
    points: 10,
  },
  {
    id: 'v09',
    videoId: '-UZdJa1ul9Y',
    difficulty: 'D',
    title: 'Why Was Sudama Poor & Krishna a King? — The Secret Sacrifice',
    // Difficult — the "secret sacrifice" angle is the deeper teaching
    question: 'This video reveals a "secret sacrifice" behind Sudama\'s poverty and Krishna\'s kingship. According to this teaching, what did Sudama\'s lifelong poverty ultimately demonstrate?',
    options: [
      'That God punishes those who are dishonest, even in small matters',
      'That material wealth is irrelevant — Sudama\'s true treasure was his unbreakable love for Krishna',
      'That a brahmin\'s duty is to remain poor and detached from wealth',
      'That Krishna deliberately kept Sudama poor to test his loyalty',
    ],
    correctOption: 1,
    points: 10,
  },
  {
    id: 'v10',
    videoId: 'Vv-l6XaosVc',
    difficulty: 'E',
    title: 'Krishna & Sudama — A Beautiful Friendship',
    // Easy — the core moral is universally known
    question: 'When the poor Sudama finally visited Krishna\'s magnificent palace in Dwarka, what humble gift did he bring for his childhood friend?',
    options: [
      'A bag of gold coins he had saved for years',
      'A handwoven shawl made by his wife',
      'A small bundle of flattened rice (poha / chivda) hidden in his torn cloth',
      'Fresh flowers from the Yamuna riverbank',
    ],
    correctOption: 2,
    points: 10,
  },
  // ── PENDING: 8 more video links needed (v11–v18) ─────────────────────────
  {
    id: 'v11',
    videoId: 'PENDING_11',
    title: 'Krishna Leela 11',
    question: '⬅️ Add video link + question',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOption: 0,
    points: 10,
  },
  {
    id: 'v12',
    videoId: 'PENDING_12',
    title: 'Krishna Leela 12',
    question: '⬅️ Add video link + question',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOption: 0,
    points: 10,
  },
  {
    id: 'v13',
    videoId: 'PENDING_13',
    title: 'Krishna Leela 13',
    question: '⬅️ Add video link + question',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOption: 0,
    points: 10,
  },
  {
    id: 'v14',
    videoId: 'PENDING_14',
    title: 'Krishna Leela 14',
    question: '⬅️ Add video link + question',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOption: 0,
    points: 10,
  },
  {
    id: 'v15',
    videoId: 'PENDING_15',
    title: 'Krishna Leela 15',
    question: '⬅️ Add video link + question',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOption: 0,
    points: 10,
  },
  {
    id: 'v16',
    videoId: 'PENDING_16',
    title: 'Krishna Leela 16',
    question: '⬅️ Add video link + question',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOption: 0,
    points: 10,
  },
  {
    id: 'v17',
    videoId: 'PENDING_17',
    title: 'Krishna Leela 17',
    question: '⬅️ Add video link + question',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOption: 0,
    points: 10,
  },
  {
    id: 'v18',
    videoId: 'PENDING_18',
    title: 'Krishna Leela 18',
    question: '⬅️ Add video link + question',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctOption: 0,
    points: 10,
  },
]

// ─── VIDEO ASSIGNMENT ALGORITHM ─────────────────────────────────────────────
// Assigns videos to participants so:
// • No two participants in the same group get the same video
// • Videos are spread as evenly as possible across groups
// Returns: { participantId: videoId, ... }
export function assignVideosToParticipants() {
  const assignment = {}
  const groupMap = {}

  // Group participants by groupId
  PARTICIPANTS.forEach(p => {
    if (!groupMap[p.groupId]) groupMap[p.groupId] = []
    groupMap[p.groupId].push(p.id)
  })

  const totalVideos = ROUND1_VIDEOS.length // 18

  Object.entries(groupMap).forEach(([groupId, memberIds], groupIndex) => {
    memberIds.forEach((pid, memberIndex) => {
      // Offset starting video per group to minimize cross-group overlap
      const videoIndex = (groupIndex * memberIds.length + memberIndex) % totalVideos
      assignment[pid] = ROUND1_VIDEOS[videoIndex].id
    })
  })

  return assignment
}

export const TOTAL_ROUNDS = 9
