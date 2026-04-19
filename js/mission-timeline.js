/* ═══════════════════════════════════════════
   MISSION 04 — Decode the Timeline
═══════════════════════════════════════════ */
let tlOpened = new Set();

function openTl(i) {
  const item    = document.getElementById(`tl-${i}`);
  const wasOpen = item.classList.contains('open');

  document.querySelectorAll('.tl-item').forEach(t => t.classList.remove('open'));
  if (!wasOpen) {
    item.classList.add('open', 'seen');
    tlOpened.add(i);
  }

  const prog = document.getElementById('tl-progress');
  prog.textContent = `${tlOpened.size} / 5 milestones unlocked`;

  if (tlOpened.size >= 5) {
    setTimeout(() => document.getElementById('reward-3').classList.add('unlocked'), 400);
  }
}

function resetTimeline() {
  tlOpened.clear();
  document.querySelectorAll('.tl-item').forEach(t => t.classList.remove('open', 'seen'));
  document.getElementById('tl-progress').textContent = '0 / 5 milestones unlocked';
}
