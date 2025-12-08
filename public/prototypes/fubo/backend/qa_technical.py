"""
Technical QA Module
Performs automated technical quality checks on generated images including:
- Aspect ratio verification
- Color saturation analysis
- Noise and artifact detection
- Resolution validation
"""

from PIL import Image, ImageStat
import numpy as np
from typing import Dict, Tuple


def calculate_aspect_ratio(width: int, height: int) -> Tuple[int, int]:
    """Calculate the simplified aspect ratio."""
    from math import gcd
    divisor = gcd(width, height)
    return (width // divisor, height // divisor)


def verify_aspect_ratio(image: Image.Image, expected_ratio: str) -> Dict:
    """
    Verify image aspect ratio matches expected ratio.
    
    Args:
        image: PIL Image object
        expected_ratio: Expected ratio as string (e.g., '16:9', '3:2')
    
    Returns:
        Dict with 'pass', 'score', 'actual_ratio', 'expected_ratio'
    """
    width, height = image.size
    actual_ratio = calculate_aspect_ratio(width, height)
    
    # Parse expected ratio
    expected_parts = expected_ratio.split(':')
    expected_w, expected_h = int(expected_parts[0]), int(expected_parts[1])
    
    # Calculate tolerance (allow small rounding differences)
    actual_decimal = actual_ratio[0] / actual_ratio[1]
    expected_decimal = expected_w / expected_h
    ratio_diff = abs(actual_decimal - expected_decimal)
    
    # Pass if within 1% tolerance
    passes = ratio_diff < 0.01
    
    # Score based on how close to expected ratio
    if ratio_diff == 0:
        score = 100
    elif ratio_diff < 0.005:
        score = 95
    elif ratio_diff < 0.01:
        score = 90
    elif ratio_diff < 0.02:
        score = 80
    else:
        score = max(0, 70 - int(ratio_diff * 100))
    
    return {
        'check': 'aspect_ratio',
        'pass': passes,
        'score': score,
        'actual_ratio': f"{actual_ratio[0]}:{actual_ratio[1]}",
        'expected_ratio': expected_ratio,
        'details': f"Image is {width}x{height} ({actual_ratio[0]}:{actual_ratio[1]}), expected {expected_ratio}"
    }


def check_color_saturation(image: Image.Image) -> Dict:
    """
    Check color saturation levels.
    
    Args:
        image: PIL Image object
    
    Returns:
        Dict with 'pass', 'score', 'saturation_level'
    """
    # Convert to HSV to analyze saturation
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    hsv_image = image.convert('HSV')
    stat = ImageStat.Stat(hsv_image)
    
    # Get saturation channel (index 1 in HSV)
    saturation_mean = stat.mean[1]
    saturation_stddev = stat.stddev[1]
    
    # Normalize saturation (0-255 range)
    saturation_percentage = (saturation_mean / 255) * 100
    
    # Score based on saturation level
    # Good saturation: 30-80%
    # Too low (washed out): <20%
    # Too high (oversaturated): >90%
    if 30 <= saturation_percentage <= 80:
        score = 100
        passes = True
        status = 'optimal'
    elif 20 <= saturation_percentage < 30 or 80 < saturation_percentage <= 90:
        score = 85
        passes = True
        status = 'acceptable'
    elif saturation_percentage < 20:
        score = 70
        passes = False
        status = 'too low (washed out)'
    else:  # > 90
        score = 75
        passes = False
        status = 'too high (oversaturated)'
    
    return {
        'check': 'color_saturation',
        'pass': passes,
        'score': score,
        'saturation_level': saturation_percentage,
        'status': status,
        'details': f"Saturation: {saturation_percentage:.1f}% ({status})"
    }


def detect_noise_artifacts(image: Image.Image) -> Dict:
    """
    Detect noise and compression artifacts.
    
    Args:
        image: PIL Image object
    
    Returns:
        Dict with 'pass', 'score', 'noise_level'
    """
    # Convert to grayscale for noise analysis
    if image.mode != 'L':
        gray = image.convert('L')
    else:
        gray = image
    
    # Calculate variance (higher variance = more noise)
    img_array = np.array(gray)
    
    # Use Laplacian variance as noise metric
    from scipy import ndimage
    laplacian = ndimage.laplace(img_array)
    variance = laplacian.var()
    
    # Normalize variance to 0-100 scale (empirical thresholds)
    # Low variance (<100): Smooth, possibly over-processed
    # Medium variance (100-500): Good detail
    # High variance (>1000): Noisy
    
    if variance < 100:
        score = 80
        passes = True
        status = 'very smooth (may be over-processed)'
    elif 100 <= variance < 500:
        score = 100
        passes = True
        status = 'optimal detail level'
    elif 500 <= variance < 1000:
        score = 90
        passes = True
        status = 'good detail'
    elif 1000 <= variance < 2000:
        score = 75
        passes = False
        status = 'slightly noisy'
    else:
        score = 60
        passes = False
        status = 'very noisy'
    
    return {
        'check': 'noise_artifacts',
        'pass': passes,
        'score': score,
        'noise_level': variance,
        'status': status,
        'details': f"Noise variance: {variance:.0f} ({status})"
    }


def check_resolution_quality(image: Image.Image) -> Dict:
    """
    Check if image resolution is adequate for intended use.
    
    Args:
        image: PIL Image object
    
    Returns:
        Dict with 'pass', 'score', 'resolution'
    """
    width, height = image.size
    total_pixels = width * height
    
    # Resolution thresholds
    # 4K: 3840x2160 = 8,294,400 pixels
    # 1080p: 1920x1080 = 2,073,600 pixels
    # 720p: 1280x720 = 921,600 pixels
    
    if total_pixels >= 8_000_000:
        score = 100
        status = '4K quality'
        passes = True
    elif total_pixels >= 2_000_000:
        score = 95
        status = '1080p quality'
        passes = True
    elif total_pixels >= 900_000:
        score = 80
        status = '720p quality'
        passes = True
    elif total_pixels >= 500_000:
        score = 70
        status = 'moderate resolution'
        passes = False
    else:
        score = 50
        status = 'low resolution'
        passes = False
    
    return {
        'check': 'resolution',
        'pass': passes,
        'score': score,
        'resolution': f"{width}x{height}",
        'total_pixels': total_pixels,
        'status': status,
        'details': f"Resolution: {width}x{height} ({status})"
    }


def calculate_technical_qa_score(checks: list) -> int:
    """
    Calculate overall Technical QA Score from individual checks.
    
    Args:
        checks: List of check result dicts
    
    Returns:
        Overall score (0-100)
    """
    if not checks:
        return 0
    
    # Weighted average
    weights = {
        'aspect_ratio': 0.35,  # Most important
        'color_saturation': 0.25,
        'noise_artifacts': 0.25,
        'resolution': 0.15
    }
    
    total_score = 0
    total_weight = 0
    
    for check in checks:
        check_name = check.get('check', '')
        weight = weights.get(check_name, 0.25)  # Default weight
        total_score += check['score'] * weight
        total_weight += weight
    
    if total_weight > 0:
        return int(total_score / total_weight)
    else:
        return 0


def run_technical_qa(image: Image.Image, expected_aspect_ratio: str = '16:9') -> Dict:
    """
    Run complete technical QA suite on an image.
    
    Args:
        image: PIL Image object
        expected_aspect_ratio: Expected aspect ratio (e.g., '16:9', '3:2')
    
    Returns:
        Dict with overall score and individual check results
    """
    checks = []
    
    # Run all checks
    checks.append(verify_aspect_ratio(image, expected_aspect_ratio))
    checks.append(check_color_saturation(image))
    checks.append(detect_noise_artifacts(image))
    checks.append(check_resolution_quality(image))
    
    # Calculate overall score
    overall_score = calculate_technical_qa_score(checks)
    
    # Determine pass/fail status
    # Pass: 85-100, Review: 70-84, Fail: <70
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
        'technical_qa_score': overall_score,
        'status': status,
        'status_label': status_label,
        'checks': checks,
        'pass_count': sum(1 for c in checks if c['pass']),
        'total_checks': len(checks)
    }

