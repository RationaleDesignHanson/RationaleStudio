#!/usr/bin/env node

/**
 * Generate Apple Vision Pro imagery for Athletes First
 * Hyper-stylized virtual world with Ready Player One aesthetic
 * Using brand colors and real athlete reference
 */

import Replicate from 'replicate';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Athletes First brand colors
const BRAND_COLORS = {
  primaryBlue: '#0066FF',
  cyan: '#00D9FF',
  green: '#00FF94',
  orange: '#FF6B00',
  purple: '#9D4EDD',
  terminalGold: '#FFD700',
};

// Vision Pro scene prompts
const SCENE_PROMPTS = [
  {
    id: 'contract-hologram',
    title: 'Contract Hologram Visualization',
    prompt: `Cinematic shot of a professional athlete wearing Apple Vision Pro headset in a dark futuristic room.
    Holographic contract data floating around them in neon cyan (#00D9FF) and gold (#FFD700) colors.
    3D bar charts, financial projections, and legal terms rendered as glowing transparent UI panels.
    Ready Player One aesthetic with volumetric lighting, lens flares, and particle effects.
    Athlete is reaching out to manipulate a floating holographic contract document.
    Hyper-detailed, dramatic rim lighting, photorealistic rendering with stylized sci-fi elements.
    8K quality, Unreal Engine style visualization. Dark background with neon accents.`,
    aspectRatio: '16:9',
  },
  {
    id: 'virtual-stadium',
    title: 'Virtual Stadium Analytics',
    prompt: `Professional athlete in Apple Vision Pro standing in a massive virtual stadium environment.
    Stadium is a fusion of physical and digital - real concrete structure with holographic overlays.
    Data streams and statistics flowing through the air in neon green (#00FF94) and purple (#9D4EDD).
    Ready Player One style with cyberpunk lighting - massive LED screens showing performance analytics.
    Athlete in center of field surrounded by 360-degree data visualization.
    Particle systems, volumetric fog, dramatic spotlights.
    Hyper-stylized but photorealistic athlete, sci-fi environment.
    Epic composition, wide angle, cinematic color grading. 8K render.`,
    aspectRatio: '16:9',
  },
  {
    id: 'digital-twin-mirror',
    title: 'Digital Twin Mirror World',
    prompt: `Athlete wearing Apple Vision Pro facing their digital twin in a mirrored virtual dimension.
    Real athlete on left in muted colors, digital twin on right glowing with neon orange (#FF6B00) energy.
    Between them: a shimmering portal/membrane with data particles flowing through.
    Ready Player One aesthetic - glitching digital effects, scan lines, holographic distortion.
    Digital twin is slightly transparent with circuit patterns visible through body.
    Background splits - real world (dark concrete) vs virtual world (glowing grid cyberspace).
    Dramatic symmetrical composition, volumetric lighting, lens flares.
    Photorealistic with heavy stylization. Blade Runner meets Tron meets Ready Player One.`,
    aspectRatio: '1:1',
  },
  {
    id: 'nil-marketplace',
    title: 'NIL Marketplace VR Experience',
    prompt: `Wide shot of athlete in Apple Vision Pro exploring a massive virtual NIL marketplace.
    Floating brand logos and deal cards orbit around them like planets - each glowing in brand colors.
    Cyan (#00D9FF), gold (#FFD700), green (#00FF94) holographic UI elements everywhere.
    Ready Player One inspired virtual bazaar with endless depth - layers of floating platforms.
    Athlete reaching toward a glowing deal card that shows dollar amounts in holographic text.
    Particle trails, light beams connecting different deals, volumetric god rays.
    Hyper-detailed photorealistic athlete in stylized sci-fi environment.
    Epic scale, dramatic lighting, 8K quality render.`,
    aspectRatio: '16:9',
  },
  {
    id: 'recruiting-war-room',
    title: 'Virtual Recruiting War Room',
    prompt: `Athlete in Apple Vision Pro inside a futuristic virtual war room command center.
    Multiple holographic screens floating in arc formation showing different team offers.
    Each screen glows with team colors but unified with cyan (#00D9FF) and purple (#9D4EDD) UI framework.
    Ready Player One style tactical room - dark environment with intense accent lighting.
    Athlete standing at center console with hands manipulating holographic contracts.
    3D comparison charts, risk analysis graphs, salary projections all floating in space.
    Volumetric displays, lens flares, particle effects, scan line overlays.
    Photorealistic person in hyper-stylized sci-fi environment. Cinematic composition, 8K render.`,
    aspectRatio: '16:9',
  },
  {
    id: 'amplify-content-stream',
    title: 'Amplify AI Content Stream',
    prompt: `Dynamic shot of athlete wearing Apple Vision Pro with streams of social media content flowing around them.
    Hundreds of small video thumbnails and posts flowing in spiral patterns - golden (#FFD700) energy trails.
    Ready Player One aesthetic - digital content represented as glowing particles and light streams.
    Athlete at center of a content vortex with hands controlling the flow.
    Each content piece has subtle glow in brand colors - cyan, green, orange, purple.
    Dark background with explosive lighting from content streams.
    Particle systems, motion blur, volumetric effects, lens flares.
    Photorealistic athlete in hyper-stylized digital environment.
    Epic energy, dramatic composition, 8K quality.`,
    aspectRatio: '1:1',
  },
];

async function generateImage(sceneConfig) {
  console.log(`\n🎨 Generating: ${sceneConfig.title}`);
  console.log(`📝 Prompt: ${sceneConfig.prompt.substring(0, 100)}...`);

  try {
    const output = await replicate.run(
      'black-forest-labs/flux-1.1-pro',
      {
        input: {
          prompt: sceneConfig.prompt,
          aspect_ratio: sceneConfig.aspectRatio,
          output_format: 'png',
          output_quality: 100,
          safety_tolerance: 2,
        }
      }
    );

    console.log(`✅ Generated: ${sceneConfig.id}`);
    console.log(`🔗 URL: ${output}`);

    // Download the image
    const response = await fetch(output);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const outputDir = path.join(__dirname, '..', 'public', 'images', 'vision-pro');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${sceneConfig.id}.png`);
    fs.writeFileSync(outputPath, buffer);

    console.log(`💾 Saved: ${outputPath}`);

    return {
      id: sceneConfig.id,
      title: sceneConfig.title,
      url: output,
      localPath: outputPath,
      success: true,
    };
  } catch (error) {
    console.error(`❌ Error generating ${sceneConfig.id}:`, error.message);
    return {
      id: sceneConfig.id,
      title: sceneConfig.title,
      success: false,
      error: error.message,
    };
  }
}

async function generateAllScenes() {
  console.log('🚀 Starting Apple Vision Pro imagery generation...');
  console.log(`📊 Total scenes: ${SCENE_PROMPTS.length}`);
  console.log('🎨 Style: Ready Player One hyper-stylized aesthetic');
  console.log('🎨 Brand Colors:', Object.entries(BRAND_COLORS).map(([k, v]) => `${k}: ${v}`).join(', '));

  const results = [];

  // Generate sequentially to avoid rate limits
  for (const scene of SCENE_PROMPTS) {
    const result = await generateImage(scene);
    results.push(result);

    // Wait 2 seconds between requests
    if (scene !== SCENE_PROMPTS[SCENE_PROMPTS.length - 1]) {
      console.log('⏳ Waiting 2s before next generation...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log('\n📊 Generation Summary:');
  console.log(`✅ Successful: ${results.filter(r => r.success).length}`);
  console.log(`❌ Failed: ${results.filter(r => !r.success).length}`);

  // Save manifest
  const manifestPath = path.join(__dirname, '..', 'public', 'images', 'vision-pro', 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Manifest saved: ${manifestPath}`);

  return results;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateAllScenes()
    .then(results => {
      console.log('\n✨ Generation complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    });
}

export { generateAllScenes, SCENE_PROMPTS };
