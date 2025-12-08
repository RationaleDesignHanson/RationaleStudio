"""
Alpha Channel Extraction Module
Extracts players/subjects with transparent backgrounds for compositing.
Uses AI-powered background removal.
"""

from PIL import Image
import io
import base64
import google.generativeai as genai
from typing import Optional


def extract_player_with_alpha(image: Image.Image, gemini_api_key: str, preserve_elements: list = None) -> Image.Image:
    """
    Extract player/subject with transparent background using professional AI.
    Uses rembg (U2-Net) for high-quality background removal with fallback systems.
    
    Args:
        image: PIL Image object (source image)
        gemini_api_key: Gemini API key for AI processing (legacy fallback)
        preserve_elements: List of elements to preserve (e.g., ['player', 'ball', 'equipment'])
    
    Returns:
        PIL Image object in RGBA mode with transparent background
    """
    try:
        print(f"🔍 ALPHA EXTRACTION: Starting professional background removal")
        print(f"   Input image: {image.size} ({image.mode})")
        
        # Try rembg with multiple models for best results
        try:
            from rembg import remove, new_session
            print(f"   Trying multiple rembg models for best quality...")
            
            models_to_try = [
                ('u2net_human_seg', 'Human Segmentation (optimized for people)'),
                ('isnet-general-use', 'ISNet (newer, higher quality)'),
                ('u2net', 'U2-Net (general purpose)')
            ]
            
            best_result = None
            best_transparency = 0
            best_model = None
            
            for model_name, model_desc in models_to_try:
                try:
                    print(f"   Trying {model_name}: {model_desc}...")
                    session = new_session(model_name)
                    result = remove(image, session=session)
                    
                    # Validate transparency quality
                    if result.mode == 'RGBA':
                        alpha_channel = result.split()[-1]
                        alpha_pixels = list(alpha_channel.getdata())
                        transparent_count = sum(1 for p in alpha_pixels if p < 128)
                        total_pixels = len(alpha_pixels)
                        transparency_percent = (transparent_count / total_pixels) * 100
                        print(f"      → Transparency: {transparency_percent:.1f}%")
                        
                        if transparency_percent > best_transparency:
                            best_result = result
                            best_transparency = transparency_percent
                            best_model = model_name
                    
                except Exception as model_error:
                    print(f"      → {model_name} failed: {model_error}")
                    continue
            
            if best_result and best_transparency > 30:
                print(f"   ✅ Best model: {best_model} ({best_transparency:.1f}% transparency)")
                print(f"   Applying post-processing enhancements...")
                # Apply all post-processing improvements
                enhanced_result = apply_post_processing(best_result)
                return enhanced_result
            else:
                print(f"   ⚠️ All rembg models failed or low quality, using two-pass fallback")
                return two_pass_removal(image)
                
        except ImportError:
            print(f"   rembg not available, using two-pass fallback")
            return two_pass_removal(image)
        except Exception as rembg_error:
            print(f"   rembg error: {rembg_error}, using two-pass fallback")
            return two_pass_removal(image)
        
        # Legacy Gemini background removal (kept for reference, not used)
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
        
        # Build prompt for background removal
        elements = preserve_elements or ['player', 'sports equipment']
        elements_str = ', '.join(elements)
        
        prompt = f"""
Remove the background from this sports image, keeping only {elements_str}.

Instructions:
1. Identify the main subject (player, athlete)
2. Include essential sports equipment (ball, bat, stick, etc.) if held by or near player
3. Remove ALL background elements (stadium, crowd, field, etc.)
4. Output the subject on a transparent background
5. Preserve fine details (hair, uniform edges, equipment)
6. Maintain sharp edges and avoid halos

Generate an image with ONLY the subject on a completely transparent background.
"""
        
        print(f"   Calling Gemini AI for background removal...")
        
        # Generate with alpha channel request
        response = model.generate_content([prompt, image])
        
        if response and hasattr(response, 'candidates') and response.candidates:
            for candidate in response.candidates:
                if hasattr(candidate, 'content') and candidate.content.parts:
                    for part in candidate.content.parts:
                        if hasattr(part, 'inline_data') and part.inline_data:
                            # Get generated image
                            image_data = part.inline_data.data
                            result_image = Image.open(io.BytesIO(image_data))
                            
                            print(f"   AI returned image: {result_image.size} ({result_image.mode})")
                            
                            # Ensure RGBA mode
                            if result_image.mode != 'RGBA':
                                result_image = result_image.convert('RGBA')
                                print(f"   Converted to RGBA")
                            
                            # Check transparency
                            if result_image.mode == 'RGBA':
                                alpha_channel = result_image.split()[-1]
                                alpha_pixels = list(alpha_channel.getdata())
                                transparent_count = sum(1 for p in alpha_pixels if p < 128)
                                total_pixels = len(alpha_pixels)
                                transparency_percent = (transparent_count / total_pixels) * 100
                                print(f"   AI result transparency: {transparency_percent:.1f}%")
                                
                                if transparency_percent < 5:
                                    print(f"   ⚠️ AI failed to create transparency, auto-detecting background color")
                                    # Auto-detect: use cyan if present, otherwise white
                                    result = auto_detect_and_remove_background(result_image)
                                    return result
                            
                            return result_image
        
        # If AI extraction fails, auto-detect background
        print("AI alpha extraction failed (no response), auto-detecting background on original image")
        return auto_detect_and_remove_background(image)
        
    except Exception as e:
        print(f"Error in AI alpha extraction: {e}")
        print("Auto-detecting background due to exception")
        # Fallback to auto-detection
        return auto_detect_and_remove_background(image)


def create_simple_alpha(image: Image.Image, threshold: int = 240) -> Image.Image:
    """
    Simple alpha channel creation by converting near-white pixels to transparent.
    Fallback method when AI extraction is not available.
    
    Args:
        image: PIL Image object
        threshold: RGB threshold for transparency (default: 240)
    
    Returns:
        PIL Image in RGBA mode
    """
    # Convert to RGBA
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Get pixel data
    pixels = image.load()
    width, height = image.size
    
    # Make near-white pixels transparent
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # If pixel is close to white, make it transparent
            if r > threshold and g > threshold and b > threshold:
                pixels[x, y] = (r, g, b, 0)  # Set alpha to 0 (transparent)
    
    return image


def auto_detect_and_remove_background(image: Image.Image) -> Image.Image:
    """
    Auto-detect background color and remove it intelligently.
    Checks for cyan first, falls back to white if not found.
    
    Args:
        image: PIL Image object
    
    Returns:
        PIL Image in RGBA mode with background removed
    """
    # Convert to RGBA
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    pixels = image.load()
    width, height = image.size
    
    # Sample corner pixels to detect background
    corner_samples = [
        pixels[0, 0], pixels[width-1, 0],
        pixels[0, height-1], pixels[width-1, height-1]
    ]
    
    # Calculate average corner color
    avg_r = sum(p[0] for p in corner_samples) // len(corner_samples)
    avg_g = sum(p[1] for p in corner_samples) // len(corner_samples)
    avg_b = sum(p[2] for p in corner_samples) // len(corner_samples)
    
    print(f"   Background color detected: ({avg_r},{avg_g},{avg_b})")
    
    # Check if it's close to cyan (0,255,255)
    cyan_distance = abs(avg_r - 0) + abs(avg_g - 255) + abs(avg_b - 255)
    # Check if it's close to white (255,255,255)
    white_distance = abs(avg_r - 255) + abs(avg_g - 255) + abs(avg_b - 255)
    
    if cyan_distance < 100:
        # Cyan background detected
        print(f"   → Using CYAN chroma key (distance: {cyan_distance})")
        return chroma_key_removal(image, key_color=(0, 255, 255), tolerance=60)
    elif white_distance < 100:
        # White background detected
        print(f"   → Using WHITE chroma key (distance: {white_distance})")
        # For white, DON'T key out pure white (255,255,255) to preserve jersey details
        # Instead, key out near-white background colors
        return chroma_key_removal(image, key_color=(245, 245, 245), tolerance=35)
    else:
        # Unknown background color - use smart edge removal
        print(f"   → Unknown background, using edge-based removal")
        return smart_background_removal(image)


def smart_background_removal(image: Image.Image) -> Image.Image:
    """
    Smart background removal that only removes edge/corner pixels.
    Preserves white elements in the subject (jerseys, numbers, etc.)
    
    Args:
        image: PIL Image object
    
    Returns:
        PIL Image in RGBA mode with background transparent
    """
    from PIL import ImageFilter
    
    # Convert to RGBA
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    result = image.copy()
    pixels = result.load()
    width, height = result.size
    
    # Sample corner colors to determine background color
    corner_samples = [
        pixels[0, 0], pixels[width-1, 0],  # Top corners
        pixels[0, height-1], pixels[width-1, height-1],  # Bottom corners
        pixels[width//2, 0], pixels[width//2, height-1],  # Mid top/bottom
        pixels[0, height//2], pixels[width-1, height//2]  # Mid left/right
    ]
    
    # Average corner colors to get background color
    avg_r = sum(p[0] for p in corner_samples) // len(corner_samples)
    avg_g = sum(p[1] for p in corner_samples) // len(corner_samples)
    avg_b = sum(p[2] for p in corner_samples) // len(corner_samples)
    bg_color = (avg_r, avg_g, avg_b)
    
    print(f"   Detected background color: ({avg_r},{avg_g},{avg_b})")
    
    transparent_count = 0
    tolerance = 60
    
    # Only remove pixels from edges inward (flood fill approach)
    # This preserves white/light colors in the center (jersey elements)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Calculate distance from detected background color
            r_dist = abs(r - avg_r)
            g_dist = abs(g - avg_g)
            b_dist = abs(b - avg_b)
            
            # Check if on edge or corner (within 20% of image dimensions)
            on_edge = (x < width * 0.2 or x > width * 0.8 or 
                      y < height * 0.2 or y > height * 0.8)
            
            # If on edge and close to background color, make transparent
            if on_edge and r_dist < tolerance and g_dist < tolerance and b_dist < tolerance:
                pixels[x, y] = (r, g, b, 0)
                transparent_count += 1
            else:
                # Keep pixel opaque
                pixels[x, y] = (r, g, b, 255)
    
    total_pixels = width * height
    transparency_percent = (transparent_count / total_pixels) * 100
    print(f"   Smart background removal: {transparency_percent:.1f}% transparent")
    
    return result


def chroma_key_removal(image: Image.Image, key_color=(0, 255, 255), tolerance=80) -> Image.Image:
    """
    Remove background using chroma key (like green screen).
    
    Args:
        image: PIL Image object
        key_color: RGB tuple of the color to key out (default: cyan #00FFFF)
        tolerance: How close a pixel needs to be to the key color to be removed (per channel)
    
    Returns:
        PIL Image in RGBA mode with keyed background transparent
    """
    # Convert to RGBA
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Create a copy to work with
    result = image.copy()
    pixels = result.load()
    width, height = result.size
    
    key_r, key_g, key_b = key_color
    
    transparent_count = 0
    color_histogram = {}
    
    # Key out pixels close to the key color
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Sample some pixels to see what colors we have
            if y % 100 == 0 and x % 100 == 0:
                color_key = f"({r},{g},{b})"
                color_histogram[color_key] = color_histogram.get(color_key, 0) + 1
            
            # Calculate distance from key color (per channel)
            r_distance = abs(r - key_r)
            g_distance = abs(g - key_g)
            b_distance = abs(b - key_b)
            
            # If pixel is close to key color, make it transparent
            if r_distance < tolerance and g_distance < tolerance and b_distance < tolerance:
                pixels[x, y] = (r, g, b, 0)
                transparent_count += 1
            else:
                # Keep pixel opaque
                pixels[x, y] = (r, g, b, 255)
    
    total_pixels = width * height
    transparency_percent = (transparent_count / total_pixels) * 100
    
    # Show color samples
    top_colors = sorted(color_histogram.items(), key=lambda x: x[1], reverse=True)[:5]
    print(f"   Chroma key removed {transparency_percent:.1f}% of pixels (tolerance={tolerance})")
    print(f"   Top colors in image: {top_colors}")
    print(f"   Looking for key color: ({key_r},{key_g},{key_b})")
    
    return result


def apply_post_processing(image: Image.Image) -> Image.Image:
    """
    Apply comprehensive post-processing to improve transparency quality.
    Includes edge refinement, feathering, and alpha matting.
    
    Args:
        image: PIL Image in RGBA mode
    
    Returns:
        PIL Image with enhanced transparency
    """
    from PIL import ImageFilter
    import numpy as np
    from scipy import ndimage
    
    print(f"   Post-processing: Starting enhancements...")
    
    # Ensure RGBA
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Get alpha channel
    alpha = image.split()[-1]
    alpha_array = np.array(alpha)
    
    # MINIMAL processing - only soften edges, DON'T remove anything!
    print(f"      Softening edges only (preserving all subject pixels)...")
    
    # Simply apply gentle gaussian blur to soften/feather edges
    # NO hole filling, NO morphology, NO thresholding - just edge softening
    feathered = ndimage.gaussian_filter(alpha_array.astype(float) / 255.0, sigma=2.0)
    
    # Convert back to final alpha
    final_alpha = feathered
    
    # Convert back to 0-255 range
    final_alpha_255 = (final_alpha * 255).astype(np.uint8)
    
    # Create result with enhanced alpha
    result = image.copy()
    result.putalpha(Image.fromarray(final_alpha_255))
    
    # Count final transparency
    transparent_count = np.sum(final_alpha_255 < 128)
    total_pixels = final_alpha_255.size
    transparency_percent = (transparent_count / total_pixels) * 100
    print(f"   Post-processing complete: {transparency_percent:.1f}% transparent (enhanced)")
    
    return result


def two_pass_removal(image: Image.Image) -> Image.Image:
    """
    Two-pass background removal system for high-quality results.
    Pass 1: Rough chroma key to remove obvious background
    Pass 2: Edge refinement to clean up artifacts and preserve details
    
    Args:
        image: PIL Image object
    
    Returns:
        PIL Image in RGBA mode with refined transparency
    """
    print(f"   Starting two-pass removal system...")
    
    # Pass 1: Rough chroma key removal
    print(f"   Pass 1: Rough background removal...")
    rough_result = auto_detect_and_remove_background(image)
    
    # Pass 2: Edge refinement
    print(f"   Pass 2: Edge refinement and cleanup...")
    refined_result = edge_refinement(rough_result)
    
    return refined_result


def edge_refinement(image: Image.Image) -> Image.Image:
    """
    Refine transparency edges using morphological operations.
    Cleans up artifacts while preserving jersey details.
    
    Args:
        image: PIL Image object in RGBA mode
    
    Returns:
        PIL Image with refined edges
    """
    from PIL import ImageFilter
    import numpy as np
    
    # Ensure RGBA
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Get alpha channel
    alpha = image.split()[-1]
    
    # Convert alpha to numpy array for morphological operations
    alpha_array = np.array(alpha)
    
    # Remove noise: small transparent regions inside subject
    # Morphological closing: dilate then erode
    from scipy import ndimage
    
    # Dilate to fill small holes
    dilated = ndimage.binary_dilation(alpha_array > 128, iterations=2)
    # Erode to restore original size
    cleaned = ndimage.binary_erosion(dilated, iterations=2)
    
    # Smooth edges slightly
    cleaned = ndimage.gaussian_filter(cleaned.astype(float), sigma=0.5)
    
    # Convert back to 0-255 range
    cleaned_alpha = (cleaned * 255).astype(np.uint8)
    
    # Create result with refined alpha
    result = image.copy()
    result.putalpha(Image.fromarray(cleaned_alpha))
    
    # Count transparency for logging
    transparent_count = np.sum(cleaned_alpha < 128)
    total_pixels = cleaned_alpha.size
    transparency_percent = (transparent_count / total_pixels) * 100
    print(f"   Edge refinement: {transparency_percent:.1f}% transparent (cleaned)")
    
    return result


def create_advanced_alpha(image: Image.Image) -> Image.Image:
    """
    Advanced alpha channel creation using edge detection and color analysis.
    Better fallback for complex backgrounds.
    
    Args:
        image: PIL Image object
    
    Returns:
        PIL Image in RGBA mode with alpha channel
    """
    try:
        from PIL import ImageFilter
        
        # Convert to RGBA
        if image.mode != 'RGBA':
            image = image.convert('RGBA')
        
        # Create a copy to work with
        result = image.copy()
        pixels = result.load()
        width, height = result.size
        
        # Use edge detection to find subject boundaries
        gray = image.convert('L')
        edges = gray.filter(ImageFilter.FIND_EDGES)
        
        # Create alpha channel based on edges and color analysis
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                edge_value = edges.getpixel((x, y))
                
                # If it's an edge pixel, keep it opaque
                if edge_value > 50:
                    pixels[x, y] = (r, g, b, 255)
                else:
                    # For non-edge pixels, check if they're likely background
                    # Background pixels are usually less saturated and lighter
                    saturation = max(r, g, b) - min(r, g, b)
                    brightness = (r + g + b) / 3
                    
                    # If pixel is low saturation and high brightness, make it transparent
                    if saturation < 50 and brightness > 200:
                        pixels[x, y] = (r, g, b, 0)
                    else:
                        pixels[x, y] = (r, g, b, 255)
        
        return result
    except Exception as e:
        print(f"Advanced alpha creation failed: {e}")
        # Fallback to simple method
        return create_simple_alpha(image)


def remove_background_gemini(image: Image.Image, gemini_api_key: str, content_type: str = 'player') -> Image.Image:
    """
    Remove background using Gemini's AI capabilities.
    
    Args:
        image: Source image
        gemini_api_key: API key
        content_type: Type of content ('player', 'action', 'closeup')
    
    Returns:
        Image with transparent background
    """
    try:
        genai.configure(api_key=gemini_api_key)
        model = genai.GenerativeModel('gemini-2.5-flash-image-preview')
        
        # Content-specific prompts
        prompts = {
            'player': "Extract the player with transparent background. Keep player and any held equipment. Remove stadium, crowd, and field.",
            'action': "Extract the action scene with transparent background. Keep player(s) and sports equipment. Remove background environment.",
            'closeup': "Extract the equipment/subject with transparent background. Keep only the main subject, remove all background."
        }
        
        prompt = prompts.get(content_type, prompts['player'])
        prompt += "\n\nOutput: Subject isolated on completely transparent (alpha channel) background. Preserve fine details and edges."
        
        response = model.generate_content([prompt, image])
        
        if response and hasattr(response, 'candidates') and response.candidates:
            for candidate in response.candidates:
                if hasattr(candidate, 'content') and candidate.content.parts:
                    for part in candidate.content.parts:
                        if hasattr(part, 'inline_data') and part.inline_data:
                            image_data = part.inline_data.data
                            result = Image.open(io.BytesIO(image_data))
                            
                            if result.mode != 'RGBA':
                                result = result.convert('RGBA')
                            
                            return result
        
        # Fallback
        return create_simple_alpha(image)
        
    except Exception as e:
        print(f"Background removal error: {e}")
        return create_simple_alpha(image)


def image_to_png_base64(image: Image.Image) -> str:
    """
    Convert PIL Image to PNG base64 (preserving alpha channel).
    
    Args:
        image: PIL Image in RGBA mode
    
    Returns:
        Base64 encoded PNG string
    """
    buffer = io.BytesIO()
    
    # Ensure RGBA for transparency
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Save as PNG to preserve alpha
    image.save(buffer, format='PNG')
    
    return base64.b64encode(buffer.getvalue()).decode('utf-8')


def validate_alpha_channel(image: Image.Image) -> dict:
    """
    Validate that image has meaningful alpha channel.
    
    Args:
        image: PIL Image object
    
    Returns:
        Dict with validation results
    """
    if image.mode != 'RGBA':
        return {
            'has_alpha': False,
            'transparent_pixels': 0,
            'transparent_percentage': 0,
            'valid': False
        }
    
    # Count transparent pixels
    pixels = list(image.getdata())
    total_pixels = len(pixels)
    transparent_count = sum(1 for p in pixels if p[3] < 128)  # Alpha < 128 = mostly transparent
    
    transparent_percentage = (transparent_count / total_pixels) * 100
    
    # Valid if >5% of pixels are transparent (background was removed)
    valid = transparent_percentage > 5
    
    return {
        'has_alpha': True,
        'transparent_pixels': transparent_count,
        'total_pixels': total_pixels,
        'transparent_percentage': transparent_percentage,
        'valid': valid
    }


def create_preview_with_checkerboard(image: Image.Image, checker_size: int = 20) -> Image.Image:
    """
    Create preview of alpha image with checkerboard background (for visualization).
    
    Args:
        image: PIL Image in RGBA mode
        checker_size: Size of checkerboard squares
    
    Returns:
        PIL Image with checkerboard background
    """
    width, height = image.size
    
    # Create checkerboard background
    checkerboard = Image.new('RGB', (width, height), (255, 255, 255))
    pixels = checkerboard.load()
    
    for y in range(height):
        for x in range(width):
            # Checkerboard pattern (gray and white)
            if ((x // checker_size) + (y // checker_size)) % 2:
                pixels[x, y] = (200, 200, 200)
            else:
                pixels[x, y] = (255, 255, 255)
    
    # Convert checkerboard to RGBA
    checkerboard = checkerboard.convert('RGBA')
    
    # Composite alpha image over checkerboard
    result = Image.alpha_composite(checkerboard, image)
    
    return result

