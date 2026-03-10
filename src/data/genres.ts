import type { Genre } from "@/types/genre"

export const DEFAULT_GENRES: Genre[] = [
  {
    id: "action",
    name: "Action",
    tagline:
      "Explosive sequences and adrenaline-pumping stories that keep you on the edge of your seat from start to finish.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80",
    movieCount: 342,
  },
  {
    id: "scifi",
    name: "Sci-Fi",
    tagline:
      "Journey beyond the stars into worlds of wonder, where technology and imagination collide in breathtaking visions of the future.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    movieCount: 218,
  },
  {
    id: "horror",
    name: "Horror",
    tagline:
      "Dare to enter the darkness. Spine-chilling tales that will haunt your dreams long after the credits roll.",
    image: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80",
    movieCount: 189,
  },
  {
    id: "drama",
    name: "Drama",
    tagline:
      "Deeply moving narratives exploring the full spectrum of human emotion, crafted by the finest storytellers of our time.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80",
    movieCount: 567,
  },
  {
    id: "thriller",
    name: "Thriller",
    tagline:
      "Heart-pounding suspense and unexpected twists. Nothing is what it seems in these masterfully crafted puzzles.",
    image: "https://images.unsplash.com/photo-1483808161634-29aa1b1dd61d?auto=format&fit=crop&q=80",
    movieCount: 298,
  },
  {
    id: "fantasy",
    name: "Fantasy",
    tagline:
      "Epic worlds of magic and wonder await. Legendary tales of heroes, mythical creatures, and ancient prophecies.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80",
    movieCount: 156,
  },
  {
    id: "romance",
    name: "Romance",
    tagline:
      "Beautiful love stories that capture the heart. From sweeping epics to intimate moments that define us.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    movieCount: 423,
  },
]

export const GENRE_ENRICHMENT: Record<string, { tagline: string; image: string; movieCount: number }> = {
  "action": { tagline: "Explosive sequences and adrenaline-pumping stories that keep you on the edge of your seat from start to finish.", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80", movieCount: 342 },
  "adventure": { tagline: "Embark on thrilling journeys across uncharted lands, discovering hidden treasures and facing extraordinary challenges.", image: "https://images.unsplash.com/photo-1506452814811-0e1ce4e22c7a?auto=format&fit=crop&q=80", movieCount: 284 },
  "animation": { tagline: "Boundless creativity comes alive with vibrant visuals and heartwarming stories that appeal to the inner child in everyone.", image: "https://images.unsplash.com/photo-1580477651156-34ca477fe4bf?auto=format&fit=crop&q=80", movieCount: 195 },
  "anime": { tagline: "Experience the unique stylized artistry and deep, complex narratives of Japanese animation.", image: "https://images.unsplash.com/photo-1578632767115-351597fd24ec?auto=format&fit=crop&q=80", movieCount: 412 },
  "comedy": { tagline: "Uproarious laughter and lighthearted moments that provide the perfect escape from the everyday.", image: "https://images.unsplash.com/photo-1543584756-8f43a8a9a239?auto=format&fit=crop&q=80", movieCount: 521 },
  "crime": { tagline: "Delve into the seedy underworld of mobsters, detectives, and masterminds in these gritty tales of law and disorder.", image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80", movieCount: 310 },
  "documentary": { tagline: "Fascinating real-world stories that illuminate truth, explore nature, and capture the human experience.", image: "https://images.unsplash.com/photo-1552084117-56a98a414520?auto=format&fit=crop&q=80", movieCount: 154 },
  "donghua": { tagline: "Rich Chinese animation featuring mythical worlds, martial arts epics, and breathtaking visual artistry.", image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80", movieCount: 88 },
  "drama": { tagline: "Deeply moving narratives exploring the full spectrum of human emotion, crafted by the finest storytellers of our time.", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80", movieCount: 567 },
  "family": { tagline: "Wholesome entertainment and magical adventures perfect for sharing with viewers of all ages.", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80", movieCount: 276 },
  "fantasy": { tagline: "Epic worlds of magic and wonder await. Legendary tales of heroes, mythical creatures, and ancient prophecies.", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80", movieCount: 156 },
  "history": { tagline: "Journey back in time to witness the monumental events and extraordinary lives that shaped our world.", image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80", movieCount: 198 },
  "holiday": { tagline: "Festive cheer and seasonal magic to warm your heart during the most wonderful time of the year.", image: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&q=80", movieCount: 112 },
  "horror": { tagline: "Dare to enter the darkness. Spine-chilling tales that will haunt your dreams long after the credits roll.", image: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80", movieCount: 189 },
  "music": { tagline: "Symphonies of story and sound that celebrate the transformative power of musicians and their art.", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80", movieCount: 145 },
  "musical": { tagline: "Spectacular song-and-dance numbers that bring theatrical magic directly to the silver screen.", image: "https://images.unsplash.com/photo-1543805908-013898fd17f6?auto=format&fit=crop&q=80", movieCount: 94 },
  "mystery": { tagline: "Cryptic clues, deceptive characters, and shocking revelations that keep you guessing until the very end.", image: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&q=80", movieCount: 253 },
  "none": { tagline: "Discover the undiscovered—unique and uncategorized cinematic experiences that defy expectations.", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80", movieCount: 34 },
  "romance": { tagline: "Beautiful love stories that capture the heart. From sweeping epics to intimate moments that define us.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80", movieCount: 423 },
  "science-fiction": { tagline: "Journey beyond the stars into worlds of wonder, where technology and imagination collide in breathtaking visions of the future.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80", movieCount: 218 },
  "short": { tagline: "Bite-sized stories that pack an emotional punch, proving great cinema comes in all lengths.", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80", movieCount: 89 },
  "sporting-event": { tagline: "The thrill of the game and the agony of defeat, capturing authentic rivalries and athletic triumph.", image: "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&q=80", movieCount: 67 },
  "superhero": { tagline: "Extraordinary powers and epic battles between good and evil as legendary icons save the universe.", image: "https://images.unsplash.com/photo-1612036782180-6f0b6ce846ce?auto=format&fit=crop&q=80", movieCount: 156 },
  "suspense": { tagline: "Nerve-wracking tension and looming danger that will hold you captive scene after breathless scene.", image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80", movieCount: 187 },
  "thriller": { tagline: "Heart-pounding suspense and unexpected twists. Nothing is what it seems in these masterfully crafted puzzles.", image: "https://images.unsplash.com/photo-1483808161634-29aa1b1dd61d?auto=format&fit=crop&q=80", movieCount: 298 },
  "war": { tagline: "Harrowing battlefield sagas of courage, sacrifice, and the enduring human spirit during our darkest hours.", image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80", movieCount: 214 },
  "western": { tagline: "Dust, grit, and justice on the frontier. The classic tales of outlaws and heroes in the untamed wild west.", image: "https://images.unsplash.com/photo-1521319207038-0387b32c69cb?auto=format&fit=crop&q=80", movieCount: 142 },
}
