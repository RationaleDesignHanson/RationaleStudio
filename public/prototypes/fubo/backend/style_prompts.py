# Master style prompts optimized for Gemini 2.5 Flash Image (Banana Nano)
# PRD-aligned 5 Core Style Packs for Fubo Thumbnail Generation

STYLE_PROMPTS = {
    # PRD Style Pack 1: Photo Real - Clean, realistic, team-colored (Team channels)
    'photo-real': 'Transform into photorealistic sports imagery: pristine professional photography, authentic team uniforms with visible logos and branding, clean realistic lighting, sharp focus, high-detail textures, team colors naturally integrated through jerseys and equipment, professional sports photography aesthetic, stadium environment in background, 8k quality, natural color grading emphasizing team identity, allow authentic team logos, jersey numbers, and identifying marks, authentic branding visible',
    
    # PRD Style Pack 2: Bold Posterized - High contrast, graphic (Highlights)
    'bold-posterized': 'Transform into bold posterized graphic art: high-contrast color blocking, crushed blacks with blown highlights, vibrant team color emphasis, graphic poster design, screen-printed aesthetic, limited color palette dominated by team colors, bold graphic shapes, dramatic shadows, pop art influence, striking visual impact, simplified forms with maximum contrast, dynamic composition, team logos and branding stylized as graphic elements',
    
    # PRD Style Pack 3: Studio Lighting - Neutral portrait look (Player or talent cards)
    'studio-lighting': 'Transform into professional studio portrait: clean neutral lighting setup, soft key light with subtle fill, seamless gray or white backdrop, professional headshot quality, commercial photography aesthetic, sharp focus on subject, minimal shadows, clean professional look, team jersey visible with authentic logos, high-end portrait photography, catalog-quality lighting, team branding clearly visible',
    
    # PRD Style Pack 4: Cinematic Grain - Warm, filmic tone (Premium events)
    'cinematic-grain': 'Transform into cinematic film photography: warm color grading, subtle film grain texture, 35mm film aesthetic, shallow depth of field, cinematic color palette, golden hour lighting feel, anamorphic lens flares, film emulation, warm highlights and rich shadows, premium broadcast quality, team colors with warm filmic treatment, authentic logos visible through film grain, movie poster quality',
    
    # PRD Style Pack 5: Halftone Retro - Textured, nostalgic (Campaigns)
    'halftone-retro': 'Transform into vintage halftone print: retro newspaper/magazine halftone dot patterns, nostalgic color palette with team color emphasis, vintage sports poster aesthetic, Ben-Day dots, screen-printed texture, 1960s-1980s sports graphic style, weathered print quality, classic sports illustration feel, retro typography compatible, vintage team branding integration, authentic logos rendered in halftone style, throwback aesthetic',
    
    # Legacy styles maintained for compatibility (can be deprecated later)
    'video-game': 'Apply AAA game cover art: epic cinematic lighting, dramatic lens flares, cosmic nebula background, glowing particle effects, hyper-realistic character render, intense action pose, Madden NFL style, dynamic composition, professional game cover aesthetic, team logos visible',
    'gradient': 'Transform into dramatic gradient-lit sports portrait: full-body shot of athlete in dynamic, action-oriented pose, wearing sport-specific uniform, dramatic atmospheric setting with glowing rectangular light elements and subtle light streaks creating energetic moody environment, vibrant red and blue gradient lighting casting dramatic shadows and highlights on athlete and environment, focused determined expression, professional sports photography with cinematic gradient lighting treatment',
    'comic-book': 'Apply American superhero comic book art: bold thick black ink outlines, vibrant cel-shaded colors, Ben-Day dot halftone patterns, dynamic action lines and motion streaks, pop art aesthetics, graphic novel art style, dramatic lighting and shadows, high contrast colors, team logos stylized in comic book style',
    'ink-splatter': 'TRANSFORM into Japanese Sumi-e ink wash painting: BOLD team color ink splashes and drips, DRAMATIC colored splatters using team colors, VIBRANT team color emphasis throughout, energetic team color ink splatters, minimalist approach with team color focus, calligraphy brush strokes in team colors',
    'layered-papercraft': 'TRANSFORM INTO LAYERED PAPERCRAFT DIORAMA: Construct a 3D sports papercraft diorama built from multiple layers of thick cardstock with VIBRANT team colors, tangible sense of depth, visible soft drop shadows between each layer, dimensional macro photography lighting',
    'risograph': 'Apply Risograph style: VIBRANT team color palette, BOLD halftone patterns using team colors, INTENSE color saturation, vintage poster rendering with BRILLIANT team color emphasis, halftone grain with team color overlays',
    
    # Aliases for compatibility
    'photo real': 'Transform into photorealistic sports imagery: pristine professional photography, authentic team uniforms with visible logos and branding, clean realistic lighting, sharp focus, high-detail textures, team colors naturally integrated through jerseys and equipment, professional sports photography aesthetic, stadium environment in background, 8k quality, natural color grading emphasizing team identity, allow authentic team logos, jersey numbers, and identifying marks, authentic branding visible',
    'video game': 'Apply AAA game cover art: epic cinematic lighting, dramatic lens flares, cosmic nebula background, glowing particle effects, hyper-realistic character render, intense action pose, Madden NFL style, dynamic composition, professional game cover aesthetic, team logos visible',
    'comic book': 'Apply American superhero comic book art: bold thick black ink outlines, vibrant cel-shaded colors, Ben-Day dot halftone patterns, dynamic action lines and motion streaks, pop art aesthetics, graphic novel art style, dramatic lighting and shadows, high contrast colors, team logos stylized in comic book style',
    'ink splatter': 'TRANSFORM into Japanese Sumi-e ink wash painting: BOLD team color ink splashes and drips, DRAMATIC colored splatters using team colors, VIBRANT team color emphasis throughout, energetic team color ink splatters, minimalist approach with team color focus, calligraphy brush strokes in team colors',
}

# Style reference image mapping (matching actual files in style_references/)
STYLE_REFERENCES = {
    # PRD Core Styles - Unique references (no duplicates)
    'photo-real': 'photoreals.webp',  # Photorealistic sports imagery
    'photo real': 'photoreals.webp',
    'bold-posterized': 'hi-contrast.jpeg',  # High contrast poster style
    'bold posterized': 'hi-contrast.jpeg',
    'studio-lighting': 'spotlight.jpeg',  # Clean studio lighting reference
    'studio lighting': 'spotlight.jpeg',
    'cinematic-grain': 'sportgrain.jpg',  # Cinematic film grain sports reference
    'cinematic grain': 'sportgrain.jpg',
    'halftone-retro': 'comic-book.jpeg',  # Vintage halftone/comic print style
    'halftone retro': 'comic-book.jpeg',
    
    # Legacy style references (maintained for compatibility)
    'video-game': 'video-game.jpeg',
    'video game': 'video-game.jpeg',
    'gradient': 'gradient.jpg',
    'comic-book': 'comic-book.jpeg',
    'comic book': 'comic-book.jpeg',
    'ink-splatter': 'ink-splatter.jpeg',
    'ink splatter': 'ink-splatter.jpeg',
    'layered-papercraft': 'layered-papercraft.jpg',
    'risograph': 'risograph.jpeg',
}

def get_style_prompt(style_name):
    """Get the optimized style prompt for a given style."""
    # Normalize style name
    normalized = style_name.lower().strip()
    print(f"[get_style_prompt] Input: '{style_name}', Normalized: '{normalized}'")
    
    # Check for custom styles
    if normalized in ['custom-1', 'custom-2']:
        import os
        import json
        
        # Load from custom_styles.json
        custom_styles_path = os.path.join(os.path.dirname(__file__), 'custom_styles.json')
        if os.path.exists(custom_styles_path):
            try:
                with open(custom_styles_path, 'r') as f:
                    custom_styles = json.load(f)
                
                if normalized in custom_styles and custom_styles[normalized]['prompt']:
                    return custom_styles[normalized]['prompt']
            except Exception as e:
                print(f"Error loading custom style {normalized}: {e}")
        
        # Fallback if custom style not defined
        return f"Apply artistic style transformation"
    
    # Check for exact match
    if normalized in STYLE_PROMPTS:
        return STYLE_PROMPTS[normalized]
    
    # Check with hyphens replaced by spaces
    with_spaces = normalized.replace('-', ' ')
    if with_spaces in STYLE_PROMPTS:
        return STYLE_PROMPTS[with_spaces]
    
    # Check with spaces replaced by hyphens
    with_hyphens = normalized.replace(' ', '-')
    if with_hyphens in STYLE_PROMPTS:
        return STYLE_PROMPTS[with_hyphens]
    
    # Default fallback
    return f"artistic {style_name} style transformation"

def get_style_reference(style_name):
    """Get the reference image filename for a given style."""
    # Normalize style name
    normalized = style_name.lower().strip()
    
    # Check for custom styles
    if normalized in ['custom-1', 'custom-2']:
        import os
        import json
        
        # Check if custom reference exists
        custom_styles_path = os.path.join(os.path.dirname(__file__), 'custom_styles.json')
        if os.path.exists(custom_styles_path):
            try:
                with open(custom_styles_path, 'r') as f:
                    custom_styles = json.load(f)
                
                if normalized in custom_styles and custom_styles[normalized].get('has_reference'):
                    return f'{normalized}.jpg'
            except Exception as e:
                print(f"Error checking custom reference {normalized}: {e}")
        
        return None
    
    # Check for exact match
    if normalized in STYLE_REFERENCES:
        return STYLE_REFERENCES[normalized]
    
    # Check with hyphens replaced by spaces
    with_spaces = normalized.replace('-', ' ')
    if with_spaces in STYLE_REFERENCES:
        return STYLE_REFERENCES[with_spaces]
    
    # Check with spaces replaced by hyphens
    with_hyphens = normalized.replace(' ', '-')
    if with_hyphens in STYLE_REFERENCES:
        return STYLE_REFERENCES[with_hyphens]
    
    # No reference image found
    return None
