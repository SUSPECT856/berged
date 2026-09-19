import './styles.css';

const providers = [
  { name: 'OpenAI', kicker: 'A leading model ecosystem', body: 'Berged brings powerful reasoning, writing and coding models into one workspace — without forcing you to jump between products.', tone: 'dark', accent: '#f2f2f2', glyph: '◒' },
  { name: 'Google', kicker: 'The Gemini ecosystem', body: 'Use Google’s model family inside the same workspace, then pass the result forward to another model when the task calls for it.', tone: 'light', accent: '#141414', glyph: '◇' },
  { name: 'Anthropic', kicker: 'The Claude ecosystem', body: 'Long-form thinking, analysis and writing can become one step in a larger Berged workflow instead of a separate destination.', tone: 'warm', accent: '#111111', glyph: '◐' },
  { name: 'xAI', kicker: 'Another voice in the room', body: 'Bring another model into the conversation, compare perspectives, and keep everything inside one interface.', tone: 'deep', accent: '#f7f7f7', glyph: '✦' },
  { name: 'Mistral', kicker: 'Open model choices', body: 'Keep your model stack flexible. Berged is designed around a provider-agnostic architecture from day one.', tone: 'light', accent: '#111111', glyph: '◌' },
  { name: 'DeepSeek', kicker: 'Another model, same workspace', body: 'Different models can have different strengths. Berged gives you one place to route the work between them.', tone: 'dark', accent: '#f2f2f2', glyph: '⟐' },
  { name: 'More models', kicker: 'The list keeps growing', body: 'New providers and models can be added to the Berged catalog without redesigning the product around one company.', tone: 'gradient', accent: '#111111', glyph: '∞' }
];

const modes = [
  { id: 'single', title: 'One model', subtitle: 'Pick one model and work normally.', icon: '01' },
  { id: 'compare', title: 'Compare', subtitle: 'Ask multiple models the same thing.', icon: '02' },
  { id: 'mix', title: 'Mix', subtitle: 'Chain models into one workflow.', icon: '03' },
  { id: 'debate', title: 'Debate', subtitle: 'Let models challenge each other.', icon: '04' },
  { id: 'jury', title: 'Jury', subtitle: 'Collect answers, then synthesize.', icon: '05' }
];

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="nav">
    <a class="wordmark" href="#top" aria-label="Berged home">berged <span>BETA</span></a>
    <nav class="nav-links" aria-label="Main navigation">
      <a href="#platform">Platform</a>
      <a href="#models">Models</a>
      <a href="#workflows">Workflows</a>
      <a href="#company">Company</a>
    </nav>
    <div class="nav-actions">
      <button class="nav-ghost">Sign in</button>
      <button class="nav-cta">Open Berged</button>
    </div>
  </header>

  <main>
    <section id="top" class="hero section-light">
      <div class="hero-inner">
        <p class="eyebrow">THE AI WORKSPACE</p>
        <h1>Different AIs.<br><span>One place.</span></h1>
        <p class="hero-copy">Use the models you already love. Compare them, connect them, and let them work together inside Berged.</p>
        <div class="hero-actions">
          <button class="primary">Explore Berged</button>
          <a class="secondary" href="#platform">See how it works <span>↓</span></a>
        </div>
      </div>
      <div class="hero-stage" aria-hidden="true">
        <div class="orbit orbit-a"></div>
        <div class="orbit orbit-b"></div>
        <div class="core-mark">b</div>
        <div class="floating-label label-a">OpenAI</div>
        <div class="floating-label label-b">Gemini</div>
        <div class="floating-label label-c">Claude</div>
      </div>
      <div class="scroll-note">Scroll to explore <span>↓</span></div>
    </section>

    <section id="platform" class="story-intro">
      <div class="story-copy">
        <p class="eyebrow">NOT A MODEL. A WORKSPACE.</p>
        <h2>One interface for the models you already use.</h2>
        <p>We are not trying to replace every model on day one. Berged is the layer that puts them in the same room.</p>
      </div>
    </section>

    <section id="providers" class="provider-story">
      <div class="provider-sticky">
        <div class="provider-meta"><span id="providerIndex">01</span><span>Provider</span></div>
        <div class="provider-copy">
          <p id="providerKicker" class="eyebrow">A leading model ecosystem</p>
          <h2 id="providerName">OpenAI</h2>
          <p id="providerBody">Berged brings powerful reasoning, writing and coding models into one workspace — without forcing you to jump between products.</p>
        </div>
        <div class="provider-visual" id="providerVisual">
          <div class="provider-card">
            <div class="provider-card-top"><span class="provider-dot"></span><span>BERGED WORKSPACE</span></div>
            <div class="provider-chat-line wide"></div>
            <div class="provider-chat-line short"></div>
            <div class="provider-card-separator"></div>
            <div class="provider-model-row"><span id="providerGlyph" class="provider-glyph">◒</span><span id="providerModelText">OpenAI</span><span class="provider-status">connected</span></div>
          </div>
          <div class="provider-glow"></div>
        </div>
        <div class="provider-progress"><span></span></div>
        <div class="provider-hint">Keep scrolling</div>
      </div>
    </section>

    <section id="models" class="catalog-intro section-light">
      <div class="catalog-copy">
        <p class="eyebrow">MODEL CATALOG</p>
        <h2>Every model has a place.<br><span>Berged decides how to use them.</span></h2>
      </div>
      <div class="catalog-note">Provider names stay visible. Model details can evolve without changing the product.</div>
    </section>

    <section class="provider-grid-section section-light">
      <div class="provider-grid-head">
        <p class="eyebrow">THE ECOSYSTEM</p>
        <h2>Built to keep expanding.</h2>
      </div>
      <div class="provider-grid">
        ${providers.map((p, i) => `
          <article class="provider-tile ${p.tone}" data-provider="${i}">
            <div class="tile-top"><span>${String(i + 1).padStart(2,'0')}</span><span>provider</span></div>
            <h3>${p.name}</h3>
            <p>${p.kicker}</p>
          </article>
        `).join('')}
      </div>
    </section>

    <section id="workflows" class="mix-story">
      <div class="mix-sticky">
        <p class="eyebrow">THE BERGED LAYER</p>
        <h2>Don’t just choose a model.<br><span>Choose what the models do together.</span></h2>
        <div class="workflow-orbit" aria-hidden="true">
          <div class="workflow-ring ring-1"></div>
          <div class="workflow-ring ring-2"></div>
          <div class="workflow-node node-a">01</div>
          <div class="workflow-node node-b">02</div>
          <div class="workflow-node node-c">03</div>
          <div class="workflow-core">b</div>
        </div>
        <div class="mode-strip" id="modeStrip">
          ${modes.map((m, i) => `<button class="mode-card ${i===0?'active':''}" data-mode="${m.id}"><span>${m.icon}</span><strong>${m.title}</strong><em>${m.subtitle}</em></button>`).join('')}
        </div>
      </div>
    </section>

    <section class="demo-story section-light">
      <div class="demo-copy">
        <p class="eyebrow">ONE REQUEST</p>
        <h2>Three models.<br>One clean result.</h2>
        <p>Ask once. Berged can route the task, compare the responses, or pass the work from one model to another.</p>
      </div>
      <div class="demo-window">
        <div class="demo-top"><span>berged</span><span>workflow: compare</span></div>
        <div class="demo-request">“Design a launch strategy for a new AI product.”</div>
        <div class="demo-columns">
          <div class="demo-model"><span>OpenAI</span><div class="demo-lines"><i></i><i></i><i class="tiny"></i></div></div>
          <div class="demo-model"><span>Gemini</span><div class="demo-lines"><i></i><i></i><i class="tiny"></i></div></div>
          <div class="demo-model"><span>Claude</span><div class="demo-lines"><i></i><i></i><i class="tiny"></i></div></div>
        </div>
        <div class="demo-result"><span>BERGED</span><strong>Combined result</strong><div class="result-line"></div><div class="result-line short"></div></div>
      </div>
    </section>

    <section id="company" class="closing section-dark">
      <div class="closing-inner">
        <p class="eyebrow">THE NEXT LAYER</p>
        <h2>And one day,<br><span>Berged will be in the room too.</span></h2>
        <div class="berged-mark-large">b</div>
        <p class="closing-copy">Today, Berged brings the models together.<br>Tomorrow, we want to build one of them ourselves.</p>
        <button class="primary inverse">Open Berged</button>
      </div>
    </section>

    <footer class="footer section-dark">
      <div>berged BETA</div>
      <div>© 2026 Bergedo</div>
      <div>AI workspace, reimagined.</div>
    </footer>
  </main>
`;

const providerName = document.querySelector('#providerName');
const providerKicker = document.querySelector('#providerKicker');
const providerBody = document.querySelector('#providerBody');
const providerIndex = document.querySelector('#providerIndex');
const providerGlyph = document.querySelector('#providerGlyph');
const providerModelText = document.querySelector('#providerModelText');
const providerVisual = document.querySelector('#providerVisual');

function updateProvider(index) {
  const p = providers[index];
  providerName.textContent = p.name;
  providerKicker.textContent = p.kicker;
  providerBody.textContent = p.body;
  providerIndex.textContent = String(index + 1).padStart(2, '0');
  providerGlyph.textContent = p.glyph;
  providerModelText.textContent = p.name;
  providerVisual.dataset.tone = p.tone;
}

let currentProvider = 0;
const providerSection = document.querySelector('.provider-story');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const ratio = entry.intersectionRatio;
    const mapped = Math.min(providers.length - 1, Math.max(0, Math.floor((1 - entry.boundingClientRect.top / Math.max(entry.boundingClientRect.height, 1)) * providers.length)));
    if (mapped !== currentProvider) {
      currentProvider = mapped;
      updateProvider(currentProvider);
    }
  });
}, { threshold: Array.from({length: 21}, (_, i) => i / 20) });

observer.observe(providerSection);

function updateOnScroll() {
  const rect = providerSection.getBoundingClientRect();
  const view = window.innerHeight;
  const total = rect.height - view;
  if (total <= 0) return;
  const progress = Math.min(0.999, Math.max(0, (-rect.top) / total));
  const index = Math.min(providers.length - 1, Math.floor(progress * providers.length));
  if (index !== currentProvider) {
    currentProvider = index;
    updateProvider(index);
  }
  document.querySelector('.provider-progress span').style.transform = `scaleX(${Math.max(0.06, progress)})`;
  providerVisual.style.setProperty('--visual-shift', `${(progress * providers.length * 22) - 22}px`);
}
window.addEventListener('scroll', updateOnScroll, { passive: true });
window.addEventListener('resize', updateOnScroll);
updateOnScroll();

// Mode interaction: keep it simple and tactile.
document.querySelectorAll('.mode-card').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.mode-card').forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
  });
});

// Gentle reveal, not flashy.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.18 });

document.querySelectorAll('.story-copy, .catalog-copy, .provider-grid-head, .provider-tile, .demo-copy, .demo-window, .closing-inner').forEach(el => revealObserver.observe(el));
