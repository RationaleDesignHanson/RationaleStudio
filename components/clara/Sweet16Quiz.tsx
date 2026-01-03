'use client';

import React, { useState, useEffect, useCallback } from 'react';

// Types
interface QuestionOption {
  text: string;
  value: string;
  weights: Record<string, number>;
}

interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

interface Hotel {
  name: string;
  desc: string;
  url: string;
  suite: string;
  searchQuery: string; // For Google Places API
}

interface Activity {
  name: string;
  url: string;
}

interface Destination {
  name: string;
  emoji: string;
  tagline: string;
  color: string;
  flight: string;
  why: string[];
  note: string;
  hotels: Hotel[];
  activities: Activity[];
}

type DestinationKey = 'miami' | 'sanjuan' | 'sandiego' | 'hollywood' | 'delray';
type Scores = Record<DestinationKey, number>;

const questions: Question[] = [
  {
    id: 'swimming',
    question: "How important is swimming in the ocean?",
    options: [
      { text: "🏊 Essential — I want to swim for hours!", value: 'high', weights: { sanjuan: 3, miami: 0, hollywood: 0, delray: 0, sandiego: 0 } },
      { text: "🏖️ Pool is fine, ocean is a bonus", value: 'med', weights: { sanjuan: 1, miami: 2, hollywood: 2, delray: 2, sandiego: 2 } },
      { text: "🌴 I'm here for the vibes, not the water", value: 'low', weights: { sanjuan: 0, miami: 3, hollywood: 2, delray: 2, sandiego: 3 } },
    ]
  },
  {
    id: 'urban',
    question: "What kind of place sounds best?",
    options: [
      { text: "🌃 Big city energy — shops, nightlife, action", value: 'high', weights: { miami: 3, sandiego: 3, sanjuan: 2, hollywood: 0, delray: 0 } },
      { text: "🚶‍♀️ Walkable town with lots to explore", value: 'med', weights: { miami: 2, sanjuan: 3, sandiego: 2, hollywood: 1, delray: 2 } },
      { text: "🌅 Chill beach town, relaxed pace", value: 'low', weights: { miami: 0, sanjuan: 0, sandiego: 0, hollywood: 3, delray: 3 } },
    ]
  },
  {
    id: 'shopping',
    question: "How much do you want to shop?",
    options: [
      { text: "🛍️ A LOT — Sephora, Zara, give me everything", value: 'high', weights: { miami: 3, sandiego: 2, sanjuan: 1, hollywood: 0, delray: 1 } },
      { text: "👛 Some shopping, but not the main thing", value: 'med', weights: { miami: 2, sandiego: 2, sanjuan: 2, hollywood: 1, delray: 2 } },
      { text: "✨ Experiences over stuff", value: 'low', weights: { miami: 0, sanjuan: 3, sandiego: 2, hollywood: 2, delray: 1 } },
    ]
  },
  {
    id: 'adventure',
    question: "Want any once-in-a-lifetime experiences?",
    options: [
      { text: "🤩 YES — glowing bays, festivals, cool stuff!", value: 'high', weights: { sanjuan: 3, sandiego: 3, miami: 1, hollywood: 0, delray: 0 } },
      { text: "🎯 Maybe one special excursion", value: 'med', weights: { sanjuan: 2, sandiego: 2, miami: 2, hollywood: 1, delray: 1 } },
      { text: "😌 Keep it chill — pool, beach, dinner", value: 'low', weights: { sanjuan: 0, sandiego: 0, miami: 2, hollywood: 3, delray: 3 } },
    ]
  },
  {
    id: 'coast',
    question: "East Coast or West Coast?",
    options: [
      { text: "🌺 East — Miami vibes, tropical, Latin flair", value: 'east', weights: { miami: 3, sanjuan: 3, hollywood: 2, delray: 2, sandiego: 0 } },
      { text: "🌊 West — California surf & sunsets", value: 'west', weights: { sandiego: 3, miami: 0, sanjuan: 0, hollywood: 0, delray: 0 } },
      { text: "🤷‍♀️ Don't care — surprise me!", value: 'none', weights: { miami: 1, sanjuan: 1, sandiego: 1, hollywood: 1, delray: 1 } },
    ]
  },
  {
    id: 'vibe',
    question: "What do you want to feel on your birthday?",
    options: [
      { text: "💅 Glamorous & grown-up", value: 'glam', weights: { miami: 3, sandiego: 2, sanjuan: 1, hollywood: 0, delray: 1 } },
      { text: "🌟 Adventurous — stories to tell forever", value: 'adventure', weights: { sanjuan: 3, sandiego: 3, miami: 1, hollywood: 0, delray: 0 } },
      { text: "💕 Relaxed quality time with family", value: 'chill', weights: { hollywood: 3, delray: 3, miami: 1, sanjuan: 1, sandiego: 1 } },
    ]
  },
];

const destinations: Record<DestinationKey, Destination> = {
  miami: {
    name: "Miami Beach",
    emoji: "🌴",
    tagline: "Glamour & City Energy",
    color: "#FF1493",
    flight: "3 hrs",
    why: ["Lincoln Road shopping (Sephora! Zara!)", "Art Deco Instagram spots", "Rooftop movies at night", "Wynwood street art"],
    note: "Ocean is cool (72°F) but the pools are amazing",
    hotels: [
      { name: "Grand Beach Hotel", desc: "All-suite, 3 pools, oceanfront", url: "https://www.grandbeachhotel.com/hotels/miami", suite: "2BR Corner Suites", searchQuery: "Grand Beach Hotel Miami Beach" },
      { name: "Fontainebleau", desc: "Iconic, 6 pools, celebrity vibes", url: "https://www.fontainebleau.com/miamibeach", suite: "Tresor Tower suites", searchQuery: "Fontainebleau Miami Beach" },
      { name: "Loews Miami Beach", desc: "Great for families, ocean views", url: "https://www.loewshotels.com/miami-beach", suite: "Tower suites", searchQuery: "Loews Miami Beach Hotel" }
    ],
    activities: [
      { name: "Lincoln Road Mall", url: "https://www.miamiandbeaches.com/things-to-do/shopping/lincoln-road-mall" },
      { name: "Wynwood Walls", url: "https://thewynwoodwalls.com" },
      { name: "Rooftop Cinema Club", url: "https://rooftopcinemaclub.com/venue/south-beach/" },
      { name: "Thriller Speedboat Tour", url: "https://www.viator.com/tours/Miami/Thriller-Miami-Speedboat-Adventures/d662-5161THRILLSPEEDMI" }
    ]
  },
  sanjuan: {
    name: "San Juan, Puerto Rico",
    emoji: "✨",
    tagline: "Adventure & Magic",
    color: "#FF69B4",
    flight: "3.5 hrs",
    why: ["GLOWING bioluminescent bay (New Moon = perfect!)", "Carnaval parade during your trip!", "Old San Juan feels like Europe", "Warm 79°F ocean!"],
    note: "Bio bay + Carnival are day trips but SO worth it",
    hotels: [
      { name: "La Concha Resort", desc: "Trendy, infinity pool, beachfront", url: "https://www.laconcharesort.com", suite: "Suite Tower 1BR", searchQuery: "La Concha Renaissance San Juan Resort" },
      { name: "Condado Vanderbilt", desc: "Historic luxury", url: "https://www.condadovanderbilt.com", suite: "Oceanfront suites", searchQuery: "Condado Vanderbilt Hotel San Juan" },
      { name: "Caribe Hilton", desc: "Protected cove beach", url: "https://www.hilton.com/en/hotels/sjuclhf-caribe-hilton/", suite: "Connecting rooms", searchQuery: "Caribe Hilton San Juan" }
    ],
    activities: [
      { name: "Bio Bay Kayak Tour", url: "https://www.viator.com/tours/San-Juan/Bioluminescent-Bay-Kayaking-Tour/d911-5755BIOBAY" },
      { name: "Carnaval de Ponce 2026", url: "https://www.discoverpuertorico.com/event/ponce-carnival" },
      { name: "Old San Juan & El Morro Fort", url: "https://www.nps.gov/saju/planyourvisit/index.htm" },
      { name: "Condado Beach", url: "https://www.discoverpuertorico.com/profile/condado-beach" }
    ]
  },
  sandiego: {
    name: "San Diego",
    emoji: "🌊",
    tagline: "West Coast Classic",
    color: "#FF85C1",
    flight: "5.5 hrs",
    why: ["Gaslamp Quarter — 16 blocks of shops", "World-famous Zoo", "Hotel del Coronado is iconic", "La Jolla seals & tide pools"],
    note: "Ocean too cold to swim (58°F) but weather is perfect",
    hotels: [
      { name: "Hotel del Coronado", desc: "Historic landmark on the beach", url: "https://www.hoteldel.com", suite: "Beach Village villas", searchQuery: "Hotel del Coronado San Diego" },
      { name: "La Jolla Shores Hotel", desc: "Right on the sand", url: "https://www.ljshoreshotel.com", suite: "La Jolla Suite", searchQuery: "La Jolla Shores Hotel" },
      { name: "Catamaran Resort", desc: "Mission Bay, paddleboards", url: "https://www.catamaranresort.com", suite: "Beachfront suites", searchQuery: "Catamaran Resort Hotel San Diego" }
    ],
    activities: [
      { name: "San Diego Zoo", url: "https://zoo.sandiegozoo.org/tickets" },
      { name: "Gaslamp Quarter Shopping", url: "https://www.gaslamp.org/explore/" },
      { name: "La Jolla Cove & Seals", url: "https://www.sandiego.org/explore/things-to-do/beaches-bays/la-jolla.aspx" },
      { name: "Balboa Park Museums", url: "https://www.balboapark.org/explore" }
    ]
  },
  hollywood: {
    name: "Hollywood Beach, FL",
    emoji: "🎸",
    tagline: "Classic Boardwalk Vibes",
    color: "#FF6B9D",
    flight: "3 hrs",
    why: ["2.5-mile Broadwalk on the sand", "FlowRider surf simulator!", "Margaritaville resort", "Simple & relaxing"],
    note: "Super chill but might feel too quiet for a big milestone",
    hotels: [
      { name: "Margaritaville", desc: "FlowRider, 3 pools, fun vibes", url: "https://www.margaritavillehollywoodbeachresort.com", suite: "2BR suites", searchQuery: "Margaritaville Hollywood Beach Resort" },
      { name: "Diplomat Resort", desc: "Upscale, great pools", url: "https://www.diplomatresort.com", suite: "Ocean suites", searchQuery: "The Diplomat Beach Resort Hollywood Florida" }
    ],
    activities: [
      { name: "Hollywood Broadwalk", url: "https://visithollywoodfl.org/hollywood-beach-broadwalk/" },
      { name: "FlowRider at Margaritaville", url: "https://www.margaritavillehollywoodbeachresort.com/experiences/flowrider" },
      { name: "Anne Kolb Nature Center", url: "https://www.hollywoodfl.org/Facilities/Facility/Details/Anne-Kolb-Nature-Center-4" }
    ]
  },
  delray: {
    name: "Delray Beach, FL",
    emoji: "🌺",
    tagline: "Upscale Village",
    color: "#FFB6C1",
    flight: "3 hrs",
    why: ["Atlantic Avenue — cute shops & dining", "Silverball Retro Arcade", "Beautiful beach", "Quieter & sophisticated"],
    note: "Very relaxed — might not feel like a big celebration",
    hotels: [
      { name: "Opal Grand Resort", desc: "Luxury oceanfront", url: "https://www.opalcollection.com/opal-grand", suite: "Villas", searchQuery: "Opal Grand Oceanfront Resort Delray Beach" },
      { name: "Seagate Hotel & Spa", desc: "Private beach club", url: "https://www.theseagatehotel.com", suite: "Suites", searchQuery: "The Seagate Hotel Delray Beach" }
    ],
    activities: [
      { name: "Atlantic Avenue Shopping", url: "https://www.downtowndelraybeach.com/explore/shopping" },
      { name: "Silverball Retro Arcade", url: "https://www.silverballmuseum.com/delray-beach/" },
      { name: "Sandoway Discovery Center", url: "https://sandoway.org/visit/" }
    ]
  }
};

// Photo carousel component with Google Places API integration
interface PhotoCarouselProps {
  hotel: Hotel;
  color: string;
}

const PhotoCarousel: React.FC<PhotoCarouselProps> = ({ hotel, color }) => {
  const [current, setCurrent] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(false);
      
      try {
        const response = await fetch(
          `/api/places/photos?name=${encodeURIComponent(hotel.searchQuery)}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        
        const data = await response.json();
        
        if (data.photos && data.photos.length > 0) {
          setPhotos(data.photos);
        } else {
          // Fallback to placeholder
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching hotel photos:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [hotel.searchQuery]);

  // Fallback placeholder image
  const placeholderUrl = `https://source.unsplash.com/800x500/?${encodeURIComponent(hotel.name + ' hotel')}`;
  const displayPhotos = error || photos.length === 0 ? [placeholderUrl] : photos;
  
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ 
        position: 'relative', 
        borderRadius: '12px', 
        overflow: 'hidden',
        aspectRatio: '16/10',
        background: 'rgba(255,182,193,0.2)'
      }}>
        {loading ? (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,182,193,0.3)'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: `3px solid ${color}`,
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          <>
            <img 
              src={displayPhotos[current]}
              alt={hotel.name}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transition: 'opacity 0.3s'
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.opacity = '0.5';
              }}
            />
            {/* Navigation dots */}
            {displayPhotos.length > 1 && (
              <div style={{ 
                position: 'absolute', 
                bottom: '8px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '6px'
              }}>
                {displayPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      border: 'none',
                      background: i === current ? '#fff' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  />
                ))}
              </div>
            )}
            {/* Arrows */}
            {displayPhotos.length > 1 && (
              <>
                <button 
                  onClick={() => setCurrent(c => c === 0 ? displayPhotos.length - 1 : c - 1)}
                  style={{
                    position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%',
                    width: '28px', height: '28px', color: '#fff', cursor: 'pointer', fontSize: '14px'
                  }}
                >‹</button>
                <button 
                  onClick={() => setCurrent(c => c === displayPhotos.length - 1 ? 0 : c + 1)}
                  style={{
                    position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                    background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%',
                    width: '28px', height: '28px', color: '#fff', cursor: 'pointer', fontSize: '14px'
                  }}
                >›</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default function Sweet16Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Scores>({ miami: 0, sanjuan: 0, sandiego: 0, hollywood: 0, delray: 0 });
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'why' | 'hotels' | 'todo'>('why');
  const [hotelIndex, setHotelIndex] = useState(0);

  const handleAnswer = useCallback((option: QuestionOption) => {
    setSelected(option.value);
    setTimeout(() => {
      const newScores = { ...scores };
      Object.entries(option.weights).forEach(([d, w]) => {
        newScores[d as DestinationKey] += w;
      });
      setScores(newScores);
      setStep(step + 1);
      setSelected(null);
    }, 250);
  }, [scores, step]);

  const getWinner = useCallback(() => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return { 
      primary: sorted[0][0] as DestinationKey, 
      secondary: sorted[1][0] as DestinationKey, 
      diff: sorted[0][1] - sorted[1][1] 
    };
  }, [scores]);

  const reset = useCallback(() => { 
    setStep(0); 
    setScores({ miami: 0, sanjuan: 0, sandiego: 0, hollywood: 0, delray: 0 }); 
    setTab('why'); 
    setHotelIndex(0);
  }, []);

  // ACTUALLY PINK gradient - soft blush to hot pink to deep rose
  const pinkGradient = 'linear-gradient(180deg, #FFF0F5 0%, #FFB6C1 25%, #FF69B4 60%, #DB2777 100%)';
  const cardBg = 'rgba(255,255,255,0.85)';
  const textDark = '#831843';
  const textMed = '#9D174D';
  const textLight = '#BE185D';

  // Results
  if (step >= questions.length) {
    const { primary, secondary, diff } = getWinner();
    const d = destinations[primary];
    const d2 = destinations[secondary];
    const currentHotel = d.hotels[hotelIndex];

    return (
      <div style={{ minHeight: '100dvh', background: pinkGradient, padding: '16px', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          
          {/* Winner Card */}
          <div style={{ background: cardBg, borderRadius: '20px', padding: '20px 16px', marginBottom: '12px', boxShadow: '0 4px 20px rgba(219,39,119,0.2)' }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '44px', marginBottom: '6px' }}>{d.emoji}</div>
              <h1 style={{ color: textDark, fontSize: '20px', fontWeight: '700', margin: '0 0 4px' }}>{d.name}</h1>
              <div style={{ background: d.color, color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: '600', display: 'inline-block' }}>
                {d.tagline}
              </div>
              <div style={{ color: textMed, fontSize: '11px', marginTop: '6px' }}>✈️ {d.flight} from NJ</div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
              {(['why', 'hotels', 'todo'] as const).map(t => (
                <button key={t} onClick={() => { setTab(t); setHotelIndex(0); }} style={{
                  flex: 1, padding: '10px 6px', 
                  background: tab === t ? d.color : 'rgba(219,39,119,0.1)',
                  border: 'none', borderRadius: '10px', 
                  color: tab === t ? '#fff' : textMed, 
                  fontSize: '11px', fontWeight: '600', cursor: 'pointer'
                }}>
                  {t === 'why' ? '💖 Why' : t === 'hotels' ? '🏨 Stay' : '🎯 Do'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ minHeight: '200px' }}>
              {tab === 'why' && (
                <div>
                  {d.why.map((w, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px', color: textDark, fontSize: '13px' }}>
                      <span style={{ color: d.color }}>✓</span><span>{w}</span>
                    </div>
                  ))}
                  <div style={{ background: 'rgba(219,39,119,0.1)', borderRadius: '10px', padding: '10px', marginTop: '12px' }}>
                    <div style={{ color: textLight, fontSize: '10px', fontWeight: '600' }}>📝 NOTE</div>
                    <div style={{ color: textMed, fontSize: '12px' }}>{d.note}</div>
                  </div>
                </div>
              )}

              {tab === 'hotels' && (
                <div>
                  {/* Hotel selector */}
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                    {d.hotels.map((h, i) => (
                      <button 
                        key={i} 
                        onClick={() => setHotelIndex(i)}
                        style={{
                          flex: 1,
                          padding: '8px 4px',
                          background: i === hotelIndex ? 'rgba(219,39,119,0.15)' : 'rgba(219,39,119,0.05)',
                          border: i === hotelIndex ? `2px solid ${d.color}` : '2px solid transparent',
                          borderRadius: '8px',
                          color: textDark,
                          fontSize: '10px',
                          fontWeight: i === hotelIndex ? '600' : '400',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {h.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {/* Photo Carousel */}
                  <PhotoCarousel hotel={currentHotel} color={d.color} />

                  {/* Hotel Info */}
                  <a href={currentHotel.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'block', background: 'rgba(219,39,119,0.08)', borderRadius: '10px', padding: '12px',
                    textDecoration: 'none', border: '1px solid rgba(219,39,119,0.2)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ color: textDark, fontSize: '14px', fontWeight: '600' }}>{currentHotel.name}</div>
                        <div style={{ color: textMed, fontSize: '11px' }}>{currentHotel.desc}</div>
                        <div style={{ color: d.color, fontSize: '11px', marginTop: '4px' }}>🛏️ {currentHotel.suite}</div>
                      </div>
                      <span style={{ color: d.color, fontSize: '18px' }}>→</span>
                    </div>
                  </a>
                </div>
              )}

              {tab === 'todo' && (
                <div>
                  {d.activities.map((a, i) => (
                    <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: 'rgba(219,39,119,0.08)', borderRadius: '10px', padding: '12px',
                      marginBottom: '8px', textDecoration: 'none', border: '1px solid rgba(219,39,119,0.15)'
                    }}>
                      <span style={{ color: textDark, fontSize: '13px' }}>{a.name}</span>
                      <span style={{ color: d.color }}>→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Runner Up */}
          {diff <= 3 && (
            <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
              <div style={{ color: textLight, fontSize: '11px', fontWeight: '600' }}>🤔 Close second: {d2.name}</div>
              <div style={{ color: textMed, fontSize: '11px' }}>{d2.tagline}</div>
            </div>
          )}

          {/* Scores */}
          <div style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '12px', padding: '12px', marginBottom: '12px' }}>
            <div style={{ color: textMed, fontSize: '9px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Match Scores</div>
            {Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
              <div key={k} style={{ marginBottom: '5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: textMed, marginBottom: '2px' }}>
                  <span>{destinations[k as DestinationKey].emoji} {destinations[k as DestinationKey].name}</span>
                  <span style={{ color: destinations[k as DestinationKey].color, fontWeight: '600' }}>{v}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(219,39,119,0.15)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${(v / 18) * 100}%`, background: destinations[k as DestinationKey].color, borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(34,197,94,0.15)', borderRadius: '10px', padding: '10px', textAlign: 'center', marginBottom: '12px' }}>
            <span style={{ color: '#15803D', fontSize: '11px', fontWeight: '500' }}>✓ All domestic — no passport needed!</span>
          </div>

          <button onClick={reset} style={{
            width: '100%', padding: '14px', background: 'rgba(255,255,255,0.9)', border: '2px solid #DB2777',
            borderRadius: '12px', color: '#DB2777', fontSize: '13px', fontWeight: '600', cursor: 'pointer'
          }}>↺ Retake Quiz</button>
        </div>
      </div>
    );
  }

  // Question Screen
  const q = questions[step];
  
  return (
    <div style={{ minHeight: '100dvh', background: pinkGradient, padding: '16px', paddingTop: '32px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>🎂</div>
          <h1 style={{ color: textDark, fontSize: '18px', fontWeight: '700', margin: 0 }}>Clara&apos;s Sweet 16 Quiz</h1>
          <p style={{ color: textMed, fontSize: '12px', margin: '4px 0 0' }}>Feb 13–18, 2026</p>
        </div>

        {/* Progress */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: textMed, fontSize: '11px', marginBottom: '6px' }}>
            <span>{step + 1} of {questions.length}</span>
            <span>{Math.round((step / questions.length) * 100)}%</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }}>
            <div style={{ height: '100%', width: `${(step / questions.length) * 100}%`, background: '#DB2777', borderRadius: '2px', transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Question Card */}
        <div style={{ background: cardBg, borderRadius: '20px', padding: '20px', boxShadow: '0 4px 20px rgba(219,39,119,0.15)' }}>
          <h2 style={{ color: textDark, fontSize: '20px', fontWeight: '600', marginBottom: '16px', lineHeight: 1.3 }}>{q.question}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={selected !== null}
                style={{
                  padding: '16px',
                  background: selected === opt.value ? '#DB2777' : 'rgba(219,39,119,0.08)',
                  border: selected === opt.value ? 'none' : '1px solid rgba(219,39,119,0.2)',
                  borderRadius: '14px',
                  color: selected === opt.value ? '#fff' : textDark,
                  fontSize: '15px',
                  textAlign: 'left',
                  cursor: selected ? 'default' : 'pointer',
                  opacity: selected && selected !== opt.value ? 0.4 : 1,
                  transform: selected === opt.value ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.2s'
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>

        {/* Footer dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px', paddingBottom: '16px' }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: i < step ? '#DB2777' : i === step ? '#BE185D' : 'rgba(255,255,255,0.6)',
              boxShadow: i === step ? '0 0 8px rgba(219,39,119,0.5)' : 'none'
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

