/* ═══════════════════════════════════════════
   NAV — Panel switching, progress, sidebar
═══════════════════════════════════════════ */
let completedMissions = new Set();
const TOTAL_MISSIONS = 5;

/* ── Panel navigation ── */
function gotoPanel(id) {
  const navId   = `nav-${id}`;
  const panelId = `panel-${id}`;

  // Block locked missions
  const navEl = document.getElementById(navId);
  if (navEl && navEl.classList.contains('locked')) return;

  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById(panelId).classList.add('active');
  if (navEl) navEl.classList.add('active');

  document.getElementById('main').scrollTop = 0;
  closeSidebar();
}

/* ── Complete a mission ── */
function completeMission(idx) {
  // If already completed, just navigate forward — don't re-trigger logic
  if (completedMissions.has(idx)) {
    const next = idx + 1;
    if (next < TOTAL_MISSIONS) {
      gotoPanel(next);
    } else {
      gotoPanel('final');
    }
    return;
  }

  completedMissions.add(idx);

  // Update nav badge
  const nav = document.getElementById(`nav-${idx}`);
  nav.classList.add('done');
  nav.querySelector('.nav-badge').textContent = '✓';

  // Progress bar
  const pct = Math.round((completedMissions.size / TOTAL_MISSIONS) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent  = pct + '%';
  document.getElementById('scoreDisplay').textContent = `${completedMissions.size} / ${TOTAL_MISSIONS} missions`;

  const labels = [
    'First mission cleared — keep going',
    'Architecture mapped — well done',
    'Terminal explored — impressive',
    'Journey decoded — almost there',
    'All missions complete — see the final report',
  ];
  document.getElementById('progressLabel').textContent = labels[completedMissions.size - 1];

  // Unlock next mission
  const next = idx + 1;
  if (next < TOTAL_MISSIONS) {
    document.getElementById(`nav-${next}`).classList.remove('locked');
    setTimeout(() => gotoPanel(next), 420);
  } else {
    setTimeout(() => gotoPanel('final'), 600);
  }
}

/* ── Replay everything ── */
function replayAll() {
  completedMissions.clear();

  // Reset nav items
  document.querySelectorAll('.nav-item').forEach((n, i) => {
    n.classList.remove('done', 'active', 'locked');
    if (i >= 1 && i <= 4) n.classList.add('locked');
    const badge = n.querySelector('.nav-badge');
    if (badge && i >= 1 && i <= 5) badge.textContent = String(i).padStart(2, '0');
  });

  // Reset progress
  document.getElementById('progressFill').style.width  = '0%';
  document.getElementById('progressPct').textContent   = '0%';
  document.getElementById('scoreDisplay').textContent  = '0 / 5 missions';
  document.getElementById('progressLabel').textContent = 'Begin your first mission';

  // Hide all rewards
  document.querySelectorAll('.reward').forEach(r => r.classList.remove('unlocked'));

  // Reset individual missions
  resetLatency();
  resetArchitect();
  resetTimeline();
  initQuiz();
  initTerminal();

  gotoPanel(0);
  document.getElementById('main').scrollTop = 0;
}

/* ── Mobile sidebar ── */
function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sidebarOverlay');
  const toggle   = document.getElementById('menuToggle');
  const isOpen   = sidebar.classList.contains('open');

  sidebar.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  toggle.classList.toggle('open', !isOpen);
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
  document.getElementById('menuToggle').classList.remove('open');
}

/* Close sidebar on Escape */
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });
