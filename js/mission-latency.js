/* ═══════════════════════════════════════════
   MISSION 01 — Latency Challenge
═══════════════════════════════════════════ */
function updateLatency() {
  const nodes = +document.getElementById('sl-nodes').value;
  const grpc  = +document.getElementById('sl-grpc').value;
  const poll  = +document.getElementById('sl-poll').value;
  const go    = +document.getElementById('sl-goroutines').value;

  document.getElementById('sv-nodes').textContent     = nodes;
  document.getElementById('sv-grpc').textContent      = grpc;
  document.getElementById('sv-poll').textContent      = poll + 'ms';
  document.getElementById('sv-goroutines').textContent = go;

  const lat = Math.round((poll * nodes) / (grpc * Math.sqrt(go) * 1.8));

  const numEl  = document.getElementById('latNum');
  const bar    = document.getElementById('latBar');
  const lbl    = document.getElementById('latLabel');
  const btn    = document.getElementById('latBtn');
  const hint   = document.getElementById('latHint');

  numEl.textContent = lat;

  if (lat < 100) {
    numEl.style.color       = 'var(--accent2)';
    bar.style.width         = Math.round((lat / 100) * 40) + '%';
    bar.style.background    = 'var(--accent2)';
    lbl.textContent         = `Target achieved — ${lat}ms ✓ Ready to submit`;
    btn.disabled            = false;
    hint.textContent        = 'Config accepted — submit to unlock';
  } else {
    numEl.style.color       = lat > 400 ? 'var(--red)' : 'var(--amber)';
    bar.style.width         = Math.min(100, Math.round(lat / 8)) + '%';
    bar.style.background    = lat > 400 ? 'var(--red)' : 'var(--amber)';
    lbl.textContent         = `Production target: <100ms · Currently: ${lat}ms — too slow`;
    btn.disabled            = true;
    hint.textContent        = 'Bring latency below 100ms to unlock';
  }
}

function submitLatency() {
  document.getElementById('reward-0').classList.add('unlocked');
  document.getElementById('latBtn').disabled   = true;
  document.getElementById('latHint').textContent = 'Mission complete — read the unlock below';
}

function resetLatency() {
  const defaults = { 'sl-nodes': 5, 'sl-grpc': 1, 'sl-poll': 400, 'sl-goroutines': 2 };
  Object.entries(defaults).forEach(([id, val]) => document.getElementById(id).value = val);
  document.getElementById('latBtn').disabled     = true;
  document.getElementById('latHint').textContent = 'Bring latency below 100ms to unlock';
  updateLatency();
}
