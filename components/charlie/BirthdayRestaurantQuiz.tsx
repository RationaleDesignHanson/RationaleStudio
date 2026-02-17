'use client';

import React, { useEffect, useMemo, useState } from 'react';

type RestaurantId = 'craftsman' | 'figtomato' | 'biagios' | 'parkwest' | 'steelwheel';

interface Restaurant {
  id: RestaurantId;
  name: string;
  tagline: string;
  address: string;
  vibe: string;
  cuisine: string;
  priceRange: string;
  groupNote: string;
  emoji: string;
  color: string;
  bg: string;
  accent: string;
  menuHighlights: string[];
  why: string;
  imageQuery: string;
}

interface QuestionOption {
  label: string;
  text: string;
  scores: Partial<Record<RestaurantId, number>>;
}

interface Question {
  id: string;
  question: string;
  subtitle: string;
  options: QuestionOption[];
}

const RESTAURANTS: Restaurant[] = [
  {
    id: 'craftsman',
    name: 'The Craftsman',
    tagline: "Bergen County's Coolest Gastropub",
    address: '1609 Maple Ave, Fair Lawn, NJ',
    vibe: 'Trendy & Lively',
    cuisine: 'Creative American',
    priceRange: '$$',
    groupNote:
      'Perfect for 20–25 — two dining rooms plus a gorgeous enclosed outdoor space with leafy canopy decor',
    emoji: '🍸',
    color: '#C96A2B',
    bg: '#FFF5EC',
    accent: '#7A3E10',
    menuHighlights: [
      'Lemon Calamari',
      'Wagyu Beef Sliders',
      'Smoked Duck Tacos',
      'Truffle Parmesan Fries',
      'Loaded Nachos',
      'Smash Burgers',
    ],
    why:
      "You want energy, great food, and a crowd-pleasing menu with tons of variety. The Craftsman's gorgeous flower-canopy dining room makes every photo look amazing.",
    imageQuery: 'The Craftsman Fair Lawn NJ restaurant interior dining room flowers',
  },
  {
    id: 'figtomato',
    name: 'Fig & Tomato',
    tagline: 'Italian European Charm in Hillsdale',
    address: '100 Park Ave, Hillsdale, NJ',
    vibe: 'Warm & Romantic',
    cuisine: 'Italian European',
    priceRange: '$$',
    groupNote:
      'Hosts large groups in their warm main dining room — proven for retirement parties & celebrations',
    emoji: '🍝',
    color: '#B85C38',
    bg: '#FFF8F5',
    accent: '#6B2D0E',
    menuHighlights: [
      'Focaccia with Pesto',
      'Fried Calamari',
      'Chicken Parm',
      'Drunken Eggplant Rollatini',
      'Penne Vodka',
      'Chocolate Chip Cookie Lava Cake',
    ],
    why:
      "You're drawn to cozy Italian warmth and authentic flavors. Fig & Tomato is consistently praised for handling large groups flawlessly — apps, pastas, mains, cake — all perfectly timed.",
    imageQuery: 'Fig and Tomato Hillsdale NJ restaurant interior Italian',
  },
  {
    id: 'biagios',
    name: "Biagio's Ristorante",
    tagline: 'Classic Italian with a Banquet Hall Feel',
    address: '299 Paramus Rd, Paramus, NJ',
    vibe: 'Celebratory & Classic',
    cuisine: 'Italian & Seafood',
    priceRange: '$$',
    groupNote:
      'Dedicated banquet & party rooms — specifically designed for large group celebrations, ADA accessible',
    emoji: '🎊',
    color: '#5B3A8E',
    bg: '#F7F3FF',
    accent: '#2D1A55',
    menuHighlights: [
      'Fried Calamari',
      'Antipasto Spread',
      'Eggplant Parmigiana',
      'Seafood Pasta',
      'Filet Mignon',
      'Chocolate Cake',
    ],
    why:
      "You want THE birthday experience — a dedicated private space, attentive staff who know how to pace a big party, and a classic Italian menu that everyone loves.",
    imageQuery: "Biagio's Ristorante Paramus NJ banquet party room interior",
  },
  {
    id: 'parkwest',
    name: 'Park West Tavern',
    tagline: 'Upscale American Gem in Ridgewood',
    address: '30 Oak St, Ridgewood, NJ',
    vibe: 'Sophisticated & Elevated',
    cuisine: 'American Fine Dining',
    priceRange: '$$$',
    groupNote:
      'Accommodates larger parties — known for exceptional service and a refined, intimate atmosphere',
    emoji: '🥩',
    color: '#2C5F4A',
    bg: '#F0F7F4',
    accent: '#123D2A',
    menuHighlights: [
      'Pan-Seared Scallops',
      'Homemade Caesar Salad',
      'Braised Short Rib',
      'Wild Mushroom Risotto',
      'Warm Mozzarella Plate',
      'Chocolate Mousse',
    ],
    why:
      "You want everyone to feel like they're at a truly special dinner. Park West Tavern's quality is exceptional — guests consistently say it's the best meal they've had in Bergen County.",
    imageQuery: 'Park West Tavern Ridgewood NJ interior restaurant dining',
  },
  {
    id: 'steelwheel',
    name: 'Steel Wheel Tavern',
    tagline: 'Live Music, Fire Pits & Great Vibes',
    address: '51 N Broad St, Ridgewood, NJ',
    vibe: 'Fun & Festive',
    cuisine: 'American Tavern',
    priceRange: '$$',
    groupNote:
      'Perfect for a fun, laid-back celebration — live music on weekends, outdoor fire pits, huge group-friendly layout',
    emoji: '🎸',
    color: '#1A3A5C',
    bg: '#F0F4F8',
    accent: '#0A1E33',
    menuHighlights: [
      'Homemade Tater Tots in Beer Cheese',
      'Buffalo Wings',
      'Twin Maryland Crab Cakes',
      'Wagyu Burger',
      'Half Roasted Duck',
      'Key Lime Pie',
    ],
    why:
      "You want a birthday that feels like a party from the moment you walk in. Live music, fire pits, amazing food, and a space that fits your whole crew perfectly.",
    imageQuery: 'Steel Wheel Tavern Ridgewood NJ interior bar fire pit outdoor',
  },
];

const QUESTIONS: Question[] = [
  {
    id: 'energy',
    question: "What's your birthday energy? 🎂",
    subtitle: 'Pick the vibe that feels most YOU',
    options: [
      {
        label: '🎊 Classic & celebratory',
        text: 'I want to feel celebrated!',
        scores: { biagios: 3, parkwest: 2 },
      },
      {
        label: '🎉 Fun & social',
        text: 'Good food, great laughs',
        scores: { craftsman: 3, steelwheel: 2 },
      },
      {
        label: '🕯️ Cozy & intimate',
        text: 'Warm, welcoming, delicious',
        scores: { figtomato: 3, parkwest: 2 },
      },
      {
        label: '🎸 Loud & lively',
        text: "Music, energy, let's gooo!",
        scores: { steelwheel: 3, craftsman: 2 },
      },
    ],
  },
  {
    id: 'cuisine',
    question: 'What cuisine speaks to your soul? 🍽️',
    subtitle: 'Close your eyes and imagine the perfect birthday plate',
    options: [
      {
        label: '🍝 Italian all the way',
        text: 'Pasta, calamari, tiramisu',
        scores: { figtomato: 3, biagios: 2 },
      },
      {
        label: '🍔 Creative American',
        text: 'Gastropub classics done right',
        scores: { craftsman: 3, parkwest: 1 },
      },
      {
        label: '🥩 Steaks & fine dining',
        text: 'Something really special',
        scores: { parkwest: 3, biagios: 2 },
      },
      {
        label: '🍕 Sharing plates & variety',
        text: 'A little of everything!',
        scores: { craftsman: 2, steelwheel: 3, figtomato: 1 },
      },
    ],
  },
  {
    id: 'space',
    question: 'The perfect birthday spot has... 🏠',
    subtitle: "What's the non-negotiable for your crew?",
    options: [
      { label: '🚪 A private room', text: 'Our own space, just for us', scores: { biagios: 3 } },
      {
        label: '🌿 Stunning, Instagrammable decor',
        text: 'Every corner is a photo op',
        scores: { craftsman: 3, parkwest: 1 },
      },
      {
        label: '🔥 Fire pits & live music',
        text: 'The full experience',
        scores: { steelwheel: 3 },
      },
      {
        label: '🕯️ Candlelit intimate tables',
        text: 'Beautiful and romantic',
        scores: { figtomato: 3, parkwest: 2 },
      },
    ],
  },
  {
    id: 'feeling',
    question: 'Walking in, how do you want to feel? ✨',
    subtitle: 'First impressions matter on your birthday',
    options: [
      { label: '👑 Total VIP', text: "Staff knows it's your night", scores: { biagios: 3, parkwest: 2 } },
      {
        label: '😎 Coolest spot in town',
        text: "Trendy, fun, everyone's jealous",
        scores: { craftsman: 3, steelwheel: 1 },
      },
      { label: '🇮🇹 Transported to Italy', text: 'Warm, authentic, bellissimo', scores: { figtomato: 3 } },
      { label: '🤩 Totally wowed', text: 'Jaw dropping atmosphere', scores: { parkwest: 3, craftsman: 1 } },
    ],
  },
  {
    id: 'memory',
    question: "What's the one memory you want from tonight? 🌟",
    subtitle: 'What story will you tell tomorrow?',
    options: [
      {
        label: '🎂 The whole group felt SEEN',
        text: 'Perfect service, perfect pacing',
        scores: { biagios: 3, parkwest: 1 },
      },
      { label: '😋 The food was SO GOOD', text: "We're still talking about it", scores: { craftsman: 3, steelwheel: 2 } },
      { label: '🫶 Great food, great convo', text: 'Cozy and meaningful', scores: { figtomato: 3, parkwest: 2 } },
      { label: '🎶 The energy was unmatched', text: 'Music, dancing, full send', scores: { steelwheel: 3, craftsman: 1 } },
    ],
  },
];

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div
      style={{
        width: '100%',
        height: '4px',
        background: '#E5E7EB',
        borderRadius: '2px',
        marginBottom: '28px',
      }}
    >
      <div
        style={{
          height: '100%',
          borderRadius: '2px',
          background: 'linear-gradient(90deg, #F59E0B, #EF4444)',
          width: `${((current + 1) / total) * 100}%`,
          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  );
}

function QuizCard({
  question,
  onAnswer,
  current,
  total,
}: {
  question: Question;
  onAnswer: (scores: Partial<Record<RestaurantId, number>>) => void;
  current: number;
  total: number;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
        onAnswer(question.options[idx].scores);
        setSelected(null);
      }, 400);
    }, 500);
  };

  return (
    <div style={{ animation: 'slideIn 0.4s ease', opacity: animating ? 0 : 1, transition: 'opacity 0.4s' }}>
      <ProgressBar current={current} total={total} />
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#9CA3AF',
          }}
        >
          Question {current + 1} of {total}
        </span>
      </div>
      <h2
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(22px, 4vw, 30px)',
          fontWeight: '700',
          color: '#1F2937',
          textAlign: 'center',
          marginBottom: '8px',
          lineHeight: '1.3',
        }}
      >
        {question.question}
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: '#6B7280',
          marginBottom: '28px',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
        }}
      >
        {question.subtitle}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {question.options.map((opt, idx) => {
          const emoji = opt.label.split(' ')[0];
          const labelRest = opt.label.split(' ').slice(1).join(' ');
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                background: selected === idx ? '#1F2937' : 'white',
                border: selected === idx ? '2px solid #1F2937' : '2px solid #E5E7EB',
                borderRadius: '16px',
                padding: '20px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                transform: selected === idx ? 'scale(0.97)' : 'scale(1)',
                boxShadow: selected === idx ? '0 4px 20px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{emoji}</div>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: '600',
                  fontSize: '14px',
                  color: selected === idx ? 'white' : '#1F2937',
                  marginBottom: '4px',
                }}
              >
                {labelRest}
              </div>
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '12px',
                  color: selected === idx ? '#D1D5DB' : '#9CA3AF',
                  fontStyle: 'italic',
                }}
              >
                {opt.text}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function RestaurantReveal({ restaurant }: { restaurant: Restaurant }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const fallbackPhotos = useMemo(() => {
    const q = encodeURIComponent(restaurant.imageQuery || `${restaurant.name} restaurant interior`);
    return [
      `https://source.unsplash.com/800x500/?${q}`,
      `https://source.unsplash.com/800x500/?${q},dining`,
    ];
  }, [restaurant.imageQuery, restaurant.name]);

  useEffect(() => {
    setVisible(true);

    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          `/api/places/photos?name=${encodeURIComponent(restaurant.name)}&location=${encodeURIComponent(restaurant.address)}`
        );
        if (!res.ok) throw new Error('Failed to fetch restaurant photos');
        const data: { photos?: string[] } = await res.json();
        if (data.photos && data.photos.length > 0) setPhotos(data.photos);
      } catch {
        // ignore; fallback below
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [restaurant.address, restaurant.name]);

  const displayPhotos = photos.length > 0 ? photos : fallbackPhotos;
  const r = restaurant;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Hero banner */}
      <div
        style={{
          background: `linear-gradient(135deg, ${r.color}, ${r.accent})`,
          borderRadius: '20px',
          padding: '28px 24px',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '120px', opacity: '0.1', lineHeight: '1' }}>
          {r.emoji}
        </div>
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '12px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '8px',
          }}
        >
          🎂 Your birthday destination
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: '800',
            color: 'white',
            margin: '0 0 6px 0',
            lineHeight: '1.2',
          }}
        >
          {r.name}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', margin: '0 0 12px 0', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
          {r.tagline}
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 12px', fontSize: '13px', color: 'white' }}>
            {r.vibe}
          </span>
          <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 12px', fontSize: '13px', color: 'white' }}>
            {r.cuisine}
          </span>
          <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '4px 12px', fontSize: '13px', color: 'white' }}>
            {r.priceRange}
          </span>
        </div>
      </div>

      {/* Why this pick */}
      <div style={{ background: r.bg, border: `1px solid ${r.color}30`, borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: r.color, marginBottom: '8px' }}>
          ✦ Why it&apos;s perfect for you
        </div>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '15px', color: '#374151', lineHeight: '1.6', margin: 0 }}>{r.why}</p>
      </div>

      {/* Interior Images */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '12px' }}>
          📸 Inside the Restaurant
        </div>
        {loading ? (
          <div
            style={{
              height: '200px',
              borderRadius: '16px',
              background: 'linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'shimmer 1.5s infinite',
            }}
          >
            <span style={{ color: '#9CA3AF', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>✦ Finding photos…</span>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: displayPhotos.length > 1 ? '1fr 1fr' : '1fr', gap: '12px' }}>
            {displayPhotos.slice(0, 2).map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${r.name} interior ${idx + 1}`}
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '0.4';
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Menu Highlights */}
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '14px' }}>
          🍽️ Menu Highlights
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {r.menuHighlights.map((dish, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Georgia, serif',
                fontSize: '14px',
                color: '#374151',
              }}
            >
              <span style={{ color: r.color, fontSize: '10px' }}>✦</span>
              {dish}
            </div>
          ))}
        </div>
      </div>

      {/* Group Info */}
      <div style={{ background: '#F9FAFB', borderRadius: '16px', padding: '18px', marginBottom: '16px', borderLeft: `4px solid ${r.color}` }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: '700', fontSize: '14px', color: '#1F2937', marginBottom: '6px' }}>
          👥 For your group of 20–25
        </div>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#4B5563', margin: 0, lineHeight: '1.5' }}>{r.groupNote}</p>
      </div>

      {/* Address */}
      <div style={{ textAlign: 'center', padding: '16px', fontFamily: 'Georgia, serif', fontSize: '14px', color: '#6B7280' }}>
        📍 {r.address}
      </div>
    </div>
  );
}

export default function BirthdayRestaurantQuiz() {
  const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<RestaurantId, number>>({
    craftsman: 0,
    figtomato: 0,
    biagios: 0,
    parkwest: 0,
    steelwheel: 0,
  });
  const [winner, setWinner] = useState<Restaurant | null>(null);

  const handleAnswer = (questionScores: Partial<Record<RestaurantId, number>>) => {
    const newScores = { ...scores };
    Object.entries(questionScores).forEach(([id, pts]) => {
      const rid = id as RestaurantId;
      newScores[rid] = (newScores[rid] || 0) + (pts || 0);
    });
    setScores(newScores);

    if (currentQ + 1 >= QUESTIONS.length) {
      const top = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0]?.[0] as RestaurantId | undefined;
      const found = top ? RESTAURANTS.find((r) => r.id === top) || null : null;
      setWinner(found);
      setPhase('result');
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #FFF9F0 0%, #FFF5E8 50%, #F0F4FF 100%)',
        fontFamily: 'Georgia, serif',
        padding: '0',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        button:hover { opacity: 0.92; transform: translateY(-1px) !important; box-shadow: 0 6px 24px rgba(0,0,0,0.1) !important; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 2px; }
      `}</style>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '24px 16px 60px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '20px 0 28px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🎂</div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#9CA3AF',
              marginBottom: '4px',
            }}
          >
            Bergen County · Birthday Edition
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(20px, 5vw, 26px)',
              fontWeight: '800',
              color: '#1F2937',
              lineHeight: '1.2',
            }}
          >
            Find Your Perfect Birthday Restaurant
          </h1>
        </div>

        {/* Main content */}
        <div style={{ background: 'white', borderRadius: '24px', padding: '28px 24px', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          {phase === 'intro' && (
            <div style={{ textAlign: 'center', animation: 'fadeUp 0.5s ease' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: '700', color: '#1F2937', marginBottom: '12px' }}>
                It&apos;s Your Night!
              </h2>
              <p style={{ color: '#4B5563', lineHeight: '1.6', marginBottom: '8px' }}>
                Answer <strong>5 quick questions</strong> and I&apos;ll find the perfect Bergen County restaurant for your birthday dinner with 20–25 friends.
              </p>
              <p style={{ color: '#9CA3AF', fontSize: '13px', fontStyle: 'italic', marginBottom: '28px' }}>
                All recommendations are budget-friendly and group-ready ✨
              </p>
              <button
                onClick={() => setPhase('quiz')}
                style={{
                  background: 'linear-gradient(135deg, #1F2937, #374151)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '16px 40px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  letterSpacing: '0.5px',
                }}
              >
                Let&apos;s Find My Restaurant →
              </button>
            </div>
          )}

          {phase === 'quiz' && (
            <QuizCard key={currentQ} question={QUESTIONS[currentQ]} onAnswer={handleAnswer} current={currentQ} total={QUESTIONS.length} />
          )}

          {phase === 'result' && winner && (
            <>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎊</div>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: '700', color: '#1F2937' }}>
                  We found your perfect match!
                </h2>
              </div>
              <RestaurantReveal restaurant={winner} />
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button
                  onClick={() => {
                    setPhase('intro');
                    setCurrentQ(0);
                    setScores({ craftsman: 0, figtomato: 0, biagios: 0, parkwest: 0, steelwheel: 0 });
                    setWinner(null);
                  }}
                  style={{
                    background: 'transparent',
                    border: '2px solid #E5E7EB',
                    borderRadius: '50px',
                    padding: '10px 24px',
                    fontSize: '13px',
                    color: '#6B7280',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  ↩ Retake the Quiz
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '20px 0 0', fontSize: '12px', color: '#D1D5DB', fontStyle: 'italic' }}>
          Featuring the best of Bergen County, NJ
        </div>
      </div>
    </div>
  );
}

