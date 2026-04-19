/* ═══════════════════════════════════════════
   BOOT — Animated startup sequence
═══════════════════════════════════════════ */
const BOOT_LINES = [
  { text: 'Loading career data...', status: 'ok' },
  { text: 'Mounting distributed systems...', status: 'ok' },
  { text: 'Initialising GPU telemetry module...', status: 'ok' },
  { text: 'Connecting to Samsung K8s cluster...', status: 'ok' },
  { text: 'Verifying mission parameters...', status: 'ok' },
  { text: 'Mission Control ready.', status: null },
];

(function runBoot() {
  const log = document.getElementById('bootLog');

  BOOT_LINES.forEach((line, i) => {
    const el = document.createElement('div');
    el.className = 'boot-line';

    const statusHtml = line.status
      ? `<span class="${line.status}">[${line.status.toUpperCase()}]</span>`
      : '';
    el.innerHTML = `<span>› ${line.text}</span>${statusHtml}`;
    log.appendChild(el);

    setTimeout(() => {
      el.classList.add('show');
      if (i === BOOT_LINES.length - 1) {
        setTimeout(() => document.getElementById('bootBtn').classList.add('show'), 350);
      }
    }, 300 + i * 430);
  });
})();

function launchApp() {
  document.getElementById('boot').classList.add('gone');
  document.getElementById('app').classList.add('show');
  initTerminal();
  initQuiz();
  updateLatency();
}
