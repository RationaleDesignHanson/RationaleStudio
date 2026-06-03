"""
Export/Import Manager Module
Handles organized export and import of generated thumbnails with:
- League/Team folder structure
- Consistent filename naming schema
- Metadata JSON sidecars
- Batch export functionality
"""

import os
import json
import re
from datetime import datetime
from typing import Dict, List, Optional
from PIL import Image
import io
import base64


class ExportManager:
    """Manages export and import of thumbnail images with organized folder structure."""
    
    def __init__(self, base_export_path: str = './Exports'):
        """
        Initialize export manager.
        
        Args:
            base_export_path: Base directory for exports (default: ./Exports)
        """
        self.base_export_path = base_export_path
        # Updated pattern to handle multi-word teams (e.g., Dallas_Cowboys)
        # Matches: league_team_content_style_YYYYMMDD_HHMMSS
        self.filename_pattern = re.compile(
            r'(?P<league>[^_]+)_(?P<team>.+?)_(?P<content>TeamNews|Highlights)_(?P<style>[^_]+)_(?P<date>\d{8})_(?P<time>\d{6})'
        )
    
    def create_export_path(self, league: str, team: str, create_dirs: bool = True) -> str:
        """
        Create export path following structure: /Exports/{league}/{team}/
        
        Args:
            league: League name (e.g., 'NFL', 'NBA')
            team: Team name (e.g., 'Dallas Cowboys')
            create_dirs: Whether to create directories if they don't exist
        
        Returns:
            Full export path
        """
        # Sanitize folder names (remove invalid characters)
        safe_league = self._sanitize_filename(league)
        safe_team = self._sanitize_filename(team)
        
        path = os.path.join(self.base_export_path, safe_league, safe_team)
        
        if create_dirs:
            os.makedirs(path, exist_ok=True)
        
        return path
    
    def generate_filename(
        self, 
        league: str,
        team: str,
        content_type: str,
        style: str,
        extension: str = 'jpg',
        custom_suffix: str = None
    ) -> str:
        """
        Generate filename following schema: {league}_{team}_{content}_{style}_{date}_{time}.jpg
        
        Args:
            league: League name
            team: Team name
            content_type: Content type ('TeamNews', 'Highlights', etc.)
            style: Style name
            extension: File extension (default: 'jpg')
            custom_suffix: Optional custom suffix
        
        Returns:
            Generated filename
        """
        # Sanitize components
        safe_league = self._sanitize_filename(league)
        safe_team = self._sanitize_filename(team)
        safe_content = self._sanitize_filename(content_type)
        safe_style = self._sanitize_filename(style)
        
        # Get current timestamp
        now = datetime.now()
        date_str = now.strftime('%Y%m%d')
        time_str = now.strftime('%H%M%S')
        
        # Build filename
        filename = f"{safe_league}_{safe_team}_{safe_content}_{safe_style}_{date_str}_{time_str}"
        
        if custom_suffix:
            filename += f"_{custom_suffix}"
        
        filename += f".{extension}"
        
        return filename
    
    def export_image(
        self,
        image_data: str,
        league: str,
        team: str,
        content_type: str,
        style: str,
        metadata: Optional[Dict] = None,
        export_metadata: bool = False,
        custom_suffix: str = None
    ) -> Dict:
        """
        Export a single image with optional metadata.
        
        Args:
            image_data: Base64 encoded image data
            league: League name
            team: Team name  
            content_type: Content type
            style: Style name
            metadata: Optional metadata dict
            export_metadata: Whether to export JSON sidecar
            custom_suffix: Optional custom filename suffix
        
        Returns:
            Dict with 'success', 'filepath', 'metadata_filepath' (if applicable)
        """
        try:
            # Create export path
            export_path = self.create_export_path(league, team, create_dirs=True)
            
            # Generate filename
            filename = self.generate_filename(
                league, team, content_type, style, 
                extension='jpg', custom_suffix=custom_suffix
            )
            
            filepath = os.path.join(export_path, filename)
            
            # Decode and save image
            image = self._base64_to_image(image_data)
            
            # Convert to RGB if needed (for JPEG)
            if image.mode == 'RGBA':
                background = Image.new('RGB', image.size, (255, 255, 255))
                background.paste(image, mask=image.split()[-1])
                image = background
            
            image.save(filepath, format='JPEG', quality=95)
            
            result = {
                'success': True,
                'filepath': filepath,
                'filename': filename
            }
            
            # Export metadata if requested
            if export_metadata and metadata:
                metadata_filename = filename.replace('.jpg', '.json')
                metadata_filepath = os.path.join(export_path, metadata_filename)
                
                with open(metadata_filepath, 'w') as f:
                    json.dump(metadata, f, indent=2)
                
                result['metadata_filepath'] = metadata_filepath
            
            return result
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def batch_export(
        self,
        images: List[Dict],
        export_metadata: bool = False
    ) -> Dict:
        """
        Export multiple images in batch.
        
        Args:
            images: List of dicts with {image_data, league, team, content_type, style, metadata}
            export_metadata: Whether to export JSON sidecars
        
        Returns:
            Dict with 'success', 'exported_count', 'failed_count', 'results'
        """
        results = []
        exported_count = 0
        failed_count = 0
        
        for img_data in images:
            result = self.export_image(
                image_data=img_data['image_data'],
                league=img_data['league'],
                team=img_data['team'],
                content_type=img_data['content_type'],
                style=img_data['style'],
                metadata=img_data.get('metadata'),
                export_metadata=export_metadata
            )
            
            if result['success']:
                exported_count += 1
            else:
                failed_count += 1
            
            results.append(result)
        
        return {
            'success': True,
            'exported_count': exported_count,
            'failed_count': failed_count,
            'results': results
        }
    
    def import_images_from_folder(
        self,
        folder_path: str,
        run_qa: bool = False
    ) -> Dict:
        """
        Import images from a folder, parsing metadata from filenames.
        
        Args:
            folder_path: Path to folder containing images
            run_qa: Whether to run QA on imported images
        
        Returns:
            Dict with 'success', 'imported_count', 'images'
        """
        imported_images = []
        
        try:
            for filename in os.listdir(folder_path):
                if not filename.lower().endswith(('.jpg', '.jpeg', '.png')):
                    continue
                
                filepath = os.path.join(folder_path, filename)
                
                # Parse filename
                metadata = self.parse_filename(filename)
                
                if metadata:
                    # Load image
                    with open(filepath, 'rb') as f:
                        image_data = base64.b64encode(f.read()).decode('utf-8')
                    
                    imported_images.append({
                        'filename': filename,
                        'filepath': filepath,
                        'image_data': f'data:image/jpeg;base64,{image_data}',
                        'metadata': metadata
                    })
            
            return {
                'success': True,
                'imported_count': len(imported_images),
                'images': imported_images
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def parse_filename(self, filename: str) -> Optional[Dict]:
        """
        Parse filename to extract metadata.
        
        Args:
            filename: Filename to parse
        
        Returns:
            Dict with parsed metadata or None if parsing fails
        """
        # Remove extension
        name_without_ext = os.path.splitext(filename)[0]
        
        # Try to match pattern
        match = self.filename_pattern.match(name_without_ext)
        
        if match:
            return match.groupdict()
        else:
            return None
    
    def create_batch_index(
        self,
        export_path: str,
        images: List[Dict]
    ) -> str:
        """
        Create a batch index JSON file listing all exported images.
        
        Args:
            export_path: Path where index should be created
            images: List of exported image metadata
        
        Returns:
            Path to created index file
        """
        index_data = {
            'export_date': datetime.now().isoformat(),
            'total_images': len(images),
            'images': images
        }
        
        index_filepath = os.path.join(export_path, 'batch_index.json')
        
        with open(index_filepath, 'w') as f:
            json.dump(index_data, f, indent=2)
        
        return index_filepath
    
    def _sanitize_filename(self, name: str) -> str:
        """
        Sanitize filename by removing invalid characters.
        
        Args:
            name: Original name
        
        Returns:
            Sanitized name
        """
        # Replace spaces with underscores
        name = name.replace(' ', '_')
        
        # Remove invalid characters
        invalid_chars = '<>:"/\\|?*'
        for char in invalid_chars:
            name = name.replace(char, '')
        
        return name
    
    def _base64_to_image(self, base64_string: str) -> Image.Image:
        """
        Convert base64 string to PIL Image.
        
        Args:
            base64_string: Base64 encoded image (may include data URI prefix)
        
        Returns:
            PIL Image object
        """
        # Remove data URI prefix if present
        if ',' in base64_string:
            base64_string = base64_string.split(',')[1]
        
        image_data = base64.b64decode(base64_string)
        return Image.open(io.BytesIO(image_data))

