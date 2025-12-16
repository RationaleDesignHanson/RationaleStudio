/**
 * FUBO Thumbnail Generator v6.0
 * Sidebar + Canvas UX Redesign
 * Migrated from v5.0 with improved layout
 */

console.log('Initializing FUBO Thumbnail Generator v6.0');

// Helper function to safely call feather.replace()
function safeFeatherReplace() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Backend API configuration
const API_BASE_URL = 'http://localhost:5001';

// Global state
let teamColors = {};
let generationResults = [];
let stopGenerationRequested = false;

// Subject state
let currentWideSubject = 'action';
let currentTallSubject = 'action';

// Custom styles state
let customStyles = {
    'custom-1': { name: 'Custom 1', prompt: '', hasReference: false },
    'custom-2': { name: 'Custom 2', prompt: '', hasReference: false }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Setting up v6.0 Sidebar + Canvas UI');
    
    // Set initial subjects
    currentWideSubject = 'action';
    currentTallSubject = 'action';
    
    try {
        setupEventListeners();
        console.log('Event listeners attached');
        
        await loadTeamColors();
        console.log('Team colors loaded');
        
        // Load custom styles and overlays in background (non-blocking)
        loadCustomStyles().then(() => console.log('Custom styles loaded')).catch(err => console.error('Custom styles error:', err));
        loadOverlayPreviews().then(() => console.log('Overlay previews loaded')).catch(err => console.error('Overlay previews error:', err));

        // Initialize feather icons
        safeFeatherReplace();
        console.log('v6 initialization complete');
    } catch (error) {
        console.error('v6 initialization error:', error);
        showNotification(`Initialization error: ${error.message}`, 'error');
    }
});

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Generate button
    const generateBtn = document.getElementById('v6GenerateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerate);
        console.log('✓ Generate button');
    } else {
        console.error('✗ Generate button not found!');
    }
    
    const stopBtn = document.getElementById('v6StopBtn');
    if (stopBtn) {
        stopBtn.addEventListener('click', handleStopGeneration);
        console.log('✓ Stop button');
    }
    
    // Filters
    const qaFilter = document.getElementById('v6QAFilter');
    if (qaFilter) {
        qaFilter.addEventListener('change', handleQAFilter);
        console.log('✓ QA filter');
    }
    
    const leagueFilter = document.getElementById('v6LeagueFilter');
    if (leagueFilter) {
        leagueFilter.addEventListener('change', handleLeagueFilter);
        console.log('✓ League filter');
    }
    
    // Export
    const exportBtn = document.getElementById('v6ExportAllBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportAllImages);
        console.log('✓ Export button');
    }
    
    // Aspect ratio locking
    const wideWidthInput = document.getElementById('v6WideWidth');
    if (wideWidthInput) {
        wideWidthInput.addEventListener('input', function() {
            const width = parseInt(this.value) || 1920;
            const height = Math.round(width * 9 / 16);
            document.getElementById('v6WideHeight').value = height;
        });
    }
    
    const tallWidthInput = document.getElementById('v6TallWidth');
    if (tallWidthInput) {
        tallWidthInput.addEventListener('input', function() {
            const width = parseInt(this.value) || 1280;
            const height = Math.round(width * 3 / 2);
            document.getElementById('v6TallHeight').value = height;
        });
    }
}

// Modal control functions
function openImageInputsModal() {
    document.getElementById('imageInputsModal').classList.remove('hidden');
    safeFeatherReplace();
}

function closeImageInputsModal() {
    document.getElementById('imageInputsModal').classList.add('hidden');
}

function openCompositingModal() {
    document.getElementById('compositingModal').classList.remove('hidden');
    safeFeatherReplace();
}

function closeCompositingModal() {
    document.getElementById('compositingModal').classList.add('hidden');
}

function openImportModal() {
    document.getElementById('importModal').classList.remove('hidden');
    safeFeatherReplace();
}

function closeImportModal() {
    document.getElementById('importModal').classList.add('hidden');
}

// Subject toggle
function setSubjectV6(section, subject) {
    if (section === 'Wide') {
        currentWideSubject = subject;
        // Update button states
        document.querySelectorAll('#v6WideStyle + .segmented-toggle .toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === subject);
        });
    } else {
        currentTallSubject = subject;
        document.querySelectorAll('#v6TallStyle + .segmented-toggle .toggle-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === subject);
        });
    }
}

// Apply result filters based on checkboxes
function applyResultFilters() {
    const showWide = document.getElementById('showWide').checked;
    const showTall = document.getElementById('showTall').checked;
    
    const wideSection = document.getElementById('wideResultsSection');
    const tallSection = document.getElementById('tallResultsSection');
    
    // Show/hide sections based on filters
    wideSection.style.display = showWide ? 'block' : 'none';
    tallSection.style.display = showTall ? 'block' : 'none';
}

// Load team colors
async function loadTeamColors() {
    try {
        const response = await fetch('/team_colors.csv');
        const csvText = await response.text();
        
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const values = line.split(',');
            const teamName = values[0];
            const sport = values[1];
            
            const key = `${sport}/${teamName}`;
            teamColors[key] = {
                primary_color: values[2],
                secondary_color: values[3],
                accent_color: values[4],
                text_color: values[5]
            };
        }
        
        console.log(`Team colors loaded: ${Object.keys(teamColors).length} teams`);
        
    } catch (error) {
        console.error('Error loading team colors:', error);
        showNotification('Failed to load team colors', 'error');
    }
}

// Quick Start
async function handleQuickStart() {
    console.log('Quick Start initiated');
    
    // Set defaults
    document.getElementById('v6WideStyle').value = 'photo-real';
    document.getElementById('v6TallStyle').value = 'bold-posterized';
    currentWideSubject = 'action';
    currentTallSubject = 'action';
    
    // Update toggles
    setSubjectV6('Wide', 'action');
    setSubjectV6('Tall', 'action');
    
    // Set test mode
    document.querySelector('input[name="v6GenerationMode"][value="test"]').checked = true;
    
    showNotification('Quick Start configured - Click Generate Images', 'success');
}

// Generate handler
async function handleGenerate() {
    console.log('v6 Generate started');
    console.log('Team colors loaded:', Object.keys(teamColors).length);
    
    // Get settings
    const wideStyle = document.getElementById('v6WideStyle').value;
    const tallStyle = document.getElementById('v6TallStyle').value;
    const league = document.getElementById('v6LeagueSelect').value;
    const mode = document.querySelector('input[name="v6GenerationMode"]:checked').value;
    
    console.log(`Settings: Wide=${wideStyle}, Tall=${tallStyle}, League=${league}, Mode=${mode}`);
    
    // Get teams for selected league
    console.log(`Fetching teams for ${league}...`);
    const teamsResponse = await fetch(`${API_BASE_URL}/get_teams/${league}`);
    const teamsData = await teamsResponse.json();
    console.log('Teams response:', teamsData);
    
    if (!teamsData.success || !teamsData.teams) {
        showNotification('Failed to load teams', 'error');
        return;
    }
    
    let teams = teamsData.teams;
    if (mode === 'test') {
        teams = teams.slice(0, 4); // Test mode: first 4 teams
    }
    
    const totalImages = teams.length * 2;
    const estimatedMinutes = Math.ceil(totalImages * 0.5); // ~30 seconds per image
    
    // Show time estimate
    document.getElementById('v6TimeEstimate').classList.remove('hidden');
    document.getElementById('v6TimeEstimateText').textContent = `${estimatedMinutes} min`;
    
    // Show progress
    document.getElementById('v6Progress').classList.remove('hidden');
    document.getElementById('v6ProgressCount').textContent = `0 / ${totalImages}`;
    document.getElementById('v6ProgressBar').style.width = '0%';
    
    // Update empty state message
    const emptyState = document.getElementById('emptyState');
    if (emptyState) {
        emptyState.innerHTML = `
            <div class="max-w-md">
                <div class="spinner w-16 h-16 mx-auto mb-4 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                <h2 class="text-xl font-semibold text-gray-700 mb-2">Images Generating...</h2>
                <p class="text-gray-500">Your thumbnails are on the way! Check the sidebar for progress.</p>
            </div>
        `;
    }
    
    showNotification(`Generating ${totalImages} images...`, 'info');
    
    // Show stop button
    document.getElementById('v6GenerateBtn').classList.add('hidden');
    document.getElementById('v6StopBtn').classList.remove('hidden');
    
    stopGenerationRequested = false;
    let completedCount = 0;
    
    // Generate Wide + Tall for each team
    for (let i = 0; i < teams.length; i++) {
        if (stopGenerationRequested) break;
        
        const team = teams[i];
        
        // Update status
        document.getElementById('v6ProgressStatus').textContent = `Generating ${team.team_name}...`;
        
        // Generate Wide
        await generateSingleImage(team, wideStyle, 'Wide', league);
        completedCount++;
        
        // Update progress
        const progress = (completedCount / totalImages) * 100;
        document.getElementById('v6ProgressBar').style.width = `${progress}%`;
        document.getElementById('v6ProgressCount').textContent = `${completedCount} / ${totalImages}`;
        
        if (stopGenerationRequested) break;
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate Tall
        await generateSingleImage(team, tallStyle, 'Tall', league);
        completedCount++;
        
        // Update progress
        const progress2 = (completedCount / totalImages) * 100;
        document.getElementById('v6ProgressBar').style.width = `${progress2}%`;
        document.getElementById('v6ProgressCount').textContent = `${completedCount} / ${totalImages}`;
        
        if (stopGenerationRequested) break;
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Hide progress and stop button
    document.getElementById('v6Progress').classList.add('hidden');
    document.getElementById('v6TimeEstimate').classList.add('hidden');
    document.getElementById('v6StopBtn').classList.add('hidden');
    document.getElementById('v6GenerateBtn').classList.remove('hidden');
    
    showNotification(`Generation complete! ${completedCount} images created`, 'success');
    updateCounts();
}

async function generateSingleImage(team, style, section, league) {
    console.log(`Generating ${section} for ${team.team_name}`);
    
    const subject = section === 'Wide' ? currentWideSubject : currentTallSubject;
    
    // Get dimensions - Both formats generated with padding for 2D positioning
    const outputWidth = section === 'Wide' ? 
        (document.getElementById('v6WideWidth')?.value || 3320) :  // +1400px horizontal padding
        (document.getElementById('v6TallWidth')?.value || 1600);  // +320px horizontal padding
    const outputHeight = section === 'Wide' ?
        (document.getElementById('v6WideHeight')?.value || 1480) :  // +400px vertical padding
        (document.getElementById('v6TallHeight')?.value || 2420);   // +500px vertical padding
    
    // Check transparency
    const withAlpha = section === 'Wide' ?
        (document.getElementById('v6WideWithAlpha')?.checked || false) :
        (document.getElementById('v6TallWithAlpha')?.checked || false);
    
    try {
        // Step 1: Generate base image
        const baseResponse = await fetch(`${API_BASE_URL}/generate_base_image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                league,
                team: team.team_name,
                team_colors: teamColors[`${league}/${team.team_name}`] || {},
                content_type: subject,
                section,
                output_width: outputWidth,
                output_height: outputHeight,
                with_alpha: withAlpha
            })
        });
        
        const baseData = await baseResponse.json();
        if (!baseData.success) throw new Error('Base generation failed');
        
        // Step 2: Apply style
        const formData = new FormData();
        formData.append('base_image', dataURLtoBlob(baseData.image), 'base.jpg');
        formData.append('style', style);
        formData.append('output_width', outputWidth);
        formData.append('output_height', outputHeight);
        formData.append('with_alpha', withAlpha.toString());
        formData.append('metadata', JSON.stringify({
            league,
            team: team.team_name,
            team_colors: teamColors[`${league}/${team.team_name}`] || {}
        }));
        
        const styleResponse = await fetch(`${API_BASE_URL}/apply_style`, {
            method: 'POST',
            body: formData
        });
        
        const styleData = await styleResponse.json();
        if (!styleData.success) throw new Error('Style failed');
        
        // Store clean image for downloads (no overlay)
        const cleanImage = styleData.image;
        let finalImage = styleData.image;
        
        // Check if compositing is disabled
        const disableCompositing = document.getElementById('v6DisableCompositing')?.checked || false;
        
        if (disableCompositing) {
            console.log('Compositing disabled - using raw image (no overlay, no shift)');
            // Skip ALL compositing - no overlay, no underlay, no shift
            // If transparency was requested, still extract it for clean cutout
            if (withAlpha) {
                try {
                    const alphaResponse = await fetch(`${API_BASE_URL}/extract_alpha`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            image: styleData.image,
                            content_type: subject
                        })
                    });
                    
                    const alphaData = await alphaResponse.json();
                    if (alphaData.success) {
                        finalImage = alphaData.alpha_image;  // Transparent cutout, NO compositing
                    }
                } catch (alphaError) {
                    console.error('Alpha error:', alphaError);
                }
            } else {
                finalImage = styleData.image;  // Raw image, no processing
            }
        } else if (withAlpha) {
            // WITH transparency: extract alpha and composite over underlay
            try {
                const alphaResponse = await fetch(`${API_BASE_URL}/extract_alpha`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        image: styleData.image,
                        content_type: subject
                    })
                });
                
                const alphaData = await alphaResponse.json();
                if (alphaData.success) {
                    // Apply overlay (includes shift)
                    const overlayResponse = await fetch(`${API_BASE_URL}/apply_overlay`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            generated_image: alphaData.alpha_image,
                            section,
                            with_alpha: true
                        })
                    });
                    
                    const overlayData = await overlayResponse.json();
                    if (overlayData.success) {
                        finalImage = overlayData.image;
                    }
                }
            } catch (alphaError) {
                console.error('Alpha/overlay error:', alphaError);
            }
        } else {
            // WITHOUT transparency: apply overlay on top for preview (includes shift)
            console.log('🎨 Applying overlay (no transparency mode) - Section:', section);
            try {
                const overlayResponse = await fetch(`${API_BASE_URL}/apply_overlay`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        generated_image: styleData.image,
                        section,
                        with_alpha: false  // Use 'under' mode (overlay on top)
                    })
                });
                
                const overlayData = await overlayResponse.json();
                console.log('🎨 Overlay response:', overlayData.success ? '✅ Success' : '❌ Failed');
                if (overlayData.success) {
                    finalImage = overlayData.image;  // Preview with overlay
                    console.log('🎨 FinalImage updated with overlay, length:', finalImage.length);
                    // cleanImage stays without overlay for download
                } else {
                    console.warn('⚠️ Overlay failed, using raw image');
                }
            } catch (overlayError) {
                console.error('❌ Overlay error:', overlayError);
            }
        }
        
        // Create result card
        addResultCard({
            team,
            style,
            section,
            league,
            image: finalImage,  // Preview image (may have overlay)
            downloadImage: cleanImage,  // Always use clean image for download
            cleanBaseImage: cleanImage,  // PRESERVE original for slider adjustments
            status: 'completed',
            qa: { overall_score: 85 }, // Placeholder
            hasAlpha: withAlpha,  // Store transparency state
            compositingEnabled: !disableCompositing,  // Track if compositing is on
            offset_x: section === 'Wide' ? 250 : 0,  // Default horizontal offset
            offset_y: 0,  // Default vertical offset (centered)
            generatedWidth: outputWidth,  // Store generated width for cropping
            generatedHeight: outputHeight,  // Store generated height for cropping
            finalWidth: section === 'Wide' ? 1920 : 1280,  // Final export width
            finalHeight: section === 'Wide' ? 1080 : 1922  // Final export height (matches overlays)
        });
        
        updateCounts();
        
    } catch (error) {
        console.error('Generation error:', error);
        showNotification(`Failed: ${team.team_name}`, 'error');
    }
}

// Utility function
function dataURLtoBlob(dataURL) {
    const parts = dataURL.split(',');
    const contentType = parts[0].split(':')[1].split(';')[0];
    const b64Data = parts[1];
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    
    return new Blob(byteArrays, { type: contentType });
}

function handleStopGeneration() {
    stopGenerationRequested = true;
    showNotification('Stopping generation...', 'info');
}

// Add result card to appropriate grid
function addResultCard(result) {
    // Add to results array
    const resultIndex = generationResults.length;
    generationResults.push(result);
    result.index = resultIndex;
    
    // Determine which grid
    const gridId = result.section === 'Wide' ? 'wideResultsGrid' : 'tallResultsGrid';
    const grid = document.getElementById(gridId);
    
    // Hide empty state, show results container
    document.getElementById('emptyState').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('hidden');
    
    // Create card
    const card = document.createElement('div');
    card.id = `result-${resultIndex}`;
    card.className = 'result-card group';
    
    // Aspect ratio class
    const aspectClass = result.section === 'Wide' ? 'aspect-video' : 'aspect-[2/3]';
    
    // QA badge color
    const qaScore = result.qa?.overall_score || 0;
    const qaBadgeClass = qaScore >= 85 ? 'bg-green-600' : qaScore >= 75 ? 'bg-yellow-600' : 'bg-red-600';
    
    // Ensure offsets have defaults and check if compositing is enabled
    const currentOffsetX = result.offset_x !== undefined ? result.offset_x : (result.section === 'Wide' ? 250 : 0);
    const currentOffsetY = result.offset_y !== undefined ? result.offset_y : 0;
    const showControls = result.compositingEnabled !== false;  // Show controls unless compositing disabled
    
    // Calculate padding ranges based on section
    const paddingX = result.section === 'Wide' ? 700 : 160;  // Wide: ±700px, Tall: ±160px
    const paddingY = result.section === 'Wide' ? 200 : 250;  // Wide: ±200px, Tall: ±250px
    
    card.innerHTML = `
        <div class="relative ${aspectClass} bg-gray-800 overflow-hidden">
            <img id="img-${resultIndex}" src="${result.image}" alt="${result.team.team_name}" class="w-full h-full object-cover">
            
            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity flex items-center justify-center gap-2">
                <button onclick="regenerateSingle(${resultIndex})" class="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700" title="Regenerate">
                    <i data-feather="refresh-cw" class="w-5 h-5"></i>
                </button>
                <button onclick="downloadSingle(${resultIndex})" class="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100" title="Download">
                    <i data-feather="download" class="w-5 h-5"></i>
                </button>
                <button onclick="openPreview(${resultIndex})" class="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100" title="Maximize">
                    <i data-feather="maximize-2" class="w-5 h-5"></i>
                </button>
            </div>
            
            ${showControls ? 
            `<div class="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="bg-black bg-opacity-90 rounded-lg p-2">
                    <div class="text-white text-xs text-center mb-1.5">
                        Position: <span id="offset-display-${resultIndex}">${currentOffsetX}, ${currentOffsetY}</span>
                    </div>
                    <div class="flex items-center justify-center gap-1">
                        <button onclick="nudgePosition(${resultIndex}, -30, 0)" 
                                class="position-btn text-white hover:bg-orange-600 p-1.5 rounded" title="Left">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
                        </button>
                        <div class="flex flex-col gap-1">
                            <button onclick="nudgePosition(${resultIndex}, 0, -30)" 
                                    class="position-btn text-white hover:bg-orange-600 p-1.5 rounded" title="Up">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>
                            </button>
                            <button onclick="resetPosition(${resultIndex})" 
                                    class="position-btn text-white hover:bg-green-600 p-1.5 rounded text-xs" title="Reset">
                                ⊙
                            </button>
                            <button onclick="nudgePosition(${resultIndex}, 0, 30)" 
                                    class="position-btn text-white hover:bg-orange-600 p-1.5 rounded" title="Down">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                            </button>
                        </div>
                        <button onclick="nudgePosition(${resultIndex}, 30, 0)" 
                                class="position-btn text-white hover:bg-orange-600 p-1.5 rounded" title="Right">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                        </button>
                    </div>
                </div>
            </div>` : ''}
            
            <!-- QA Score Badge (Bottom Left) -->
            <div class="absolute bottom-2 left-2 ${qaBadgeClass} text-white px-2 py-1 rounded text-sm font-bold">
                QA: ${qaScore}
            </div>
        </div>
        
        <!-- Card Footer -->
        <div class="p-3 bg-gray-800">
            <h3 class="font-semibold text-white text-sm">${result.team.team_name}</h3>
            <p class="text-xs text-gray-400">${result.style} • ${result.league}</p>
        </div>
    `;
    
    grid.appendChild(card);
    safeFeatherReplace();
}

// Regenerate single image
async function regenerateSingle(index) {
    const result = generationResults[index];
    if (!result) return;
    
    showNotification(`Regenerating ${result.team.team_name}...`, 'info');
    
    try {
        // Regenerate with same settings
        await generateSingleImage(result.team, result.style, result.section, result.league);
        
        // Replace the card
        const oldCard = document.getElementById(`result-${index}`);
        const newResult = generationResults[generationResults.length - 1];
        const gridId = result.section === 'Wide' ? 'wideResultsGrid' : 'tallResultsGrid';
        const grid = document.getElementById(gridId);
        
        if (oldCard) {
            oldCard.remove();
        }
        
        showNotification(`${result.team.team_name} regenerated!`, 'success');
        
    } catch (error) {
        console.error('Regeneration error:', error);
        showNotification('Regeneration failed', 'error');
    }
}

// Download single
function downloadSingle(index) {
    const result = generationResults[index];
    if (!result) return;
    
    // Use clean image for download (no overlay)
    const imageToDownload = result.downloadImage || result.image;
    
    const filename = `${result.team.team_name}_${result.section}_${result.style}.jpg`;
    const link = document.createElement('a');
    link.href = imageToDownload;
    link.download = filename;
    link.click();
    
    showNotification('Download started', 'success');
}

// Open preview in modal
function openPreview(index) {
    const result = generationResults[index];
    if (!result) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
    modal.onclick = function() { document.body.removeChild(modal); };
    
    modal.innerHTML = `
        <div class="relative max-w-6xl max-h-[90vh]" onclick="event.stopPropagation()">
            <button onclick="document.body.removeChild(this.closest('.fixed'))" class="absolute -top-10 right-0 text-white hover:text-gray-300">
                <i data-feather="x" class="w-8 h-8"></i> Close
            </button>
            <img src="${result.image}" alt="${result.team.team_name}" class="max-w-full max-h-[90vh] rounded-lg shadow-2xl">
            <div class="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
                <div class="font-bold">${result.team.team_name}</div>
                <div class="text-sm text-gray-300">${result.style} • ${result.section} • ${result.league}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    safeFeatherReplace();
}

// Nudge position by delta X and Y
async function nudgePosition(index, deltaX, deltaY) {
    const result = generationResults[index];
    if (!result || result.compositingEnabled === false) return;
    
    // Calculate new position with bounds
    const paddingX = result.section === 'Wide' ? 700 : 160;
    const paddingY = result.section === 'Wide' ? 200 : 250;
    
    const newOffsetX = Math.max(-paddingX, Math.min(paddingX, (result.offset_x || 0) + deltaX));
    const newOffsetY = Math.max(-paddingY, Math.min(paddingY, (result.offset_y || 0) + deltaY));
    
    await applyPosition(index, newOffsetX, newOffsetY);
}

// Reset position to defaults
async function resetPosition(index) {
    const result = generationResults[index];
    if (!result) return;
    
    const defaultX = result.section === 'Wide' ? 250 : 0;
    const defaultY = 0;
    
    await applyPosition(index, defaultX, defaultY);
}

// Apply 2D position (X, Y offsets)
async function applyPosition(index, newOffsetX, newOffsetY) {
    const result = generationResults[index];
    if (!result || result.compositingEnabled === false) return;
    
    // Update display value
    const offsetDisplay = document.getElementById(`offset-display-${index}`);
    if (offsetDisplay) {
        offsetDisplay.textContent = `${newOffsetX}, ${newOffsetY}`;
    }
    
    try {
        // ALWAYS use the original clean base image for absolute positioning
        const baseImage = result.cleanBaseImage || result.downloadImage;
        
        // Re-composite with ABSOLUTE 2D offset position
        const response = await fetch(`${API_BASE_URL}/apply_overlay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                generated_image: baseImage,  // Use original clean image (absolute positioning)
                section: result.section,
                with_alpha: result.hasAlpha || false,
                shift_x: parseInt(newOffsetX),  // Absolute horizontal position
                shift_y: parseInt(newOffsetY)   // Absolute vertical position
            })
        });
        
        const data = await response.json();
        if (data.success) {
            // Update preview and download, but NEVER overwrite cleanBaseImage
            result.image = data.image;
            result.downloadImage = data.image;
            result.offset_x = parseInt(newOffsetX);
            result.offset_y = parseInt(newOffsetY);
            
            // Update the image in the DOM
            const img = document.getElementById(`img-${index}`);
            if (img) {
                img.src = data.image;
            }
        }
    } catch (error) {
        console.error('Error adjusting position:', error);
    }
}

// Filter handlers (stubs)
function handleQAFilter() {
    console.log('QA filter changed');
    // TODO: Implement filtering
}

function handleLeagueFilter() {
    console.log('League filter changed');
    // TODO: Implement filtering
}

// Export all images
async function exportAllImages() {
    if (generationResults.length === 0) {
        showNotification('No images to export', 'warning');
        return;
    }
    
    showNotification(`Exporting ${generationResults.length} images...`, 'info');
    
    try {
        const exportData = {
            images: generationResults.map(r => ({
                image: r.downloadImage || r.image,  // Use clean image (no overlay)
                team: r.team.team_name,
                league: r.league,
                section: r.section,
                style: r.style
            }))
        };
        
        const response = await fetch(`${API_BASE_URL}/export_to_folders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(exportData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification(`Exported ${data.count} images to organized folders`, 'success');
        } else {
            showNotification('Export failed', 'error');
        }
        
    } catch (error) {
        console.error('Export error:', error);
        showNotification('Export error', 'error');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    
    text.textContent = message;
    notification.classList.remove('hidden');
    
    // Color based on type
    if (type === 'error') {
        notification.classList.add('bg-red-50', 'text-red-800');
    } else if (type === 'success') {
        notification.classList.add('bg-green-50', 'text-green-800');
    } else {
        notification.classList.add('bg-blue-50', 'text-blue-800');
    }
    
    setTimeout(() => {
        notification.classList.add('hidden');
        notification.classList.remove('bg-red-50', 'text-red-800', 'bg-green-50', 'text-green-800', 'bg-blue-50', 'text-blue-800');
    }, 3000);
}

// Update counts
function updateCounts() {
    const wideResults = generationResults.filter(r => r.section === 'Wide');
    const tallResults = generationResults.filter(r => r.section === 'Tall');
    
    document.getElementById('v6ResultCount').textContent = `(${generationResults.length})`;
    document.getElementById('wideCount').textContent = `(${wideResults.length})`;
    document.getElementById('tallCount').textContent = `(${tallResults.length})`;
    
    // Update section counts in headers
    document.getElementById('wideSectionCount').textContent = wideResults.length > 0 ? `${wideResults.length} image${wideResults.length !== 1 ? 's' : ''}` : '';
    document.getElementById('tallSectionCount').textContent = tallResults.length > 0 ? `${tallResults.length} image${tallResults.length !== 1 ? 's' : ''}` : '';
    
    // Show/hide entire sections if empty
    document.getElementById('wideResultsSection').style.display = wideResults.length > 0 ? 'block' : 'none';
    document.getElementById('tallResultsSection').style.display = tallResults.length > 0 ? 'block' : 'none';
    
    // Show/hide export section
    document.getElementById('v6ResultsSection').classList.toggle('hidden', generationResults.length === 0);
    document.getElementById('v6ExportSection').classList.toggle('hidden', generationResults.length === 0);
    
    // Apply filters to show/hide based on checkboxes
    applyResultFilters();
}

// Overlay Management Functions

// Tab switching for overlay management
function handleOverlayTabSwitch(tab) {
    const wideTab = document.getElementById('wideTab');
    const tallTab = document.getElementById('tallTab');
    const wideContent = document.getElementById('wideTabContent');
    const tallContent = document.getElementById('tallTabContent');
    
    if (tab === 'wide') {
        // Activate Wide tab
        wideTab.classList.remove('border-transparent', 'text-gray-500');
        wideTab.classList.add('border-orange-500', 'text-orange-600');
        tallTab.classList.remove('border-orange-500', 'text-orange-600');
        tallTab.classList.add('border-transparent', 'text-gray-500');
        
        wideContent.classList.remove('hidden');
        tallContent.classList.add('hidden');
    } else {
        // Activate Tall tab
        tallTab.classList.remove('border-transparent', 'text-gray-500');
        tallTab.classList.add('border-orange-500', 'text-orange-600');
        wideTab.classList.remove('border-orange-500', 'text-orange-600');
        wideTab.classList.add('border-transparent', 'text-gray-500');
        
        tallContent.classList.remove('hidden');
        wideContent.classList.add('hidden');
    }
}

// Load preview thumbnails for all overlays
async function loadOverlayPreviews() {
    const overlayTypes = [
        { type: 'wide-overlay', previewId: 'wideOverlayPreview' },
        { type: 'wide-underlay', previewId: 'wideUnderlayPreview' },
        { type: 'tall-overlay', previewId: 'tallOverlayPreview' },
        { type: 'tall-underlay', previewId: 'tallUnderlayPreview' }
    ];
    
    for (const { type, previewId } of overlayTypes) {
        try {
            const response = await fetch(`${API_BASE_URL}/get_overlay_preview?overlay_type=${type}`);
            const data = await response.json();
            
            if (data.success && data.preview) {
                const preview = document.getElementById(previewId);
                if (preview) {
                    preview.src = data.preview;
                }
            }
        } catch (error) {
            console.error(`Failed to load preview for ${type}:`, error);
        }
    }
}

// Handle file selection - show upload button
function handleOverlayFileSelect(type) {
    // Map type to button and file input IDs
    const mapping = {
        'wide-overlay': { btnId: 'wideOverlayUploadBtn', fileId: 'wideOverlayFile' },
        'wide-underlay': { btnId: 'wideUnderlayUploadBtn', fileId: 'wideUnderlayFile' },
        'tall-overlay': { btnId: 'tallOverlayUploadBtn', fileId: 'tallOverlayFile' },
        'tall-underlay': { btnId: 'tallUnderlayUploadBtn', fileId: 'tallUnderlayFile' }
    };
    
    const ids = mapping[type];
    if (!ids) return;
    
    const btn = document.getElementById(ids.btnId);
    const fileInput = document.getElementById(ids.fileId);
    
    if (fileInput && fileInput.files.length > 0) {
        btn?.classList.remove('hidden');
    } else {
        btn?.classList.add('hidden');
    }
}

// Upload overlay
async function uploadOverlay(type) {
    const mapping = {
        'wide-overlay': { fileId: 'wideOverlayFile', btnId: 'wideOverlayUploadBtn' },
        'wide-underlay': { fileId: 'wideUnderlayFile', btnId: 'wideUnderlayUploadBtn' },
        'tall-overlay': { fileId: 'tallOverlayFile', btnId: 'tallOverlayUploadBtn' },
        'tall-underlay': { fileId: 'tallUnderlayFile', btnId: 'tallUnderlayUploadBtn' }
    };
    
    const ids = mapping[type];
    if (!ids) return;
    
    const fileInput = document.getElementById(ids.fileId);
    const file = fileInput?.files[0];
    
    if (!file) {
        showNotification('Please select a PNG file first', 'warning');
        return;
    }
    
    if (!file.type.includes('png')) {
        showNotification('Please upload a PNG file', 'error');
        return;
    }
    
    showNotification(`Uploading ${type} overlay...`, 'info');
    
    try {
        const formData = new FormData();
        formData.append('overlay_image', file);
        formData.append('overlay_type', type);
        
        const response = await fetch(`${API_BASE_URL}/upload_overlay`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification(`Overlay uploaded successfully!`, 'success');
            fileInput.value = ''; // Clear file input
            document.getElementById(ids.btnId)?.classList.add('hidden');
            
            // Refresh preview
            await loadOverlayPreviews();
        } else {
            showNotification(`Upload failed: ${data.error}`, 'error');
        }
    } catch (error) {
        console.error('Upload overlay error:', error);
        showNotification('Upload failed', 'error');
    }
}

// Remove overlay (clear to blank)
async function removeOverlay(type) {
    if (!confirm(`Remove ${type} overlay? This will clear it to blank.`)) {
        return;
    }
    
    showNotification(`Removing ${type} overlay...`, 'info');
    
    try {
        const response = await fetch(`${API_BASE_URL}/remove_overlay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ overlay_type: type })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification(`Overlay removed`, 'success');
            await loadOverlayPreviews();
        } else {
            showNotification(`Remove failed: ${data.error}`, 'error');
        }
    } catch (error) {
        console.error('Remove overlay error:', error);
        showNotification('Remove failed', 'error');
    }
}

// Restore default overlay from InfoLayer
async function restoreDefaultOverlay(type) {
    if (!confirm(`Restore ${type} to default from InfoLayer?`)) {
        return;
    }
    
    showNotification(`Restoring ${type} default...`, 'info');
    
    try {
        const response = await fetch(`${API_BASE_URL}/restore_default_overlay`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ overlay_type: type })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification(`Default overlay restored`, 'success');
            await loadOverlayPreviews();
        } else {
            showNotification(`Restore failed: ${data.error}`, 'error');
        }
    } catch (error) {
        console.error('Restore overlay error:', error);
        showNotification('Restore failed', 'error');
    }
}

// Custom Styles Management

// Load custom styles from backend
async function loadCustomStyles() {
    try {
        const response = await fetch(`${API_BASE_URL}/get_custom_styles`);
        const data = await response.json();
        
        if (data.success) {
            customStyles = data.styles;
            updateStyleDropdowns();
        }
    } catch (error) {
        console.error('Failed to load custom styles:', error);
    }
}

// Update style dropdowns to enable/disable custom styles
function updateStyleDropdowns() {
    const wideSelect = document.getElementById('v6WideStyle');
    const tallSelect = document.getElementById('v6TallStyle');
    
    for (const [styleId, styleData] of Object.entries(customStyles)) {
        // Enable option if prompt is defined
        const isEnabled = styleData.prompt && styleData.prompt.trim() !== '';
        
        // Update Wide dropdown
        const wideOption = wideSelect.querySelector(`option[value="${styleId}"]`);
        if (wideOption) {
            wideOption.disabled = !isEnabled;
        }
        
        // Update Tall dropdown
        const tallOption = tallSelect.querySelector(`option[value="${styleId}"]`);
        if (tallOption) {
            tallOption.disabled = !isEnabled;
        }
    }
}

// Handle style editor selection change
async function handleStyleEditorSelect() {
    const select = document.getElementById('styleEditorSelect');
    const selectedStyle = select.value;
    const promptEditor = document.getElementById('stylePromptEditor');
    const saveBtn = document.getElementById('saveStyleBtn');
    const clearBtn = document.getElementById('clearStyleBtn');
    const referencePreview = document.getElementById('styleReferencePreview');
    const referenceFilename = document.getElementById('styleReferenceFilename');
    const referenceRemoveBtn = document.getElementById('styleReferenceRemoveBtn');
    
    const isCustom = selectedStyle.startsWith('custom-');
    
    // Enable/disable editing based on whether it's custom
    promptEditor.readOnly = !isCustom;
    saveBtn.style.display = isCustom ? 'inline-block' : 'none';
    clearBtn.style.display = isCustom ? 'inline-block' : 'none';
    
    if (isCustom) {
        // Load custom style data
        const styleData = customStyles[selectedStyle];
        promptEditor.value = styleData.prompt || '';
        promptEditor.placeholder = 'Enter custom style prompt...';
        
        // Load reference if available
        try {
            const response = await fetch(`${API_BASE_URL}/get_style_reference_preview?style=${selectedStyle}`);
            const data = await response.json();
            
            if (data.success && data.has_reference) {
                referencePreview.src = data.preview;
                referenceFilename.textContent = data.filename || `${selectedStyle}.jpg`;
                referenceRemoveBtn.classList.remove('hidden');
            } else {
                referencePreview.src = '';
                referenceFilename.textContent = 'No reference image';
                referenceRemoveBtn.classList.add('hidden');
            }
        } catch (error) {
            console.error('Failed to load reference:', error);
        }
    } else {
        // Load built-in style prompt
        try {
            const response = await fetch(`${API_BASE_URL}/get_builtin_style_prompt?style=${selectedStyle}`);
            const data = await response.json();
            
            if (data.success) {
                promptEditor.value = data.prompt;
                promptEditor.placeholder = 'Built-in style prompt (read-only)';
            }
            
            // Load reference if available
            if (data.has_reference) {
                referencePreview.src = data.reference_preview;
                referenceFilename.textContent = data.reference_filename || `${selectedStyle}.jpg`;
                referenceRemoveBtn.classList.add('hidden'); // Can't remove built-in references
            } else {
                referencePreview.src = '';
                referenceFilename.textContent = 'No reference image';
                referenceRemoveBtn.classList.add('hidden');
            }
        } catch (error) {
            console.error('Failed to load built-in style:', error);
            promptEditor.value = '';
        }
    }
}

// Handle style reference file selection
function handleStyleReferenceSelect() {
    const fileInput = document.getElementById('styleReferenceFile');
    const uploadBtn = document.getElementById('styleReferenceUploadBtn');
    
    if (fileInput.files.length > 0) {
        uploadBtn.classList.remove('hidden');
    } else {
        uploadBtn.classList.add('hidden');
    }
}

// Upload style reference image
async function uploadStyleReference() {
    const select = document.getElementById('styleEditorSelect');
    const selectedStyle = select.value;
    const fileInput = document.getElementById('styleReferenceFile');
    const file = fileInput.files[0];
    
    if (!selectedStyle.startsWith('custom-')) {
        showNotification('Can only upload references for custom styles', 'warning');
        return;
    }
    
    if (!file) {
        showNotification('Please select an image file', 'warning');
        return;
    }
    
    showNotification(`Uploading reference for ${selectedStyle}...`, 'info');
    
    try {
        const formData = new FormData();
        formData.append('reference_image', file);
        formData.append('style_id', selectedStyle);
        
        const response = await fetch(`${API_BASE_URL}/upload_style_reference`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Reference image uploaded!', 'success');
            fileInput.value = '';
            document.getElementById('styleReferenceUploadBtn').classList.add('hidden');
            
            // Refresh the editor to show new reference
            await handleStyleEditorSelect();
        } else {
            showNotification(`Upload failed: ${data.error}`, 'error');
        }
    } catch (error) {
        console.error('Upload reference error:', error);
        showNotification('Upload failed', 'error');
    }
}

// Remove style reference image
async function removeStyleReference() {
    const select = document.getElementById('styleEditorSelect');
    const selectedStyle = select.value;
    
    if (!confirm(`Remove reference image for ${selectedStyle}?`)) {
        return;
    }
    
    showNotification(`Removing reference...`, 'info');
    
    try {
        const response = await fetch(`${API_BASE_URL}/remove_style_reference`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ style_id: selectedStyle })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Reference removed', 'success');
            await handleStyleEditorSelect();
        } else {
            showNotification(`Remove failed: ${data.error}`, 'error');
        }
    } catch (error) {
        console.error('Remove reference error:', error);
        showNotification('Remove failed', 'error');
    }
}

// Save custom style
async function saveCustomStyle() {
    const select = document.getElementById('styleEditorSelect');
    const selectedStyle = select.value;
    const promptEditor = document.getElementById('stylePromptEditor');
    const prompt = promptEditor.value.trim();
    
    if (!selectedStyle.startsWith('custom-')) {
        showNotification('Can only save custom styles', 'warning');
        return;
    }
    
    if (!prompt) {
        showNotification('Please enter a style prompt', 'warning');
        return;
    }
    
    showNotification(`Saving ${selectedStyle}...`, 'info');
    
    try {
        const response = await fetch(`${API_BASE_URL}/save_custom_style`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                style_id: selectedStyle,
                prompt: prompt
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Custom style saved!', 'success');
            
            // Update local state
            customStyles[selectedStyle].prompt = prompt;
            updateStyleDropdowns();
        } else {
            showNotification(`Save failed: ${data.error}`, 'error');
        }
    } catch (error) {
        console.error('Save custom style error:', error);
        showNotification('Save failed', 'error');
    }
}

// Clear custom style
async function clearCustomStyle() {
    const select = document.getElementById('styleEditorSelect');
    const selectedStyle = select.value;
    
    if (!selectedStyle.startsWith('custom-')) {
        showNotification('Can only clear custom styles', 'warning');
        return;
    }
    
    if (!confirm(`Clear ${selectedStyle}? This will remove the prompt and reference image.`)) {
        return;
    }
    
    showNotification(`Clearing ${selectedStyle}...`, 'info');
    
    try {
        const response = await fetch(`${API_BASE_URL}/delete_custom_style`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ style_id: selectedStyle })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Custom style cleared', 'success');
            
            // Update local state
            customStyles[selectedStyle].prompt = '';
            customStyles[selectedStyle].hasReference = false;
            updateStyleDropdowns();
            
            // Refresh editor
            await handleStyleEditorSelect();
        } else {
            showNotification(`Clear failed: ${data.error}`, 'error');
        }
    } catch (error) {
        console.error('Clear custom style error:', error);
        showNotification('Clear failed', 'error');
    }
}

console.log('v6.0 JavaScript loaded - Sidebar + Canvas ready');

