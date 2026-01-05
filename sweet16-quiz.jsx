import React, { useState } from 'react';

const questions = [
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

const destinations = {
  miami: {
    name: "Miami Beach",
    emoji: "🌴",
    tagline: "Glamour & City Energy",
    color: "#FF1493",
    flight: "3 hrs",
    why: ["Lincoln Road shopping (Sephora! Zara!)", "Art Deco Instagram spots", "Rooftop movies at night", "Wynwood street art"],
    note: "Ocean is cool (72°F) but the pools are amazing",
    hotels: [
      { name: "Grand Beach Hotel", desc: "All-suite, 3 pools, oceanfront", url: "https://www.grandbeachhotel.com/hotels/miami", suite: "2BR Corner Suites", images: ["miami+beach+hotel+pool", "miami+beach+luxury+resort", "miami+hotel+ocean+view"] },
      { name: "Fontainebleau", desc: "Iconic, 6 pools, celebrity vibes", url: "https://www.fontainebleau.com/miamibeach", suite: "Tresor Tower suites", images: ["fontainebleau+miami", "miami+luxury+pool", "south+beach+resort"] },
      { name: "Loews Miami Beach", desc: "Great for families, ocean views", url: "https://www.loewshotels.com/miami-beach", suite: "Tower suites", images: ["miami+beach+resort", "south+beach+hotel", "miami+oceanfront"] }
    ],
    activities: [
      { name: "Lincoln Road Mall", url: "https://www.lincolnroadmall.com" },
      { name: "Wynwood Walls", url: "https://www.thewynwoodwalls.com" },
      { name: "Rooftop Cinema Club", url: "https://rooftopcinemaclub.com/miami" },
      { name: "Speedboat Tour", url: "https://thrillermiamiboat.com" }
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
      { name: "La Concha Resort", desc: "Trendy, infinity pool, beachfront", url: "https://www.laconcharesort.com", suite: "Suite Tower 1BR", images: ["san+juan+resort+pool", "puerto+rico+beach+hotel", "condado+beach"] },
      { name: "Condado Vanderbilt", desc: "Historic luxury", url: "https://www.condadovanderbilt.com", suite: "Oceanfront suites", images: ["puerto+rico+luxury+hotel", "san+juan+oceanfront", "caribbean+resort"] },
      { name: "Caribe Hilton", desc: "Protected cove beach", url: "https://www.hilton.com/en/hotels/sjuclhf-caribe-hilton/", suite: "Connecting rooms", images: ["hilton+caribbean", "san+juan+beach", "puerto+rico+resort"] }
    ],
    activities: [
      { name: "Bio Bay Kayak Tour", url: "https://www.biobay.com" },
      { name: "Carnaval de Ponce", url: "https://www.discoverpuertorico.com" },
      { name: "Old San Juan & El Morro", url: "https://www.nps.gov/saju" },
      { name: "Isla Verde Beach", url: "https://www.discoverpuertorico.com" }
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
      { name: "Hotel del Coronado", desc: "Historic landmark on the beach", url: "https://www.hoteldel.com", suite: "Beach Village villas", images: ["hotel+del+coronado", "coronado+beach+california", "san+diego+luxury+resort"] },
      { name: "La Jolla Shores Hotel", desc: "Right on the sand", url: "https://www.ljshoreshotel.com", suite: "La Jolla Suite", images: ["la+jolla+beach", "san+diego+beach+hotel", "california+oceanfront"] },
      { name: "Catamaran Resort", desc: "Mission Bay, paddleboards", url: "https://www.catamaranresort.com", suite: "Beachfront suites", images: ["mission+bay+san+diego", "san+diego+resort", "california+beach+resort"] }
    ],
    activities: [
      { name: "San Diego Zoo", url: "https://zoo.sandiegozoo.org" },
      { name: "Gaslamp Quarter", url: "https://www.gaslamp.org" },
      { name: "La Jolla Cove", url: "https://www.sandiego.org" },
      { name: "Balboa Park", url: "https://www.balboapark.org" }
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
      { name: "Margaritaville", desc: "FlowRider, 3 pools, fun vibes", url: "https://www.margaritavillehollywoodbeachresort.com", suite: "2BR suites", images: ["hollywood+beach+florida", "margaritaville+resort", "florida+beach+hotel"] },
      { name: "Diplomat Resort", desc: "Upscale, great pools", url: "https://www.diplomatresort.com", suite: "Ocean suites", images: ["diplomat+hollywood+beach", "florida+luxury+resort", "hollywood+florida+oceanfront"] }
    ],
    activities: [
      { name: "Broadwalk", url: "https://visithollywoodfl.org" },
      { name: "FlowRider", url: "https://www.margaritavillehollywoodbeachresort.com" },
      { name: "Anne Kolb Nature Center", url: "https://www.hollywoodfl.org" }
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
      { name: "Opal Grand Resort", desc: "Luxury oceanfront", url: "https://www.opalcollection.com/opal-grand", suite: "Villas", images: ["delray+beach+resort", "florida+oceanfront+hotel", "palm+beach+luxury"] },
      { name: "Seagate Hotel & Spa", desc: "Private beach club", url: "https://www.theseagatehotel.com", suite: "Suites", images: ["delray+beach+hotel", "florida+beach+spa", "boca+raton+resort"] }
    ],
    activities: [
      { name: "Atlantic Avenue", url: "https://downtowndelraybeach.com" },
      { name: "Silverball Arcade", url: "https://silverballmuseum.com/delray-beach" },
      { name: "Sandoway Discovery Center", url: "https://www.sandoway.org" }
    ]
  }
};

// Photo carousel component
const PhotoCarousel = ({ images, color }) => {
  const [current, setCurrent] = useState(0);
  
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ 
        position: 'relative', 
        borderRadius: '12px', 
        overflow: 'hidden',
        aspectRatio: '16/10',
        background: 'rgba(255,182,193,0.2)'
      }}>
        <img 
          src={`https://source.unsplash.com/800x500/?${images[current]}`}
          alt="Hotel"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'opacity 0.3s'
          }}
          onError={(e) => e.target.style.opacity = 0.5}
        />
        {/* Navigation dots */}
        <div style={{ 
          position: 'absolute', 
          bottom: '8px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px'
        }}>
          {images.map((_, i) => (
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
        {/* Arrows */}
        <button 
          onClick={() => setCurrent(c => c === 0 ? images.length - 1 : c - 1)}
          style={{
            position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%',
            width: '28px', height: '28px', color: '#fff', cursor: 'pointer', fontSize: '14px'
          }}
        >‹</button>
        <button 
          onClick={() => setCurrent(c => c === images.length - 1 ? 0 : c + 1)}
          style={{
            position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(0,0,0,0.4)', border: 'none', borderRadius: '50%',
            width: '28px', height: '28px', color: '#fff', cursor: 'pointer', fontSize: '14px'
          }}
        >›</button>
      </div>
    </div>
  );
};

export default function ClaraQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ miami: 0, sanjuan: 0, sandiego: 0, hollywood: 0, delray: 0 });
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('why');
  const [hotelIndex, setHotelIndex] = useState(0);

  const handleAnswer = (option) => {
    setSelected(option.value);
    setTimeout(() => {
      const newScores = { ...scores };
      Object.entries(option.weights).forEach(([d, w]) => newScores[d] += w);
      setScores(newScores);
      setStep(step + 1);
      setSelected(null);
    }, 250);
  };

  const getWinner = () => {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return { primary: sorted[0][0], secondary: sorted[1][0], diff: sorted[0][1] - sorted[1][1] };
  };

  const reset = () => { 
    setStep(0); 
    setScores({ miami: 0, sanjuan: 0, sandiego: 0, hollywood: 0, delray: 0 }); 
    setTab('why'); 
    setHotelIndex(0);
  };

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
              {['why', 'hotels', 'todo'].map(t => (
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
                  <PhotoCarousel images={currentHotel.images} color={d.color} />

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
                  <span>{destinations[k].emoji} {destinations[k].name}</span>
                  <span style={{ color: destinations[k].color, fontWeight: '600' }}>{v}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(219,39,119,0.15)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${(v / 18) * 100}%`, background: destinations[k].color, borderRadius: '2px' }} />
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
    <div style={{ minHeight: '100dvh', background: pinkGradient, padding: '16px', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>🎂</div>
          <h1 style={{ color: textDark, fontSize: '18px', fontWeight: '700', margin: 0 }}>Clara's Sweet 16 Quiz</h1>
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
        <div style={{ background: cardBg, borderRadius: '20px', padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(219,39,119,0.15)' }}>
          <h2 style={{ color: textDark, fontSize: '20px', fontWeight: '600', marginBottom: '16px', lineHeight: 1.3 }}>{q.question}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
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
