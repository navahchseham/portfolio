/* ═══════════════════════════════════════════
   MISSION 05 — Tech Stack Quiz
═══════════════════════════════════════════ */
const QUESTIONS = [
  {
    q: 'I rewrote the monitoring agent from Python to Go. What was the primary technical reason?',
    opts: [
      'Go has better machine learning libraries',
      'Go goroutines enable concurrent telemetry ingestion from 20+ nodes with minimal CPU overhead',
      'Go is easier for the team to learn',
      'Go has native GPU driver support',
    ],
    ans: 1,
  },
  {
    q: 'What was the measurable throughput outcome of migrating 8+ microservices to gRPC with Protocol Buffers?',
    opts: [
      'API response time dropped by 100ms',
      'Database queries reduced by 70%',
      'End-to-end pipeline throughput improved by 2.5x',
      'Kubernetes pod count was reduced by 40%',
    ],
    ans: 2,
  },
  {
    q: 'How did my Redis caching layer impact the database under peak ML training workloads?',
    opts: [
      'It replaced PostgreSQL entirely',
      'It reduced database load by 70% and sustained 50+ concurrent user sessions',
      'It compressed telemetry data before storage',
      'It handled authentication for the API layer',
    ],
    ans: 1,
  },
];

let quizAnswers = {};

function initQuiz() {
  quizAnswers = {};
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';

  QUESTIONS.forEach((q, qi) => {
    const wrap = document.createElement('div');
    wrap.className = 'quiz-q';

    const optsHtml = q.opts
      .map((o, oi) => `<button class="quiz-opt" onclick="answerQuiz(${qi},${oi})">${o}</button>`)
      .join('');

    wrap.innerHTML = `
      <div class="quiz-q-num">Question ${qi + 1} of ${QUESTIONS.length}</div>
      <div class="quiz-q-text">${q.q}</div>
      <div class="quiz-options" id="qopts-${qi}">${optsHtml}</div>
    `;
    container.appendChild(wrap);
  });
}

function answerQuiz(qi, oi) {
  if (quizAnswers[qi] !== undefined) return;
  quizAnswers[qi] = oi;

  const opts = document.querySelectorAll(`#qopts-${qi} .quiz-opt`);
  opts[oi].classList.add(oi === QUESTIONS[qi].ans ? 'correct' : 'wrong');
  if (oi !== QUESTIONS[qi].ans) opts[QUESTIONS[qi].ans].classList.add('correct');
  opts.forEach(o => { o.disabled = true; });

  if (Object.keys(quizAnswers).length < QUESTIONS.length) return;

  // All answered
  const score = QUESTIONS.filter((q, i) => quizAnswers[i] === q.ans).length;
  setTimeout(() => {
    if (score >= 2) {
      document.getElementById('reward-4').classList.add('unlocked');
    } else {
      const container = document.getElementById('quiz-container');
      const retryBox  = document.createElement('div');
      retryBox.className = 'quiz-retry-box';
      retryBox.innerHTML = `
        <div class="quiz-retry-msg">${score}/3 correct — need at least 2 to unlock</div>
        <button class="btn btn-ghost" onclick="initQuiz()">Retry Quiz</button>
      `;
      container.appendChild(retryBox);
    }
  }, 420);
}
