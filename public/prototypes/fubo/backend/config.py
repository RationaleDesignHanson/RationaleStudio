"""
Configuration Module
Centralized configuration for the thumbnail generation system.
"""

import os
from typing import Dict

# API Configuration
DEFAULT_MODEL = 'gemini-2.5-flash-image-preview'
FALLBACK_MODELS = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-pro']

# Aspect Ratios
ASPECT_RATIOS = {
    'wide': {
        'ratio': '16:9',
        'default_width': 1920,
        'default_height': 1080,
        'description': 'Wide (Landscape)'
    },
    'tall': {
        'ratio': '2:3',
        'default_width': 1280,
        'default_height': 1920,
        'description': 'Tall (Portrait)'
    }
}

# QA Thresholds
QA_THRESHOLDS = {
    'pass': 85,      # Green badge
    'review': 70,    # Yellow badge
    'fail': 0        # Red badge (< review threshold)
}

# QA Weights
QA_WEIGHTS = {
    'technical': {
        'aspect_ratio': 0.35,
        'color_saturation': 0.25,
        'noise_artifacts': 0.25,
        'resolution': 0.15
    },
    'visual': {
        'sports_equipment': 0.35,
        'human_pose': 0.40,
        'context_validation': 0.25
    },
    'combined': {
        'technical': 0.60,
        'visual': 0.40
    }
}

# Color Saturation Thresholds
SATURATION_THRESHOLDS = {
    'optimal_min': 30,
    'optimal_max': 80,
    'acceptable_min': 20,
    'acceptable_max': 90
}

# Resolution Quality Thresholds (pixels)
RESOLUTION_THRESHOLDS = {
    '4k': 8_000_000,
    '1080p': 2_000_000,
    '720p': 900_000,
    'moderate': 500_000
}

# Noise Detection Thresholds
NOISE_THRESHOLDS = {
    'smooth_max': 100,
    'optimal_min': 100,
    'optimal_max': 500,
    'good_max': 1000,
    'noisy_max': 2000
}

# Export Configuration
EXPORT_CONFIG = {
    'base_path': './Exports',
    'filename_pattern': '{league}_{team}_{content}_{style}_{date}_{time}.{ext}',
    'default_format': 'jpg',
    'jpeg_quality': 95,
    'create_metadata': False
}

# Image Processing
IMAGE_PROCESSING = {
    'max_input_size': 1024,  # Max size for input images before processing
    'supported_formats': ['PNG', 'JPG', 'JPEG'],
    'output_formats': {
        'with_alpha': 'PNG',
        'without_alpha': 'JPEG'
    }
}

# Generation Settings
GENERATION_CONFIG = {
    'temperature': 0.7,
    'top_p': 0.8,
    'top_k': 40,
    'max_output_tokens': 8192
}

# Safety Settings
SAFETY_SETTINGS = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

# PRD Core Styles (in order of usage)
PRD_CORE_STYLES = [
    'photo-real',
    'bold-posterized',
    'studio-lighting',
    'cinematic-grain',
    'halftone-retro'
]

# Legacy Styles (maintained for compatibility)
LEGACY_STYLES = [
    'video-game',
    'gradient',
    'comic-book',
    'ink-splatter',
    'layered-papercraft',
    'risograph'
]

# File Paths
def get_base_dir():
    """Get the base directory of the application."""
    return os.path.dirname(os.path.abspath(__file__))

def get_overlay_path(aspect_ratio: str) -> str:
    """Get overlay directory path for specific aspect ratio."""
    base_dir = get_base_dir()
    ratio_map = {
        '16:9': '16x9',
        '3:2': '3x2'
    }
    folder = ratio_map.get(aspect_ratio, '16x9')
    return os.path.join(base_dir, '..', 'overlays', folder)

def get_export_path(league: str = None, team: str = None) -> str:
    """Get export path with optional league/team."""
    base_dir = get_base_dir()
    path = os.path.join(base_dir, '..', EXPORT_CONFIG['base_path'])
    
    if league:
        path = os.path.join(path, league)
    if team:
        path = os.path.join(path, team)
    
    return path

# Logging Configuration
LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'default': {
            'level': 'INFO',
            'formatter': 'standard',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        '': {
            'handlers': ['default'],
            'level': 'INFO',
            'propagate': True
        }
    }
}

