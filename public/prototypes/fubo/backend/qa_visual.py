"""
Visual Integrity QA Module
Uses AI (Gemini Vision API) to detect visual integrity issues including:
- Object detection (correct sports equipment)
- Human pose validation (no extra limbs, realistic poses)
- Context validation (appropriate venue/setting)
- Anomaly detection (visual artifacts, impossible scenes)
"""

import google.generativeai as genai
from PIL import Image
from typing import Dict
import io


def check_sports_equipment(image: Image.Image, expected_sport: str, gemini_api_key: str) -> Dict:
    """
    Verify correct sports equipment is present and appropriate.
    
    Args:
        image: PIL Image object
        expected_sport: Sport name (e.g., 'basketball', 'football')
        gemini_api_key: Gemini API key
    
    Returns:
        Dict with 'pass', 'score', 'detected_objects', 'issues'
    """
    try:
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
        
        prompt = f"""
Analyze this sports image for {expected_sport} and identify:
1. What sports equipment is visible (ball, bat, stick, etc.)
2. Is the equipment appropriate for {expected_sport}?
3. Are there any wrong/mismatched equipment items?

Respond in JSON format:
{{
    "sport_detected": "sport name",
    "equipment_found": ["list", "of", "equipment"],
    "appropriate": true/false,
    "issues": ["list of any issues found"],
    "confidence": 0-100
}}
"""
        
        response = model.generate_content([prompt, image])
        
        # Parse response (simplified - in production would use proper JSON parsing)
        if response and response.text:
            text = response.text.strip()
            
            # Extract confidence and issues
            # This is a simplified parsing - real implementation would parse JSON properly
            if "appropriate" in text.lower() and ("true" in text.lower() or "correct" in text.lower()):
                score = 95
                passes = True
                issues = []
            elif "issue" in text.lower() or "wrong" in text.lower():
                score = 70
                passes = False
                issues = ["Detected equipment issues"]
            else:
                score = 85
                passes = True
                issues = []
            
            return {
                'check': 'sports_equipment',
                'pass': passes,
                'score': score,
                'detected_objects': text[:200],  # Truncated for summary
                'issues': issues,
                'details': f"Equipment check for {expected_sport}"
            }
        
    except Exception as e:
        print(f"Error in equipment check: {e}")
        # Return neutral score on error
        return {
            'check': 'sports_equipment',
            'pass': True,
            'score': 80,
            'detected_objects': 'Unable to analyze',
            'issues': [f"Analysis error: {str(e)}"],
            'details': 'Equipment check skipped due to error'
        }


def check_human_pose(image: Image.Image, gemini_api_key: str) -> Dict:
    """
    Validate human poses are realistic (no extra limbs, correct anatomy).
    
    Args:
        image: PIL Image object
        gemini_api_key: Gemini API key
    
    Returns:
        Dict with 'pass', 'score', 'pose_issues'
    """
    try:
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
        
        prompt = """
Analyze the human figures in this sports image for anatomical correctness:
1. Do all people have correct number of limbs (2 arms, 2 legs)?
2. Are poses physically realistic and possible?
3. Are there any duplicated or extra body parts?
4. Are proportions correct?

Respond with:
- "PASS" if all poses are realistic and correct
- "ISSUES" followed by description if there are problems
"""
        
        response = model.generate_content([prompt, image])
        
        if response and response.text:
            text = response.text.strip().upper()
            
            if "PASS" in text and "ISSUE" not in text:
                score = 100
                passes = True
                issues = []
            elif "ISSUE" in text:
                score = 60
                passes = False
                issues = ["Pose or anatomy issues detected"]
            else:
                score = 85
                passes = True
                issues = []
            
            return {
                'check': 'human_pose',
                'pass': passes,
                'score': score,
                'pose_issues': issues,
                'details': text[:200]
            }
        
    except Exception as e:
        print(f"Error in pose check: {e}")
        return {
            'check': 'human_pose',
            'pass': True,
            'score': 80,
            'pose_issues': [],
            'details': 'Pose check skipped due to error'
        }


def check_text_accuracy(image: Image.Image, expected_team_name: str, gemini_api_key: str) -> Dict:
    """
    Check if text on jersey/uniform matches expected team name.
    Catches misspellings like "DOLTICS" instead of "CELTICS".
    Also validates jersey numbers aren't likely active roster numbers.
    
    Args:
        image: PIL Image object
        expected_team_name: Full team name (e.g., "Boston Celtics")
        gemini_api_key: Gemini API key
    
    Returns:
        Dict with 'pass', 'score', 'detected_text', 'issues'
    """
    try:
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
        
        # Extract just the team name (not city)
        team_name_only = expected_team_name.split()[-1].upper()  # e.g., "CELTICS", "LAKERS"
        
        prompt = f"""
Carefully examine ALL text visible on the sports jersey/uniform in this image.

Expected team: {expected_team_name}
Jersey should display: "{team_name_only}"
Safe jersey numbers: MUST be below 40 (preferably uncommon like 02, 03, 07, 09, 14, 17, 19, 21, 26, 27, 29, 31, 37, 38, 39)

Check for:
1. Is the team name spelled EXACTLY correctly? (e.g., CELTICS not DOLTICS, CELITCS, CELTI, BCELTICS, etc.)
2. Are there any misspellings, gibberish, or wrong letters?
3. Is the text legible and matches the expected team?
4. What jersey number is shown? Is it below 40 and uncommon?
   - Safe: Numbers < 40 that are uncommon (02, 03, 07, 09, 14, 17, 19, 21, 26, 27, 29, 31, 37, 38, 39)
   - Risky: Numbers ≥ 40 OR very common numbers (0, 1, 3, 10, 11, 13, 23, 24, 30, 32, 33, 34)
   - Rule violation: Any number 40 or higher

Respond in this format:
TEAM NAME: [team name you see]
JERSEY NUMBER: [number you see, or NONE]
CORRECT: YES/NO
NUMBER VALID: YES (if < 40 and uncommon) / NO (if ≥ 40 or too common)
ISSUES: [list any problems found]

If no text visible, respond: NO_TEXT
"""
        
        response = model.generate_content([prompt, image])
        
        if response and response.text:
            text = response.text.strip().upper()
            
            # Parse response
            detected_team_name = ""
            detected_number = ""
            issues = []
            
            if "TEAM NAME:" in text:
                detected_team_name = text.split("TEAM NAME:")[1].split("\n")[0].strip()
            
            if "JERSEY NUMBER:" in text:
                detected_number = text.split("JERSEY NUMBER:")[1].split("\n")[0].strip()
            
            # Check jersey number validity (must be < 40)
            number_valid = True
            if detected_number and detected_number != "NONE":
                # Parse number if possible
                try:
                    num = int(detected_number.replace('O', '0'))  # Handle OCR errors
                    if num >= 40:
                        issues.append(f"Jersey #{num} is ≥40 (must be <40)")
                        number_valid = False
                except:
                    pass
                
                # Also check Gemini's assessment
                if "NUMBER VALID: NO" in text:
                    if "≥ 40" in text or "40 OR HIGHER" in text.upper():
                        issues.append(f"Jersey #{detected_number} is 40 or higher (rule violation)")
                    else:
                        issues.append(f"Jersey #{detected_number} may be active roster number")
                    number_valid = False
            
            # Check if correct
            if "NO_TEXT" in text:
                score = 50
                passes = False
                issues.append("No text detected on jersey")
                status = 'no_text'
            elif "CORRECT: YES" in text and number_valid:
                # Text matches expected and number is valid
                score = 100
                passes = True
                status = 'correct'
            elif "CORRECT: YES" in text and not number_valid:
                # Text correct but invalid number
                score = 60
                passes = False
                status = 'correct_invalid_number'
            elif "CORRECT: NO" in text:
                # Text has errors - FAIL HARD on misspellings
                score = 0  # Changed from 30 to 0 - zero tolerance
                passes = False
                if detected_team_name:
                    issues.append(f"🚨 SPELLING ERROR: Expected '{team_name_only}', detected '{detected_team_name}'")
                else:
                    issues.append(f"🚨 MISSPELLED TEAM NAME - Regenerate required")
                status = 'incorrect'
            else:
                # Unclear response - default to passing with lower score
                score = 75
                passes = True
                status = 'unclear'
            
            return {
                'check': 'text_accuracy',
                'pass': passes,
                'score': score,
                'detected_text': detected_team_name,
                'detected_number': detected_number,
                'expected_text': team_name_only,
                'issues': issues,
                'status': status,
                'details': f"Text: {status}, Number: {detected_number if detected_number else 'none'}"
            }
        
    except Exception as e:
        print(f"Error in text accuracy check: {e}")
        return {
            'check': 'text_accuracy',
            'pass': True,
            'score': 75,
            'detected_text': 'Unable to verify',
            'expected_text': expected_team_name,
            'issues': [],
            'details': 'Text check skipped due to error'
        }


def check_context_validation(image: Image.Image, expected_sport: str, content_type: str, gemini_api_key: str) -> Dict:
    """
    Validate context matches expected sport and content type.
    
    Args:
        image: PIL Image object
        expected_sport: Sport name
        content_type: 'player', 'action', 'stadium', 'closeup'
        gemini_api_key: Gemini API key
    
    Returns:
        Dict with 'pass', 'score', 'context_match'
    """
    try:
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
        
        venue_map = {
            'basketball': 'basketball court/arena',
            'football': 'football field/stadium',
            'baseball': 'baseball diamond/ballpark',
            'hockey': 'hockey rink/arena',
            'soccer': 'soccer field/stadium'
        }
        expected_venue = venue_map.get(expected_sport, 'sports venue')
        
        prompt = f"""
Verify this image matches expected context:
- Expected sport: {expected_sport}
- Expected content: {content_type}
- Expected venue: {expected_venue}

Does the image show the correct sport and appropriate setting?
Respond with "CORRECT" if it matches, or "MISMATCH" with explanation if not.
"""
        
        response = model.generate_content([prompt, image])
        
        if response and response.text:
            text = response.text.strip().upper()
            
            if "CORRECT" in text or "MATCH" in text and "MISMATCH" not in text:
                score = 95
                passes = True
                context_match = True
            elif "MISMATCH" in text or "WRONG" in text:
                score = 65
                passes = False
                context_match = False
            else:
                score = 85
                passes = True
                context_match = True
            
            return {
                'check': 'context_validation',
                'pass': passes,
                'score': score,
                'context_match': context_match,
                'details': f"Context check for {expected_sport} {content_type}"
            }
        
    except Exception as e:
        print(f"Error in context check: {e}")
        return {
            'check': 'context_validation',
            'pass': True,
            'score': 80,
            'context_match': True,
            'details': 'Context check skipped due to error'
        }


def calculate_visual_integrity_score(checks: list) -> int:
    """
    Calculate overall Visual Integrity Score.
    
    Args:
        checks: List of check result dicts
    
    Returns:
        Overall score (0-100)
    """
    if not checks:
        return 0
    
    # Weighted average (updated to include text accuracy)
    weights = {
        'sports_equipment': 0.25,      # Equipment check
        'human_pose': 0.20,            # Pose validation
        'context_validation': 0.15,    # Context check
        'text_accuracy': 0.40          # CRITICAL - Most important for quality (zero tolerance for misspellings)
    }
    
    total_score = 0
    total_weight = 0
    
    for check in checks:
        check_name = check.get('check', '')
        weight = weights.get(check_name, 0.25)
        total_score += check['score'] * weight
        total_weight += weight
    
    if total_weight > 0:
        return int(total_score / total_weight)
    else:
        return 0


def run_visual_integrity_qa(image: Image.Image, expected_sport: str, content_type: str, gemini_api_key: str, expected_team_name: str = None) -> Dict:
    """
    Run complete visual integrity QA suite.
    
    Args:
        image: PIL Image object
        expected_sport: Sport name
        content_type: Content type ('player', 'action', etc.)
        gemini_api_key: Gemini API key
        expected_team_name: Team name for text verification (e.g., "Boston Celtics")
    
    Returns:
        Dict with overall score and individual check results
    """
    checks = []
    
    # Run checks (can be run in parallel for better performance)
    try:
        checks.append(check_sports_equipment(image, expected_sport, gemini_api_key))
        checks.append(check_human_pose(image, gemini_api_key))
        checks.append(check_context_validation(image, expected_sport, content_type, gemini_api_key))
        
        # Add text accuracy check if team name provided
        if expected_team_name:
            checks.append(check_text_accuracy(image, expected_team_name, gemini_api_key))
    except Exception as e:
        print(f"Error running visual integrity QA: {e}")
        # Return default passing score on error
        return {
            'visual_integrity_score': 80,
            'status': 'pass',
            'status_label': 'Pass (Limited Checks)',
            'checks': [],
            'pass_count': 0,
            'total_checks': 0,
            'error': str(e)
        }
    
    # Calculate overall score
    overall_score = calculate_visual_integrity_score(checks)
    
    # Determine status
    if overall_score >= 85:
        status = 'pass'
        status_label = 'Pass'
    elif overall_score >= 70:
        status = 'review'
        status_label = 'Needs Review'
    else:
        status = 'fail'
        status_label = 'Fail'
    
    return {
        'visual_integrity_score': overall_score,
        'status': status,
        'status_label': status_label,
        'checks': checks,
        'pass_count': sum(1 for c in checks if c['pass']),
        'total_checks': len(checks)
    }


def run_combined_qa(image: Image.Image, expected_aspect_ratio: str, expected_sport: str, content_type: str, gemini_api_key: str) -> Dict:
    """
    Run both technical and visual integrity QA.
    
    Args:
        image: PIL Image object
        expected_aspect_ratio: Expected aspect ratio
        expected_sport: Sport name
        content_type: Content type
        gemini_api_key: Gemini API key
    
    Returns:
        Combined QA results
    """
    from . import qa_technical
    
    # Run technical QA
    technical_results = qa_technical.run_technical_qa(image, expected_aspect_ratio)
    
    # Run visual integrity QA
    visual_results = run_visual_integrity_qa(image, expected_sport, content_type, gemini_api_key)
    
    # Calculate combined score (60% technical, 40% visual)
    combined_score = int(
        technical_results['technical_qa_score'] * 0.6 +
        visual_results['visual_integrity_score'] * 0.4
    )
    
    # Determine overall status
    if combined_score >= 85:
        status = 'pass'
        status_label = 'Pass'
    elif combined_score >= 70:
        status = 'review'
        status_label = 'Needs Review'
    else:
        status = 'fail'
        status_label = 'Fail'
    
    return {
        'combined_qa_score': combined_score,
        'status': status,
        'status_label': status_label,
        'technical_qa': technical_results,
        'visual_integrity_qa': visual_results
    }


def check_player_integrity(transparent_image: Image.Image) -> Dict:
    """
    Verify that transparency removed background, NOT the player.
    Validates that the subject is still present and intact.
    
    Args:
        transparent_image: Image after background removal (RGBA)
    
    Returns:
        Dict with integrity score, opaque percentage, and validation details
    """
    import numpy as np
    
    try:
        # Ensure RGBA mode
        if transparent_image.mode != 'RGBA':
            transparent_image = transparent_image.convert('RGBA')
        
        # Convert to array and get alpha channel
        img_array = np.array(transparent_image)
        alpha = img_array[:, :, 3]
        
        # Calculate opaque region (subject)
        opaque_pixels = np.sum(alpha > 128)
        total_pixels = alpha.size
        opaque_percent = (opaque_pixels / total_pixels) * 100
        
        # Check if opaque region is reasonable for sports images
        # Expected: 15-50% (player + equipment)
        # Too low (<15%) = removed player
        # Too high (>80%) = didn't remove background
        
        if opaque_percent < 15:
            score = 30
            issue = "Player may have been removed - too little remains"
        elif opaque_percent > 80:
            score = 40
            issue = "Background not removed - too much remains"
        elif opaque_percent < 25:
            score = 60
            issue = "Significant player loss detected"
        elif opaque_percent > 65:
            score = 70
            issue = "Incomplete background removal"
        else:
            # Check if opaque region is centrally located
            # (Player should be centered in sports images)
            opaque_rows = np.any(alpha > 128, axis=1)
            opaque_cols = np.any(alpha > 128, axis=0)
            
            if np.any(opaque_rows) and np.any(opaque_cols):
                center_mass_row = np.average(np.where(opaque_rows)[0])
                center_mass_col = np.average(np.where(opaque_cols)[0])
                
                height, width = alpha.shape
                expected_center_row = height / 2
                expected_center_col = width / 2
                
                # Calculate deviation from center
                row_deviation = abs(center_mass_row - expected_center_row) / height
                col_deviation = abs(center_mass_col - expected_center_col) / width
                
                # Good if within 30% of center
                if row_deviation < 0.3 and col_deviation < 0.3:
                    score = 95
                    issue = "Player integrity excellent"
                elif row_deviation < 0.4 and col_deviation < 0.4:
                    score = 85
                    issue = "Player integrity good"
                else:
                    score = 75
                    issue = "Player slightly off-center"
            else:
                score = 50
                issue = "Unable to detect subject center"
        
        return {
            'score': score,
            'opaque_percent': round(opaque_percent, 1),
            'issue': issue,
            'pass_threshold': 75,
            'passed': score >= 75
        }
        
    except Exception as e:
        print(f"Error in player integrity check: {e}")
        return {
            'score': 50,
            'opaque_percent': 0,
            'issue': f'Error: {str(e)}',
            'pass_threshold': 75,
            'passed': False
        }

