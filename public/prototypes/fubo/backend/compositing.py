"""
PNG Overlay Compositing Module
Handles layering PNG overlays over AI-generated images with support for both modes:
1. Generated Image UNDER PNG overlay (default)
2. Generated Image ON TOP of PNG overlay (alpha channel mode)
"""

from PIL import Image, ImageChops
import io
import base64


def composite_overlay(generated_image, overlay_image, mode='under', shift_x=None, shift_y=None, crop_to_overlay_size=True):
    """
    Composite generated image with PNG overlay.
    
    Args:
        generated_image: PIL Image object (the AI-generated image)
        overlay_image: PIL Image object (the PNG overlay with transparency)
        mode: 'under' (generated under overlay) or 'over' (generated over overlay)
        shift_x: Optional custom horizontal shift in pixels (overrides default)
        shift_y: Optional custom vertical shift in pixels (overrides default 0)
        crop_to_overlay_size: If True, crop result to overlay dimensions (for images with padding)
    
    Returns:
        PIL Image object (composited result)
    """
    # Ensure both images are in RGBA mode for transparency support
    if generated_image.mode != 'RGBA':
        generated_image = generated_image.convert('RGBA')
    
    if overlay_image.mode != 'RGBA':
        overlay_image = overlay_image.convert('RGBA')
    
    # Store original overlay size - NEVER resize the overlay
    overlay_width, overlay_height = overlay_image.size
    gen_width, gen_height = generated_image.size
    
    # Check if we need to crop after compositing (generated image has padding)
    needs_crop = gen_width > overlay_width or gen_height > overlay_height
    
    if mode == 'under':
        # Generated image UNDER overlay (overlay on top)
        # Determine shift based on overlay dimensions (Wide vs Tall)
        if shift_x is None:
            if overlay_width > overlay_height:  # Wide format
                shift_x = 250  # Shift Wide images to the right
            else:  # Tall format
                shift_x = 0   # No shift for Tall images
        
        # Default vertical shift is 0 (centered)
        if shift_y is None:
            shift_y = 0
        
        # Create result canvas at OVERLAY size (final dimensions)
        result = Image.new('RGBA', (overlay_width, overlay_height))
        
        # Calculate where to paste the generated image (centered + shift)
        paste_x = (overlay_width - gen_width) // 2 + shift_x
        paste_y = (overlay_height - gen_height) // 2 + shift_y
        
        # Paste generated image at calculated position
        result.paste(generated_image, (paste_x, paste_y))
        
        # Paste overlay on top at (0,0) - IMMOVABLE
        result.paste(overlay_image, (0, 0), overlay_image)  # Use overlay's alpha channel as mask
        
        # No need to crop - result is already at overlay size
        if crop_to_overlay_size and result.size != overlay_image.size:
            # Center crop to overlay dimensions
            final_width, final_height = overlay_image.size
            gen_width, gen_height = result.size
            
            # Calculate crop box to get the visible area
            left = (gen_width - final_width) // 2
            top = 0
            right = left + final_width
            bottom = final_height
            
            result = result.crop((left, top, right, bottom))
        
        return result
    
    elif mode == 'over':
        # Generated image ON TOP of overlay (generated over overlay)
        # Create result canvas at OVERLAY size (final dimensions)
        result = Image.new('RGBA', (overlay_width, overlay_height))
        
        # Paste overlay at (0,0) - IMMOVABLE
        result.paste(overlay_image, (0, 0))
        
        # Ensure generated image is in RGBA mode for proper alpha handling
        if generated_image.mode != 'RGBA':
            generated_image = generated_image.convert('RGBA')
        
        # Determine shift based on overlay dimensions (Wide vs Tall)
        if shift_x is None:
            if overlay_width > overlay_height:  # Wide format
                shift_x = 250  # Shift Wide images to the right
            else:  # Tall format
                shift_x = 0   # No shift for Tall images
        
        # Default vertical shift is 0 (centered)
        if shift_y is None:
            shift_y = 0
        
        # Calculate where to paste the generated image (centered + shift)
        paste_x = (overlay_width - gen_width) // 2 + shift_x
        paste_y = (overlay_height - gen_height) // 2 + shift_y
        
        # Use the alpha channel of the generated image as the mask
        alpha_channel = generated_image.split()[-1]  # Get the alpha channel
        result.paste(generated_image, (paste_x, paste_y), alpha_channel)
        
        print(f"DEBUG 'over' mode:")
        print(f"  Generated image mode: {generated_image.mode}")
        print(f"  Generated image size: {generated_image.size}")
        print(f"  Overlay image size: {overlay_image.size}")
        print(f"  Result image size: {result.size}")
        print(f"  Shift applied: {shift_x}px (Wide={overlay_image.size[0] > overlay_image.size[1]})")
        print(f"  Alpha channel mode: {alpha_channel.mode}")
        print(f"  Alpha channel size: {alpha_channel.size}")
        
        # Check alpha channel transparency
        alpha_pixels = list(alpha_channel.getdata())
        transparent_count = sum(1 for p in alpha_pixels if p < 128)
        total_pixels = len(alpha_pixels)
        transparency_percent = (transparent_count / total_pixels) * 100
        print(f"  Alpha transparency: {transparency_percent:.1f}% ({transparent_count}/{total_pixels} pixels)")
        print(f"  Result already at overlay size: {result.size}")
        
        return result
    
    else:
        raise ValueError(f"Invalid mode: {mode}. Must be 'under' or 'over'")


def create_alpha_channel_output(image, remove_background=False):
    """
    Create an output image with alpha channel (transparency).
    
    Args:
        image: PIL Image object
        remove_background: If True, attempt to remove background (future enhancement)
    
    Returns:
        PIL Image object in RGBA mode
    """
    # Convert to RGBA if not already
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Future: Implement background removal here using AI or library
    # For now, just return the image with preserved alpha channel
    
    return image


def image_to_base64(image, format='PNG'):
    """
    Convert PIL Image to base64 string for frontend display.
    
    Args:
        image: PIL Image object
        format: Image format ('PNG', 'JPEG', etc.)
    
    Returns:
        Base64 encoded string
    """
    buffer = io.BytesIO()
    
    # For PNG, preserve alpha channel
    if format.upper() == 'PNG':
        if image.mode != 'RGBA':
            image = image.convert('RGBA')
        image.save(buffer, format='PNG')
    else:
        # For JPEG, convert to RGB
        if image.mode == 'RGBA':
            # Create white background
            background = Image.new('RGB', image.size, (255, 255, 255))
            background.paste(image, mask=image.split()[-1])
            background.save(buffer, format='JPEG', quality=95)
        else:
            image.save(buffer, format='JPEG', quality=95)
    
    return base64.b64encode(buffer.getvalue()).decode('utf-8')


def base64_to_image(base64_string):
    """
    Convert base64 string to PIL Image.
    
    Args:
        base64_string: Base64 encoded image string (may include data URI prefix)
    
    Returns:
        PIL Image object
    """
    # Remove data URI prefix if present
    if ',' in base64_string:
        base64_string = base64_string.split(',')[1]
    
    image_data = base64.b64decode(base64_string)
    return Image.open(io.BytesIO(image_data))


def load_overlay_png(overlay_path, width=None, height=None):
    """
    Load PNG overlay from file path and optionally resize.
    
    Args:
        overlay_path: Path to PNG overlay file
        width: Optional target width
        height: Optional target height
    
    Returns:
        PIL Image object in RGBA mode
    """
    overlay = Image.open(overlay_path)
    
    # Convert to RGBA to ensure transparency support
    if overlay.mode != 'RGBA':
        overlay = overlay.convert('RGBA')
    
    # Resize if dimensions specified
    if width and height:
        overlay = overlay.resize((width, height), Image.Resampling.LANCZOS)
    
    return overlay


def get_aspect_ratio_overlay(aspect_ratio='16:9'):
    """
    Get the appropriate overlay for a given aspect ratio.
    
    Args:
        aspect_ratio: String like '16:9' or '3:2'
    
    Returns:
        Path to overlay file or None if not found
    """
    import os
    
    # Map aspect ratios to overlay directories
    overlay_map = {
        '16:9': 'overlays/16x9/default.png',
        '3:2': 'overlays/3x2/default.png',
    }
    
    overlay_path = overlay_map.get(aspect_ratio)
    
    if overlay_path and os.path.exists(overlay_path):
        return overlay_path
    
    return None


def validate_overlay_dimensions(overlay, expected_width, expected_height):
    """
    Validate that overlay dimensions match expected dimensions.
    
    Args:
        overlay: PIL Image object
        expected_width: Expected width in pixels
        expected_height: Expected height in pixels
    
    Returns:
        Boolean indicating if dimensions match
    """
    actual_width, actual_height = overlay.size
    return actual_width == expected_width and actual_height == expected_height

