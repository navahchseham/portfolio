/* ═══════════════════════════════════════════
   MISSION 03 — Hack the Terminal
═══════════════════════════════════════════ */
const TERM_COMMANDS = {
  help: {
    lines: [
      ['ts', '─── Available Commands ─────────────────────────────────'],
      ['to', '  whoami            — about me'],
      ['to', '  ls projects/      — list all projects'],
      ['to', '  cat gpu-insight   — GPU monitoring system'],
      ['to', '  cat frontier-ml   — ML deployment platform'],
      ['to', '  ls skills/        — full tech stack'],
      ['to', '  show awards       — recognition & achievements'],
      ['to', '  show stats        — real impact metrics'],
      ['to', '  exit              — complete this mission'],
      ['to', '  clear             — clear terminal'],
      ['to', ''],
    ],
  },
  whoami: {
    xp: true,
    lines: [
      ['ts', 'Mahesh Chavan'],
      ['ti', 'Software Engineer(Backend Lead) · Samsung Electro-Mechanics · Bengaluru'],
      ['to', ''],
      ['tc', 'I build distributed systems that scale.'],
      ['tc', 'Led a 4-member team to ship GPU monitoring (20+ nodes,'],
      ['tc', '<100ms) and an ML platform cutting deploys from 3d → 12h.'],
      ['tc', 'Promoted to Backend Lead within 2 years of tenure.'],
      ['to', ''],
    ],
  },
  'ls projects/': {
    xp: true,
    lines: [
      ['ts', 'gpu-insight/     frontier-ml/'],
      ['ts', ''],
      ['to', ''],
      ['to', 'hint: cat <project-name> to explore'],
      ['to', ''],
    ],
  },
  'cat gpu-insight': {
    xp: true,
    lines: [
      ['tw', '══════ GPU INSIGHT — System Resource Monitor ══════'],
      ['ti', 'Tech:   Go · gRPC · PostgreSQL · Docker · Linux'],
      ['to', 'Year:   2024'],
      ['to', ''],
      ['tc', 'Lightweight Go agent streaming real-time hardware telemetry'],
      ['tc', '(CPU, GPU, RAM, disk I/O) from 20+ machines to a central'],
      ['tc', 'monitoring portal. Sub-100ms latency via goroutines + gRPC.'],
      ['to', ''],
      ['ts', 'Impact:'],
      ['tc', '  · 20+ nodes monitored simultaneously'],
      ['tc', '  · <100ms latency — 3x throughput vs Python legacy'],
      ['tc', '  · Alert engine detects unauthorised access in <5 seconds'],
      ['tc', '  · 65% reduction in resource conflicts across teams'],
      ['tc', '  · 30-day analytics dashboard for 5+ project leads'],
      ['to', ''],
    ],
  },
  'cat frontier-ml': {
    xp: true,
    lines: [
      ['tw', '══════ FRONTIER — ML Deployment Platform ══════'],
      ['ti', 'Tech:   Python · FastAPI · Redis · gRPC · Docker'],
      ['to', 'Year:   2023'],
      ['to', ''],
      ['tc', 'End-to-end ML training and deployment pipeline.'],
      ['tc', 'Time-to-production: 3 days → <12 hours (60% reduction).'],
      ['tc', 'Redis job queue: 100+ concurrent jobs, zero task loss.'],
      ['to', ''],
      ['ts', 'Impact:'],
      ['tc', '  · 60% faster time-to-production across 5+ internal teams'],
      ['tc', '  · 100+ concurrent training jobs, zero task loss'],
      ['tc', '  · Developer onboarding: 2 days → under 2 hours'],
      ['tc', '  · Priority scheduling with auto-retry on failure'],
      ['to', ''],
    ],
  },
  'ls skills/': {
    xp: true,
    lines: [
      ['tw', '══════ Tech Stack ══════'],
      ['to', ''],
      ['ti', 'Languages/'],
      ['ts', '  Python   ████████████░░  88'],
      ['ts', '  Go       █████████████░  92'],
      ['ts', '  C#       █████████░░░░░  72'],
      ['to', ''],
      ['ti', 'Frameworks/'],
      ['tc', '  Django · FastAPI · SQLAlchemy'],
      ['to', ''],
      ['ti', 'Architecture/'],
      ['tc', '  gRPC · REST · WebSockets · Protobuf · Microservices'],
      ['to', ''],
      ['ti', 'Infrastructure/'],
      ['tc', '  Docker · Kubernetes · GCP · CI/CD · Linux'],
      ['to', ''],
      ['ti', 'Databases/'],
      ['tc', '  PostgreSQL · Redis'],
      ['to', ''],
    ],
  },
  'show awards': {
    xp: true,
    lines: [
      ['tw', '══════ Awards & Recognition ══════'],
      ['to', ''],
      ['ts', '[★] Best Employee H1-2024'],
      ['tc', '    Samsung Electro-Mechanics Bangalore'],
      ['tc', '    Ranked #1 of 200+ engineers'],
      ['to', ''],
      ['ts', '[★] 1st Place — CentuRITon National Hackathon'],
      ['tc', '    M S Ramaiah Institute of Technology'],
      ['tc', '    500+ competing teams · Devfolio & MLH endorsed'],
      ['to', ''],
      ['ts', '[★] Promoted to Backend Lead'],
      ['tc', '    Within 2 years of tenure at Samsung Electro-Mechanics'],
      ['tc', '    Recognised for rapid technical mastery & leadership'],
      ['to', ''],
    ],
  },
  'show stats': {
    xp: true,
    lines: [
      ['tw', '══════ Impact Metrics ══════'],
      ['ts', '  API Latency       <100ms    GPU Insight system'],
      ['ts', '  Uptime             99.9%    3 production environments'],
      ['ts', '  Throughput            3x    gRPC vs Python legacy'],
      ['ts', '  Pipeline           2.5x     8+ microservices → gRPC'],
      ['ts', '  DB Load            -70%     Redis caching layer'],
      ['ts', '  Onboarding         -55%     low-code ML platform'],
      ['ts', '  Infra Cost         -25%     GCP optimisation'],
      ['ts', '  Release Speed      -4hrs    per release cycle'],
      ['to', ''],
    ],
  },
  exit: {
    unlock: true,
    lines: [
      ['ts', 'Session complete. Mission unlocked.'],
      ['to', 'Scroll down to read my full leadership story →'],
      ['to', ''],
    ],
  },
  clear: { clear: true, lines: [] },
};

const CHIP_CMDS = [
  'help', 'whoami', 'ls projects/', 'cat gpu-insight',
  'cat frontier-ml', 'ls skills/', 'show awards', 'show stats', 'exit',
];

function initTerminal() {
  const body = document.getElementById('term-body');
  body.innerHTML = '';

  addTermLines([
    ['ts', 'mahesh-os v2.1.0  ·  Production Terminal'],
    ['to', '─────────────────────────────────────────────────────────'],
    ['ti', 'Type [help] to explore all commands.'],
    ['to', 'Type [exit] when you\'re done to complete the mission.'],
    ['to', ''],
  ]);

  // Chip shortcuts
  const chips = document.getElementById('term-chips');
  chips.innerHTML = '';
  CHIP_CMDS.forEach(cmd => {
    const el = document.createElement('div');
    el.className   = 'term-cmd-chip';
    el.textContent = cmd;
    el.onclick     = () => runTermCmd(cmd);
    chips.appendChild(el);
  });

  // Wire up input (remove previous listener first)
  const input = document.getElementById('term-input');
  const newInput = input.cloneNode(true);
  input.parentNode.replaceChild(newInput, input);
  newInput.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const val = newInput.value.trim().toLowerCase();
    newInput.value = '';
    if (val) runTermCmd(val);
  });
}

function runTermCmd(val) {
  addTermLine('tp', `mahesh@os:~$ ${val}`);

  const cmd = TERM_COMMANDS[val];
  if (!cmd) {
    addTermLines([
      ['te', `bash: ${val}: command not found`],
      ['to', 'Type [help] for available commands.'],
      ['to', ''],
    ]);
    scrollTerm();
    return;
  }

  if (cmd.clear) { document.getElementById('term-body').innerHTML = ''; return; }

  addTermLines(cmd.lines);
  if (cmd.unlock) {
    setTimeout(() => document.getElementById('reward-2').classList.add('unlocked'), 300);
  }
  scrollTerm();
}

function addTermLine(cls, text) {
  const body = document.getElementById('term-body');
  const s    = document.createElement('span');
  s.className   = 'tl ' + cls;
  s.textContent = text;
  body.appendChild(s);
  body.appendChild(document.createTextNode('\n'));
}

function addTermLines(arr) {
  arr.forEach(([cls, text]) => addTermLine(cls, text));
}

function scrollTerm() {
  const body = document.getElementById('term-body');
  setTimeout(() => body.scrollTop = body.scrollHeight, 30);
}
