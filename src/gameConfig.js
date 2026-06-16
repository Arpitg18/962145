// ─── PARTICIPANTS & GROUPS ──────────────────────────────────────────────────
export const PARTICIPANTS = [
  // ── Team 1: MAYUR ───────────────────────────────────────────────────────
  { id: 'p01', name: 'Rinki',    groupId: 'G1' },
  { id: 'p02', name: 'Rajni',    groupId: 'G1' },
  { id: 'p03', name: 'Monika',   groupId: 'G1' },
  { id: 'p04', name: 'Girdhari', groupId: 'G1' },
  { id: 'p05', name: 'Aarti',    groupId: 'G1' },
  { id: 'p06', name: 'Ratika',   groupId: 'G1' },
  { id: 'p18', name: 'Reena',   groupId: 'G1' },  
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
  { id: 'p38', name: 'Pankaj',    groupId: 'G3' },
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
  { id: 'p30', name: 'Garima',   groupId: 'G5' },
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
        q: 'What did Krishna do when the old woman stopped remembering him?',
        options: ['He got angry and punished her.', 'He appeared right in front of her and asked her to start praying and serving him again.', 'He ignored her and went to another devotee.', 'He sent her a letter through a messenger.'],
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
        q: "What does Lord Jagannath's love for the old lady's Khichdi teach us?",
        options: ["God prefers complex temple rituals over a devotee's personal love.", 'You should only offer food to God if you are an expert cook.', 'Pure love and feeding God with a caring heart are much more important than rigid rituals and external rules.', 'People should never eat Khichdi in the morning.'],
        correct: 2,
      },
    ],
  },
  {
    id: 'v05', videoId: '5DMgv1w05d0', points: 10,
    title: 'How Jagannath Calmed Angry Lakshmi',
    questions: [
        { 
    q: 'Why did Goddess Lakshmi get angry with Lord Jagannath during the Rath Yatra festival?', 
    options: [
      'Because He forgot her birthday.', 
      'Because He went on a vacation to the Gundicha temple with His siblings and left her behind.', 
      'Because He did not like the food she cooked.', 
      'Because He lost the palace keys.'
    ], 
    correct: 1 
  },
  { 
    q: 'What does Goddess Lakshmi do at the Gundicha temple to show her anger when Lord Jagannath stays away too long?', 
    options: [
      'She breaks a portion of Lord Jagannath\'s chariot (Nandighosha).', 
      'She locks up all the food in the temple kitchen.', 
      'She goes back to her parents\' house forever.', 
      'She creates a massive storm in the city.'
    ], 
    correct: 0 
  },
  { 
    q: 'When Lord Jagannath finally returns to the main temple, how does He calm Goddess Lakshmi down and get her to open the locked gates?', 
    options: [
      'He commands her to open the door because He is the king.', 
      'He promises to never go out of the palace again.', 
      'He sweet-talks her, apologizes, and offers her a special Rasgulla sweet to melt her heart.', 
      'He asks the village elders to scold her.'
    ], 
    correct: 2 
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
        options: ['The cow gave them a bucket of gold coins.', "The king's wife suddenly woke up and was completely cured of her illness.", 'he queen decided to leave the palace to become a sadhu.', 'The illness spread to the rest of the kingdom.'],
        correct: 1,
      },
      {
        q: "What is the main moral lesson behind the cow chanting Krishna's name?" ,
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
        options: ['He launched another attack with more powerful storms', 'He declared eternal war against Krishna', 'He descended to earth, humbly apologised to Krishna', 'He retreated silently, vowing never to return'],
        correct: 2,
      },
    ],
  },
  {
    id: 'v09', videoId: 'm6Y5CYeagFw', points: 10,
    title: 'The Divine Journey of Shrinathji',
    questions: [
      { 
    q: 'Why did the priests and devotees secretly put the sacred idol of Shrinathji in a chariot and leave Govardhan Hill?', 
    options: [
      'They wanted to find a bigger temple with a larger kitchen.', 
      'The Mughal Emperor Aurangzeb had ordered the destruction of Hindu temples, and they needed to keep the idol safe from his army.', 
      'They were invited to a grand festival in South India.', 
      'The weather at Govardhan Hill became too cold for the deity.'
    ], 
    correct: 1 
  },
  { 
    q: 'During the dangerous journey, how did Shrinathji miraculously protect his devotees when Aurangzeb’s army came close to them at the Chambal river?', 
    options: [
      'He made a massive wall of fire appear between them.', 
      'He made the simple wooden chariot look like a huge, scary mountain from a distance, making the enemy army run away in fear.', 
      'He made the river turn into solid ice so everyone could cross safely.', 
      'He gave the devotees magical swords to fight the soldiers'
    ], 
    correct: 1 
  },
  { 
    q: 'How did the devotees realize that Shrinathji wanted to stop his journey and live permanently in the village of Sihad (now called Nathdwara)?', 
    options: [
      'A voice from the sky told them to stop walking.', 
      'The wheels of the heavy chariot sank deep into the mud and would not move a single inch.', 
      'The local villagers refused to let the chariot pass through their roads.', 
      'The idol suddenly became too heavy for anyone to lift.'
    ], 
    correct: 1 
  },
    ],
  },
  { 
    id: 'v10', 
    videoId: 'j5gUr6O1i4o', 
    points: 10, 
    title: 'What Does the Name Krishna Mean?', 
    questions: [
      { q: 'What is the literal Sanskrit meaning of the word "Krishna"?', options: ['The Dark, All-Attractive One', 'The Silent Warrior', 'The Lord of Light', 'The First Born'], correct: 0 },
      { q: 'According to the Mahabharata, who else shares the name "Krishna" besides Vasudeva Krishna?', options: ['Draupadi and Veda Vyasa', 'Arjuna and Bhima', 'Yudhishthira and Karna', 'Kamsa and Shishupala'], correct: 0 },
      { q: 'According to the video, what does the first part of the name,"Krish",mean?', options: ['Dark skin color', 'Supreme person or existence', 'Playing a musical instrument', 'Running fast'], correct: 1 }
    ] 
  },
  // ── PENDING: 8 more videos (v11–v18) — add links and 3 questions each ──────
  { 
    id: 'v11', 
    videoId: 'Wox7-N3MYKg', 
    playlistId: 'RDWox7-N3MYKg', 
    points: 10, 
    title: 'Achyutam Keshavam Krishna Damodaram', 
    questions: [
      { q: 'The song asks, "Who says God does not dance?" Whose dancing love does the bhajan remind us of?', options: [   'The kings in the palace.', 
    'The birds in the forest during the rainy season.', 
    'The Gopis (devotees) who danced out of pure love for Krishna in Vrindavan.', 
    'The court dancers of a great empire.'], 
       correct: 2 },
      { q: 'What does the name "Damodara" signify in Krishna\'s childhood?', options: ['One tied with a rope around the waist', 'The holder of the flute', 'The slayer of Kamsa', 'The protector of cows'], 
       correct: 0 },
      { q: 'What is the main message that this entire bhajan teaches us about God?', 
         options: [
    'God is very far away and only appears after hundreds of years of difficult rituals.', 
    'God is easily reachable and present everywhere; you just need to call Him with true love, like a child calling a mother.', 
    'We should only sing bhajans when we are inside a temple.', 
    'God only listens to people who can sing perfectly.'
  ], 
       correct: 1 }
    ] 
  },
  { 
    id: 'v12', 
    videoId: 'Feoea8FQTI0', 
    playlistId: 'RDFeoea8FQTI0', 
    points: 10, 
    title: 'Tum Prem Ho - RadhaKrishn', 
    questions: [
      { 
    q: 'According to the lyrics of the song, what is the relationship between love (Prem) and Radha-Krishna?', 
    options: [
      'Love is just a minor part of their story.', 
      'Radha and Krishna are the very form of love, and love itself is their identity.', 
      'They only learned what love means after many years.', 
      'Their love is exactly like ordinary human attachment.'
    ], 
    correct: 1 
  },
  { 
    q: 'The song mentions "Tum Ho Mera Prem" (You are my love). What does this teach us about true love?', 
    options: [
      'True love is selfish and demands things from the other person.', 
      'True love is about capturing someone and keeping them close.', 
      'True love is pure, selfless, and connects two souls as one, without any expectations.', 
      'True love changes every day based on the situation.'
    ], 
    correct: 2 
  },
  { 
    q: 'What is the main spiritual lesson we get from listening to "Tum Prem Ho"?', 
    options: [
      'God can only be understood through fear and strict laws.', 
      'The highest way to reach and experience God is through the path of pure, divine love.', 
      'Love is a distraction from doing spiritual prayers.', 
      'Radha and Krishna lived separate lives with separate minds.'
    ], 
    correct: 1 
  }
    ] 
  },
  { 
    id: 'v13', 
    videoId: '3YLog5mrAYM', 
    playlistId: 'RD3YLog5mrAYM', 
    points: 10, 
    title: 'O Kanha Ab To Murli Ki Dhun Sunaye', 
    questions: [
 { 
    q: 'What are the devotees begging Krishna (Kanha) to do in this song?', 
    options: [
      'To bring them expensive gifts from the city.', 
      'To play His flute (Murli) just once so they can find peace.', 
      'To fight a battle and protect their village.', 
      'To teach them how to play the flute themselves.'
    ], 
    correct: 1 
  },
  { 
    q: 'The lyrics mention that without hearing Krishna\'s flute, the eyes of the devotees have become like "streams of water." What does this mean?', 
    options: [
      'They are enjoying the rainy season.', 
      'They have gone to wash their faces in the river.', 
      'They are crying continuously because they miss him so much.', 
      'They are looking for water in the desert.'
    ], 
    correct: 2 
  },
  { 
    q: 'What kind of devotion (Bhakti) does this bhajan show?', 
    options: [
      'It shows Viraha Bhakti—the deep, pure love that grows even stronger when a devotee feels separated from God.', 
      'It shows that people only pray to God when they want to listen to music.', 
      'It shows that the devotees forgot about Krishna as soon as He left.', 
      'It shows that strict temple rules are the only way to please God.'
    ], 
    correct: 0 
  }    ] 
  },
  { 
    id: 'v14', 
    videoId: 'GIFgAcZcEFQ', 
    playlistId: 'RDGIFgAcZcEFQ', 
    points: 10, 
    title: 'Mann Mandir Mein Saje Bihari', 
    questions: [
      { q: 'What does the word "Mann Mandir" mean?', options: ['The temple of the mind/heart', 'A physical stone temple', 'A royal palace', 'A forest shrine'], correct: 0 },
      { q: 'Which form of Lord Krishna is referred to as "Bihari" or "Banke Bihari"?', options: ['The charming, bent-posture form worshipped in Vrindavan', 'The warrior king of Dwarka', 'The universal cosmic form', 'The newborn baby form'], correct: 0 },
      { q: 'What does dedicating your "Mann Mandir" to Krishna symbolize?', options: ['Internal devotion and pure thoughts', 'Building an external monument', 'Leaving your family life', 'Performing complex rituals'], correct: 0 }
    ] 
  },
  { 
    id: 'v15', 
    videoId: 'g883CDeZtBA', 
    playlistId: 'RDg883CDeZtBA', 
    points: 10, 
    title: 'Shri Krishna Govinda Hare Murari', 
    questions: [
      { q: 'Which demon did Krishna slay to earn the name "Murari"?', options: ['Mura', 'Kamsa', 'Ravana', 'Putana'], correct: 0 },
      { q: 'Who are addressed as the divine parents in the continuation "Hey Natha Narayana Vasudeva"?', options: ['The Supreme Divine Lord as guardian', 'King Dasharatha and Kausalya', 'Lord Shiva and Parvati', 'King Janaka and Sunayana'], correct: 0 },
      { q: 'What is the primary spiritual goal of chanting "Shri Krishna Govinda"?', options: ['Peace, joy, and remembrance of the Divine', 'Acquiring worldly wealth', 'Defeating political enemies', 'Learning ancient grammar'], correct: 0 }
    ] 
  },
  { 
    id: 'v16', 
    videoId: 'LqrgTZWTvB4', 
    playlistId: 'RDLqrgTZWTvB4', 
    points: 10, 
    title: 'Names Of Lord Krishna To Remove Negativity', 
    questions: [
      { q: 'How many divine names of Krishna are featured in this specific chant tradition?', options: ['12', '24', '108', '1000'], 
       correct: 1 },
      { q: 'What is the intended spiritual benefit of chanting these 24 names?', options: ['Removing negativity and purifying the mind', 'Predicting the future', 'Gaining physical speed', 'Learning dynamic combat'], 
       correct: 0 },
      { q: 'Which of the following is a prominent name included among Krishna\'s sacred titles?', options: ['Keshav', 'Indra', 'Agni', 'Varuna'], 
       correct: 0 }
    ] 
  },
  { 
    id: 'v17', 
    videoId: 'FWi2kkoLumk', 
    points: 10, 
    title: 'Krishna\'s Many Names & Meanings', 
    questions: [
      { q: 'Why does Lord Krishna have so many different names in Hindu tradition?', options: ['Each name reflects a unique attribute, pastime, or divine quality', 'Because he forgot his original name', 'To hide from his enemies', 'Because he ruled many different modern countries'], correct: 0 },
      { q: 'What does the name "Gopal" literally mean?', options: ['Protector or cowherd of cows', 'Slayer of demons', 'King of kings', 'The quiet one'], correct: 0 },
      { q: 'Which name relates to Krishna lifting a mountain to save Vrindavan?', options: ['Giridhari', 'Madhav', 'Janardan', 'Mukunda'], correct: 0 }
    ] 
  },
  { 
    id: 'v18', 
    videoId: 'po8a5tDQkaM', 
    points: 10, 
    title: 'Guruvayur Sree Krishna Temple Devotion', 
    questions: [
      { q: 'In which Indian state is the famous Guruvayur Sree Krishna Temple located?', options: ['Kerala', 'Tamil Nadu', 'Karnataka', 'Maharashtra'], correct: 0 },
        { 
    q: 'From which ancient, holy city was the sacred statue (idol) brought before it arrived in Kerala?', 
    options: [
      'Ayodhya', 
      'Mathura', 
      'Dwaraka', 
      'Varanasi'
    ], 
    correct: 2 
  },
  { 
    q: 'Why is the sacred place in Kerala named "Guruvayur"?', 
    options: [
      'It was named after a famous king who built the temple walls.', 
      'It is named after Guru (Brihaspati, the teacher of the gods) and Vayu (the Wind God), who rescued and installed the statue together.', 
      'It translates to "The land of beautiful peacocks" in the local language.', 
      'It was named by the local villagers because it means "The sweet house of Krishna."'
    ], 
    correct: 1 
  }
    ] 
  }
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
