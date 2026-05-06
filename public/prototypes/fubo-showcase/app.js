/**
 * fubo-showcase · manifest-driven static gallery.
 * Reads manifest.json (built by scripts/build-fubo-showcase.mjs) and lets the
 * visitor pick league → team → style. No backend, no API keys, no cost.
 */

(async function () {
  const SPIN_MS = 1100; // synthetic "generating" delay so it feels live

  const canvas = document.getElementById('canvas');
  const empty = document.getElementById('empty');
  const groups = {
    league: document.querySelector('[data-group="league"] .pills'),
    team: document.querySelector('[data-group="team"] .pills'),
    style: document.querySelector('[data-group="style"] .pills'),
  };

  let manifest;
  try {
    const res = await fetch('manifest.json', { cache: 'no-cache' });
    manifest = await res.json();
  } catch (err) {
    empty.textContent = 'manifest missing — run scripts/build-fubo-showcase.mjs';
    return;
  }

  const state = { league: null, team: null, style: null };
  const setActive = (group, value) => {
    state[group] = value;
    [...groups[group].children].forEach((el) => el.classList.toggle('active', el.dataset.value === value));
  };

  function renderPills(group, values, onPick, disabled) {
    groups[group].replaceChildren();
    for (const v of values) {
      const btn = document.createElement('button');
      btn.className = 'pill';
      btn.textContent = v;
      btn.dataset.value = v;
      if (disabled?.(v)) btn.disabled = true;
      btn.addEventListener('click', () => onPick(v));
      groups[group].appendChild(btn);
    }
  }

  function update() {
    const teams = state.league ? Object.keys(manifest.leagues[state.league] ?? {}) : [];
    if (state.team && !teams.includes(state.team)) state.team = null;

    const styles = state.league && state.team
      ? (manifest.leagues[state.league][state.team] ?? []).map((c) => c.style)
      : [];
    const uniqueStyles = [...new Set(styles)];
    if (state.style && !uniqueStyles.includes(state.style)) state.style = null;

    renderPills('team', teams, (t) => { setActive('team', t); update(); render(); });
    renderPills('style', uniqueStyles, (s) => { setActive('style', s); update(); render(); });

    // re-mark actives (renderPills wipes them)
    if (state.team) setActive('team', state.team);
    if (state.style) setActive('style', state.style);
  }

  function render() {
    if (!(state.league && state.team && state.style)) {
      canvas.innerHTML = '<span class="empty">pick a combo</span>';
      return;
    }
    const combos = manifest.leagues[state.league][state.team];
    const match = combos.find((c) => c.style === state.style) ?? combos[0];

    canvas.innerHTML = '';
    canvas.classList.add('loading');
    setTimeout(() => {
      canvas.classList.remove('loading');
      const img = document.createElement('img');
      img.src = match.url;
      img.alt = `${state.team} · ${state.style}`;
      const stamp = document.createElement('div');
      stamp.className = 'stamp';
      stamp.textContent = `${state.league} · ${state.team} · ${state.style}`;
      canvas.replaceChildren(img, stamp);
    }, SPIN_MS);
  }

  // initial render
  const leagues = Object.keys(manifest.leagues).sort();
  if (!leagues.length) {
    empty.textContent = 'manifest empty — generate combos and re-index';
    return;
  }

  renderPills('league', leagues, (l) => {
    setActive('league', l);
    state.team = state.style = null;
    update();
    render();
  });

  // auto-pick first league + team + style for instant gratification
  const firstLeague = leagues[0];
  const firstTeam = Object.keys(manifest.leagues[firstLeague] ?? {})[0];
  const firstStyle = manifest.leagues[firstLeague]?.[firstTeam]?.[0]?.style;
  setActive('league', firstLeague);
  setActive('team', firstTeam);
  setActive('style', firstStyle);
  update();
  render();
})();
