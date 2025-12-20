/**
 * Sanitary Waste System Content
 *
 * IP Development project for absorbent-lined pet waste containment system
 * Pre-seed fundraising materials
 */

export interface SanitaryWasteSlide {
  id: string;
  sectionId: string;
  slideNumber: number;
  type: 'title' | 'section-header' | 'problem' | 'solution' | 'product' | 'technical' | 'business' | 'ask';
  headline: string;
  subheadline?: string;
  content?: string[];
  bullets?: string[];
  visual?: {
    type: 'diagram' | 'stat' | 'image' | 'component' | 'comparison';
    component?: string;
    data?: any;
  };
  deepDive?: {
    title: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
  notes?: string;
}

export interface SanitaryWasteSection {
  id: string;
  title: string;
  color: string;
  slides: SanitaryWasteSlide[];
}

// Section colors - Heirloom-inspired warm, muted palette
export const SECTION_COLORS = {
  opening: '#E85D42',      // Tomato (primary accent)
  problem: '#D84A32',      // Deeper tomato
  solution: '#2A9D8F',     // Sage (success/solution)
  product: '#F4A261',      // Amber (warmth)
  goToMarket: '#E76F51',   // Burnt sienna
  business: '#2A9D8F',     // Sage (repeat for cohesion)
  ask: '#E85D42',          // Tomato (bookend with opening)
};

export const sanitaryWasteSections: SanitaryWasteSection[] = [
  {
    id: 'opening',
    title: 'Opening',
    color: SECTION_COLORS.opening,
    slides: [
      {
        id: 'slide-01',
        sectionId: 'opening',
        slideNumber: 1,
        type: 'title',
        headline: 'Nimbus',
        subheadline: 'A new category in pet care: sanitary waste systems (no more poop bags)',
        content: [
          'Absorbent-lined pickup + pop-up dispensing + proprietary dispenser ecosystem'
        ],
        visual: {
          type: 'image',
          data: {
            src: '/images/sanitary-waste-system/imagecover.png',
            alt: 'Premium sanitary waste system hero shot',
            caption: 'Turning a hated moment into a premium hygiene system'
          }
        },
        notes: '© Rationale / 2025 | Confidential'
      },
      {
        id: 'slide-02',
        sectionId: 'opening',
        slideNumber: 2,
        type: 'problem',
        headline: 'Every Dog Owner Knows This Feeling',
        content: [
          'The visceral, unpleasant sensation of warmth and texture transmitted through thin plastic film.',
          'Standard bags solve containment—but not the sensory experience.'
        ],
        visual: {
          type: 'stat',
          data: {
            primary: '90M',
            label: 'US dog owners face this daily',
            secondary: '72% won\'t reduce pet spending regardless of economic conditions'
          }
        }
      }
    ]
  },
  {
    id: 'problem',
    title: 'The Problem',
    color: SECTION_COLORS.problem,
    slides: [
      {
        id: 'slide-03',
        sectionId: 'problem',
        slideNumber: 3,
        type: 'problem',
        headline: 'The Sensory Barrier',
        subheadline: 'Why existing bags fail the moment-of-use test',
        content: [
          'Standard bags solve containment but ignore the unpleasant sensory experience. People already hack around this: double-bagging, stuffing leaves/grass inside as insulation.'
        ],
        bullets: [
          'Heat transfer through thin film (13-20 microns) → Dread walks',
          'Moisture "pressure" and smear risk → Avoid pickup situations',
          'Odor anxiety during carry-time → Feel embarrassed in public',
          'Loose stool makes everything worse → Overuse plastic (double-bagging)'
        ],
        visual: {
          type: 'diagram',
          component: 'DisgustBarrierDiagram',
          data: {
            supplementaryImage: {
              src: '/images/sanitary-waste-system/image6.png',
              alt: 'Hand holding thick absorbent liner material showing texture and thickness',
              caption: 'The airlaid liner is 40-60x thicker than standard film, creating tactile insulation'
            }
          }
        },
        deepDive: {
          title: 'Why This Matters',
          sections: [
            {
              title: 'Sensory Transmission',
              content: 'Standard films (13-20 microns) offer negligible thermal resistance. Heat transfers instantly from waste to hand, triggering an immediate "contamination response" even when the barrier is intact.'
            },
            {
              title: 'Odor Permeability',
              content: 'All plastic films are gas-permeable. The "wafting scent" during walks is a common complaint, especially when carrying the bag for extended periods before disposal.'
            },
            {
              title: 'User Workarounds',
              content: 'Many users already double-bag or stuff leaves/grass inside as insulation—effectively acknowledging that standard bags fail the sensory test. This wastes plastic and adds friction to the experience.'
            },
            {
              title: 'Behavioral Impact',
              content: 'Unpleasant sensory experiences create real behavioral changes: owners dread walks, avoid pickup situations, feel embarrassed in public, and overuse plastic. We solve the tactile gap driving these avoidance behaviors.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'solution',
    title: 'The Solution',
    color: SECTION_COLORS.solution,
    slides: [
      {
        id: 'slide-04',
        sectionId: 'solution',
        slideNumber: 4,
        type: 'solution',
        headline: 'Material Innovation Meets User Experience',
        subheadline: 'Hybrid Material Architecture That Transforms the Experience',
        content: [
          'Before: "I can feel it. I hate this."',
          'After: "It feels insulated, drier, less gross."',
          'Same pickup behavior (invert + tie), vastly better experience.'
        ],
        bullets: [
          'Inner liner: Airlaid non-woven (absorbent, wet-strong) → Reduced heat transmission',
          'Outer shell: Compostable film or recycled LDPE → Rapid moisture uptake',
          'Zone bonding for flexibility → Calmer carry-time experience',
          'Interfolded flat-pack format → Familiar invert-and-tie motion retained'
        ],
        visual: {
          type: 'image',
          data: {
            src: '/images/sanitary-waste-system/image1.png',
            alt: 'Cross-section showing airlaid liner, compostable film, and zone bonding',
            caption: 'Three-layer construction: 600-1000 micron absorbent liner eliminates heat transfer',
            description: 'Product cross-section showing material layers'
          }
        },
        deepDive: {
          title: 'Material Science & User Benefits',
          sections: [
            {
              title: 'Why Airlaid Non-Woven',
              content: 'Standard paper towel is "wet-laid," meaning fibers are suspended in water and then dried. This process creates hydrogen bonds that dissolve quickly when re-wetted. Airlaid non-woven fabric is formed by suspending wood pulp fibers in air and bonding them together. It has textile-like hand feel, high absorbency kinetics, and maintains wet strength—crucial for the "grab, pinch, and invert" motion.'
            },
            {
              title: 'Outer Shell Options',
              content: 'PBAT/PLA Blend (compostable) provides flexibility and eco-positioning. Recycled LDPE (post-consumer) offers superior moisture barrier and cheaper cost. Both options support premium sustainability narratives.'
            },
            {
              title: 'Zone Bonding Chemistry',
              content: 'Adhesive is applied only in specific areas (e.g., top cuff and center strip) to allow materials to move independently ("float"), improving drape and flexibility while preventing delamination.'
            },
            {
              title: 'User Experience Transformation',
              content: 'The hybrid material architecture directly translates technical specs into tangible benefits: reduced heat transmission eliminates the visceral disgust response, rapid moisture uptake stabilizes loose stool and prevents smearing, the airlaid cushion creates a calmer carry-time experience, and the familiar invert-and-tie motion means zero learning curve for users.'
            }
          ]
        }
      },
      {
        id: 'slide-05',
        sectionId: 'solution',
        slideNumber: 5,
        type: 'technical',
        headline: 'Why Interfolded',
        subheadline: 'Roll format breaks due to liner thickness',
        bullets: [
          'Telescoping: Different materials create unstable rolls',
          'Web tension mismatch: Plastic stretches, paper doesn\'t',
          'Perforation failure: Cutting through composite materials',
          'Dispenser incompatibility: 10-20x thicker than standard rolls'
        ],
        content: [
          'Interfolded flat packs are proven in tissues/wipes → manufacturable + premium UX.'
        ],
        visual: {
          type: 'image',
          data: {
            src: '/images/sanitary-waste-system/image9.png',
            alt: 'Side-by-side comparison showing interfolded flat pack versus rolled bag format with visible thickness difference',
            caption: 'Interfolded format eliminates roll geometry constraints and enables thick absorbent liner',
            description: 'Product comparison: interfolded vs rolled format'
          }
        },
        deepDive: {
          title: 'Manufacturing Engineering',
          sections: [
            {
              title: 'The Roll Geometry Constraint',
              content: 'A standard bag is ~15 microns thick. An airlaid liner is ~600-1000 microns thick. A roll of 15 lined bags would theoretically be 10-20 times the diameter of a standard roll. It would not fit in any existing dispenser. Winding a roll with two materials of vastly different thicknesses and friction coefficients causes "telescoping" (the center of the roll pushes out).'
            },
            {
              title: 'Interfolded Process',
              content: 'Two webs (plastic and paper) are unwound simultaneously. Paper is cut into sheets and placed onto the plastic web using a vacuum drum. Hot melt adhesive is applied just before placement. The composite web is fed into a V-folding or Z-folding machine, then cut into stacks of 15-20 counts. This eliminates all roll-winding issues and creates superior UX.'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'product',
    title: 'Product System',
    color: SECTION_COLORS.product,
    slides: [
      {
        id: 'slide-06',
        sectionId: 'product',
        slideNumber: 6,
        type: 'product',
        headline: 'The Three-SKU System',
        content: [
          'Complete ecosystem designed for lock-in and recurring revenue'
        ],
        bullets: [
          '1. Absorbent-lined bags (the consumable)',
          '2. Interfolded refill packs (pocket pack format)',
          '3. Premium leash-mounted dispenser (proprietary)'
        ],
        visual: {
          type: 'diagram',
          component: 'ProductSystemDiagram',
          data: {
            sku1: { name: 'Bags', price: '$0.25-0.30', role: 'Consumable' },
            sku2: { name: 'Refills', price: '$15-18/box', role: 'Subscription' },
            sku3: { name: 'Dispenser', price: '$24.99', role: 'Acquisition' },
            productImage: {
              src: '/images/sanitary-waste-system/image4.png',
              alt: 'Product flat lay showing complete ecosystem: dispenser, refill packs, and absorbent-lined bags',
              caption: 'The complete three-SKU system: format lock-in creates recurring revenue'
            }
          }
        }
      },
      {
        id: 'slide-07',
        sectionId: 'product',
        slideNumber: 7,
        type: 'product',
        headline: 'Dispenser UX',
        subheadline: 'One-Handed Flow',
        content: [
          'JTBD: "When I\'m holding a leash and my dog poops, I want to pick it up without disgust so I can move on quickly."'
        ],
        bullets: [
          '1. Thumb-pull one bag',
          '2. Next bag auto-presents',
          '3. Liner positioned in pinch zone',
          '4. Invert + tie as normal',
          '5. Carry with reduced odor anxiety'
        ],
        visual: {
          type: 'image',
          data: {
            gallery: [
              {
                src: '/images/sanitary-waste-system/image5.png',
                alt: 'Woman walking golden retriever at sunset using sanitary waste system dispenser',
                caption: 'Real-world use case: One-handed access during walks',
                description: 'Lifestyle shot showing product in use'
              },
              {
                src: '/images/sanitary-waste-system/image7.png',
                alt: 'Close-up of dispenser hanging mechanism showing one-handed thumb-pull access',
                caption: 'Pop-up dispens ing: Next bag auto-presents after pull',
                description: 'Detail shot of dispenser mechanism'
              },
              {
                src: '/images/sanitary-waste-system/image3.png',
                alt: 'Premium leash-mounted dispenser with soft-touch neoprene and leather strap',
                caption: 'Premium materials: Soft-touch neoprene with secondary pocket',
                description: 'Product hero shot'
              }
            ]
          }
        },
        notes: 'Material: Soft-touch neoprene or recycled ocean plastic. Function: Holds rectangular pocket pack + secondary pocket for keys/treats.'
      }
    ]
  },
  {
    id: 'goToMarket',
    title: 'Go-to-Market',
    color: SECTION_COLORS.goToMarket,
    slides: [
      {
        id: 'slide-08',
        sectionId: 'goToMarket',
        slideNumber: 8,
        type: 'business',
        headline: 'Manufacturing Process & Partners',
        subheadline: 'We don\'t build factories early. We partner.',
        content: [
          'Partner with nonwoven hygiene converters who already run similar lines (wet wipes, tissues, sanitary products).',
          'Ask: Pilot run + path to automation.'
        ],
        bullets: [
          'Type A: Wet Wipe / Hygiene Manufacturers (best fit)',
          'Type B: Flexible Packaging Converters',
          'Type C: Label Converters with tipping capabilities'
        ],
        visual: {
          type: 'diagram',
          component: 'ManufacturingFlowDiagram',
          data: {
            process: ['Airlaid + PBAT webs', 'Cut & Place', 'Hot Melt Bonding', 'Interfolding', 'Pocket Pack'],
            partners: ['China/Turkey (cost)', 'USA (speed/quality)'],
            productImage: {
              src: '/images/sanitary-waste-system/image8.png',
              alt: 'Hand holding interfolded pack of absorbent-lined bags showing pop-up format',
              caption: 'Interfolded format is the key manufacturing output: enables pop-up dispensing'
            }
          }
        }
      },
      {
        id: 'slide-09',
        sectionId: 'goToMarket',
        slideNumber: 9,
        type: 'business',
        headline: 'Supply Chain & Economics',
        subheadline: 'Strategic sourcing from pilot through scale',
        content: [
          'Material sourcing is straightforward: bioplastic film, airlaid non-woven, and bio-based adhesives from established suppliers.',
          'CAPEX scales with production phase: from $5K-15K for prototyping to $40K-250K+ for automated production.'
        ],
        bullets: [
          'Buy finished materials for pilot runs',
          'Partner with converters for 5K-10K beta production',
          'Scale with dedicated lines or long-term partnerships'
        ],
        visual: {
          type: 'diagram',
          component: 'SupplyChainEconomicsDiagram',
          data: {
            materials: ['Bioplastic film', 'Airlaid non-woven', 'Bio-based adhesives'],
            geography: ['China/Turkey (cost)', 'USA (speed/quality)']
          }
        }
      },
      {
        id: 'slide-10',
        sectionId: 'goToMarket',
        slideNumber: 10,
        type: 'business',
        headline: 'Market Wedge',
        subheadline: 'High-end pet stores + urban premium owners',
        bullets: [
          'Premiumization + pet humanization trends',
          'Urban carry-time amplifies pain',
          'Design-forward retail educates'
        ],
        content: [
          'Wedge channels: Boutiques → Vets → DTC subscription',
          'Retail Beta: 25-50 flagship boutiques with in-store demo, tactile sample, staff script, and subscription QR code.'
        ],
        visual: {
          type: 'diagram',
          component: 'RetailBetaTimelineDiagram',
          data: {
            phase1: { weeks: '1-4', milestone: 'Frankenstein prototypes + mustard test' },
            phase2: { weeks: '5-12', milestone: '5k-10k pilot + retail beta + provisional patent' },
            phase3: { months: '4-9', milestone: 'Automated interfold production + certification + scale' },
            retailImage: {
              src: '/images/sanitary-waste-system/image10.png',
              alt: 'Boutique retail display mockup showing premium product placement on warm wood shelving',
              caption: 'Retail beta target: 25-50 flagship boutiques with in-store demo and staff training'
            }
          }
        },
        deepDive: {
          title: 'Go-to-Market Playbook',
          sections: [
            {
              title: 'Retail Beta Mechanics',
              content: '25-50 flagship boutiques. In-store demo window + tactile sample. Staff script + "why it\'s different" card. Subscription QR inside packaging. Measure: repeat refill rate, attach rate on dispenser, customer reviews mentioning "grossness solved".'
            },
            {
              title: 'Demographic Targeting',
              content: 'Millennials and Gen Z pet owners. Urban centers (limited outdoor disposal options). High willingness-to-pay for pet products. Social media influenced (TikTok/Instagram).'
            }
          ]
        }
      },
      {
        id: 'slide-11',
        sectionId: 'goToMarket',
        slideNumber: 11,
        type: 'business',
        headline: 'Competitive Positioning',
        subheadline: 'Why We Win',
        content: [
          'We occupy a blue ocean position at the intersection of premium pricing and true sanitary performance.',
          'Competitors fail because they optimize for only one dimension—either cheap containment or expensive alternatives with different UX.'
        ],
        visual: {
          type: 'diagram',
          component: 'CompetitivePositioningDiagram'
        },
        notes: 'Blue Ocean opportunity: Retain flexible bag mechanics + add performance of paper solutions'
      },
      {
        id: 'slide-12',
        sectionId: 'goToMarket',
        slideNumber: 12,
        type: 'business',
        headline: 'Roadmap & Milestones',
        subheadline: '18-month path from concept to national distribution',
        content: [
          '4-phase execution roadmap with clear funding gates at each transition.',
          'Each phase builds proof points for the next round of capital.'
        ],
        bullets: [
          'Weeks 1-4: Foundation (patent, BOM, manufacturer)',
          'Weeks 5-12: Validation (pilot production, retail beta)',
          'Months 4-9: Scale Prep (hit seed metrics, distribution)',
          'Months 10-18: Market Expansion (national rollout)'
        ],
        visual: {
          type: 'diagram',
          component: 'RoadmapTimelineDiagram'
        },
        notes: 'Funding gates: F&F $25-35K → Pre-Seed $100-150K → Seed $300-400K'
      },
      {
        id: 'slide-13',
        sectionId: 'goToMarket',
        slideNumber: 13,
        type: 'business',
        headline: 'Seed Trigger Metrics',
        subheadline: '4 hard thresholds that unlock seed funding',
        content: [
          'Pre-seed funds the retail beta. Seed only deploys after hitting validation metrics.',
          'This de-risks capital by proving product-market fit before scaling.'
        ],
        bullets: [
          'Refill Repeat Rate: >40% (customers buying refills within 60 days)',
          'Dispenser Attach Rate: >60% (starter kit sales vs bag-only)',
          'Net Promoter Score: >50 (customer satisfaction)',
          'Review Keyword Frequency: >30% (mentions of disgust problem solved)'
        ],
        visual: {
          type: 'diagram',
          component: 'SeedMetricsDashboard'
        },
        notes: 'All 4 metrics must hit before seed capital deploys'
      }
    ]
  },
  {
    id: 'business',
    title: 'Business Model',
    color: SECTION_COLORS.business,
    slides: [
      {
        id: 'slide-14',
        sectionId: 'business',
        slideNumber: 14,
        type: 'business',
        headline: 'Unit Economics',
        subheadline: 'Healthy margins in super-premium segment',
        bullets: [
          'COGS per bag: $0.053 - $0.076',
          'Retail price: $0.25 - $0.30',
          'Wholesale price: ~$0.125',
          'Gross margin: ~44%'
        ],
        content: [
          'Standard bags retail at $0.03-0.08. Premium bags (Earth Rated) at $0.06-0.10.',
          'Super-premium target: $0.25-0.30. Justification: This is a "Sanitary Tool," not a trash bag. Compare to wet wipes or diapers.'
        ],
        visual: {
          type: 'diagram',
          component: 'RazorBladeEconomicsDiagram',
          data: {
            acquisition: { item: 'Starter Kit', price: '$24.99', margin: 'Break-even' },
            retention: { item: 'Monthly Refills', price: '$15-18', margin: '44% GM' },
            ltv: { months: 12, value: '$180-216', note: '12-month retention target' }
          }
        },
        deepDive: {
          title: 'Financial Details',
          sections: [
            {
              title: 'Bill of Materials (per 1,000 bags)',
              content: 'Outer bag film (PBAT 18 micron): $18-25. Inner liner (Airlaid 60gsm): $15-20. Adhesive: $2-4. Primary packaging (cardboard pocket pack): $8-12. Manufacturing conversion: $10-15. Total COGS: $53-76 per 1,000 bags = $0.053-0.076 per bag.'
            },
            {
              title: 'Market Context',
              content: 'Global pet waste bag market: $435M+ and growing. Pet spending is recession-resistant. 72% of pet owners won\'t reduce spending regardless of financial situation. Urban concentration increases carry-time pain and willingness to pay.'
            }
          ]
        }
      },
      {
        id: 'slide-15',
        sectionId: 'business',
        slideNumber: 15,
        type: 'business',
        headline: 'Unit Economics Detail',
        subheadline: 'Bill of Materials breakdown & pricing architecture',
        content: [
          'Detailed COGS breakdown by component reveals path to margin expansion at scale.',
          'We\'re pricing at "diaper economics" not "trash bag economics"—this is a sanitary hygiene product.'
        ],
        bullets: [
          'Per-bag COGS: Film ($0.022), Liner ($0.018), Adhesive ($0.003), Packaging ($0.010), Conversion ($0.012)',
          '60-bag pack retail: $15-18 → Wholesale: $7.50-9.00 → COGS: $3.18-4.56',
          'Starter Kit: $24.99 retail (dispenser + 2 packs) → Break-even CAC',
          'Path to 50-55% margins at scale (50K+ units)'
        ],
        visual: {
          type: 'diagram',
          component: 'UnitEconomicsDetailDiagram'
        },
        notes: 'Current margins assume pilot volumes. Scale economics improve 15-30% across all categories.'
      },
      {
        id: 'slide-16',
        sectionId: 'business',
        slideNumber: 16,
        type: 'business',
        headline: 'Defensible Business Model',
        subheadline: 'Razor-Blade Economics with Multi-Layer IP Moat',
        content: [
          'Format + dispenser ecosystem creates switching costs.',
          'Customers can\'t easily switch back to cheap generic rolls—they don\'t fit the superior dispenser.',
          'We\'re an IP development company building defensibility layers from day one.'
        ],
        bullets: [
          'Starter Kit: Dispenser + 2 refills (~break-even CAC) | Folding / interfold system + liner placement',
          'Refills: Recurring margin engine (subscription + retail) | Dispenser + refill interface (ecosystem lock-in)',
          'Accessories: Leash clip / mini pouch / travel kit | Trade secrets: Bonding zones, dimensions, QC',
          'Recurring revenue moat | Provisional → utility patent as traction confirms'
        ],
        deepDive: {
          title: 'Business Model & IP Strategy',
          sections: [
            {
              title: 'Revenue Streams',
              content: 'Starter Kit ($24.99) serves as near break-even customer acquisition, getting the proprietary dispenser into users\' hands. Refills ($15-18/box) create the recurring margin engine through both subscription and retail channels, with 44% gross margins. Accessories (leash clips, mini pouches, travel kits) provide additional margin expansion and ecosystem lock-in.'
            },
            {
              title: 'IP Layers',
              content: 'The folding/interfold system and liner placement create manufacturing IP. The dispenser and refill interface create ecosystem lock-in—generic bags won\'t fit the premium dispenser. Trade secrets around bonding zones, precise dimensions, and QC thresholds provide additional defensibility. Provisional patent filed at 5k pilot run, converting to utility patent as retail beta validates pull.'
            },
            {
              title: 'Ecosystem Lock-In',
              content: 'Once customers invest in the premium dispenser ($24.99), they\'re locked into our refill format. Generic thin bags won\'t fit properly, and customers won\'t want to downgrade after experiencing the superior sanitary performance. This creates a natural moat similar to razor-blade economics but with stronger format lock-in than commodity consumables.'
            },
            {
              title: 'IP Development Timeline',
              content: 'File provisional patent at 5k pilot run to establish priority date. Convert to utility patent if retail beta validates pull (25-50 stores showing repeat purchase). Trade secrets maintained around exact bonding zones, material specifications, and quality control thresholds that aren\'t disclosed in patent applications.'
            }
          ]
        },
        notes: 'File provisional patent at 5k pilot run, convert to utility if retail beta validates pull'
      }
    ]
  },
  {
    id: 'ask',
    title: 'The Ask',
    color: SECTION_COLORS.ask,
    slides: [
      {
        id: 'slide-17',
        sectionId: 'ask',
        slideNumber: 17,
        type: 'ask',
        headline: 'The Raise: Staged Funding Strategy',
        subheadline: 'Metrics-driven capital deployment in two phases',
        content: [
          'Pre-seed funds the retail beta. Seed only deploys after hitting hard validation metrics.',
          'This structure protects investor downside and ensures capital isn\'t burned on scale before proving the model works.'
        ],
        bullets: [
          'Pre-Seed: $100-150K → Validation + retail beta + IP filing',
          'Seed Trigger: Hit 4 hard metrics (refill >40%, attach >60%, NPS >50, keywords >30%)',
          'Seed: $300-400K → Scale manufacturing + national distribution',
          'Timeline: Pre-seed 3-4 months, seed unlocks at 12-week mark if metrics hit'
        ],
        visual: {
          type: 'diagram',
          component: 'StagedFundingDiagram'
        },
        notes: 'Two-stage raise: Pre-seed current, Seed triggered by metrics'
      },
      {
        id: 'slide-18',
        sectionId: 'ask',
        slideNumber: 18,
        type: 'ask',
        headline: 'We\'re turning a hated moment into a premium hygiene system',
        subheadline: 'If pets are family, cleanup should feel like it.',
        visual: {
          type: 'image',
          data: {
            src: '/images/sanitary-waste-system/image11.png',
            alt: 'Dog owner with pet - emotional connection and premium care',
            caption: 'Premium sanitary experience for modern pet owners'
          }
        },
        bullets: [
          'Pilot manufacturing (5-10K units) + retail beta (25-50 stores)',
          'IP filing + certifications',
          'Validated unit economics + retail pull',
          'Timeline: 9-12 months to retail beta completion'
        ],
        content: [
          'Let\'s discuss pilot + rollout.'
        ],
        notes: 'Final slide: Emotional appeal + practical next steps'
      }
    ]
  }
];

// Helper functions
export function getAllSlides(): SanitaryWasteSlide[] {
  return sanitaryWasteSections.flatMap(section => section.slides);
}

export function getSlideById(id: string): SanitaryWasteSlide | undefined {
  return getAllSlides().find(slide => slide.id === id);
}

export function getSlideByNumber(slideNumber: number): SanitaryWasteSlide | undefined {
  return getAllSlides().find(slide => slide.slideNumber === slideNumber);
}

export function getSectionById(id: string): SanitaryWasteSection | undefined {
  return sanitaryWasteSections.find(section => section.id === id);
}

export function getTotalSlideCount(): number {
  return getAllSlides().length;
}

export function getSectionForSlide(slideId: string): SanitaryWasteSection | undefined {
  return sanitaryWasteSections.find(section =>
    section.slides.some(slide => slide.id === slideId)
  );
}

// Quick overview content (minimal, public-facing)
export const quickOverviewContent = {
  title: 'Sanitary Waste System',
  subtitle: 'IP Development',
  status: 'Physical product in prototyping',
  description: null, // Intentionally minimal
  isProtected: true
};
