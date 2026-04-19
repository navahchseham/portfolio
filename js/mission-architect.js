/* ═══════════════════════════════════════════
   MISSION 02 — Architect the System
═══════════════════════════════════════════ */
let archDragged = null;
let archFilled  = 0;

function archDragStart(e) {
  archDragged = e.currentTarget;
}
function archDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('over');
}
function archLeave(e) {
  e.currentTarget.classList.remove('over');
}
function archDrop(e, idx) {
  e.preventDefault();
  const slot   = document.getElementById(`aslot-${idx}`);
  const fb     = document.getElementById('arch-feedback');
  slot.classList.remove('over');

  if (slot.classList.contains('filled')) return;
  if (!archDragged) return;

  const tech   = archDragged.dataset.tech;
  const answer = slot.dataset.answer;

  if (tech === answer) {
    slot.classList.add('filled');
    // hide placeholder spans, add value
    slot.querySelectorAll('span').forEach(s => s.style.display = 'none');
    const valEl = document.createElement('span');
    valEl.className   = 'arch-slot-val';
    valEl.textContent = tech + ' ✓';
    slot.appendChild(valEl);

    archDragged.classList.add('used');
    archFilled++;
    fb.style.color   = 'var(--accent2)';
    fb.textContent   = `${tech} placed correctly — ${archFilled} / 4 layers filled`;

    if (archFilled >= 4) {
      setTimeout(() => document.getElementById('reward-1').classList.add('unlocked'), 420);
    }
  } else {
    fb.style.color   = 'var(--red)';
    fb.textContent   = `${tech} doesn't belong in "${slot.querySelector('.arch-slot-name').textContent}" — try another slot`;
    slot.style.borderColor = 'var(--red)';
    setTimeout(() => { slot.style.borderColor = ''; }, 700);
  }
}

function resetArchitect() {
  archFilled  = 0;
  archDragged = null;

  document.querySelectorAll('.arch-slot').forEach(slot => {
    slot.classList.remove('filled', 'over');
    slot.style.borderColor = '';
    const val = slot.querySelector('.arch-slot-val');
    if (val) val.remove();
    slot.querySelectorAll('span').forEach(s => s.style.display = '');
  });
  document.querySelectorAll('.arch-tag').forEach(t => t.classList.remove('used'));
  document.getElementById('arch-feedback').textContent = '';
}
