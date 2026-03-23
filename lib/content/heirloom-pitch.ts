/**
 * Heirloom Pitch Site Content
 * 
 * Content for the Heirloom pitch microsite targeting investors, partners, and beta testers.
 */

export const heirloomPitchContent = {
  hero: {
    headline: "Recipes worth passing down.",
    subhead: "The universal save button for food on the internet.",
    body: "Heirloom is the easiest way to save recipes from anywhere — especially video. If you can share it, you can cook it.",
    ctaPrimary: {
      text: "Request Access",
      href: "/contact?product=heirloom&type=beta"
    },
    ctaSecondary: {
      text: "Watch Demo",
      href: "#demo"
    }
  },

  problem: {
    title: "Great recipes are everywhere. Saving them is still a mess.",
    narrative: "You found the perfect pasta recipe on TikTok at 11pm. You screenshot it. Maybe you 'saved' it in the app. But when Friday night comes and you actually want to cook it? Good luck. The recipe is buried in your camera roll. Or worse — it's a video you have to pause every 8 seconds while your hands are covered in garlic.",
    stats: [
      { number: "56%", label: "of Gen Z uses TikTok for recipes" },
      { number: "58%", label: "of home cooks are bored with meals" },
      { number: "71%", label: "have family recipes they fear losing" },
      { number: "0", label: "recipe apps built for video-first" }
    ]
  },

  solution: {
    title: "If you can share it, you can cook it.",
    intro: "We didn't build another place to search for recipes. We built the save button that should have existed from the start.",
    steps: [
      {
        number: 1,
        title: "Find a recipe anywhere",
        description: "TikTok, Instagram, YouTube, PDFs, websites, screenshots, handwritten cards"
      },
      {
        number: 2,
        title: "Tap Share → Heirloom",
        description: "AI extracts ingredients, steps, and attribution automatically"
      },
      {
        number: 3,
        title: "Cook it forever",
        description: "Clean recipe card, scaling, shopping lists, cooking mode"
      }
    ]
  },

  demo: {
    title: "From video to recipe — instantly.",
    body: "This is what sets Heirloom apart. We don't just grab the video description — we actually analyze the content.",
    capabilities: [
      {
        title: "Audio Analysis",
        description: "Transcribe narration and voiceover. Works in any language."
      },
      {
        title: "Visual Detection",
        description: "Detect on-screen ingredient lists and cooking techniques."
      },
      {
        title: "Smart Parsing",
        description: "Combine all sources into a structured, cookable recipe."
      }
    ]
  },

  formats: {
    title: "Every format. One tap.",
    items: [
      {
        title: "Social Videos",
        description: "TikTok, Reels, Shorts — full audio + visual analysis"
      },
      {
        title: "ASMR & Silent",
        description: "No talking? No problem. Visual-only extraction"
      },
      {
        title: "PDFs & Cookbooks",
        description: "Multi-recipe detection, automatic splitting"
      },
      {
        title: "Websites & Blogs",
        description: "Skip the life story, extract the recipe"
      },
      {
        title: "Screenshots",
        description: "OCR extracts text from any image"
      },
      {
        title: "Handwritten Cards",
        description: "Preserve grandma's recipe digitally"
      }
    ]
  },

  features: {
    title: "Built for how people actually cook.",
    items: [
      {
        title: "Share Extension",
        description: "Save from any app with one tap. The product IS the share button."
      },
      {
        title: "Smart Scaling",
        description: "Cooking for 2 instead of 6? One slider adjusts everything."
      },
      {
        title: "Cooking Mode",
        description: "Screen stays on. Large text. Step-by-step. Hands-free."
      },
      {
        title: "Shopping Lists",
        description: "Combine ingredients across recipes. Organize by aisle."
      },
      {
        title: "Meal Planning",
        description: "Drag recipes to calendar. Generate weekly grocery lists."
      },
      {
        title: "Recipe Lineage",
        description: "Track how recipes evolve across family members."
      }
    ]
  },

  differentiators: {
    title: "Features no one else offers.",
    items: [
      {
        title: "Video-to-Recipe AI",
        description: "Full extraction from audio, on-screen text, and visual cues. No more pausing videos while cooking."
      },
      {
        title: "Recipe Lineage",
        description: "Track modifications across generations. Grandma's original → Mom's version → Your version."
      },
      {
        title: "Heritage Collections",
        description: "Curated cultural cuisine collections. Italian, Korean, Soul Food, Mexican, and more."
      },
      {
        title: "Creator Attribution",
        description: "Automatically credits original creators with name, handle, and link back."
      }
    ]
  },

  market: {
    title: "$1.2B market. Zero products built for today.",
    stats: [
      { number: "$1.2B", label: "Recipe app market (2024)" },
      { number: "8.5%", label: "Annual growth through 2030" },
      { number: "145M", label: "US home cooks" }
    ],
    narrative: "Recipe discovery has shifted. Gen Z finds recipes on TikTok. But the apps haven't caught up — Paprika was built in 2010, and Yummly just shut down. There is no recipe app designed for video-first discovery. Until now.",
    audiences: [
      {
        title: "Family Preservers",
        ageRange: "Ages 35-55+",
        description: "Fear of losing recipes",
        marketShare: "25% of market"
      },
      {
        title: "Cooking Enthusiasts",
        ageRange: "Ages 25-54",
        description: "Screenshot hoarders",
        marketShare: "60% of market"
      },
      {
        title: "Food Creators",
        ageRange: "Ages 18-34",
        description: "Video→recipe workflow",
        marketShare: "15% of market"
      }
    ]
  },

  competitive: {
    title: "Four features no competitor offers.",
    comparison: [
      {
        feature: "Video-to-Recipe AI",
        heirloom: true,
        paprika: false,
        pestle: "partial",
        nyt: false
      },
      {
        feature: "Recipe Lineage",
        heirloom: true,
        paprika: false,
        pestle: false,
        nyt: false
      },
      {
        feature: "Heritage Collections",
        heirloom: true,
        paprika: false,
        pestle: false,
        nyt: false
      },
      {
        feature: "Creator Attribution",
        heirloom: true,
        paprika: false,
        pestle: "partial",
        nyt: false
      },
      {
        feature: "Share Extension",
        heirloom: true,
        paprika: true,
        pestle: true,
        nyt: false
      }
    ],
    callout: "We're not competing on features — we're defining a new category."
  },

  business: {
    title: "Freemium subscription. Strong unit economics.",
    pricing: [
      {
        tier: "Free",
        price: "$0",
        description: "15 recipes, core features"
      },
      {
        tier: "Annual",
        price: "$35.99/yr",
        description: "Unlimited + all premium",
        badge: "BEST VALUE"
      },
      {
        tier: "Lifetime",
        price: "$79.99",
        description: "One-time purchase"
      }
    ],
    economics: {
      ltv: "$35 LTV",
      cac: "$8 CAC",
      ratio: "4:1+ LTV:CAC"
    },
    trial: "7-day free trial. No credit card required."
  },

  team: {
    title: "Built by someone who's shipped to billions.",
    founder: {
      name: "Matt Hanson",
      role: "Founder & CEO",
      bio: "Former Product Design Lead at Meta Reality Labs (7+ years). Shipped AR/AI to 2B+ users. 15+ patents."
    },
    quote: "I have 400+ recipe screenshots on my phone. I've cooked maybe 10 of them. When my grandmother passed, I realized half her recipes went with her. Heirloom is the app I wish existed.",
    highlights: [
      {
        icon: "🎯",
        title: "Meta Reality Labs",
        description: "Led design for 400+ person org. Shipped Spark AR, AR Commerce."
      },
      {
        icon: "🚀",
        title: "Rationale Studio",
        description: "Strategy-led product studio. Portfolio: Zero, Heirloom."
      },
      {
        icon: "💡",
        title: "Technical Depth",
        description: "Full-stack iOS, AI integration, consumer product design."
      }
    ]
  },

  cta: {
    title: "Let's talk.",
    tracks: [
      {
        audience: "For Beta Testers",
        description: "We're recruiting people who cook 2-3x/week and save recipes from social media.",
        buttonText: "Join Beta →",
        href: "/contact?product=heirloom&type=beta"
      },
      {
        audience: "For Partners",
        description: "Open to strategic partnerships with food media, creator platforms, and kitchen brands.",
        buttonText: "Get in Touch →",
        href: "/contact?product=heirloom&type=partner"
      },
      {
        audience: "For Investors",
        description: "Raising seed to scale post-launch.",
        buttonText: "Request Deck →",
        href: "/contact?product=heirloom&type=investor"
      }
    ],
    contact: {
      email: "matt@rationale.work",
      website: "heirloomrecipes.app",
      social: "@heirloomrecipes"
    }
  },

  footer: {
    links: [
      { text: "Privacy", href: "/heirloom/privacy" },
      { text: "Terms", href: "/heirloom/support" },
      { text: "Contact", href: "/contact?product=heirloom" }
    ],
    copyright: "© 2026 Rationale Studio"
  },

  ai: {
    title: "AI that actually understands cooking.",
    subtitle: "Multi-modal extraction, intelligent augmentation, and vision-only processing — no competitor offers this.",
    
    videoProcessing: {
      title: "Video-to-Recipe: Three AI Systems Working Together",
      description: "Heirloom combines on-device transcription, visual analysis, and structured extraction to turn any cooking video into a cookable recipe.",
      capabilities: [
        {
          name: "Audio Transcription",
          description: "WhisperKit processes audio on-device (free, private, works offline). Handles multiple languages, accents, and cooking terminology.",
          technical: "On-device WhisperKit models (tiny/base/small) selected based on device memory. Processes at ~0.15x real-time speed."
        },
        {
          name: "Visual Detection",
          description: "Vision framework OCR extracts on-screen ingredient lists, temperatures, and measurements. Claude analyzes frames for cooking techniques.",
          technical: "Vision OCR + Claude Sonnet 4 vision API. Extracts 5 key frames, analyzes for recipe-relevant text (temperatures, measurements, techniques)."
        },
        {
          name: "Structured Extraction",
          description: "Claude Sonnet 4 combines transcript + visual elements into structured recipe with confidence scores, inferred quantities, and cooking steps.",
          technical: "Sophisticated prompt engineering with domain-specific knowledge. Temperature 0.3 for consistency. Structured JSON output with confidence levels."
        }
      ],
      pipeline: [
        { step: 1, name: "Extract Audio", duration: "5-10s", ai: false },
        { step: 2, name: "Transcribe (WhisperKit)", duration: "~15% of video length", ai: "On-device" },
        { step: 3, name: "Analyze Frames (Vision OCR)", duration: "15-30s", ai: "Claude Vision" },
        { step: 4, name: "Structure Recipe (Claude)", duration: "5-15s", ai: "Claude Sonnet 4" },
        { step: 5, name: "Augment Missing Data", duration: "5-10s", ai: "Claude + Similar Recipes" }
      ],
      cost: "~$0.01-0.02 per video (WhisperKit free, Claude API only for structuring)"
    },

    asmrProcessing: {
      title: "ASMR Mode: Vision-Only Extraction (No Audio Needed)",
      description: "For silent cooking videos, ASMR content, or videos without narration, Heirloom uses a 5-pass Claude vision analysis pipeline.",
      passes: [
        {
          pass: 1,
          name: "Dish Identification",
          description: "Analyzes final frames to identify the completed dish. Preserves user's description when provided.",
          technical: "Claude vision analyzes final frames. User caption takes precedence over visual appearance."
        },
        {
          pass: 2,
          name: "Ingredient Detection",
          description: "Detects visible ingredients across setup and cooking frames. Estimates quantities from visual cues (measuring cups, package sizes, hand comparisons).",
          technical: "Processes frames in chunks (4 per API call). Tracks ingredient transformations (raw → chopped → cooked) with timestamps."
        },
        {
          pass: 3,
          name: "Culinary Inference",
          description: "Infers hidden ingredients based on dish type and culinary knowledge. Uses Claude's understanding of standard recipes.",
          technical: "Claude analyzes detected ingredients + dish type to infer missing components (e.g., salt, oil, common spices not visible)."
        },
        {
          pass: 4,
          name: "Action Recognition",
          description: "Identifies cooking techniques from visual cues: sautéing, roasting, mixing, folding, etc.",
          technical: "Claude vision analyzes cooking frames for technique patterns. Extracts timing and temperature from visual indicators."
        },
        {
          pass: 5,
          name: "Synthesis & Validation",
          description: "Combines all findings into structured recipe. Validates completeness and fills gaps using augmentation.",
          technical: "Final Claude call synthesizes all passes. Recipe augmentation fills missing quantities using similar recipes or web search."
        }
      ],
      differentiator: "No competitor offers vision-only recipe extraction. Most apps require audio narration or manual entry."
    },

    imageExtraction: {
      title: "Multi-Recipe Detection & OCR",
      description: "Heirloom can detect and extract multiple recipes from a single image — perfect for cookbook pages and recipe card collections.",
      features: [
        {
          feature: "Multi-Recipe Detection",
          description: "Claude vision detects distinct recipes with bounding boxes. Intelligently avoids splitting single recipes with subsections (e.g., 'Crust' + 'Filling' = one recipe).",
          technical: "Claude Sonnet 4 with specialized prompt engineering. Returns bounding boxes (x, y, width, height as percentages) with confidence scores."
        },
        {
          feature: "OCR with Error Correction",
          description: "Extracts text from handwritten cards, vintage cookbooks, and screenshots. AI fixes common OCR errors (l→1, O→0, rn→m).",
          technical: "Claude vision API with OCR-optimized prompts. Temperature 0.3 for consistency. Returns structured JSON with confidence levels per field."
        },
        {
          feature: "Confidence Scoring",
          description: "Every extraction includes confidence scores (high/medium/low) for title, ingredients, and instructions. Users can review low-confidence extractions.",
          technical: "Confidence based on text legibility, OCR clarity, and extraction completeness. Stored with recipe for user review."
        }
      ]
    },

    augmentation: {
      title: "Intelligent Recipe Augmentation",
      description: "When video extraction has missing or imprecise quantities, Heirloom augments recipes using similar recipes and culinary knowledge.",
      process: [
        {
          step: "Find Similar Recipes",
          description: "Searches user's local recipe collection using multi-factor similarity (ingredient overlap 50%, title 30%, tags 10%, timing 10%). Also searches web if local matches < 3.",
          technical: "LocalRecipeSimilarityService uses Jaccard similarity for ingredients, Levenshtein distance for titles. WebRecipeSearchService uses DuckDuckGo/Brave Search API."
        },
        {
          step: "Infer Missing Quantities",
          description: "Claude analyzes similar recipes and infers standard quantities for missing ingredients. Uses culinary knowledge when no similar recipes found.",
          technical: "Claude Sonnet 4 with temperature 0.2 for consistency. Prompt includes similar recipe context + dish type knowledge. Returns inferred quantities with confidence levels."
        },
        {
          step: "Web Search Fallback",
          description: "For empty extractions (title-only), searches web for recipe by name. Enriches with full ingredient list and instructions.",
          technical: "WebRecipeSearchService searches DuckDuckGo/Brave. RecipeImportService parses HTML from recipe sites. Falls back to best match if multiple found."
        }
      ],
      example: "Video says 'add some butter' → Augmentation infers '2 tablespoons' based on similar recipes and dish type."
    },

    watermarkDetection: {
      title: "Automatic Creator Attribution",
      description: "Claude vision detects creator watermarks and handles in video frames, automatically populating attribution fields.",
      technical: "WatermarkDetectionService analyzes 3 frames using Claude vision API. Detects @handles, platform logos, and creator names. Returns platform-specific profile URLs.",
      platforms: ["TikTok", "YouTube", "Instagram", "Facebook", "Twitter"]
    },

    differentiation: {
      title: "What Makes Heirloom's AI Different",
      points: [
        {
          point: "Multi-Modal Processing",
          description: "Combines audio transcription + visual OCR + structured extraction. Competitors typically use only one modality."
        },
        {
          point: "ASMR Mode",
          description: "Vision-only extraction pipeline for silent videos. No competitor offers this — they all require audio narration."
        },
        {
          point: "Intelligent Augmentation",
          description: "Uses similar recipes + web search + Claude inference to fill missing data. Not just extraction — actual recipe completion."
        },
        {
          point: "Confidence Scoring",
          description: "Every extraction includes confidence levels. Users can review and correct low-confidence items. Creates feedback loop for improvement."
        },
        {
          point: "On-Device Transcription",
          description: "WhisperKit runs locally (free, private, offline-capable). Most competitors use cloud APIs (cost, privacy concerns)."
        },
        {
          point: "Multi-Recipe Detection",
          description: "Can extract multiple recipes from cookbook pages. Competitors typically handle one recipe per image."
        }
      ]
    },

    dataOpportunities: {
      title: "Data Plays & Model Tuning Opportunities",
      description: "As Heirloom scales, we'll collect valuable data for model improvement and new AI capabilities.",
      
      currentData: {
        title: "Data We're Already Collecting",
        items: [
          {
            data: "Extraction Success/Failure Rates",
            use: "Track which video types extract well vs poorly. Identify patterns (e.g., ASMR videos need vision-only mode)."
          },
          {
            data: "Confidence Scores",
            use: "Map confidence scores to user corrections. Identify where AI is over/under-confident. Tune prompts based on accuracy."
          },
          {
            data: "User Corrections",
            use: "When users edit AI-extracted recipes, we capture corrections. This creates a labeled dataset for fine-tuning (with user consent)."
          },
          {
            data: "Similar Recipe Matching Patterns",
            use: "Track which similarity algorithms work best. Improve LocalRecipeSimilarityService scoring weights based on user behavior."
          },
          {
            data: "Augmentation Success Rates",
            use: "Measure how often augmented quantities are correct vs need user correction. Improve inference prompts."
          }
        ]
      },

      futureOpportunities: {
        title: "Future Model Tuning & Data Plays",
        opportunities: [
          {
            opportunity: "Domain-Specific Recipe Model",
            description: "Fine-tune Claude on Heirloom's recipe corpus (with user consent). Specialized model for recipe extraction would be faster and cheaper than general-purpose Claude.",
            data: "User-corrected recipes, successful extractions, recipe patterns",
            impact: "50-70% cost reduction, 2-3x faster extraction, better accuracy on cooking-specific terminology"
          },
          {
            opportunity: "Ingredient Quantity Prediction Model",
            description: "Train a specialized model to predict ingredient quantities from dish type + visible ingredients. Reduces reliance on similar recipes.",
            data: "User recipes with quantities, augmentation corrections, standard recipe patterns",
            impact: "Better augmentation accuracy, works even when user has no similar recipes"
          },
          {
            opportunity: "Cooking Technique Recognition",
            description: "Computer vision model trained on Heirloom's video frames to recognize cooking techniques (sauté, roast, fold, etc.) without Claude API calls.",
            data: "Video frames labeled with techniques, user corrections to technique detection",
            impact: "Faster ASMR processing, lower cost, better technique extraction"
          },
          {
            opportunity: "Recipe Quality Scoring",
            description: "Model that scores recipe completeness and quality. Identifies recipes that need augmentation or user review.",
            data: "User edits, recipe usage patterns, successful vs failed cooking attempts",
            impact: "Better user experience, proactive quality checks"
          },
          {
            opportunity: "Cuisine-Specific Extraction",
            description: "Specialized models for different cuisines (Italian, Korean, Mexican, etc.). Better handling of cuisine-specific ingredients and techniques.",
            data: "Recipes tagged by cuisine, extraction accuracy by cuisine type",
            impact: "Higher accuracy for international recipes, better ingredient recognition"
          },
          {
            opportunity: "User Preference Learning",
            description: "Learn from user edits to personalize extraction (e.g., user always adds 'salt to taste', prefers metric vs imperial).",
            data: "User edit patterns, recipe modifications, cooking preferences",
            impact: "Personalized extraction, less user editing needed"
          }
        ]
      },

      competitiveAdvantage: {
        title: "Data Moat",
        description: "As users save and correct recipes, Heirloom builds a proprietary dataset that improves extraction accuracy. Competitors without this data can't match our quality.",
        metrics: [
          "10,000+ corrected recipes = training dataset for fine-tuning",
          "100,000+ successful extractions = pattern recognition for augmentation",
          "1M+ recipes = largest private recipe corpus for domain-specific models"
        ]
      }
    }
  }
};
