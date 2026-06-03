# FUBO AI Thumbnail Generator v6.0

## Quick Start (Web Version)

This is a standalone web application that runs in your browser with a Python Flask backend.

### Prerequisites
- Python 3.8+ (check with `python3 --version`)
- Google Gemini API key (free tier available)

### Setup Instructions

1. **Get Your API Key**
   - Visit https://aistudio.google.com/app/apikey
   - Create a free Google Gemini API key

2. **Create Environment File**
   ```bash
   cd public/prototypes/fubo/backend
   echo "GEMINI_API_KEY=your-key-here" > .env
   ```

3. **Install Dependencies**
   ```bash
   pip3 install -r backend/requirements.txt
   ```

4. **Start the Backend Server**
   ```bash
   cd backend
   python3 app.py
   ```

   Server will start on `http://localhost:5000`

5. **Open the Frontend**
   - Navigate to `http://localhost:3000/prototypes/fubo/index.html`
   - Or open `index.html` directly in your browser

### Features

- **11 Visual Styles**: Photo Real, Bold Posterized, Gradient, Comic Book, Cinematic Grain, Halftone Retro, Studio Lighting, Video Game, Ink Splatter, Layered Papercraft, Risograph
- **200+ Teams**: NFL, NBA, NHL, MLS, EPL, La Liga, Bundesliga, F1
- **Real-time AI Generation**: 3-5 seconds per image
- **Bulk Processing**: Generate entire league rosters
- **Quality Assurance**: Automatic scoring system
- **Export System**: Organized folder structure

### Usage

1. **Select Styles**
   - Wide (16:9): Choose style for landscape thumbnails
   - Tall (2:3): Choose style for portrait thumbnails
   - Toggle between Action and Player subjects

2. **Pick Teams**
   - Select league (NFL, NBA, NHL, etc.)
   - Choose specific teams or select all

3. **Generate**
   - Click "Generate Images"
   - Images appear in real-time as they're created
   - View quality scores for each generation

4. **Export**
   - Download individual images
   - Export all in organized folders
   - Import previous generations

### Troubleshooting

**Server Won't Start:**
- Check Python version: `python3 --version` (need 3.8+)
- Install dependencies: `pip3 install flask google-generativeai pillow python-dotenv`

**API Key Issues:**
- Verify key is in `backend/.env` file
- Format: `GEMINI_API_KEY=AIzaSy...`
- Get new key at https://aistudio.google.com/app/apikey

**Generation Errors:**
- Check API quota (free tier has limits)
- Verify internet connection
- Check server logs for error messages

### Technical Stack

- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Backend**: Python Flask
- **AI**: Google Gemini 2.5 Flash
- **Image Processing**: PIL/Pillow

### API Endpoints

- `POST /api/generate_team_image` - Generate single thumbnail
- `POST /api/generate_batch` - Bulk generation
- `GET /api/teams` - Get team list
- `POST /api/export` - Export images

### File Structure

```
fubo/
├── index.html          (Frontend UI)
├── app.js              (Frontend logic)
├── styles_v2.css       (Base styles)
├── styles_fubo.css     (FUBO branding)
├── favicon.svg         (Icon)
├── README.md           (This file)
├── backend/
│   ├── app.py          (Flask server)
│   ├── .env            (API key - CREATE THIS)
│   ├── requirements.txt
│   ├── compositing.py  (Image processing)
│   ├── style_prompts.py (AI prompts)
│   ├── qa_visual.py    (Quality assurance)
│   └── [other modules]
├── overlays/           (Custom graphics)
└── InfoLayer/          (Team data)
```

### Performance Tips

- Use batch generation for multiple teams
- Photo Real style is fastest (3s avg)
- Complex styles may take 5-7s
- Free API tier: ~60 images/min limit

### Powered by Google Gemini AI · Made for FUBO 🎯
