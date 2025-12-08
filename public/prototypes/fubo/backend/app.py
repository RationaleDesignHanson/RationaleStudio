import os
import csv
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
from PIL import Image
import io
import base64
import json

load_dotenv()

# Configure Gemini API
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    print("ERROR: GEMINI_API_KEY not found in environment variables")
    print("Please set your API key in the .env file")
else:
    print(f"Gemini API key loaded: {api_key[:10]}...")
    genai.configure(api_key=api_key)

app = Flask(__name__)
CORS(app)

# Get the absolute path of the directory this script is in
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load team colors from CSV
def load_team_colors():
    """Load team colors from CSV file."""
    team_colors = {}
    try:
        with open(os.path.join(BASE_DIR, '..', 'team_colors.csv'), 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Skip comment lines
                if row['sport'].startswith('#'):
                    continue
                    
                key = f"{row['sport']}/{row['team_name']}"
                team_colors[key] = {
                    'sport': row['sport'],
                    'team_name': row['team_name'],
                    'primary_color': row['primary_color_hex'],
                    'secondary_color': row['secondary_color_hex'],
                    'accent_color': row['tertiary_color_hex'],
                    'text_color': row['text_color_hex']
                }
    except FileNotFoundError:
        print("Team colors CSV not found, using defaults")
    except Exception as e:
        print(f"Error loading team colors: {e}")
    
    return team_colors

# Load team colors on startup
TEAM_COLORS = load_team_colors()

def detect_league_team_from_path(file_path):
    """Detect league and team from file path structure."""
    if not file_path:
        return None, None
    
    # Handle different path formats
    path_parts = file_path.replace('\\', '/').split('/')
    
    # Look for league/team pattern (e.g., nfl/giants/helmet.jpg)
    if len(path_parts) >= 3:
        league = path_parts[-3].lower()  # Third to last part (nfl, nba, etc.)
        team = path_parts[-2].lower()    # Second to last part (team name)
        
        return league, team
    
    # Fallback: look for league/team pattern (e.g., nfl/giants.jpg)
    elif len(path_parts) >= 2:
        league = path_parts[-2].lower()  # Second to last part
        team = path_parts[-1].lower()    # Last part (filename without extension)
        
        # Remove file extension from team name
        if '.' in team:
            team = team.split('.')[0]
        
        return league, team
    
    return None, None

def get_team_colors(league, team):
    """Get team colors for a specific league/team combination."""
    if not league or not team:
        return None
    
    key = f"{league}/{team}"
    return TEAM_COLORS.get(key)

# Configure the Gemini API client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Import style prompts module
from style_prompts import get_style_prompt, get_style_reference

def get_optimized_style_prompt(style_name):
    """Get the optimized style prompt based on the GenerativeStylesV3_Clean guide."""
    return get_style_prompt(style_name)

def detect_sport_from_input(image):
    """Detect sport from input image using AI analysis."""
    try:
        # For now, we'll use a simple approach - analyze the image for sport indicators
        # This could be enhanced with a dedicated sport detection model
        prompt = """
        Analyze this image and determine what sport is being played or shown. 
        Respond with ONLY one of these exact sport names:
        - basketball
        - football  
        - baseball
        - hockey
        - soccer
        - tennis
        - golf
        - boxing
        - mma
        - generic
        
        Look for: equipment (balls, sticks, rackets), uniforms, playing surfaces, poses, etc.
        """
        
        # Use Gemini to analyze the image
        model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
        response = model.generate_content([prompt, image])
        
        if response and response.text:
            detected_sport = response.text.strip().lower()
            print(f"Detected sport: {detected_sport}")
            return detected_sport
        else:
            print("Could not detect sport, using generic")
            return 'generic'
            
    except Exception as e:
        print(f"Error detecting sport: {e}")
        return 'generic'

def get_sport_specific_reference(style_name, detected_sport):
    """Get sport-specific reference image for a style."""
    # Sport-specific reference mapping (only for styles that have sport-specific references)
    sport_references = {
        'basketball': {
            'magazine': 'basketball-magazine.jpg',
            'comic book': 'basketball-comic-book.jpg',
            'video game': 'basketball-video-game.jpg',
            'painterly': 'basketball-painterly.jpg',
            'blueprint': 'basketball-blueprint.jpg',
            'retrofuturism': 'basketball-retrofuturism.jpg',
            'players-only': 'basketball-players-only.jpg'
        },
        'football': {
            'magazine': 'football-magazine.jpg',
            'comic book': 'football-comic-book.jpg',
            'video game': 'football-video-game.jpg',
            'painterly': 'football-painterly.jpg',
            'blueprint': 'football-blueprint.jpg',
            'retrofuturism': 'football-retrofuturism.jpg',
            'players-only': 'football-players-only.jpg'
        },
        'baseball': {
            'magazine': 'baseball-magazine.jpg',
            'comic book': 'baseball-comic-book.jpg',
            'video game': 'baseball-video-game.jpg',
            'painterly': 'baseball-painterly.jpg',
            'blueprint': 'baseball-blueprint.jpg',
            'retrofuturism': 'baseball-retrofuturism.jpg',
            'players-only': 'baseball-players-only.jpg'
        },
        'hockey': {
            'magazine': 'hockey-magazine.jpg',
            'comic book': 'hockey-comic-book.jpg',
            'video game': 'hockey-video-game.jpg',
            'painterly': 'hockey-painterly.jpg',
            'blueprint': 'hockey-blueprint.jpg',
            'retrofuturism': 'hockey-retrofuturism.jpg',
            'players-only': 'hockey-players-only.jpg'
        },
        'soccer': {
            'magazine': 'soccer-magazine.jpg',
            'comic book': 'soccer-comic-book.jpg',
            'video game': 'soccer-video-game.jpg',
            'painterly': 'soccer-painterly.jpg',
            'blueprint': 'soccer-blueprint.jpg',
            'retrofuturism': 'soccer-retrofuturism.jpg',
            'players-only': 'soccer-players-only.jpg'
        }
    }
    
    # Generic reference mapping for all 21 styles (removed 5 styles)
    generic_references = {
        'video-game': 'video-game.jpg',
        'gradient': 'gradient.jpg',
        'hi-contrast': 'hi-contrast.jpg',
        'comic-book': 'comic-book.jpg',
        'spotlight': 'spotlight.jpg',
        'players-only': 'players-graphic.jpg',
        'painterly': 'painterly.jpg',
        'holographic': 'holographic.jpg',
        'layered-papercraft': 'layered-papercraft.jpg',
        'neon-noir': 'neon-noir.jpg',
        'risograph': 'risograph.jpg',
        'blueprint': 'blueprint.jpg',
        'glitch': 'glitch.jpg',
        'voxel': 'voxel.jpg',
        'retrofuturism': 'retrofuturism.jpg',
        'ink-splatter': 'ink-splatter.jpg',
        'fubo': 'fubo.jpg',
        'claymation': 'claymation.jpg',
        'crystalline': 'crystalline.jpg',
        'light-trails': 'light-trails.jpg',
        'topographic': 'topographic.jpg',
        'magazine': 'magazine.jpg',
        'comic book': 'comic-book.jpg',
        'video game': 'video-game.jpg'
    }
    
    # Try sport-specific reference first (only for the 8 styles that have them)
    if detected_sport in sport_references:
        if style_name in sport_references[detected_sport]:
            return sport_references[detected_sport][style_name]
    
    # Fall back to generic reference for all styles
    return generic_references.get(style_name, None)

def should_skip_reference_image(style_name):
    """Determine if we should skip reference image for this style to avoid subject conflicts."""
    # With the new stronger subject preservation instructions, we can use reference images
    # for all styles as they will only affect the style, not the subject matter
    skip_styles = []  # Empty list - use reference images for all styles now
    return style_name in skip_styles

def detect_sport_from_league(league):
    """Detect sport from league name."""
    league_lower = league.lower() if league else ''
    
    # NBA
    if 'nba' in league_lower or 'basketball' in league_lower:
        return 'basketball'
    # NFL
    elif 'nfl' in league_lower or 'football' in league_lower:
        return 'football'
    # MLB
    elif 'mlb' in league_lower or 'baseball' in league_lower:
        return 'baseball'
    # NHL
    elif 'nhl' in league_lower or 'hockey' in league_lower:
        return 'hockey'
    # Soccer/Football
    elif any(x in league_lower for x in ['mls', 'soccer', 'premier', 'la liga', 'bundesliga', 'serie a', 'epl']):
        return 'soccer'
    # Tennis
    elif 'tennis' in league_lower or 'atp' in league_lower or 'wta' in league_lower:
        return 'tennis'
    # Golf
    elif 'golf' in league_lower or 'pga' in league_lower:
        return 'golf'
    # Boxing/MMA
    elif 'ufc' in league_lower or 'mma' in league_lower:
        return 'mma'
    elif 'boxing' in league_lower:
        return 'boxing'
    # F1
    elif 'f1' in league_lower or 'formula' in league_lower:
        return 'racing'
    else:
        return 'generic'

def get_sport_action_context(sport):
    """Get sport-specific action context for prompts with authentic game plays."""
    contexts = {
        'basketball': 'Slam dunk attempt, blocked shot, three-point shot, driving layup, or mid-air rebound',
        'football': 'Throwing touchdown pass, making a catch, rushing for touchdown, or defensive interception',
        'baseball': 'Pitching a fastball, hitting a home run, sliding into base, or making a diving catch',
        'hockey': 'Taking a slap shot, making a save, checking opponent, or scoring a goal',
        'soccer': 'Taking a penalty kick, heading the ball, making a slide tackle, or celebrating a goal',
        'tennis': 'Serving an ace, hitting a forehand winner, making a volley, or diving for a shot',
        'golf': 'Driving off the tee, putting for birdie, chipping from the rough, or celebrating a hole-in-one',
        'mma': 'Throwing a knockout punch, executing a takedown, applying a submission hold, or defending strikes',
        'boxing': 'Throwing a combination, dodging punches, landing a knockout blow, or cornering opponent',
        'racing': 'Overtaking on the track, celebrating victory, pit stop action, or starting grid position',
        'generic': 'Dynamic athletic pose in action'
    }
    return contexts.get(sport, contexts['generic'])

def get_sport_closeup_details(sport):
    """Get sport-specific close-up details for equipment and gear."""
    details = {
        'basketball': 'Basketball texture and grip pattern, jersey mesh fabric, shoe sole traction, wristband details, equipment materials and construction',
        'football': 'Football helmet with facemask details, jersey fabric texture, shoulder pad construction, cleat sole pattern, glove grip texture, equipment stitching and materials',
        'baseball': 'Baseball glove leather texture, bat grain and grip tape, helmet cage details, jersey fabric, cleat spikes, equipment wear patterns',
        'hockey': 'Hockey helmet cage and padding, stick blade texture, glove leather and padding, skate blade details, jersey fabric, equipment construction',
        'soccer': 'Soccer ball texture and panel details, cleat stud pattern, shin guard construction, jersey fabric, glove details, equipment materials',
        'tennis': 'Tennis racquet string pattern, ball felt texture, shoe sole traction, wristband details, equipment materials and construction',
        'golf': 'Golf club grip texture, ball dimple pattern, glove leather details, shoe spikes, equipment materials and wear patterns',
        'mma': 'MMA glove padding details, mouthguard texture, equipment materials, protective gear construction, training equipment textures',
        'boxing': 'Boxing glove leather texture, hand wrap details, mouthguard, equipment materials, protective gear construction',
        'racing': 'Racing helmet visor details, glove grip texture, suit fabric, equipment materials, safety gear construction',
        'generic': 'Equipment texture details, material construction, wear patterns, grip surfaces, fabric weaves, hardware details'
    }
    return details.get(sport, details['generic'])

def get_venue_type(sport):
    """Get the appropriate venue type for a sport."""
    venues = {
        'basketball': 'basketball arena with hardwood court',
        'football': 'football stadium with field and goalposts',
        'baseball': 'baseball ballpark with diamond and outfield',
        'hockey': 'hockey arena with ice rink and boards',
        'soccer': 'soccer stadium with field and goals',
        'tennis': 'tennis center with courts and net',
        'golf': 'golf course with fairways and greens',
        'mma': 'MMA arena with octagon cage',
        'boxing': 'boxing arena with ring and ropes',
        'racing': 'race track with pit lane and grandstands',
        'generic': 'sports venue with playing surface'
    }
    return venues.get(sport, venues['generic'])


def get_stadium_specific_details(sport):
    """Get sport-specific stadium details for better prompts."""
    details = {
        'basketball': 'basketball court with three-point lines, free throw lines, hardwood floor, basketball hoops, team banners, subtle scoreboard, clean court surface with NO FLOOR LOGOS',
        'football': 'football field with yard lines, end zones, goalposts, sideline, team benches, scoreboard, field goal posts, clean field surface with NO FLOOR LOGOS',
        'baseball': 'baseball diamond with pitcher\'s mound, home plate, bases, foul lines, outfield wall, bullpen, dugouts, scoreboard, clean field surface with NO FLOOR LOGOS',
        'hockey': 'hockey rink with blue lines, red lines, face-off circles, goal nets, boards, penalty boxes, subtle scoreboard, clean ice surface with NO FLOOR LOGOS',
        'soccer': 'soccer field with center circle, penalty areas, goal boxes, corner flags, goal nets, team benches, scoreboard, clean grass field with NO FLOOR LOGOS',
        'tennis': 'tennis court with net, service lines, baseline, center service line, doubles alleys, umpire chair, scoreboard, clean court surface with NO FLOOR LOGOS',
        'golf': 'golf course with fairways, greens, bunkers, tee boxes, flagsticks, water hazards, clubhouse, scoreboard',
        'mma': 'octagon cage with canvas floor, corner posts, referee area, fighter corners, subtle scoreboard, cage door, clean floor with NO FLOOR LOGOS',
        'boxing': 'boxing ring with canvas floor, ropes, corner posts, referee area, fighter corners, ring bell, scoreboard, clean floor with NO FLOOR LOGOS',
        'racing': 'race track with start/finish line, pit lane, grandstands, victory lane, timing tower, safety barriers, clean track with NO FLOOR LOGOS',
        'generic': 'playing surface with appropriate markings, seating areas, scoreboard, team areas, clean surface with NO FLOOR LOGOS'
    }
    return details.get(sport, details['generic'])

def resize_to_custom_dimensions(image, width=1920, height=1080):
    """
    Resize image to custom dimensions without distortion.
    Uses smart cropping to preserve important content (like player's head and feet).
    """
    current_width, current_height = image.size
    target_ratio = width / height
    current_ratio = current_width / current_height
    
    # If image is already close to target ratio (within 5%), just resize
    if abs(current_ratio - target_ratio) <= 0.05:
        return image.resize((width, height), Image.Resampling.LANCZOS)
    
    # Smart cropping to preserve important content
    if current_ratio > target_ratio:
        # Image is too wide, crop width (center crop)
        new_width = int(current_height * target_ratio)
        new_height = current_height
        left = (current_width - new_width) // 2
        cropped_image = image.crop((left, 0, left + new_width, new_height))
    else:
        # Image is too tall, crop height (smart crop to preserve head and feet)
        new_width = current_width
        new_height = int(current_width / target_ratio)
        
        # For player images, try to preserve the center portion (where the player is)
        # This helps avoid cutting off heads or feet
        if current_height > new_height:
            # Calculate crop position to center the important content
            crop_margin = (current_height - new_height) // 2
            
            # For very tall images, bias towards showing more of the top (head area)
            # This prevents cutting off the player's head
            if current_height > new_height * 1.5:
                # Bias towards top to preserve head
                top = crop_margin // 2
            else:
                # Standard center crop
                top = crop_margin
                
            cropped_image = image.crop((0, top, new_width, top + new_height))
        else:
            cropped_image = image
    
    # Resize to exact target dimensions
    return cropped_image.resize((width, height), Image.Resampling.LANCZOS)

def get_composition_instructions(content_type, section='Wide', width=None, height=None):
    """
    Get composition instructions based on content type and section.
    Images with padding need full-frame edge-to-edge composition.
    """
    if section == 'Wide':
        # Wide images now have vertical padding too
        if content_type == 'action':
            return "COMPOSITION: Position the main action and player in the RIGHT 1/4 OF THE FRAME. FILL THE ENTIRE FRAME edge-to-edge vertically and horizontally. Extend stadium/field environment, crowd, and atmospheric effects to cover all edges. No black bars or empty space."
        else:
            return "COMPOSITION: Slightly right-aligned composition. FILL THE ENTIRE FRAME edge-to-edge. Extend the environment and background elements to cover all edges completely. No letterboxing or pillarboxing."
    else:  # Tall
        # Tall images have both horizontal and vertical padding
        if width and width > 1280:
            return "COMPOSITION: FILL THE ENTIRE FRAME WIDTH AND HEIGHT edge-to-edge. Extend the background, stadium/court/field elements, crowd, and atmospheric effects across the full width and height. Center the main subject but ensure the scene extends to all edges. No black bars, letterboxing, or pillarboxing - complete edge-to-edge coverage."
        else:
            return "COMPOSITION: Centered vertical composition, full frame coverage."

def get_enhanced_color_instructions(content_type, team_colors):
    """Get enhanced color instructions based on content type."""
    if not team_colors:
        return ""
    
    primary = team_colors.get('primary_color', '')
    secondary = team_colors.get('secondary_color', '')
    accent = team_colors.get('accent_color', '')
    text = team_colors.get('text_color', '')
    
    if content_type == 'stadium':
        return f"CRITICAL COLOR OVERLAY REQUIREMENTS: Apply {primary} and {secondary} team colors as DOMINANT COLOR OVERLAYS across the entire stadium. Use {primary} as a STRONG COLOR FILTER on major architectural elements, lighting, seating, and sky. Use {secondary} as a COMPLEMENTARY COLOR WASH on shadows, atmospheric effects, and background elements. Use {accent} for DRAMATIC COLOR ACCENTS and highlights. OVERLAY team colors on ALL surfaces - walls, seats, field, sky, lighting. Make team colors the PRIMARY VISUAL ELEMENT that OVERWHELMS the natural colors. Apply color grading and colorization effects to ensure team colors are the MOST PROMINENT feature visible from any distance."
    elif content_type == 'action':
        return f"CRITICAL COLOR OVERLAY REQUIREMENTS: Apply {primary} and {secondary} team colors as INTENSE COLOR OVERLAYS on uniforms, equipment, and background. Use {primary} as a STRONG COLOR FILTER on jerseys, helmets, and gear. Use {secondary} as a COMPLEMENTARY COLOR WASH on shadows, motion blur, and background elements. Use {accent} for DRAMATIC COLOR ACCENTS and motion effects. OVERLAY team colors on ALL elements - player, equipment, background, lighting. Make team colors the DOMINANT visual feature through aggressive colorization and color grading."
    elif content_type == 'closeup':
        return f"CRITICAL COLOR OVERLAY REQUIREMENTS: Apply {primary} and {secondary} team colors as VIBRANT COLOR OVERLAYS on all equipment surfaces and details. Use {primary} as a STRONG COLOR FILTER on equipment surfaces. Use {secondary} as a COMPLEMENTARY COLOR WASH on shadows and background. Use {accent} for highlights and {text} for contrast details. OVERLAY team colors on ALL equipment elements - helmets, jerseys, gear, surfaces. Make team colors the PRIMARY feature through intense colorization and color grading effects."
    else:  # player
        return f"CRITICAL COLOR OVERLAY REQUIREMENTS: Apply {primary} and {secondary} team colors as INTENSE COLOR OVERLAYS on uniforms, gear, and background. Use {primary} as a STRONG COLOR FILTER on jerseys and equipment. Use {secondary} as a COMPLEMENTARY COLOR WASH on shadows and background elements. Use {accent} for highlights and {text} for contrast. OVERLAY team colors on ALL elements - player, uniform, equipment, background, lighting. Make team colors the DOMINANT visual feature through aggressive colorization and color grading."

def get_matchup_visualization_style(team1, team2, sport, style_preference='auto'):
    """Get creative matchup visualization style based on teams and sport."""
    import random
    
    # Define matchup styles based on sport
    matchup_styles = {
        'basketball': [
            "Face-off at center court with both teams in action poses, dramatic lighting highlighting the rivalry",
            "Tunnel entrance shot with both teams emerging simultaneously, fans in opposing colors",
            "Mid-game action sequence showing both teams in dynamic play, court divided by team colors",
            "Championship-style presentation with both teams in spotlight, trophy in background",
            "Locker room tunnel confrontation with both teams in pre-game intensity"
        ],
        'football': [
            "Coin toss ceremony with both team captains at midfield, dramatic stadium lighting",
            "Tunnel entrance with both teams emerging in formation, fans creating color contrast",
            "Mid-field face-off with both teams in formation, stadium packed with opposing fans",
            "Goal line stand scenario with both teams in action, dramatic tension",
            "Championship presentation with both teams in spotlight, confetti and celebration"
        ],
        'baseball': [
            "Home plate meeting with both team captains, umpire in center, dramatic field lighting",
            "Dugout confrontation with both teams in their respective areas, fans in team colors",
            "Pitcher's mound showdown with both teams' aces, dramatic stadium atmosphere",
            "Championship celebration with both teams in spotlight, trophy presentation",
            "Tunnel entrance with both teams emerging, fans creating visual contrast"
        ],
        'hockey': [
            "Center ice face-off with both teams in formation, dramatic arena lighting",
            "Tunnel entrance with both teams emerging, fans in opposing colors",
            "Mid-game action with both teams in play, ice divided by team colors",
            "Championship presentation with both teams in spotlight, Stanley Cup in background",
            "Locker room tunnel confrontation with both teams in pre-game intensity"
        ],
        'soccer': [
            "Center circle meeting with both team captains, dramatic stadium lighting",
            "Tunnel entrance with both teams emerging in formation, fans creating color contrast",
            "Mid-field action with both teams in play, pitch divided by team colors",
            "Championship celebration with both teams in spotlight, trophy presentation",
            "Pre-game handshake with both teams in formation, dramatic tension"
        ]
    }
    
    # Get sport-specific styles or use generic ones
    styles = matchup_styles.get(sport, [
        "Face-off with both teams in action poses, dramatic lighting highlighting the rivalry",
        "Tunnel entrance with both teams emerging, fans in opposing colors",
        "Mid-game action sequence with both teams in play, dramatic tension",
        "Championship presentation with both teams in spotlight, trophy in background"
    ])
    
    # Handle specific style preferences
    if style_preference == 'faceoff':
        return "Face-off confrontation with both teams in action poses, dramatic lighting highlighting the rivalry"
    elif style_preference == 'tunnel':
        return "Tunnel entrance with both teams emerging simultaneously, fans in opposing colors"
    elif style_preference == 'action':
        return "Mid-game action sequence with both teams in dynamic play, dramatic tension"
    elif style_preference == 'championship':
        return "Championship presentation with both teams in spotlight, trophy in background"
    elif style_preference == 'rivalry':
        return f"Classic rivalry showdown - {team1} vs {team2} - the ultimate sports battle"
    else:
        # Return a random style for variety (auto mode)
        return random.choice(styles)

def get_matchup_theme(team1, team2):
    """Get thematic matchup description based on team names."""
    # Classic rivalries
    classic_rivalries = [
        ("Lakers", "Celtics", "Historic NBA rivalry - the ultimate basketball showdown"),
        ("Yankees", "Red Sox", "Baseball's greatest rivalry - the ultimate baseball showdown"),
        ("Cowboys", "Eagles", "NFC East rivalry - the ultimate football showdown"),
        ("Canadiens", "Maple Leafs", "Original Six rivalry - the ultimate hockey showdown"),
        ("Real Madrid", "Barcelona", "El Clásico - the ultimate soccer showdown")
    ]
    
    # Check for classic rivalries
    for team_a, team_b, description in classic_rivalries:
        if (team_a.lower() in team1.lower() and team_b.lower() in team2.lower()) or \
           (team_b.lower() in team1.lower() and team_a.lower() in team2.lower()):
            return description
    
    # Geographic rivalries
    if any(city in team1.lower() for city in ['new york', 'ny']) and \
       any(city in team2.lower() for city in ['boston', 'philadelphia', 'washington']):
        return "East Coast rivalry - regional pride on the line"
    
    if any(city in team1.lower() for city in ['los angeles', 'la']) and \
       any(city in team2.lower() for city in ['san francisco', 'oakland', 'sacramento']):
        return "California rivalry - state supremacy battle"
    
    if any(city in team1.lower() for city in ['chicago', 'detroit']) and \
       any(city in team2.lower() for city in ['chicago', 'detroit']):
        return "Midwest rivalry - industrial city showdown"
    
    # Conference rivalries
    if any(conf in team1.lower() for conf in ['east', 'eastern']) and \
       any(conf in team2.lower() for conf in ['west', 'western']):
        return "Conference championship - East vs West showdown"
    
    # Default matchup theme
    return f"Epic showdown - {team1} vs {team2} - the ultimate sports battle"

def load_reference_image(style_name, detected_sport=None):
    """Load the reference image for a given style."""
    try:
        # Skip reference image if it might cause subject conflicts
        if should_skip_reference_image(style_name):
            print(f"Skipping reference image for {style_name} to preserve input subject matter")
            return None
        
        # First try to get sport-specific reference
        if detected_sport:
            reference_filename = get_sport_specific_reference(style_name, detected_sport)
            if reference_filename:
                reference_path = os.path.join(BASE_DIR, '..', 'style_references', reference_filename)
                if os.path.exists(reference_path):
                    print(f"Loading sport-specific reference: {reference_path} (sport: {detected_sport})")
                    with open(reference_path, 'rb') as f:
                        return f.read()
        
        # Fallback to generic style reference
        reference_filename = get_style_reference_filename(style_name)
        if reference_filename:
            reference_path = os.path.join(BASE_DIR, '..', 'style_references', reference_filename)
            if os.path.exists(reference_path):
                print(f"Loading generic reference: {reference_path}")
                with open(reference_path, 'rb') as f:
                    return f.read()
        
        print(f"No reference image available for {style_name}")
        return None
            
    except Exception as e:
        print(f"Error loading reference image for {style_name}: {e}")
        return None

def create_blended_style_prompt(styles, weights, metadata, league=None, team=None, team_colors=None, width=1920, height=1080):
    """Create a blended style prompt combining multiple styles with weights."""
    
    # Create blended style description
    style_descriptions = []
    for i, (style, weight) in enumerate(zip(styles, weights)):
        if style and weight > 0:
            style_prompt = get_optimized_style_prompt(style.lower())
            style_descriptions.append(f"({style_prompt}:{round(weight/100, 2)})")
    
    blended_style_prompt = " ".join(style_descriptions)
    
    # Add team colors if available
    team_colors_text = ""
    if team_colors and league and team:
        primary = team_colors.get('primary_color', '')
        secondary = team_colors.get('secondary_color', '')
        team_colors_text = f", team colors: {primary} and {secondary}"
    
    # Add aspect ratio and composition instructions
    aspect_ratio = f"{width}:{height}"
    composition_instruction = "maintain full body framing, ensure head and feet are visible"
    
    # Add brightness if specified
    brightness_text = ""
    if metadata:
        try:
            meta = json.loads(metadata) if isinstance(metadata, str) else metadata
            brightness = meta.get('brightness', 'neutral')
            if brightness == 'darker':
                brightness_text = ", darker moody lighting, low-key atmosphere"
            elif brightness == 'lighter':
                brightness_text = ", bright cheerful lighting, high-key atmosphere"
        except:
            pass
    
    # Concise final prompt focused on style application only
    # Allow authentic team branding and logos while restricting distracting floor/field logos
    final_prompt = f"Apply visual style: {blended_style_prompt}{team_colors_text}{brightness_text}. Keep same subject matter, only change visual rendering style. Maintain {aspect_ratio} aspect ratio with {composition_instruction}. Allow authentic team logos, jersey numbers, and branding on uniforms and equipment. Restrict only floor logos, court logos, and field text to keep focus on subject."
    return final_prompt

def create_style_prompt(style, metadata, league=None, team=None, team_colors=None, width=1920, height=1080, with_alpha=False):
    """Create a concise, transformation-focused prompt based on the selected style and metadata."""
    
    # Get the base style prompt
    base_prompt = get_optimized_style_prompt(style.lower())
    
    # Add team colors if available
    team_colors_text = ""
    if team_colors and league and team:
        primary = team_colors.get('primary_color', '')
        secondary = team_colors.get('secondary_color', '')
        team_colors_text = f", team colors: {primary} and {secondary}"
    
    # Add mood and brightness if specified
    mood_text = ""
    brightness_text = ""
    if metadata:
        try:
            meta = json.loads(metadata) if isinstance(metadata, str) else metadata
            if meta.get('styleParameters', {}).get('overallMood', 'neutral') != 'neutral':
                mood_text = f", {meta['styleParameters']['overallMood']} mood"
            
            # Handle brightness setting
            brightness = meta.get('brightness', 'neutral')
            if brightness == 'darker':
                brightness_text = ", darker moody lighting, low-key atmosphere"
            elif brightness == 'lighter':
                brightness_text = ", bright cheerful lighting, high-key atmosphere"
        except Exception as e:
            print(f"Error parsing metadata: {e}")
            pass
    
    # Add aspect ratio and composition instructions
    aspect_ratio = f"{width}:{height}"
    if width > height:
        composition_instruction = "maintain full body framing, ensure head and feet are visible"
    elif height > width:
        composition_instruction = "maintain full body framing, ensure head and feet are visible"
    else:
        composition_instruction = "maintain full body framing, ensure head and feet are visible"
    
    # No special background needed - rembg handles complex backgrounds
    transparency_instruction = ""
    
    # Concise final prompt focused on style application only
    # Allow authentic team branding and logos while restricting distracting floor/field logos
    final_prompt = f"Apply visual style: {base_prompt}{team_colors_text}{mood_text}{brightness_text}. Keep same subject matter, only change visual rendering style{transparency_instruction}. Maintain {aspect_ratio} aspect ratio with {composition_instruction}. Allow authentic team logos, jersey numbers, and branding on uniforms and equipment. Restrict only floor logos, court logos, and field text to keep focus on subject."
    return final_prompt

@app.route('/generate', methods=['POST'])
def generate_images():
    """
    This endpoint will receive image data, a style, and metadata,
    then use the Gemini API to generate styled images.
    """
    try:
        print("Received request to generate images")
        
        # Get the uploaded image
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        image_file = request.files['image']
        if image_file.filename == '':
            return jsonify({'error': 'No image file selected'}), 400
        
        # Get style and metadata
        style = request.form.get('style', 'comic-book')
        metadata = request.form.get('metadata', '{}')
        slot_parameters = request.form.get('slotParameters', '[]')
        
        print(f"Style: {style}")
        print(f"Metadata: {metadata}")
        print(f"Slot Parameters: {slot_parameters}")
        
        # Process the image
        try:
            image = Image.open(image_file)
            print(f"Loaded image: {image.format}, mode: {image.mode}, size: {image.size}")
            
            # Handle different image modes properly
            if image.mode == 'RGBA':
                # PNG with transparency - convert to RGB with white background
                background = Image.new('RGB', image.size, (255, 255, 255))
                background.paste(image, mask=image.split()[-1])  # Use alpha channel as mask
                image = background
                print("Converted RGBA PNG to RGB with white background")
            elif image.mode == 'P':
                # Palette mode (common in PNG) - convert to RGB
                image = image.convert('RGB')
                print("Converted palette PNG to RGB")
            elif image.mode != 'RGB':
                # Any other mode - convert to RGB
                image = image.convert('RGB')
                print(f"Converted {image.mode} to RGB")
                
            # Resize if too large (optional, to save processing time)
            max_size = 1024
            if image.width > max_size or image.height > max_size:
                image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)
                print(f"Resized image to: {image.size}")
            
            # Detect sport from input image for sport-specific references
            detected_sport = detect_sport_from_input(image)
            print(f"Detected sport: {detected_sport}")
                
        except Exception as e:
            print(f"Error processing image: {str(e)}")
            return jsonify({'error': f'Invalid image file. Supported formats: PNG, JPG, JPEG. Error: {str(e)}'}), 400

        # Check if we have slot parameters for blended styles
        try:
            slot_params = json.loads(slot_parameters) if slot_parameters else []
            use_blended_generation = False
            blended_styles = []
            blended_weights = []
            
            if slot_params and len(slot_params) > 0:
                slot_data = slot_params[0]  # Get first slot data
                if 'styles' in slot_data and 'weights' in slot_data:
                    active_styles = [s for s in slot_data['styles'] if s is not None]
                    active_weights = [w for i, w in enumerate(slot_data['weights']) if slot_data['styles'][i] is not None]
                    
                    if len(active_styles) > 1:
                        use_blended_generation = True
                        blended_styles = active_styles
                        blended_weights = active_weights
                        print(f"Using blended generation with styles: {blended_styles} and weights: {blended_weights}")
                    elif len(active_styles) == 1:
                        # Single style, use regular generation
                        style = active_styles[0]
                        print(f"Using single style: {style}")
            
        except Exception as e:
            print(f"Error parsing slot parameters: {e}")
            # Fall back to single style generation
        
        # Create the prompt based on style and metadata
        if use_blended_generation:
            prompt = create_blended_style_prompt(blended_styles, blended_weights, metadata)
            print(f"Generated blended prompt: {prompt[:200]}...")
        else:
            prompt = create_style_prompt(style, metadata)
            print(f"Generated single style prompt: {prompt[:200]}...")
        
        # Load reference image for the style
        if use_blended_generation:
            # For blended styles, use the primary (highest weighted) style's reference
            primary_style_index = blended_weights.index(max(blended_weights))
            primary_style = blended_styles[primary_style_index]
            print(f"Using reference image from primary style: {primary_style}")
            reference_image_data = load_reference_image(primary_style, detected_sport)
        else:
            reference_image_data = load_reference_image(style, detected_sport)
            
        if reference_image_data:
            style_name = primary_style if use_blended_generation else style
            print(f"Loaded reference image for {style_name}")
            try:
                reference_image = Image.open(io.BytesIO(reference_image_data))
                # Convert to RGB if necessary
                if reference_image.mode != 'RGB':
                    reference_image = reference_image.convert('RGB')
                print(f"Reference image loaded: {reference_image.size}")
            except Exception as e:
                print(f"Error processing reference image: {e}")
                reference_image = None
        else:
            style_name = primary_style if use_blended_generation else style
            print(f"No reference image found for {style_name}")
            reference_image = None
        
        # Initialize the Gemini model - use Banana Nano (gemini-2.5-flash-image-preview) for image generation
        try:
            model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
            print("Using Banana Nano (gemini-2.5-flash-image-preview) model")
        except Exception as e:
            print(f"Error with Banana Nano model: {e}")
            try:
                model = genai.GenerativeModel('gemini-2.5-flash')
                print("Using gemini-2.5-flash model")
            except Exception as e2:
                print(f"Error with gemini-2.5-flash: {e2}")
                try:
                    model = genai.GenerativeModel('gemini-1.5-flash')
                    print("Using gemini-1.5-flash model")
                except Exception as e3:
                    print(f"Error with gemini-1.5-flash: {e3}")
                    # Last resort
                    model = genai.GenerativeModel('gemini-pro')
                    print("Using gemini-pro model")
        
        # Generate the styled image
        try:
            print("Calling Gemini API...")
            print(f"Input image size: {image.size}")
            print(f"Prompt length: {len(prompt)} characters")
            print(f"Using blended generation: {use_blended_generation}")
            if use_blended_generation:
                print(f"Blended styles: {blended_styles}")
                print(f"Blended weights: {blended_weights}")
            
            # Prepare content for generation
            content = [prompt, image]
            if reference_image:
                content.append(reference_image)
                print(f"Including reference image in generation: {reference_image.size}")
            else:
                print("No reference image included")
            
            # Generate the styled image
            print(f"Content length: {len(content)} items")
            print(f"Prompt length: {len(prompt)} characters")
            if len(prompt) > 10000:
                print("WARNING: Prompt is very long, this might cause issues")
            
            response = model.generate_content(content)
            print(f"Response received: {type(response)}")
            
            # Check for any safety or policy issues
            if hasattr(response, 'prompt_feedback'):
                print(f"Prompt feedback: {response.prompt_feedback}")
            if hasattr(response, 'candidates') and response.candidates:
                print(f"First candidate finish reason: {response.candidates[0].finish_reason}")
                
        except Exception as e:
            print(f"Error calling Gemini API: {str(e)}")
            return jsonify({'error': f'Failed to generate image with AI: {str(e)}'}), 500
        
        generated_images = []
        
        # Process the response to extract generated images
        print(f"Response has candidates: {hasattr(response, 'candidates')}")
        if hasattr(response, 'candidates'):
            print(f"Number of candidates: {len(response.candidates) if response.candidates else 0}")
        
        if hasattr(response, 'candidates') and response.candidates:
            print(f"Processing {len(response.candidates[0].content.parts)} parts from response")
            for i, part in enumerate(response.candidates[0].content.parts):
                print(f"Processing part {i}: {type(part)}")
                if hasattr(part, 'inline_data') and part.inline_data:
                    print(f"Found inline data in part {i}")
                    # Convert the generated image to base64 for sending to frontend
                    image_data = part.inline_data.data
                    print(f"🔍 Backend Debug: image_data type: {type(image_data)}")
                    print(f"🔍 Backend Debug: image_data length: {len(image_data)}")
                    print(f"🔍 Backend Debug: image_data starts with: {str(image_data)[:50]}...")
                    
                        # Process image to ensure 2:3 aspect ratio without distortion
                    try:
                        from io import BytesIO
                        import base64
                        
                        # Load the generated image
                        generated_img = Image.open(BytesIO(image_data))
                        print(f"Generated image size: {generated_img.size}")
                        
                        # Get custom dimensions from request
                        width = int(request.form.get('output_width', 1920))
                        height = int(request.form.get('output_height', 1080))
                        
                        # Resize to custom dimensions without distortion
                        generated_img = resize_to_custom_dimensions(generated_img, width, height)
                        print(f"Processed image size: {generated_img.size}")
                        
                        # Convert back to base64
                        img_buffer = BytesIO()
                        generated_img.save(img_buffer, format='PNG')
                        image_base64 = base64.b64encode(img_buffer.getvalue()).decode('utf-8')
                        
                    except Exception as e:
                        print(f"Error processing image aspect ratio: {e}")
                        # Fallback to original image if processing fails
                        image_base64 = base64.b64encode(image_data).decode('utf-8')
                    
                    generated_images.append({
                        'name': f'{style.title()} Style',
                        'data': f'data:image/jpeg;base64,{image_base64}'
                    })
                    print(f"Successfully added image to generated_images list")
                elif hasattr(part, 'text') and part.text:
                    print(f"Text response: {part.text}")
                else:
                    print(f"Part {i} has no inline_data or text content")
        else:
            print("No candidates in response")
            # Add more debugging for why there are no candidates
            if hasattr(response, 'prompt_feedback'):
                print(f"Prompt feedback: {response.prompt_feedback}")
            if hasattr(response, 'candidates') and response.candidates is None:
                print("Candidates is None")
            elif hasattr(response, 'candidates') and len(response.candidates) == 0:
                print("Candidates list is empty")
        
        print(f"Generated images count: {len(generated_images)}")
        if not generated_images:
            print("ERROR: No images were generated - returning 500 error")
            return jsonify({'error': 'No images were generated by the AI model. This could be due to content policy restrictions or prompt issues.'}), 500
            
        return jsonify({
            'success': True,
            'message': 'Images generated successfully!',
            'style': style,
            'metadata': metadata,
            'image': generated_images[0]['data'] if generated_images else None,
            'generated_images': generated_images
        })
        
    except Exception as e:
        print(f"Error in generate_images: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/generate_bulk', methods=['POST'])
def generate_bulk_images():
    """
    This endpoint handles bulk image generation with sport/team detection.
    Expects JSON data with base64 images and file paths.
    """
    try:
        print("Received bulk generation request")
        
        data = request.get_json()
        style = data.get('style')
        metadata = data.get('metadata', {})
        slot_parameters = data.get('slotParameters', [])
        images = data.get('images', [])
        image_paths = data.get('imagePaths', [])
        
        print(f"Bulk request - Style: {style}")
        print(f"Images: {len(images)}")
        print(f"Image paths: {image_paths}")
        
        if not images:
            return jsonify({'error': 'No images provided'}), 400
        
        # Process each image
        generated_images = []
        for i, image_data in enumerate(images):
            try:
                # Decode base64 image
                if ',' in image_data:
                    image_data = image_data.split(',')[1]
                
                image_bytes = base64.b64decode(image_data)
                image = Image.open(io.BytesIO(image_bytes))
                
                # Convert to RGB if necessary
                if image.mode != 'RGB':
                    image = image.convert('RGB')
                
                # Detect league and team from file path
                league, team = None, None
                team_colors = None
                
                if i < len(image_paths):
                    league, team = detect_league_team_from_path(image_paths[i])
                    if league and team:
                        team_colors = get_team_colors(league, team)
                        print(f"Detected league: {league}, team: {team}")
                        if team_colors:
                            print(f"Team colors: {team_colors}")
                
                # Create style prompt with league/team context
                prompt = create_style_prompt(style, metadata, league, team, team_colors)
                
                # Load reference image if available
                reference_image_data = load_reference_image(style)
                reference_image = None
                if reference_image_data:
                    try:
                        reference_image = Image.open(io.BytesIO(reference_image_data))
                        if reference_image.mode != 'RGB':
                            reference_image = reference_image.convert('RGB')
                    except Exception as e:
                        print(f"Error processing reference image: {e}")
                        reference_image = None
                
                # Generate image using Gemini
                model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
                
                content = [prompt, image]
                if reference_image:
                    content.append(reference_image)
                
                generated_content = model.generate_content(content)
                
                # Extract generated image
                if generated_content.candidates and generated_content.candidates[0].content.parts:
                    generated_image = generated_content.candidates[0].content.parts[0]
                    if hasattr(generated_image, 'inline_data'):
                        generated_images.append({
                            'data': f"data:image/jpeg;base64,{generated_image.inline_data.data}",
                            'index': i,
                            'league': league,
                            'team': team,
                            'team_colors': team_colors
                        })
                    else:
                        return jsonify({'error': 'No image generated'}), 500
                else:
                    return jsonify({'error': 'No image generated'}), 500
                    
            except Exception as e:
                print(f"Error processing image {i}: {e}")
                return jsonify({'error': f'Error processing image {i}: {str(e)}'}), 500
        
        return jsonify({
            'success': True,
            'message': 'Images generated successfully!',
            'style': style,
            'metadata': metadata,
            'image': generated_images[0]['data'] if generated_images else None,
            'generated_images': generated_images
        })
        
    except Exception as e:
        print(f"Error in generate_bulk_images: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/')
def serve_index():
    """Serve the main HTML file (v6.0 with sidebar UX)."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'index_v6.html'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'text/html'}
    except FileNotFoundError:
        return "HTML file not found", 404

@app.route('/v5')
def serve_v5():
    """Serve the v5.0 legacy UI (backup)."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'index_v5.html'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'text/html'}
    except FileNotFoundError:
        return "v5 HTML file not found", 404
    except Exception as e:
        return f"Error loading HTML: {str(e)}", 500

@app.route('/v4')
def serve_v4():
    """Serve the v4.0 interface."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'index_v2.html'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'text/html'}
    except FileNotFoundError:
        return "HTML file not found", 404
    except Exception as e:
        return f"Error loading HTML: {str(e)}", 500

@app.route('/styles_v2.css')
def serve_css():
    """Serve the CSS file."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'styles_v2.css'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'text/css'}
    except FileNotFoundError:
        return "CSS file not found", 404
    except Exception as e:
        return f"Error loading CSS: {str(e)}", 500

@app.route('/styles_fubo.css')
def serve_fubo_css():
    """Serve the FUBO branded CSS file."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'styles_fubo.css'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'text/css'}
    except FileNotFoundError:
        return "FUBO CSS file not found", 404
    except Exception as e:
        return f"Error loading FUBO CSS: {str(e)}", 500

@app.route('/app_v2.js')
def serve_js():
    """Serve the JavaScript file."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'app_v2.js'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'application/javascript'}
    except FileNotFoundError:
        return "JavaScript file not found", 404
    except Exception as e:
        return f"Error loading JavaScript: {str(e)}", 500

@app.route('/app_v5.js')
def serve_v5_js():
    """Serve the v5.0 JavaScript file."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'app_v5.js'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'application/javascript'}
    except FileNotFoundError:
        return "JavaScript file not found", 404
    except Exception as e:
        return f"Error loading JavaScript: {str(e)}", 500

@app.route('/app_v6.js')
def serve_v6_js():
    """Serve the v6.0 JavaScript file."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'app_v6.js'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'application/javascript'}
    except FileNotFoundError:
        return "v6 JavaScript file not found", 404
    except Exception as e:
        return f"Error loading v6 JavaScript: {str(e)}", 500

@app.route('/favicon.svg')
def serve_favicon():
    """Serve the favicon file."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'favicon.svg'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'image/svg+xml'}
    except FileNotFoundError:
        return "Favicon not found", 404
    except Exception as e:
        return f"Error loading favicon: {str(e)}", 500

@app.route('/test_style/<style_name>')
def test_style(style_name):
    """Test endpoint to check if a style works."""
    try:
        # Test style prompt generation
        style_prompt = create_style_prompt(style_name, {})
        print(f"Style prompt for {style_name}: {style_prompt[:200]}...")
        
        # Test reference image loading
        reference_image = load_reference_image(style_name)
        print(f"Reference image for {style_name}: {reference_image is not None}")
        
        return jsonify({
            'success': True,
            'style': style_name,
            'prompt_length': len(style_prompt),
            'has_reference': reference_image is not None,
            'prompt_preview': style_prompt[:200]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/test_claymation_player')
def test_claymation_player():
    """Test claymation with player context to see enhancement."""
    try:
        # Test claymation with player context
        metadata = json.dumps({'content_type': 'player'})
        style_prompt = create_style_prompt('claymation', metadata)
        
        # Check if enhancement is present
        has_enhancement = 'CLAYMATION PLAYER ENHANCEMENT' in style_prompt
        
        return jsonify({
            'success': True,
            'style': 'claymation',
            'content_type': 'player',
            'prompt_length': len(style_prompt),
            'has_enhancement': has_enhancement,
            'enhancement_preview': 'CLAYMATION PLAYER ENHANCEMENT' in style_prompt
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# V5.0 API Endpoints
@app.route('/get_style_prompt/<style_name>')
def get_style_prompt_endpoint(style_name):
    """Get the style prompt for a given style."""
    try:
        # Use the existing create_style_prompt function
        metadata = json.dumps({'content_type': 'player'})
        prompt = create_style_prompt(style_name, metadata)
        return jsonify({
            'success': True,
            'style': style_name,
            'prompt': prompt
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_style_reference_filename(style_name):
    """Get the reference image filename for a given style."""
    # Try different file extensions
    extensions = ['.jpg', '.jpeg', '.png']
    for ext in extensions:
        filename = f'{style_name}{ext}'
        if os.path.exists(os.path.join(BASE_DIR, '..', 'style_references', filename)):
            return filename
    return None

@app.route('/get_subject_prompt/<subject_type>')
def get_subject_prompt(subject_type):
    """Get the prompt for a specific subject type."""
    try:
        # Get subject-specific prompts (relaxed logo policy - allow team branding)
        subject_prompts = {
            'stadium': "photorealistic stadium, {venue_type} venue, above angle 3/4 shot, distinctive architecture, {stadium_details}, DOMINANT {primary_color} and {secondary_color} team colors as COLOR OVERLAYS and FILTERS on lighting, seating, architectural elements, and atmospheric effects, {accent_color} accent lighting creating dramatic color contrast, VIBRANT team color reflections and shadows, dramatic lighting with team color grading, professional architectural photography, clean playing surface (restrict floor/court logos), high-detail, wide angle view, impressive scale, cinematic composition, focus on architectural beauty with MAXIMUM team color visibility and impact, allow stadium branding and signage",
            'action': "photorealistic sports action shot, professional {sport} player, {team}, {action_context}, full body shot with head and feet visible, dynamic action pose, authentic team uniform with jersey numbers and team logos, DOMINANT {primary_color} and {secondary_color} team colors as COLOR OVERLAYS throughout uniform and background, {accent_color} accent details, professional sports photography, stadium background with team color grading, centered composition, high-detail, dramatic lighting with team color filters, sharp focus, motion blur, allow authentic team branding on uniforms",
            'player': "photorealistic sports player, professional {sport} player, {team}, full body shot with head and feet visible, dynamic action pose with arms raised or positioned to naturally hide face, athletic movement, authentic team uniform with visible logos and jersey numbers, DOMINANT {primary_color} and {secondary_color} team colors as COLOR OVERLAYS throughout uniform and background, {accent_color} accent details, professional sports photography, stadium background with team color grading, centered composition, high-detail, dramatic lighting with team color filters, sharp focus, allow team logos, jersey numbers, and authentic branding",
            'closeup': "photorealistic sports equipment close-up, {closeup_details}, professional {sport} equipment from {team}, DOMINANT {primary_color} and {secondary_color} team colors as COLOR OVERLAYS throughout equipment details, {accent_color} accent highlights, macro photography, extreme detail, texture focus, professional product photography with team color grading, sharp focus, allow authentic team logos and equipment branding"
        }
        
        prompt_template = subject_prompts.get(subject_type, subject_prompts['player'])
        
        return jsonify({
            'success': True,
            'subject': subject_type,
            'prompt': prompt_template
        })
        
    except Exception as e:
        print(f"Error getting subject prompt for {subject_type}: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/get_subject_details/<subject_type>')
def get_subject_details(subject_type):
    """Get details about a specific subject type."""
    try:
        subject_details = {
            'stadium': "Stadium shots focus on architectural beauty with team color integration. Features above-angle 3/4 views, distinctive architecture, and dramatic lighting. Team colors are applied as overlays and filters on lighting, seating, and atmospheric effects. No floor logos or text allowed.",
            'action': "Action shots capture dynamic sports moments with authentic team uniforms. Features full-body shots with motion blur and dramatic lighting. Team colors are prominently displayed throughout uniforms and backgrounds. No face or numbers visible.",
            'player': "Player shots show posed athletes in authentic team uniforms. Features centered composition with professional lighting. Team colors are emphasized throughout uniforms and backgrounds. No face or numbers visible.",
            'closeup': "Close-up shots focus on equipment details and textures. Features macro photography with extreme detail and texture focus. Team colors are applied to equipment surfaces and details. Perfect for helmet details, jersey textures, and equipment close-ups."
        }
        
        details = subject_details.get(subject_type, subject_details['player'])
        
        return jsonify({
            'success': True,
            'subject': subject_type,
            'details': details
        })
        
    except Exception as e:
        print(f"Error getting subject details for {subject_type}: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/get_teams/<league>')
def get_teams(league):
    """Get teams for a specific league from the CSV file."""
    try:
        import csv
        import os
        
        # Read the team colors CSV file
        csv_path = os.path.join(BASE_DIR, '..', 'team_colors.csv')
        teams = []
        
        # Map league names from frontend to CSV names
        league_mapping = {
            'Premier League': 'EPL',
            'PremiereLeague': 'EPL'  # Handle both spellings
        }
        
        csv_league = league_mapping.get(league, league)
        
        with open(csv_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row['sport'] == csv_league:
                    teams.append({
                        'team_name': row['team_name'],
                        'team_id': row['team_name'].replace(' ', '_').upper()[:3],  # Generate team_id from name
                        'primary_color': row['primary_color_hex'],
                        'secondary_color': row['secondary_color_hex'],
                        'accent_color': row['tertiary_color_hex'],
                        'text_color': row['text_color_hex']
                    })
        
        return jsonify({
            'success': True,
            'league': league,
            'teams': teams
        })
        
    except Exception as e:
        print(f"Error getting teams for {league}: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/get_style_reference/<style_name>')
def get_style_reference(style_name):
    """Get the reference image for a given style."""
    try:
        # Try different file extensions and paths
        reference_paths = [
            os.path.join(BASE_DIR, '..', 'style_references', f'{style_name}.jpg'),
            os.path.join(BASE_DIR, '..', 'style_references', f'{style_name}.jpeg'),
            os.path.join(BASE_DIR, '..', 'style_references', f'{style_name}.png'),
        ]
        
        reference_image = None
        for path in reference_paths:
            print(f"Checking path: {path}")
            if os.path.exists(path):
                print(f"Found reference image at: {path}")
                with open(path, 'rb') as f:
                    reference_image = f.read()
                break
            else:
                print(f"Path does not exist: {path}")
        
        if reference_image:
            # Convert to base64
            import base64
            image_b64 = base64.b64encode(reference_image).decode('utf-8')
            return jsonify({
                'success': True,
                'style': style_name,
                'image': f"data:image/jpeg;base64,{image_b64}"
            })
        else:
            return jsonify({
                'success': False,
                'style': style_name,
                'message': 'No reference image available'
            })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/team_colors.csv')
def serve_team_colors():
    """Serve the team colors CSV file."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'team_colors.csv'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'text/csv'}
    except FileNotFoundError:
        return "Team colors CSV not found", 404
    except Exception as e:
        return f"Error loading team colors: {str(e)}", 500

@app.route('/generate_base_image', methods=['POST'])
def generate_base_image():
    """
    Step 1: Generate or process a base sports image.
    This can either generate a photorealistic sports image from scratch
    or process an uploaded image to be suitable for styling.
    """
    try:
        # Check if this is a file upload (uploaded image) or JSON request (generate from scratch)
        if 'base_image' in request.files:
            # Case 1: Process uploaded image
            base_image_file = request.files['base_image']
            if base_image_file.filename == '':
                return jsonify({'error': 'No base image selected'}), 400
            
            # Get metadata from form data
            metadata = request.form.get('metadata', '{}')
            league = request.form.get('league')
            team = request.form.get('team')
            team_colors = request.form.get('team_colors', '{}')
            
            print(f"Processing uploaded base image for {team} ({league})")
            
            # Load and process the uploaded image
            base_image = Image.open(base_image_file)
            if base_image.mode != 'RGB':
                base_image = base_image.convert('RGB')
            
            # Get custom dimensions from request
            width = int(request.form.get('output_width', 1920))
            height = int(request.form.get('output_height', 1080))
            
            # Resize to custom dimensions without distortion
            base_image = resize_to_custom_dimensions(base_image, width, height)
            print(f"Base image resized to: {base_image.size}")
            
            # Convert to base64
            buffer = io.BytesIO()
            base_image.save(buffer, format='JPEG', quality=95)
            image_b64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
            
            return jsonify({
                'success': True,
                'message': 'Uploaded base image processed successfully',
                'image': f"data:image/jpeg;base64,{image_b64}",
                'metadata': json.loads(metadata)
            })
            
        else:
            # Case 2: Generate from scratch
            data = request.get_json()
            metadata = data.get('metadata', {})
            league = data.get('league')
            team = data.get('team')
            team_colors = data.get('team_colors', {})
            content_type = data.get('content_type', 'player')
            
            print(f"Generating base image from scratch for {team} ({league}) - Content type: {content_type}")
            
            # Detect sport from league name
            sport = detect_sport_from_league(league)
            
            # Check if this is a matchup
            is_matchup = data.get('is_matchup', False)
            
            # Create sport-specific content prompts using a concise, keyword-driven approach
            if is_matchup:
                # Extract team names from the combined string
                teams = team.split(' vs ')
                team1 = teams[0] if len(teams) > 0 else team
                team2 = teams[1] if len(teams) > 1 else 'opponent'
                print(f"Matchup teams: team1='{team1}', team2='{team2}'")
                
                content_prompts = {
                    'player': f"photorealistic sports matchup, {get_matchup_theme(team1, team2)}, {get_matchup_visualization_style(team1, team2, sport, metadata.get('matchup_style', 'auto'))}, professional {sport} players from {team1} and {team2}, authentic uniforms with visible team logos and jersey numbers, DOMINANT team colors as COLOR OVERLAYS, posed rivalry, dramatic lighting with team color grading, stadium environment, professional sports photography, high-detail, intense competition, sharp focus, allow team branding on uniforms",
                    'action': f"photorealistic sports matchup action, {get_matchup_theme(team1, team2)}, {get_matchup_visualization_style(team1, team2, sport, metadata.get('matchup_style', 'auto'))}, professional {sport} players from {team1} and {team2} in dynamic action, {get_sport_action_context(sport)}, authentic uniforms with team logos and numbers, DOMINANT team colors as COLOR OVERLAYS, rivalry and competition, dramatic lighting with team color grading, stadium environment, professional sports photography, high-detail, motion blur, intense energy, allow authentic team branding",
                    'stadium': f"photorealistic stadium matchup, {get_matchup_visualization_style(team1, team2, sport, metadata.get('matchup_style', 'auto'))}, above angle 3/4 shot of a {get_venue_type(sport)} venue, {get_stadium_specific_details(sport)}, DOMINANT team colors from both teams as COLOR OVERLAYS and FILTERS on lighting, seating, architectural elements, and atmospheric effects, VIBRANT color contrast between teams, dramatic lighting with team color reflections and shadows, professional architectural photography, high-detail, cinematic composition, impressive scale, focus on architectural beauty with MAXIMUM team color visibility and impact, clean playing surface (restrict floor/court logos), allow stadium branding and signage",
                    'closeup': f"photorealistic sports equipment close-up matchup, {get_matchup_theme(team1, team2)}, {get_matchup_visualization_style(team1, team2, sport, metadata.get('matchup_style', 'auto'))}, professional {sport} equipment from both teams with authentic team logos, {get_sport_closeup_details(sport)}, DOMINANT team colors as COLOR OVERLAYS throughout equipment details, macro photography, extreme detail, texture focus, professional product photography with team color grading, sharp focus, competitive arrangement, allow equipment branding",
                }
            else:
                # Extract team name only (without city) for jersey text - SPELL IT LETTER BY LETTER
                team_name_only = team.split()[-1].upper() if team else ''
                letter_by_letter = ' - '.join(list(team_name_only))  # e.g., "C - E - L - T - I - C - S"
                
                # Generate safe jersey numbers < 40 (avoid most active roster conflicts)
                safe_number_range = "numbers below 40 that are uncommon like 02, 03, 07, 09, 14, 17, 19, 21, 26, 27, 29, 31, 37, 38, 39"
                
                content_prompts = {
                    'player': f"photorealistic sports player, professional {sport} player, {team}, full body shot with head and feet visible, posed shot, authentic team uniform with visible team logos and jersey numbers, 🚨 JERSEY TEXT CRITICAL - SPELL LETTER-BY-LETTER: {letter_by_letter} = '{team_name_only}' (ZERO misspellings allowed), use jersey number BELOW 40 preferably from {safe_number_range}, DOMINANT {team_colors.get('primary_color', '')} and {team_colors.get('secondary_color', '')} team colors as COLOR OVERLAYS throughout uniform and background, {team_colors.get('accent_color', '')} accent details, professional sports photography, stadium background with team color grading, centered composition, high-detail, dramatic lighting with team color filters, sharp focus, allow team branding on uniforms",
                    'action': f"photorealistic sports action shot, professional {sport} player, {team}, {get_sport_action_context(sport)}, full body shot with head and feet visible, dynamic action pose, authentic team uniform with team logos and numbers, 🚨 JERSEY TEXT CRITICAL - SPELL LETTER-BY-LETTER: {letter_by_letter} = '{team_name_only}' (ZERO misspellings allowed), use jersey number BELOW 40 preferably from {safe_number_range}, DOMINANT {team_colors.get('primary_color', '')} and {team_colors.get('secondary_color', '')} team colors as COLOR OVERLAYS throughout uniform and background, {team_colors.get('accent_color', '')} accent details, professional sports photography, stadium background with team color grading, centered composition, high-detail, dramatic lighting with team color filters, sharp focus, motion blur, allow authentic team branding",
                    'stadium': f"photorealistic stadium, {get_venue_type(sport)} venue, above angle 3/4 shot, distinctive architecture, {get_stadium_specific_details(sport)}, DOMINANT {team_colors.get('primary_color', '')} and {team_colors.get('secondary_color', '')} team colors as COLOR OVERLAYS and FILTERS on lighting, seating, architectural elements, and atmospheric effects, {team_colors.get('accent_color', '')} accent lighting creating dramatic color contrast, VIBRANT team color reflections and shadows, dramatic lighting with team color grading, professional architectural photography, clean playing surface (restrict floor/court logos), high-detail, wide angle view, impressive scale, cinematic composition, focus on architectural beauty with MAXIMUM team color visibility and impact, allow stadium branding and signage",
                    'closeup': f"photorealistic sports equipment close-up, {get_sport_closeup_details(sport)}, professional {sport} equipment from {team} with authentic team logos, DOMINANT {team_colors.get('primary_color', '')} and {team_colors.get('secondary_color', '')} team colors as COLOR OVERLAYS throughout equipment details, {team_colors.get('accent_color', '')} accent highlights, macro photography, extreme detail, texture focus, professional product photography with team color grading, sharp focus, allow equipment branding",
                }
            
            # Check for custom subject prompt
            custom_subject_prompt = request.form.get('custom_subject_prompt')
            if custom_subject_prompt and custom_subject_prompt.strip():
                # Use custom subject prompt
                content_prompt = custom_subject_prompt
                print(f"Using custom subject prompt for {content_type}")
            else:
                # Use default content prompt
                content_prompt = content_prompts.get(content_type, content_prompts['player'])

            # Add enhanced color instructions
            enhanced_colors = get_enhanced_color_instructions(content_type, team_colors)

            # Get custom dimensions and section from request
            width = int(data.get('output_width', 1920))
            height = int(data.get('output_height', 1080))
            section = data.get('section', 'Wide')  # Get section for composition
            with_alpha = data.get('with_alpha', False)  # Check if transparency is requested
            
            # Calculate aspect ratio for prompt
            aspect_ratio = f"{width}:{height}"
            
            # Get composition instructions based on content type and section (pass dimensions for padding detection)
            composition_instruction = get_composition_instructions(content_type, section, width=width, height=height)
            
            # No special background needed - rembg handles complex backgrounds
            transparency_instruction = ""
            
            # Get team name for text accuracy - letter by letter spelling
            team_name_only = team.split()[-1].upper() if team else ''
            letter_by_letter = ' - '.join(list(team_name_only))  # e.g., "C - E - L - T - I - C - S"
            
            # Add technical details and a focused negative prompt (allow team branding, restrict floor logos)
            prompt_additions = f""", {aspect_ratio} aspect ratio, {composition_instruction}{transparency_instruction}, 8k, photorealistic, high resolution, sharp focus, professional photography.
{enhanced_colors}
🚨 CRITICAL SPELLING REQUIREMENT - TEAM NAME MUST BE EXACT 🚨
If jersey text is visible, spell the team name LETTER-BY-LETTER correctly:
{letter_by_letter}
Complete word: {team_name_only}
ZERO tolerance for misspellings. DO NOT create variations like: DOLTICS, CELITCS, BCELTICS, LKAERS, WARIORS, PAKCERS, etc.
Every single letter must be in the correct position. Verify each letter matches the requirement above.
Jersey numbers: Use ONLY these safe numbers: 00, 02, 03, 07, 09, 14, 17, 19, 21, 26, 27, 29, 31, 37, 38, 39, 88, 97, 99 (all below 40).
CRITICAL: Generate ONLY {content_type} content as specified. Do not generate any other content type.
Allow authentic team logos, jersey numbers, and branding on uniforms and equipment. Restrict only distracting floor logos, court text, and field text to maintain focus on subject.
--no floor logos, court logos, field logos, ice logos, distracting text on playing surfaces, no misspelled team names, no gibberish text, no incorrect letters in team names"""

            full_prompt = content_prompt + prompt_additions
            
            print(f"Generating base image for {team} - {content_type}")
            print(f"Sport detected: {sport}")
            print(f"Final prompt (preview): {full_prompt[:500]}")
            
            # Generate the base image
            model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
            response = model.generate_content([full_prompt])
            
            if response and hasattr(response, 'candidates') and response.candidates:
                for candidate in response.candidates:
                    if hasattr(candidate, 'content') and candidate.content.parts:
                        for part in candidate.content.parts:
                            if hasattr(part, 'inline_data') and part.inline_data:
                                # Convert to base64
                                image_data = part.inline_data.data
                                
                                # Process the image to ensure it's valid
                                try:
                                    img = Image.open(io.BytesIO(image_data))
                                    if img.mode != 'RGB':
                                        img = img.convert('RGB')
                                    
                                    # Get custom dimensions from request
                                    width = int(request.form.get('output_width', 1920))
                                    height = int(request.form.get('output_height', 1080))
                                    
                                    # Resize to custom dimensions without distortion
                                    img = resize_to_custom_dimensions(img, width, height)
                                    print(f"Styled image resized to: {img.size}")
                                    
                                    # Convert back to base64
                                    buffer = io.BytesIO()
                                    img.save(buffer, format='JPEG', quality=95)
                                    image_b64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
                                    
                                    print(f"Base image generated successfully - Size: 720x1080")
                                    
                                    return jsonify({
                                        'success': True,
                                        'message': 'Base image generated successfully',
                                        'image': f"data:image/jpeg;base64,{image_b64}",
                                        'metadata': metadata
                                    })
                                except Exception as img_error:
                                    print(f"Error processing generated image: {img_error}")
                                    # Fallback to raw data
                                    image_b64 = base64.b64encode(image_data).decode('utf-8')
                                    return jsonify({
                                        'success': True,
                                        'message': 'Base image generated (raw)',
                                        'image': f"data:image/jpeg;base64,{image_b64}",
                                        'metadata': metadata
                                    })
            
            return jsonify({'error': 'Failed to generate base image'}), 500
        
    except Exception as e:
        print(f"Error processing base image: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/apply_style', methods=['POST'])
def apply_style():
    """
    Step 2: Apply artistic style to a base image.
    This takes a base image and applies the requested artistic style.
    """
    try:
        # Get the base image
        if 'base_image' not in request.files:
            return jsonify({'error': 'No base image provided'}), 400
        
        base_image_file = request.files['base_image']
        if base_image_file.filename == '':
            return jsonify({'error': 'No base image selected'}), 400
        
        # Check for custom reference image
        custom_reference_image = None
        if 'custom_reference_image' in request.files:
            custom_ref_file = request.files['custom_reference_image']
            if custom_ref_file.filename != '':
                custom_reference_image = custom_ref_file
                print("Custom reference image provided")
        
        # Get style and metadata
        style = request.form.get('style', 'comic-book')
        metadata = request.form.get('metadata', '{}')
        slot_parameters = request.form.get('slotParameters', '[]')
        
        # Parse metadata to check for blended styles
        metadata_dict = json.loads(metadata)
        blended_styles = metadata_dict.get('blended_styles', [])
        blend_weights = metadata_dict.get('blend_weights', [])
        
        # Extract team information for color integration
        league = metadata_dict.get('league')
        team = metadata_dict.get('team')
        team_colors = metadata_dict.get('team_colors', {})
        
        print(f"Applying style '{style}' to base image")
        if blended_styles:
            print(f"Blending styles: {blended_styles} with weights: {blend_weights}")
        print(f"Style normalized: '{style.lower()}'")
        print(f"Style type: {type(style)}")
        print(f"Team colors for style: {team_colors}")
        
        # Load and process the base image
        base_image = Image.open(base_image_file)
        if base_image.mode != 'RGB':
            base_image = base_image.convert('RGB')
        
        # Get custom dimensions from request
        width = int(request.form.get('output_width', 1920))
        height = int(request.form.get('output_height', 1080))
        with_alpha = request.form.get('with_alpha', 'false').lower() == 'true'  # Check if transparency is requested
        
        # Resize to custom dimensions without distortion
        base_image = resize_to_custom_dimensions(base_image, width, height)
        
        # Create style prompt - either single or blended
        if blended_styles and len(blended_styles) > 1:
            # Create blended style prompt
            style_prompt = create_blended_style_prompt(blended_styles, blend_weights, metadata_dict, league, team, team_colors, width, height)
        else:
            # Single style prompt
            style_prompt = create_style_prompt(style, metadata_dict, league, team, team_colors, width, height, with_alpha)
        print(f"Style prompt created, length: {len(style_prompt)}")
        print(f"First 500 chars of prompt: {style_prompt[:500]}")
        print(f"Style being applied: {style}")
        print(f"Style prompt for {style} contains claymation keywords: {'claymation' in style_prompt.lower()}")
        if style.lower() == 'claymation':
            print(f"🎨 CLAYMATION DEBUG: Full style prompt length: {len(style_prompt)}")
            print(f"🎨 CLAYMATION DEBUG: Prompt contains 'TRANSFORM INTO CLAYMATION': {'TRANSFORM INTO CLAYMATION' in style_prompt}")
            print(f"🎨 CLAYMATION DEBUG: First 1000 chars: {style_prompt[:1000]}")
        
        # Load reference image for the style (use custom if provided)
        reference_image = None
        if custom_reference_image:
            try:
                reference_image = Image.open(custom_reference_image)
                if reference_image.mode != 'RGB':
                    reference_image = reference_image.convert('RGB')
                print("Using custom reference image")
            except Exception as e:
                print(f"Error processing custom reference image: {e}")
                reference_image = None
        else:
            reference_image_data = load_reference_image(style)
            print(f"Reference image loaded: {reference_image_data is not None}")
            if reference_image_data:
                try:
                    reference_image = Image.open(io.BytesIO(reference_image_data))
                    if reference_image.mode != 'RGB':
                        reference_image = reference_image.convert('RGB')
                except Exception as e:
                    print(f"Error processing reference image: {e}")
                    reference_image = None
        
        # Generate the styled image
        model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
        
        content = [style_prompt, base_image]
        if reference_image:
            content.append(reference_image)
        
        print(f"Calling Gemini API with {len(content)} content items")
        
        # Add timeout and generation config
        generation_config = {
            'temperature': 0.7,
            'top_p': 0.8,
            'top_k': 40,
            'max_output_tokens': 8192,
        }
        
        # Generate the styled image with timeout handling
        print(f"🎨 CALLING GEMINI API: Style={style}, Content items={len(content)}")
        response = model.generate_content(
            content,
            generation_config=generation_config,
            safety_settings=[
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            ]
        )
        print(f"🎨 GEMINI API SUCCESS: Response received for style {style}")
        
        print(f"Gemini API response received: {response is not None}")
        if response:
            print(f"Response type: {type(response)}")
            if hasattr(response, 'candidates'):
                print(f"Response has candidates: {response.candidates is not None}")
                if response.candidates:
                    print(f"Number of candidates: {len(response.candidates)}")
            if hasattr(response, 'prompt_feedback'):
                print(f"Prompt feedback: {response.prompt_feedback}")
        
        # Process the response
        generated_images = []
        if response and hasattr(response, 'candidates') and response.candidates:
            print(f"Response has {len(response.candidates)} candidates")
            for i, candidate in enumerate(response.candidates):
                print(f"Processing candidate {i}")
                if hasattr(candidate, 'finish_reason'):
                    print(f"Candidate finish reason: {candidate.finish_reason}")
                if hasattr(candidate, 'content') and candidate.content.parts:
                    print(f"Candidate has {len(candidate.content.parts)} parts")
                    for part in candidate.content.parts:
                        if hasattr(part, 'inline_data') and part.inline_data:
                            image_data = part.inline_data.data
                            print(f"Found image data for style {style}, size: {len(image_data)} bytes")
                            if style.lower() == 'claymation':
                                print(f"🎨 CLAYMATION DEBUG: Generated image data size: {len(image_data)} bytes")
                                print(f"🎨 CLAYMATION DEBUG: Image data starts with: {image_data[:50] if len(image_data) > 50 else image_data}")
                            
                            # Process the image to ensure it's valid
                            try:
                                img = Image.open(io.BytesIO(image_data))
                                if img.mode != 'RGB':
                                    img = img.convert('RGB')
                                
                                # Get custom dimensions from request
                                width = int(request.form.get('output_width', 1920))
                                height = int(request.form.get('output_height', 1080))
                                
                                # Resize to custom dimensions without distortion
                                img = resize_to_custom_dimensions(img, width, height)
                                
                                # Convert back to base64
                                buffer = io.BytesIO()
                                img.save(buffer, format='JPEG', quality=95)
                                image_b64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
                                
                                generated_images.append({
                                    'data': f"data:image/jpeg;base64,{image_b64}",
                                    'style': style
                                })
                                
                                print(f"✅ STYLE APPLICATION SUCCESS: {style} - Image size: {len(image_data)} bytes")
                            except Exception as img_error:
                                print(f"Error processing styled image: {img_error}")
                                # Fallback to raw data
                                image_b64 = base64.b64encode(image_data).decode('utf-8')
                                generated_images.append({
                                    'data': f"data:image/jpeg;base64,{image_b64}",
                                    'style': style
                                })
        
        else:
            print("No candidates in response or response is None")
            print(f"Response: {response}")
            if hasattr(response, 'prompt_feedback'):
                print(f"Prompt feedback: {response.prompt_feedback}")
        
        if not generated_images:
            print(f"❌ STYLE APPLICATION FAILED: No styled images were generated from the response for style: {style}")
            print(f"   - Style: {style}")
            print(f"   - Response type: {type(response)}")
            print(f"   - Has candidates: {hasattr(response, 'candidates') and response.candidates is not None}")
            if hasattr(response, 'prompt_feedback'):
                print(f"   - Prompt feedback: {response.prompt_feedback}")
            
            # Try without reference image if it failed with one
            if reference_image:
                print("Retrying without reference image...")
                try:
                    response = model.generate_content([style_prompt, base_image])
                    if response and hasattr(response, 'candidates') and response.candidates:
                        for candidate in response.candidates:
                            if hasattr(candidate, 'content') and candidate.content.parts:
                                for part in candidate.content.parts:
                                    if hasattr(part, 'inline_data') and part.inline_data:
                                        try:
                                            image_data = part.inline_data.data
                                            img = Image.open(io.BytesIO(image_data))
                                            if img.mode != 'RGB':
                                                img = img.convert('RGB')
                                            # Get custom dimensions from request
                                            width = int(request.form.get('output_width', 1920))
                                            height = int(request.form.get('output_height', 1080))
                                            
                                            # Resize to custom dimensions without distortion
                                            img = resize_to_custom_dimensions(img, width, height)
                                            buffer = io.BytesIO()
                                            img.save(buffer, format='JPEG', quality=95)
                                            image_b64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
                                            generated_images.append({
                                                'data': f"data:image/jpeg;base64,{image_b64}",
                                                'style': style
                                            })
                                            print(f"Styled image generated successfully without reference for style: {style}")
                                        except Exception as e:
                                            print(f"Error processing retry image: {e}")
                except Exception as e:
                    print(f"Error in retry attempt: {e}")
            
            # If still no images, return the base image as fallback
            if not generated_images:
                print(f"All attempts failed for style: {style}. Returning base image as fallback.")
                try:
                    # Convert base image to base64 as fallback
                    buffer = io.BytesIO()
                    base_image.save(buffer, format='JPEG', quality=95)
                    image_b64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
                    generated_images.append({
                        'data': f"data:image/jpeg;base64,{image_b64}",
                        'style': style
                    })
                    print(f"Returning base image as fallback for style: {style}")
                except Exception as e:
                    print(f"Error creating fallback image: {e}")
            
            if not generated_images:
                return jsonify({'error': 'No styled images were generated'}), 500
        
        return jsonify({
            'success': True,
            'message': 'Style applied successfully',
            'style': style,
            'metadata': json.loads(metadata),
            'image': generated_images[0]['data'],
            'generated_images': generated_images
        })
        
    except Exception as e:
        print(f"Error applying style: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/run_qa', methods=['POST'])
def run_qa():
    """
    Run QA checks on an image.
    Accepts image data and returns QA scores.
    """
    try:
        data = request.get_json()
        
        # Get image data
        image_data_url = data.get('image')
        if not image_data_url:
            return jsonify({'error': 'No image provided'}), 400
        
        # Decode image
        if ',' in image_data_url:
            image_data_url = image_data_url.split(',')[1]
        
        import base64
        image_bytes = base64.b64decode(image_data_url)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Get parameters
        expected_aspect_ratio = data.get('aspect_ratio', '16:9')
        expected_sport = data.get('sport', 'generic')
        content_type = data.get('content_type', 'player')
        expected_team_name = data.get('team_name', None)  # For text accuracy check
        
        # Import QA modules
        from qa_technical import run_technical_qa
        from qa_visual import run_visual_integrity_qa
        
        # Run technical QA
        technical_results = run_technical_qa(image, expected_aspect_ratio)
        
        # Run visual integrity QA (if API key available)
        visual_results = None
        try:
            visual_results = run_visual_integrity_qa(image, expected_sport, content_type, api_key, expected_team_name)
        except Exception as e:
            print(f"Visual QA error: {e}")
            # Visual QA is optional, continue without it
        
        # Check player integrity for transparent images
        player_integrity_results = None
        if image.mode == 'RGBA':
            try:
                from qa_visual import check_player_integrity
                player_integrity_results = check_player_integrity(image)
                print(f"Player Integrity: {player_integrity_results['score']}% ({player_integrity_results['issue']})")
            except Exception as e:
                print(f"Player integrity QA error: {e}")
        
        # Calculate combined score with player integrity
        if visual_results and player_integrity_results:
            combined_score = int(
                technical_results['technical_qa_score'] * 0.30 +
                visual_results['visual_integrity_score'] * 0.60 +
                player_integrity_results['score'] * 0.10
            )
        elif visual_results:
            combined_score = int(
                technical_results['technical_qa_score'] * 0.60 +
                visual_results['visual_integrity_score'] * 0.40
            )
        else:
            combined_score = technical_results['technical_qa_score']
        
        # Determine status
        if combined_score >= 85:
            status = 'pass'
            status_label = 'Pass'
            badge_color = 'green'
        elif combined_score >= 70:
            status = 'review'
            status_label = 'Needs Review'
            badge_color = 'yellow'
        else:
            status = 'fail'
            status_label = 'Fail'
            badge_color = 'red'
        
        return jsonify({
            'success': True,
            'combined_qa_score': combined_score,
            'status': status,
            'status_label': status_label,
            'badge_color': badge_color,
            'technical_qa': technical_results,
            'visual_integrity_qa': visual_results,
            'player_integrity_qa': player_integrity_results
        })
        
    except Exception as e:
        print(f"Error in QA: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/apply_overlay', methods=['POST'])
def apply_overlay():
    """
    Apply PNG overlay to a generated image.
    Automatically loads appropriate overlay based on section and transparency.
    
    Rules:
    - Wide with transparency OFF: WideOverlay.png on TOP (over generated image)
    - Wide with transparency ON: WideOverlay.png UNDER (generated image with alpha on top)
    - Tall with transparency OFF: TallOverlay.png on TOP
    - Tall with transparency ON: TallUnderlay.png UNDER (generated image with alpha on top)
    """
    try:
        data = request.get_json()
        
        # Get parameters
        generated_image_data = data.get('generated_image')
        section = data.get('section', 'Wide')  # 'Wide' or 'Tall'
        with_alpha = data.get('with_alpha', False)  # Transparency checkbox
        shift_x = data.get('shift_x')  # Optional custom horizontal shift
        shift_y = data.get('shift_y')  # Optional custom vertical shift
        
        if not generated_image_data:
            return jsonify({'error': 'Generated image required'}), 400
        
        # Import compositing module
        from compositing import composite_overlay, base64_to_image, image_to_base64
        
        # Convert base64 to PIL image
        generated_img = base64_to_image(generated_image_data)
        
        # Determine which overlay to use and what mode
        if section == 'Wide':
            if with_alpha:
                # Wide with transparency: use WideUnderlay.png UNDER the transparent subject
                overlay_path = os.path.join(BASE_DIR, '..', 'overlays', '16x9', 'underlay.png')
                mode = 'over'  # Generated transparent image OVER the underlay
            else:
                # Wide without transparency: use WideOverlay.png ON TOP
                overlay_path = os.path.join(BASE_DIR, '..', 'overlays', '16x9', 'overlay.png')
                mode = 'under'  # Generated image UNDER the overlay (overlay on top)
        else:  # Tall
            if with_alpha:
                # Tall with transparency: use TallUnderlay.png UNDER the transparent subject
                overlay_path = os.path.join(BASE_DIR, '..', 'overlays', '2x3', 'underlay.png')
                mode = 'over'  # Generated transparent image OVER the underlay
            else:
                # Tall without transparency: use TallOverlay.png ON TOP
                overlay_path = os.path.join(BASE_DIR, '..', 'overlays', '2x3', 'overlay.png')
                mode = 'under'  # Generated image UNDER the overlay (overlay on top)
        
        # Load overlay image
        if not os.path.exists(overlay_path):
            print(f"Overlay not found: {overlay_path}")
            return jsonify({'error': f'Overlay file not found: {overlay_path}'}), 404
        
        overlay_img = Image.open(overlay_path)
        
        # Apply compositing with optional custom shifts (X and Y)
        result_img = composite_overlay(generated_img, overlay_img, mode=mode, shift_x=shift_x, shift_y=shift_y)
        
        print(f"✅ Composited successfully:")
        print(f"   Generated size: {generated_img.size}, mode: {generated_img.mode}")
        print(f"   Overlay size: {overlay_img.size}, mode: {overlay_img.mode}")
        print(f"   Result size: {result_img.size}, mode: {result_img.mode}")
        
        # Convert back to base64
        result_base64 = image_to_base64(result_img, format='PNG')
        print(f"   Base64 length: {len(result_base64)}")
        
        # Save a debug copy to verify
        debug_path = f'debug_backend_composite_{mode}.png'
        result_img.save(debug_path)
        print(f"   Debug saved: {debug_path}")
        
        return jsonify({
            'success': True,
            'image': f'data:image/png;base64,{result_base64}',
            'mode': mode,
            'overlay_used': os.path.basename(overlay_path)
        })
        
    except Exception as e:
        print(f"Error applying overlay: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/upload_overlay', methods=['POST'])
def upload_overlay():
    """Upload a custom overlay image."""
    try:
        if 'overlay_image' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['overlay_image']
        overlay_type = request.form.get('overlay_type', 'wide-overlay')
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Map overlay type to path
        type_mapping = {
            'wide-overlay': ('16x9', 'overlay.png'),
            'wide-underlay': ('16x9', 'underlay.png'),
            'tall-overlay': ('2x3', 'overlay.png'),
            'tall-underlay': ('2x3', 'underlay.png')
        }
        
        if overlay_type not in type_mapping:
            return jsonify({'error': f'Invalid overlay type: {overlay_type}'}), 400
        
        folder, filename = type_mapping[overlay_type]
        overlay_dir = os.path.join(BASE_DIR, '..', 'overlays', folder)
        
        # Ensure directory exists
        os.makedirs(overlay_dir, exist_ok=True)
        
        # Save overlay
        overlay_path = os.path.join(overlay_dir, filename)
        file.save(overlay_path)
        
        print(f"Uploaded {overlay_type} to {overlay_path}")
        
        return jsonify({
            'success': True,
            'message': f'{overlay_type} uploaded successfully',
            'path': overlay_path
        })
        
    except Exception as e:
        print(f"Error uploading overlay: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/remove_overlay', methods=['POST'])
def remove_overlay():
    """Remove overlay (clear to blank)."""
    try:
        data = request.get_json()
        overlay_type = data.get('overlay_type', 'wide-overlay')
        
        # Map overlay type to path
        type_mapping = {
            'wide-overlay': ('16x9', 'overlay.png'),
            'wide-underlay': ('16x9', 'underlay.png'),
            'tall-overlay': ('2x3', 'overlay.png'),
            'tall-underlay': ('2x3', 'underlay.png')
        }
        
        if overlay_type not in type_mapping:
            return jsonify({'error': f'Invalid overlay type: {overlay_type}'}), 400
        
        folder, filename = type_mapping[overlay_type]
        overlay_dir = os.path.join(BASE_DIR, '..', 'overlays', folder)
        overlay_path = os.path.join(overlay_dir, filename)
        
        # Create a blank 1x1 transparent PNG
        if os.path.exists(overlay_path):
            from PIL import Image
            blank = Image.new('RGBA', (1, 1), (0, 0, 0, 0))
            blank.save(overlay_path)
            print(f"Cleared {overlay_type} to blank")
        
        return jsonify({
            'success': True,
            'message': f'{overlay_type} cleared'
        })
        
    except Exception as e:
        print(f"Error removing overlay: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/restore_default_overlay', methods=['POST'])
def restore_default_overlay():
    """Restore default overlay from InfoLayer."""
    try:
        data = request.get_json()
        overlay_type = data.get('overlay_type', 'wide-overlay')
        
        # Map overlay type to paths
        type_mapping = {
            'wide-overlay': {
                'source': os.path.join(BASE_DIR, '..', 'InfoLayer', 'WideOverlay.png'),
                'dest': os.path.join(BASE_DIR, '..', 'overlays', '16x9', 'overlay.png')
            },
            'wide-underlay': {
                'source': os.path.join(BASE_DIR, '..', 'InfoLayer', 'WideUnderlay.png'),
                'dest': os.path.join(BASE_DIR, '..', 'overlays', '16x9', 'underlay.png')
            },
            'tall-overlay': {
                'source': os.path.join(BASE_DIR, '..', 'InfoLayer', 'TallOverlay.png'),
                'dest': os.path.join(BASE_DIR, '..', 'overlays', '2x3', 'overlay.png')
            },
            'tall-underlay': {
                'source': os.path.join(BASE_DIR, '..', 'InfoLayer', 'TallUnderlay.png'),
                'dest': os.path.join(BASE_DIR, '..', 'overlays', '2x3', 'underlay.png')
            }
        }
        
        if overlay_type not in type_mapping:
            return jsonify({'error': f'Invalid overlay type: {overlay_type}'}), 400
        
        mapping = type_mapping[overlay_type]
        source_path = mapping['source']
        dest_path = mapping['dest']
        
        if not os.path.exists(source_path):
            return jsonify({'error': f'Default overlay not found: {source_path}'}), 404
        
        # Ensure destination directory exists
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        
        # Copy from InfoLayer to overlays
        import shutil
        shutil.copy(source_path, dest_path)
        
        print(f"Restored {overlay_type} from {source_path} to {dest_path}")
        
        return jsonify({
            'success': True,
            'message': f'{overlay_type} restored to default'
        })
        
    except Exception as e:
        print(f"Error restoring default overlay: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/get_overlay_preview', methods=['GET'])
def get_overlay_preview():
    """Get thumbnail preview of overlay."""
    try:
        overlay_type = request.args.get('overlay_type', 'wide-overlay')
        
        # Map overlay type to path
        type_mapping = {
            'wide-overlay': ('16x9', 'overlay.png'),
            'wide-underlay': ('16x9', 'underlay.png'),
            'tall-overlay': ('2x3', 'overlay.png'),
            'tall-underlay': ('2x3', 'underlay.png')
        }
        
        if overlay_type not in type_mapping:
            return jsonify({'error': f'Invalid overlay type: {overlay_type}'}), 400
        
        folder, filename = type_mapping[overlay_type]
        overlay_path = os.path.join(BASE_DIR, '..', 'overlays', folder, filename)
        
        if not os.path.exists(overlay_path):
            # Return placeholder
            return jsonify({
                'success': True,
                'preview': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
            })
        
        # Load and create thumbnail
        from PIL import Image
        import base64
        from io import BytesIO
        
        img = Image.open(overlay_path)
        
        # Create thumbnail (max 200x120)
        img.thumbnail((200, 120), Image.Resampling.LANCZOS)
        
        # Convert to base64
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        img_str = base64.b64encode(buffer.getvalue()).decode()
        
        return jsonify({
            'success': True,
            'preview': f'data:image/png;base64,{img_str}'
        })
        
    except Exception as e:
        print(f"Error getting overlay preview: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/get_custom_styles', methods=['GET'])
def get_custom_styles():
    """Get custom style definitions."""
    try:
        custom_styles_path = os.path.join(BASE_DIR, 'custom_styles.json')
        
        if not os.path.exists(custom_styles_path):
            # Create default file
            default_styles = {
                'custom-1': {'name': 'Custom 1', 'prompt': '', 'has_reference': False},
                'custom-2': {'name': 'Custom 2', 'prompt': '', 'has_reference': False}
            }
            with open(custom_styles_path, 'w') as f:
                json.dump(default_styles, f, indent=2)
            
            return jsonify({'success': True, 'styles': default_styles})
        
        with open(custom_styles_path, 'r') as f:
            styles = json.load(f)
        
        return jsonify({'success': True, 'styles': styles})
        
    except Exception as e:
        print(f"Error loading custom styles: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/save_custom_style', methods=['POST'])
def save_custom_style():
    """Save custom style definition."""
    try:
        data = request.get_json()
        style_id = data.get('style_id')
        prompt = data.get('prompt', '')
        
        if style_id not in ['custom-1', 'custom-2']:
            return jsonify({'error': 'Invalid style ID'}), 400
        
        custom_styles_path = os.path.join(BASE_DIR, 'custom_styles.json')
        
        # Load current styles
        if os.path.exists(custom_styles_path):
            with open(custom_styles_path, 'r') as f:
                styles = json.load(f)
        else:
            styles = {
                'custom-1': {'name': 'Custom 1', 'prompt': '', 'has_reference': False},
                'custom-2': {'name': 'Custom 2', 'prompt': '', 'has_reference': False}
            }
        
        # Update style
        styles[style_id]['prompt'] = prompt
        
        # Save to file
        with open(custom_styles_path, 'w') as f:
            json.dump(styles, f, indent=2)
        
        print(f"Saved custom style: {style_id}")
        
        return jsonify({
            'success': True,
            'message': f'{style_id} saved successfully'
        })
        
    except Exception as e:
        print(f"Error saving custom style: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/delete_custom_style', methods=['POST'])
def delete_custom_style():
    """Delete custom style definition and reference image."""
    try:
        data = request.get_json()
        style_id = data.get('style_id')
        
        if style_id not in ['custom-1', 'custom-2']:
            return jsonify({'error': 'Invalid style ID'}), 400
        
        custom_styles_path = os.path.join(BASE_DIR, 'custom_styles.json')
        
        # Load current styles
        if os.path.exists(custom_styles_path):
            with open(custom_styles_path, 'r') as f:
                styles = json.load(f)
        else:
            return jsonify({'error': 'Custom styles file not found'}), 404
        
        # Clear style
        styles[style_id] = {'name': f'Custom {style_id[-1]}', 'prompt': '', 'has_reference': False}
        
        # Save to file
        with open(custom_styles_path, 'w') as f:
            json.dump(styles, f, indent=2)
        
        # Remove reference image if exists
        reference_path = os.path.join(BASE_DIR, 'references', f'{style_id}.jpg')
        if os.path.exists(reference_path):
            os.remove(reference_path)
            print(f"Removed reference image for {style_id}")
        
        print(f"Cleared custom style: {style_id}")
        
        return jsonify({
            'success': True,
            'message': f'{style_id} cleared successfully'
        })
        
    except Exception as e:
        print(f"Error deleting custom style: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/upload_style_reference', methods=['POST'])
def upload_style_reference():
    """Upload reference image for custom style."""
    try:
        if 'reference_image' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['reference_image']
        style_id = request.form.get('style_id')
        
        if style_id not in ['custom-1', 'custom-2']:
            return jsonify({'error': 'Invalid style ID'}), 400
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save to references folder
        references_dir = os.path.join(BASE_DIR, 'references')
        os.makedirs(references_dir, exist_ok=True)
        
        reference_path = os.path.join(references_dir, f'{style_id}.jpg')
        file.save(reference_path)
        
        # Update custom styles JSON
        custom_styles_path = os.path.join(BASE_DIR, 'custom_styles.json')
        with open(custom_styles_path, 'r') as f:
            styles = json.load(f)
        
        styles[style_id]['has_reference'] = True
        
        with open(custom_styles_path, 'w') as f:
            json.dump(styles, f, indent=2)
        
        print(f"Uploaded reference for {style_id}")
        
        return jsonify({
            'success': True,
            'message': 'Reference image uploaded'
        })
        
    except Exception as e:
        print(f"Error uploading style reference: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/remove_style_reference', methods=['POST'])
def remove_style_reference():
    """Remove reference image for custom style."""
    try:
        data = request.get_json()
        style_id = data.get('style_id')
        
        if style_id not in ['custom-1', 'custom-2']:
            return jsonify({'error': 'Invalid style ID'}), 400
        
        # Remove reference file
        reference_path = os.path.join(BASE_DIR, 'references', f'{style_id}.jpg')
        if os.path.exists(reference_path):
            os.remove(reference_path)
        
        # Update custom styles JSON
        custom_styles_path = os.path.join(BASE_DIR, 'custom_styles.json')
        with open(custom_styles_path, 'r') as f:
            styles = json.load(f)
        
        styles[style_id]['has_reference'] = False
        
        with open(custom_styles_path, 'w') as f:
            json.dump(styles, f, indent=2)
        
        print(f"Removed reference for {style_id}")
        
        return jsonify({
            'success': True,
            'message': 'Reference removed'
        })
        
    except Exception as e:
        print(f"Error removing style reference: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/get_style_reference_preview', methods=['GET'])
def get_style_reference_preview():
    """Get reference image preview thumbnail for a style."""
    try:
        style = request.args.get('style', '')
        
        reference_path = os.path.join(BASE_DIR, 'references', f'{style}.jpg')
        
        if not os.path.exists(reference_path):
            return jsonify({
                'success': True,
                'has_reference': False
            })
        
        # Load and create thumbnail
        from PIL import Image
        import base64
        from io import BytesIO
        
        img = Image.open(reference_path)
        img.thumbnail((200, 200), Image.Resampling.LANCZOS)
        
        buffer = BytesIO()
        img.save(buffer, format='JPEG')
        img_str = base64.b64encode(buffer.getvalue()).decode()
        
        return jsonify({
            'success': True,
            'has_reference': True,
            'preview': f'data:image/jpeg;base64,{img_str}',
            'filename': f'{style}.jpg'
        })
        
    except Exception as e:
        print(f"Error getting style reference preview: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/get_builtin_style_prompt', methods=['GET'])
def get_builtin_style_prompt():
    """Get built-in style prompt for viewing."""
    try:
        style = request.args.get('style', '')
        
        from style_prompts import get_style_prompt, get_style_reference
        
        prompt = get_style_prompt(style)
        reference_filename = get_style_reference(style)
        has_reference = reference_filename is not None
        
        # Get reference preview if available
        reference_preview = None
        if has_reference:
            reference_path = os.path.join(BASE_DIR, 'references', reference_filename)
            if os.path.exists(reference_path):
                from PIL import Image
                import base64
                from io import BytesIO
                
                img = Image.open(reference_path)
                img.thumbnail((200, 200), Image.Resampling.LANCZOS)
                
                buffer = BytesIO()
                img.save(buffer, format='JPEG')
                img_str = base64.b64encode(buffer.getvalue()).decode()
                reference_preview = f'data:image/jpeg;base64,{img_str}'
        
        return jsonify({
            'success': True,
            'prompt': prompt,
            'has_reference': has_reference,
            'reference_filename': reference_filename,
            'reference_preview': reference_preview
        })
        
    except Exception as e:
        print(f"Error getting built-in style prompt: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/bulk_sampling', methods=['POST'])
def bulk_sampling():
    """Run bulk upload sampling test."""
    try:
        data = request.get_json()
        sample_size = data.get('sample_size', 3)  # Reduced from 5 to 3 for faster testing
        test_styles = data.get('test_styles', ['comic book', 'video game', 'painterly'])
        
        # Import the sampler
        import sys
        import os
        sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        from bulk_upload_sampler import BulkUploadSampler
        
        # Run sampling
        sampler = BulkUploadSampler()
        results = []
        
        # Select random teams
        selected_teams = sampler.select_random_teams()
        
        for i, team in enumerate(selected_teams):
            style = test_styles[i % len(test_styles)]
            print(f"Processing {i+1}/{len(selected_teams)}: {team['team_name']} ({style})")
            
            # Generate styled image
            image_data = sampler.generate_styled_image(team, style)
            
            # Format image data for frontend display
            formatted_image_data = None
            if image_data:
                if image_data.startswith('data:image'):
                    # Already formatted
                    formatted_image_data = image_data
                else:
                    # Add data URL prefix
                    formatted_image_data = f'data:image/jpeg;base64,{image_data}'
            
            result = {
                'team': team,
                'style': style,
                'status': 'success' if image_data else 'failed',
                'image_data': formatted_image_data,
                'filepath': None
            }
            
            if image_data:
                # Save image
                filepath = sampler.save_generated_image(image_data, team, style)
                result['filepath'] = filepath
                print(f"✅ Successfully generated: {team['team_name']}")
            else:
                print(f"❌ Failed to generate: {team['team_name']}")
            
            results.append(result)
        
        return jsonify({
            'success': True,
            'results': results,
            'total_generated': len([r for r in results if r['status'] == 'success'])
        })
        
    except Exception as e:
        print(f"Error in bulk sampling: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/export_image', methods=['POST'])
def export_image_endpoint():
    """Export a single image to organized folder structure."""
    try:
        from export_manager import ExportManager
        
        data = request.get_json()
        
        export_mgr = ExportManager()
        result = export_mgr.export_image(
            image_data=data['image_data'],
            league=data['league'],
            team=data['team'],
            content_type=data['content_type'],
            style=data['style'],
            metadata=data.get('metadata'),
            export_metadata=data.get('export_metadata', False),
            custom_suffix=data.get('custom_suffix')
        )
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in export: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/batch_export', methods=['POST'])
def batch_export_endpoint():
    """Export multiple images in batch."""
    try:
        from export_manager import ExportManager
        
        data = request.get_json()
        images = data.get('images', [])
        export_metadata = data.get('export_metadata', False)
        
        export_mgr = ExportManager()
        result = export_mgr.batch_export(images, export_metadata)
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in batch export: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/import_folder', methods=['POST'])
def import_folder_endpoint():
    """Import images from a folder."""
    try:
        from export_manager import ExportManager
        
        data = request.get_json()
        folder_path = data.get('folder_path')
        run_qa = data.get('run_qa', False)
        
        if not folder_path:
            return jsonify({'success': False, 'error': 'Folder path required'}), 400
        
        export_mgr = ExportManager()
        result = export_mgr.import_images_from_folder(folder_path, run_qa)
        
        return jsonify(result)
        
    except Exception as e:
        print(f"Error in import: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/extract_alpha', methods=['POST'])
def extract_alpha_endpoint():
    """
    Extract subject with transparent background (alpha channel).
    """
    try:
        data = request.get_json()
        
        # Get image data
        image_data_url = data.get('image')
        if not image_data_url:
            return jsonify({'error': 'No image provided'}), 400
        
        # Decode image
        if ',' in image_data_url:
            image_data_url = image_data_url.split(',')[1]
        
        image_bytes = base64.b64decode(image_data_url)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Get parameters
        content_type = data.get('content_type', 'player')
        preserve_elements = data.get('preserve_elements', ['player', 'equipment'])
        
        # Import alpha extraction module
        from alpha_extraction import extract_player_with_alpha, image_to_png_base64, validate_alpha_channel, create_preview_with_checkerboard
        
        # Extract with alpha
        alpha_image = extract_player_with_alpha(image, api_key, preserve_elements)
        
        # Validate alpha channel
        validation = validate_alpha_channel(alpha_image)
        
        # Create preview with checkerboard
        preview_image = create_preview_with_checkerboard(alpha_image)
        
        # Convert to base64 PNG
        alpha_base64 = image_to_png_base64(alpha_image)
        preview_base64 = image_to_png_base64(preview_image)
        
        return jsonify({
            'success': True,
            'alpha_image': f'data:image/png;base64,{alpha_base64}',
            'preview_image': f'data:image/png;base64,{preview_base64}',
            'validation': validation,
            'message': 'Background removed successfully' if validation['valid'] else 'Background removal may be incomplete'
        })
        
    except Exception as e:
        print(f"Error in alpha extraction: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/bulk_upload_interface.html')
def serve_bulk_interface():
    """Serve the bulk upload interface."""
    try:
        with open(os.path.join(BASE_DIR, '..', 'bulk_upload_interface.html'), 'r') as file:
            content = file.read()
        return content, 200, {'Content-Type': 'text/html'}
    except FileNotFoundError:
        return "Bulk upload interface not found", 404
    except Exception as e:
        return f"Error loading bulk interface: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
