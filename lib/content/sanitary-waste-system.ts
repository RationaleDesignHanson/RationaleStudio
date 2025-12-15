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

// Section colors - green/mint theme for "sanitary/clean" positioning
export const SECTION_COLORS = {
  opening: '#10B981',      // Green
  problem: '#EF4444',      // Red
  solution: '#3B82F6',     // Blue
  product: '#8B5CF6',      // Purple
  goToMarket: '#F59E0B',   // Orange
  business: '#00D9FF',     // Cyan
  ask: '#FFD700',          // Gold
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
        headline: 'A New Category in Pet Care',
        subheadline: 'Sanitary Waste Systems (not "poop bags")',
        content: [
          'Absorbent-lined pickup + pop-up dispensing + proprietary dispenser ecosystem',
          'Raising pre-seed to validate retail pull and scale manufacturing'
        ],
        notes: 'IP Development Co. | Confidential'
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
        type: 'section-header',
        headline: 'The Problem',
        subheadline: 'Dog waste pickup is a visceral sensory problem'
      },
      {
        id: 'slide-04',
        sectionId: 'problem',
        slideNumber: 4,
        type: 'problem',
        headline: 'Four Sensory Pain Points',
        bullets: [
          'Heat transfer through thin film (13-20 microns)',
          'Moisture "pressure" and smear risk',
          'Odor anxiety during carry-time',
          'Loose stool makes everything worse'
        ],
        content: [
          'People already hack around it: double-bagging, leaves/grass lining.',
          'This isn\'t convenience. It\'s disgust sensitivity.'
        ],
        deepDive: {
          title: 'Psychology of Disgust',
          sections: [
            {
              title: 'Sensory Transmission',
              content: 'Current market offerings utilize films ranging from 0.5 mil to 0.8 mil (13-20 microns). While visually opaque, these films offer negligible thermal resistance. The immediate transfer of body heat from the waste to the user\'s hand triggers a visceral "contamination response," even if the barrier is intact.'
            },
            {
              title: 'Olfactory Permeability',
              content: 'Polyethylene and compostable plastics are gas-permeable to varying degrees. The "wafting scent" of waste is a common complaint, particularly during longer walks where the user must carry the bag for extended periods.'
            },
            {
              title: 'Double Bagging Behavior',
              content: 'A significant subset of users currently mitigates this aversion by using two bags or lining the bag with leaves/grass, effectively acknowledging the failure of the single-bag design.'
            }
          ]
        }
      },
      {
        id: 'slide-05',
        sectionId: 'problem',
        slideNumber: 5,
        type: 'problem',
        headline: 'Why This Matters',
        subheadline: 'When the experience is unpleasant, people:',
        bullets: [
          'Dread walks',
          'Avoid pickup situations',
          'Feel embarrassed in public',
          'Overuse plastic (double-bagging)'
        ],
        content: [
          'We\'re solving the tactile gap.'
        ]
      }
    ]
  },
  {
    id: 'solution',
    title: 'The Solution',
    color: SECTION_COLORS.solution,
    slides: [
      {
        id: 'slide-06',
        sectionId: 'solution',
        slideNumber: 6,
        type: 'section-header',
        headline: 'The Solution',
        subheadline: 'Absorbent-Lined Sanitary Waste System'
      },
      {
        id: 'slide-07',
        sectionId: 'solution',
        slideNumber: 7,
        type: 'solution',
        headline: 'Hybrid Material Architecture',
        bullets: [
          'Inner liner: Airlaid non-woven (wet-strong, high loft, absorbent)',
          'Outer shell: Compostable film or recycled LDPE',
          'Bonding: Zone bonding to keep flexibility',
          'Format: Interfolded flat-pack for reliable dispensing'
        ],
        content: [
          'Same pickup behavior (invert + tie), vastly better experience.'
        ],
        deepDive: {
          title: 'Material Science',
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
            }
          ]
        }
      },
      {
        id: 'slide-08',
        sectionId: 'solution',
        slideNumber: 8,
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
          type: 'diagram',
          component: 'RollVsInterfoldedDiagram',
          data: {
            comparison: 'side-by-side',
            rollIssues: ['Telescoping', 'Tension mismatch', 'Perforation failure'],
            interfoldedBenefits: ['No winding issues', 'Pop-up dispensing', 'One-handed use']
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
      },
      {
        id: 'slide-09',
        sectionId: 'solution',
        slideNumber: 9,
        type: 'solution',
        headline: 'The UX Difference',
        subheadline: 'What Users Feel',
        content: [
          'Before: "I can feel it. I hate this."',
          'After: "It feels insulated, drier, less gross."'
        ],
        bullets: [
          'Reduced heat transmission',
          'Rapid moisture uptake (stabilizes loose stool)',
          'Calmer carry-time experience',
          'Familiar invert-and-tie motion retained'
        ]
      }
    ]
  },
  {
    id: 'product',
    title: 'Product System',
    color: SECTION_COLORS.product,
    slides: [
      {
        id: 'slide-10',
        sectionId: 'product',
        slideNumber: 10,
        type: 'section-header',
        headline: 'Product System',
        subheadline: '"Razor + blade economics in pet hygiene"'
      },
      {
        id: 'slide-11',
        sectionId: 'product',
        slideNumber: 11,
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
            sku3: { name: 'Dispenser', price: '$24.99', role: 'Acquisition' }
          }
        }
      },
      {
        id: 'slide-12',
        sectionId: 'product',
        slideNumber: 12,
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
        id: 'slide-13',
        sectionId: 'goToMarket',
        slideNumber: 13,
        type: 'section-header',
        headline: 'Path to Market',
        subheadline: 'Manufacturing + Retail Beta Strategy'
      },
      {
        id: 'slide-14',
        sectionId: 'goToMarket',
        slideNumber: 14,
        type: 'business',
        headline: 'Manufacturing Strategy',
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
            partners: ['China/Turkey (cost)', 'USA (speed/quality)']
          }
        },
        deepDive: {
          title: 'Supply Chain',
          sections: [
            {
              title: 'Material Sourcing',
              content: 'Bioplastic film: BASF (Ecoflex), Novamont (Mater-Bi), or Asian PBAT suppliers. Airlaid paper: Glatfelter, McAirlaid\'s, or Chinese equivalents. Adhesives: Henkel, H.B. Fuller, or eco-adhesive specialists.'
            },
            {
              title: 'Capital Expenditure',
              content: 'Custom dies: $5K-10K. Entry-level semi-auto: <$15K (prototyping). Mid-range modified Chinese machine: $40K-80K. High-end European line: $250K+.'
            }
          ]
        }
      },
      {
        id: 'slide-15',
        sectionId: 'goToMarket',
        slideNumber: 15,
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
            phase3: { months: '4-9', milestone: 'Automated interfold production + certification + scale' }
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
        id: 'slide-16',
        sectionId: 'goToMarket',
        slideNumber: 16,
        type: 'business',
        headline: 'Competitive Positioning',
        subheadline: 'Why We Win',
        content: [
          '2×2: Containment-only vs Sanitary performance × Commodity vs Premium'
        ],
        bullets: [
          'Standard HDPE: Cheap, gross, environmental guilt',
          'Earth Rated: Scent masks but doesn\'t eliminate, still thin film',
          'Flush Puppies: Dissolves in rain/wet grass, high failure rate',
          'PoopShark (paper): Rigid, bulky, requires different scooping motion',
          'Us: Familiar motion + sanitary insulation + premium system'
        ],
        notes: 'Blue Ocean opportunity: Retain flexible bag mechanics + add performance of paper solutions'
      }
    ]
  },
  {
    id: 'business',
    title: 'Business Model',
    color: SECTION_COLORS.business,
    slides: [
      {
        id: 'slide-17',
        sectionId: 'business',
        slideNumber: 17,
        type: 'section-header',
        headline: 'Business Model & IP',
        subheadline: 'Razor-blade economics + format lock-in'
      },
      {
        id: 'slide-18',
        sectionId: 'business',
        slideNumber: 18,
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
        id: 'slide-19',
        sectionId: 'business',
        slideNumber: 19,
        type: 'business',
        headline: 'Business Model',
        bullets: [
          'Starter Kit: Dispenser + 2 refills (near break-even CAC)',
          'Refills: Recurring margin engine (subscription + retail)',
          'Accessories: Leash clip / mini pouch / travel kit'
        ],
        content: [
          'Moat: Format + dispenser ecosystem.',
          'Customers can\'t easily switch back to cheap generic rolls—they don\'t fit the superior dispenser.'
        ]
      },
      {
        id: 'slide-20',
        sectionId: 'business',
        slideNumber: 20,
        type: 'business',
        headline: 'IP Strategy',
        subheadline: 'We\'re an IP development company',
        content: [
          'Defensibility layers:'
        ],
        bullets: [
          'Folding / interfold system + liner placement',
          'Dispenser + refill interface (ecosystem lock-in)',
          'Trade secrets: Bonding zones, dimensions, QC thresholds',
          'Provisional → utility patent as traction confirms'
        ],
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
        id: 'slide-21',
        sectionId: 'ask',
        slideNumber: 21,
        type: 'section-header',
        headline: 'The Raise',
        subheadline: 'Pre-seed to validate retail pull and scale manufacturing'
      },
      {
        id: 'slide-22',
        sectionId: 'ask',
        slideNumber: 22,
        type: 'ask',
        headline: 'What We\'re Raising For',
        bullets: [
          'Materials + pilot manufacturing (5k-10k units)',
          'Dispenser iterations + tooling',
          'Retail beta + sampling (25-50 stores)',
          'IP filing + certifications (compostability, etc.)'
        ],
        content: [
          'Outcome: Validated unit economics + retail pull + scalable manufacturing partner.',
          'Timeline: 9-12 months to retail beta completion.'
        ]
      },
      {
        id: 'slide-23',
        sectionId: 'ask',
        slideNumber: 23,
        type: 'ask',
        headline: 'We\'re turning a hated moment into a premium hygiene system',
        content: [
          'If pets are family, cleanup should feel like it.'
        ],
        notes: 'CTA: "Let\'s discuss pilot + rollout."'
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
